# BulletScreen.js
A JavaScript plugin make a bullet screen using html5 canvas.

## Usage

Including files:
```html
<script src="js/hidpi-canvas.min.js"></script>
<script src="js/bulletScreen.min.js"></script>
```

HTML structure:
```html
<canvas></canvas>
``` 

Create a object of `BulletScreen` and initialize it.
```js
// create
var bulletScreen = new BulletScreen();
// initialize
bulletScreen.init({
	canvas: document.querySelector('canvas')
});
```

Then, you can add some comments.
```js
var comments = [
	{avatar: 'img/avatar.jpg', content: '啊哈哈哈'},
	{avatar: 'img/avatar.jpg', content: '前方高能!!'},
	{avatar: 'img/avatar.jpg', content: '233333333333'},
	{avatar: 'img/avatar.jpg', content: '666666'}
];
// add comments
bulletScreen.addComments(comments);
```

Start to display the comments you added.
```js
// start
bulletScreen.start();
```

Finally, you can continue to add more comments as you like. And all the "bullets" will fly on the screen.

## Config
If you want to configure the `BulletScreen` object. just call the instance function `configure` with a object.

```js
// your customized config
var config = {
	frameRate: 40,
	bulletScreenInterval: 3000
}
// configure
bulletScreen.configure(config);
```

### canvasWidth
### canvasHeight
Your canvas's width and height.

Default: your browser's width and height.

### frameRate
FPS(Frames Per Second).

Default: 30.

### fontSize
Comments' font size.

Default: '16px'.

### fontFamily
Comments' font family.

Default: 'Arial'.

### fontColor
Comments' font color.

Default: '#fff'.

### rowSpacing
Spacing between the adjacent rows.

Default: 10.

### avatarRadius
The radius of round avatars.

Default: 20.

### avatarBorder
The border width of round avatars.

Default: 6.

### contentBoxHeight
Height of comments content box.

Default: 28.

### contentBoxBorderRadius
Border radius of comments content box.

Default: 6.

### backgroundColor
Background color of comments content box and color of avatars' border.

Default: '#fdb720'.

### bulletScreenInterval
Interval of Comments show.

Default: 3000.

## Methods

### init([options])
To initialize a `BulletScreen` instance with a config object. About config option detail you can see above description.

Parameters:
- options: Object

### configure(options)
To configure a `BulletScreen` instance with a config object.

Parameters:
- options: Object

### addComments(comments)
To add comments to the "bullet screen".

Parameters:
- comments: Array

### start()
Starting to display "bullet screen".

### pause()
To pause displaying "bullet screen".

### resume()
To resume starting to display the "bullet screen" which is paused.

### clear()
To reset the config of a `BulletScreen` instance and clearing the screen.
