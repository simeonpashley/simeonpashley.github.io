source 'https://rubygems.org'

require 'json'
require 'open-uri'
versions = JSON.parse(open('https://pages.github.com/versions.json').read)

gem 'hpricot'
gem 'kramdown'
gem 'breakpoint'
gem 'mini_magick'
gem 'autoprefixer-rails'
gem 'uglifier'

gem 'activesupport', '4.2.6'
gem 'github-pages'

gem 'jekyll'

group :jekyll_plugins do
  gem 'jekyll-compose', versions['jekyll-compose']
  gem 'jekyll-mentions', versions['jekyll-mentions']
  gem 'jekyll-sitemap', versions['jekyll-sitemap']
  gem 'jekyll-paginate', versions['jekyll-paginate']
  gem 'jekyll-assets', versions['jekyll-assets']
  gem 'jekyll-archives', versions['jekyll-archives']
  gem 'jemoji', versions['jemoji']
  gem 'jekyll-tagging-related_posts', versions['jekyll-tagging-related_posts']
end
