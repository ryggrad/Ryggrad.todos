class window.Todo extends Ryggrad.Model
	@configure 'Todo', 'title', 'completed'
	@extend Ryggrad.Model.Local

	@active: ->
		@select (todo) -> !todo.completed

	@completed: ->
		@select (todo) -> !!todo.completed

	@destroyCompleted: ->
		todo.destroy() for todo in @completed()

	@getByFilter: (filter )->
		switch filter
			when 'active'
				Todo.active()
			when 'completed'
				Todo.completed()
			else
				Todo.all()
