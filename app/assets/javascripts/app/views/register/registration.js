// RegistrationView === User Registration Page

// Subviews:
// Registration -> Form

var MrelloApp = MrelloApp || {};

MrelloApp.views.Registration = Backbone.View.extend({
  template: MrelloApp.templates['users/new'],
  registerForm: MrelloApp.templates['users/form'],
  events: {
    "click #submit-registration" : "submit",
    "click #navigate-to-login" : "navigateToLogin"
  },  
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
  },
  submit: function(e) {
    e.preventDefault();
    alert("form submit")
  },
  navigateToLogin: function(e) {
    e.preventDefault();
    MrelloApp.routes.navigate("login", { trigger: true })
  }
});