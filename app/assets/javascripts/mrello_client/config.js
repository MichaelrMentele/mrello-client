// overwrite backbone sync to use a root url -> Modify this for production
(function () {
  // Store the original version of Backbone.sync
  var backboneSync = Backbone.sync;

  Backbone.sync = function (method, model, options) {
    // Every sync call is sent to this root
    var HOST_URL = MrelloApp.HOST_URL

    // Prepend root url for every sync call
    if (options.url) {
      options.url = HOST_URL + options.url
    } else {
      options = _.extend(options, {
        url: HOST_URL + (_.isFunction(model.url) ? model.url() : model.url)
      });
    }

    // Attach session token to all calls
    options.beforeSend = function(xhr) {
      var token = ""; // no session token by default
      if (MrelloApp.session.hasToken()) {
        token = MrelloApp.session.get("token")
      }
      xhr.setRequestHeader('Authorization', token)
    } 

    // Call sync with root path
    backboneSync(method, model, options);
  };
})();