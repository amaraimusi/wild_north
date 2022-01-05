<?php 

$pdo_path = __DIR__ . '/../../dev/vendor/CrudBase/PdoDao.php';
require_once $pdo_path;
var_dump($pdo_path);//■■■□□□■■■□□□)

$dbConf = [
    'host' => 'localhost',
    'db_name' => 'wild_north',
    'user' => 'root',
    'pw' => '',
];


$dao = new PdoDao($dbConf);
$backImgData = $dao->query('SELECT * FROM back_imgs WHERE delete_flg=0');
var_dump($backImgData);//■■■□□□■■■□□□)
