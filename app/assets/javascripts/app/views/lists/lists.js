var MrelloApp = MrelloApp || {};

MrelloApp.views.Lists = Backbone.View.extend({
  addListContainer: "#new-list-creator",
  addListMenu: MrelloApp.templates["board/lists/add-list-menu"],
  addListButton: MrelloApp.templates["board/lists/add-list-button"],
  tagName: "div",
  className: "lists-wrapper",
  events: {
    "click #new-list-creator .add-list" : "renderAddListMenu",
    "click #new-list-creator .button" : "addList",
    "click #new-list-creator .cancel" : "renderAddListButton",
  },
  initialize: function() {
    this.$el = $(this.el)
    this.lists = MrelloApp.data;
    this.render();
    this.bindEvents();
  },
  render: function() {
    this.$el.empty();
    this.renderLists();
    this.renderAddListButton();
  },
  bindEvents: function() {
    this.listenTo(this.lists, 'add remove change', this.render);
  },
  renderLists: function() {
    this.lists.each(this.renderListView, this);
  },
  renderListView: function(list) {
    var listView = new MrelloApp.views.List({
                     model: list
                   });
    this.$el.append(listView.el);
  },
  renderAddListButton: function(e) {
    if (e) { e.preventDefault(); }
    this.$el.append(this.addListButton());
  },
  renderAddListMenu: function(e) {
    e.preventDefault();
    this.$el.append(this.addListMenu());
    this.$el.find("input").focus();
  },
  addList: function(e) {
    e.preventDefault();
    var title = $(this.addListContainer + " .title-input").val();
    if (title != "") {
      MrelloApp.data.create({ title: title }, { wait: true });
    }
  },
  
});