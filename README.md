# DCU Project Search Backend

**Live at https://prosearch.tomasb.ie:8080/**

Backend for the DCU project search frontend (https://github.com/teabolt/dcu_project_search_frontend).

The backend serves requests via a Node.js express server that supports HTTP and HTTPS. The backend requires an ElasticSearch database to retrieve search results and projects. See https://github.com/teabolt/dcu_project_search_elasticsearch.

## REST API

### General information

API version prefix: `api/v1/`

Authentication: none

### Resource information

#### search

Provides a list of student projects matching a certain search query.

* Endpoint: `/search`
* Method: GET
* Description: retrieve search results
* Querystring parameters:
  * `q`, string (required) - the search query to look up projects with
  * `from`, integer (default 0) - pagination offset, or from which index to return results from
  * `limit`, integer (default 10) - pagination size, or how many results to return
* Response format: `{ total: integer - number of matching projects, results: []project - matching projects }`

Example curl:
```
curl https://prosearch.tomasb.ie:8080/api/v1/search?q=test
```

#### projects

Provides information about particular student projects.

* Endpoint: `/projects`
* Method: GET
* Description: retrieve information about a project
* Querystring parameters:
  * `id`, string (required) - the ID of the project to look up. The ID is returned as part of the project details from search, but follows the format of `$year$index`.
* Response format: project JSON

Example curl:
```
curl https://prosearch.tomasb.ie:8080/api/v1/projects?id=20200
```

## Prerequisites

* Node.js
* npm

Install all dependencies from `package.json`:

`npm install`

Install production only dependencies:

`npm install --production`

## Running the backend

Run the web server:

`npm run start`

Build and run the Docker image:

```
sudo docker build -t tomasbalt/dcu_project_search_backend .
sudo docker run -p 3001:3001 tomasbalt/dcu_project_search_backend
```

See https://github.com/teabolt/dcu_project_search_deployment for running the backend docker image in production mode with HTTPS, on its own or with all other components.

## Development

### Running the development server

Run the Node.js server using live reload via nodemon:

`npm run dev`

### Test the project

Run ESlint linter to fix JavaScript issues:

```
npm run lint
```

Run unit tests using jest:

```
npm run test
```

Run prettify code formatter to automatically fix issues and check for prettify adherence:

```
npm run prettify
npm run prettify-check
```

### Tech stack

* Express for routing
* Morgan for logging middleware
* cors for Cross Origin Request handling.
* ElasticSearch for connecting to the ElasticSearch database.

### Repository structure

* `src/`
  * `index.js` - register middleware, routes and run Node.js web server.
  * `config/` - configuration and environment variable loading.
  * `db/` - wrapper methods for accessing the ElasticSearch database.
  * `routes/` - individual REST API handlers.
  * `utils/` - reusable JavaScript utility functions.
* `scripts/` - shell scripts for testing.

### Continuous Integration

This project uses Travis CI. The configuration can be found at `.travis.yml`.

See also https://travis-ci.org/github/teabolt/dcu_project_search_backend

## Related Repositories

- Frontend: https://github.com/teabolt/dcu_project_search_frontend
- Dataset of projects: https://github.com/teabolt/dcu_eng_comp_projects_dataset
- ElasticSearch database configuration scripts: https://github.com/teabolt/dcu_project_search_elasticsearch
- Project deployment scripts (docker compose): https://github.com/teabolt/dcu_project_search_deployment

## Credits

- Tomas Baltrunas (https://github.com/teabolt/)

## License

MIT
