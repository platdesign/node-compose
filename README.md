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
	help [command...]            Provides help for a given command.
	exit                         Closing shell and stop all images
	ps                           List running images
	reload                       Reloads config file and restarts processes if needed.
	start <image> [images...]    Start an image by <name> or all
	stop <image> [images...]     Stop an image by <name> or all
	restart <image> [images...]  Restart one or more images by given name or all
	images                       List all images found in config file.
	monitor                      Start web monitor
```


# Todo

- Use nodemon as a module to avoid global dep.
- Add more information about running processes to `ps`-view.
- Prevent running processes to start twice when calling `start <name|all>` twice.


# Author

Christian Blaschke <mail@platdesign.de>
