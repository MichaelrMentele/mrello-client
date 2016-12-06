var MrelloApp = MrelloApp || {};

MrelloApp.Controllers.Sessions = MrelloApp.Controllers.Application.extend({
  
  initialize: function() {
    this.listenTo(MrelloApp.eventBus, "sessions:new", this.new);
    this.listenTo(MrelloApp.eventBus, "sessions:create", this.create)
    this.listenTo(MrelloApp.eventBus, "sessions:destroy", this.destroy);
  },

  new: function() {
    console.log("Rendering login page");

    var headerView = new MrelloApp.Views.HeaderRegions.Page()
    var loginView = new MrelloApp.Views.BodyRegions.SessionsNew();

    this.renderPage({
      header: headerView, 
      body: loginView
    });
  },

  create: function(credentials) {
    var session = new MrelloApp.Models.Session(credentials)

    var self = this
    session.save([], {
      success: function(model, response, options){
        console.log("Session Saved Successfully.")

        MrelloApp.session = new MrelloApp.Models.Session({
          token: response.session_token
        })
        // TODO: Do we even need to store a current user? We know the current user via the token. At most we need maybe the users name and other non-sensitive information to enhance the user experience.
        MrelloApp.eventBus.trigger('users:cache', response.user)

        
        MrelloApp.setFlash(response.message, "success")
        self.redirectTo("home")
      }, 
      error: function(model, response, options) {
        console.log("Session save error.")

        self.renderFlashMessage({
          message: response.message,
          type: "danger"
        })
      }
    })
  },

  destroy: function() {
    console.log("Clearing session and redirecting to login.")

    MrelloApp.clearSessionCache()
    MrelloApp.resetData()

    this.redirectTo("login")
  }
});
