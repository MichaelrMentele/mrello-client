var MrelloApp = MrelloApp || {}

MrelloApp.Controllers.Organizations = MrelloApp.Controllers.Application.extend({

  initialize: function() {
    this.listenTo(MrelloApp.eventBus, "organizations:new", this.new)
    this.listenTo(MrelloApp.eventBus, "organizations:create", this.create)
    this.listenTo(MrelloApp.eventBus, "organizations:index:all", this.indexAll)
    this.listenTo(MrelloApp.eventBus, "organizations:index:user", this.indexUser)
    this.listenTo(MrelloApp.eventBus, "organizations:show", this.show)
  },
  
  new: function() {
    console.log("Rendering create organization page")

    var headerView = new MrelloApp.Views.HeaderRegions.Page({
      stateInfo: "New Organization",
      navViews: [
        new MrelloApp.Views.Atomics.NavUserOrganizations(),
        new MrelloApp.Views.Atomics.NavUserBoards(),
        new MrelloApp.Views.Atomics.NavLogout(),
      ]
    })

    var bodyView = new MrelloApp.Views.BodyRegions.OrganizationsNew()

    this.renderPage({
      header: headerView,
      body: bodyView
    })
  },

  create: function(args) {
    var organization = new MrelloApp.models.Organization(args)
    organization.save({}, {
      success: function(model, response, options){
        MrelloApp.setFlash(response.message, "success")
        
        self.redirectTo("user/organizations")
      }, 
      error: function(model, response, options) {
        self.renderFlash(response.message, "danger")
      }
    })
  },
  // TODO: refactor and combine index all with user, or find some way to abstract fetch pattern?
  indexAll: function() {
    var organizations = new MrelloApp.Collections.Organizations()

    var self = this
    organizations.fetch({
      success: function(model, response, options){
        var headerView = new MrelloApp.Views.HeaderRegions.Page({
          stateInfo: "All Organizations",
          navViews: [
            new MrelloApp.Views.Atomics.NavUserOrganizations(),
            new MrelloApp.Views.Atomics.NavUserBoards(),
            new MrelloApp.Views.Atomics.NavLogout(),
          ]
        })

        var boardsView = new MrelloApp.Views.BodyRegions.OrganizationsAllIndex({ collection: organizations })

        self.renderPage({
          header: headerView,
          body: boardsView
        })
      },

      error: function(model, response, options) {
        MrelloApp.setFlash(response.message, "warning")
        self.redirectTo("home")
      }
    })
  },

  indexUser: function() {
    console.log("Rendering user organizations")

    // Scope defualts
    var currentUser = MrelloApp.session.currentUser

    // Fetch organizations for given scope
    var self = this
    currentUser.organizations.fetch({
      data: $.param({ user_id: currentUser.id }), // if we pass a user id we get the users orgs
      success: function(model, response, options){
        var headerView = new MrelloApp.Views.HeaderRegions.Page({
          stateInfo: "Your Organizations",
          navViews: [
            new MrelloApp.Views.Atomics.NavAllOrganizations(),
            new MrelloApp.Views.Atomics.NavUserBoards(),
            new MrelloApp.Views.Atomics.NavLogout(),
          ]
        })

        var boardsView = new MrelloApp.Views.BodyRegions.OrganizationsUserIndex({ collection: currentUser.organizations })

        self.renderPage({
          header: headerView,
          body: boardsView
        })
      },

      error: function(model, response, options) {
        MrelloApp.setFlash(response.message, "warning")
        self.redirectTo("home")
      }
    })
  },

  show: function(id) {
    console.log("Rendering boards and membership requests")

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
