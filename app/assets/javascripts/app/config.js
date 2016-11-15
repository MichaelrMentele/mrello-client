

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

        /*
         *  Call the stored original Backbone.sync
         * method with the new url property
         */
        backboneSync(method, model, options);
    };
})();