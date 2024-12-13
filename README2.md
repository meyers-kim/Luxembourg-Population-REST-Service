# Luxembourg Population Service - Docker Setup

This document provides instructions to build and run the Luxembourg Population Service in a Docker container.

## Part 2: Running the Application in Docker

### Prerequisites
You need to have **Docker** installed on your machine.

### Building the Docker Image

1. Open a terminal in the root directory of this project (where the Dockerfile is located).
2. Run the following command to build the Docker image:

   ```bash
   docker build -t luxembourg-population-service .
    ```
    This command creates a Docker image named luxembourg-population-service.

### Running the Docker Container

1. After building the image, start a container from the image with:
    ```bash
   docker run -p 3000:3000 luxembourg-population-service

    ```
    If port 3000 is occupied, mapping the container's port 3000 to port 3001 on your machine works.
2. The application should now be available at http://localhost:3000.

### Accessing the Application

To retrieve Luxembourg population data for a given year, use the following URL format in your browser or API client:
    ```
   http://localhost:3000/population/{year}
    ```