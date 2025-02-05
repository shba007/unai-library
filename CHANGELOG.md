# unai

## 0.3.0

### Minor Changes

- 4ae3d62: feat: add new example scripts for audio and image generation, add new openai models

## 0.2.0

### Minor Changes

- e4b5dab: feat: add example scripts and added image support for openai

## 0.1.1

### Patch Changes

- 4d2af6e: chore: add commitlint and husky for commit message linting

## 0.1.0

### Minor Changes

- 79b419e: feat(unai): implement initial version of the UnAI library

### Patch Changes

- 0c80c59: chore: add initial files and configurations for the project

  This commit includes the following changes:

  - Adds basic project files such as LICENSE, README, .gitignore, .prettierignore, etc.
  - Sets up configurations for ESLint, Prettier, Renovate, and TypeScript.
  - Adds initial test setup with Vitest.
  - Introduces a basic implementation of the UnAI library with support for different models and providers.
  - Includes utility functions for CSV parsing, path creation, promise pooling, stream reading, and slugification.
  - Adds support for structured output and function calling.
  - Improves code structure and organization.
  - Updates documentation and examples.

- 23b051e: ci: add CI and CD workflows

  Adds CI and CD workflows to automate the build, test, and release process. The CI workflow runs on every push to the 'develop' branch and includes linting. The CD workflow runs on every tag push and publishes the package to NPM. This change improves the development workflow and ensures code quality.
