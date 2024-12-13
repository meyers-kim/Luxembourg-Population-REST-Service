This project involves the development of a RESTful web service using Spring Boot to provide population data for Luxembourg based on user input for a specific year. The application fetches data from the Statec developer API to return detailed demographic statistics, including the total population, male and female counts, and a breakdown of Luxembourgish and foreign persons. If the input year is unavailable, the service returns the closest available data before and after the given year.

The project is further extended to include containerization using Docker, leveraging multi-stage builds for efficiency. The application is then deployed in a Kubernetes environment using Minikube or Kind, ensuring scalability with at least two replicas of the service running in the simulated cluster. Comprehensive instructions and documentation are provided across multiple README files to guide the user through building, running, and accessing the application.

Key Features:
REST API: Accepts a year as input and retrieves Luxembourg's population data in JSON format.
Error Handling: Handles invalid input and missing data gracefully by returning the closest available information.
Containerization: Implements a multi-stage Dockerfile for building and running the application efficiently.
Kubernetes Deployment: Deploys the REST service in a Minikube or Kind cluster with at least two replicas, ensuring high availability.
Documentation and Demonstration: Includes comprehensive README files for each step and a demonstration video showcasing the deployment and functionality.
