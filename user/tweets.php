<?php
class Tweets {
    static public function user_timeline() {
        // Twitter OAuth library: https://github.com/mynetx/codebird-php
        require_once ('../codebird.php');

        // Twitter OAuth Settings:
        $CONSUMER_KEY = 'mYIVkwudrYFCmmjD1AHZIg';
        $CONSUMER_SECRET = '6esgRuGqjiyc2rfl6f5LOmUUYKLH48ZiaYuRTJTdg';
        $ACCESS_TOKEN = '13524602-1eHV0dAlfIXDC3i2AGmCYcXdhhRPTP26sBTxUxWE';
        $ACCESS_TOKEN_SECRET = '59B3nbBSTMQHzMt7rMWt10AvKqipq9Dh2sqSh4mZD4';

        // Get authenticated:
        \Codebird\Codebird::setConsumerKey($CONSUMER_KEY, $CONSUMER_SECRET);
        $cb = \Codebird\Codebird::getInstance();
        $cb->setToken($ACCESS_TOKEN, $ACCESS_TOKEN_SECRET);

        // Retrieve posts:
        $username = strip_tags(trim($_GET['username']));
        $count = strip_tags(trim($_GET['count']));

        // API Settings: https://dev.twitter.com/docs/api/1.1/get/statuses/user_timeline
        $params = array(
            'screen_name' => $username,
            'count' => $count
        );

        // Make the REST call:
        $data = (array) $cb->statuses_userTimeline($params);

        unset($data['httpstatus']);

        foreach ($data as $tweet){
            $tweets[] = array(
                'username' => $tweet->user->screen_name,
                'profile_image' => $tweet->user->profile_image_url,
                'text' => $tweet->text,
                'created' => $tweet->created_at
            );
        }

        // Output result in JSON:
        return json_encode($tweets);
    }
}

header('Content-type: application/json');
echo Tweets::user_timeline();