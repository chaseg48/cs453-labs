# Lab 1 - TCP Command Server

This lab implements a simple text-based TCP command client/server system. The client issues a command and the server
responds accordlingly.

### File Descriptions

| File                    | Purpose                                                                                     |
| ----------------------- | ------------------------------------------------------------------------------------------- |
| `src/server.js`         | Starts the TCP server, accepts client connections, reads client input, and sends responses. |
| `src/client.js`         | Provides a simple command-line TCP client for testing the server manually.                  |
| `src/commands.js`       | Contains the command-handling logic. Most of your work will be here.                        |
| `test/commands.test.js` | Contains automated tests for the command-handling logic.                                    |
| `package.json`          | Defines project metadata, dependencies, and npm scripts.                                    |

## Features

1. The server accepts TCP client connections on a configurable port.
2. The client must send one command at a time.
3. The server supports `ECHO`, `UPPER`, `LOWER`, `REVERSE`, `TIME`, and `QUIT`.
4. The server returns an error for unknown commands.
5. The server does not crash when the client sends an empty line.
6. The README describes the protocol.

## Command Protocol

The server accepts one text command per line.

Commands are case-insensitive, but the command arguments should be handled as normal text.

1. `ECHO` The server echos the string back to the client without modification.
2. `UPPER` The server converts the client string to all uppercase.
3. `LOWER` The server converts the client string to all lowercase.
4. `REVERSE` The server reverses the client string.
5. `TIME` The server sends the current time in 12-hour format.

## Command Examples

| Client sends    | Server responds     |
| --------------- | ------------------- |
| `ECHO hello`    | `hello`             |
| `UPPER hello`   | `HELLO`             |
| `LOWER HELLO`   | `hello`             |
| `REVERSE hello` | `olleh`             |
| `TIME`          | `12:00:00 PM`       |
| `QUIT`          | `Goodbye.`          |
| unknown command | error message       |

## Running the Lab

First, move into the starter directory:

```
cd labs/lab01-tcp-command/starter
```

Install dependencies:

```
npm install
```

Start the server:

```
npm run server
```

In a second terminal, move into the same starter directory and run the client:

```
npm run client
```

You should be able to type commands into the client and see responses from the server.

Example:

```
> ECHO hello
hello

> UPPER hello
HELLO

> QUIT
Goodbye.
```

## Configuring the Port

The server should use port `3000` by default.

You can run the server on a different port by setting the `PORT` environment variable:

```
PORT=4000 npm run server
```

Then run the client using the same port:

```
PORT=4000 npm run client
```

## Testing

This lab includes automated tests for the command-handling logic.

Run the tests from the starter directory:

```
npm test
```

The tests are focused on `src/commands.js`.

That means you can work on the command behavior without needing to manually start the TCP server every time.

The main function being tested is:

```
handleCommand(line)
```

The tests check that commands such as `ECHO`, `UPPER`, `LOWER`, `REVERSE`, `TIME`, and `QUIT` return the expected responses.

Some tests may fail when you first receive the starter code. Your job is to update the implementation until the required tests pass.

You may also run the tests in watch mode if supported by the starter project:

```
npm run test:watch
```

## Reflection Questions

1. What is the difference between the client and the server?

The server program must be started before the client program so that it can begin listening on the known port that the
clients will be trying to connect to. The server waits for a client to connect and creates a new socket for each new
client connected.

The client program can begin anytime after the server program. The client program implements an interface for the user
to issue commands that the client will send to the server. The client creates a connection to the known server port.

2. Why does the server need to keep running after handling one request?

The server needs to keep running so that it can handle additional requests from the client and handle requests from
potential other clients that are connected concurrently or will try to connect in the future.

3. What happens if two clients connect at the same time?

The two clients will have two different port addresses. The server will create a socket for each address and handle
commands from each client separately.

4. How is this different from HTTP?

HTTP defines the structure of requests and responses that will be (typically) sent over a TCP connection. In our lab,
the command protocol we have defined (i.e, `ECHO`, `UPPER`, ... etc) and the server response to each of these commands 
is analagous to HTTP. Port 80 is used for HTTP requests, while our server is running on port 3000 by default.