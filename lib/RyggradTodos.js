var AppView, Controller, RyggradTodos, Task,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Controller = require('ryggrad').Controller;

AppView = require('./views/App');

Task = require('./models/Task');

RyggradTodos = (function(_super) {
  __extends(RyggradTodos, _super);

  function RyggradTodos() {
    RyggradTodos.__super__.constructor.apply(this, arguments);
    this.view = new AppView();
    Task.fetch();
    this.el.append(this.view);
  }

  return RyggradTodos;

})(Controller);

module.exports = RyggradTodos;
