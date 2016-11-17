// BoardView: The main view that manages all other views and
// binds event to static DOM elements

// Subviews:
// Board -> Lists      

// Statically Included Views Managed by 'this' View:
// Searchbar
// AddList
// ListTitleEntry

// Events:
// On keyup Searchbar -> Filter lists views
// Click on Add List -> Swap for ListTitleEntryView
// Click add on ListTitleEntryView -> Create new list view and Swap for AddList view
// Click cancel on ListTitleEntryView -> Swap for Addlist view

MrelloApp.views.Board = Backbone.View.extend({
  template: MrelloApp.templates['board/board'],
  el: "div",
  id: "board",
  events: {
    "keyup #search-bar input" : "searchCards",
  },
  initialize: function() {
    this.$el = $(this.el);
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