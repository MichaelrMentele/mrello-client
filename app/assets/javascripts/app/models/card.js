var MrelloApp = MrelloApp || {};

MrelloApp.models.Card = Backbone.Model.extend({
  defaults: {
    title: "Card",
    description: "",
  },
  parse: function(response, options) {
    if(response.card) {
      return response.card;
    } else {
      return response;
    }
  },
  initialize: function(attributes) {
    console.log("New Card Created");

    // Setup sub resources
    this.set("comments", attributes.comments || new MrelloApp.collections.Comments());
    this.get("comments").parent = this;

    this.set("checklists", attributes.checklists || new MrelloApp.collections.Checklists());
    this.get("checklists").parent = this; // store a reference

    // Create useful references to parent collection
    if (this.collection) {
      // Look for the parent Lists' title and cache it for easy rendering
      this.set("listTitle", this.collection.parent.attributes.title);

      // Store a reference to parent list to associate server side
      this.set("list_id", this.collection.parent.attributes.id);
    }
  }
});