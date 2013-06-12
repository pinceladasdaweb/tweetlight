Update: Twitter has completed the deprecation process for API version 1, so the Twitter URL no longer work more.

[Tweetlight](http://www.pinceladasdaweb.com.br/blog/uploads/tweetlight/)
==========

Display your latest tweets with pure JavaScript, no dependencies. The size of JavaScript code is approximately 3KB.

##Usage
1. Add the code below to your HTML, where the latest tweets should appear:
```html
<ul id="tweets"></ul>
```

2. Paste right before your page's closing `</body>` tag:
```console
<script type="text/javascript" src="src/tweetlight.js"></script>
```

2. From within a script tag or a JS file
```javascript	
	Tweetlight.init({
		username: 'pinceladasdaweb',	// Twitter username
		count: 4						// Number of tweets to display
	});
```
