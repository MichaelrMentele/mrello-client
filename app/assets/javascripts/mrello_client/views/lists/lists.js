// ListsView -> Manages list views

// Subviews
// ListsView -> ListView

// Views Directly Managed by ListsView
// None

// Events:
// Click on Add List -> Swap for ListTitleEntryView
// Click add on ListTitleEntryView -> Create new list view and Swap for AddList view
// Click cancel on ListTitleEntryView -> Swap for Addlist view

var MrelloApp = MrelloApp || {}

MrelloApp.Views.Lists = Backbone.View.extend({
  addListContainer: MrelloApp.templates["board/lists/add-list-container"],
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

    this.addListContainerID = "#new-list-creator" // move this to separate view
    this.lists = MrelloApp.data

    this.render()
    this.bindEvents()
  },

  render: function() {
    this.$el.empty()
    this.renderLists()
    this.renderAddListContainer()
    this.renderAddListButton()
    return this
  },

  bindEvents: function() {
    this.listenTo(this.lists, 'add remove change', this.render)
  },

  renderLists: function() {
    this.lists.each(this.renderListView, this)
  },

  renderListView: function(list) {
    var listView = new MrelloApp.views.List({
                     model: list
                   })
    this.$el.append(listView.el)
  },

  renderAddListContainer: function() {
    this.$el.append(this.addListContainer())
  },

  renderAddListButton: function(e) {
    if (e) { e.preventDefault() }
    this.$el.find(this.addListContainerID).html(this.addListButton())
  },

  renderAddListMenu: function(e) {
    e.preventDefault()
    this.$el.find(this.addListContainerID).html(this.addListMenu())
    this.$el.find("input").focus()
  },

  addList: function(e) {
    e.preventDefault()

    var title = $(this.addListContainerID + " .title-input").val()
    if (title != "") {
      MrelloApp.listsController.trigger("create", { title: title })
    }
  },
  
})