/* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/
const findRoot = require('find-root')
const ioc = new (require('./src/Ioc'))()
const resolver = new (require('./src/Resolver/Manager'))(ioc)
const Autoload = require('./src/Autoload')

const registrar = new (require('./src/Registrar'))(ioc)

// get root path projcet have file package.json
const root = findRoot(__dirname)

const autoload = new Autoload(ioc, resolver, root)
autoload.register();

// set use and make global
global.use = ioc.use.bind(ioc)
global.make = ioc.make.bind(ioc)

// resgister Autoload
ioc.singleton('Autoload', function(){
    return { ioc, resolver, registrar };
})