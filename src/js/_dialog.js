(function ($) {
    $.fn.dialog = function (event) {
        if (event === 'open') {
            event = 'show';
        }
        if (event === 'close') {
            event = 'dispose';
        }
        return $(this).modal(event);
    };

    function Dialog(options) {
        var elDialog = null;
        var btnEvents = {};

        function build() {
            options.size = options.size || 'lg';
            elDialog = $('<div class="modal fade b-dialog" tabindex="-1" role="dialog"><div class="modal-dialog" role="document"><div class="modal-content"></div></div></div>');
            elDialog.find('.modal-dialog').addClass('modal-' + options.size);

            var elContent = elDialog.find('.modal-content');
            if (options.title) {
                var elTitle = ' <div class="modal-header">' +
                    '    <h5 class="modal-title">' + options.title + '</h5>' +
                    '    <button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                    '    <span aria-hidden="true">&times;</span>' +
                    '    </button>' +
                    '</div>';
                elContent.append(elTitle);
            }

            var elBody = $('<div class="modal-body"></div>');
            if (options.content) {
                if (options.content instanceof jQuery) {
                    elBody.append(options.content);
                } else {
                    elBody.html(options.content);
                }
            }
            elContent.append(elBody);

            if (options.buttons || options.statusBar) {
                var elFooter = $('<div class="modal-footer"></div>');

                if (options.statusBar) {
                    var statusBarContainer = $('<div class="status-bar"></div>');
                    statusBarContainer.append($(options.statusBar));
                    elFooter.append(statusBarContainer);
                }

                if (options.buttons) {
                    var buttonContainer = $('<div class="action-bar"></div>')
                    for (var i = 0; i < options.buttons.length; i++) {
                        var button = options.buttons[i];
                        var btnId = 'dialog__btn' + i;
                        var btn = $('<button type="button"></button>')
                            .attr('id', btnId)
                            .html(button.text)
                            .addClass(button.cls);

                        if (typeof button.onClick === 'function') {
                            btnEvents[btnId] = button.onClick;
                        }
                        buttonContainer.append(btn);
                    }
                    elFooter.append(buttonContainer);
                }
                elContent.append(elFooter);
            }

            return elDialog;
        }

        return {
            show: function () {
                var $this = this;
                build();
                elDialog.modal({
                    backdrop: 'static',
                    show: true,
                });
                elDialog.on('hidden.bs.modal', function (e) {
                    elDialog.remove();
                });
                for (var id in btnEvents) {
                    if (btnEvents.hasOwnProperty(id)) {
                        elDialog.on('click', '#' + id, function(event) {
                            var btnId = $(this).attr('id');
                            btnEvents[btnId].call($this, event);
                        })
                    }
                }
            },
            hide: function () {
                elDialog.modal('hide');
            },
            open: function () {
                this.show();
            },
            close: function () {
                this.hide();
                setTimeout(function() {
                    elDialog.modal('dispose');
                    elDialog.remove();
                }, 1000);
            },
        };
    }

    function DialogFactory() {
        return {
            __dialog: null,
            open: function (options) {
                if (!options || !options.content) {
                    throw Error('No `content` defined. Consider using `open({content: ""|jQuery})`.');
                }

                if (typeof options.content === 'string' && options.content.indexOf('#') === 0) {
                    var elConent = $(options.content).clone()
                        .removeClass('d-none')
                        .removeClass('invisible')
                        .css('display', 'inherit');
                    options.content = elConent;
                }

                this.__dialog = new Dialog(options);
                this.__dialog.show();

                return this;
            },
            small: function (options) {
                options = $.extend({}, options, {
                    size: 'sm'
                });
                this.open(options);
                return this;
            },
            close: function () {
                this.__dialog.close();
                return this;
            }
        }
    }

    // AMD, window, and NPM support
    if ("undefined" !== typeof module && !!module && !!module.exports) {
        module.exports = function () {
            return new DialogFactory();
        };
        var obj = new DialogFactory();
        for (var key in obj) {
            module.exports[key] = obj[key];
        }
    } else if (typeof define === "function" && define.amd) {
        define(function () {
            return new DialogFactory();
        });
    } else {
        window.dialog = new DialogFactory();
    }

})(jQuery);