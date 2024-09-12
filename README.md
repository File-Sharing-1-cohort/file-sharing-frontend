# File Sharing

FileSharing is a file sharing platform that allows users to easily upload, store, and share files with others. Whether you’re sharing documents or images FileSharing provides a secure and convenient way to access and collaborate on files from anywhere.э

#### Key Features

...

## System requirements

### Version requirements

- Node.js 21.x or later
- npm 10.x or later

### Required software

...

## Architecture

[FSD](https://feature-sliced.design/ru/docs/get-started/overview)

### src folder structure:

- **`app`**: Main application configuration, including routing settings and global state management.
- **`pages`**: Components representing different routes or pages of the application.
- **`widgets`**: Independent and reusable widgets or components that can be used across various pages.
- **`features`**: Functional areas of the application, each with its own components, hooks, and logic (e.g., authentication, user profiles).
- **`entities`**: Domain-specific data models and business logic (e.g., user models, orders).
- **`shared`**: Common utilities, components, and hooks used throughout the application.

## Installing Dependencies

1. Ensure that Node.js and npm are installed on your machine. You can verify the installation by running:

   ```bash
   node -v
   npm -v
   ```

2. Clone the project repository:

   - using HTTP

     ```bash
     git clone https://github.com/File-Sharing-1-cohort/file-sharing-frontend.git
     ```

   - using SSH

     Refer to the documentation -> [Docs](https://docs.github.com/ru/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)

3. Navigate to the project directory:

   ```bash
   cd file-sharing-frontend
   ```

4. Install all dependencies by running the following command:

   ```bash
    npm i
   ```

## Environment Setup

- Create a .env file in the root of the project

## Project Scripts

- **dev**

  ```bash
  vite
  ```

  Runs the development server using Vite, allowing you to develop and preview changes locally.

- **format**

  ```bash
  prettier . --ignore-path .gitignore --write
  ```

  Formats the codebase using Prettier, ignoring files listed in .gitignore. Install Prettier - Code formatter plagin for VS code.
  **Be sure that VS Code has no default formatting and references the file in the root of the project**

- **lint**

  ```bash
  eslint . --ignore-pattern .gitignore --fix
  ```

  Lints the codebase using ESLint, ignoring files listed in .gitignore and automatically fixing issues where possible. Install **ESLint plagin.**

- **fix**

  ```bash
  npm run format & npm run lint
  ```

  Runs both the format and lint scripts, chaining them together. It formats the code and then lints it.

- **build**

  ```bash
  tsc -b && vite build
  ```

  Builds the project by first compiling TypeScript using tsc and then creating a production build using Vite.

- **prepare**

  ```bash
  husky
  ```

  Sets up Husky for managing Git hooks. This script is typically used to configure hooks for tasks like linting and formatting before committing code.

## Contribution

- Go to `develop` branch and pull the latest version
- Create a branch with the name `feature/your-feature-name` from `develop`. The first part is type that can be 'feature', 'fix' or 'docs'
- Code, lint, commit and push into new branch
- For commit messages, use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
- Commit message should be short, but add more text to the body if there is something to explain about this commit. For ex check [commit history of React Native](https://github.com/facebook/react-native/commit/3621606c4486051de8b443c443cd87f6b822d1a0)
- Here is a good [article](https://chris.beams.io/posts/git-commit/) about making Git commit messages
- If you're branch gets outdated (new commits in `develop`), please rebase it, not merge
- Create a PR with the detailed description and photo/video if needed. Use `.github/pull_request_template.md` as the description for your PR
- Get approval
- Close PR via `Squash and merge`. Do not merge without approval (by at least 1 team member of your profession). Cross-review between team members (peer review) must be present.
- Delete branch
- Check it on staging as soon as it is deployed (connect Slack to Github to get notification)

[More details](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)
