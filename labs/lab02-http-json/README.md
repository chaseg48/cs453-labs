# Lab 2 - Hello HTTP + JSON

This lab implements a basic HTTP service. The lab was developed on `Windows` and tested using `WSL` with `Ubuntu`.

### File Descriptions

| File                  | Purpose                                                    |
| --------------------- | ---------------------------------------------------------- |
| `src/server.js`       | Starts the HTTP server and handles incoming HTTP requests. |
| `test/server.test.js` | Contains automated tests for the HTTP JSON service.        |
| `package.json`        | Defines project metadata, dependencies, and npm scripts.   |

## Features

This HTTP server supports the following routes:
1. `GET /health`: Return the status of the server.
2. `POST /echo`: Echos the original request from the user back to the client.
3. `POST /calculate`: Supports 4 basic arithmetic operations: `add`, `subtract`, `multiply`, `divide`.

## Graduate Extension

Graduate Only Functionality:
4. `GET /time`: Returns the current local time of the server to the client.

## Examples
### `GET /health`

Returns a JSON response showing that the server is running.

Example response:

```json
{
  "status": "ok"
}
```

### `GET /time`

Returns a JSON response with the current local time of the server in 12-hour format.

Example response:

```json
{
  "time": "12:00:00 PM"
}
```

### `POST /echo`

Accepts a JSON request body and returns the same data back to the client.

Example request body:

```json
{
  "message": "hello"
}
```

Example response:

```json
{
  "message": "hello"
}
```

### `POST /calculate`

Accepts a JSON request body with an operation and two numbers.

Example request body:

```json
{
  "operation": "add",
  "a": 2,
  "b": 3
}
```

Example response:

```json
{
  "result": 5
}
```

Your server must support at least the following operations:

| Operation  | Meaning               |
| ---------- | --------------------- |
| `add`      | Add `a` and `b`       |
| `subtract` | Subtract `b` from `a` |
| `multiply` | Multiply `a` and `b`  |
| `divide`   | Divide `a` by `b`     |

The server should return an error response for unsupported operations.

### `GET /requests`

Returns information about how many requests the server has handled since it started.

Example response:

```json
{
  "count": 4
}
```

Example error response:

```json
{
  "error": "Invalid JSON"
}
```

## Running the Lab

First, move into the starter directory:

```bash
cd labs/lab02-http-json/starter
```

Install dependencies:

```bash
npm install
```

Start the server:

```bash
npm run server
```

By default, the server should listen on port `3000`.

You can test the server in a browser by visiting:

```text
http://localhost:3000/health
```

You can also test it with `curl`.

Example:

```bash
curl http://localhost:3000/health
```

Example `POST /echo` request:

```bash
curl -X POST http://localhost:3000/echo \
  -H "Content-Type: application/json" \
  -d '{"message":"hello"}'
```

Example `POST /calculate` request:

```bash
curl -X POST http://localhost:3000/calculate \
  -H "Content-Type: application/json" \
  -d '{"operation":"add","a":2,"b":3}'
```

## Configuring the Port

The server should use port `3000` by default.

You can run the server on a different port by setting the `PORT` environment variable:

```bash
PORT=4000 npm run server
```

Then send requests to the new port:

```bash
curl http://localhost:4000/health
```

## Testing

This lab includes automated tests for the HTTP JSON service.

Run the tests from the starter directory:

```bash
npm test
```

Some tests may fail when you first receive the starter code. Your job is to update the implementation until the required tests pass.

The tests should check behavior such as:

* `GET /health` returns a JSON status response.
* `POST /echo` returns the submitted JSON data.
* `POST /calculate` performs supported calculations.
* Unknown routes return an error.
* Invalid JSON returns an error.
* The server does not crash on bad input.

You may also run the tests in watch mode if supported by the starter project:

```bash
npm run test:watch
```

## Reflection Questions

Answer the following questions in your submission:

1. What is the difference between a TCP message and an HTTP request?

A TCP message is what carries the HTTP request across a network. HTTP defines the format of the request and the
response.

2. What does the `Content-Type: application/json` header tell the server?

This field indicates to the server the data format of the request. In this case, we are telling the server that the
format is JSON so that the server knows how to parse the request.

3. Why should a server return different HTTP status codes for different situations?

The server should return different status codes to give the client information about the outcome of the request. For
example, returning a status code of 200 indicates a successfull operation while a code of 400 indicates an error.

4. What happens if the client sends invalid JSON?

If the client sends invalid JSON the server will return an error with the status header of 400.

5. How is this lab different from Lab 1?

This lab is different in that we are not defining our own message structure. We are using the request and response
structure defined by HTTP.
