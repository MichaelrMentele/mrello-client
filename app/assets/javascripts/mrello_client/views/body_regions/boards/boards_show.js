// BoardView === User Board Page

// Subviews:
// Board -> Lists      

MrelloApp.Views.BodyRegions.BoardsShow = Backbone.View.extend({

  template: MrelloApp.templates['boards/board'],

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