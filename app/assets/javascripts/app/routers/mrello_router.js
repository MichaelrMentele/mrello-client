var MrelloApp = MrelloApp || {}

MrelloApp.routers.MrelloRouter = Backbone.Router.extend({
  routes: {
    '': 'showBoard',
    '/login': 'showLogin'
  },
  showBoard: function() {          
    MrelloApp.data.fetch({
      success: function(){
        MrelloApp.events.trigger("renderBoard");
      }
    })
  },
  showLogin: function() {
    MrelloApp.events.trigger("renderLogin");
  }
})
