<?php
class Tweets {
    static public function hashtag() {
        // Twitter OAuth library: https://github.com/mynetx/codebird-php
        require_once ('../codebird.php');

        // Twitter OAuth Settings:
        $CONSUMER_KEY = '';
        $CONSUMER_SECRET = '';
        $ACCESS_TOKEN = '';
        $ACCESS_TOKEN_SECRET = '';

        // Get authenticated:
        \Codebird\Codebird::setConsumerKey($CONSUMER_KEY, $CONSUMER_SECRET);
        $cb = \Codebird\Codebird::getInstance();
        $cb->setToken($ACCESS_TOKEN, $ACCESS_TOKEN_SECRET);

        // Retrieve posts:
        $q = strip_tags(trim($_GET['q']));
        $count = strip_tags(trim($_GET['count']));

        // API Settings: https://dev.twitter.com/docs/api/1.1/get/search/tweets
        $params = array(
            'q' => $q,
            'count' => $count
        );

        // Make the REST call:
        $data = (array) $cb->search_tweets($params);

        unset($data['search_metadata']);
        unset($data['httpstatus']);
        unset($data['rate']);

        // Output result in JSON:
        return json_encode($data);
    }
}

header('Content-type: application/json');
echo Tweets::hashtag();