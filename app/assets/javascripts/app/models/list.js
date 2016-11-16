var MrelloApp = MrelloApp || {};

MrelloApp.models.List = Backbone.Model.extend({
  defaults: {
    title: "List",
  },
  initialize: function() {
    console.log("New List Created")
    this.set("cards", 
      new MrelloApp.collections.Cards()
    );
    this.get("cards").parent = this;
    this.get("cards").fetch({
      data: $.param({ list_id: this.id })
    });
  }
});