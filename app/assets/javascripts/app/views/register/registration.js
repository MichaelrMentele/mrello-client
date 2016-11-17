// RegistrationView === User Registration Page

// Subviews:
// Registration -> Form

var MrelloApp = MrelloApp || {};

MrelloApp.views.Registration = Backbone.View.extend({
  template: MrelloApp.templates['users/new'],
  registerForm: MrelloApp.templates['users/form'],
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.html(this.template());
    this.renderForm();
  },
  renderForm: function() {
    this.$el.find("#registration").html(this.registerForm());
    return this;
  }
});