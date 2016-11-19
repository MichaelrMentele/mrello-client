// LoginView === User Login Page

// Subviews:
// Login -> Form

var MrelloApp = MrelloApp || {};

MrelloApp.views.Login = Backbone.View.extend({
  template: MrelloApp.templates['sessions/new'],
  loginForm: MrelloApp.templates['sessions/form'],
  events: {
    "click #submit-login" : "submit",
    "click #navigate-to-registration" : "navigateToRegistration"
  },  
  initialize: function() {
    this.render();
  },
  render: function() {
    this.$el.html(this.template());
    this.renderForm();
  },
  renderForm: function() {
    this.$el.find("#login").html(this.loginForm());
    return this;
  },
  submit: function(e) {
    e.preventDefault();
    console.log("Attempting login...");
    session = MrelloApp.session.set(this.userInputs());
    session.sync("create", session, {
      success: function(response, status, options){
        console.log(response.message);

        // Clear user information!
        session.set("email", "");
        session.set("password", "");

        // Set auth token for current users session
        session.set("session_token", response.session_token);
        MrelloApp.routes.navigate("", { trigger: true} );
      }, 
      error: function(response, status, options) {
        console.log(response.message);
      }
    })
  },
  navigateToRegistration: function(e) {
    e.preventDefault();
    MrelloApp.routes.navigate("register", { trigger: true })
  },
  userInputs: function() {
    var inputs = {};
    inputs.email = $("#inputEmail").val();
    inputs.password = $("#inputPassword").val();
    return inputs
  }
});