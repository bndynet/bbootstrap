
    ,-----.   ,--.  ,--. ,------. ,--.   ,--.     ,--.  ,--. ,------. ,--------. 
    |  |) /_  |  ,'.|  | |  .-.  \ \  `.'  /      |  ,'.|  | |  .---' '--.  .--' 
    |  .-.  \ |  |' '  | |  |  \  : '.    /       |  |' '  | |  `--,     |  |    
    |  '--' / |  | `   | |  '--'  /   |  |   .--. |  | `   | |  `---.    |  |    
    `------'  `--'  `--' `-------'    `--'   '--' `--'  `--' `------'    `--'    

# Bbootstrap

![npm](https://img.shields.io/npm/v/@bndynet/bbootstrap.svg)
![npm](https://img.shields.io/npm/dt/@bndynet/bbootstrap.svg)

A set which includes some useful components. 
[Demo](https://bndynet.github.io/bbootstrap/)

## Components

- [jQuery](http://jquery.com/) 3.3.1
- [popper.js](https://popper.js.org/) 1.14.3
- [bootstrap](http://getbootstrap.com) 4.1.1
- [Lodash](https://lodash.com/) 4.17.10
- [momentjs](https://momentjs.com) 2.22.2
- [font-awesome](https://fontawesome.com/) 4.7.0
- [animate.css](https://daneden.github.io/animate.css/) 3.6.1
- [jslib](https://github.com/bndynet/jslib) v2.0.0
- [pace.js](https://github.com/HubSpot/pace) v1.0.2

Note: You can use the above components in your project directly. So don't need include them.


## Quick start

```html
<link rel="stylesheet" href="dist/css/bbootstrap.min.css">
<script src="dist/js/bbootstrap.min.js"></script>
<script>
    // Define your languages, MUST be before `setup` method
    bbootstrap.defineLang('zh-CN', {
        ok: '确定',
        cancel: '取消',
    });
    // Or bbootstrap.setup() to use default options
    bbootstrap.setup({
        locale: 'zh-CN',
        // Moment.js format used
        datetimeFormat: 'YYYY-MM-DD H:mm',
        timeFormat: 'H:mm',
        dateFormat: 'YYYY-MM-DD'
        alertify: {
            maxNotifications: 2,
            closeNotificationOnClick: true,
            delay: 5000,
            customeClass: '',
            notificationPosition: "bottom right",
        },
        // Below is for enabling page loading progress bar
        pace: {
            theme: 'primary|secondary|success|info|warning|danger|dark|light',  // theme in bootstrap, or
            color:  '#ff0000',  
        },
    });
</script>
```

## Changelog

### v1.2.2

- Styles: Add some layout styles
- Component(pace.js): Fix pace.js can not be disabled completely
- Component(pace.js): By default the pace.js is disabled unless set `pace.theme` or `pace.color`
- Component(alertify): `closeNotificationOnClick` is `true` by default

### v1.2.1

No changes

### v1.2.0

- Add momentjs library
- Add Lodash library
- Add datatime picker component
- Add pretty select component
- Add dialog component
- Add language customization support
- Mark method `bbootstrap.setup()` is required for enabling some js components

### v1.1.2

- Fix README typo

### v1.1.1

- Add themes support for pace via `bbootstrap.setup({pace: {theme: 'theme in bootstrap'}}}`
- The page loading progress will not be displayed by default, unless you set `color` or `theme` of `pace`

### v1.1.0

- Add alertify component
    ```js
    alertify.alert('message');
    alertify.confirm('message', fnOK [,fnCancel]);
    alertify.notify|success|error('message' [, fnCallback]);
    ```
- Add automatic page load progress bar for ajax request, document loading and so on
- Add method `bbootstrap.setup({})` for configurating global settings


### v1.0.2

- Add styles about overflow
- Add styles about status and loading
    ```js
    // loading for full screen
    $.bloading();
    $.bloading(false);
    // loading for specific element
    $('#id').bloading('bounce-rectangle', 'primary');
    $('#id').bloading('circle', 'info');
    $('#id').bloading(false);
    ```
- Add styles about link and link list
- Add tooltip via JavaScript
    ```js
    $('#id').btooltip('title', 'placement');    // show tooltip, placement is optional
    $('#id').btooltip(false);                   // close tooltip
    ```

### v1.0.1

- Add text block styles
- Add input with feedback styles
- Enhancement: Show selected file for file input of bootstrap

### v1.0.0

- Add pretty Checkbox and Radio

    ```html
    <!-- checkbox -->
    <div class="form-check checkbox checkbox-primary">
        <input class="form-check-input" id="checkbox1" type="checkbox">
        <label class="form-check-label" for="checkbox1">Check me</label>
    </div>

    <!-- radio -->
    <div class="form-check radio radio-primary">
        <input class="form-check-input" type="radio" name="radio1" id="radio1" value="option1" checked>
        <label class="form-check-label" for="radio1">Option 1</label>
    </div>
    ```
