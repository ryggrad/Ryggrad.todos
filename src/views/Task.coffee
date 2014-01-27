View = require('ryggrad').View 

class Task extends View
  @content: ->
    @div class: 'item', =>
      @div class: 'view', outlet: 'view', title: "Double click to edit...", =>
        @input type: 'checkbox', outlet: 'checkbox'
        @span outlet: 'name'
        @a class: 'destroy', outlet: 'destroy'

      @div class: 'edit', =>
        @input type: 'text', outlet: 'input'

  initialize: (@task) =>
    @setDone()
    @name.text(@task.name)
    @input.val(@task.name)

    @task.change 'name', =>
      @name.text(@task.name)

    @checkbox.change @toggle
    @destroy.click   @remove
    @view.dblclick   @edit
    @input.keypress  @blurOnEnter
    @input.blur      @close

  setDone: =>
    if @task.done 
      @addClass 'done' 
    else 
      @removeClass 'done'

    @checkbox.prop 'checked', @task.done

  toggle: =>
    @task.set(done: !@task.done)
    @setDone()
    @task.save()
  
  remove: =>
    @task.destroy()
  
  edit: =>
    @addClass("editing")
    @input.focus()
  
  blurOnEnter: (e) =>
    if e.keyCode is 13 then e.target.blur()
  
  close: =>
    @removeClass("editing")
    @task.set(name: @input.val())
    @task.save()

module.exports = Task
