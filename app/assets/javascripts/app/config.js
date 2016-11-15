

// overwrite backbone sync to use a root url -> Modify this for production
(function () {
    // Store the original version of Backbone.sync
    var backboneSync = Backbone.sync;
    

    Backbone.sync = function (method, model, options) {
        /*
         * Change the `url` property of options to begin
         * with the URL from settings
         * This works because the options object gets sent as
         * the jQuery ajax options, which includes the `url` property
         */
         
         var HOST_URL = 'http://921f3209.ngrok.io'
        options = _.extend(options, {
            url: HOST_URL + (_.isFunction(model.url) ? model.url() : model.url)
        });

        // Serialize data, optionally using paramRoot
        if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
          options.contentType = 'application/json';
          data = JSON.stringify(options.attrs || model.toJSON(options));
          if (model.paramRoot) {
            data = {};
            data[model.paramRoot] = model.toJSON(options);
          } else {
            data = model.toJSON();
          }
          options.data = JSON.stringify(data);
        }

        /*
         *  Call the stored original Backbone.sync
         * method with the new url property
         */
        backboneSync(method, model, options);
    };
})();