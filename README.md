# Tweetlight

> Display your latest tweets with pure JavaScript and PHP OAuth Library.

## Demo

View [demo here](http://www.pinceladasdaweb.com.br/blog/uploads/tweetlight/)

## Requirements

* PHP 5.4.0 or higher
* OpenSSL extension

## Getting Started

```bash
# Get the latest snapshot
$ git clone git@github.com:pinceladasdaweb/tweetlight.git
```

## How to use?

### Javascript initialization

Tweetlight is a [Vanilla JS](http://vanilla-js.com/) plugin with no dependencies. Include the [`tweetlight.min.js`](build/tweetlight.min.js) before your ```</body>``` tag:

```html
<script src="path/to/tweetlight.min.js"></script>
```

And initialise it. For display a user timeline use:

```javascript
Tweetlight({
    username: 'pinceladasdaweb',    // Twitter username
    container: '.timeline',         // domNode to attach to
    showImageProfile: true,         // Display image profile, default is false
    counter: 5,                     // Number of tweets to display
    onComplete: function() {
        console.log('Awesome APP'); // Callback to execute after fetch tweets. Not required, use if necessary.
    }
});
```

For display hashtags use:

```javascript
Tweetlight({
    hashtag: '#html5',              // Twitter hashtag
    container: '.hashtags',         // domNode to attach to
    showImageProfile: true,         // Display image profile, default is false
    counter: 5,                     // Number of tweets to display
    onComplete: function() {
        console.log('Awesome APP'); // Callback to execute after fetch tweets. Not required, use if necessary.
    }
});
```

You can also load the plugin via AMD (require.js):

```html
<script>
require(["path/to/tweetlight.min.js"], function(Tweetlight) {
    Tweetlight({
        username: 'pinceladasdaweb',    // Twitter username
        container: '.timeline',         // domNode to attach to
        showImageProfile: true,         // Display image profile, default is false
        counter: 5,                     // Number of tweets to display
        onComplete: function() {
            console.log('Awesome APP'); // Callback to execute after fetch tweets. Not required, use if necessary.
        }
    });
});
</script>
```

### HTML

In your HTML file where you want the tweets appear, insert a `<ul>` tag with an id or class, to be used by JavaScript:

```html
<ul class="timeline"></ul>
```

### PHP

In the config.php [`config.php`](vendor/Tweets/config.php) file, complete the [Twitter OAuth settings](https://dev.twitter.com/docs/auth/oauth/faq)

```php
define('CONSUMER_KEY', '');
define('CONSUMER_SECRET', '');
define('ACCESS_TOKEN', '');
define('ACCESS_TOKEN_SECRET', '');
```

## Important Note

It is mandatory to file cacert.pem be on the same level/directory that Codebird.class.php file because Twitter requires [secure connections in their API](https://dev.twitter.com/discussions/24239).

## Browser support

![IE](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/42.9.0/edge/edge_128x128.png) | ![Chrome](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/42.9.0/archive/chrome_12-48/chrome_12-48_128x128.png) | ![Firefox](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/42.9.0/archive/firefox_3.5-22/firefox_3.5-22_128x128.png) | ![Opera](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/42.9.0/archive/opera_15-32/opera_15-32_128x128.png) | ![Safari](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/42.9.0/archive/safari_1-7/safari_1-7_128x128.png)
--- | --- | --- | --- | --- |
Edge 14+ ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ |

## Contributing

Check [CONTRIBUTING.md](https://github.com/pinceladasdaweb/tweetlight/blob/master/CONTRIBUTING.md) for more information.

## History

Check [Releases](https://github.com/pinceladasdaweb/tweetlight/releases) for detailed changelog.

## License

[MIT](LICENSE)