# LinkFarm Website

This is a [Next.js](https://nextjs.org) based website

The project's structure is as follows:

- An Adonis.js Backend
- A Next.js frontend that uses React for rendering components, custom hooks for API requests to Strapi to fetch data, and responsive design.

## Content

- A dynamic frontend built with [Next.js](https://nextjs.org) in `/packages/web` folder

## Quick start

1. Clone this repository

2. `yarn install` in the project root folder on local to install npm packages

3. `yarn start` to start the studio and frontend locally
   - Your CMS should be running on ...
   - Your frontend should be running on [http://localhost:3000](http://localhost:3000)

4. Lint the code with:

```bash
# Linting scss files run
   yarn lint-fix:scss
# Linting ts and tsx files
   yarn lint-fix
# Format using prettier
   yarn prettier
# Before any commit run
   yarn precommit
```

6. `yarn build` in the project root folder to build all apps in the project for production (website and cms)

## Deploy changes

1. Vercel automatically deploys new changes committed to `master` / `develop` / "stage" branches on GitHub to separate domains (if user who push code registered in our Vercel Team).

2. There are Github Actions used to deploy CMS app to DigitalOcean k8s cluster

3. PostgreSQL DB used for Strapi CMS in DigitalOcean management PostgreSQL cluster for production deployments
