
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
- [font-awesome](https://fontawesome.com/) 4.7.0
- [animate.css](https://daneden.github.io/animate.css/) 3.6.1
- [jslib](https://github.com/bndynet/jslib) v2.0.0
- [pace.js](https://github.com/HubSpot/pace) v1.0.2

Note: Do not include above components in your project. This project has included them.


## Quick start

```html
<link rel="stylesheet" href="dist/css/bbootstrap.min.css">
<script src="dist/js/bbootstrap.min.js"></script>
<script>
    // Optional, you can be selective to override items.
    bbootstrap.set({
        alertify: {
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
        },
        pace: {
            theme: 'primary|secondary|success|info|warning|danger|dark|light',  // theme in bootstrap, or
            color:  '#ff0000',  
        },
    });
</script>
```

## Changelog

### v1.1.1

- Add themes support for pace via `bbootstrap.set({pace: {theme: 'theme in bootstrap'}}}`
- The page loading progress will not be displayed by default, unless you set `color` or `theme` of `pace`

### v1.1.0

- Add alertify component
    ```js
    alertify.alert('message');
    alertify.confirm('message', fnOK [,fnCancel]);
    alertify.notify|success|error('message' [, fnCallback]);
    ```
- Add automatic page load progress bar for ajax request, document loading and so on
- Add method `bbootstrap.set({})` for configurating global settings


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