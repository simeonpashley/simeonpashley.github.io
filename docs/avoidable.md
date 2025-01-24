# Prevention Rules

1. Always test production build locally before deploying:

   ```bash
   make build JEKYLL_ENV=production
   ```

2. Always specify Ruby version in `.ruby-version` and use:

   ```bash
   rbenv install $(cat .ruby-version)
   rbenv local $(cat .ruby-version)
   ```

3. Never modify Gemfile.lock directly - always use:

   ```bash
   bundle install
   bundle update
   ```

4. Always verify assets before deployment:

   ```bash
   make build
   ```

5. Always validate code before committing:

   ```bash
   make lint test
   ```

6. Never deploy without running:

   ```bash
   make build
   bundle exec htmlproofer ./_site
   ```

7. Always validate _config.yml before committing:

   ```bash
   ruby -e "require 'yaml'; YAML.load_file('_config.yml')"
   ```

8. Never use system Ruby - always use version manager

9. Always run full test suite before merging:

   ```bash
   make test coverage
   ```

10. Never commit without running:

    ```bash
    make lint test
