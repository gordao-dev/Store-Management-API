# Management API

## Introduction

[Management API] This API Management is a system that helps stores to manage products available.

## Feature

- Products management;

## How to run

1. install project project dependencies:

   `npm install` or `yarn install`

2. copy `docker-compose.yml` located at the root folder to a new `docker-compose.override.yml` file or update `docker-compose.yml` itself within the credentials that you want to create the containers.

3. Set up docker containers:

   `docker-compose -f docker-overrider.yml up -d`

   or `docker-compose up -d` if you updated `docker-compose.yml`

4. Copy `orm.config.example.json` located at the root folder to a new `orm.config.json` file and fill it with the credentials that you have set up when creating the containers.

5. Copy `.env.example` located at the root folder to a new `.env` file and fill it with the credentials that you have set up on the past steps.

6. If you make sure that your containers were successfully created, run TypeORM migrations:

   `npm typeorm migratins:run` or `yarn typeorm migration:run`

7. Run project:

   `npm run dev` or `yarn dev`
