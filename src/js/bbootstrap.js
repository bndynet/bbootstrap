//=require jquery/dist/jquery.js
//=require popper.js/dist/umd/popper.js
//=require bootstrap/dist/js/bootstrap.js
//=require @bndynet/jslib/dist/jslib.min.js
//=require _alertify.js
//=require _jQuery.js
//=require _pace.js

// setup
bbootstrap = {
    version: '{{bbootstrap-version}}',
    setup: function(options) {

        // alertify
        if (options.alertify) {
            alertify.set(options.alertify);
        }

        // pace.js
        if (options.pace) {
            $(function() {
                if (options.pace.color) {
                    $('.pace-progress').css('background-color', options.pace.color);
                    $('.pace-activity').css({
                        'border-top-color': options.pace.color,
                        'border-left-color': options.pace.color,
                    });
                }
                if (options.pace.theme) {
                    $('.pace').addClass('pace-' + options.pace.theme);
                }
            });
        }
    },
};

$(function() {
    // file input
    $('body').on('change', '.custom-file-input', function() {
        var eleFile = $(this)[0];
        var eleLabel = $(eleFile).next();

        var placeholder = eleLabel.html();
        if (!eleLabel.data('placeholder')) {
            eleLabel.data('placeholder', placeholder);
        } else {
            placeholder = eleLabel.data('placeholder');
        }

        var selectFile = eleFile.value;
        if (selectFile) {
            eleLabel.html(selectFile);
        } else {
            eleLabel.html(placeholder);
        }
    });

});