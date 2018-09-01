# Bbootstrap

## Overview

Tool set for web development based on Bootstrap 4. [Here](https://bndynet.github.io/bbootstrap/) is the demo for this project.

Starter template:

```html
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>Bbootstrap</title>
    <link rel="stylesheet" href="css/bbootstrap.min.css" />
    <script src="js/bbootstrap.min.js"></script>
    <script>
        $(function () {
            bbootstrap.setup();
        });
    </script>
</head>
<body></body>
</html>
```

## Layout

### Centered Box

```html
<body class="layout-one">
    <!-- TODO: fixed size for `.main` -->
    <div class="main">I'm centered!</div>
</body>
```

### Admin Panel

The common html structure as below:

```html
<body class="layout-admin [layout-admin-sm] [layout-admin-{theme}]">
    <header>
        <nav class="navbar navbar-expand-lg [navbar-dark|navbar-light]">
            <a class="navbar-brand" href="#">Your Brand</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarContent">
                <!-- left nav -->
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <a class="nav-link" onclick="bbootstrap.toggleLeftSide()">
                            <i class="fa fa-bars fa-2x"></i>
                        </a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Dropdown
                        </a>
                        <div class="dropdown-menu [dropdown-menu-colored]" aria-labelledby="navbarDropdown"></div>
                    </li>
                </ul>
                <!-- right nav -->
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" onclick="bbootstrap.toggleRightSide()">
                            <i class="fa fa-ellipsis-v fa-2x"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
    <div class="sidebar-main"></div>
    <div class="main"></div>
    <div class="sidebar-assist"></div>
    <footer></footer>
</body>
```

Trigger the sidebars by calling following script:

```javascript
bbootstrap.toggleLeftSide();    // toggle the `.sidebar-main` element
bbootstrap.toggleRightSide();   // toggle the `.sidebar-assist` element
```