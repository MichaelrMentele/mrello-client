var MrelloApp = MrelloApp || {};

MrelloApp.views.Cards = Backbone.View.extend({
  initialize: function() {
    this.$el = $(this.el);
    this.render();
  },
  render: function() {
    this.$el.empty();
    this.collection.each(this.renderCardView, this);
  },
  renderCardView: function(card, index) {
    var cardView = new MrelloApp.views.Card({
                     model: card,
                   });

    this.$el.append(cardView.el);
  },
});
