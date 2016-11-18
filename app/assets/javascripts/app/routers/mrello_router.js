var MrelloApp = MrelloApp || {}

MrelloApp.routers.MrelloRouter = Backbone.Router.extend({
  routes: {
    '': 'showBoard',
    'login': 'showLogin',
    'register': 'showRegistration'
  },
  showBoard: function() {   
    console.log("Router: @root, triggering board...")       
    MrelloApp.data.fetch({
      success: function(){
        MrelloApp.events.trigger("renderBoard");
      }
    })
  },
  showRegistration: function() {
    console.log("Router: @register, triggering registration..."); 
    MrelloApp.events.trigger("renderRegistration");
  },
  showLogin: function() {
    console.log("Router: @login, triggering login")
    MrelloApp.events.trigger("renderLogin");
  }
})


