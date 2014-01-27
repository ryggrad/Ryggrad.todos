Ryggrad = require('ryggrad')

class Task extends Ryggrad.Model
  @key "name", String
  @key "done", Boolean
  @storage: Ryggrad.LocalStorage

  @active: ->
    @filter (item) -> !item.done

  @done: ->
    @filter (item) -> !!item.done

  @destroyDone: ->
    rec.destroy() for rec in @done()

module.exports = Task
