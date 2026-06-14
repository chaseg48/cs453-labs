# Lab 2 - Hello HTTP + JSON

This lab implements a basic HTTP service.

### File Descriptions

| File                  | Purpose                                                    |
| --------------------- | ---------------------------------------------------------- |
| `src/server.js`       | Starts the HTTP server and handles incoming HTTP requests. |
| `test/server.test.js` | Contains automated tests for the HTTP JSON service.        |
| `package.json`        | Defines project metadata, dependencies, and npm scripts.   |

## Required Features

Your HTTP server must support the following routes.

### `GET /health`

Returns a JSON response showing that the server is running.

Example response:

```json
{
  "status": "ok"
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

## Error Handling

Your server should not crash when it receives bad input.

At minimum, your server should handle:

* Unknown routes.
* Unsupported HTTP methods.
* Invalid JSON.
* Missing required fields.
* Unsupported calculation operations.
* Division by zero.

Use reasonable HTTP status codes such as:

| Status Code | Meaning               |
| ----------- | --------------------- |
| `200`       | OK                    |
| `400`       | Bad request           |
| `404`       | Not found             |
| `405`       | Method not allowed    |
| `500`       | Internal server error |

Error responses should be returned as JSON.

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

## Suggested Workflow

1. Run the server before changing anything.
2. Try `GET /health` manually in a browser or with `curl`.
3. Run the automated tests.
4. Open `src/server.js`.
5. Implement one route at a time.
6. Run `npm test` after each change.
7. Test manually with `curl`.
8. Update this README if your final behavior differs from the examples.

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

## Graduate Students

Graduate students should complete one additional feature.

Choose one of the following:

1. Add a new route, such as `GET /time` or `POST /uppercase`.
2. Add one additional calculation operation and document it.
3. Improve the request counter so it tracks counts by route.
4. Add additional automated tests for error handling.

Document your graduate extension in your submission.

## Submission

Submit your completed lab according to the course submission instructions.

Your submission should include:

* Your updated source code.
* Your completed HTTP JSON server.
* Your updated README if you changed or extended the API.
* Your answers to the reflection questions.
* Any graduate extension work, if applicable.

Before submitting, verify that:

```bash
npm test
```

runs successfully.

Submit your GitHub link in the Canvas assignment for this lab.
