import os
import re
import json
import logging
from datetime import datetime, timezone, timedelta
from pathlib import Path
from dotenv import load_dotenv
import praw
import pandas as pd
from collections import defaultdict
from typing import List, Dict, Any, Optional, TypedDict
import time

from bertopic import BERTopic
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from nltk import download
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
from wordcloud import WordCloud
import matplotlib.pyplot as plt
import seaborn as sns

# Download necessary NLTK data
download('stopwords')
download('wordnet')
download('omw-1.4')

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)
logger = logging.getLogger(__name__)

# Type definitions
class SubredditConfig(TypedDict):
    subreddit: str
    enabled: bool

# Initialize directories
BASE_DIR = Path(__file__).parent
CACHE_DIR = BASE_DIR / "cache"
CONFIG_FILE = BASE_DIR / "subreddits.json"

# Create cache directory if it doesn't exist
CACHE_DIR.mkdir(parents=True, exist_ok=True)

# Load environment variables from .env file
load_dotenv()

# Retrieve secrets from environment variables
CLIENT_ID = os.getenv("REDDIT_CLIENT_ID")
CLIENT_SECRET = os.getenv("REDDIT_SECRET")
USER_AGENT = os.getenv("REDDIT_USER_AGENT")

if not all([CLIENT_ID, CLIENT_SECRET, USER_AGENT]):
    raise ValueError("Please ensure REDDIT_CLIENT_ID, REDDIT_SECRET, and REDDIT_USER_AGENT are set in the .env file.")

# Authenticate with Reddit API
reddit = praw.Reddit(
    client_id=CLIENT_ID,
    client_secret=CLIENT_SECRET,
    user_agent=USER_AGENT,
)

# Configuration
POST_LIMIT = 500         # Number of posts to fetch per run
COMMENT_LIMIT = 100      # Number of comments per post
DATA_WINDOW_DAYS = 365    # Number of days of data to keep

# Initialize NLP tools
STOP_WORDS = set(stopwords.words('english'))
lemmatizer = WordNetLemmatizer()
sentiment_analyzer = SentimentIntensityAnalyzer()

def load_subreddit_configs() -> List[SubredditConfig]:
    """Load subreddit configurations from JSON file."""
    if not CONFIG_FILE.exists():
        logger.error(f"Configuration file not found: {CONFIG_FILE}")
        raise FileNotFoundError(f"Please create a configuration file at {CONFIG_FILE}")

    with open(CONFIG_FILE, 'r', encoding='utf-8') as f:
        configs = json.load(f)

    # Validate configuration
    for config in configs:
        if not all(key in config for key in ["subreddit", "enabled"]):
            raise ValueError(f"Invalid configuration for subreddit: {config.get('subreddit', 'unknown')}")

    return configs

def get_subreddit_cache_dir(subreddit: str) -> Path:
    """Get the cache directory for a specific subreddit."""
    subreddit_cache = CACHE_DIR / subreddit.lower()
    subreddit_cache.mkdir(parents=True, exist_ok=True)
    return subreddit_cache

def save_to_cache(data: Dict[str, Any], subreddit: str, filename: str) -> None:
    """Save data to subreddit-specific cache with timestamp."""
    cache_dir = get_subreddit_cache_dir(subreddit)
    cache_path = cache_dir / filename
    with open(cache_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2)
    logger.info(f"Cached data saved to {cache_path}")

