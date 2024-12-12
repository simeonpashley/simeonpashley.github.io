module Jekyll
  module CacheBuster
    require 'digest/md5'
    def cache_buster(file_name)
      md5_digest = Digest::MD5.hexdigest(File.read(File.join('.', file_name)))
      processed_file_name = file_name.gsub(%r{/_site/assets/}, '/assets/')
      [processed_file_name, '?v=', md5_digest].join
    end
  end
end

Liquid::Template.register_filter(Jekyll::CacheBuster)
