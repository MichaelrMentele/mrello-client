describe('The MrelloApp object', function() {
  xit("is defined", function() {
    expect(MrelloApp).toBeDefined();
  });

  describe('and namespaces constructors', function() {
    xit("the views", function() {
      expect(MrelloApp.views).toBeDefined();
    });
    xit("the models", function() {
      expect(MrelloApp.models).toBeDefined();
    });
    xit("the collections", function() {x
      expect(MrelloApp.collections).toBeDefined();
    });
    xit("the routers", function() {
      expect(MrelloApp.routers).toBeDefined();
    });
  });

  describe('and namespaces runtime attributes', function() {
    xit('the data', function() {
      expect(MrelloApp.data).toBeDefined();
    });
    xit('the app view', function() {
      expect(MrelloApp.appView).toBeDefined();
    });
    xit('the app router', function() {
      expect(MrelloApp.routes).toBeDefined();
    });
    xit('the event aggregator', function() {
      expect(MrelloApp.eventAggregator).toBeDefined();
    });
  });

  describe('#init', function() {
    xit('sets the app data to a Lists collection', function() {
      expect(MrelloApp.data).toEqual(new MrelloApp.collections.Lists());
    });
  });
});