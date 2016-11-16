var MrelloApp = MrelloApp || {};

MrelloApp.views.Lists = Backbone.View.extend({
  addListContainer: "#new-list-creator",
  addListMenu: MrelloApp.templates["board/lists/add-list-menu"],
  addListButton: MrelloApp.templates["board/lists/add-list-button"],
  events: {
    "click #new-list-creator .add-list" : "renderAddListMenu",
    "click #new-list-creator .button" : "addList",
    "click #new-list-creator .cancel" : "renderAddListButton",
  },
  initialize: function() {
    this.$el = $("#lists-container")
    this.lists = MrelloApp.data;
    this.render();
    this.bindEvents();
  },
  render: function() {
    this.renderLists();
    this.renderAddListButton();
  },
  bindEvents: function() {
    this.listenTo(this.lists, 'add remove change', this.render);
  },
  renderLists: function() {
    this.$el.empty();
    this.lists.each(this.renderListView, this);
  },
  renderAddListButton: function(e) {
    if (e) { e.preventDefault(); }
    $(this.addListContainer).html(this.addListButton());
  },
  renderAddListMenu: function(e) {
    e.preventDefault();
    $(this.addListContainer).html(this.addListMenu());
    $(this.el).find("input").focus();
  },
  addList: function(e) {
    e.preventDefault();
    var title = $(this.addListContainer + " .title-input").val();
    if (title != "") {
      MrelloApp.data.create({ title: title }, { wait: true });
    }
  },
  renderListView: function(list) {
    var listView = new MrelloApp.views.List({
                     model: list
                   });
    this.$el.append(listView.el);
  },
});