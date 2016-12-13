// Organization === Individual organization to join on index

var MrelloApp = MrelloApp || {};

MrelloApp.Views.Organization = Backbone.View.extend({

  template: MrelloApp.templates['body_regions/organizations/organization'],

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
    console.log("User creating unapproved membership")

    var membership = new MrelloApp.Models.Membership({ 
      organization_id: this.model.id
    })

    Membership.save({}, {  
      success: function(model, response, options) {
        console.log("Join request created.")
        MrelloApp.routes.navigate("", { trigger: true })
      },
      error: function(model, response, options) {
        console.log("User failed to join org")
      }
    })
  }
});