describe("Nav logout atomic view", function() {
  beforeEach(function() {
    this.logoutView = new MrelloApp.Views.Atomics.NavLogout()
  })

  describe("attributes", function() {
    it("has a form template", function() {
      expect(this.logoutView.template).toBeDefined()
    })

    it("has an appropriate id", function() {
      expect(this.logoutView.id).toEqual('logout')
    })

    it("has an appropriate class", function() {
      expect(this.logoutView.className).toEqual("btn")
    })
  })

  describe('#render action', function() {
    it("returns this", function() {
      expect(this.logoutView.render().el).toBeDefined()
    })

    it("renders its template", function() {
      expect(this.logoutView.render().$el.find('a').length).toEqual(1)
    })
  });

  describe("events", function() {
    beforeEach(function() {
      MrelloApp.initializeEventBus()
      this.eventSpy = sinon.spy()
    })

    it("clicking the logout link emits sessions:destroy", function() {
      MrelloApp.eventBus.on('sessions:destroy', this.eventSpy)

      this.logoutView.$el.find("a").click()

      expect(this.eventSpy).toHaveBeenCalled()
    })
  })
});

