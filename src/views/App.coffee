View     = require('ryggrad').View 
Task     = require('../models/Task')
TaskView = require('./Task')

class App extends View
  @content: ->
    @div id: "tasks", =>
      @h1 "Todos"
      @form outlet: "form", =>
        @input type: "text", outlet: "input", placeholder: "What needs to be done?"

      @div class: "items", outlet: "list"

      @footer =>
        @a class: 'clear', outlet: 'clear'
        @div class: 'count', =>
          @span class: 'countVal', outlet: "count", "0"
          @span " left"

  initialize: ->
    Task.on_collection "add", @addNew
    Task.on "fetch destroy", @addAll
    Task.on_record "reset observe", @renderCount

    @form.submit @create
    @clear.click @clear

  addNew: (task) =>
    view = new TaskView(task)
    @list.append(view)

  addAll: =>
    @list.empty()
    @addNew todo for todo in Task.all()

  renderCount: =>
    active = Task.active().length
    @count.text(active)
    
    inactive = Task.done().length
    
    if inactive 
      @clear.show()
    else
      @clear.hide()

  create: (e) =>
    e.preventDefault()
    task = Task.create(name: @input.val())
    @input.val("")
  
  clear: =>
    Task.destroyDone()

module.exports = App
