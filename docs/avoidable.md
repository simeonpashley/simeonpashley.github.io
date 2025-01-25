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
    ```

11. Always organize test files alongside components:
    - Place test files in the same directory as the component
    - Use `.test.tsx` suffix for test files
    - Maintain 1:1 correspondence between components and test files

12. Implement proper error boundaries:
    - Always use error and reset parameters
    - Display meaningful error messages
    - Include retry functionality
    - Test error boundary behavior

13. Follow TypeScript best practices:
    - Use strict type checking
    - Avoid `any` type
    - Use proper type definitions for props
    - Validate types at runtime when necessary

14. Test all component variants:
    - Create tests for each prop variant
    - Test edge cases and error states
    - Verify proper styling for each variant
    - Test component interactions

15. Use proper HTML entities:
    - Escape special characters
    - Use `&rsquo;` for apostrophes
    - Use `"` for quotes
    - Validate HTML in tests

16. Maintain test coverage:
    - Aim for 100% coverage
    - Verify coverage reports
    - Add tests for uncovered code
    - Run coverage checks in CI

17. Dependency management:
    - Always specify exact versions in package.json
    - Use pnpm for package management
    - Verify Node.js version compatibility
    - Check for deprecated dependencies regularly
    - Update dependencies in controlled batches

18. ESLint configuration:
    - Use supported ESLint versions
    - Maintain consistent linting rules
    - Verify linting in pre-commit hooks
    - Address all linting warnings
    - Keep eslint-config-next up to date

19. Node.js version constraints:
    - Verify compatibility with hosting platform
    - Use .nvmrc for local development
    - Test with target Node.js version
    - Avoid breaking changes in dependencies
    - Document version requirements

20. Testing verification:
    - Run tests before every commit
    - Verify component variants
    - Test error boundaries
    - Check for console warnings
    - Verify production builds
