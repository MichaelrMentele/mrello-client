describe('Mrello router', function() {
  beforeEach(function() {
    this.events = MrelloApp.initializeEventBus()
    this.router = new MrelloApp.Routers.Router()
    this.routerSpy = sinon.spy();
  });

  afterEach(function() {
    this.router.navigate('/specs');
  });

  describe('on routes:go to route event', function() {
    it("navigates to the route passed in", function() {
      this.events.trigger("routes:go", '/login')

      expect(window.location.pathname).toEqual("/login")
    })
  });

  describe('/home', function() {
    it("emits an appropriate event", function() {
      this.events.listenTo(this.events, "boards:show", this.routerSpy)
      
      this.events.trigger("routes:go", '/home')
      expect(this.routerSpy.called).toEqual(true)
    })
  });

  describe('/register', function() {
    it("emits an appropriate event", function() {
      this.events.listenTo(this.events, "users:new", this.routerSpy)
      
      this.events.trigger("routes:go", '/register')
      expect(this.routerSpy.called).toEqual(true)
    })
  });

  describe('/login', function() {
    it("emits an appropriate event", function() {
      this.events.listenTo(this.events, "sessions:new", this.routerSpy)
      
      this.events.trigger("routes:go", '/login')
      expect(this.routerSpy.called).toEqual(true)
    })
  });

  describe('/user/organizations', function() {
    it("emits an appropriate event", function() {
      this.events.listenTo(this.events, "organizations:index", this.routerSpy)
      
      this.events.trigger("routes:go", 'user/organizations', { scoped: "User" })
      expect(this.routerSpy.called).toEqual(true)
    })
  });

  describe('/organizations', function() {
    it("emits an appropriate event", function() {
      this.events.listenTo(this.events, "organizations:index", this.routerSpy)
      
      this.events.trigger("routes:go", 'organizations')
      expect(this.routerSpy.called).toEqual(true)
    })
  });

  describe('/organizations/show', function() {
    it("emits an appropriate event", function() {
      this.events.listenTo(this.events, "organizations:show", this.routerSpy)
      
      this.events.trigger("routes:go", 'organizations/1')
      expect(this.routerSpy.called).toEqual(true)
    })
  });

  describe('other routes', function() {
    it("emits an appropriate event", function() {
      this.events.listenTo(this.events, "application:error", this.routerSpy)
      
      this.events.trigger("routes:go", 'blaalsdjf')
      expect(this.routerSpy.called).toEqual(true)
    })
  });
});