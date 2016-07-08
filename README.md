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
bulletScreen.addComments(config.comments);
```

Start to display the comments you added.
```js
// start
bulletScreen.start();
```

Finally, you can continue to add more comments as you like. And all the "bullets" will fly on the screen.