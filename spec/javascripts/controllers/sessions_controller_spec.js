describe('Sessions Controller', function() {
  describe('new', function() {
    beforeEach(function() {
      loadFixtures('appContainer.html')
      createEventBus.apply(this)
    })

    it("renders a page", function() {
      var controller = createSessionsController()
      this.events.trigger("sessions:new")

      expect($("#logo")[0]).toBeInDOM()
      expect($("#submit-login")[0]).toBeInDOM()
    })

    it("fires new callback on event", function() {
      sinon.stub(MrelloApp.Controllers.Sessions.prototype, 'new')

      var controller = createSessionsController()
      this.events.trigger("sessions:new")
      
      expect(controller.new.called).toEqual(true)
      
      MrelloApp.Controllers.Sessions.prototype.new.restore()
    })   
  });

  describe("create", function() {
    describe('success callback', function() {
      beforeEach(function() {
        createFakeSessionsServer.apply(this)

        prepareSession()
        createEventBus.apply(this)
        createSessionsController.apply(this)
        
        this.userCacheSpy = listenerSpy(this.events, "users:cache")
        this.redirectSpy = listenerSpy(this.events, "routes:go")

        // trigger create event on controller
        this.events.trigger("sessions:create", {
          email: "john@ex.com", 
          password: "pass"
        })

        this.server.respond()
      })

      afterEach(function() {
        cleanupFakeServer.apply(this)
      });

      it("calls the server", function() {
        expect(this.server.requests[0].method).toEqual("POST")
        expect(this.server.requests[0].url).toEqual(MrelloApp.HOST_URL + "/api/v1/sessions")
      })

      it("creates a session", function() {
        expect(MrelloApp.session.isAuthorized()).toEqual(true)
      })

      it("emits users cache event", function() {
        expect(this.userCacheSpy.called).toEqual(true)
      })

      it("clears sensitive user login information from session object", function() {
        expect(MrelloApp.session.isSafe()).toEqual(true)
      })

      it("sets a flash message", function() {
        expect(MrelloApp.hasFlash()).toEqual(true)
      })

      it("redirects to the home page", function() {
        expect(this.redirectSpy.called).toEqual(true)
      })
    });

    describe('error callback', function() {
      beforeEach(function() {
        loadFixtures('appContainer.html')
        createFakeSessionsServer.apply(this, [false])

        prepareSession()
        createEventBus.apply(this)
        createSessionsController.apply(this)
        this.controller.new()

        this.spy = listenerSpy(this.events, "users:cache")

        this.events.trigger("sessions:create", {
          email: "john@ex.com", 
          password: "pass"
        })

        this.server.respond()
      })

      afterEach(function() {
        cleanupFakeServer.apply(this)
      });

      it("calls the server", function() {
        expect(this.server.requests[0].method).toEqual("POST")
        expect(this.server.requests[0].url).toEqual(MrelloApp.HOST_URL + "/api/v1/sessions")
      })
      
      it("does NOT create a session", function() {
        expect(MrelloApp.session.isAuthorized()).toEqual(false)
      })

      it("does NOT emit cache event", function() {
        expect(this.spy.called).toEqual(false)
      })

      it("renders a flash message", function() {
        expect($(".alert-danger")).toBeInDOM()
      })
    });
  })

  describe('destroy ends the sessions', function() {
    beforeEach(function() {
      prepareSession()
      createEventBus.apply(this)
      createSessionsController.apply(this)

      this.spy = listenerSpy(this.events, "routes:go")
      sinon.spy(MrelloApp.session, "clear")

      this.events.trigger("sessions:destroy")
    })

    afterEach(function() {
      MrelloApp.session.clear.restore()
    })

    it('clears the session data', function() {
      expect(MrelloApp.session.clear.called).toEqual(true)
    })

    it('redirects to the login page', function() {
      expect(this.spy.called).toEqual(true)
    })

    it("sets a flash message", function() {
      expect(MrelloApp.hasFlash()).toEqual(true)
    })
  });
});

function prepareSession() {
  MrelloApp.initializeSession()
  MrelloApp.session.clear()
}

function createSessionsController() {
  this.controller = new MrelloApp.Controllers.Sessions()
  return this.controller
}

function createFakeSessionsServer(valid=true) {
  this.server = sinon.fakeServer.create();

  var createUrl = MrelloApp.HOST_URL + "/api/v1/sessions"
  var JSONheader = {"Content-Type": "application/json"}

  var successResponseBody = JSON.stringify({
    "message" : "Session created!",
    "session_token":"somestring",
    "user": {
      "fullname": "name"
    }
  })

  var errorResponseBody = JSON.stringify({
    "message" : "There was a problem with your credentials."
  })

  if(valid) {
    this.server.respondWith("POST", createUrl, [200, JSONheader, successResponseBody]);
  } else {
    this.server.respondWith("POST", createUrl, [406, JSONheader, errorResponseBody])
  }
}