describe("Nav user organizations atomic view", function() {
  beforeEach(function() {
    this.view = new MrelloApp.Views.Atomics.NavUserOrganizations()
  })

  describe("attributes", function() {
    it("has a form template", function() {
      expect(this.view.template).toBeDefined()
    })

    it("has an appropriate id", function() {
      expect(this.view.id).toEqual('user-orgs')
    })

    it("has an appropriate class", function() {
      expect(this.view.className).toEqual("btn")
    })
  })

  describe('#render action', function() {
    it("returns this", function() {
      expect(this.view.render().el).toBeDefined()
    })

    it("renders its template", function() {
      expect(this.view.render().$el.find('a').length).toEqual(1)
    })
  });

  describe("events", function() {
    beforeEach(function() {
      MrelloApp.initializeEventBus()
      this.eventSpy = sinon.spy()
    })

    it("clicking the link emits an appropriate event", function() {
      MrelloApp.eventBus.on('organizations:index', this.eventSpy)

      this.view.$el.find("a").click()

      expect(this.eventSpy).toHaveBeenCalled()
    })
  })
});

