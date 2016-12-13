var MrelloApp = MrelloApp || {};

// Handles list related logic through routing events
// Serves as board related pub/sub event aggregator
MrelloApp.Controllers.Lists = MrelloApp.Controllers.Application.extend({

  initialize: function() {
    this.on("create", this.create)
  },

  create: function(lists, listAttrs) {
    console.log("Creating board.")

    var list = new MrelloApp.Models.List(listAttrs)
    lists.add(list)
    
    var self = this
    list.save([], {
      success: function(model, response, options) {
        self.renderFlashMessage({
          message: response.message,
          type: "success"
        })
      },

      error: function(model, response, options) {
        self.renderFlashMessage({
          message: response.message,
          type: "warning"
        })
      }
    })
  },
})
