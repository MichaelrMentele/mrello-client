var MrelloApp = MrelloApp || {};

MrelloApp.controllers.Organizations = Backbone.Controller.extend({

  containerID: "#app-container",

  initialize: function() {
    this.on("new", this.new);
  },
  
  new: function() {
    console.log("Rendering create organization page");

    var orgView = new MrelloApp.views.OrganizationsNew();
    this.render(orgView);
  },
});
