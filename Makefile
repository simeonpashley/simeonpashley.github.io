# Development Commands

.PHONY: test lint coverage build serve

test:
	@echo "Setting up test environment..."
	@bundle install
	@echo "Running tests..."
	@bundle exec rake test

lint:
	@echo "Running linters..."
	@bundle exec rubocop
	@npm run lint

coverage:
	@echo "Setting up test environment..."
	@bundle install
	@echo "Checking test coverage..."
	@bundle exec rake coverage

build:
	@echo "Building site..."
	@bundle exec jekyll build

serve:
	@echo "Starting development server..."
	@bundle exec jekyll serve

clean:
	@echo "Cleaning build artifacts..."
	@rm -rf _site .jekyll-cache

all: clean lint test build
