
describe('Sessions Controller', function() {
  describe('new', function() {
    beforeEach(function() {
      loadFixtures('appContainer.html')
      this.events = MrelloApp.initializeEventBus()
    })

    it("renders a page", function() {
      var controller = new MrelloApp.Controllers.Sessions()
      this.events.trigger("sessions:new")

      expect($("#logo")[0]).toBeInDOM()
      expect($("#submit-login")[0]).toBeInDOM()
    })

    it("fires new callback on event", function() {
      sinon.stub(MrelloApp.Controllers.Sessions.prototype, 'new')

      var controller = new MrelloApp.Controllers.Sessions()
      this.events.trigger("sessions:new")
      
      expect(controller.new.called).toEqual(true)
      
      MrelloApp.Controllers.Sessions.prototype.new.restore()
    })   
  });

  describe("create", function() {
    beforeEach(function() {
      this.events = MrelloApp.initializeEventBus()

      this.server = sinon.fakeServer.create();
      this.responseBody = JSON.stringify({
        "message" : "Session created!",
        "session_token":"somestring",
        "user": {
          "fullname": "name"
        }
      })

      this.server.respondWith("POST", "/api/v1/sessions", [200, {"Content-Type": "application/json"}, this.responseBody]
      );
      this.eventSpy = sinon.spy();
    });

    afterEach(function() {
      this.server.restore();
    });

    it("fires create callback on event", function() {
      sinon.stub(MrelloApp.Controllers.Sessions.prototype, 'create')

      var controller = new MrelloApp.Controllers.Sessions()
      this.events.trigger("sessions:create")
      
      expect(controller.create.called).toEqual(true)
      
      MrelloApp.Controllers.Sessions.prototype.create.restore()
    }) 

    describe('valid user inputs', function() {
      beforeEach(function() {
        var controller = new MrelloApp.Controllers.Sessions()

        this.events.trigger("sessions:create", {
          email: "john@ex.com", 
          password: "pass"
        })
      })

      it("calls the server", function() {
        expect(this.server.requests[0].method).toEqual("POST")
        expect(this.server.requests[0].url).toEqual(MrelloApp.HOST_URL + "/api/v1/sessions")
      })

      it("creates a session", function() {
        expect(MrelloApp.session.isAuthorized()).toEqual(true)
      })

      it("caches current user information", function() {
        expect(MrelloApp.currentUser.isCached()).toEqual(true)
      })

      it("clears sensitive user login information from session object", function() {
        expect(MrelloApp.session.isSafe()).toEqual(true)
      })

      it("sets a flash message", function() {
        
      })

      it("redirects to the home page", function() {

      })
    });

    describe('invalid user inputs', function() {
      it("gets an error message from the server")
      it("does NOT create a session")
      it("does NOT get user information")
      it("sets a flash message")
    });
  })

  describe('destroy', function() {
    it('clears the session data')
    it('redirects to the login page')
    it("renders a flash message")
  });
});