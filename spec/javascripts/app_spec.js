describe('The MrelloApp object', function() {
  it("is defined", function() {
    expect(MrelloApp).toBeDefined();
  });

  describe('and namespaces constructors', function() {
    it("the views", function() {
      expect(MrelloApp.views).toBeDefined();
    });
    it("the models", function() {
      expect(MrelloApp.models).toBeDefined();
    });
    it("the collections", function() {
      expect(MrelloApp.collections).toBeDefined();
    });
    it("the routers", function() {
      expect(MrelloApp.routers).toBeDefined();
    });
  });

  describe('and namespaces runtime attributes', function() {
    it('the data', function() {
      expect(MrelloApp.data).toBeDefined();
    });
    it('the app view', function() {
      expect(MrelloApp.appView).toBeDefined();
    });
    it('the app router', function() {
      expect(MrelloApp.routes).toBeDefined();
    });
    it('the event aggregator', function() {
      expect(MrelloApp.eventAggregator).toBeDefined();
    });
  });

  describe('#init', function() {
    it('sets the app data to a Lists collection', function() {
      expect(MrelloApp.data).toEqual(new MrelloApp.collections.Lists());
    });
  });
});