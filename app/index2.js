
var canvas; // ゲームキャンバス
var ctx; // キャンバス・コンテキスト
var g_canvas_width; // キャンバス横幅
var g_canvas_height; // キャンバス立幅

var g_frame_count = 0; // ゲームフレームカウント
var g_fps_time =0;
var g_fps = 0; // FPS


const KEY_LEFT = 37;
const KEY_UP = 38;
const KEY_RIGHT = 39;
const KEY_DOWN = 40;

var test_px = 0;
var test_py = 0;


var test_chara;

$(()=>{
	
	init(); // 初期化
	run(); // 実行
});

/**
 * 初期化
 */
function init(){
	
	
	
	// HTML内のcanvas要素をゲームキャンバスとして取得するする。
	canvas = $('#canvas1')[0];
	// ※ ゲームキャンバスに背景絵やキャラの絵などが描かれる。
	
	// ゲームキャンバス・オブジェクトの取得に失敗した場合
	if ( ! canvas || ! canvas.getContext ) {
		$('#err').text('ゲームキャンバスの取得に失敗しました。');
		return;
	}
	
	g_canvas_width = $('#canvas1').width(); // ゲームキャンバスの横幅を取得する
	g_canvas_height = $('#canvas1').height(); // ゲームキャンバスの横幅を取得する
	
	
	canvas.width = g_canvas_width;
	canvas.height = g_canvas_height;
	
	// キャンバス・コンテキスト
	ctx = canvas.getContext('2d');
	
	window.addEventListener('keydown', function(event) {
		
		let key_code = event.keyCode;
		if(key_code == KEY_LEFT){
			test_px--;
		}
		if(key_code==KEY_RIGHT){
			test_px++;
		}
		if(key_code == KEY_UP){
			test_py--;
		}
		if(key_code == KEY_DOWN){
			test_py++;
		}
		
	});
	
	window.addEventListener("keyup", ()=>{
		let key_code = event.keyCode;
		console.log('key_code=' + key_code);//■■■□□□■■■□□□)
	});
	
	
	test_chara = new Image();
	test_chara.src = "img/tamamusi.png";

	ctx.font = "30px 'Meiryo'";
	ctx.fillText("hello world! こんにちは", 50, 100, 400);
	ctx.stroke();//描画する
	
}

/**
 * 実行
 */
function run(){
	requestAnimationFrame(run);

	// ■■■□□□■■■□□□
	ctx.clearRect(0, 0, g_canvas_width, g_canvas_height); //一度canvasをクリア

	ctx.fillText("hello world! こんにちは", 50, 100, 400);
	ctx.stroke();//描画する
	
	
    ctx.drawImage(test_chara,
            0,  // sx      (元画像の切り抜き始点X)
            0,  // sy      (元画像の切り抜き始点Y)
            307,  // sWidth  (元画像の切り抜きサイズ：横幅)
            420,  // sHeight (元画像の切り抜きサイズ：高さ)
            test_px,  // dx      (Canvasの描画開始位置X)
            test_py,  // dy      (Canvasの描画開始位置Y)
            60,  // dWidth  (Canvasの描画サイズ：横幅)
            84   // dHeight (Canvasの描画サイズ：高さ)
       );
	
	
	// ■■■□□□■■■□□□後でリファクタリングします。
	// FPSを測定して表示する。 FPSは1秒間のフレーム数
	let fps_time = Date.now();
	if(g_fps_time + 1000 < fps_time ){
		g_fps_time = fps_time;
		g_fps = g_frame_count;
		g_frame_count = 0;
	}
	g_frame_count ++;
	ctx.fillText("FPS:" + g_fps, 5, g_canvas_height - 25, 100);
	

}