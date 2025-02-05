import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import striptags from 'striptags';
// Adjust these paths as needed
const postsDirectory = '/Users/simeon_1/_sites/simeonpashley.github.io/_posts';
const outputDataPath = path.join(process.cwd(), 'public', 'data', 'posts-data.json');
const outputPostPath =
  '/Users/simeon_1/_sites/simeonpashley.github.io/simora-blog/public/data/_posts';

// Utility: create a slug from a string (e.g. the title)
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s]+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

const EXCERPT_CHAR_LIMIT = 150;

function fixMalformedFrontMatter(fileContents) {
  // If the file starts with a proper opening delimiter, try to fix the closing delimiter
  // This regex finds a closing delimiter '---' that is not on its own line.
  // It looks for any occurrence of '---' that is immediately preceded by a non-newline character.
  // Then it inserts a newline before it.
  return fileContents.replace(/(?<=[^\n])---/g, '\n---');
}

async function processMarkdown(content) {
  const { remark } = await import('remark');
  const html = (await import('remark-html')).default;

  const processedContent = await remark().use(html).process(content);
  return processedContent.toString();
}

// Loop through each file and extract front matter.
// If a slug is not provided, generate one from the title.
async function processPosts() {
  const fileNames = fs.readdirSync(postsDirectory).filter((fn) => fn.endsWith('.md'));
  const posts = [];
  const categoriesSet = new Set();
  const tagsSet = new Set();

  for (const fileName of fileNames) {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Parse front matter using gray-matter
    const matterResult = matter(fixMalformedFrontMatter(fileContents));
    const frontMatter = matterResult.data;

    // Create a slug: use provided slug, or generate one from the title
    let slug = frontMatter.slug;
    if (!slug && frontMatter.title) {
      slug = slugify(frontMatter.title);
    }
    if (!slug) {
      // Fallback to using the file name without extension
      slug = fileName.replace(/\.md$/, '');
    }

    // Accumulate categories and tags
    (frontMatter.categories || []).forEach((cat) => categoriesSet.add(cat));
    (frontMatter.tags || []).forEach((tag) => tagsSet.add(tag));

    if (frontMatter.home_preview) {
      frontMatter.built_excerpt = frontMatter.home_preview;
    } else if (frontMatter.excerpt) {
      frontMatter.built_excerpt = frontMatter.excerpt;
    } else {
      try {
        const contentHtml = await processMarkdown(matterResult.content);
        const plainText = striptags(contentHtml); // Remove all HTML tags
        const words = plainText.split(/\s+/);
        frontMatter.built_excerpt = words.slice(0, EXCERPT_CHAR_LIMIT).join(' ').trim();
      } catch (error) {
        console.error(`Error processing ${fileName}:`, error);
        frontMatter.built_excerpt = '';
      }
    }

    fs.writeFileSync(`${outputPostPath}/${fileName}`, matterResult.content, 'utf8');

    posts.push({
      fileName,
      slug,
      ...frontMatter,
    });
  }

  return {
    posts,
    categories: Array.from(categoriesSet),
    tags: Array.from(tagsSet),
  };
}

function writeData(collatedData) {
  const outputDir = path.dirname(outputDataPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  fs.writeFileSync(outputDataPath, JSON.stringify(collatedData, null, 2), 'utf8');
  console.log('Prebuild data written to:', outputDataPath);
}

function cleanOutput() {
  if (fs.existsSync(outputPostPath)) {
    fs.rmSync(outputPostPath, { recursive: true, force: true });
  }
  fs.mkdirSync(outputPostPath, { recursive: true });
}

// Run the processing and write out JSON data
async function runPrebuildProcess() {
  // Remove the output directory if it exists, then recreate it
  cleanOutput();

  const collatedData = await processPosts();

  // Ensure the output directory exists
  writeData(collatedData);
}

// Run the script if executed directly
(async () => {
  await runPrebuildProcess();
})();
