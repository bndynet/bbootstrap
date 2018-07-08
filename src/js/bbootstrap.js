//=require jquery/dist/jquery.js
//=require popper.js/dist/umd/popper.js
//=require bootstrap/dist/js/bootstrap.js
//=require @bndynet/jslib/dist/jslib.min.js
//=require _alertify.js

$.extend({
    boverlay: function(destory) {
        if (destory === false) {
            $('body').removeClass('has-overlay').find('> .overlay').remove();
            return;
        }
        var eleOverlay = '<div class="overlay"></div>';
        $('body').addClass('has-overlay').append(eleOverlay);
    },
    bloading: function(destory) {
        if (destory === false) {
            $('body').removeClass('has-overlay').find('> .overlay').remove();
            return;
        }
        $('body').addClass('has-overlay').bloading();
    },
});

$.fn.extend({
    bloading: function(destoryOrloadingStyle, theme) {
        if (destoryOrloadingStyle === false) {
            $(this).cover(false);
            return;
        }

        loadingStyle = destoryOrloadingStyle || 'bounce';
        theme = theme ? 'loading-' + theme : '';
        var htmlLoading = '';
        switch((loadingStyle||'').toLowerCase()) {
            case 'bounce':
                htmlLoading = '<div class="loading ' + theme + ' loading-bounce"><div class="child1"></div><div class="child2"></div><div class="child3"></div></div>';
                break;

            case 'bounce-rectangle':
                htmlLoading = '<div class="loading ' + theme + ' loading-bounce-rectangle">' +
                    '<div class="child1"></div>' +
                    '<div class="child2"></div>' +
                    '<div class="child3"></div>' +
                    '<div class="child4"></div>' +
                    '<div class="child5"></div>' +
                    '</div>';
                break;

            case 'circle':
                htmlLoading = '<div class="loading ' + theme + ' loading-circle">' + 
                    '<div class="child1 loading-circle-child"></div>' + 
                    '<div class="child2 loading-circle-child"></div>' + 
                    '<div class="child3 loading-circle-child"></div>' + 
                    '<div class="child4 loading-circle-child"></div>' + 
                    '<div class="child5 loading-circle-child"></div>' + 
                    '<div class="child6 loading-circle-child"></div>' + 
                    '<div class="child7 loading-circle-child"></div>' + 
                    '<div class="child8 loading-circle-child"></div>' + 
                    '<div class="child9 loading-circle-child"></div>' + 
                    '<div class="child10 loading-circle-child"></div>' + 
                    '<div class="child11 loading-circle-child"></div>' + 
                    '<div class="child12 loading-circle-child"></div>' + 
                    '</div>';
                break;
        }
        htmlLoading = htmlLoading || 'No `' + loadingStyle + '` style defined.';
        $(this).cover(htmlLoading);
    },

    btooltip: function(destoryOrTitle, position) {
        if (destoryOrTitle == false) {
            $(this).tooltip('dispose');
            return;
        }
        $(this).tooltip({
            placement: position || 'top',
            title: destoryOrTitle,
            trigger: 'manual',
        });
        $(this).tooltip('show');
    },

});


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