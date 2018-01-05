'use strict'

const test = require('japa')
const assert = require('chai').assert

const ioc = new (require('../../src/Ioc'))()
const resolver = new (require('../../src/Resolver/Manager'))(ioc)
const Autoload = require('../../src/Autoload')

const rootDir = __dirname;
const autoload = new Autoload(ioc, resolver, rootDir)

test.group('Autoload', (group) => {


  test('call _setPackageFile load package.json', () => {
    autoload._setPackageFile();
    assert.notEqual(autoload._packageFile, {}, '_packageFile are not equal is {}');
    assert.equal(autoload._packageFile.name, 'test','_packageFile.name are not equal is test');
  })
  
  test('call _registerAutoloadedDirectories load data', () => {
    autoload._registerAutoloadedDirectories();
    assert.equal(autoload.appNamespace, 'App','appNamespace are not equal is App');
    assert.equal(autoload._preLoadFiles.length, 1,'appNamespace are not equal is 1');
    assert.notEqual(autoload.resolver._directories, {}, 'resolver._directories are not equal is {}');
  })
  
  test('call _loadPreLoadFiles run preload', () => {
    autoload._loadPreLoadFiles();
    assert.equal(global.ok, true, 'global.ok are not equal is true');
  })
  
  test('call register', () => {
    autoload.register();
    assert.equal(global.ok, true, 'global.ok are not equal is true');
  })
})
