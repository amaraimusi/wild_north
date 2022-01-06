<?php 

$pdo_path = __DIR__ . '/../../dev/vendor/CrudBase/PdoDao.php';
require_once $pdo_path;
require_once 'config/database.php';
require_once 'config/common.php';
require_once 'model.php';

// ■■■□□□■■■□□□ CSRFトークンのセキュリティ

global $g_dbConf;
$dao = new PdoDao($g_dbConf);

$md = new Model($dao);

$gameData['backImgHm'] = $md->getBackImgHm();

$json = json_encode($gameData,JSON_HEX_TAG | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_HEX_APOS);
echo $json;