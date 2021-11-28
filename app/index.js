
var canvas; // ゲームキャンバス
var ctx; // キャンバス・コンテキスト
var g_canvas_width; // キャンバス横幅
var g_canvas_height; // キャンバス立幅


// スタート　ここから処理を開始
$(()=>{
	
	init(); // 初期化
	run(); // 実行
});

/**
 * 初期化
 */
function init(){

	// HTML内のcanvas要素をゲームキャンバスとして取得するする。
	canvas = $('#game_canvas')[0];
	// ※ ゲームキャンバスに背景絵やキャラの絵などが描かれる。
	
	g_canvas_width = $('#game_canvas').width(); // ゲームキャンバスの横幅を取得する
	g_canvas_height = $('#game_canvas').height(); // ゲームキャンバスの横幅を取得する
	
	
	canvas.width = g_canvas_width;
	canvas.height = g_canvas_height;
	
	console.log(g_canvas_width);//■■■□□□■■■□□□)
	console.log(g_canvas_height);//■■■□□□■■■□□□)
	
	// キャンバス・コンテキスト
	ctx = canvas.getContext('2d');
	
}

/**
 * 実行
 */
function run(){
	//requestAnimationFrame(run);

	ctx.clearRect(0, 0, g_canvas_width, g_canvas_height); //一度canvasをクリア
	ctx.font = "30px 'Meiryo'";
	ctx.fillText("hello world! こんにちは", 50, 100, 400);
	ctx.stroke();//描画する
	
	console.log('test');

}