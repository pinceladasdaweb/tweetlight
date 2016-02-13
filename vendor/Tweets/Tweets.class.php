<?php
class Tweets {
    public function __construct($CONSUMER_KEY, $CONSUMER_SECRET, $ACCESS_TOKEN, $ACCESS_TOKEN_SECRET) {
        $this->_consumer_key        = $CONSUMER_KEY;
        $this->_consumer_secret     = $CONSUMER_SECRET;
        $this->_access_token        = $ACCESS_TOKEN;
        $this->_access_token_secret = $ACCESS_TOKEN_SECRET;
    }

    public function user_timeline() {
        \Codebird\Codebird::setConsumerKey($this->_consumer_key, $this->_consumer_secret);
        $cb = \Codebird\Codebird::getInstance();
        $cb->setToken($this->_access_token, $this->_access_token_secret);

        $params = array(
            'screen_name' => isset($_GET['username']) ? $_GET['username'] : NULL,
            'count'       => isset($_GET['count']) ? $_GET['count'] : 10
        );

        $data = (array) $cb->statuses_userTimeline($params);

        return json_encode($data);
    }

    public function hashtag() {
        \Codebird\Codebird::setConsumerKey($this->_consumer_key, $this->_consumer_secret);
        $cb = \Codebird\Codebird::getInstance();
        $cb->setToken($this->_access_token, $this->_access_token_secret);

        $params = array(
            'q'     => isset($_GET['hashtag']) ? $_GET['hashtag'] : NULL,
            'count' => isset($_GET['count']) ? $_GET['count'] : 10
        );

        $data = (array) $cb->search_tweets($params);

        return json_encode($data);
    }
}