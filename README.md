<div align="center">
  <img src="public/banner.png">
</div>

<!-- Prototype / Pre-Alpha / Alpha / Beta / Release  -->

<div align="center">
<br>

![GitHub last commit (branch)](https://img.shields.io/github/last-commit/Canfus/music-app/main)
![GitHub commit activity](https://img.shields.io/github/commit-activity/w/Canfus/music-app)
![Development Stage](https://img.shields.io/badge/Development_Stage-Prototype-blue)

</div>

### Features:

- Free unlimited music playback.
- User profiles.
- Custom playlists with ability to share.
- "Suggested" playlist, based on your listen history.
- Discord Rich Presence.

## Installation

Clone the repository:

```
git clone https://github.com/Canfus/music-app.git
```

Open the repository root folder and install frontend dependencies:

```
cd music-app
npm ci
```

Do the same for backend:

```
cd server
npm ci
```

## Usage

To start the development server, run the following command:

```
npm run dev

# or start them separately:
npm run dev:server
npm run dev:client
```

To build the project, run the following command:

```
npm run build
```

To lint files in `src` directory, run the following command:

```
npm run lint
```

To format the code by using `Prettier`, run the following command:

```
npm run format
```

To build & start the `Storybook` documentation server, run the following command:

```
npm run build-storybook
npm run storybook
```

## Scripts

- `dev`: Starts both the server and client side.
- `dev:client`: Starts the client side using Vite.
- `dev:server`: Starts the development server using Nodemon.
- `build`: Builds the project with TypeScript and Vite.
- `lint`: Lints the TypeScript files in the `src` directory using ESLint.
- `format`: Formats the code using Prettier.
- `build-storybook`: Builds the Storybook documentation.
- `storybook`: Starts the Storybook server on port 6006.
