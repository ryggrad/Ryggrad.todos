Controller = require('ryggrad').Controller
AppView    = require('./views/App')
Task       = require('./models/Task')

##
# In simple cases controllers will be pretty dumb
# They should only handle connecting the flow between things and if you have no routes they'll be almost blank. 
# Like a controller in backend app they can be really small but become really necessary as the app grows
#
class RyggradTodos extends Controller
  constructor: ->
    super
    @view = new AppView()
    Task.fetch()
    @el.append(@view)
 
module.exports = RyggradTodos
