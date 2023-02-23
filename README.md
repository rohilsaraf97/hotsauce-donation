## Vite+React, React Router Dom, Tailwind, Eslint, Prettier, Husky, Docker Compose Template

This is a barebones template for a web application built with Vite+React, React Router Dom, Tailwind, Eslint, Prettier, Husky, and Docker Compose. It's a starting point for building a modern web application using some of the most popular and widely used web development technologies.

### Getting started

To get started with this template, follow these steps:

1. Clone the repository using `git clone https://github.com/rohilsaraf97/wooky-template.git`.
2. Change into the project directory using `cd wooky-template`.
3. Install dependencies using `npm install`.
4. Start the development server using `npm run dev`.

### Building and running the app with Docker Compose

This template comes with a Docker Compose configuration file that can be used to build and run the app inside a Docker container. To do this, follow these steps:

1. Build the Docker image using `docker compose build`.
2. Start the container using `docker compose up` (or) `docker compose up -d` to start the container in the background.
3. Access the app in your browser at `http://localhost:3000`.
4. Since the docker-compose file uses volumes, local changes (during development) in the project directory will be reflected in the docker container.

### Technology Stack

This template uses the following technologies:

- [Vite](https://vitejs.dev/) - Build tool and development server for modern web apps.
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces.
- [React Router Dom](https://reactrouter.com/en/6.8.1) - A routing library for React applications.
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework.
- [ESLint](https://eslint.org/) - A pluggable and configurable linter for JavaScript and JSX.
- [Prettier](https://prettier.io/) - An opinionated code formatter.
- [Husky](https://typicode.github.io/husky/#/) - A tool for running Git hooks.
- [Docker Compose](https://docs.docker.com/compose/) - A tool for defining and running multi-container Docker applications.

### Contributing

If you find any issues with this template or have suggestions for improvements, please feel free to open an issue or submit a pull request.
