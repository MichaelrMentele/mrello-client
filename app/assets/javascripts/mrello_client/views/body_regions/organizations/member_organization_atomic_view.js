// Organization === Individual organization to join on index

var MrelloApp = MrelloApp || {};

MrelloApp.Views.Atomics.MemberOrganization = Backbone.View.extend({

  template: MrelloApp.templates['body_regions/organizations/organization'],

  tagName: "li",
  className: "organization",

  events: {
    "click a" : "handleShow"
  },

  initialize: function() {
    this.render()
  },

  render: function() {
    this.$el.html( this.template({
      title: this.model.get("title"),
      button_text: "View"
    }) )
    return this
  },

  handleShow: function(e) {
    e.preventDefault()
    console.log("Showing member organization")

    MrelloApp.routes.go("organizations/" + this.model.id)
  }
});