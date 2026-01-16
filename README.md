# Awork Challenge - Advanced User List

This project is a solution for the Awork coding challenge, demonstrating high-performance Angular techniques including Web Workers, Virtual Scrolling, and Signals.

### Prerequisites

- Install [Node.js](https://nodejs.org/) which includes [Node Package Manager][npm](https://www.npmjs.com/get-npm)
- Run `npm install` to install the node packages

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Features

- **High Performance**: Renders 5,000 users at 60fps using Virtual Scrolling.
- **Web Worker**: Offloads grouping, sorting, and searching to a background thread to keep the UI responsive.
- **Dynamic Grouping**: Instantly regroup by Alphabet, Age, or Nationality.
- **Client-Side Search**: Fast filtering of the entire dataset.
- **Responsive Design**: Polished UI with smooth expansion animations.

## Documentation

For a deep dive into the architectural decisions and technical approach, please see [FEATURE_DOCUMENTATION.md](./FEATURE_DOCUMENTATION.md).

---
*Generated with Angular CLI version 17+*
