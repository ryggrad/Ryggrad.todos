class window.TodosView extends Ryggrad.View
	@model_events:
		"create": "addNew"
		"refresh change": "addAll"
		"refresh change": "toggle"
		"refresh change": "renderFooter"

	constructor: () ->
		super
		@setModel(Todo)

	addNew: () ->
	  view = new Todos todo: todo
		@list.append(view.html())

	addAll: =>
		@todos.empty()
		@addNew todo for todo in Todo.getByFilter()
