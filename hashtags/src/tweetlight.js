/*---------------
* Tweetlight
* Display all tweets with a certain hashtag with pure JavaScript and PHP OAuth Library
* Example and documentation at: https://github.com/pinceladasdaweb/tweetlight
* Copyright (c) 2014
* Version: 3.0.1 (Latest build: Aug 06 2014)
* Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
* Requires: Twitter API Authentication
---------------*/
var Browser = (function () {
    var agent = navigator.userAgent;
    return {
        ie: agent.match(/MSIE\s([^;]*)/)
    };
}());

var Tweetlight = {
    init: function (config) {
        this.url        = './tweets.php?q=' + encodeURIComponent(config.query) + '&count=' + config.count;
        this.container  = config.container;
        this.onComplete = config.onComplete || function () {};
        this.fetch();
    },
    xhr: function () {
        return new XMLHttpRequest();
    },
    getJSON: function (options, callback) {
        var self = this;

        var xhttp    = self.xhr();
        options.url  = options.url || location.href;
        options.data = options.data || null;
        callback     = callback || function () {};
        xhttp.open('GET', options.url, true);
        xhttp.onreadystatechange = function() {
            if (xhttp.status === 200 && xhttp.readyState === 4) {
                callback(xhttp.responseText);
            }
        }
        xhttp.send(options.data);
    },
    loop: function (els, callback) {
        var i = 0, max = els.length;

        while (i < max) {
            callback(els[i], i);
            i += 1;
        }
    },
    fetch: function () {
        var self = this;

        self.getJSON({url: self.url}, function (data) {
            var tweets   = JSON.parse(data),
                tweet    = tweets.statuses,
                timeline = document.querySelector(self.container),
                content  = '';

            self.loop(tweet, function (res) {
                content += '<li><span class="tweet"><a href="https://twitter.com/'+res.user.screen_name+'">'+res.user.screen_name+'</a>: '+self.twitterLinks(res.text)+'</span><span class="created">'+self.prettyDate(res.created_at)+'</span></li>';
            });

            timeline.innerHTML = content;

            self.onComplete();
        });

    },
    prettyDate: function (a) {
        var b = new Date();
        var c = new Date(a);
        if (Browser.ie) {
            c = Date.parse(a.replace(/( \+)/, ' UTC$1'))
        }
        var d = b - c;
        var e = 1000,
            minute = e * 60,
            hour = minute * 60,
            day = hour * 24,
            week = day * 7;
        if (isNaN(d) || d < 0) {
            return ""
        }
        if (d < e * 7) {
            return "just now"
        }
        if (d < minute) {
            return Math.floor(d / e) + " seconds ago"
        }
        if (d < minute * 2) {
            return "1 minute ago"
        }
        if (d < hour) {
            return Math.floor(d / minute) + " minutes ago"
        }
        if (d < hour * 2) {
            return "1 hour ago"
        }
        if (d < day) {
            return Math.floor(d / hour) + " hours ago"
        }
        if (d > day && d < day * 2) {
            return "yesterday"
        }
        if (d < day * 365) {
            return Math.floor(d / day) + " days ago"
        } else {
            return "over a year ago"
        }
    },
    twitterLinks: function (text) {
        text = text.replace(/(https?:\/\/)([\w\-:;?&=+.%#\/]+)/gi, '<a href="$1$2">$2</a>')
        .replace(/(^|\W)@(\w+)/g, '$1<a href="https://twitter.com/$2">@$2</a>')
        .replace(/(^|\W)#(\w+)/g, '$1<a href="https://twitter.com/search?q=%23$2">#$2</a>');
        return text
    }
}