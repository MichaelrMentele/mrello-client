describe('The MrelloApp object', function() {
  it("is defined", function() {
    expect(MrelloApp).toBeDefined();
  });

  describe('and namespaces constructors', function() {
    it("the views", function() {
      expect(MrelloApp.Views).toBeDefined();
    })

    it("the models", function() {
      expect(MrelloApp.Models).toBeDefined();
    });

    it("the collections", function() {
      expect(MrelloApp.Collections).toBeDefined();
    });

    it("the routers", function() {
      expect(MrelloApp.Routers).toBeDefined();
    });

    it('controllers', function() {
      expect(MrelloApp.Controllers).toBeDefined()
    })
  });

  describe('and namespaces runtime attributes', function() {
    it("like templates", function() {
      expect(MrelloApp.templates).toBeDefined()
    })

    it('the data', function() {
      expect(MrelloApp.data).toBeDefined()
    });

    it('the app router', function() {
      expect(MrelloApp.routes).toBeDefined()
    });

    it('the event aggregator', function() {
      expect(MrelloApp.eventBus).toBeDefined()
    });

    it("session", function () {
      expect(MrelloApp.session).toBeDefined()
    })

    it("flash", function() {
      expect(MrelloApp.flash).toBeDefined()
    })
  });

  describe('#init', function() {
    beforeEach(function() {
      Backbone.history.stop()
    })
    it('initializes the event bus', function() {
      sinon.spy(MrelloApp, "initializeEventBus")

      MrelloApp.init()

      expect(MrelloApp.initializeEventBus.called).toEqual(true)
    });

    it("initializes the controllers", function() {
      sinon.spy(MrelloApp, "initializeControllers")

      MrelloApp.init()

      expect(MrelloApp.initializeControllers.called).toEqual(true)
    })

    it("initializes routing", function() {
      sinon.spy(MrelloApp, "initializeRouting")

      MrelloApp.init()

      expect(MrelloApp.initializeControllers.called).toEqual(true)
    })

    it("initializes the session", function() {
      sinon.spy(MrelloApp, "initializeSession")

      MrelloApp.init()

      expect(MrelloApp.initializeSession.called).toEqual(true)
    })
  }); 
});