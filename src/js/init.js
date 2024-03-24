/*===========================================================*/
/* 機能編 5-1-1 ドロップダウンメニュー（上）*/
/*===========================================================*/

//ドロップダウンの設定を関数でまとめる
function mediaQueriesWin(){
	var width = $(window).width();
	if(width <= 960) {//横幅が960px以下の場合
		$(".has-child>a").off('click');	//has-childクラスがついたaタグのonイベントを複数登録を避ける為offにして一旦初期状態へ
		$(".has-child>a").on('click', function() {//has-childクラスがついたaタグをクリックしたら
			var parentElem =  $(this).parent();// aタグから見た親要素の<li>を取得し
			$(parentElem).toggleClass('active');//矢印方向を変えるためのクラス名を付与して
			$(parentElem).children('ul').stop().slideToggle(500);//liの子要素のスライドを開閉させる※数字が大きくなるほどゆっくり開く
			return false;//リンクの無効化
		});
	}else{//横幅が960px以上の場合
		$(".has-child>a").off('click');//has-childクラスがついたaタグのonイベントをoff(無効)にし
		$(".has-child>a").removeClass('active');//activeクラスを削除
		$('.has-child').children('ul').css("display","");//スライドトグルで動作したdisplayも無効化にする
	}
}

/*===========================================================*/
/* 機能編 5-1-6 スクロール途中から上部固定 */
/*===========================================================*/

//スクロール途中からヘッダーを出現させるための設定を関数でまとめる
function FixedAnime() {
	var elemTop = $('#service').offset().top;//#serviceの位置まできたら
	var scroll = $(window).scrollTop();

	if(scroll <= 20){//上から20pxスクロールされたら
		$('#header').addClass('DownMove');//DownMoveというクラス名を除き
	} else if (scroll >= elemTop){
			$('#header').removeClass('UpMove');//#headerについているUpMoveというクラス名を除く
			$('#header').addClass('DownMove');//#headerについているDownMoveというクラス名を付与

		}else{
			if($('#header').hasClass('DownMove')){//すでに#headerにDownMoveというクラス名がついていたら
				$('#header').removeClass('DownMove');//DownMoveというクラス名を除き
				$('#header').addClass('UpMove');//UpnMoveというクラス名を付与
			}
		}
}

/*===========================================================*/
/* 機能編 5-1-11 クリックしたらナビが上から下に出現 */
/*===========================================================*/

$(".g-nav-openbtn").click(function () {//ボタンがクリックされたら
	$(this).toggleClass('active');//ボタン自身に activeクラスを付与し
    $("#g-nav").toggleClass('panelactive');//ナビゲーションにpanelactiveクラスを付与
});

$("#g-nav a").click(function () {//ナビゲーションのリンクがクリックされたら
    $(".g-nav-openbtn").removeClass('active');//ボタンの activeクラスを除去し
    $("#g-nav").removeClass('panelactive');//ナビゲーションのpanelactiveクラスも除去
});

/*===========================================================*/
/*機能編 8-1-4 ページの指定の範囲内で出現（右から左）*/
/*===========================================================*/

//スクロールした際の動きを関数でまとめる
function setFadeElement(){
	var windowH = $(window).height();	//ウィンドウの高さを取得
	var scroll = $(window).scrollTop(); //スクロール値を取得
    
    //出現範囲の指定
	var contentsTop = Math.round($('#contact').offset().top);	//要素までの高さ四捨五入した値を取得
	var contentsH = $('#contact').outerHeight(true);	//要素の高さを取得
    
    //2つ目の出現範囲の指定※任意
	var contentsTop2 = Math.round($('#footer').offset().top);	//要素までの高さ四捨五入した値を取得
	var contentsH2 = $('#footer').outerHeight(true);//要素の高さを取得

    //出現範囲内に入ったかどうかをチェック
	if(scroll+windowH >= contentsTop && scroll+windowH  <= contentsTop+contentsH){
		$("#page-top").addClass("LeftMove");    //入っていたらLeftMoveをクラス追加
		$("#page-top").removeClass("RightMove");   //RightMoveを削除
		$(".hide-btn").removeClass("hide-btn");	  //hide-btnを削除
	}//2つ目の出現範囲に入ったかどうかをチェック※任意
    else if(scroll+windowH >= contentsTop2 && scroll+windowH <= contentsTop2+contentsH2){       
		$("#page-top").addClass("LeftMove");    //入っていたらLeftMoveをクラス追加
		$("#page-top").removeClass("RightMove");   //RightMoveを削除
	}//それ以外は
    else{
        if(!$(".hide-btn").length){				//サイト表示時にRightMoveクラスを一瞬付与させないためのクラス付け。hide-btnがなければ下記の動作を行う
        $("#page-top").addClass("RightMove");  //RightMoveをクラス追加
		$("#page-top").removeClass("LeftMove"); //LeftMoveを削除	
        }
	}
}

