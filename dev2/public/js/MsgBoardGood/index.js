
var msg_board_gooduta = 128;


jQuery(()=> {
	init();//初期化
	
	$('#msg_board_good_tbl').show();// 高速表示のためテーブルは最後に表示する
	
});


var crudBase;//AjaxによるCRUD

/**
 *  メッセージボード・いいね画面の初期化
 * 
  * ◇主に以下の処理を行う。
 * - 日付系の検索入力フォームにJQueryカレンダーを組み込む
 * - 列表示切替機能の組み込み
 * - 数値範囲系の検索入力フォームに数値範囲入力スライダーを組み込む
 * 
 * @version 1.2.2
 * @date 2015-9-16 | 2018-9-8
 * @author k-uehara
 */
function init(){
	let csrf_token = jQuery('#csrf_token').val(); // CSRFトークンを取得（Ajaxで必要）

	let crud_base_json = jQuery('#crud_base_json').val();
	let crudBaseData = jQuery.parseJSON(crud_base_json);
	crudBaseData['csrf_token'] = csrf_token;

	crudBaseData['ni_tr_place'] = 1; // 新規入力追加場所フラグ 0:末尾(デフォルト） , 1:先頭
	crudBaseData['configData'] = {delete_alert_flg:1} // 削除アラートフラグ    1:一覧行の削除ボタンを押したときアラートを表示する
	
	// CRUD基本クラス
	crudBase = new CrudBase(crudBaseData);
	
	// 検索条件バリデーション情報のセッター
	let validMethods =_getValidMethods();
	crudBase.setKjsValidationForJq(
			'#msg_board_goodIndexForm',
			crudBaseData,
			validMethods,
	);

	
	

	// 表示フィルターデータの定義とセット
	var disFilData = {
			// CBBXS-1008
			'delete_flg':{
				'fil_type':'delete_flg',
			},

			// CBBXE
			
	};
	
	// CBBXS-2023

	// CBBXE

	
	crudBase.setDisplayFilterData(disFilData);

	//列並替変更フラグがON（列並べ替え実行）なら列表示切替情報をリセットする。
	if(localStorage.getItem('clm_sort_chg_flg') == 1){
		this.crudBase.csh.reset();//列表示切替情報をリセット
		localStorage.removeItem('clm_sort_chg_flg');
	}

	// 新規入力フォームのinput要素にEnterキー押下イベントを組み込む。
	$('#ajax_crud_new_inp_form input').keypress(function(e){
		if(e.which==13){ // Enterキーである場合
			newInpReg(); // 登録処理
		}
	});
	
	// 編集フォームのinput要素にEnterキー押下イベントを組み込む。
	$('#ajax_crud_edit_form input').keypress(function(e){
		if(e.which==13){ // Enterキーである場合
			editReg(); // 登録処理
		}
	});
	
	// CrudBase一括追加機能の初期化
	var today = new Date().toLocaleDateString();
	crudBase.crudBaseBulkAdd.init(
		[
			// CBBXS-2010
			{'field':'id', 'inp_type':'textarea'}, 
			{'field':'msg_board_id', 'inp_type':'textarea'}, 
			{'field':'user_id', 'inp_type':'textarea'}, 
			{'field':'sort_no', 'inp_type':'textarea'}, 
			{'field':'delete_flg', 'inp_type':'textarea'}, 

			// CBBXE
			
//			{'field':'msg_board_good_group', 'inp_type':'select', 'list':msg_board_goodGroupList, 'def':2}, 
//			{'field':'msg_board_good_date', 'inp_type':'date', 'def':today}, 
//			{'field':'note', 'inp_type':'text', 'def':'TEST'}, 
//			{'field':'sort_no', 'inp_type':'sort_no', 'def':1}, 
		],
		{
			ajax_url:'msg_board_good/bulk_reg',
			csrf_token:csrf_token,
			ta_placeholder:"Excelからコピーしたメッセージボード・いいね名、メッセージボード・いいね数値を貼り付けてください。（タブ区切りテキスト）\n(例)\nメッセージボード・いいね名A\t100\nメッセージボード・いいね名B\t101\n",
		}
	);
	
	crudBase.newVersionReload(); // 新バージョンリロード
}


/**
 * 検索条件バリデーション情報のセッター
 */
