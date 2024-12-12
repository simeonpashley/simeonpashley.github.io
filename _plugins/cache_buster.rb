module Jekyll
  module CacheBuster
    require 'digest/md5'
    def cache_buster(file_name)
      # repo = Grit::Repo.new(Dir.pwd)
      # rev = repo.log("main", "#{Dir.pwd}#{@resource}").first.id_abbrev
      # suffix = Digest::MD5.hexdigest(File.read(File.join('.', file_name)))
      suffix = Time.now.to_i
      processed_file_name = file_name.gsub(%r{/_site/assets/}, '/assets/')
      [processed_file_name, '?v=', suffix].join
    end
  end
end

Liquid::Template.register_filter(Jekyll::CacheBuster)
