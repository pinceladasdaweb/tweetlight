/**
 * Implements JSON stringify and parse functions for older browsers
 * v1.0
 *
 * By Craig Buckler, Optimalworks.net
 *
 * As featured on SitePoint.com
 * Please use as you wish at your own risk.
*
 * Usage:
 *
 * // serialize a JavaScript object to a JSON string
 * var str = JSON.stringify(object);
 *
 * // de-serialize a JSON string to a JavaScript object
 * var obj = JSON.parse(str);
 */
var JSON = JSON || {};

// implement JSON.stringify serialization
JSON.stringify = JSON.stringify || function (obj) {

    var t = typeof (obj);
    if (t != "object" || obj === null) {

        // simple data type
        if (t == "string") obj = '"'+obj+'"';
        return String(obj);

    } else {

        // recurse array or object
        var n, v, json = [], arr = (obj && obj.constructor == Array);

        for (n in obj) {
            v = obj[n]; t = typeof(v);

            if (t == "string") v = '"'+v+'"';
            else if (t == "object" && v !== null) v = JSON.stringify(v);

            json.push((arr ? "" : '"' + n + '":') + String(v));
        }

        return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
    }
};

// implement JSON.parse de-serialization
JSON.parse = JSON.parse || function (str) {
    if (str === "") str = '""';
    eval("var p=" + str + ";");
    return p;
};

/**
 * define document.querySelector & document.querySelectorAll for IE7
 *
 * A not very fast but small hack. The approach is taken from
 * http://weblogs.asp.net/bleroy/archive/2009/08/31/queryselectorall-on-old-ie-versions-something-that-doesn-t-work.aspx
 *
 */
(function () {
    if (document.querySelectorAll || document.querySelector) {
        return;
    }
    var style = document.createStyleSheet(),
        select = function (selector, maxCount) {
            var all = document.all,
                l = all.length,
                i,
                resultSet = [];

            style.addRule(selector, "foo:bar");

            for (i = 0; i < l; i += 1) {
                if (all[i].currentStyle.foo === "bar") {
                    resultSet.push(all[i]);
                    if (resultSet.length > maxCount) {
                        break;
                    }
                }
            }
            style.removeRule(0);
            return resultSet;

        };

    document.querySelectorAll = function (selector) {
        return select(selector, Infinity);
    };
    document.querySelector = function (selector) {
        return select(selector, 1)[0] || null;
    };
}());

/*---------------
* Tweetlight
* Display your latest tweets with pure JavaScript and PHP OAuth Library
* Example and documentation at: https://github.com/pinceladasdaweb/tweetlight
* Copyright (c) 2013
* Version: 2.0.0 (15-JUN-2013)
* Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
* Requires: Twitter API Authentication
---------------*/
var K = function () {
    var a = navigator.userAgent;
    return {
        ie: a.match(/MSIE\s([^;]*)/)
    }
}();

var Tweetlight = {
    init: function(config) {
        this.url = './tweets.php?username=' + config.username + '&count=' + config.count + '&api=statuses_userTimeline';
        this.container = config.container;
        this.onComplete = config.onComplete || function(){};
        this.fetch();
    },
    xhr: function() {
        var instance = new XMLHttpRequest();
        return instance;
    },
    getJSON: function(options, callback) {
        var xhttp = this.xhr();
        options.url = options.url || location.href;
        options.data = options.data || null;
        callback = callback || function() {};
        xhttp.open('GET', options.url, true);
        xhttp.send(options.data);
        xhttp.onreadystatechange = function() {
            if (xhttp.status == 200 && xhttp.readyState == 4) {
                callback(xhttp.responseText);
            }
        }
    },
    fetch: function() {
        var self = this;

        self.getJSON({url: this.url}, function(data){
            var tweets = JSON.parse(data);

            var timeline = document.querySelector(self.container),
            content = '';
            for (var t in tweets) {
                content += '<li><span class="tweet">'+self.twitterLinks(tweets[t].text)+'</span> <span class="created">'+self.prettyDate(tweets[t].created)+'</span></li>';
            }
            timeline.innerHTML = content;

            self.onComplete();
        });

    },
    prettyDate: function(a) {
        var b = new Date();
        var c = new Date(a);
        if (K.ie) {
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
    twitterLinks: function(text) {
        text = text.replace(/(https?:\/\/)([\w\-:;?&=+.%#\/]+)/gi, '<a href="$1$2">$2</a>')
        .replace(/(^|\W)@(\w+)/g, '$1<a href="https://twitter.com/$2">@$2</a>')
        .replace(/(^|\W)#(\w+)/g, '$1<a href="https://twitter.com/search?q=%23$2">#$2</a>');
        return text
    }
}