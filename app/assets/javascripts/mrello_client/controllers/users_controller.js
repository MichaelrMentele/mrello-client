var MrelloApp = MrelloApp || {}

MrelloApp.Controllers.Users = MrelloApp.Controllers.Application.extend({

  initialize: function() {
    this.listenTo(MrelloApp.eventBus, "users:new", this.new)
    this.listenTo(MrelloApp.eventBus, "users:create", this.create)
    this.listenTo(MrelloApp.eventBus, "users:cache", this.cache)
  },
  
  new: function() {
    console.log("Rendering registration form")
    
    var headerView = new MrelloApp.Views.HeaderRegions.Page()
    var registerView = new MrelloApp.Views.BodyRegions.UsersNew()

    this.renderPage({
      header: headerView,
      body: registerView
    })
  },

  create: function(userAttrs) {
    var user = new MrelloApp.Models.User(userAttrs)

    var self = this
    user.save({}, {
      success: function(model, response, options){
        console.log(response.message)
        // TODO: Refactor so only safe information is returned and stored client side
        MrelloApp.session.currentUser = new MrelloApp.Models.User(response.user)
        MrelloApp.routes.navigate("login", { trigger: true } )

        MrelloApp.setFlash("You are registered!", "success")
        self.redirectTo("home")
      }, 

      error: function(model, response, options) {
        console.log(response.message)

        self.renderFlashMessage({
          message: response.message,
          type: "danger"
        })
      }
    })
  },

  cache: function(currentUserAttrs) {
    // TODO: Refactor security problem. This can potentially be saved or deleted from the server?
    MrelloApp.session.currentUser = new MrelloApp.Models.User(currentUserAttrs)
  },

})
