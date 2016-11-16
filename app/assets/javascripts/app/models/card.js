var MrelloApp = MrelloApp || {};

MrelloApp.models.Card = Backbone.Model.extend({
  defaults: {
    title: "Card",
    description: "",
  },
  initialize: function(attributes) {
    console.log("New Card Created");

    this.set("comments", attributes.comments || new MrelloApp.collections.Comments());
    this.get("comments").parent = this;

    this.set("checklists", attributes.checklists || new MrelloApp.collections.Checklists());
    this.get("checklists").parent = this; // store a reference

    if (this.collection) {
      // Look for the parent Lists' title and cache it for easy rendering
      this.set("listTitle", this.collection.parent.attributes.title);
      // Store a reference to parent list to associate server side
      this.set("list_id", this.collection.parent.attributes.id);
    }
  }
});