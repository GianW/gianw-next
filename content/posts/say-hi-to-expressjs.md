---
title: Say hi to ExpressJS
date: '2017-03-22T00:10:03.284Z'
description: My studies and annotations about ExpressJS
tags: ['Node', 'ExpressJS']
seo: ['node', 'expressjs', 'npm', 'study', 'studies']
lang: 'en'
---

## Content

- [Overview](#what-is)
- [Basics](#basics)
  - [Server response](#server-response)
  - [Server redirect](#server-redirect)
- [Middleware](#middleware)
  - [How They Work](#how-they-work)
  - [Writing own](#writing-middleware)

<a name="what-is"></a>

# What is

A web application framework for Node, minimal and flexible, great for building Web APIs.
Foundation for other tools and frameworks, like Kraken and Sails.

To install latest or a specific version:

```
npm install express
or
npm install express@4.9
```

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

## Writing own

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
