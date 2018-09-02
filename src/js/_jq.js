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
            html: true,
        });
        $(this).tooltip('show');
    },

    /**
     * Render a cascade Select components.
     * @param {Array} data - the array with children
     * @param {Object} options - the options
     * @example 
     * var ddl = $('#id').cascadeSelect([{id, name, children}], {
     *      mappings: [
     *          {label: '', css: '', valueProperty: '', textProperty: '', selectedValue: '', childProperty: ''},
     *      ],
     *      onChange: function(value, sender, config) {
     *      },
     * });
     * ddl.values();
     * ddl.setValues(1,2,4);    // or ddl.setValues([1,2,4]);
     */
    cascadeSelect: function(data, options) {
        if (!options || !options.hasOwnProperty('mappings')) {
            throw 'The arguments `options` and `options.mappings` are required. Like `$("#id").cascadeSelect([], {mappings: []});`';
        }
        if (!$(this).attr('id')) {
            throw 'The `id` is required for cascadeSelect element';
        }

        var self = this;
        var _this = $(this);
        var id = _this.attr('id') + '_cascadeSelect';
        var selectedObjects = [];
        var selectConfigs = options.mappings;
        var isChanged = false;

        function build() {
            for(var i = 0; i < selectConfigs.length; i++) {
                selectConfigs[i].index = i;
                buildSelectForm(selectConfigs[i]);
            }
        }
        build();

        function buildSelectForm(selectConfig) {
            var elContainerId = selectConfig.elContainerId = id + '_container_' + selectConfig.index;
            var elSelectId = selectConfig.elSelectId = id + '_select_' + selectConfig.index;

            destroySelectForm(selectConfig);

            selectConfig.data = selectConfig.index === 0 ? data :
                selectedObjects[selectConfig.index-1] ? selectedObjects[selectConfig.index - 1][selectConfigs[selectConfig.index - 1].childProperty] : null;
            if (!selectConfig.data  || selectConfig.data.length === 0) {
                return null;
            }

            var elContainer = $('<div id="' + elContainerId + '" class="form-group"><select id="' + elSelectId + '" class="form-control"></select></div>');
            if (selectConfig.label) {
                elContainer.prepend('<label for="' + elSelectId + '">' + selectConfig.label + '</label>');
            }
            if (selectConfig.css) {
                elContainer.addClass(selectConfig.css);
            }
            var elSelect = elContainer.find('select');
            elSelect.append('<option value="">' + (selectConfig.placeholder||'') + '</option>');
            for(var i = 0; i < selectConfig.data.length; i++) {
                var item = selectConfig.data[i];
                var elOption = $('<option value="' + (item[selectConfig.valueProperty]||'') + '">' + (item[selectConfig.textProperty]||'') + '</option>');
                if (selectConfig.selectedValue === item[selectConfig.valueProperty]) {
                    selectedObjects[selectConfig.index] = item;
                    elOption.prop('selected', true);
                }
                elSelect.append(elOption);
            }
            elSelect.on('change', function() {
                isChanged = true;
                selectConfig.selectedValue = $(this).val();
                if (selectConfig.selectedValue) {
                    for (var i = 0; i < selectConfig.data.length; i++) {
                        if (selectConfig.data[i][selectConfig.valueProperty] == selectConfig.selectedValue) {
                            selectedObjects[selectConfig.index] = selectConfig.data[i];
                        }
                    }
                } else {
                    selectedObjects[selectConfig.index] = null;
                }
                changeSelect(selectConfig);
                
                if (options.onChange) {
                    options.onChange(getValues(), $(this), selectConfig);
                }
            });
            _this.append(elContainer);
            return elContainer;
        }

        function destroySelectForm(selectConfig) {
            selectConfig.data = null;
            selectedObjects[selectConfig.index] = null;
            if (isChanged) {
                selectConfig.selectedValue = null;
            }
            _this.find('#' + selectConfig.elContainerId).remove();
        }

        function changeSelect(selectConfig) {
            for(var i = selectConfig.index + 1; i < selectConfigs.length; i++) {
                buildSelectForm(selectConfigs[i]);
            }
        }

        function setValues() {
            var values = arguments[0] && Array.isArray(arguments[0]) ? arguments[0] : arguments;
            for(var i = 0; i < selectConfigs.length; i++) {
                if (values.length > i) {
                    selectConfigs[i].selectedValue = values[i];
                } else {
                    selectConfigs[i].selectedValue = null;
                }
            }
            build();
        }

        function getValues() {
            var result = [];
            _this.find('select').each(function() {
                result.push($(this).val());
            });
            return result;
        }

        return {
            values: getValues,
            setValues: setValues,
        };
    }
});