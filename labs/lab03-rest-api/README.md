# Lab 3 - REST API with Express

## Overview

This lab implements a small REST-style API using Express.

## Features

This API manages a collection of items.

Each item must have at least:

```json
{
  "id": 1,
  "name": "keyboard",
  "quantity": 10
}
```

The following routs are supported:

| Method | Route | Description |
|---|---|---|
| GET | `/health` | Return a simple health check response |
| GET | `/items` | Return all items |
| GET | `/items/:id` | Return one item by ID |
| POST | `/items` | Create a new item |
| PUT | `/items/:id` | Update an existing item |
| DELETE | `/items/:id` | Delete an existing item |

## Example Routes

### `GET /health`

Returns:

```json
{
  "status": "ok"
}
```

### `GET /items`

Returns an array of items.

Example response:

```json
[
  {
    "id": 1,
    "name": "keyboard",
    "quantity": 10
  },
  {
    "id": 2,
    "name": "mouse",
    "quantity": 5
  }
]
```

### `GET /items/:id`

Returns the matching item if it exists.

Example response:

```json
{
  "id": 1,
  "name": "keyboard",
  "quantity": 10
}
```

If the item does not exist, returns a `404` response.

Example error response:

```json
{
  "error": "Item not found"
}
```

### `POST /items`

Creates a new item.

The client sends a JSON request body with `name` and `quantity`.

Example request body:

```json
{
  "name": "monitor",
  "quantity": 4
}
```

The server assigns the `id`.

Example response:

```json
{
  "id": 3,
  "name": "monitor",
  "quantity": 4
}
```

A successful create request returns status code `201`.

If the request body is missing required fields or contains invalid data, returns a `400` response with a JSON error message.

### `PUT /items/:id`

Updates an existing item.

For this lab, `PUT /items/:id` replaces the `name` and `quantity` values for the item. The request body includes both `name` and `quantity`.

Example request body:

```json
{
  "name": "mechanical keyboard",
  "quantity": 12
}
```

If the item exists, returns the updated item.

If the item does not exist, returns a `404` response.

If the request body is missing required fields or contains invalid data, returns a `400` response with a JSON error message.

### `DELETE /items/:id`

Deletes an existing item.

If the item exists, it is deleted and returns status code `204`.

A `204` response does not need to include a response body.

If the item does not exist, return a `404` response.

## Error Responses

The API returns error responses for invalid requests.

Example:

```json
{
  "error": "Item not found"
}
```

## OpenAPI

The API is documented in the `openapi.yaml` file.

## Automated Testing

This project includes automated tests.

Run tests with:

```bash
npm test
```

## Reflection Questions

Answer the following questions in your submission:

#### 1. What makes this API more "REST-like" than the previous HTTP/JSON lab?

This API is exposing an in-memory list of items as the resource. The client is accessing the resource through standard
HTTP methods such as `get`, `post`, etc. One of the routes implemented in the previous lab was `/calculate`, which is not
a REST-style route.

#### 2. What is the purpose of a route parameter such as `/items/:id`?

The presence of the route parameter causes the server to execute separate logic from the same route without the parameter.
In addition, the route parameter gives the server additional information about what the client is trying to access and
allows it to return the appropriate response to the client.

#### 3. Why should `POST`, `PUT`, and `DELETE` use different HTTP methods?

These methods are intended for different purposes. `POST` creates a new item, `PUT` updates an existing item, and 
`DELETE` deletes an existing item from the list. Without using these different methods, the server would not be able
to decipher what the client was trying to do.

#### 4. What is the difference between a `400` error and a `404` error?

A `400` error is the result of an invalid request format or missing information in the request body. A `404` error is
means that the resource that the client was trying to access could not be found.

#### 5. How does the OpenAPI file relate to your Express server code?

The OpenAPI file documents the API, describing the valid requests and required parameters, as well as the server
responses to different kinds of requests. It also documents error responses for invalid requests.

## Graduate Work

Input validation is implemented. An invalid request returns a `400` error response. In addition, accessing an item
that is not in the list using either a `get` or `put` request returns a `404` error. Automated tests are used to verify
this functionality.