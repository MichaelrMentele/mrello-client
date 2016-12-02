var MrelloApp = MrelloApp || {}

MrelloApp.Models.Organization = Backbone.Model.extend({
  urlRoot: "/api/v1/organizations",
  defaults: {
    title: "",
  },
  parse: function(response, options) {
    if(response.organization) {
      return response.organization;
    } else {
      return response;
    }
  },
  initialize: function() {
    console.log("New Organization Created")

    this.set("joinRequests", 
      new MrelloApp.collections.JoinRequests()
    );

    this.get("joinRequests").parent = this;

    this.get("joinRequests").fetch({
      data: $.param({ organization_id: this.id })
    });
  }
});