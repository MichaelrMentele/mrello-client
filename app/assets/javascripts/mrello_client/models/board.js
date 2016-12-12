var MrelloApp = MrelloApp || {};

MrelloApp.Models.Board = Backbone.Model.extend({
  url: "/api/v1/boards",

  parse: function(response, options) {
    if(response.board) {
      return response.board;
    } else {
      return response;
    }
  },
  
  initialize: function() {
    console.log("New Board Created")
  },

  // Initializers
  initializeLists: function() {
    console.log("Fetching lists for your board.")
    this.set("lists", 
      new MrelloApp.collections.Lists()
    );
    this.get("lists").parent = this;
    this.get("lists").fetch({
      data: $.param({ board_id: this.id })
    })
  }
})