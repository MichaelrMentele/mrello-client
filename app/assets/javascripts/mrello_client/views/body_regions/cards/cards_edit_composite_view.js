// CardEditView -> A modal view that displays card info. A subview of the board view

// Subviews
// CardEditView -> Labels
//              -> Checklist
//              -> Move
//              -> Copy
//              -> AddComment
//              -> AddChecklist
//              -> Comments
//              -> Checklists
//              -> DescriptionEdit

var MrelloApp = MrelloApp || {};

MrelloApp.Views.Composites.CardEdit = Backbone.View.extend({
  template: MrelloApp.templates["body_regions/cards/card-editor/card-edit"],

  id: "card-editor",
  class: "window",

  events: {
    "click .cancel" : "clearModal",
    "click .submit-checklist-item" : "addChecklistItem",
    "click .submit-comment" : "addComment",
  },

  initialize: function() {
    this.render();
  },

  render: function() {
    // Build card view and then append it
    this.$el.html(this.template(this.model.toJSON()));
    var container = $("#modal-container").append(this.el);

    // this.renderComments();
    // this.renderChecklists(); // Stretch: Not yet implemented
    container.removeClass("off"); // Unhide modal
    return this;
  },

  renderComments: function() {
    var commentsContainer = this.$(".comments")
  
    new MrelloApp.Views.Composites.Comments({
      el: commentsContainer,
      comments: this.model.get("comments")
    });
  },

  clearModal: function() {
    $("#modal-container").addClass("off").empty();
  },

  addChecklistItem: function(e) {
    console.log("Adding checklist item");
    alert("Oops! Sorry, this feature is not implemented just yet!")
  },

  addComment: function(e) {
    console.log("Adding comment")
    var $comment = this.$(".comment-input-box")
    // Convert to trigger create action on controller
    this.model.get("comments").add({payload: $comment.val()})
    $comment.val("");
  }
});
