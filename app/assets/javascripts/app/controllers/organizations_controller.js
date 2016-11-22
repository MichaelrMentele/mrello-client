var MrelloApp = MrelloApp || {}

MrelloApp.controllers.Organizations = MrelloApp.controllers.Application.extend({

  initialize: function() {
    this.on("new", this.new)
    this.on("index", this.index)
  },
  
  new: function() {
    console.log("Rendering create organization page")

    var orgView = new MrelloApp.views.OrganizationsNew()
    this.render(orgView)
  },

  index: function() {
    console.log("Rendering organizations")
    var self = this
    MrelloApp.organizations.fetch({

      success: function(model, response, options){
        var indexView = new MrelloApp.views.OrganizationsIndex()
        self.render(indexView)
      },

      error: function(model, response, options) {
        console.log("You must be an admin for that.")
        MrelloApp.routes.navigate("", { trigger: true })
      }
    })
  }
})
