(function () {

    'use strict';

    function Alertify() {

        var NOTIFICATIONS_CONTAINER_CLASS = 'alertify-notifications';
        var DIALOG_CONTAINER_CLASS = 'alertify-dialog';

        var _alertify = {

            // =========== Common ===========

            defaultOptions: {
                okLabel: 'Ok',
                cancelLabel: 'Cancel',
                maxNotifications: 2,
                promptValue: '',
                promptPlaceholder: '',
                promptLabel: '',
                closeNotificationOnClick: false,
                delay: 5000,
                customeClass: '',
                notificationPosition: "bottom right",
                onOkay: $.noop,
                onCancel: $.noop,
            },

            globalOptions: {},

            setup: function(options) {
                this.globalOptions = $.extend({}, this.globalOptions, options);
            },

            getOptions: function(options) {
                return $.extend({}, this.defaultOptions, this.globalOptions, options);
            },

            close: function (el) {
                el = $(el);
                el.removeClass('show').addClass('hide');
                el.on('transitionend webkitTransitionEnd oTransitionEnd', function () {
                    el.remove();
                });
                setTimeout(function () {
                    el.remove();
                }, 500);
            },


            // =========== Dialog ===========

            closeDialog: function (el) {
                this.close($(el).parent());
            },

            buildDialog: function (options) {
                var self = this;
                var elContainer = $('<div class="dialog"><div class="dialog-text"></div><nav></nav></div>');
                var elMessageContainer = elContainer.find('.dialog-text');
                var elButtonsContainer = elContainer.find('nav');

                elMessageContainer.html(options.message);

                var elOkBtn = $('<button class="ok btn btn-primary" tabindex="1">' + options.okLabel + '</button>');
                elButtonsContainer.append(elOkBtn);

                if (options.type === "confirm" || options.type === "prompt") {
                    var elCancelBtn = $('<button class="cancel btn btn-light" tabindex="1">' + options.cancelLabel + '</button>');
                    elButtonsContainer.prepend(elCancelBtn);
                    elContainer.on('click', '.cancel', function () {
                        if (options.onCancel) {
                            options.onCancel(elContainer);
                        }
                        self.closeDialog(elContainer);
                    });
                }

                if (options.type === "prompt") {
                    var elInputContainer = $('<div class="dialog-input"><input type="text" class="form-control"></div>');
                    if (options.promptPlaceholder) {
                        elInputContainer.find('input').attr('placeholder', options.promptPlaceholder);
                    }
                    if (options.promptValue) {
                        elInputContainer.find('input').val(options.promptValue);
                    }
                    if (options.promptLabel) {
                        elInputContainer.prepend($('<label>' + options.promptLabel + '</label>'));
                    }
                    elInputContainer.on('keyup', 'input', function (ev) {
                        if (ev.which === 13) {
                            elContainer.find('.ok').click();
                        }
                    });
                    elMessageContainer.after(elInputContainer);
                }

                // attach ok events
                if (options.type === 'prompt') {
                    elContainer.on('click', '.ok', function () {
                        if (options.onOkay) {
                            options.onOkay(elInputContainer.find('input').val());
                        }
                        self.closeDialog(elContainer);
                    });
                } else {
                    elContainer.on('click', '.ok', function () {
                        if (options.onOkay) {
                            options.onOkay(elContainer);
                        }
                        self.closeDialog(elContainer);
                    });
                }

                return elContainer;
            },

            dialog: function (options) {
                var self = this;
                var options = self.getOptions(options);
                var el = $('<div class="' + DIALOG_CONTAINER_CLASS + ' hide"></div>');
                el.addClass(options.customeClass).append(self.buildDialog(options));

                $('body').append(el);

                setTimeout(function () {
                    el.removeClass('hide');
                    el.find('.ok').focus();
                    if (options.type === 'prompt') {
                        el.find('.dialog-input input').focus();
                    }
                }, 100);

                // TODO: return Promise
            },

            // =========== Notification ===========
            notify: function (options) {
                var self = this;
                options = self.getOptions(options);
                var existing = $('.' + NOTIFICATIONS_CONTAINER_CLASS + ' > div');
                if (existing) {
                    var diff = existing.length - options.maxNotifications;
                    if (diff >= 0) {
                        for (var i = 0, _i = diff + 1; i < _i; i++) {
                            this.closeNotification(existing[i], -1);
                        }
                    }
                }

                this.buildNotification(options);
            },


            closeNotification: function (elem, wait) {
                var self = this;
                elem = $(elem);
                if (this.defaultOptions.closeNotificationOnClick) {
                    elem.on("click", function () {
                        self.close(elem);
                    });
                }

                wait = wait && !isNaN(+wait) ? +wait : this.delay;

                if (wait < 0) {
                    self.close(elem);
                } else if (wait > 0) {
                    setTimeout(function () {
                        self.close(elem);
                    }, wait);
                }
            },

            setupNotificationsContainer: function (options) {
                var elNotificationsContainer = $("." + NOTIFICATIONS_CONTAINER_CLASS);
                if (elNotificationsContainer.length === 0) {
                    elNotificationsContainer = $('<div></div>')
                    $('body').append(elNotificationsContainer);
                }

                elNotificationsContainer.attr('class',
                    NOTIFICATIONS_CONTAINER_CLASS + ' ' +
                    options.notificationPosition + ' ' +
                    options.customeClass);

                return elNotificationsContainer;
            },

            buildNotification: function (options) {
                var elNotificationsContainer = this.setupNotificationsContainer(options);
                var elNotification = $('<div></div>');

                elNotification.attr('class', options.type || "default");
                elNotification.html(options.message);

                if ("function" === typeof options.notificationClick) {
                    $(elNotification).click(options.notificationClick);
                }

                elNotificationsContainer.append(elNotification);
                setTimeout(function () {
                    elNotification.addClass('show');
                }, 10);

                this.closeNotification(elNotification, options.delay);
            },
        };

        return {
            __alertify: _alertify,
            setup: function(options) {
                _alertify.setup(options);
            },
            alert: function (message, onOkay, onCancel) {
                return _alertify.dialog({
                    message: message,
                    type: 'alert',
                    onOkay: onOkay,
                    onCancel: onCancel
                }) || this;
            },
            confirm: function (message, onOkay, onCancel) {
                return _alertify.dialog({
                    message: message,
                    type: 'confirm',
                    onOkay: onOkay,
                    onCancel: onCancel
                }) || this;
            },
            prompt: function (message, onOkay, onCancel) {
                return _alertify.dialog({
                    message: message,
                    type: 'prompt',
                    onOkay: onOkay,
                    onCancel: onCancel
                }) || this;
            },
            notify: function (message, click, type) {
                _alertify.notify({
                    message: message,
                    type: type || 'default',
                    notificationClick: click,
                });
                return this;
            },
            success: function (message, click) {
                return this.notify(message, click, 'success');
            },
            error: function (message, click) {
                return this.notify(message, click, 'error');
            },
            primary: function(message, click) {
                return this.notify(message, click, 'primary');
            },
            secondary: function(message, click) {
                return this.notify(message, click, 'secondary');
            },
            info: function(message, click) {
                return this.notify(message, click, 'info');
            },
            warning: function(message, click) {
                return this.notify(message, click, 'warning');
            },
            warn: function (message, click) {
                return this.notify(message, click, 'warn');
            },
            danger: function(message, click) {
                return this.notify(message, click, 'danger');
            },
            dark: function(message, click) {
                return this.notify(message, click, 'dark');
            },
            light: function(message, click) {
                return this.notify(message, click, 'light');
            },
        };
    }

    // AMD, window, and NPM support
    if ("undefined" !== typeof module && !!module && !!module.exports) {
        module.exports = function () {
            return new Alertify();
        };
        var obj = new Alertify();
        for (var key in obj) {
            module.exports[key] = obj[key];
        }
    } else if (typeof define === "function" && define.amd) {
        define(function () {
            return new Alertify();
        });
    } else {
        window.alertify = new Alertify();
    }

}());