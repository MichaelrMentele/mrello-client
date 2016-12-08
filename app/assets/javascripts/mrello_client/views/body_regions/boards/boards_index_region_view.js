var MrelloApp = MrelloApp || {}

MrelloApp.Views.BodyRegions.BoardsIndex = Backbone.View.extend({
  className: "boards-wrapper",

  initialize: function() {
    this.render()
  },

  render: function() {
    this.renderBoardTiles()
    return this
  },

  renderBoardTiles: function() {
    this.collection.each(this.renderBoardTileView, this)
  },

  renderBoardTileView: function(board) {
    var tileView = new MrelloApp.Views.Atomics.BoardTile({
                     model: board
                   })
    this.$el.append(tileView.el)
  },
})