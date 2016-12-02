var MrelloApp = MrelloApp || {};

MrelloApp.Models.Board = Backbone.Model.extend({

  parse: function(response, options) {
    if(response.board) {
      return response.board;
    } else {
      return response;
    }
  },
  
  initialize: function() {
    console.log("New List Created")
    
    this.initializeLists()
  },

  // Initializers
  initializeLists: function() {
    this.set("lists", 
      new MrelloApp.collections.Lists()
    );
    this.get("lists").parent = this;
    this.get("lists").fetch({
      data: $.param({ board_id: this.id })
    })
  }
})