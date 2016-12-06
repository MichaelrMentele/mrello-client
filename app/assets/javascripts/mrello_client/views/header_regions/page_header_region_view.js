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
    "click #view-orgs"  : "viewOrganizationsBoards"
  },

  initialize: function(searchable=false, navViews=[]) {
    this.searchable = searchable
    this.navViews = navViews

    this.render()
    this.bindSearch()
  },

  render: function() {
    this.renderSelf()
    this.renderNav()
    return this
  },

  renderSelf: function() {
    this.$el.html(this.template(this.context))
  },

  renderNav: function() {
    // TODO:
  },

  bindSearch: function() {
    if(this.searchable) {
      this.listenTo(MrelloApp.eventBus, "board:search", this.searchCards)
    }
  },

  searchCards: function() {
    console.log("searching...")
    var query = $("#search-bar input").val()
    
    $(".card").css({
      "background": "white",
      "box-shadow" : "none"
    })

    if (query) {
      $(".card:contains(" + query + ")").css({
        "background": "aqua",
        "box-shadow" : "4px 4px 4px #888888",
      })
    }
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

  viewBoard: function(e) {
    e.preventDefault()
    console.log("Viewing board")
    MrelloApp.routes.navigate("", { trigger: true })
  },

  manageOrganization: function(e) {
    e.preventDefault()
    console.log("Managing requests")
    MrelloApp.routes.navigate("organizations/show", { trigger: true })
  },

  viewOrganizationsBoard: function(e) {
    e.preventDefault()
    console.log("Attempting to view (shared) board.")
    
    // Get the shared org and then show it
    MrelloApp.currentUser.getSharedBoardId(function(boardId) {
      var url = "board/show/" + boardId
      MrelloApp.routes.navigate(url, { trigger: true })
    })
  }
})