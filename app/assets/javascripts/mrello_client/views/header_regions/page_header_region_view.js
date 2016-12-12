var MrelloApp = MrelloApp || {}

MrelloApp.Views.HeaderRegions.Page = Backbone.View.extend({
  template: MrelloApp.templates['header_regions/header'],
  
  tagName: "header",
  className: "page-head",

  // TODO: Move all except logout to their own views
  events: {
    "click #create-org" : "createOrg", // Admin only
    "click #join-org"   : "joinOrg",
    "click #manage-org" : "manageOrganization",
  },

  initialize: function(options) {
    if(options) {
      this.stateInfo  =   options.stateInfo     // Provides context message to user

      // Sub views
      this.search     =   options.searchView    // Expects search bar view    
      this.navViews   =   options.navViews      // Expects array of navigation links
    }

    this.render()
  },

  render: function() {
    this.renderSelf()

    if(this.search) {
      this.renderSearch()
    }

    this.renderNav()
    return this
  },

  renderSelf: function() {
    this.$el.html(this.template({ stateInfo: this.stateInfo }))
  },

  renderSearch: function() {
    this.$el.find("#search-container").html(this.search.el)
  },

  renderNav: function() {
    this.$el.find("#nav-aside-right").empty()
    _.each(this.navViews, this.appendNavView, this)
  },

  appendNavView: function(view) {
    this.$el.find("#nav-aside-right").append(view.el)
  },

  // TODO: Move all of this to atomic nav views.
  createOrg: function(e) {
    e.preventDefault()
    console.log("Creating organization")
    MrelloApp.routes.navigate("organizations/new", { trigger: true })
  },

  joinOrg: function(e) {
    e.preventDefault()
    console.log("Showing organizations to join")
    MrelloApp.routes.navigate("organizations", { trigger: true } )
  },

  manageOrganization: function(e) {
    e.preventDefault()
    console.log("Managing requests")
    MrelloApp.routes.navigate("organizations/show", { trigger: true })
  },
})