# Luxembourg Population Service - Kubernetes Deployment

This document describes the steps to deploy the Luxembourg Population Service in a local Kubernetes cluster using Minikube.

## Part 3: Deploying the Application in Minikube

### Prerequisites

You need to have **Minikube** and **kubectl** installed on your machine.

### Steps to Deploy

1. **Start Minikube**

   Start Minikube with Docker as the driver:
   ```bash
   minikube start --driver=docker
   ```
2. **Load the Docker Image into Minikube**

    Configure your terminal to use Minikube's Docker daemon:
    ```bash
   & minikube -p minikube docker-env --shell=powershell | Invoke-Expression
   ```

   Then build the Docker image directly within Minikube:
   ```bash
   docker build -t luxembourg-population-service .
   ```

3. **Apply the Deployment and Service**

    ```bash
   kubectl apply -f deployment.yaml
    kubectl apply -f service.yaml
   ```

4. **Access the Application**

    Use the following command to access the application:
    ```bash
   minikube service luxembourg-population-service
   ```

   This will open the application in a browser at a URL provided by Minikube, such as: http://127.0.0.1:55249/population/2020.


### Video

Link to my video: https://youtu.be/RLQSt2WZ5Sc