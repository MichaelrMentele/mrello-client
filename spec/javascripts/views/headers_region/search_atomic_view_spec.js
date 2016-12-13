describe('header atomic search view', function() {
  beforeEach(function() {
    this.view = new MrelloApp.Views.Atomics.CardSearch()
  })

  describe("attributes", function() {
    it("has a form template", function() {
      expect(this.view.template).toBeDefined()
    })

    it("has an appropriate id", function() {
      expect(this.view.id).toEqual('search-bar')
    })
  })

  describe('#render action', function() {
    it("returns this", function() {
      expect(this.view.render().el).toBeDefined()
    })

    it("renders its template", function() {
      expect(this.view.render().$el.find('input').length).toEqual(1)
    })
  });

  describe("events", function() {
    beforeEach(function() {
      MrelloApp.initializeEventBus()
      this.eventSpy = sinon.spy()
    })

    xit("typing in the search bar highlights matching cards", function() {
    
    })
  })
});
