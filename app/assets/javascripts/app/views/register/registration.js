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
    console.log("Attempting to create user...");
    var user = new MrelloApp.models.User(this.userInputs());
    user.save({}, {
      success: function(model, response, options){
        console.log(response.message);
      }, 
      error: function(model, response, options) {
        console.log(response.message);
      }
    })
  },
  navigateToLogin: function(e) {
    e.preventDefault();
    MrelloApp.routes.navigate("login", { trigger: true });
  },
  userInputs: function() {
    var inputs = {};
    inputs.fullname = $("#inputFullname").val();
    inputs.email = $("#inputEmail").val();
    inputs.password = $("#inputPassword").val();
    return inputs
  }
});