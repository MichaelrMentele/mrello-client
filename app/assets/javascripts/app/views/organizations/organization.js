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
  },

  handleJoin: function(e) {
    e.preventDefault()
    console.log("User attempting to join org")
    MrelloApp.currentUser.save({ organization_id: this.model.id }, { 
      patch: true, 
      success: function(model, response, options) {
        console.log("User joined org.")
        MrelloApp.currentUser = new MrelloApp.models.User(response.user)
        MrelloApp.routes.navigate("", { trigger: true })
      },
      error: function(model, response, options) {
        console.log("User failed to join org")
      }
    })
  }
});