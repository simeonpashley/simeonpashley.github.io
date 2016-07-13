source 'https://rubygems.org'

require 'json'
require 'open-uri'
versions = JSON.parse(open('https://pages.github.com/versions.json').read)

gem 'hpricot'
gem 'kramdown'
gem 'mini_magick'
gem 'autoprefixer-rails'
gem 'uglifier'

gem 'activesupport', '4.2.6'
gem 'github-pages'

gem 'jekyll'

group :jekyll_plugins do
  gem 'jemoji', versions['jemoji']
  gem 'jekyll-mentions', versions['jekyll-mentions']
  gem 'jekyll-redirect-from', versions['jekyll-redirect-from']
  gem 'jekyll-sitemap', versions['jekyll-sitemap']
  gem 'jekyll-paginate', versions['jekyll-paginate']
end

group :nongh_jekyll_plugins do
  gem 'jekyll-archives'
  gem 'jekyll-tagging-related_posts'
end
