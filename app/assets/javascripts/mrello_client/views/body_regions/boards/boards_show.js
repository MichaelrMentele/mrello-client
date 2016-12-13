// BoardView === User Board Page

// Subviews:
// Board -> Lists      

MrelloApp.Views.BodyRegions.BoardsShow = Backbone.View.extend({

  template: MrelloApp.templates['body_regions/boards/board_show'],

  initialize: function() {
    this.render()
  },

  render: function() {
    this.$el.append(this.template())
    this.renderLists()
    return this
  },

  renderLists: function() {
    var lists = this.model.get("lists")
    var listsView = new MrelloApp.Views.Lists({ collection: lists })
    this.$el.find("#lists-container").html(listsView.el)
  },

})