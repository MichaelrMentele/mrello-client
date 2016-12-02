var MrelloApp = MrelloApp || {};

// Handles list related logic through routing events
// Serves as board related pub/sub event aggregator
MrelloApp.Controllers.Lists = MrelloApp.Controllers.Application.extend({

  initialize: function() {
    this.on("create", this.create)
  },

  create: function(args) {
    console.log("@listsConroller: creating new list")

    MrelloApp.data.create(args, {
      wait: true,
      success: function(model, response, options) {
        console.log("Virgin list created.")
      },
      error: function(model, response, options) {
        console.log("Failed on virgin list create.")
      }
    }) 
  }
})
