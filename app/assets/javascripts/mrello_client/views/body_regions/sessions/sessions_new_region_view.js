// LoginView === User Login Page

// Subviews:
// Login -> Form

var MrelloApp = MrelloApp || {}

MrelloApp.Views.BodyRegions.SessionsNew = Backbone.View.extend({
  template: MrelloApp.templates['body_regions/sessions/form'],

  className: "window",
  
  events: {
    "click #submit-login" : "submit",
    "click #navigate-to-registration" : "navigateToRegistration"
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
    console.log("Attempting login...")

    MrelloApp.eventBus.trigger("sessions:create", this.userInputs())
  },

  navigateToRegistration: function(e) {
    e.preventDefault()
    MrelloApp.eventBus.trigger("routes:go", "register")
  },
  
  userInputs: function() {
    var inputs = {}
    inputs.email = $("#inputEmail").val()
    inputs.password = $("#inputPassword").val()
    return inputs
  }
})