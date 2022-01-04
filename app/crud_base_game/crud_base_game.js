
/**
 * CrudBaseゲーム
 * @note ゲームエンジン
 *     基礎システムはこちらにて。
 * @since 2021-12-25
 * @auther amaraimusi
 * @version 1.0.0
 */
class CrudBaseGame{
	
	/**
	 * コンストラクタ
	 * 
	 * @param box
	 * - flg
	 */
	constructor(game_canvas_xid, box){
		
		if (box == null) box = {};
		box['game_canvas_xid'] = game_canvas_xid;
		if (box['resolution'] == null)  box['resolution'] = 1.5; // 解像度 0.3～2.0の葉にで指定すること。例→0.5:解像度低 1:解像度標準 1.5:解像度高

		// ▽デバッグ関連
		if (box['debug_px'] == null)  box['debug_px'] = 10; // デバッグ表示位置X
		if (box['debug_py'] == null)  box['debug_py'] = 30; // デバッグ表示位置Y
		box['debug_py_next'] = 0; // デバッグ位置Yネクスト
		box['debug_line_h'] = 32; // デバッグ行高
		

		let gameCanvas = $('#' + game_canvas_xid);
		if(gameCanvas[0] == null) throw Error('システムエラー 211225A')
		let canvas = gameCanvas[0]; // HTML内のcanvas要素をゲームキャンバスとして取得するする。
		
		let main_width = gameCanvas.width(); // 横幅を取得する
		let main_height = gameCanvas.height(); // 縦幅を取得する
	
		// 画面の解像度を調整する
		let resolution = box.resolution; // 解像度
		canvas.width = main_width * resolution;
		canvas.height = main_height * resolution;
		
		let ctx = canvas.getContext('2d'); // キャンバス・コンテキスト
		
		this.ctx = ctx;
		this.gameCanvas = gameCanvas; // jQueryゲームキャンバス要素
		this.canvas = canvas; // ゲームキャンバス




		box['main_width'] = main_width; // メイン横幅
		box['main_height'] = main_height; // メイン横幅
		if (box['font'] == null)  box['font'] = null; // テキストフォント    画面に表示する文字のフォント
		
		// ▽FPS関連 ※FPS指定はできない。60FPSで固定。機種によっては30FPSになる。
		box['frame_count'] = 0; // フレームカウンタ
		box['fps_lap_time'] = 0; // FPS制御用・ラップタイム
		box['fps_lap_time_old'] = 0; // FPS制御用・前フレームのラップタイム
		box['fps_moment'] = 0; // FPS制御用・刹那時間 (1フレームにおけるゲーム処理時間)
		box['fps_f_ms'] = 0; // FPS制御用・1フレームms
		box['fps_sec_conter'] = 0; // 1秒フレームカウンタ
		box['fps_sec_lap_time'] = Date.now(); // 1秒ラップタイム
		box['fps_real'] = 0; // FPS   1秒あたりのフレーム数
		
		
		
		this.box = box;

	}
	
	/** ボックスのGetter
	 */
	getBox(){
		return this.box;
	}
	
	
	/** 前処理
	 */
	processBefore(){
		let box = this.box;
		
		this._clearScreen(); // 画面クリア
		box.fps_lap_time = Date.now(); // ラップタイムを取得
		
		// ▽デバッグ関連
		box.debug_py_next = box.debug_py;
	}
	
	/** 後処理
	 */
	processAfter(){
		
		let box = this.box;
		
		this._calcFps(); // FPS計算
		
		
	}
	
	/** FPS計算
	 */
	_calcFps(){
		let box = this.box;
		let fps_lap_time = box.fps_lap_time; // FPSラップタイム
		let fps_lap_time_old = box.fps_lap_time_old; // 前フレームのFPSラップタイム
		
		let fps_lap_time_after= Date.now(); // ラップタイムを取得
		let fps_moment = fps_lap_time_after - fps_lap_time; // 刹那時間を算出
		
		let fps_f_ms = fps_lap_time - fps_lap_time_old; // FPSを算出
		
		box.frame_count++; // フレームカウンタのインクリメント
		
		// ▽ FPSの計算
		if(box.fps_sec_lap_time + 1000 < fps_lap_time){
			box.fps_real = box.fps_sec_conter / (fps_lap_time - box.fps_sec_lap_time);
			box.fps_real = box.fps_real * 1000;
			box.fps_sec_conter = 0;
			box.fps_sec_lap_time = fps_lap_time;
		}else{
			box.fps_sec_conter ++; // 1秒フレームカウンタのインクリメント
		}
		
		
		box.fps_moment = fps_moment;
		box.fps_f_ms = fps_f_ms;

		this.debugX(box.fps_lap_time); // ラップタイムを表示
		this.debugX('フレームカウンタ ' + box.frame_count);
		this.debugX('刹那時間ms ' + box.fps_moment);
		this.debugX('FPS ' + box.fps_real);

		box.fps_lap_time_old = fps_lap_time;
	}
	
	
	
	/**
	 * テキスト描画
	 * @param string text 画面に表示するテキスト
	 * @param int x テキストを表示する位置X
	 * @param int y テキストを表示する位置Y
	 * @param string font フォント情報（省略可）
	 * 
	 */
	drawText(text, x, y ,font){
		
		if(font == null){
			if(this.box.font == null){
				this.box.font = "30px 'Meiryo'";
				this.ctx.font = this.box.font;
			}
		}else{
			this.box.font = font;
			this.ctx.font = this.box.font;
		}
		
		this.ctx.fillText(text, x, y, this.box.main_width - x);
		
	}
	
	/**
	 * デバッグを画面に表示
	 * @param string text 
	 */
	debugX(text){
		let box = this.box;
		
		let x = box.debug_px;
		let y = box.debug_py_next ;
		
		box.debug_py_next += box.debug_line_h;
		
		this.drawText(text, x, y);
		
	}
	
	/** 画面クリア
	 */
	_clearScreen(){
		this.ctx.clearRect(0, 0, this.box.main_width, this.box.main_height); //一度canvasをクリア
	}
	
}