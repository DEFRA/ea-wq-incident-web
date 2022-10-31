# EA Incident Management Incident Form

A digital service to enable complaints about Environment Agency incidents to be registered. 
This is the web front end for the application.

The service gathers information using a GDS Style form, and emails the resultant details to the specified address.
To run the service locally a suitable [GOV.UK Notify](https://www.notifications.service.gov.uk) service account is required. 
See the [Environment Variables](#environment-variables) section for further details.

## Prerequisites

- Docker
- Docker Compose

Optional:
- Kubernetes
- Helm

## Environment variables

The following environment variables are required by the application container.
Values for development are set in the Docker Compose configuration. Default
values for production-like deployments are set in the Helm chart and may be
overridden by build and release pipelines.

| Name                           | Description                               | Required  | Default            | Valid                       
| ----                           | -----------                               | :-------: | -------            | -----   
| EMAIL_TO_ADDRESS               | Email address to receive incident details | yes       | NA                 | any valid email address
| NOTIFY_API_KEY                 | Api key for [GOV.UK Notify](https://www.notifications.service.gov.uk)      | yes       | NA                 |
| NOTIFY_TEMPLATE_ID             | ID of Notify template                     | yes       | NA                 | The template is expecting the following fields: `firstName, lastName, addressLine1, addressLine2, townOrCity, county, postcode, email, phonenumber, strength, atHome, location, description, date, hour, minute` |
| COOKIE_PASSWORD                | Cookie password                           | yes       | NA                 |                             
| NODE_ENV                       | Node environment                          | no        | development        | development,test,production 
| PORT                           | Port number                               | no        | 3000               |                             
| STATIC_CACHE_TIMEOUT_IN_MILLIS | static file cache timeout                 | no        | 54000 (15 minutes) |                             

## Test structure

The tests have been structured into subfolders of ./test as per the
[Microservice test approach and repository structure](https://eaflood.atlassian.net/wiki/spaces/FPS/pages/1845396477/Microservice+test+approach+and+repository+structure)

## How to run tests

A convenience script is provided to run automated tests in a containerised
environment. This will rebuild images before running tests via docker-compose,
using a combination of `docker-compose.yaml` and `docker-compose.test.yaml`.
The command given to `docker-compose run` may be customised by passing
arguments to the test script.

Examples:

```
# Run all tests
scripts/test

# Run tests with file watch
scripts/test -w
```
## Running the application

The application is designed to run in containerised environments, using Docker
Compose in development and Kubernetes in production.

- A Helm chart is provided for production deployments to Kubernetes.

### Build container image

Container images are built using Docker Compose, with the same images used to
run the service with either Docker Compose or Kubernetes.

When using the Docker Compose files in development the local `app` folder will
be mounted on top of the `app` folder within the Docker container, hiding the
CSS files that were generated during the Docker build.  For the site to render
correctly locally `npm run build` must be run on the host system.


By default, the start script will build (or rebuild) images so there will
rarely be a need to build images manually. However, this can be achieved
through the Docker Compose
[build](https://docs.docker.com/compose/reference/build/) command:

```
# Build container images
docker-compose build
```

### Start and stop the service

Use Docker Compose to run service locally.

`docker-compose up`

#### Probes

The service has both an Http readiness probe and an Http liveness probe
configured to receive at the below end points.

Readiness: `/healthy`
Liveness: `/healthz`

## Service down page

The repository includes a [Service Down](./service-down/down.html) place holder page which is displayed by the F5 Silverline WAF when the site is unavailable. The file meets Silverline's guidelines of a small standalone page of less that 51200 bytes.

**Note:** the page includes special formatting for Silverline's support ID - `<%TS.request.ID()%>`. 
This ensures that blocked requests can be identified.

## Licence

THIS INFORMATION IS LICENSED UNDER THE CONDITIONS OF THE OPEN GOVERNMENT
LICENCE found at:

<http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3>

The following attribution statement MUST be cited in your products and
applications when using this information.

> Contains public sector information licensed under the Open Government license
> v3

### About the licence

The Open Government Licence (OGL) was developed by the Controller of Her
Majesty's Stationery Office (HMSO) to enable information providers in the
public sector to license the use and re-use of their information under a common
open licence.

It is designed to encourage use and re-use of information freely and flexibly,
with only a few conditions.
