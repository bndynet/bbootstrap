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
     */
    cascadeSelect: function(data, options) {
        if (!options || !options.hasOwnProperty('mappings')) {
            throw 'The arguments `options` and `options.mappings` are required. Like `$("#id").cascadeSelect([], {mappings: []});`';
        }

        var _this = $(this);
        var id = _this.attr('id') + '_cascadeSelect';
        var selectedObjects = [];
        var selectConfigs = options.mappings;
        var elFields = [];

        for(var i = 0; i < selectConfigs.length; i++) {
            selectConfigs[i].index = i;
            buildField(selectConfigs[i]);
        }

        function buildField(selectConfig) {
            var elSelectId = id + '_' + selectConfig.index;

            selectConfig.data = selectConfig.index === 0 ? data :
                selectedObjects[selectConfig.index-1] ? selectedObjects[selectConfig.index - 1][selectConfigs[selectConfig.index - 1].childProperty] : null;
            if (!selectConfig.data  || selectConfig.data .length === 0) {
                destroyField(selectConfig);
                return null;
            }

            var elField = $('<div class="form-group"><select id="' + elSelectId + '" class="form-control"></select></div>');
            if (selectConfig.label) {
                elField.prepend('<label for="' + elSelectId + '">' + selectConfig.label + '</label>');
            }
            if (selectConfig.css) {
                elField.addClass(selectConfig.css);
            }
            var elSelect = elField.find('select');
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
                    options.onChange($(this).val(), $(this), selectConfig);
                }
            });
            elFields[selectConfig.index] = elField;
            _this.append(elField);
            return elField;
        }

        function rebindField(selectConfig) {
            selectConfig.data = selectConfig.index === 0 ? data : selectedObjects[selectConfig.index-1] ? selectedObjects[selectConfig.index-1][selectConfigs[selectConfig.index-1].childProperty] : null;
            var elField = elFields[selectConfig.index];
            if (!elField) {
                elField = elFields[selectConfig.index] = buildField(selectConfig);
            }
            if (!elField) {
                destroyField(selectConfig);
                return;
            }

            var elSelect = elField.find('select');
            elSelect.find('option[value!=""]').remove();
            selectedObjects[selectConfig.index] = selectConfig.data && selectConfig.data.length > 0 ? selectConfig.data[0] : null;
            if (selectConfig.data && selectConfig.data.length > 0) {
                for(var i = 0; i < selectConfig.data.length; i++) {
                    var item = selectConfig.data[i];
                    var elOption = $('<option value="' + (item[selectConfig.valueProperty]||'') + '">' + (item[selectConfig.textProperty]||'') + '</option>');
                    if (selectConfig.selectedValue === item[selectConfig.valueProperty]) {
                        selectedObjects[selectConfig.index] = item;
                        elOption.prop('selected', true);
                    }
                    elSelect.append(elOption);
                }
            } else {
                destroyField(selectConfig);
            }
        }

        function destroyField(selectConfig) {
            selectConfig.data = null;
            if (elFields[selectConfig.index]) {
                elFields[selectConfig.index].remove();
            }
            elFields[selectConfig.index] = null;
        }

        function changeSelect(selectConfig) {
            for(var i = selectConfig.index + 1; i < selectConfigs.length; i++) {
                rebindField(selectConfigs[i]);
            }
        }

        return {
            values: function() {
                var result = [];
                _this.find('select').each(function() {
                    result.push($(this).val());
                });
                return result;
            },
        };
    }
});