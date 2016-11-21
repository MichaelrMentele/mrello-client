// Organization === Individual organization to join on index

var MrelloApp = MrelloApp || {};

MrelloApp.views.Organization = Backbone.View.extend({

  template: MrelloApp.templates['organizations/organization'],

  tagName: "li",
  className: "organization",

  events: {
    "click .join" : "handleJoin"
  },

  initialize: function() {
    this.render()
  },

  render: function() {
    this.$el.html( this.template(this.model.toJSON()) )
    return this
  }
});