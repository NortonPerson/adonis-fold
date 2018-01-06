
const { ioc } = use('Autoload')

io.bind('App', function(app){
  const App = app.use('App')
  return new App()
})
