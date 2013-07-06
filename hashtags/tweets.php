<?php
header('Content-type: application/json');

//Twitter OAuth library: https://github.com/mynetx/codebird-php
require_once ('../codebird.php');

//Twitter OAuth Settings:
$CONSUMER_KEY = '';
$CONSUMER_SECRET = '';
$ACCESS_TOKEN = '';
$ACCESS_TOKEN_SECRET = '';

//Get authenticated:
Codebird::setConsumerKey($CONSUMER_KEY, $CONSUMER_SECRET);
$cb = Codebird::getInstance();
$cb->setToken($ACCESS_TOKEN, $ACCESS_TOKEN_SECRET);

//Retrieve posts:
if(!isset($_GET['q']) || !$q = $_GET['q']) $q = 'twitter';
if(!isset($_GET['count']) || !$count = $_GET['count']) $count = 5;
$api = $_GET['api'];

//API Settings: https://dev.twitter.com/docs/api/1.1/get/search/tweets
$params = array(
	'q' => $q,
	'count' => $count
);

//Make the REST call:
$data = (array) $cb->$api($params);

unset($data['search_metadata']);
unset($data['httpstatus']);

//Output result in JSON:
echo json_encode($data);
?>