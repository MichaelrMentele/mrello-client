var MrelloApp = MrelloApp || {}

MrelloApp.controllers.Organizations = MrelloApp.controllers.Application.extend({

  initialize: function() {
    this.on("new", this.new)
    this.on("create", this.create)
    this.on("index", this.index)
    this.on("show", this.show)
  },
  
  new: function() {
    console.log("Rendering create organization page")

    var orgView = new MrelloApp.views.OrganizationsNew()
    this.render(orgView)
  },

  create: function(args) {
    var organization = new MrelloApp.models.Organization(args)
    organization.save({}, {
      success: function(model, response, options){
        console.log(response.message)
        
        MrelloApp.routes.navigate("", { trigger: true } )
      }, 
      error: function(model, response, options) {
        console.log(response.message)
      }
    })
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
  },

  show: function() {
    console.log("Rendering join requests")

    var org_id = MrelloApp.currentUser.get("organization_id")
    var organization = new MrelloApp.models.Organization({id: org_id})
    
    var self = this
    organization.fetch({
      success: function(model, response, options) {
        var requestsView = new MrelloApp.views.OrganizationRequests({ model: organization})
        self.render(requestsView)
      },

      error: function(model, response, options) {
        console.log("Fetch failed for join requests.")
      }
    })   
  }
})
