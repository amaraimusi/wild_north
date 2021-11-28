
///////////////////////  基本部分 ///////////////////////////////////////

		//基本ループの設定
		var canvas;
		var ctx;
		var i=0;
		var fps = 30;
		var now;
		var then = Date.now();
		var interval = 1000/fps;
		var delta;

		//初期イベント（DOM読込後のイベント）
		$(document).ready(function(){

			init();
			run();
		});

		function init(){
			  /* canvas要素のノードオブジェクト */
			  canvas = document.getElementById('canvassample');
			  /* canvas要素の存在チェックとCanvas未対応ブラウザの対処 */
			  if ( ! canvas || ! canvas.getContext ) {
			    return false;
			  }
			  /* 2Dコンテキスト */
			  ctx = canvas.getContext('2d');
		}

		//マルチスレッドを動かす。
		//fps間隔でメインとなるループを行っている。
		function run() {

		    requestAnimationFrame(run);

		    now = Date.now();
		    delta = now - then;

		    if (delta > interval) {

		    	thread();


		        then = now - (delta % interval);
		    }
		}

		//メインスレッド
		function thread() {

			if(ctx==null){return null;}

			i++;
			if(i==300){
				i=0;
			}
		  /* 四角を描く */
		  ctx.beginPath();//描画宣言
		  ctx.clearRect(0,0,200,200);//一度canvasをクリア
		  ctx.moveTo(10, 10);//始点
		  ctx.lineTo(150, i);//次の線の点
		  ctx.lineTo(5, 160);
		  ctx.closePath();//線を閉じる
		  ctx.fillText("hello world! 日本"+i, 15, 50);
		  ctx.stroke();//描画する
		}




//////////////////



var Class1 =function(){

	this.m_test=8;


	this.get=function(){


		return this.m_test;
	};

	this.set=function(test){
		this.m_test=test;
	};



};

var ActorFactory =function(){

	this.create=function(){
		var act=new Actor();
		return act;
	};


};

var Actor =function(){

	this.x;
	this.y;

	this.rect;


	this.get=function(){


		return this.m_test;
	};

	this.set=function(test){
		this.m_test=test;
	};



};

var Rect =function(){

	this.x1;
	this.y1;
	this.x2;
	this.t2;
	this.x3;
	this.y3;
	this.x4;
	this.y4;



//	this.get=function(){
//
//
//		return this.m_test;
//	};
//
//	this.set=function(test){
//		this.m_test=test;
//	};



};



