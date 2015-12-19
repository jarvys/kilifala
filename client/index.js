var $ = require('jquery');
var Backbone = require('backbone');
var shortid = require('shortid');

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
        var link = 'http://7xl8pq.com1.z0.glb.clouddn.com/' + filename
        $preview.attr('src', link);
        $link.html(link);
        $md.html('![' + filename + '](' + link + ')');
        $preview.show();
    }
});


$(function() {
    $file = $('.file');
 	$fileInput = $('[name=file]');
    $fileInput.change(function() {
        $.get('/uptoken', {}, 'json').then(function(data) {
			var files = $fileInput[0].files;
			if (files.length === 0) {
				return;
			}

            var token = data.token;
            var formData = new FormData();
            var key = shortid.generate();
            formData.append('key', key);
            formData.append('token', token);
            formData.append('file', files[0]);
            $.ajax({
                url: 'http://up.qiniu.com',
                type: 'POST',
                processData: false,
                data: formData,
                contentType: false,
                success: function() {
					app.navigate('/' + key, {trigger: true});
                },
                error: function(e) {
                    console.trace(e);
                }
            });
        });
    });

    $preview = $('#preview');
    $md = $('.md');
    $link = $('.link');

    var app = new UploadRouter();
    Backbone.history.start({
        pushState: true
    });
});

