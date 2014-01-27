var Task, View, _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('ryggrad').View;

Task = (function(_super) {
  __extends(Task, _super);

  function Task() {
    this.close = __bind(this.close, this);
    this.blurOnEnter = __bind(this.blurOnEnter, this);
    this.edit = __bind(this.edit, this);
    this.remove = __bind(this.remove, this);
    this.toggle = __bind(this.toggle, this);
    this.setDone = __bind(this.setDone, this);
    this.initialize = __bind(this.initialize, this);
    _ref = Task.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Task.content = function() {
    var _this = this;
    return this.div({
      "class": 'item'
    }, function() {
      _this.div({
        "class": 'view',
        outlet: 'view',
        title: "Double click to edit..."
      }, function() {
        _this.input({
          type: 'checkbox',
          outlet: 'checkbox'
        });
        _this.span({
          outlet: 'name'
        });
        return _this.a({
          "class": 'destroy',
          outlet: 'destroy'
        });
      });
      return _this.div({
        "class": 'edit'
      }, function() {
        return _this.input({
          type: 'text',
          outlet: 'input'
        });
      });
    });
  };

  Task.prototype.initialize = function(task) {
    var _this = this;
    this.task = task;
    this.setDone();
    this.name.text(this.task.name);
    this.input.val(this.task.name);
    this.task.change('name', function() {
      return _this.name.text(_this.task.name);
    });
    this.checkbox.change(this.toggle);
    this.destroy.click(this.remove);
    this.view.dblclick(this.edit);
    this.input.keypress(this.blurOnEnter);
    return this.input.blur(this.close);
  };

  Task.prototype.setDone = function() {
    if (this.task.done) {
      this.addClass('done');
    } else {
      this.removeClass('done');
    }
    return this.checkbox.prop('checked', this.task.done);
  };

  Task.prototype.toggle = function() {
    this.task.set({
      done: !this.task.done
    });
    this.setDone();
    return this.task.save();
  };

  Task.prototype.remove = function() {
    return this.task.destroy();
  };

  Task.prototype.edit = function() {
    this.addClass("editing");
    return this.input.focus();
  };

  Task.prototype.blurOnEnter = function(e) {
    if (e.keyCode === 13) {
      return e.target.blur();
    }
  };

  Task.prototype.close = function() {
    this.removeClass("editing");
    this.task.set({
      name: this.input.val()
    });
    return this.task.save();
  };

  return Task;

})(View);

module.exports = Task;
