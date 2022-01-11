
/**
 * CrudBaseゲーム・描画クラス
 * @note 
 *	 描画関連を担当するクラス
 * @since 2022-1-6
 * @auther amaraimusi
 * @version 1.0.0
 */
class CbgDraw{
	
	constructor(gm, ctx){
		this.gm = gm;
		this.ctx = ctx;
		this.box = gm.getBox();
		this.backImgEnt = null;
		this.drawData = [];
		
		this.cashBackImgData = []; // キャッシュ背景画像データ
		this.cash_back_img_cnt = 24;
		
		
	}
	
	/**
	 *  背景画像を配置
	 *  @param int back_img_id 背景画像ID
	 */
	backImg(back_img_id){
		
		this.backImgEnt = this._getBackImgEnt(back_img_id);
		
	}
	
	draw(){
		let box = this.box;
		let biEnt = this.backImgEnt; // 背景画像オブジェクトエンティティ
		
		if(biEnt){
			// 背景を描画する
			
			this.ctx.drawImage(
					biEnt.imgObj,
					biEnt.orig_px,  // 元画像の切り抜き位置X
					biEnt.orig_py,  // 元画像の切り抜き位置Y
					biEnt.orig_width,  // 元画像の切り抜きサイズ：横幅
					biEnt.orig_height,  // 元画像の切り抜きサイズ：縦幅
					biEnt.px,  // ゲームキャンバスへの描画位置X
					biEnt.py,  // ゲームキャンバスへの描画位置Y
					biEnt.width ,  // ゲームキャンバスへの描画サイズ：横幅
					biEnt.height ,  // ゲームキャンバスへの描画サイズ：縦幅
		   		);

		}
		

	}
	
	_getBackImgEnt(back_img_id){

		let ent = null;
		
		// キャッシュに存在するなら、それを返す。
		for(let i in this.cashBackImgData){
			ent = this.cashBackImgData[i];
			if(ent.id = back_img_id){
				return ent;
			}
		}
		
		// キャッシュになかった場合、画像オブジェクトの生成などを行う。
		if(ent == null){
			let box = this.box;
			let backImgHm = this._getBackImgHm(); // 背景画像ハッシュマップを取得する
			if(backImgHm[back_img_id]){
				let dbEnt = backImgHm[back_img_id];
				ent = {};
				for(let field in dbEnt){
					ent[field] = dbEnt[field];
				}
				console.log(ent);//■■■□□□■■■□□□

				let img_fp = g_cbgConfig.storage_path + ent.img_fn;
				let imgObj = new Image();
				imgObj.src = img_fp;
				
				ent['imgObj'] = imgObj;
				ent['orig_px'] = 0;
				ent['orig_py'] = 0;
				ent['orig_width'] = imgObj.width;
				ent['orig_height'] = imgObj.height;
				ent['px'] = 0;
				ent['py'] = 0;
				ent['width'] =  (box.main_width + 10) * box.resolution;  // dWidth  (Canvasの描画サイズ：横幅) ※ 「+10」は補正値;
				ent['height'] =  box.main_height * box.resolution;   // dHeight (Canvasの描画サイズ：高さ)*/
				
				this.cashBackImgData.push(ent); // キャッシュに追加する。
				
				// キャッシュの保管数を超えたら、古いキャッシュから削除する。
				if(this.cashBackImgData.length > this.cash_back_img_cnt ){
					this.cashBackImgData.shift(); // 先頭要素を削除
				}
				 
			}
		}
		
		return ent;
	}
	
	// 背景画像ハッシュマップを取得する
	_getBackImgHm(){
		if(this.box.gameData){
			return this.box.gameData.backImgHm;
		}
		return null;
	}
	
}