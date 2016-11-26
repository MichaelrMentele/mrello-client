var MrelloApp = MrelloApp || {}

MrelloApp.views.Header = Backbone.View.extend({
  template: MrelloApp.templates['shared/header'],
  tagName: "header",
  className: "page-head",
  // TODO: Consider creating a header for admin and for normal user
  events: {
    "click #create-org" : "createOrg", // Admin only
    "click #logout"     : "logout", 
    "click #join-org"   : "joinOrg",
    "click #view-board" : "viewBoard", 
    "click #manage-org" : "manageOrganization", // Admin only
    "click #view-org"   : "viewOrganization"
  },

  initialize: function(context) {
    this.context = context
    this.render()
    this.bindEvents()
    this.searchCards()
  },

  render: function() {
    this.$el.html(this.template(this.context))
    return this
  },

  bindEvents: function() {
    MrelloApp.boardsController.on("refreshSearch", this.searchCards)
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
  
  logout: function(e) {
    e.preventDefault()
    console.log("Logging out")
    MrelloApp.routes.navigate("logout", { trigger: true })
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

  viewOrganization: function(e) {
    e.preventDefault()
    console.log("Viewing organizations (shared) board.")
    var id = MrelloApp.currentUser.get("organization_id")
    var url = "organizations/show/" + id
    MrelloApp.routes.navigate(url, { trigger: true })
  }
})