
var game = new CrudBaseGame();
var canvas; // ゲームキャンバス
var ctx; // キャンバス・コンテキスト
var g_canvas_width; // キャンバス横幅
var g_canvas_height; // キャンバス立幅

var g_frame_count = 0; // ゲームフレームカウント
var g_fps_time =0;
var g_fps = 0; // FPS


// スタート　ここから処理を開始
$(()=>{
	
	init(); // 初期化
	run(); // 実行
});

/**
 * 初期化
 */
function init(){

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
	
}

/**
 * 実行
 */
function run(){
	requestAnimationFrame(run);

	ctx.clearRect(0, 0, g_main_width, g_main_height); //一度canvasをクリア

	ctx.font = "30px 'Meiryo'";
	ctx.fillText("hello world! こんにちは", 50, 100, 400);
	ctx.stroke();//描画する
	
		// ■■■□□□■■■□□□後でリファクタリングします。
	// FPSを測定して表示する。 FPSは1秒間のフレーム数
	let fps_time = Date.now();
	if(g_fps_time + 1000 < fps_time ){
		g_fps_time = fps_time;
		g_fps = g_frame_count;
		g_frame_count = 0;
	}
	g_frame_count ++;
	ctx.fillText("FPS:" + g_fps, 5, 50, 100);

}