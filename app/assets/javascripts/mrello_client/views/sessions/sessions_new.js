// LoginView === User Login Page

// Subviews:
// Login -> Form

var MrelloApp = MrelloApp || {}

MrelloApp.Views.Sessions.New = Backbone.View.extend({
  template: MrelloApp.templates['sessions/form'],
  
  events: {
    "click #submit-login" : "submit",
    "click #navigate-to-registration" : "navigateToRegistration"
  },  

  initialize: function() {
    this.render()
  },

  render: function() {
    this.renderHeader()
    this.$el.append(this.template())
  },

  renderHeader: function() {
    var headerView = new MrelloApp.Views.Header()
    this.$el.append(headerView.el)
  },

  submit: function(e) {
    e.preventDefault()
    console.log("Attempting login...")

    session = MrelloApp.session.set(this.userInputs())
    // TODO: refactor this callback to be implicit on the session object?
    session.sync("create", session, {
      success: function(response, status, options){
        console.log(response.message)

        session.clearUserInfo() // clear sensitive user info
        session.set("token", response.session_token)
        MrelloApp.currentUser = new MrelloApp.models.User(response.user)
        // redirect to home page
        MrelloApp.routes.navigate("", { trigger: true} )
      }, 
      error: function(response, status, options) {
        console.log(response.message)
      }
    })
  },
  navigateToRegistration: function(e) {
    e.preventDefault()
    MrelloApp.routes.navigate("register", { trigger: true })
  },
  userInputs: function() {
    var inputs = {}
    inputs.email = $("#inputEmail").val()
    inputs.password = $("#inputPassword").val()
    return inputs
  }
})