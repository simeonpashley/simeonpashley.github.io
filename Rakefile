require 'rake/testtask'

Rake::TestTask.new do |t|
  t.libs << "tests"
  t.test_files = FileList['tests/**/test_*.rb']
  t.verbose = true
end

task :default => :test

task :coverage do
  require 'simplecov'
  SimpleCov.start do
    add_filter '/tests/'
  end
  Rake::Task['test'].invoke
end
