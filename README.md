# Gadgets API

This API provides endpoints for managing gadgets, including listing, adding, updating, deleting, and self-destructing gadgets.  It also includes authentication endpoints for registration and login.

## Endpoints

### Gadget Management

* **List all gadgets with success probability:**
    * `GET http://localhost:PORT/gadgets`
    * Returns a list of all gadgets with their associated success probabilities.

* **All details of all gadgets:**
    * `GET http://localhost:PORT/all`
    * Returns detailed information about all gadgets.

* **Add a gadget:**
    * `POST http://localhost:PORT/gadgets`
    * Body (JSON):
      ```json
      {
        "name": "name",
        "status": "Available" || "Deployed" || "Destroyed" || "Decommissioned"
      }
      ```
    * Creates a new gadget with the provided name and status.  Valid status values are "Available", "Deployed", "Destroyed", and "Decommissioned".

* **Modify/Update details of a gadget:**
    * `PATCH http://localhost:PORT/gadgets/:id`
    * `:id` represents the unique identifier of the gadget to be updated.
    * Body (JSON - can contain any of the fields from the POST request to update specific fields):
        ```json
        {
          "name": "new name",
          "status": "Deployed" //Example
        }
        ```
    * Updates the details of the specified gadget.

* **Delete/Decommission a gadget:**
    * `DELETE http://localhost:PORT/gadgets/:id`
    * `:id` represents the unique identifier of the gadget to be deleted/decommissioned.
    * Deletes or marks the specified gadget as decommissioned.

* **Self-destruct any gadget:**
    * `POST http://localhost:PORT/gadgets/:id/self-destruct`
    * `:id` represents the unique identifier of the gadget to be self-destructed.
    * Triggers the self-destruction process for the specified gadget.  Requires authentication (see below).

### Authentication

* **Register:**
    * `POST http://localhost:PORT/auth/register`
    * Body (JSON):
      ```json
      {
        "email": "email",
        "password": "password",
        "confirmPassword": "confirmPassword"
      }
      ```
    * Registers a new user.  Password and confirmPassword must match.

* **Login:**
    * `POST http://localhost:PORT/auth/login`
    * Body (JSON):
      ```json
      {
        "email": "email",
        "password": "password"
      }
      ```
    * Logs in an existing user and returns a token.

## Authentication

All the endpoints `except GET` requires authentication.  You must include a valid bearer token in the `Authorization` header of your request.  You can obtain a token by registering and then logging in using the authentication endpoints.


## Error Handling

The API will return appropriate HTTP status codes to indicate the success or failure of a request.  Error responses will typically include a JSON body with details about the error.

## Base URL

The base URL for all API endpoints is `http://localhost:PORT`.  Replace `PORT` with the actual port number your API is running on.