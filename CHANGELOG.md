# unai

## 0.2.4

### Patch Changes

- 9594df9: feat: add debug callback to AI run function for enhanced logging

## 0.2.3

### Patch Changes

- 67ed408: refactor: add debug callback to API functions for enhanced logging

## 0.2.2

### Patch Changes

- c983319: refactor: update model references and streamline request body construction for Google and OpenAI APIs

## 0.2.1

### Patch Changes

- 6108295: refactor: replace pipeStream with mapStream for improved stream handling and update example scripts

## 0.2.0

### Minor Changes

- 4ae3d62: feat: add new example scripts for audio and image generation, add new openai models
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
