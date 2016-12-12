var MrelloApp = MrelloApp || {}

MrelloApp.Views.Atomics.BoardsCreate = Backbone.View.extend({
  template: MrelloApp.templates['body_regions/boards/board_create'],

  className: "board-tile-wrapper",

  events: {
    "click #create-board" : "createBoard"
  },

  initialize: function() {
    this.render()
  },

  render: function() {
    this.$el.html(this.template())
    return this
  },

  createBoard: function(e) {
    e.preventDefault()
    console.log("Creating a board...")

    var title = this.getTitleInput()
    var type = MrelloApp.session.ownerType()
    var id = MrelloApp.session.ownerId()
    var attributes = { 
      title: title,
      owner_type: type,
      owner_id: id,
    }
    MrelloApp.eventBus.trigger("boards:create", attributes)
  },

  getTitleInput: function() {
    return this.$el.find("input").val()
  }
})