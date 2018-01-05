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

* Require in main run

```
require('flodloader')
```


## Basic Usage

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

## Release History

Checkout [CHANGELOG.md](CHANGELOG.md) file for release history.

## Extends

adonis-fold – [@adonis-fold](https://github.com/poppinss/adonis-fold) – virk@adonisjs.com

  
 [npm-image]: https://img.shields.io/npm/v/foldloader.svg?style=flat-square
 [npm-url]: https://npmjs.org/package/foldloader
  
 [travis-image]: https://img.shields.io/travis/NortonPerson/foldloader/dawn.svg?style=flat-square
 [travis-url]: https://travis-ci.org/NortonPerson/foldloader
  
 [coveralls-image]: https://img.shields.io/coveralls/NortonPerson/foldloader/develop.svg?style=flat-square
 [coveralls-url]: https://travis-ci.org/NortonPerson/foldloader
