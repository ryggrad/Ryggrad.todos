var Ryggrad, Task, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Ryggrad = require('ryggrad');

Task = (function(_super) {
  __extends(Task, _super);

  function Task() {
    _ref = Task.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Task.key("name", String);

  Task.key("done", Boolean);

  Task.storage = Ryggrad.LocalStorage;

  Task.active = function() {
    return this.filter(function(item) {
      return !item.done;
    });
  };

  Task.done = function() {
    return this.filter(function(item) {
      return !!item.done;
    });
  };

  Task.destroyDone = function() {
    var rec, _i, _len, _ref1, _results;
    _ref1 = this.done();
    _results = [];
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      rec = _ref1[_i];
      _results.push(rec.destroy());
    }
    return _results;
  };

  return Task;

})(Ryggrad.Model);

module.exports = Task;
