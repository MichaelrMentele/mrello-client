// Controller backbone object
// Author: Michael Mentele
Backbone.Controller = function Controller() {
  this.initialize.apply(this, arguments);
}

_.extend(Backbone.Controller.prototype, Backbone.Events, {
  initialize: function() {},
  render: function(view) {
    this.clearAppView.apply(this, arguments);
    $(this.containerID).html(view.el);
  },
  clearAppView: function() {
    $(this.containerID).empty();
  },
});

// extend Helper added to controller (taken from Backbone source)
Backbone.Controller.extend = function(protoProps, staticProps) {
  var parent = this;
  var child;

  if (protoProps && _.has(protoProps, 'constructor')) {
    child = protoProps.constructor;
  } else {
    child = function(){ return parent.apply(this, arguments); };
  }

  _.extend(child, parent, staticProps);

  child.prototype = _.create(parent.prototype, protoProps);
  child.prototype.constructor = child;

  child.__super__ = parent.prototype;

  return child;
};