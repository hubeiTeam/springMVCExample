var base = {
	init: function(){
		this.nav();
	},

	nav: function(){ //导航部分
		$(".nav>li").on("mouseover", function(){
			$(this).siblings().removeClass('nav_act');
			$(this).addClass("nav_act");
			$(this).find(".dropbox").show();
		});
		$(".nav>li").on("mouseout", function(){
			$(this).removeClass('nav_act');
			$(this).find(".dropbox").hide();
		});
	}
}

$(function(){
	base.init();
});

function message(dom,text,href,at){
	var _html = "";
	_html += "<div class='message'><span>"+ text +"</span>";
	if( href.length >0 ){
		_html += '<a href="'+ href +'">'+ at +'</a>';
	}
	_html +='</div>';
	dom.html(_html);
}

function pop(text, callback){

	//移出其他的 .pop；
	$(".pop").remove();

	//pop框的div 和代码
	var _html = '<div class="pop" style="position: fixed; background:#FFF; top: 50%; left: 50%; margin-left: -175px; width: 350px; border:1px solid #0099CC; font-size: 16px; z-index:999;">';
	_html += '<p class="pop-title" style="margin: 0; padding: 0; line-height: 2em; padding: 0 10px; background: #0099CC; color: #FFF;">提示</p>';
	_html += '<div class="pop-content" style="padding: 10px; font-weight: bold; line-height:1.5em; text-indent:2em;">'+ text +'</div>';
	_html += '<div class="pop-footer" style="padding-bottom: 10px;">';
	if( callback ){
		_html += '<a class="pop-bottum-hide" style="display: inline-block; float: right; height: 28px; line-height: 28px; color: #0099CC; padding: 0 10px; margin-right: 10px; border: 1px solid #0099CC;">取消</a>';
		_html += '<a class="pop-bottum-access" style="display: inline-block; float: right; height: 30px; line-height: 30px; color: #FFF; padding: 0 10px; margin-right: 10px; background: #0099CC;">确定</a>';
	}else{
		_html += '<a class="pop-bottum-hide" style="display: inline-block; float: right; height: 30px; line-height: 30px; color: #FFF; padding: 0 10px; margin-right: 10px; background: #0099CC;">确定</a>';
	}

	_html += '<div style="clear:both;"></div></div>';
	_html += '</div>';

	_html += '<div class="fiexder" style="position: fixed; top:0; left:0; height:100%; width:100%; background:#333; z-index:998;filter:alpha(opacity=50); opacity: 0.5; -moz-opacity:0.5; "></div>';

	//生成的html插入body中
	$('body').append(_html);

	//计算出来高度 并设置
	var b_h = $('.pop').height();
	$('.pop').css({
		"margin-top": -b_h/2
	});

	//绑定点击事件，并执行回调
	$('.pop .pop-bottum-access').on("click", function(){
		setTimeout(callback, 10);
		$('.fiexder').remove();
	});
	$('.pop .pop-bottum-hide').on("click", function(){
		$('.pop').remove();
		$('.fiexder').remove();
	});
};

//错误提示
function inputError(dom, text){
	// dom.addClass('error');
	dom.parent("td").next().html('<span class="input_error" ><i class="icon-error fl"></i><span class="fl">'+ text +'</span>');
	dom.focus();
}

//清空错误提示
function clearError(){
	// $(document).find('td .error').removeClass('error');
	$(document).find('td .input_error').remove();
}

//获取时间格式
function formatDate(time){ 
	var now = new Date( parseInt(time) );
  	var   year=now.getFullYear();
  	var   month=now.getMonth()+1;
  	if(0<month && month<10){
  		month = "0"+month;
  	}   
  	var   date=now.getDate();
  	if(0<date && date<10){
  		date = "0"+date;
  	}           
  	return year+"-"+month+"-"+date;       
}

//获取状态
function getStatus(status){
	var ret = {};
	switch(status){
		case 'WORK_ING':
			ret.name = "工作中";
			ret.code = "WORK_ING";
			break;
		case 'HOUR_24':
			ret.name = "紧急招聘中";
			ret.code = "HOUR_24";
			break;
		case 'WORK_COMPLETE':
			ret.name = "工作结束";
			ret.code = "WORK_COMPLETE";
			break;
		case 'VERIFI_FULL':
			ret.name = "审核已满";
			ret.code = "VERIFI_FULL";
			break;
		case 'CLOSE':
			ret.name = "关闭";
			ret.code = "CLOSE";
			break;
		case 'PAY_COMPLETE':
			ret.name = "审核中";
			ret.code = "PAY_COMPLETE";
			break;
		case 'COMPLETE':
			ret.name = "已完成";
			ret.code = "COMPLETE";
			break;
		case 'INIT':
			ret.name = "未付款";
			ret.code = "INIT";
			break;
		case 'VERIFICATION_FAIL':
			ret.name = "审核失败";
			ret.code = "VERIFICATION_FAIL";
			break;
		case 'SIGN_UP_FULL':
			ret.name = "报名已满";
			ret.code = "SIGN_UP_FULL";
			break;
		case 'HOUR_24_VERIFI_FULL':
			ret.name = "审核已满";
			ret.code = "HOUR_24_VERIFI_FULL";
			break;
		case 'PUBLISH_ING':
			ret.name = "发布中";
			ret.code = "PUBLISH_ING";
			break;
		case 'HOUR_24_SIGN_UP_FULL':
			ret.name = "报名已满";
		default:
			ret.name = "无状态";
			ret.code = "red";
			break;
	}
	return ret;
}

//加载中
function loadmore(){

	$('.loadmore').text("加载中...");
	$('.loadmore').removeClass('nomore');
}

//加载完成
function loadready(){
	$('.loadmore').text("加载更多");
	$('.loadmore').removeClass('nomore');
}

//没有更多数据
function nomore(){
	$('.loadmore').text("没有更多数据");
	$('.loadmore').addClass('nomore');
}
function changeChecked(obj){
	if( $(obj).is(".checked") ){
		$(obj).removeClass('checked');
	}else{
		$(obj).addClass('checked');
	}

}

function reload(){
	window.location.reload();
}

Date.prototype.format = function(format) {
    var date = {
           "M+": this.getMonth() + 1,
           "d+": this.getDate(),
           "H+": this.getHours(),
           "m+": this.getMinutes(),
           "s+": this.getSeconds(),
           "q+": Math.floor((this.getMonth() + 3) / 3),
           "S+": this.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
           format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
           if (new RegExp("(" + k + ")").test(format)) {
                  format = format.replace(RegExp.$1, RegExp.$1.length == 1
                         ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
           }
    }
    return format;
}

function tablebg( table ){
	var a = table.find('tr');
	a.removeClass('bac-f5');
	a.each(function(i){
		if( i%2 == 1 ){
			$(this).addClass('bac-f5')
		}
	});
}