def load_from_cache(subreddit: str, filename: str) -> Optional[Dict[str, Any]]:
    """Load data from subreddit-specific cache if it exists."""
    cache_dir = get_subreddit_cache_dir(subreddit)
    cache_path = cache_dir / filename
    if cache_path.exists():
        with open(cache_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    return None

def get_last_run_time(subreddit: str) -> Optional[float]:
    """Get the timestamp of the last successful data fetch for a subreddit."""
    last_run = load_from_cache(subreddit, "last_run.json")
    return last_run.get("last_timestamp") if last_run else None

def save_last_run_time(subreddit: str, timestamp: float) -> None:
    """Save the timestamp of the current successful data fetch for a subreddit."""
    save_to_cache({"last_timestamp": timestamp}, subreddit, "last_run.json")

def preprocess_text(text: str) -> str:
    """Clean and preprocess text data."""
    text = re.sub(r'http\S+', '', text)          # Remove URLs
    text = re.sub(r'[^A-Za-z\s]', '', text)     # Remove non-alphabetic characters
    text = text.lower()                          # Lowercase
    tokens = text.split()
    tokens = [lemmatizer.lemmatize(word) for word in tokens if word not in STOP_WORDS and len(word) > 2]
    return ' '.join(tokens)

def analyze_sentiment(text: str) -> float:
    """Analyze sentiment and return compound score."""
    scores = sentiment_analyzer.polarity_scores(text)
    return scores['compound']

def generate_wordcloud(text: str, title: str, output_path: Path) -> None:
    """Generate and save a word cloud from the text."""
    if not text or len(text.split()) < 1:
        logger.warning(f"Insufficient text to generate word cloud for: {title}")
        return

    try:
        wordcloud = WordCloud(width=800, height=400, background_color='white').generate(text)
        plt.figure(figsize=(15, 7.5))
        plt.imshow(wordcloud, interpolation='bilinear')
        plt.title(title, fontsize=20)
        plt.axis('off')
        plt.savefig(output_path)
        plt.close()
        logger.info(f"Word cloud saved to {output_path}")
    except Exception as e:
        logger.error(f"Error generating word cloud for {title}: {str(e)}")

def process_posts(subreddit: praw.models.Subreddit, start_time: Optional[float] = None) -> Dict[str, Any]:
    """Process posts and extract relevant information with time filtering."""
    posts_data = {}
    current_time = datetime.now(timezone.utc).timestamp()
    newest_post_time = 0  # Track the newest post timestamp

    # If no start_time provided, use 90 days ago
    if start_time is None:
        start_time = (datetime.now(timezone.utc) - timedelta(days=DATA_WINDOW_DAYS)).timestamp()

    logger.info(f"Fetching posts from {datetime.fromtimestamp(start_time, timezone.utc)} to {datetime.fromtimestamp(current_time, timezone.utc)}")

    # Use Reddit's timestamp filtering
    for post in subreddit.new(limit=POST_LIMIT):
        if post.created_utc <= start_time:
            break

        posts_data[post.id] = {
            "id": post.id,
            "title": post.title,
            "selftext": post.selftext,
            "upvotes": post.score,
            "num_comments": post.num_comments,
            "url": post.url,
            "created_utc": post.created_utc,
            "collected_at": current_time
        }
        newest_post_time = max(newest_post_time, post.created_utc)

    return {
        "metadata": {
            "subreddit": subreddit.display_name,
            "fetch_start": start_time,
            "fetch_end": current_time,
            "posts_found": len(posts_data),
            "newest_post_time": newest_post_time
        },
        "posts": posts_data
    }

def seed_historical_data(subreddit: praw.models.Subreddit, subreddit_name: str) -> Dict[str, Any]:
    """Seed historical data by ethically fetching as much as possible."""
    logger.info(f"Seeding historical data for r/{subreddit_name}...")

    historical_data = {
        "metadata": {
            "subreddit": subreddit_name,
            "first_collected": datetime.now(timezone.utc).isoformat(),
            "total_posts": 0
        },
        "posts": {}
    }

    # Start with "new" to get recent posts
    new_data = process_posts(subreddit, start_time=None)
    historical_data = merge_historical_data(historical_data, new_data, subreddit_name)

    # Use different time periods to get a broader range
    time_filters = ['year', 'month', 'week']
    posts_seen = set(historical_data["posts"].keys())

    for time_filter in time_filters:
        logger.info(f"Fetching top posts from: {time_filter}")
        batch_size = 100  # Ethical batch size

        try:
            for post in subreddit.top(time_filter=time_filter, limit=batch_size):
                if post.id not in posts_seen:
                    historical_data["posts"][post.id] = {
                        "id": post.id,
                        "title": post.title,
                        "selftext": post.selftext,
                        "upvotes": post.score,
                        "num_comments": post.num_comments,
                        "url": post.url,
                        "created_utc": post.created_utc,
                        "collected_at": datetime.now(timezone.utc).timestamp()
                    }
                    posts_seen.add(post.id)

            # Be nice to the API
            time.sleep(2)

        except Exception as e:
            logger.warning(f"Error fetching {time_filter} posts: {str(e)}")
            continue

    # Update metadata
    historical_data["metadata"]["total_posts"] = len(historical_data["posts"])
    logger.info(f"Seeded {len(historical_data['posts'])} historical posts")

    return historical_data

def generate_topic_report(topic_model: BERTopic, posts_df: pd.DataFrame, subreddit: str) -> None:
    """Generate and save a detailed report of discovered topics."""
    logger.info("Generating topic analysis report...")

    # Get topic information
    topics_info = topic_model.get_topic_info()

    # Create report directory
    report_dir = get_subreddit_cache_dir(subreddit)
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    report_path = report_dir / f"topic_report_{timestamp}.md"

    # Generate markdown report
    report = [
        f"# Topic Analysis Report for r/{subreddit}",
        f"\nGenerated on: {datetime.now(timezone.utc).isoformat()}",
        f"\nTotal Posts Analyzed: {len(posts_df)}",
        f"\nNumber of Topics Discovered: {len(topics_info[topics_info['Topic'] != -1])}",
        "\n## Topic Details\n"
    ]

    # Add topic details
    for idx, row in topics_info.iterrows():
        topic_id = row['Topic']
        if topic_id == -1:  # Skip outlier topic
            continue

        # Get topic words and their weights
        topic_words = topic_model.get_topic(topic_id)
        word_str = ", ".join([f"{word} ({weight:.3f})" for word, weight in topic_words[:10]])

        # Get example posts for this topic
        topic_posts = posts_df[posts_df['topic'] == topic_id].sort_values('upvotes', ascending=False)

        report.extend([
            f"\n### Topic {topic_id}: {row['Name']}",
            f"- Count: {row['Count']} posts",
            f"- Representative Words: {word_str}",
            "\nTop Posts:",
        ])

        # Add top 3 posts by upvotes
        for _, post in topic_posts.head(3).iterrows():
            report.extend([
                f"\n1. {post['title']}",
                f"   - Upvotes: {post['upvotes']}",
                f"   - Comments: {post['num_comments']}",
                f"   - URL: {post['url']}"
            ])

    # Add topic distribution visualization
    report.extend([
        "\n## Topic Distribution",
        "\nNumber of posts per topic:",
        "```",
        topics_info[topics_info['Topic'] != -1][['Topic', 'Count']].to_string(),
        "```"
    ])

    # Save report
    with open(report_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(report))
    logger.info(f"Topic report saved to {report_path}")

def merge_historical_data(existing_data: Dict[str, Any], new_data: Dict[str, Any], subreddit: str) -> Dict[str, Any]:
    """Merge new data with existing historical data."""
    if not existing_data:
        return new_data

    merged = {
        "metadata": {
            "subreddit": subreddit,
            "first_collected": existing_data["metadata"].get("first_collected"),
            "last_updated": datetime.now(timezone.utc).isoformat(),
            "total_posts": existing_data["metadata"].get("total_posts", 0) + len(new_data.get("posts", []))
        },
        "posts": {}
    }

    # Merge all posts (using post ID as key to avoid duplicates)
    existing_posts = existing_data.get("posts", {})
    new_posts = new_data.get("posts", {})
    merged["posts"] = {**existing_posts, **new_posts}

    return merged

def aggregate_pain_points(historical_data: Dict[str, Any], topic_model: BERTopic) -> Dict[str, Dict[str, Any]]:
    """Aggregate historical posts into pain point categories with their metrics."""
    pain_points = defaultdict(lambda: {"total_upvotes": 0, "total_comments": 0, "posts": []})

    for post_id, post in historical_data.get("posts", {}).items():
        topic = post.get("topic")
        label = post.get("topic_label", "Unknown")
        pain_points[label]["total_upvotes"] += post["upvotes"]
        pain_points[label]["total_comments"] += post["num_comments"]
        pain_points[label]["posts"].append({
            "title": post["title"],
            "link": post["url"],
            "upvotes": post["upvotes"],
            "comments": post["num_comments"],
            "created_utc": post["created_utc"]
        })

    return dict(pain_points)

def generate_pain_points_report(pain_points: Dict[str, Dict[str, Any]], historical_data: Dict[str, Any]) -> Dict[str, Any]:
    """Generate a structured report matching the UI format."""
    report = {
        "metadata": {
            "subreddit": historical_data["metadata"].get("subreddit"),
            "date_generated": datetime.now(timezone.utc).isoformat(),
            "first_collected": historical_data["metadata"].get("first_collected"),
            "last_updated": historical_data["metadata"].get("last_updated"),
            "total_posts_analyzed": len(historical_data.get("posts", {}))
        },
        "pain_points": []
    }

    for category, data in pain_points.items():
        # Sort posts by recency and engagement
        sorted_posts = sorted(
            data["posts"],
            key=lambda x: (x["created_utc"], x["upvotes"] + x["comments"]),
            reverse=True
        )

        pain_point = {
            "category": category,
            "total_upvotes": data["total_upvotes"],
            "total_comments": data["total_comments"],
            "sources": sorted_posts[:5]  # Top 5 most recent, engaged posts
        }
        report["pain_points"].append(pain_point)

    # Sort pain points by total engagement (upvotes + comments)
    report["pain_points"].sort(
        key=lambda x: (x["total_upvotes"] + x["total_comments"]),
        reverse=True
    )

    return report

def perform_topic_modeling(posts_df: pd.DataFrame) -> BERTopic:
    """Perform topic modeling using BERTopic and assign topics to posts."""
    logger.info("Performing topic modeling with BERTopic...")
    topic_model = BERTopic(language="english", nr_topics="auto", min_topic_size=15)
    topics, probabilities = topic_model.fit_transform(posts_df['cleaned_text'])
    posts_df['topic'] = topics

    # Get topic information and assign labels
    topics_info = topic_model.get_topic_info()
    topic_labels = {}
    for topic in topics_info['Topic']:
        if topic == -1:
            continue  # Skip outliers
        topic_words = topic_model.get_topic(topic)
        label = ' '.join([word for word, _ in topic_words[:3]])
        topic_labels[topic] = label

    posts_df['topic_label'] = posts_df['topic'].map(topic_labels).fillna("Unknown")

    return topic_model

def visualize_results(posts_df: pd.DataFrame, pain_points: Dict[str, Dict[str, Any]], subreddit: str) -> None:
    """Generate and save visualizations for the pain points analysis."""
    logger.info("Generating visualizations...")

    # Create visualization directory
    viz_dir = get_subreddit_cache_dir(subreddit) / "visualizations"
    viz_dir.mkdir(exist_ok=True)

    # Save timestamp for unique filenames
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")

    try:
        # Top Topics
        topic_counts = posts_df['topic_label'].value_counts().head(10)
        plt.figure(figsize=(12,8))
        sns.barplot(x=topic_counts.values, y=topic_counts.index, palette='viridis')
        plt.title(f'Top 10 Pain Point Categories in r/{subreddit} Subreddit')
        plt.xlabel('Number of Mentions')
        plt.ylabel('Pain Point Categories')
        plt.tight_layout()
        plt.savefig(viz_dir / f"top_topics_{timestamp}.png")
        plt.close()
        logger.info(f"Top topics visualization saved")

        # Sentiment Distribution
        sentiment_topic = posts_df.groupby('topic_label')['sentiment_label'].value_counts().unstack().fillna(0)
        sentiment_topic.plot(kind='bar', stacked=True, figsize=(15,10), colormap='Paired')
        plt.title('Sentiment Distribution Across Pain Point Categories')
        plt.xlabel('Pain Point Categories')
        plt.ylabel('Number of Posts')
        plt.legend(title='Sentiment')
        plt.tight_layout()
        plt.savefig(viz_dir / f"sentiment_distribution_{timestamp}.png")
        plt.close()
        logger.info(f"Sentiment distribution visualization saved")

        # Word Clouds per Topic
        for topic, label in pain_points.items():
            topic_text = posts_df[posts_df['topic_label'] == topic]['cleaned_text'].str.cat(sep=' ')
            if topic_text:  # Only generate if we have text
                output_path = viz_dir / f"wordcloud_{topic.replace(' ', '_')}_{timestamp}.png"
                generate_wordcloud(topic_text, f"Word Cloud for {topic}", output_path)

    except Exception as e:
        logger.error(f"Error generating visualizations: {str(e)}")
    finally:
        # Make sure all plots are closed
        plt.close('all')

def process_subreddit(subreddit_config: SubredditConfig) -> None:
    """Process a single subreddit configuration."""
    subreddit_name = subreddit_config["subreddit"]
    logger.info(f"Processing subreddit: r/{subreddit_name}")

    subreddit = reddit.subreddit(subreddit_name)

    # Load historical data
    historical_data = load_from_cache(subreddit_name, "historical_data.json")

    # If no historical data, seed it
    if not historical_data:
        historical_data = seed_historical_data(subreddit, subreddit_name)
        save_to_cache(historical_data, subreddit_name, "historical_data.json")

    # Get last run time or default to 90 days for fetching new posts
    last_run_time = get_last_run_time(subreddit_name)
    if not last_run_time:
        last_run_time = (datetime.now(timezone.utc) - timedelta(days=DATA_WINDOW_DAYS)).timestamp()

    # Fetch new data
    logger.info(f"Fetching new posts for r/{subreddit_name} since {datetime.fromtimestamp(last_run_time, timezone.utc)}")
    new_data = process_posts(subreddit, start_time=last_run_time)

    if new_data["metadata"]["posts_found"] > 0:
        # Merge with historical data
        logger.info(f"Merging {new_data['metadata']['posts_found']} new posts with historical data...")
        historical_data = merge_historical_data(historical_data, new_data, subreddit_name)
        save_to_cache(historical_data, subreddit_name, "historical_data.json")

        # Save last run time using newest post timestamp
        newest_post_time = new_data["metadata"]["newest_post_time"]
        if newest_post_time > 0:
            # Add a small buffer to avoid missing any posts
            save_last_run_time(subreddit_name, newest_post_time + 1)
        else:
            save_last_run_time(subreddit_name, new_data["metadata"]["fetch_end"])
    else:
        logger.info(f"No new posts found for r/{subreddit_name} since last run")

    # Convert historical posts to DataFrame for analysis
    posts_list = list(historical_data.get("posts", {}).values())
    posts_df = pd.DataFrame(posts_list)

    if posts_df.empty:
        logger.info(f"No posts to analyze for r/{subreddit_name}")
        return

    # Preprocess posts
    logger.info("Preprocessing text data...")
    posts_df['cleaned_text'] = posts_df['title'] + ' ' + posts_df['selftext']
    posts_df['cleaned_text'] = posts_df['cleaned_text'].apply(preprocess_text)

    # Perform Topic Modeling
    topic_model = perform_topic_modeling(posts_df)

    # Generate Topic Report
    generate_topic_report(topic_model, posts_df, subreddit_name)

    # Sentiment Analysis
    logger.info("Analyzing sentiment of posts...")
    posts_df['sentiment'] = posts_df['cleaned_text'].apply(analyze_sentiment)
    posts_df['sentiment_label'] = posts_df['sentiment'].apply(
        lambda x: 'Positive' if x >= 0.05 else ('Negative' if x <= -0.05 else 'Neutral')
    )

    # Aggregate Pain Points
    pain_points = aggregate_pain_points(historical_data, topic_model)

    # Assign pain points back to historical data
    for post in historical_data.get("posts", {}).values():
        post['topic'] = posts_df.loc[posts_df['id'] == post['id'], 'topic'].values[0]
        post['topic_label'] = posts_df.loc[posts_df['id'] == post['id'], 'topic_label'].values[0]

    # Generate Report
    logger.info(f"Generating pain points report for r/{subreddit_name}...")
    report = generate_pain_points_report(pain_points, historical_data)

    # Save report for frontend
    save_to_cache(report, subreddit_name, "pain_points.json")
    logger.info(f"Pain points analysis saved for r/{subreddit_name}")

    # Visualize Results
    visualize_results(posts_df, pain_points, subreddit_name)

def main():
    logger.info("Loading subreddit configurations...")
    configs = load_subreddit_configs()

    enabled_configs = [config for config in configs if config["enabled"]]
    logger.info(f"Found {len(enabled_configs)} enabled subreddits to process")

    for config in enabled_configs:
        try:
            process_subreddit(config)
        except Exception as e:
            logger.error(f"Error processing r/{config['subreddit']}: {str(e)}")
            continue

    logger.info("Processing complete!")

if __name__ == "__main__":
    main()
