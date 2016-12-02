var MrelloApp = MrelloApp || {};

MrelloApp.Collections.Checklists = Backbone.Collection.extend({
  model: MrelloApp.Models.Checklist,
});