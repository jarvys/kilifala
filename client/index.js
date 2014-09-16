var $ = require('jquery');
var Backbone = require('backbone');

Backbone.$ = $;
var $preview;
var $md, $link, $form;

var UploadRouter = Backbone.Router.extend({
    routes: {
        '': 'index',
        ':filename': 'file'
    },

    index: function() {},

    file: function(filename) {
        var link = 'http://bcs.duapp.com/kilifala/' + filename
        $preview.attr('src', link);
        $link.html(link);
        $md.html('![' + filename + '](' + link + ')');
        $preview.show();
    }
});


$(function() {
    $form = $('form')
    $form.find('[name=file]').change(function() {
        $form.submit();
    });

    $preview = $('#preview');
    $md = $('.md');
    $link = $('.link');

    new UploadRouter();
    Backbone.history.start({
        pushState: true
    });
});
