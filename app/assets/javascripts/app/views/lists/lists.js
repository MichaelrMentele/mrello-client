var MrelloApp = MrelloApp || {};

MrelloApp.views.Lists = Backbone.View.extend({
  initialize: function() {
    this.$el = $("#lists-container")
    this.lists = MrelloApp.data;
    this.renderLists();
  },
  renderLists: function() {
    this.$el.empty();
    this.lists.each(this.renderListView, this);
  },
  renderListView: function(list) {
    var listView = new MrelloApp.views.List({
                     model: list
                   });
    this.$el.append(listView.el);
  },
});