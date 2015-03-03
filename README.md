# [Tweetlight](http://www.pinceladasdaweb.com.br/blog/uploads/tweetlight/)

> Display your latest tweets with pure JavaScript and PHP OAuth Library.

## How to Configure

1 - In your HTML file where you want the tweets appear, insert a `<ul>` tag with an id or class, to be used by JavaScript:

```html
<ul class="timeline"></ul>
```

2 - Paste right before your page's closing `</body>` tag:

```html
<script type="text/javascript" src="path/to/tweetlight.min.js"></script>
```

3 - From within a script tag or a JS file:

3.1 - For display a user timeline use:

```javascript
Tweetlight.init({
    username: 'pinceladasdaweb',    // Twitter username
    container: '.timeline',         // domNode to attach to
    counter: 5,                     // Number of tweets to display
    onComplete: function() {
        console.log('Awesome APP'); // Callback to execute after fetch tweets. Not required, use if necessary.
    }
});
```

3.2 - For display hashtags use:

```javascript
Tweetlight.init({
    hashtag: '#html5',              // Twitter hashtag
    container: '.hashtags',         // domNode to attach to
    counter: 5,                     // Number of tweets to display
    onComplete: function() {
        console.log('Awesome APP'); // Callback to execute after fetch tweets. Not required, use if necessary.
    }
});
```

3.3 - You can also load the script via AMD:

```javascript
require(["/path/to/tweetlight.min"], function(Tweetlight) {
    Tweetlight.init({
        username: 'pinceladasdaweb',
        container: '.timeline',
        counter: 5
    });
});
```

4 - In the config.php [`config.php`](api/config.php) file, complete the [Twitter OAuth settings](https://dev.twitter.com/docs/auth/oauth/faq)

```php
$CONSUMER_KEY        = '';
$CONSUMER_SECRET     = '';
$ACCESS_TOKEN        = '';
$ACCESS_TOKEN_SECRET = '';
```

## Important Note

It is mandatory to file cacert.pem be on the same level/directory that codebird.php file because Twitter requires [secure connections in their API](https://dev.twitter.com/discussions/24239).

## Browser support

![IE](https://cloud.githubusercontent.com/assets/398893/3528325/20373e76-078e-11e4-8e3a-1cb86cf506f0.png) | ![Chrome](https://cloud.githubusercontent.com/assets/398893/3528328/23bc7bc4-078e-11e4-8752-ba2809bf5cce.png) | ![Firefox](https://cloud.githubusercontent.com/assets/398893/3528329/26283ab0-078e-11e4-84d4-db2cf1009953.png) | ![Opera](https://cloud.githubusercontent.com/assets/398893/3528330/27ec9fa8-078e-11e4-95cb-709fd11dac16.png) | ![Safari](https://cloud.githubusercontent.com/assets/398893/3528331/29df8618-078e-11e4-8e3e-ed8ac738693f.png)
--- | --- | --- | --- | --- |
IE 8+ ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ |

## Contributing

Check [CONTRIBUTING.md](https://github.com/pinceladasdaweb/tweetlight/blob/master/CONTRIBUTING.md) for more information.

## History

Check [Releases](https://github.com/pinceladasdaweb/tweetlight/releases) for detailed changelog.

## License

[MIT](LICENSE)