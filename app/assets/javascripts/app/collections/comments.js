var MrelloApp = MrelloApp || {};

MrelloApp.collections.Comments = Backbone.Collection.extend({
  model: MrelloApp.models.Comment,

});