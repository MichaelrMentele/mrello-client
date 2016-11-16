// CardView -> An atomic subview of a list view

// Subviews
// None

// Events
// Click on CardView -> Render cardedit modal view

var MrelloApp = MrelloApp || {};

MrelloApp.views.Card = Backbone.View.extend({
  template: MrelloApp.templates["board/lists/card"],
  tagName: "div",
  className: "list-card",
  attributes: {
    "draggable" : "true",
  },
  events: {
    "click .card" : "renderEditor",
    "click .card-delete" : "delete"
  },
  initialize: function() {
    this.index = this.model.collection.indexOf(this.model)
    this.render();
    this.bindDragEvents();
  },
  bindDragEvents: function() {
    var self = this;
    this.$el.on("dragstart", function(ev) {
      console.log("Saving model being dragged...");
      MrelloApp.draggedObject = self.model;
    });

    this.$el.on("dragover", function(ev) {
      console.log("")
      MrelloApp.insertAt = self.index;
    });
  },
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
  renderEditor: function() {
    new MrelloApp.views.CardEditor({model: this.model});
  },
  delete: function() {
    console.log("Card: " + this.model.get("title") + " destroyed");
    this.model.destroy({
      success: function(model, response, options) {
        console.log("Card successfully desytroyed")
      },
      error: function(model, response, options) {
        console.log("Error destroying card.")
      }
    });
  }
});

