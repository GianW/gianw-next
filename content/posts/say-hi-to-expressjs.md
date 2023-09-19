---
title: Say hi to ExpressJS
date: '2016-12-29T00:10:03.284Z'
description: My studies and annotations about ExpressJS
tags: ['Node', 'ExpressJS']
seo: ['node', 'expressjs', 'npm', 'study', 'studies']
lang: 'en'
---

# What is

These are my notes taken during a course at Code School. The code generated during the explanations is available here: <a href='https://codesandbox.io/p/sandbox/expressjs-course-vw6lzn'>CodeSandbox</a>.

## Content

- [Overview](#overview)
- [Basics](#basics)
  - [Server response](#server-response)
  - [Server redirect](#server-redirect)
- [Middleware](#middleware)
  - [How They Work](#how-they-work)
  - [Writing our own](#writing-middleware)
- [User params](#user-params)
- [Post Requests](#post-requests)
  - [Repetition in route names](#repetition-route-names)
  - [Dynamic route instances](#dynamic-routes)

<a name="overview"></a>

# Overview 

ExpressJS is A web application framework for Node, minimal and flexible, great for building Web APIs.
Foundation for other tools and frameworks, like Kraken and Sails.

To install latest or a specific version:

```
npm install express
or
npm install express@4.9
```

<hr />
<a name="basics"></a>

# Basics

The basic structure is something like this:

```javascript
var express = require('express')
var app = express() /*Application instance*/

app.get('/', function (request, response) {
  response.send('Hello world') /*Server response*/
})
app.listen(3000, () => {
  /*Binds app for TCP port*/
  console.log(
    'Listening on port 3000'
  ) /*The app.listen function takes an optional callback*/
})
```

Built-in functions for HTTP verbs

```
app.post(...)
app.put(...)
app.patch(...)
app.delete(...)
```

Express extends Node HTTP objects (request, response)

```javascript
app.get('/', function(request, response) {
...
});
```

<img src="https://res.cloudinary.com/duntsh1qv/image/upload/v1686434665/Blog/ttwh8hoxbpqnkaykdshb.png" alt="Node http" style="width:100%;"/>

<a name="server-response"></a>

## Response

We can respond from Express using Node’s write and end functions

```javascript
/*Do the same thing*/
response.send('Hello world') /* Express API */
response.write('Hello world') /* NODE API */
```

The send function converts Objects and Arrays to JSON

```javascript
app.get('/blocks', function (request, response) {
  var blocks = ['Fixed', 'Movable', 'Rotating']
  response.send(blocks)
  /*OR*/
  response.json(blocks)
  /* The json function reads better when all we respond with is JSON */
})
```

use -i to print response headers

```curl
curl -i http://localhost:3000/blocks
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8 (sets proper
response headers)
['Fixed','Movable','Rotating']
```

The send function converts strings to HTML

```javascript
app.get('/blocks', function (request, response) {
  var blocks = '<ul><li>Fixed</li><li>Movable</li></ul>'
  response.send(blocks)
})
```

Responds with text/html
<i>For server-side templates,
checkout EJS or Jade</i>

```
$ curl -i http://localhost:3000/blocks
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
<ul><li>Fixed</li><li>Movable</li></ul>
```

<a name="server-redirect"></a>

## Redirect

The redirect function sets the proper response headers

```javascript
app.get('/blocks', function (request, response) {
  response.redirect('/parts')
  response.redirect(301, '/parts') /* Optional status code*/
})
```

```
$ curl -i http://localhost:3000/blocks
HTTP/1.1 302 Moved Temporarily
X-Powered-By: Express
Location: /parts
Content-Type: text/plain; charset=utf-8

Moved Temporarily. Redirecting to /parts
```

<hr />

<a name="middleware"></a>

# Middleware

<a name="how-they-work"></a>

let's use as example this folder structure

- app.js
- /public
  - index.html

The index.html file is served from Express

```javascript
var express = require('express')
var app = express()
app.get('/', function (request, response) {
  response.sendFile(__dirname + '/public/index.html')
  /*name of the directory the currently executing script resides in*/
})
app.listen(3000)
```

The app.use function adds middleware to the application stack

```javascript
var express = require('express')
var app = express()

app.use(express.static('public'))
/*static middleware serving files
from the public folder*/
app.listen(3000)
```

_Middleware_ are functions executed sequentially that access request and response

When next is called, processing moves to the next middleware.

<img src="https://res.cloudinary.com/duntsh1qv/image/upload/v1686438245/middleware_ehxlvm.png" alt="Middleware workflow" style="width:100%;"/>

The flow stops once the response is sent back to the client

```javascript
/*Middleware A*/
app.use(function(request, response, next) {
  ...
  next();
});

/*middleware B*/
app.use(function(request, response, next) {
  response.send('done!');
  next(); /* calling next() after response
is complete causes errors.*/
});

/*remaining middleware will not run*/
```

The code for static is a good example of Express Middleware
<a href='https://github.com/expressjs/serve-static'>serve-static on Github</a>

```javascript
/*index*/
exports = module.exports = function serveStatic(root, options) {
  ...
  return function serveStatic(req, res, next) {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
    return next()
    }
    ...
    stream.pipe(res)
  }
}
```

The static middleware serves <b>everything</b> under the specified folder

> - app.js
> - /public
>   - index.html
>   - blocks.jpg

```javascript
  app.use(express.static('public'));

  <!DOCTYPE html>
  ...
  <body>
    <h1>Blocks</h1>
    <p><img src='blocks.png'></p>
  </body>
  </html>
```

<hr />

## Writing our own

<a name="writing-middleware"></a>

Writing a logger module

We assign our logger function to module.exports in order to export it as a Node
module and make it accessible from other files

```javascript
/*logger.js*/
module.exports = function (request, response, next) {
  /*We use the Date object to track the start time.*/
  var start = +new Date()
  /*plus sign converts date Object to milliseconds*/

  /*Standard out is a writeable stream which we will be writing the log to*/
  var stream = process.stdout

  /*he request object gives us the requested URL and the HTTP method used*/
  var url = request.url
  var method = request.method

  /*The response object is an EventEmitter which we can use to listen to events*/
  /* the finish event is emitted when the response has been handed oﬀ to the OS */
  response.on('finish', function () {
    /* Calculate the duration of the request */
    var duration = +new Date() - start

    var message = method + ' to ' + url + '\ntook ' + duration + ' ms \n\n'
    stream.write(message)
  })
  /* event handler function runs asynchronously */

  next()
  /* moves request to the next middleware in the stack*/
}
```

The Node module system follows the CommonJS specification

In the main file (app.js) we should require and use our module

```javascript
var logger = require('./logger')
app.use(logger)
```

<hr />

# User params

<a name="user-params"></a>

Query params

```
request.query.limit
ex: http://localhost:3000/blocks?limit=2
```

Placeholders can be used to name arguments part of the URL path

```javascript
app.get('/blocks/:name', function (request, response) {
  /*creates name property on the request.params object*/
  console.log(request.params.name)
})
```

The app.param function maps placeholders to callback functions.
It’s useful for running pre-conditions on dynamic routes.

```javascript
/* called for routes which include the :name placeholder */
app.param('name', function (request, response, next) {
  var name = request.params.name
  var block = name[0].toUpperCase() + name.slice(1).toLowerCase()

  /* can be accessed from other routes in the application */
  request.blockName = block

  /* must be called to resume request */
  next()
})
```

We can read properties on request which were set on app.param

```javascript
app.get('/blocks/:name', function(request, response) {
  var description = blocks[request.blockName];
  ...
});
```

<hr />
<a name="post-requests"></a>

## POST Requests

Parsing depends on a middleware not shipped with Express

```
npm install body-parser
```

```javascript
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });

/* extended: false = forces the use of the native querystring Node library */

var blocks = { ... };
```

Routes can take multiple handlers as arguments and will call them sequentially

```javascript
/* parseUrlencoded -> Will run first */
/* function ... -> Will run second */
app.post('/blocks', parseUrlencoded, function (request, response) {
  /* get form data */
  var newBlock = request.body

  /*adds new block to the blocks object*/
  blocks[newBlock.name] = newBlock.description

  response.status(201).json(newBlock.name)
  /* sets the 201 Created status code */
  /* responds with new block name */
})
```

Using multiple route handlers is useful for re-using middleware that load resources, perform validations, authentication, etc.

<a name="repetition-route-names"></a>

## Repetition in route names

All routes seem to be handling requests to similar paths…

```javascript
app.get('/blocks', function(request, response) {
...
});
app.get('/blocks/:name', function(request, response) {
...
});
app.post('/blocks', parseUrlencoded, function(request, response) {
...
});
app.delete('/blocks/:name', function(request, response) {
...
});
```

There’s unnecessary repetition of the blocksRoute variable

```javascript
/* returns route object which handles all requests to the /blocks path */
var blocksRoute = app.route('/blocks')

/* app.get('/blocks'... */
blocksRoute.get(function(request, response) {
...
});

/* app.post('/blocks'... */
blocksRoute .post(parseUrlencoded, function(request, response) {
...
});
```

Chaining functions can eliminate intermediate variables and help our code stay more readable. This is a pattern commonly found in Express applications.

```javascript
app.route('/blocks')
  .get(function(request, response) {
    /*chaining means calling functions on the return value of previous functions*/
    ...
  });
  /* lines starting with dot indicate function calls on the object returned from the previous line*/
  .post(parseUrlencoded, function(request, response) {
    ...
  });
```

<a name="dynamic-routes"></a>

## Dynamic route instances

The app.route function accepts the same url argument format as before

```javascript
/* returns route object which handles all
requests to the /blocks/:name path */
app.route('/blocks/:name')
.get(function(request, response) {
...
})
.delete(function(request, response) {
...
});
```

Our route handlers for /blocks/:name reference blocks fetched by their name

<a name="route-files"></a>

## Route files

This helps clean up our code and allows our main app.js file to easily accommodate additional routes in the future.

```javascript
var express = require('express')
var app = express()
app.use(express.static('public'))

/* we’ll move our routes to this new file */
var blocks = require('./routes/blocks')
/* router is mounted in a particular root url */
app.use('/blocks', blocks)

app.listen(3000)
```

Let’s see how we can do this by taking advantage of Node’s module system.

A dedicated folder for routes can help organize our code

<ul class="directory-list">
  <li class="folder">public/</li>
  <li class="folder">routes/
    <ul>
      <li>blocks.js</li>
    </ul>
  </li>
</ul>

```javascript
/*blocks.js*/
var express = require('express')
/*returns router instance which can
be mounted as a middleware*/
var router = express.Router()
/*exports the router as a Node module*/

/* he root path relative to
  the path where it’s mounted ( app.use('/blocks', ...);)*/
router.route('/')

module.exports = router
```

We assign the router to module.exports to make it accessible from other files
