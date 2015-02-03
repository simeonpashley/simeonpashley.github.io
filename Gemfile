source 'https://rubygems.org'

require 'json'
require 'open-uri'
versions = JSON.parse(open('https://pages.github.com/versions.json').read)

gem 'jekyll',  versions['jekyll']
gem 'hpricot'

gem 'github-pages', versions['github-pages']


group :jekyll_plugins do
  gem 'jekyll-compose', versions['jekyll-compose']
  gem 'jemoji', versions['jemoji']
  gem 'jekyll-mentions', versions['jekyll-mentions']
  gem 'jekyll-redirect-from', versions['jekyll-redirect-from']
  gem 'jekyll-sitemap', versions['jekyll-sitemap']
end