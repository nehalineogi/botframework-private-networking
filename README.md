# BotFramework Direct Line Chat App using Private Networking
# Secure/Private Direct Line Chat App

This repository contains a full-stack application with a React frontend and an Express backend. The application integrates with the Direct Line API using the App Service Direct Line Extension to enable private communication between the client and server. The frontend includes a web chat interface that connects to the backend to fetch Direct Line tokens, ensuring secure and private interactions.

# React WebChat (Frontend Component)

This project contains a React component that integrates with the Direct Line API to render a web chat interface. The server is set up to generate Direct Line tokens using the App Service Direct Line Extension API, allowing the client to connect privately to the server.

# Node.js (Backend Component)

The backend of this application is built using Express.js. It serves as the API server and handles requests to generate Direct Line tokens using the App Service Direct Line Extension API. The server also serves the static files for the React frontend. It listens on a specified port (default is 5000) and includes routes for generating tokens and serving the frontend's index.html file for any unmatched routes. This setup ensures secure and private communication between the client and server.

## Description

The `WebChat` component initializes a web chat interface using the Direct Line API. It fetches a Direct Line token from the server and uses it to create a Direct Line connection. The chat interface is rendered inside a div with the id `webchat`.

## Environment Variables

This application uses the following environment variables:

- `REACT_APP_DIRECTLINE_URL`: The base URL for the Direct Line API.
- `DIRECTLINE_SECRET`: The secret key for the Direct Line API.


## Installation

1. Clone the repository:

    ```sh
    git clone <repository-url>
    ```

2. Install frontend dependencies and build the frontend:

    ```sh
    cd frontend
    npm install
    npm run build
    ```

3. Install backend dependencies:

    ```sh
    cd backend
    npm install
    ```

## Deployment
From the root directory of the project

1. Create a zip file of the project, excluding specified directories:

    ```sh
    cd <root-directory-for-the-project>
    zip -r app.zip * -x "node_modules/*" "frontend/node_modules/*" "backend/node_modules/*" "*.zip" "*.log"
    ```

2. Deploy to an existing Azure Web App:

    ```sh
    # Variables
    RESOURCE_GROUP=<your-resource-group>
    APP_SERVICE_PLAN=<your-app-service-plan>
    WEBAPP_NAME=<your-webapp-name>

    az webapp deploy --resource-group $RESOURCE_GROUP --name $WEBAPP_NAME --src-path app.zip --type zip
    ```


## License

This project is licensed under the MIT License.


## Contributors
- Walter Novoa [LinkedIn](https://www.linkedin.com/in/warnovav/) [GitHub](https://github.com/warnovav)