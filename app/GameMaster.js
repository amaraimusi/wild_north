

/**
 * ゲームマスター
 * @note ゲーム進行の統括。便利屋的な役割も持ち、各クラスはこのクラスを呼び出して制御する。
 * @since 2022-1-2
 * @auther amaraimusi
 * @version 1.0.0
 */
class GameMaster{
	
	/**
	 * コンストラクタ
	 * @param CrudBaseGame cbg 
	 */
	constructor(cbg){
		this.cbg = cbg;
		this.box = cbg.getBox();
		
		let box = this.box;
		box['gamen_code'] = 'town'; // 画面コード
		box['prev_gamen_code'] = ''; // 前フレーム画面コード
		
		
		// 各画面コントローラオブジェクトの生成
		let gamens = {
			town:new TownController(this),
		};
		this.gamens = gamens;
	}
	
	/**
	 * 初期化
	 */
	init(){
		
	}

	// 画面アクティブチェック
	checkGamenActivate(){
		let box = this.box;
		
		if(box.gamen_code != box.prev_gamen_code){
			
			let gamen = this.gamens[box.gamen_code];
			gamen.activate();
			
			
			box.prev_gamen_code = box.gamen_code;
		}
	}
	
	/**
	 *  背景画像を配置
	 *  @param int back_img_id 背景画像ID
	 */
	backImage(back_img_id){
		console.log('背景画像を配置');//■■■□□□■■■□□□
	}
	
}