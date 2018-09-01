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

    // options: [{label: '', css: '', valueProperty: '', textProperty: '', selectedValue: '', childProperty: ''}, {...}]
    cascadeSelect: function(data, options) {
        var _this = $(this);
        var id = _this.attr('id') + '_cascadeSelect';
        var selectedObjects = [];
        var elFields = [];
        var elContainer = $('<div id="' + id + '"></div>');
        _this.append(elContainer);

        for(var i = 0; i < options.length; i++) {
            options[i].index = i;
            buildField(options[i]);
        }

        function buildField(option) {
            var elSelectId = id + '_' + option.index;
            var d = option.index === 0 ? data :
                selectedObjects[option.index-1] ? selectedObjects[option.index - 1][options[option.index - 1].childProperty] : null;
            if (!d || d.length === 0) {
                destroyField(option);
                return null;
            }

            var elField = $('<div class="form-group"><select id="' + elSelectId + '" class="form-control"></select></div>');
            if (option.label) {
                elField.prepend('<label for="' + elSelectId + '">' + option.label + '</label>');
            }
            if (option.css) {
                elField.addClass(option.css);
            }
            var elSelect = elField.find('select');
            selectedObjects[option.index] = d.length > 0 ? d[0] : null;
            for(var i = 0; i < d.length; i++) {
                var item = d[i];
                var elOption = $('<option value="' + (item[option.valueProperty]||'') + '">' + (item[option.textProperty]||'') + '</option>');
                if (option.selectedValue === item[option.valueProperty]) {
                    selectedObjects[option.index] = item;
                    elOption.prop('selected', true);
                }
                elSelect.append(elOption);
            } 
            elSelect.on('change', function() {
                option.selectedValue = $(this).val();
                for (var i = 0; i < d.length; i++) {
                    if (d[i][option.valueProperty] == option.selectedValue) {
                        selectedObjects[option.index] = d[i];
                    }
                }
                changeSelect(option);
            });
            elFields[option.index] = elField;
            elContainer.append(elField);
            return elField;
        }

        function rebindField(option) {
            var fieldData = option.index === 0 ? data : selectedObjects[option.index-1] ? selectedObjects[option.index-1][options[option.index-1].childProperty] : null;
            var elField = elFields[option.index];
            if (!elField) {
                elField = elFields[option.index] = buildField(option);
            }
            if (!elField) {
                destroyField(option);
                return;
            }

            var elSelect = elField.find('select');
            elSelect.find('option').remove();
            selectedObjects[option.index] = fieldData && fieldData.length > 0 ? fieldData[0] : null;
            if (fieldData && fieldData.length > 0) {
                for(var i = 0; i < fieldData.length; i++) {
                    var item = fieldData[i];
                    var elOption = $('<option value="' + (item[option.valueProperty]||'') + '">' + (item[option.textProperty]||'') + '</option>');
                    if (option.selectedValue === item[option.valueProperty]) {
                        selectedObjects[option.index] = item;
                        elOption.prop('selected', true);
                    }
                    elSelect.append(elOption);
                }
            } else {
                destroyField(option);
            }
        }

        function destroyField(option) {
            if (elFields[option.index]) {
                elFields[option.index].remove();
            }
            elFields[option.index] = null;
        }

        function changeSelect(option) {
            for(var i = option.index + 1; i < options.length; i++) {
                rebindField(options[i]);
            }
        }

        return {
            values: function() {
                var result = [];
                for(var i = 0; i < options.length; i++) {
                    result.push(elFields[i].find('select').val());
                }
                return result;
            },
        };
    }
});