// #page-topをクリックした際の設定
$('#page-top').click(function () {
    $('body,html').animate({
        scrollTop: 0//ページトップまでスクロール
    }, 500);//ページトップスクロールの速さ。数字が大きいほど遅くなる
    return false;//リンク自体の無効化
});

/*===========================================================*/
/*機能編 5-4-1タブメニュー*/
/*===========================================================*/

//任意のタブにURLからリンクするための設定
function GethashID (hashIDName){
	if(hashIDName){
		//タブ設定
		$('.tab li').find('a').each(function() { //タブ内のaタグ全てを取得
			var idName = $(this).attr('href'); //タブ内のaタグのリンク名（例）#lunchの値を取得	
			if(idName == hashIDName){ //リンク元の指定されたURLのハッシュタグ（例）http://example.com/#lunch←この#の値とタブ内のリンク名（例）#lunchが同じかをチェック
				var parentElm = $(this).parent(); //タブ内のaタグの親要素（li）を取得
				$('.tab li').removeClass("active"); //タブ内のliについているactiveクラスを取り除き
				$(parentElm).addClass("active"); //リンク元の指定されたURLのハッシュタグとタブ内のリンク名が同じであれば、liにactiveクラスを追加
				//表示させるエリア設定
				$(".area").removeClass("is-active"); //もともとついているis-activeクラスを取り除き
				$(hashIDName).addClass("is-active"); //表示させたいエリアのタブリンク名をクリックしたら、表示エリアにis-activeクラスを追加	
			}
		});
	}
}

//タブをクリックしたら
$('.tab a').on('click', function() {
	var idName = $(this).attr('href'); //タブ内のリンク名を取得	
	GethashID (idName);//設定したタブの読み込みと
	return false;//aタグを無効にする
});


// 上記の動きをページが読み込まれたらすぐに動かす
$(window).on('load', function () {
    $('.tab li:first-of-type').addClass("active"); //最初のliにactiveクラスを追加
    $('.area:first-of-type').addClass("is-active"); //最初の.areaにis-activeクラスを追加
	var hashName = location.hash; //リンク元の指定されたURLのハッシュタグを取得
	GethashID (hashName);//設定したタブの読み込み
});

//タブをクリックしたら
$('.tab a').on('click', function() {
	var idName = $(this).attr('href'); //タブ内のリンク名を取得	
	GethashID (idName);//設定したタブの読み込みと
	return false;//aタグを無効にする
});

/*===========================================================*/
/* 機能編 6-1-4 動きを組み合わせて全画面で見せる*/
/*===========================================================*/

//画像の設定

var windowwidth = window.innerWidth || document.documentElement.clientWidth || 0;
		if (windowwidth > 768){
			var responsiveImage = [//PC用の画像
				{ src: './img/main_01.jpg'},
				{ src: './img/main_02.jpg'},
				{ src: './img/main_03.jpg'}
			];
		} else {
			var responsiveImage = [//タブレットサイズ（768px）以下用の画像
				{ src: './img/main_01_sp.jpg' },
				{ src: './img/main_02_sp.jpg' },
				{ src: './img/main_03_sp.jpg' }
			];
		}

//Vegas全体の設定


/*===========================================================*/
/* 機能編 7-2-2 虫眼鏡マークをクリックすると全画面表示で検索窓が出現 */
/*===========================================================*/

//開くボタンを押した時には
$(".open-btn").click(function () {
    $("#search-wrap").addClass('panelactive');//#search-wrapへpanelactiveクラスを付与
	$('#search-text').focus();//テキスト入力のinputにフォーカス
});

//閉じるボタンを押した時には
$(".close-btn").click(function () {
    $("#search-wrap").removeClass('panelactive');//#search-wrapからpanelactiveクラスを除去
});

