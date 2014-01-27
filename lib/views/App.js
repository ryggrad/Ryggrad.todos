var App, Task, TaskView, View, _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('ryggrad').View;

Task = require('../models/Task');

TaskView = require('./Task');

App = (function(_super) {
  __extends(App, _super);

  function App() {
    this.clear = __bind(this.clear, this);
    this.create = __bind(this.create, this);
    this.renderCount = __bind(this.renderCount, this);
    this.addAll = __bind(this.addAll, this);
    this.addNew = __bind(this.addNew, this);
    _ref = App.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  App.content = function() {
    var _this = this;
    return this.div({
      id: "tasks"
    }, function() {
      _this.h1("Todos");
      _this.form({
        outlet: "form"
      }, function() {
        return _this.input({
          type: "text",
          outlet: "input",
          placeholder: "What needs to be done?"
        });
      });
      _this.div({
        "class": "items",
        outlet: "list"
      });
      return _this.footer(function() {
        _this.a({
          "class": 'clear',
          outlet: 'clear'
        });
        return _this.div({
          "class": 'count'
        }, function() {
          _this.span({
            "class": 'countVal',
            outlet: "count"
          }, "0");
          return _this.span(" left");
        });
      });
    });
  };

  App.prototype.initialize = function() {
    Task.on_collection("add", this.addNew);
    Task.on("fetch destroy", this.addAll);
    Task.on_record("reset observe", this.renderCount);
    this.form.submit(this.create);
    return this.clear.click(this.clear);
  };

  App.prototype.addNew = function(task) {
    var view;
    view = new TaskView(task);
    return this.list.append(view);
  };

  App.prototype.addAll = function() {
    var todo, _i, _len, _ref1, _results;
    this.list.empty();
    _ref1 = Task.all();
    _results = [];
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      todo = _ref1[_i];
      _results.push(this.addNew(todo));
    }
    return _results;
  };

  App.prototype.renderCount = function() {
    var active, inactive;
    active = Task.active().length;
    this.count.text(active);
    inactive = Task.done().length;
    if (inactive) {
      return this.clear.show();
    } else {
      return this.clear.hide();
    }
  };

  App.prototype.create = function(e) {
    var task;
    e.preventDefault();
    task = Task.create({
      name: this.input.val()
    });
    return this.input.val("");
  };

  App.prototype.clear = function() {
    return Task.destroyDone();
  };

  return App;

})(View);

module.exports = App;
