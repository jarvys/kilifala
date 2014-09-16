var $ = require('jquery');
var Backbone = require('backbone');

Backbone.$ = $;
var $preview, $file;
var $md, $link, $form;

var UploadRouter = Backbone.Router.extend({
    routes: {
        '': 'index',
        ':filename': 'file'
    },

    index: function() {},

    file: function(filename) {
        $file.removeClass('hide');
        var link = 'http://bcs.duapp.com/kilifala/' + filename
        $preview.attr('src', link);
        $link.html(link);
        $md.html('![' + filename + '](' + link + ')');
        $preview.show();
    }
});


$(function() {
    $file = $('.file');
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
