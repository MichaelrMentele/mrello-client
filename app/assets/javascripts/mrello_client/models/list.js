var MrelloApp = MrelloApp || {};

MrelloApp.Models.List = Backbone.Model.extend({
  urlRoot: "/api/v1/lists",

  defaults: {
    title: "List",
  },

  parse: function(response, options) {
    if(response.list) {
      return response.list;
    } else {
      return response;
    }
  },
  
  initialize: function() {
    console.log("New List Created")
    
    this.initializeCards()
  },

  // Initializers
  initializeCards: function() {
    this.set("cards", 
      new MrelloApp.Collections.Cards()
    );
    this.get("cards").parent = this;
    this.get("cards").fetch({
      data: $.param({ list_id: this.id })
    });
  }
});