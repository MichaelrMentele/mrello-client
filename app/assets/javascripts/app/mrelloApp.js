// App -> lists -> list-1 -> cards -> card-1 -> ...
//                 list-n -> cards -> card-n -> comments    -> comment-n
//                                              checklists  -> checklist-n

// App Data:
// - A collection of lists

// Lists Data:
// - list constructor
// - models

// List Data:
// - An id
// - A title (string)
// - A collection of cards

// Cards data:
// - card constructor
// - models

var MrelloApp = {
  // constructor namespaces
  models: {},      
  collections: {}, 
  views: {},     
  routers: {}, 
  templates: HandlebarsTemplates,
  // application objects -- called out here for readability
  data: {},
  routes: {},
  events: {},
  appView: {},
  init: function() {
    // Setup
    this.data = new this.collections.Lists();  
    this.events = _.extend({}, Backbone.Events);
    this.bindEvents();

    // Run
    this.routes = new this.routers.MrelloRouter(); // first create instance of router
    Backbone.history.start({pushState: true});         // pushState uses the full URL
    // TODO: Session data?
    // TODO: User data?
  },
  bindEvents: function() {
    MrelloApp.events.on("renderBoard", MrelloApp.renderBoard);
    MrelloApp.events.on("renderLogin", MrelloApp.renderLogin);
  },
  renderBoard: function() {
    console.log("Rendering board")
    MrelloApp.appView = new MrelloApp.views.Board();
  },
  renderLogin: function() {
    alert("Rendering Login")
  }
}

                                 