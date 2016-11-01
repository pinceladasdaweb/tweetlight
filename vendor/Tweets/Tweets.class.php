<?php
namespace Tweets;

class Tweets extends \Codebird\Codebird
{
    private $_consumer_key        = CONSUMER_KEY;
    private $_consumer_secret     = CONSUMER_SECRET;
    private $_access_token        = ACCESS_TOKEN;
    private $_access_token_secret = ACCESS_TOKEN_SECRET;

    public function user_timeline() {
        parent::setConsumerKey($this->_consumer_key, $this->_consumer_secret);
        $cb = parent::getInstance();
        $cb->setToken($this->_access_token, $this->_access_token_secret);

        $params = array(
            'screen_name' => isset($_GET['username']) ? $_GET['username'] : NULL,
            'count'       => isset($_GET['count']) ? $_GET['count'] : 10
        );

        $data = (array) $cb->statuses_userTimeline($params);

        return json_encode($data);
    }

    public function hashtag() {
        parent::setConsumerKey($this->_consumer_key, $this->_consumer_secret);
        $cb = parent::getInstance();
        $cb->setToken($this->_access_token, $this->_access_token_secret);

        $params = array(
            'q'     => isset($_GET['hashtag']) ? $_GET['hashtag'] : NULL,
            'count' => isset($_GET['count']) ? $_GET['count'] : 10
        );

        $data = (array) $cb->search_tweets($params);

        return json_encode($data);
    }

    public function render() {
        $timeline = $this->user_timeline();
        $hashtag  = $this->hashtag();

        header('Content-type: application/json');

        echo $json = (isset($_GET['hashtag'])) ? $hashtag : $timeline;
    }
}