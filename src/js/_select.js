(function ($) {

    $.fn.bselect = function (method) {

        // Methods
        if (typeof method == 'string') {
            if (method == 'update') {
                this.each(function () {
                    var $select = $(this);
                    var $dropdown = $(this).next('.b-select');
                    var open = $dropdown.hasClass('open');

                    if ($dropdown.length) {
                        $dropdown.remove();
                        create_bselect($select);

                        if (open) {
                            $select.next().trigger('click');
                        }
                    }
                });
            } else if (method == 'destroy') {
                this.each(function () {
                    var $select = $(this);
                    var $dropdown = $(this).next('.b-select');

                    if ($dropdown.length) {
                        $dropdown.remove();
                        $select.css('display', '');
                    }
                });
                if ($('.b-select').length == 0) {
                    $(document).off('.b-select');
                }
            } else {
                console.log('Method "' + method + '" does not exist.')
            }
            return this;
        }

        // Hide native select
        this.hide();

        // Create custom markup
        this.each(function () {
            var $select = $(this);

            if (!$select.next().hasClass('b-select')) {
                create_bselect($select);
            }
        });

        function placeholder($select, $dropdown) {
            var placeholder = $select.attr('placeholder');
            if (placeholder) {
                $dropdown.find('.current').html('<span class="placeholder">' + placeholder + '</span>');
            }
        }

        function create_bselect($select) {
            var multiple = $select.is('[multiple]');
           
            $select.after($('<div></div>')
                .addClass('b-select form-control')
                .addClass(multiple ? 'multiple' : '')
                .addClass($select.attr('class') || '')
                .addClass($select.attr('disabled') ? 'disabled' : '')
                .attr('style', $select.attr('style'))
                .attr('tabindex', $select.attr('disabled') ? null : '0')
                .show()
                .html('<span class="current"></span><ul class="list"></ul>')
            );

            var $dropdown = $select.next();
            var $options = $select.find('option');
            var $selected = $select.find('option:selected');

            $selected.each(function() {
                var displayText = $(this).data('display') || $(this).text();
                var elSelected = $('<span class="item">' + displayText + '</span>');
                $dropdown.find('.current').append(elSelected);
            });

            if ($selected.length === 0) {
                placeholder($select, $dropdown);
            }

            $options.each(function (i) {
                var $option = $(this);
                var display = $option.data('display');

                $dropdown.find('ul').append($('<li></li>')
                    .attr('data-value', $option.val())
                    .attr('data-display', (display || null))
                    .addClass('option' +
                        ($option.is(':selected') ? ' selected' : '') +
                        ($option.is(':disabled') ? ' disabled' : ''))
                    .html($option.text())
                );
            });
        }

        /* Event listeners */

        // Unbind existing events in case that the plugin has been initialized before
        $(document).off('.b-select');

        // Open/close
        $(document).on('click.b-select', '.b-select', function (event) {
            var $dropdown = $(this);
            var multiple = $dropdown.hasClass('multiple');
            $('.b-select').not($dropdown).removeClass('open');

            if (!multiple || !$dropdown.hasClass('open') || (multiple && !$(event.target).hasClass('option'))) {
                $dropdown.toggleClass('open');
            }

            if ($dropdown.hasClass('open')) {
                $dropdown.find('.option');
                $dropdown.find('.focus').removeClass('focus');
                $dropdown.find('.selected').addClass('focus');
            } else {
                $dropdown.focus();
            }
        });

        // Close when clicking outside
        $(document).on('click.b-select', function (event) {
            if ($(event.target).closest('.b-select').length === 0) {
                $('.b-select').removeClass('open').find('.option');
            }
        });

        // Option click
        $(document).on('click.b-select', '.b-select .option:not(.disabled)', function (event) {
            var $option = $(this);
            var $dropdown = $option.closest('.b-select');
            var multiple = $dropdown.hasClass('multiple');
            
            if (multiple) {
                $option.hasClass('selected') ? $option.removeClass('selected') : $option.addClass('selected');
                $dropdown.find('.current').html('');
                var values = [];
                $dropdown.find('.option.selected').each(function() {
                    var text = $(this).data('display') || $(this).text();
                    var elSelected = $('<span class="item">' + text + '</span>')
                    $dropdown.find('.current').append(elSelected);
                    values.push($(this).data('value'));
                });
                if (values.length === 0) {
                    placeholder($dropdown.prev('select'), $dropdown);
                }
                $dropdown.prev('select').val(values); //.trigger('change');
            } else {
                $dropdown.find('.selected').removeClass('selected');
                $option.addClass('selected');

                var text = $option.data('display') || $option.text();
                $dropdown.find('.current').text(text);

                $dropdown.prev('select').val($option.data('value')).trigger('change');
            }
        });

        // Keyboard events
        $(document).on('keydown.b-select', '.b-select', function (event) {
            var $dropdown = $(this);
            var $focused_option = $($dropdown.find('.focus') || $dropdown.find('.list .option.selected'));

            // Space or Enter
            if (event.keyCode == 32 || event.keyCode == 13) {
                if ($dropdown.hasClass('open')) {
                    $focused_option.trigger('click');
                } else {
                    $dropdown.trigger('click');
                }
                return false;
                // Down
            } else if (event.keyCode == 40) {
                if (!$dropdown.hasClass('open')) {
                    $dropdown.trigger('click');
                } else {
                    var $next = $focused_option.nextAll('.option:not(.disabled)').first();
                    if ($next.length > 0) {
                        $dropdown.find('.focus').removeClass('focus');
                        $next.addClass('focus');
                    }
                }
                return false;
                // Up
            } else if (event.keyCode == 38) {
                if (!$dropdown.hasClass('open')) {
                    $dropdown.trigger('click');
                } else {
                    var $prev = $focused_option.prevAll('.option:not(.disabled)').first();
                    if ($prev.length > 0) {
                        $dropdown.find('.focus').removeClass('focus');
                        $prev.addClass('focus');
                    }
                }
                return false;
                // Esc
            } else if (event.keyCode == 27) {
                if ($dropdown.hasClass('open')) {
                    $dropdown.trigger('click');
                }
                // Tab
            } else if (event.keyCode == 9) {
                if ($dropdown.hasClass('open')) {
                    return false;
                }
            }
        });

        // Detect CSS pointer-events support, for IE <= 10. From Modernizr.
        var style = document.createElement('a').style;
        style.cssText = 'pointer-events:auto';
        if (style.pointerEvents !== 'auto') {
            $('html').addClass('no-csspointerevents');
        }

        return this;

    };

}(jQuery));