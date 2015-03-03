<?php
require_once ('api/codebird/codebird.php');
require_once ('api/Tweets.php');
require_once ('api/config.php');

$tweets = new Tweets($CONSUMER_KEY, $CONSUMER_SECRET, $ACCESS_TOKEN, $ACCESS_TOKEN_SECRET);

$timeline = $tweets->user_timeline();
$hashtag  = $tweets->hashtag();

header('Content-type: application/json');

echo $json = (isset($_GET['hashtag'])) ? $hashtag : $timeline;