<?
header('Content-type: application/json');

//Twitter OAuth library: https://github.com/mynetx/codebird-php
require_once ('codebird.php');

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
$username = $_GET['username'];
$count = $_GET['count'];
$api = $_GET['api'];

//API Settings: https://dev.twitter.com/docs/api/1.1/get/statuses/user_timeline
$params = array(
	'screen_name' => $username,
	'count' => $count
);

//Make the REST call:
$data = (array) $cb->$api($params);

$lastElement = array_pop($data);

foreach ($data as $tweet){
	$tweets[] = array(
		'username' => $tweet->user->screen_name,
		'profile_image' => $tweet->user->profile_image_url,
		'text' => $tweet->text,
		'created' => $tweet->created_at
	);
}

//Output result in JSON:
echo json_encode($tweets);
?>