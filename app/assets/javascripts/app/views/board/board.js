// BoardView === User Board Page

// Subviews:
// Board -> Lists      

// Subviews Directly Managed by BoardView:
// Searchbar

// Events:
// On keyup Searchbar -> Filter lists views

MrelloApp.views.Board = Backbone.View.extend({
  template: MrelloApp.templates['board/board'],
  events: {
    "keyup #search-bar input" : "searchCards",
  },
  initialize: function() {
    this.render();
    this.bindEvents();
  },
  bindEvents: function() {
    MrelloApp.events.on("refreshSearch", this.searchCards);
  },
  render: function() {
    this.$el.html(this.template());
    this.renderLists();
    this.searchCards();
    return this;
  },
  renderLists: function() {
    var listsView = new MrelloApp.views.Lists()
    this.$el.find("#lists-container").html(listsView.el)
  },
  searchCards: function() {
    console.log("searching...")
    var query = $("#search-bar input").val();
    
    $(".card").css({
      "background": "white",
      "box-shadow" : "none"
    });

    if (query) {
      $(".card:contains(" + query + ")").css({
        "background": "aqua",
        "box-shadow" : "4px 4px 4px #888888",
      })
    }
  }
});