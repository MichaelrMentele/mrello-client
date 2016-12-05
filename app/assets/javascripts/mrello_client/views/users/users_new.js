// RegistrationView === User Registration Page

// Subviews:
// Registration -> Form

var MrelloApp = MrelloApp || {}

MrelloApp.Views.BodyRegions.UsersNew = Backbone.View.extend({
  template: MrelloApp.templates['users/form'],

  className: "window",

  events: {
    "click #submit-registration" : "submit",
    "click #navigate-to-login" : "navigateToLogin"
  },  

  initialize: function() {
    this.render()
  },

  render: function() {
    this.$el.html(this.template())
    return this
  },

  submit: function(e) {
    e.preventDefault()
    console.log("Attempting to create user...")

    MrelloApp.eventBus.trigger("users:create", this.userInputs())
  },

  navigateToLogin: function(e) {
    e.preventDefault()
    MrelloApp.eventBus.trigger("routes:go", "login")
  },

  userInputs: function() {
    var inputs = {}
    inputs.fullname = $("#inputFullname").val()
    inputs.email = $("#inputEmail").val()
    inputs.password = $("#inputPassword").val()
    return inputs
  }
})