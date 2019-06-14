
    ,-----.   ,--.  ,--. ,------. ,--.   ,--.     ,--.  ,--. ,------. ,--------.
    |  |) /_  |  ,'.|  | |  .-.  \ \  `.'  /      |  ,'.|  | |  .---' '--.  .--'
    |  .-.  \ |  |' '  | |  |  \  : '.    /       |  |' '  | |  `--,     |  |
    |  '--' / |  | `   | |  '--'  /   |  |   .--. |  | `   | |  `---.    |  |
    `------'  `--'  `--' `-------'    `--'   '--' `--'  `--' `------'    `--'

# Bbootstrap

[![npm](https://img.shields.io/npm/v/@bndynet/bbootstrap.svg)](https://www.npmjs.com/package/@bndynet/bbootstrap)
[![npm](https://img.shields.io/npm/dt/@bndynet/bbootstrap.svg)](https://www.npmjs.com/package/@bndynet/bbootstrap)

A set which includes some useful components.
[Demo](https://bndynet.github.io/bbootstrap/)

## Components

- [jQuery](http://jquery.com/) 3.3.1
- [popper.js](https://popper.js.org/) 1.14.7
- [bootstrap](http://getbootstrap.com) 4.3.1
- [Lodash](https://lodash.com/) 4.17.11
- [momentjs](https://momentjs.com) 2.22.2 without locales
- [font-awesome](https://fontawesome.com/) 4.7.0
- [jslib](https://github.com/bndynet/jslib) v2.0.0
- [pace.js](https://github.com/HubSpot/pace) v1.0.2

Note: You can use the above components in your project directly. So don't need include them. If you need [moment locales](http://momentjs.com/downloads/moment-with-locales.min.js) support, you should add library to your website.

## Quick start

```html
<link rel="stylesheet" href="https://unpkg.com/@bndynet/bbootstrap/dist/css/bbootstrap.min.css">
<script src="https://unpkg.com/@bndynet/bbootstrap/dist/js/bbootstrap.min.js"></script>

<script>
    bb.setup();
</script>
```

Below are available themes, you can use one of them instead of **bbootstrap.min.css**.

- bbootstrap-dark.min.css
- bbootstrap-meterail.min.css

### Application Utils

```javascript
bb.toggleLeftSide();
bb.toggleRightSide();
bb.alert('');
bb.confirm('', function(){} [, function(){}]);
bb.prompt('', function(val){});
bb.info('');
bb.success('');
bb.error('');
bb.loading();
bb.loading(false);
```

### Advanced Customization

Default English, you can define your languages as below:

```js
// MUST be before `setup` method
bb.defineLang('zh-CN', {
    ok: '确定',
    cancel: '取消',
    yes: '是',
    no: '否',
    browse: '浏览'
});
bb.setup({
    locale: 'zh-CN',
});
console.log(bb.langs.default); // print default and you can overwrite them using above code
```

Below are available options, you can override them via `bb.setup({})`.

```js
{
    locale: 'en-US',
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
    // Below is for enabling page loading progress bar for ajax, document and all events
    progressBar: {
        theme: 'primary|secondary|success|info|warning|danger|dark|light',  // theme in bootstrap, or
        color:  '#ff0000',
    },
}
```

## Changelog

### v2.2.0

- Refactor style code to support custom themes
- Add dark theme

### v2.1.0

- New component: Pin element on window top when scroll the element position `$('#id').pinTopOnScroll([resolve, reject])`

### v2.0.0

- Remove locales of moment.js and animate.css as option

### v1.6.4

- New style `.text-placeholder` to hide real text - [Demo](https://bndynet.github.io/bbootstrap/#text-placeholder)

### v1.6.3

- Supports to customize file input button text in language

### v1.6.2

- Add new icons
- Fix some icons size and position

### v1.6.1

- New style `.card-flip` for **Card**
- Fix some typos
- Alias `bb` for `bbootstrap`
- Alias methods `bb.alert`, `bb.confirm`, `bb.prompt` `bb.info`, `bb.success`, `bb.error` and `bb.loading`

### v1.6.0

- [New component](https://bndynet.github.io/bbootstrap/index.html#cascade-select) `$('#id').cascadeSelect([], {mappings: []});`

### v1.5.1

- Rewrite `.alert` styles
- Add `.layout-admin-[primary|success|...]`
- Add `.dropdown-menu-[primary|success|...]`

### v1.5.0

- Rename `.side-left` to `.sidebar-main`
- Rename `.side-right` to `.sidebar-assist`
- [Admin Layout](https://bndynet.github.io/bbootstrap/layout-admin.html)
- New styles `.shadow-xs` and `.shadow-hover` for existing shadows in bootstrap - [Code](https://github.com/bndynet/bbootstrap/blob/master/src/scss/_shadow.scss)
- New styles `.toggle-hover` to toggle `.hover-show` and `.hover-hidden` - [Code](ttps://github.com/bndynet/bbootstrap/blob/master/src/scss/_common.scss)

### v1.4.1

- Fix some bugs

### v1.4.0

- Perfect layout styles
- Add `.tags`, `.tag`, `.tag-theme` styles - [Demo](https://bndynet.github.io/bbootstrap/#tags)
- Enhancement for `.card` with `.card-sm` and `.card-theme` - [Demo](https://bndynet.github.io/bbootstrap/layout-admin.html)
- Add `.workflow` styles - [Demo](https://bndynet.github.io/bbootstrap/#workflow)

### v1.3.1

- Fix some bugs
- Add icons without font

### v1.3.0

- Styles: Add some layout styles
- Component(progressBar): By default the page progress bar is disabled unless set `progressBar.theme` or `progressBar.color`
- Component(progressBar): rename option `pace` to `progressBar`
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
