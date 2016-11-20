// ListView: A subview of a board view containing x-number of card views.

// View Relationships
// List      -> Card
//           -> OverflowMenu
//           -> TitleEdit
//           -> DroppableCards

// Events
// Click on OverflowMenu -> Popup Options
// DblClick on Title -> Edit Title (replace title view with title edit view)
// Enter on EditTitle -> Title (replace title edit view with title view)
// Click on AddCard -> Swap for CardTitleEdit
// Click add on CardTitleEdit -> Create new Card and Swap for AddCardView
// Click cancel on CardTitleEdit -> Swap for AddCardView

var MrelloApp = MrelloApp || {};

MrelloApp.views.List = Backbone.View.extend({
  template: MrelloApp.templates["board/lists/list/list"],
  titleTemplate: MrelloApp.templates["board/lists/list/list-title"],
  titleEditorTemplate: MrelloApp.templates["board/lists/list/title-editor"],
  tagName: "div",
  className: "list-wrapper",
  events: {
    "click .list-title-heading" : "renderTitleEditor",
    "focusout .list-title .title-input" : "updateTitle",
    "click .list-overflow-menu" : "toggleOptions",
    "click .delete" : "delete",
  },
  initialize: function() {
    console.log("Rendering new list view")
    this.render();
  },
  getCardsContainer: function() {
    return $(this.el).find(".cards-wrapper")
  },
  render: function() {
    console.log("Rendering " + this.model.get("title") + " list");
    this.$el.html(this.template()); // Generate list view
    this.renderTitle();
    this.renderCards(); // Populate subviews
    return this;
  },
  renderTitle: function() {
    this.$el.find(".list-title").html(
      this.titleTemplate(this.model.toJSON())
    );
  },
  renderCards: function() {
    var cardsContainer = this.getCardsContainer();
    var cardsView = new MrelloApp.views.Cards({
      cards: this.model.get("cards"),
    });

    cardsContainer.append(cardsView.el)
    
    MrelloApp.boardsController.trigger("refreshSearch");
  },
  renderTitleEditor: function(e) {
    e.preventDefault();
    console.log("render title editor");
    var $container = this.$el.find(".list-title");
    $container.html(this.titleEditorTemplate(this.model.toJSON()));
    $container.find("input").focus();
  },
  updateTitle: function(e) {
    e.preventDefault();
    console.log("updating title info on list");
    var $input = this.$el.find(".title-input");
    var title = $input.val();
    this.model.set("title", title);
    this.model.save();
    this.render();
  },
  toggleOptions: function(e) {
    e.preventDefault();
    console.log("Rendering options");
    
    this.$(".overflow-menu-container").toggle()
  },
  hideOverflow: function(e) {
    e.preventDefault();
    this.$(".overflow-menu-container").css({
      "display" : "none",
    });
  },
  delete: function(e) {
    console.log("list destroyed");
    this.model.destroy();
  }
});

