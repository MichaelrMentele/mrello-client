describe('Header composite view', function() {
  beforeEach(function() {
    this.headerView = new MrelloApp.Views.HeaderRegions.Page()
  })

  xdescribe("attributes", function() {
    it("has a form template", function() {
      expect(this.headerView.template).toBeDefined()
    })

    it("has an appropriate class", function() {
      expect(this.headerView.className).toEqual("page-head")
    })
  })
  
  xdescribe('#render action', function() {
    it("returns this", function() {
      expect(this.headerView.render().el).toBeDefined()
    })

    it("renders its template", function() {
      expect(this.headerView.$el.find('#logo')).toBeDefined()
    })
  });

  xdescribe("events", function() {
    beforeEach(function() {
      MrelloApp.initializeEventBus()
      this.eventSpy = sinon.spy()
    })

    it("on clicking submit button it fires a callback", function() {
      MrelloApp.eventBus.on('headers:create', this.eventSpy )

      this.headerView.$el.find("#submit-login").click()

      expect(this.eventSpy).toHaveBeenCalled()
    })

    it("on clicking registration link it fires a callback", function() {
      MrelloApp.eventBus.on('routes:go', this.eventSpy )

      this.headerView.$el.find("#navigate-to-registration").click()

      expect(this.eventSpy).toHaveBeenCalled()
    })
  })
});