/*===========================================================*/
/* 印象編 4 最低限おぼえておきたい動き */
/*===========================================================*/

// 動きのきっかけの起点となるアニメーションの名前を定義
function fadeAnime(){

    // 印象編 4-9、4-10 背景色が伸びて出現（左から・右から）中の要素が出現
    $('.bgappearTrigger').each(function(){ //bgappearTriggerというクラス名が
		var elemPos = $(this).offset().top-50;//要素より、50px上の
		var scroll = $(window).scrollTop();
		var windowHeight = $(window).height();
		if (scroll >= elemPos - windowHeight){
			$(this).addClass('bgappear');// 画面内に入ったらbgappearというクラス名を追記
		}else{
			$(this).removeClass('bgappear');// 画面外に出たらbgappearというクラス名を外す
		}
	});	
    //印象編 4-9 背景色が伸びて出現（左から）
	$('.bgLRextendTrigger').each(function(){ //bgLRextendTriggerというクラス名が
		var elemPos = $(this).offset().top-50;//要素より、50px上の
		var scroll = $(window).scrollTop();
		var windowHeight = $(window).height();
		if (scroll >= elemPos - windowHeight){
			$(this).addClass('bgLRextend');// 画面内に入ったらbgLRextendというクラス名を追記
		}else{
			$(this).removeClass('bgLRextend');// 画面外に出たらbgLRextendというクラス名を外す
		}
	});	
    //印象編 4-9 背景色が伸びて出現（右から）
    $('.bgRLextendTrigger').each(function(){ //bgRLextendTriggerというクラス名が
		var elemPos = $(this).offset().top-50;//要素より、50px上の
		var scroll = $(window).scrollTop();
		var windowHeight = $(window).height();
		if (scroll >= elemPos - windowHeight){
			$(this).addClass('bgRLextend');// 画面内に入ったらbgRLextendというクラス名を追記
		}else{
			$(this).removeClass('bgRLextend');// 画面外に出たらbgRLextendというクラス名を外す
		}
	});
    //service-areaスタート
      $('.service-area').each(function(){ //service-areaというクラス名が
		var elemPos = $(this).offset().top-50;//要素より、50px上の
		var scroll = $(window).scrollTop();
		var windowHeight = $(window).height();
		if (scroll >= elemPos - windowHeight){
			$(this).addClass('startwd');// 画面内に入ったらstartwdというクラス名を追記
		}else{
			$(this).removeClass('startwd');// 画面外に出たらstartwdというクラス名を外す
		}
	});  
}

/*===========================================================*/
/*  印象編 8-6 アルファベットがランダムに変化して出現*/
/*===========================================================*/
var arr = []
//初期値の設定
function TypingInit() {
	$('.js_typing').each(function (i) { //js_typingクラスを全て処理をおこなう
		arr[i] = new ShuffleText(this);//動作させるテキストを配列に格納
	});
}
//スクロールした際のアニメーションの設定
function TypingAnime() {
	$(".js_typing").each(function (i) {
		var elemPos = $(this).offset().top - 50;//要素より、50px上の
		var scroll = $(window).scrollTop();
		var windowHeight = $(window).height();
		if (scroll >= elemPos - windowHeight) {
			if(!$(this).hasClass("endAnime")){//endAnimeのクラスがあるかチェック
				arr[i].start();//配列で登録テキストのアニメーションをおこなう
				arr[i].duration = 800;//テキストが最終変化するまでの時間※規定値600
				$(this).addClass("endAnime");//１度アニメーションした場合はendAnimeクラスを追加
			}
		}else{
			$(this).removeClass("endAnime"); //範囲外にスクロールした場合はendAnimeのクラスを削除
		}
	});
}

/*===========================================================*/
/* 関数をまとめる */
/*===========================================================*/


// ページがリサイズされたら動かしたい場合の記述
$(window).resize(function() {
	mediaQueriesWin();// 機能編 5-1-1 ドロップダウンメニュー（上）の関数を呼ぶ
});

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
	FixedAnime();// 機能編 5-1-6 スクロール途中から上部固定
	setFadeElement();// 機能編 8-1-4 ページの指定の範囲内で出現（右から左）の関数を呼ぶ
    fadeAnime();// 印象編 4 最低限おぼえておきたい動きの関数を呼ぶ
	TypingInit(); // 印象編 8-6 アルファベットがランダムに変化して出現 初期設定
	TypingAnime();// 印象編 8-6 アルファベットがランダムに変化して出現の関数を呼ぶ
});

