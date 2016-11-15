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
  model: {},      
  collection: {}, 
  view: {},     
  router: {}, 
  templates: HandlebarsTemplates,
  // application objects -- called out here for readability
  data: {},
  routes: {},
  events: {},
  boardView: {},
  init: function() {
    // Setup
    this.data = new this.collection.Lists();  
    this.events = _.extend({}, Backbone.Events);
    this.bindEvents();

    // Run
    this.routes = new this.router.MrelloRouter(); // first create instance of router
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
    MrelloApp.boardView = new MrelloApp.view.Board();
  },
  renderLogin: function() {
    alert("Rendering Login")
  }
}

                                 