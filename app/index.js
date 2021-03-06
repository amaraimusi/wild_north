
var gm; // GameMaster
var cbg;
var g_err = null;
/*
var canvas; // ゲームキャンバス
var ctx; // キャンバス・コンテキスト
var g_canvas_width; // キャンバス横幅
var g_canvas_height; // キャンバス立幅

var g_frame_count = 0; // ゲームフレームカウント
var g_fps_time =0;
var g_fps = 0; // FPS*/


// スタート　ここから処理を開始
$(()=>{
	
	init(); // 初期化
	run(); // 実行
});

/**
 * 初期化
 */
function init(){

	gm = new CrudBaseGameMaster('game_canvas');

/*■■■□□□■■■□□□
	let gameCanvas = $('#game_canvas');
	g_main_width = gameCanvas.width(); // 横幅を取得する
	g_main_height = gameCanvas.height(); // 縦幅を取得する
	
	// HTML内のcanvas要素をゲームキャンバスとして取得するする。
	canvas = gameCanvas[0];

	// 解像度の調整  例→0.5:解像度低 1:解像度標準 1.5:解像度高
	canvas.width = g_main_width * 1.5;
	canvas.height = g_main_height * 1.5;
	
	// キャンバス・コンテキスト
	ctx = canvas.getContext('2d');
	*/
	
}

/**
 * 実行
 */
function run(){

	try {
		gm.processBefore();

		gm.checkGamenActivate(); // 画面アクティブチェック
		
		//gm.drawText('Hello World ゲーム2', 70, 100);■■■□□□■■■□□□
		
		gm.draw(); // 描画処理
		
		gm.processAfter();

	} catch (err) {
		g_err = err;
		throw err;
	}

	if(g_err==null){
		requestAnimationFrame(run);
	}else{
		console.log('ゲーム停止');
	}


}