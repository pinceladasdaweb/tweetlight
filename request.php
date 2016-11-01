<?php
require_once './vendor/autoload.php';
require_once './vendor/Tweets/config.php';

$codebirdLoader = new SplClassLoader('Codebird', 'vendor');
$tweetsLoader   = new SplClassLoader('Tweets', 'vendor');

$codebirdLoader->register();
$tweetsLoader->register();

use Tweets\Tweets;

$tweets = new Tweets();
$tweets->render();