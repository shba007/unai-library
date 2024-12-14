---
'unai': patch
---

ci: add CI and CD workflows

Adds CI and CD workflows to automate the build, test, and release process.  The CI workflow runs on every push to the 'develop' branch and includes linting. The CD workflow runs on every tag push and publishes the package to NPM.  This change improves the development workflow and ensures code quality.