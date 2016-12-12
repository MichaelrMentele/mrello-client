var MrelloApp = MrelloApp || {}

MrelloApp.Views.Atomics.CardSearch = Backbone.View.extend({
  template: MrelloApp.templates['header_regions/card_search'],  

  id: "search-bar",

  events: {
    "keyup input" : "searchCards",
  },

  render: function() {
    this.$el.html(this.template())
    return this
  },

  searchCards: function() {
    console.log("searching...")
    var query = $("#search-bar input").val()
    
    $(".card").css({
      "background": "white",
      "box-shadow" : "none"
    })

    if (query) {
      $(".card:contains(" + query + ")").css({
        "background": "aqua",
        "box-shadow" : "4px 4px 4px #888888",
      })
    }
  },
})