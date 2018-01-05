
const debug = require('debug')('autoload')
const path = require('path')

class Autoload {
  constructor (ioc, resolver, rootDir) {
    this.ioc = ioc
    this._rootDir = rootDir
    this._packageFile = {}
    this.resolver = resolver
    this._preLoadFiles = []
  }

    /**
   * Load all the files that are supposed to be preloaded
   *
   * @method _loadPreLoadFiles
   *
   * @return {void}
   *
   * @private
   */
  _loadPreLoadFiles () {
    debug('preloading files %j', this._preLoadFiles)

    this._preLoadFiles.forEach((file) => {
      try {
        const filePath = path.isAbsolute(file) ? file : path.join(this._rootDir, file)
        require(filePath)
      } catch (error) {
        if (error.code !== 'MODULE_NOT_FOUND') {
          throw error
        }
      }
    })
  }

  _setPackageFile () {
    this._packageFile = require(path.join(this._rootDir, 'package.json'))
    debug('loading package.json from %s directory', this._rootDir)
  }

    /**
   * Sets up resolver primary namespace and register paths to
   * important directories.
   *
   * @method _setupResolver
   *
   * @param {String} namespace
   *
   * @return {void}
   *
   * @private
   */
  _setupResolver (namespace, directories) {
    this.appNamespace = namespace
    debug('%s is the primary namespace', namespace)

    /**
     * Set app namespace with resolver. So that resolver
     * knows how to make full namespaces.
     */
    this.resolver.appNamespace(this.appNamespace)

    /**
     * Bind directories to resolver, so that we can
     * resolve ioc container paths by passing
     * incremental namespaces.
     */
    this.resolver.directories(directories)
  }

  /**
   * Registers all directories from the package.json file
   * to IoC container as autoloaded.
   *
   * First namespace/directory key/value pair will be used as
   * primary autoloaded directory and doesn't require
   * fullnamespaces at different places.
   *
   * @method _registerAutoloadedDirectories
   *
   * @return {void}
   *
   * @private
   */
  _registerAutoloadedDirectories () {
    let { autoloads, root, preLoadFiles, directories } = this._packageFile.autoload || {}

    if (root === 0) {
      root = ''
    }
    this._setupResolver(root, directories)

    if (!autoloads) {
      autoloads = []
    }

    Object.keys(autoloads).forEach((namespace, index) => {
      const namespaceLocation = path.join(this._rootDir, autoloads[namespace])
      // set foder autoload
      this.ioc.autoload(namespaceLocation, namespace)
      debug('autoloading %s under %s namespace', namespaceLocation, namespace)
    })

    if (preLoadFiles && preLoadFiles.length > 0) {
      this._preLoadFiles = preLoadFiles
    }
  }

  register () {
    this._setPackageFile()
    this._registerAutoloadedDirectories()
    this._loadPreLoadFiles()
  }
}

module.exports = Autoload
