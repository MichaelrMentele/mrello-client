var MrelloApp = MrelloApp || {}

MrelloApp.Views.BodyRegions.BoardsIndex = Backbone.View.extend({
  template: MrelloApp.templates['body_regions/boards/boards_index'],

  className: "boards-wrapper",

  events: {
    "click #board-new" : "newClicked",
    "click #cancel-create-board" : "createCancelled"
  },

  newClicked: function(e) {
    e.preventDefault()
    this.renderCreateSubView()
  },

  createCancelled: function(e) {
    e.preventDefault()
    this.renderNewSubView()
  },

  initialize: function() {
    if(!this.collection) {
      this.collection = new MrelloApp.Collections.Boards()
    }

    this.render()
  },

  render: function() {
    this.$el.html(this.template())
    this.renderBoardTiles()
    this.renderNewSubView()
    return this
  },

  renderBoardTiles: function() {
    this.collection.each(this.renderBoardTileView, this)
  },

  renderBoardTileView: function(board) {
    var tileView = new MrelloApp.Views.Atomics.BoardTile({
                     model: board
                   })
    this.$el.find("#tiles").append(tileView.el)
  },

  renderNewSubView: function() {
    console.log("Rendering new board button")

    var subView = new MrelloApp.Views.Atomics.BoardsNew()
    this.$el.find('#boards-controls-wrapper').html(subView.el)
  },

  renderCreateSubView: function() {
    console.log("Rendering new board create")

    var subView = new MrelloApp.Views.Atomics.BoardsCreate()
    this.$el.find('#boards-controls-wrapper').html(subView.el)
  },
})