// ページが読み込まれたらすぐに動かしたい場合の記述
$(window).on('load',function(){

    $("#splash-logo").delay(1200).fadeOut('slow');//ロゴを1.2秒でフェードアウトする記述

    //=====ここからローディングエリア（splashエリア）を1.5秒でフェードアウトした後に動かしたいJSをまとめる
    $("#splash").delay(1500).fadeOut('slow',function(){
    
    $('body').addClass('appear');//フェードアウト後bodyにappearクラス付与 
    
    mediaQueriesWin();// 機能編 5-1-1 ドロップダウンメニュー（上）の関数を呼ぶ
	FixedAnime();// 機能編 5-1-6 スクロール途中から上部固定
	setFadeElement();// 機能編 8-1-4  ページトップリンク:ページの指定の範囲内で出現（右から左）の関数を呼ぶ
    
    /*機能編 5-4-1タブメニューの読み込み*/
    var hashName = location.hash; //リンク元の指定されたURLのハッシュタグを取得
	GethashID (hashName);//設定したタブの読み込み   
        
	});
    //=====ここまでローディングエリア（splashエリア）を1.5秒でフェードアウトした後に動かしたいJSをまとめる

    /*===========================================================*/
    /*機能編 4-2-4背景色が伸びる（左から右） */
    /*===========================================================*/

    //=====ここから背景が伸びた後に動かしたいJSをまとめる
    $('.splashbg').on('animationend', function() {
        
    /* 印象編 4 最低限おぼえておきたい動きの関数を呼ぶ*/
    fadeAnime();        
    // 印象編 8-6 アルファベットがランダムに変化して出現 
	$(".endAnime").removeClass("endAnime");
	TypingInit(); //印象編 8-6 アルファベットがランダムに変化して出現 初期設定
	TypingAnime();//印象編 8-6 アルファベットがランダムに変化して出現  

    });
    //=====ここまで背景が伸びた後に動かしたいJSをまとめる
    
});// ここまでページが読み込まれたらすぐに動かしたい場合の記述




































$(document).ready(function(){
    // モーダルの表示
    $(".modalBtn").click(function(){
        var index = $(this).data("index");
        $("#modal").css("display", "block");
        // body要素にoverflow:hiddenを設定してスクロールを禁止
        $("body").css("overflow", "hidden");
        
        // モーダルが開かれるたびに全ての色情報を非表示にする
        $(".color1, .color2, .color3, .color4").addClass("hide");
        
        // JSONからデータを読み込む
        $.getJSON("./data/data.json", function(data) {
            displayModalContent(data[index]);
        });
    });

    // モーダルの背景をクリックしてモーダルを閉じる
    $("#modal").click(function(event){
        if(event.target.id === "modal"){
            $("#modal").css("display", "none");
            // body要素のoverflow:hiddenを解除してスクロールを許可
            $("body").css("overflow", "auto");
        }
    });

    // 閉じるボタンがクリックされたときの処理
    $(".close").click(function(){
        $("#modal").css("display", "none");
        // body要素のoverflow:hiddenを解除してスクロールを許可
        $("body").css("overflow", "auto");
    });

    // モーダルの内容を表示
    function displayModalContent(data) {
        $(".name").text("Name: " + data.name);
        $(".age").text("Age: " + data.age);
        $(".city").text("City: " + data.city);
        // JSONデータが存在する場合のみ該当する要素を表示
        if(data.color1) {
            $(".color1").removeClass("hide");
            $(".color1Link").text(data.color1.name).attr("href", data.color1.link);
        }
        if(data.color2) {
            $(".color2").removeClass("hide");
            $(".color2Link").text(data.color2.name).attr("href", data.color2.link);
        }
        if(data.color3) {
            $(".color3").removeClass("hide");
            $(".color3Link").text(data.color3.name).attr("href", data.color3.link);
        }
        if(data.color4) {
            $(".color4").removeClass("hide");
            $(".color4Link").text(data.color4.name).attr("href", data.color4.link);
        }
    }
});


$(".l-nav-btn").click(function () {//ボタンがクリックされたら
	$(this).toggleClass('is-active');//ボタン自身に activeクラスを付与し
    $(".l-nav-global").toggleClass('is-active');//ナビゲーションにpanelactiveクラスを付与
});