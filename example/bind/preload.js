const { ioc } = use('Autoload')

ioc.bind('Base', function (app) {
  const App = use('App/App')
  return new App()
})
