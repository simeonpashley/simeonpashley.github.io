# Development Environment Setup

## Prerequisites

- Python 3.11+
- Poetry 1.8.0+
- Node.js 18+ (for frontend dependencies)

## Installation

1. Clone the repository
2. Set up Python environment:

   ```bash
   poetry install
   poetry run pre-commit install
   ```

3. Install frontend dependencies:

   ```bash
   npm install
   ```

## Virtualenv Configuration

The project uses Poetry's virtualenv management. The virtualenv is automatically created in:
`/Users/simeon_1/Library/Caches/pypoetry/virtualenvs`

To activate the virtualenv:

```bash
poetry shell
```

## Development Workflow

1. Create a feature branch
2. Make changes
3. Run tests:

   ```bash
   poetry run pytest
   ```

4. Format code:

   ```bash
   poetry run black .
   poetry run ruff check --fix .
   ```

5. Commit changes (pre-commit hooks will run automatically)
6. Push branch and create PR

## Common Commands

- Run all tests: `poetry run pytest`
- Run tests with coverage: `poetry run pytest --cov`
- Format code: `poetry run black . && poetry run ruff check --fix .`
- Check types: `poetry run mypy src`
- Build site: `poetry run jekyll build`
