<?php 
session_start();
$length = 10;
$csrf_token = base_convert(mt_rand(pow(36, $length - 1), pow(36, $length) - 1), 10, 36);
$_SESSION['csrf_token'] = $csrf_token;

?>
<!DOCTYPE html>
<html lang="ja">
	<head>
		<meta charset="UTF-8">
		<title>Wild North</title>
		<script type="text/javascript" src="jquery-3.6.0.min.js"></script>
		
		<script type="text/javascript" src="crud_base_game/CbgDebug.js"></script>
		<script type="text/javascript" src="crud_base_game/CrudBaseGameMaster.js"></script>
		<script type="text/javascript" src="controller/TownController.js"></script>
		
		<script type="text/javascript" src="index.js"></script>
	</head>
	
	<body>
		<div id="err" style="color:red"></div>
		<div>
			<canvas id="game_canvas"  style="width:100%; height:100%; background-color:black;"></canvas>
		</div>
		
		<input id="csrf_token" type="hidden" value='<?php echo $csrf_token; ?>' />
	</body>
	
	
</html>