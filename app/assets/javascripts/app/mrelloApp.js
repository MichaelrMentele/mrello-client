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
  containerID: "#app-container",
  init: function() {
    console.log("Mrello starting up...")

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
    MrelloApp.events.on("renderBoard", MrelloApp.renderBoard, this);
    MrelloApp.events.on("renderLogin", MrelloApp.renderLogin, this);
    MrelloApp.events.on("renderRegistration", MrelloApp.renderRegistration, this);
  },
  renderBoard: function() {
    console.log("Rendering board");
    this.clearAppView();
    new MrelloApp.views.Board();
  },
  renderLogin: function() {
    alert("Rendering Login")
  },
  renderRegistration: function() {
    console.log("Rendering registration form");
    this.clearAppView();
    new MrelloApp.views.Registration();
  },
  clearAppView: function() {
    $(this.containerID).empty();
  }
}

                                 