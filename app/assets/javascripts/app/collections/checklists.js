var MrelloApp = MrelloApp || {};

MrelloApp.collections.Checklists = Backbone.Collection.extend({
  model: MrelloApp.models.Checklist,
});