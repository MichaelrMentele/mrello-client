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
    this.initializeLists()
  },

  // Initializers
  initializeLists: function() {
    console.log("Fetching lists for your board.")
    this.set("lists", 
      new MrelloApp.Collections.Lists()
    );
    this.get("lists").parent = this
  }
})