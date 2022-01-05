
/**
 * CrudBaseゲーム・デバッグクラス
 * @note 
 *     デバッグ関連を担当するクラス
 * @since 2022-1-5
 * @auther amaraimusi
 * @version 1.0.0
 */
class CbgDebug{
	
	constructor(gm){
		this.gm = gm;
	}
	
	// デバッグ関連のぷろぱてぃをセットする。
	setBoxProps(box){
		if (box['debug_px'] == null)  box['debug_px'] = 10; // デバッグ表示位置X
		if (box['debug_py'] == null)  box['debug_py'] = 30; // デバッグ表示位置Y
		box['debug_py_next'] = 0; // デバッグ位置Yネクスト
		box['debug_line_h'] = 32; // デバッグ行高
		
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
		
		return box;
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
		
		this.gm.drawText(text, x, y);
		
	}
	
	
	/** FPS計算
	 */
	calcFps(){
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
	
}