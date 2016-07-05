#node-compose

Start node-processes as with docker-compose.


# Prerequisite

`node-compose` needs [nodemon](http://nodemon.io/) to be installed globally.

Install [nodemon](http://nodemon.io/): `npm install -g nodemon`

# Install

`npm install -g node-compose`


# Example

Create multiple servers. (eg for multiple microservices)

**`./process-a/index.js`** (Port 3000)

```javascript
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

**`./process-b/index.js`** (Port 4000)

```javascript
const http = require('http');

const hostname = '127.0.0.1';
const port = 4000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

Create a compose-file. **`node-compose.yml`**

```yaml
process_a:
  build: ./process-a
  environment:
    - NODE_ENV=development

process_b:
  build: ./process-b
  environment:
    - NODE_ENV=development
```

Start node-compose shell with `node-compose`. Inside the shell start all processes with `start-all` or type `help` for more information about possible commands.

# Commands

```bash
Commands:
	help [command...]  Provides help for a given command.
	exit               Close shell and kill all processes
	start <name>       Start a process. Use `all` to start all
	stop <name>        Stop a process. Use `all` to stop all
	restart <name>     Restart a process. Use `all` to restart all
	ps                 Display all processes
	images             Display all available processes
```


# Todo

- Use nodemon as a module to avoid global dep.
- Add more information about running processes to `ps`-view.
- Prevent running processes to start twice when calling `start <name|all>` twice.


# Author

Christian Blaschke <mail@platdesign.de>
