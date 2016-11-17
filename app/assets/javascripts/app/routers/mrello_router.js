var MrelloApp = MrelloApp || {}

MrelloApp.routers.MrelloRouter = Backbone.Router.extend({
  routes: {
    '': 'showBoard',
    '/login': 'showLogin',
    '/register': 'showLogin'
  },
  showBoard: function() {          
    MrelloApp.data.fetch({
      success: function(){
        MrelloApp.events.trigger("renderBoard");
      }
    })
  },
  showRegister: function() {
    MrelloApp.events.trigger("renderRegistration")
  },
  showLogin: function() {
    MrelloApp.events.trigger("renderLogin");
  }
})
