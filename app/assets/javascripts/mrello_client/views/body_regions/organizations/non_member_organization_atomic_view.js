// Organization === Individual organization to join on index

var MrelloApp = MrelloApp || {};

MrelloApp.Views.Atomics.NonMemberOrganization = Backbone.View.extend({

  template: MrelloApp.templates['body_regions/organizations/organization'],

  tagName: "li",
  className: "organization",

  events: {
    "click a" : "handleJoin"
  },

  initialize: function() {
    this.render()
  },

  render: function() {
    this.$el.html( this.template({ 
      title: this.model.get("title"), 
      button_text: "Join"
    }) )
    return this
  },

  handleJoin: function(e) {
    e.preventDefault()
    console.log("User creating unapproved membership")

    var membership = new MrelloApp.Models.Membership({ 
      organization_id: this.model.id
    })

    membership.save({}, {  
      success: function(model, response, options) {
        console.log("Membership request created.")
      },
      error: function(model, response, options) {
        console.log("User failed to join org")
      }
    })
  }
});