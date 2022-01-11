
/**
 * 町画面制御クラス
 * @note 町画面
 * @since 2022-1-4
 * @auther amaraimusi
 * @version 1.0.0
 */
class TownController{
	
	constructor(gm){
		this.gm = gm;
		this.box = gm.box;
	}
	
	// 画面活性化
	activate(){
		console.log('画面活性化');//■■■□□□■■■□□□
		this.view();
	}
	
	// ビュー。レイアウトの配置
	view(){
		let gm = this.gm;
		gm.backImage(3); // 背景画像を配置
	}
}