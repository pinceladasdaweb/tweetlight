/*jslint browser: true, debug:true*/
/*global define, module, exports, console*/
(function (root, factory) {
    "use strict";

    if (typeof define === 'function' && define.amd) {
        define('tweetlight', factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.Tweetlight = factory();
    }
}(this, function () {
    "use strict";

    if (!(Function.prototype.hasOwnProperty('bind'))) {
        Function.prototype.bind = function () {
            var fn = this, context = arguments[0], args = Array.prototype.slice.call(arguments, 1);
            return function () {
                return fn.apply(context, args.concat(Array.prototype.slice.call(arguments)));
            };
        };
    }

    var Tweetlight = function (options) {
        if (!this || !(this instanceof Tweetlight)) {
            return new Tweetlight(options);
        }

        if (!options) {
            console.log('%c Don\'t initialize the plugin without setting a username or without setting an html element to attach tweets', 'background: red; color: white');
            return;
        }

        this.endpoint         = '../request.php';
        this.username         = options.username;
        this.hashtag          = options.hashtag;
        this.container        = options.container;
        this.counter          = options.counter;
        this.showImageProfile = options.showImageProfile || false;
        this.onComplete       = options.onComplete       || undefined;

        this.fetch();
    };

    Tweetlight.prototype = {
        inject: function (target, html) {
            target.insertAdjacentHTML('beforeend', html);
        },
        fetch: function () {
            var type     = this.hashtag ? 'hashtag=' + encodeURIComponent(this.hashtag) : 'username=' + this.username,
                counter  = this.counter ? '&count=' + this.counter : '',
                endpoint = this.endpoint + '?' + type + counter;

            this.getJSON(endpoint).then(this.loadTweets.bind(this), this.failure.bind(this));
        },
        getJSON: function (path) {
            return new Promise(function(resolve, reject) {
                var xhttp = new XMLHttpRequest();

                xhttp.open('GET', path, true);
                xhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                xhttp.setRequestHeader('Content-type', 'application/json');
                xhttp.onreadystatechange = function () {
                    if (this.readyState === 4) {
                        if ((this.status >= 200 && this.status < 300) || this.status === 304) {
                            var response = JSON.parse(this.responseText);

                            resolve(response);
                        } else {
                            var error = this.statusText;

                            reject('Http/App Error: ' + error);
                        }
                    }
                }
                xhttp.onerror = processError;
                xhttp.onabort = processError;
                xhttp.send();
                xhttp = null;

                function processError (err) {
                    reject('Network Error: ' + err.target.status);
                }
            });
        },
        loadTweets: function (tweets) {
            var apiStatus = tweets.httpstatus;

            if (apiStatus === 200) {
                if (tweets.statuses) {
                    tweets = tweets.statuses;
                }

                this.displayTweets(tweets);

                typeof this.onComplete === 'function' && this.onComplete.call();
            } else {
                this.displayError(tweets);
            }
        },
        displayTweets: function (tweets) {
            var timeline = document.querySelector(this.container), content, imageProfile, i;

            for (i in tweets) {
                if (tweets.hasOwnProperty(i)) {
                    if (tweets[i].text) {
                        imageProfile = this.showImageProfile ? '<img class="image-profile" src="' + tweets[i].user.profile_image_url_https + '" alt="' + tweets[i].user.name + '">' : '';

                        content = '<li>' + imageProfile + '<span class="tweet">' + this.twitterLinks(tweets[i].text) + '</span><span class="created">' + this.prettyDate(tweets[i].created_at) + '</span></li>';

                        this.inject(timeline, content);
                    }
                }
            }
        },
        displayError: function (tweets) {
            var timeline = document.querySelector(this.container);

            this.inject(timeline, '<li class="error">' + tweets.errors[0].message + '</li>');
        },
        failure: function (err) {
            console.log(err);
        },
        prettyDate: function (dateString) {
            var rightNow = new Date(),
                then     = new Date(dateString),
                diff,
                second,
                minute,
                hour,
                day,
                week;

            if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > 0) {
                then = Date.parse(dateString.replace(/( \+)/, ' UTC$1'));
            }

            diff   = rightNow - then;
            second = 1000;
            minute = second * 60;
            hour   = minute * 60;
            day    = hour * 24;
            week   = day * 7;

            if (isNaN(diff) || diff < 0) {
                return "";
            }
            if (diff < second * 2) {
                return "just now";
            }
            if (diff < minute) {
                return Math.floor(diff / second) + " seconds ago";
            }
            if (diff < minute * 2) {
                return "1 minute ago";
            }
            if (diff < hour) {
                return Math.floor(diff / minute) + " minutes ago";
            }
            if (diff < hour * 2) {
                return "1 hour ago";
            }
            if (diff < day) {
                return Math.floor(diff / hour) + " hours ago";
            }
            if (diff > day && diff < day * 2) {
                return "yesterday";
            }
            if (diff < day * 365) {
                return Math.floor(diff / day) + " days ago";
            }

            return "over a year ago";
        },
        twitterLinks: function (text) {
            text = text.replace(/(https?:\/\/)([\w\-:;?&=+.%#\/]+)/gi, '<a href="$1$2">$2</a>')
                .replace(/(^|\W)@(\w+)/g, '$1<a href="https://twitter.com/$2">@$2</a>')
                .replace(/(^|\W)#(\w+)/g, '$1<a href="https://twitter.com/search?q=%23$2">#$2</a>');
            return text;
        }
    };

    return Tweetlight;
}));