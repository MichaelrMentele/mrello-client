var MrelloApp = MrelloApp || {}

MrelloApp.Controllers.Organizations = MrelloApp.Controllers.Application.extend({

  initialize: function() {
    this.on("new", this.new)
    this.on("create", this.create)
    this.listenTo(MrelloApp.eventBus, "organizations:index", this.index)
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

  index: function(options) {
    console.log("Rendering organizations")

    var currentUser = MrelloApp.session.currentUser

    var userParam = {}
    if(options & options.scope == "User") {
      userParam.user_id = currentUser.id 
    }

    var self = this
    currentUser.organizations.fetch({
      data: $.param(userParam),
      success: function(model, response, options){
        var indexView = new MrelloApp.Views.OrganizationsIndex()
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
        MrelloApp.routes.navigate("", { trigger: true })
      }
    })   
  }
})
