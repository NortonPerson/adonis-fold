# FoldLoader 🚀
> Dependency manager, autoload and IoC container for Node.js

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coveralls][coveralls-image]][coveralls-url]


## Features

1. Support for binding dependencies with unique namespaces.
2. Autoloading multiple directories under a namespace.
3. Defining aliases for bindings.
4. Automatic resolution of namespaces and transparent dependency injection.
5. Support for `fakes` when writing tests.
6. Support for service providers, to bind dependencies in structured way.


## Installation
You can install the package from npm.
```bash
npm i --save foldloader
```

## Setup

### using require

#### Require in main run

```js
require('flodloader')
```

#### Config in file `package.json`
```json
{
  "autoload": {
    "root": "App",
    "directories": {
      "app": "./src",
      "test": "./test"
    },
    "preLoadFiles": [
      "./start.js"
    ],
    "autoloads": {
      "App": "./src",
      "Test": "./test"
    }
  }
}
```
+ `root` : namespace Root of app
+ `directories` : defind folder using
```js
const closure = ioc.use(resolver.forDir('app').translate(closure))
```
+ `preLoadFiles` : files load after run config autoload
+ `autoloads` : defind namespace of folder


## Basic Usage

+ When `require('flodloader')` in main file, it will register two function globle is `use` and `make`

#### function `use`
```js
 use(<namespace>)
```
+ file in node_modules
+ or file in namespace defind in `autoloads` with structure `namespace + file || namespace + folder + file`

#### function `make`
+ require file, constructor and inject to class

```js
class Foo {
  static get inject () {
    return ['App/Bar']
  }

  constructor (bar) {
    this.bar = bar
  }
}

 const fooInstance = Ioc.make(Foo)
 ```

#### Namespace default `Autoload`
```js
  const { ioc, resolver, registrar } = use('Autoload')
```

##### Using `ioc`
  * method `bind` bind file with file or object
  ```js
  class Foo {
  }

  ioc.bind('App/Foo', function () {
    return new Foo()
  })
  ```

  ```js
  class Foo {
  }

  ioc.bind('App/Foo', function () {
    return Foo()
  })
  ```
  * method `singleton` file with file or object as `bind` but is `design pattern singleton`
  * method `alias` create sholt name

  ```js
  ioc.alias('Model/Foo', 'Foo')
  ```
  * method `use` and `make`

  * method `fake` and `singletonFake` reqlace namespace have exits
  ```js
    Ioc.fake('Adonis/Src/Lucid', function () {
      return FakeModel
    })
  ```
  * method `restore` namespace register

   ```JS
  Ioc.restore('Adonis/Src/Lucid')
  Ioc.restore('Adonis/Src/Lucid', 'Adonis/Src/Config')
  Ioc.restore() // restore all
  ```


##### Using `resolver`
* method `forDir` get directories was config in `package.json`
```js
const closure = ioc.use(resolver.forDir('app').translate(closure))
```

* method `translate` Translate binding using resolver translate
```js
const closure = ioc.use(resolver.forDir('app').translate(closure))
```

* method `resolve`Resolves the binding from the IoC container. This method is a combination of `translate` and `Ioc.make` function.
```js
  // class  App/User
 const handler = resolver.resolveFunc('App/User')
```

* method `resolveFunc` Resolves a function by translating the binding and then validating the existence of the method on the binding object. Also if the `binding` param is a function, it will be recognized and returned.

```js
  // with `find` as method of  App/User
 const handlerInstance = resolver.resolveFunc('App/User.find')
```


##### Using `registrar`
  * register provider class extendes to
  * all method `register` will call after all method `boot`
```js
const { ServiceProvider } = require('flodloader')

class WsProvider extends ServiceProvider {
  register () {
    // this app as ioc
    this.app.singleton('Adonis/Addons/Ws', (app) => {
      const Ws = require('../src/Ws')
      const Config = app.use('Adonis/Src/Config')
      const Context = app.use('Adonis/Addons/WsContext')
      const Server = app.use('Adonis/Src/Server')
      return new Ws(Config, Context, Server)
    })
  }

  boot () {

  }
}
```

* Have register Provider
```js
// add provider
const { registrar } = use('Autoload')
registrar.providers(arrayProvider)
reiretrar.register()

```


### Base
with structure folder
```
App
  | index.js
  | Model
    | User.js
  | Helpers
    | index.js
start.js
index.js
package.json
```
* we have require `Model/User.js` anywhere
```js
  const foo = ioc.use('Model/User')
```



### Using `bind`

```js
const { ioc } = use('Autoload')

class Foo {
}

ioc.bind('App/Foo', function () {
  return new Foo()
})

const foo = ioc.use('App/Foo')
// return Foo class instance
```

Simple enough! But we do not see the real power of the Ioc container, since we can instantiate the class manually too. Right? NO

Here are the following benefits.

1. The author of the `Foo` class can decide how to instantiate the class and return a properly configured instance, instead of leaving it to the consumer.

2. While you are making use of the Ioc container, one binding can be dependent upon others, without much work. For example

```js

class Foo {
  constructor (config) {
    //
  }
}

ioc.bind('App/Foo', function (app) {
  const config = app.use('App/Config')
  return new Foo(config)
})

const foo = ioc.use('App/Foo')
```


## Tests
Tests are written using [japa](http://github.com/thetutlage/japa). Run the following commands to run tests.

```bash
npm run test:local

# report coverage
npm run test

# on windows
npm run test:win
```

## Extends

adonis-fold – [@adonis-fold](https://github.com/poppinss/adonis-fold) – virk@adonisjs.com

  
 [npm-image]: https://img.shields.io/npm/v/foldloader.svg?style=flat-square
 [npm-url]: https://npmjs.org/package/foldloader
  
 [travis-image]: https://travis-ci.org/NortonPerson/foldloader.svg?branch=develop
 [travis-url]: https://travis-ci.org/NortonPerson/foldloader
  
 [coveralls-image]: https://img.shields.io/coveralls/NortonPerson/foldloader/develop.svg?style=flat-square
 [coveralls-url]: https://travis-ci.org/NortonPerson/foldloader
