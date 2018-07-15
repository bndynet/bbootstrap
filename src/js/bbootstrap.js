//=require jquery/dist/jquery.js
//=require popper.js/dist/umd/popper.js
//=require bootstrap/dist/js/bootstrap.js
//=require moment/min/moment-with-locales.js
//=require jquery-datetimepicker/build/jquery.datetimepicker.full.min.js
//=require @bndynet/jslib/dist/jslib.min.js
//=require _alertify.js
//=require _jQuery.js
//=require _pace.js

// setup
bbootstrap = {
    version: '{{bbootstrap-version}}',
    options: {
        locale: 'en-US',
        datetimeFormat: 'YYYY-MM-DD H:mm',
        timeFormat: 'H:mm',
        dateFormat: 'YYYY-MM-DD'
    },
    setup: function (options) {
        var $this = this;
        $this.options = $.extend({}, $this.options, options);

        // locale
        if ($this.options.locale) {
            moment.locale($this.options.locale);
            if ($this.options.locale.indexOf('-') > 0) {
                var l = $this.options.locale.substring(0, $this.options.locale.indexOf('-'));
                jQuery.datetimepicker.setLocale(l);
            } else {
                jQuery.datetimepicker.setLocale($this.options.locale);
            }
        }

        // alertify
        if ($this.options.alertify) {
            alertify.set($this.options.alertify);
        }

        // pace.js
        if ($this.options.pace) {
            $(function () {
                if ($this.options.pace.color) {
                    $('.pace-progress').css('background-color', $this.options.pace.color);
                    $('.pace-activity').css({
                        'border-top-color': $this.options.pace.color,
                        'border-left-color': $this.options.pace.color,
                    });
                }
                if ($this.options.pace.theme) {
                    $('.pace').addClass('pace-' + $this.options.pace.theme);
                }
            });
        }

        // document ready
        jQuery.datetimepicker.setDateFormatter('moment');
        $(function () {
            // init components
            $('[data-toggle="datetimepicker"]').each(function () {
                var format = $(this).data('format') || $this.options.datetimeFormat;
                $(this).datetimepicker(
                    $.extend({
                        format: format,
                    }, $this._getElementDataOptions($(this)))
                );
            });
            $('[data-toggle="datepicker"').each(function () {
                var format = $(this).data('format') || $this.options.dateFormat;
                $(this).datetimepicker(
                    $.extend({
                        timepicker: false,
                        format: format,
                    }, $this._getElementDataOptions($(this)))
                );
            });
            $('[data-toggle="timepicker"').each(function () {
                var format = $(this).data('format') || $this.options.timeFormat;
                $(this).datetimepicker(
                    $.extend({
                        datepicker: false,
                        format: format,
                    }, $this._getElementDataOptions($(this)))
                );
            });

            // file input
            $('body').on('change', '.custom-file-input', function () {
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
    },
    _getElementDataOptions: function(jqEl) {
        var dataOptions = $(jqEl).data('options');
        if (dataOptions) {
            return eval('(' + dataOptions + ')');
        }
        return null;
    },
};