function _getValidMethods(){
	let methods = {
			// CBBXS-2011
			kj_id:(cbv, value)=>{
				let err = '';
				// 自然数バリデーション
				if(!cbv.isNaturalNumber(value)){
					err = '自然数で入力してください。';
				}
				return err;
			},
			kj_msg_board_id:(cbv, value)=>{
				let err = '';
				// 自然数バリデーション
				if(!cbv.isNaturalNumber(value)){
					err = '自然数で入力してください。';
				}
				return err;
			},
			kj_user_id:(cbv, value)=>{
				let err = '';
				// 自然数バリデーション
				if(!cbv.isNaturalNumber(value)){
					err = '自然数で入力してください。';
				}
				return err;
			},
			kj_update_user:(cbv, value)=>{
				let err = '';
				// 文字数バリデーション
				if(!cbv.isMaxLength(value, 50)){
					err = '50文字以内で入力してくだい。';
				}
				return err;
			},
			kj_ip_addr:(cbv, value)=>{
				let err = '';
				// 文字数バリデーション
				if(!cbv.isMaxLength(value, 40)){
					err = '40文字以内で入力してくだい。';
				}
				return err;
			},

			// CBBXE

	}
	return methods;
}


/**
 * 新規入力フォームを表示
 * @param btnElm ボタン要素
 */
function newInpShow(btnElm, ni_tr_place){
	crudBase.newInpShow(btnElm, {'ni_tr_place':ni_tr_place});
}

/**
 * 編集フォームを表示
 * @param btnElm ボタン要素
 */
function editShow(btnElm){
	var option = {};
	crudBase.editShow(btnElm,option);
}



/**
 * 複製フォームを表示（新規入力フォームと同じ）
 * @param btnElm ボタン要素
 */
function copyShow(btnElm){
	crudBase.copyShow(btnElm);
}


/**
 * 削除アクション
 * @param btnElm ボタン要素
 */
function deleteAction(btnElm){
	crudBase.deleteAction(btnElm);
}


/**
 * 有効アクション
 * @param btnElm ボタン要素
 */
function enabledAction(btnElm){
	crudBase.enabledAction(btnElm);
}


/**
 * 抹消フォーム表示
 * @param btnElm ボタン要素
 */
function eliminateShow(btnElm){
	crudBase.eliminateShow(btnElm);
}

/**
 * 詳細検索フォーム表示切替
 * 
 * 詳細ボタンを押した時に、実行される関数で、詳細検索フォームなどを表示します。
 */
function show_kj_detail(){
	$("#kjs2").fadeToggle();
}

/**
 * フォームを閉じる
 * @parma string form_type new_inp:新規入力 edit:編集 delete:削除
 */
function closeForm(form_type){
	crudBase.closeForm(form_type)
}


/**
 * 検索条件をリセット
 * 
 * すべての検索条件入力フォームの値をデフォルトに戻します。
 * リセット対象外を指定することも可能です。
 * @param array exempts リセット対象外フィールド配列（省略可）
 */
function resetKjs(exempts){
	
	crudBase.resetKjs(exempts);
	
}


/**
 * 新規入力フォームの登録ボタンアクション
 */
function newInpReg(){
	crudBase.newInpReg(null,null);
}

/**
 * 編集フォームの登録ボタンアクション
 */
function editReg(){
	crudBase.editReg(null,null);
}

/**
 * 削除フォームの削除ボタンアクション
 */
function deleteReg(){
	crudBase.deleteReg();
}

/**
 * 抹消フォームの抹消ボタンアクション
 */
function eliminateReg(){
	crudBase.eliminateReg();
}


/**
 * リアクティブ機能：TRからDIVへ反映
 * @param div_slt DIV要素のセレクタ
 */
function trToDiv(div_slt){
	crudBase.trToDiv(div_slt);
}

/**
 * 行入替機能のフォームを表示
 * @param btnElm ボタン要素
 */
function rowExchangeShowForm(btnElm){
	crudBase.rowExchangeShowForm(btnElm);
}

/**
 * 自動保存の依頼をする
 * 
 * @note
 * バックグランドでHTMLテーブルのデータをすべてDBへ保存する。
 * 二重処理を防止するメカニズムあり。
 */
function saveRequest(){
	crudBase.saveRequest();
}


/**
 * セッションクリア
 * 
 */
function sessionClear(){
	crudBase.sessionClear();
	
}


/**
 * テーブル変形
 * @param mode_no モード番号  0:テーブルモード , 1:区分モード
 */
function tableTransform(mode_no){

	crudBase.tableTransform(mode_no);

}

/**
 * 検索実行
 */
function searchKjs(){
	crudBase.searchKjs();
}

/**
 * カレンダーモード
 */
function calendarViewKShow(){
	// カレンダービューを生成 
	crudBase.calendarViewCreate('msg_board_good_date');
}

