// BoardView === User Board Page

// Subviews:
// Board -> Lists      

// Subviews Directly Managed by BoardView:
// Searchbar

// Events:
// On keyup Searchbar -> Filter lists views

MrelloApp.views.Board = Backbone.View.extend({

  template: MrelloApp.templates['board/board'],

  events: {
    "keyup #search-bar input" : "searchCards",
  },

  initialize: function() {
    this.render()
  },

  render: function() {
    this.renderHeader()
    this.$el.append(this.template())
    this.renderLists()
    return this
  },

  renderHeader: function() {
    adminStatus = MrelloApp.currentUser.isAdmin()
    hasOrgStatus = MrelloApp.currentUser.hasOrganization()
    var headerView = new MrelloApp.views.Header({ 
      session: true, 
      board: true,
      admin: adminStatus,
      hasOrganization: hasOrgStatus,
    })
    this.$el.append(headerView.el)
  },

  renderLists: function() {
    var listsView = new MrelloApp.views.Lists()
    this.$el.find("#lists-container").html(listsView.el)
  },

})