Express API with DynamoDB
=========================

This project contains an Express-based REST API to interact with a DynamoDB table named 'WebPageData'. The API allows you to create, retrieve, query, and scan items in the table.

Getting Started
---------------

These instructions will help you set up the project locally.

### Prerequisites

-   Node.js (v14 or later)
-   AWS DynamoDB connection or localstack for local development
-   dotenv configured with the appropriate environment variables

### Environment Variables

Set the following environment variable:

-   `PORT` - The port number for the server (default: 3000)
-   `AWS_ACCESS_KEY_ID` 
-   `AWS_SECRET_ACCESS_KEY`
-   `AWS_SESSION_TOKEN`

Create a `.env` file in the root directory of your project to set this variable.

### DynamoDB Setup

This project requires a connection to AWS DynamoDB. You can set up a local DynamoDB instance using localstack. Follow the [localstack documentation](https://github.com/localstack/localstack) to get started.

The table schema is defined as:

-   `Url` (String): Hash Key
-   `DateCrawled` (String): Range Key

### Installation

1.  Clone the repository

    `git clone https://github.com/carmonac/adsecure.git`

2.  Navigate to the project directory

    `cd adsecure/task2`

3.  Install the required dependencies

    `npm install`

4.  Run the server

    `npm start:dev`

Endpoints
---------

### GET `/`

Returns all items in the 'WebPageData' table.

### GET `/:url`

Returns items matching the given URL.

### GET `/:url/:dateCrawled`

Returns the item that matches the given URL and date crawled.

### POST `/`

Adds a new item with the provided URL and data.

#### Request Body

`{ "url": "example.com", "data": "Some data" }`

Error Handling
--------------

The API returns appropriate HTTP status codes for different error scenarios:

-   `404 Not Found`: If the requested URL or date crawled is not found
-   `400 Bad Request`: If the required parameters are missing from the request body
-   `500 Internal Server Error`: If there's an error in processing the request

License
-------

This project is licensed under the MIT License. See the `LICENSE` file for details.