//=require jquery/dist/jquery.js
//=require popper.js/dist/umd/popper.min.js
//=require bootstrap/dist/js/bootstrap.js

$(function() {
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