var MrelloApp = MrelloApp || {}

MrelloApp.routers.MrelloRouter = Backbone.Router.extend({
  routes: {
    '': 'showBoard',
    'login': 'showLogin',
    'register': 'showRegistration'
  },
  showBoard: function() {   
    console.log("Router: @root, triggering showBoard...")       
    MrelloApp.data.fetch({
      success: function(){
        MrelloApp.events.trigger("renderBoard");
      }
    })
  },
  showRegistration: function() {
    console.log("Router: @register, triggering showRegistration..."); 
    MrelloApp.events.trigger("renderRegistration");
  },
  showLogin: function() {
    MrelloApp.events.trigger("renderLogin");
  }
})
