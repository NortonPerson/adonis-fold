'use strict'

const chai = require('chai')
const path = require('path')
const test = require('japa')
const assert = chai.assert
const Registrar = require('../../src/Registrar')
const Ioc = require('../../src/Ioc')

test.group('Registrar', function () {
  test('throw an exception when an array of paths are not provided to the providers method', function () {
    const ioc = new Ioc()
    const registrar = new Registrar(ioc)
    const fn = () => registrar.providers(path.join(__dirname, './app/providers/FooProvider'))
    assert.throw(fn, 'register expects an array of providers to be registered')
  })

  test('set providers via array of modules', function () {
    const ioc = new Ioc()
    const registrar = new Registrar(ioc)
    registrar.providers([path.join(__dirname, './app/providers/FooProvider')]).register()
    assert.property(ioc.getBindings(), 'App/Foo')
  })

  test('should throw an exception if class is not extended by service provider', function () {
    const ioc = new Ioc()
    const registrar = new Registrar(ioc)
    const fn = () => registrar.providers([path.join(__dirname, './app/providers/InvalidProvider')])
    assert.throw(fn, 'InvalidProvider must extend base service provider class')
  })

  test('should call the boot method only when all providers have been registered', function (done) {
    const ioc = new Ioc()
    const registrar = new Registrar(ioc)
    registrar
    .providers([
      path.join(__dirname, './app/providers/FooProvider'),
      path.join(__dirname, './app/providers/BarProvider')
    ])
    .registerAndBoot()
    .then(() => {
      assert.equal(ioc.use('App/Bar'), 'foo')
      done()
    })
    .catch(done)
  })

  test('should emit registered event', function () {
    const ioc = new Ioc()
    const registrar = new Registrar(ioc)
    let providersRegistered = false
    let providersBooted = false

    registrar.on('providers:registered', () => {
      providersRegistered = true
    })

    registrar.on('providers:registered', () => {
      providersBooted = true
    })

    registrar
    .providers([
      path.join(__dirname, './app/providers/FooProvider'),
      path.join(__dirname, './app/providers/BarProvider')
    ])
    .register()

    assert.equal(providersRegistered, true)
    assert.equal(providersBooted, true)
  })

  test('should emit all lifecycle events', function (done) {
    const ioc = new Ioc()
    const registrar = new Registrar(ioc)
    let providersRegistered = false
    let providersBooted = false

    registrar.on('providers:registered', () => {
      providersRegistered = true
    })

    registrar.on('providers:registered', () => {
      providersBooted = true
    })

    registrar
    .providers([
      path.join(__dirname, './app/providers/FooProvider'),
      path.join(__dirname, './app/providers/BarProvider')
    ])
    .registerAndBoot()
    .then(() => {
      assert.equal(providersRegistered, true)
      assert.equal(providersBooted, true)
      done()
    })
    .catch(done)
  })

  test('do not call boot when it does not exists', function (done) {
    const ioc = new Ioc()
    const registrar = new Registrar(ioc)
    registrar
    .providers([
      path.join(__dirname, './app/providers/NoBootProvider')
    ])
    .registerAndBoot()
    .then(() => {
      done()
    })
    .catch(done)
  })
})
