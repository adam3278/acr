### ACR (Website ACcesibilitizeR)

## Mission
This projects solves a problem with using websites by vision-affected people by providing options to change color scheme or font size of the website. It's very simple to use by delevopers via fev commands. With a simple and clear user control panel it's usefull for any people.

## Requirements
This package needs to use on ssl protected website (https protocol), because of usage ES6 modules. It would work on any browser supports Fetch API.

## Usage
Download acr folder and place it relative to the root of webpage. It can be placed anywhere, but needs then to change language files path at the begining of the acr.js

Place those tags into head or body tag in your website:
```html
<script type="module" src="acr/acr.js"></script>
<link rel="stylesheet" href="acr/acr.css" />
```

If you want to use session based settings, you will need to inform of cookies (localStorage) usage and place this tag or command only:
```html
<script>
  window.onload = function () {
      acr.restore();
  }
</script>
```
