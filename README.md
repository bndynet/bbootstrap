
    ,-----.   ,--.  ,--. ,------. ,--.   ,--.     ,--.  ,--. ,------. ,--------. 
    |  |) /_  |  ,'.|  | |  .-.  \ \  `.'  /      |  ,'.|  | |  .---' '--.  .--' 
    |  .-.  \ |  |' '  | |  |  \  : '.    /       |  |' '  | |  `--,     |  |    
    |  '--' / |  | `   | |  '--'  /   |  |   .--. |  | `   | |  `---.    |  |    
    `------'  `--'  `--' `-------'    `--'   '--' `--'  `--' `------'    `--'    

# BBootstrap 

A set which includes some useful components. 
[Demo](https://bndynet.github.io/bbootstrap/)

## Components

- [jQuery](http://jquery.com/) 3.3.1
- [popper.js](https://popper.js.org/) 1.14.3
- [bootstrap](http://getbootstrap.com) 4.1.1
- [font-awesome](https://fontawesome.com/) 4.7.0
- [animate.css](https://daneden.github.io/animate.css/) 3.6.1

Note: Do not include above components in your project. This project has included them.


## Quick start

```html
<link rel="stylesheet" href="dist/css/bbootstrap.min.css">
<script src="dist/js/bbootstrap.min.js"></script>
```

## Changes

### v1.0.0

- Add pretty Checkbox and Radio [[Demo]](https://bndynet.github.io/bbootstrap/)

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