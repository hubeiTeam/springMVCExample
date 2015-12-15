var statusOption = {}; //各个状态的页数
var status = ''; //当前所在状态

$(function(){
	$(document).on("click", ".tab a" ,function(){
		$('.tab-box').hide();
		$('.tab>a').removeClass('avt');
		$(this).addClass('avt');
		var d = $(this).attr('data');
		$('.tab-box[data='+ d +']').show();
		status = d;
		getCount( d , true);
	});

	$(document).on("click", ".tab-box .loadmore", function(){
		if( $(this).is('.nomore') ){
			return false;
		}
		var d = $(this).parents('.tab-box').attr('data');
		statusOption[d].currPage ++;
		getList(d);
	});

	$(document).on("click", ".tab-box .searchOne", function(){
		var dom = $(this).parents('.tab-box')
		var d = dom.attr('data');
		statusOption[d].beginTime = dom.find('input[name=createstart]').val();
		statusOption[d].endTime = dom.find('input[name=createend]').val();
		statusOption[d].createBeginTime = dom.find('input[name=workstart]').val();
		statusOption[d].createEndTime = dom.find('input[name=workend]').val();
		dom.find('tbody').html('');
		//getList(d);
		getCount(d);
	});

	$(document).on("click", ".tab-box .searchAll", function(){
		var dom = $(this).parents('.tab-box')
		var d = dom.attr('data');
		statusOption[d].beginTime = '';
		statusOption[d].endTime = '';
		statusOption[d].createBeginTime = '';
		statusOption[d].createEndTime = '';
		dom.find('tbody').html('');
		dom.find('input[name=createstart]').val('');
		dom.find('input[name=createend]').val('');
		dom.find('input[name=workstart]').val('');
		dom.find('input[name=workend]').val('');
		// getList(d);
		getCount(d);
	});

	$(document).find('.tab a[data=complete]').click();


});

//获取页面统计
function getCount(d, f){
	if( statusOption[d] && f ){
		return false;
	}
	if(!statusOption[d]){
		var option = statusOption[d] = {beginTime:'', endTime: '', createBeginTime: '', createEndTime:'', status: status , currPage: 1, pageSize: 10 }
	}else{
		var option = statusOption[d];
	}
	
	$.get('/merchant/getPluralismPostListByCount.json',statusOption[status], function(json){
		json.status = status;
		var _html = template('countTpl', json);
		$('.tab-box[data='+ d +']').html( _html );
		getList(d);
	});
}

//获取列表数据
function getList(d){
	//console.log(statusOption);
	var dom = $('.tab-box[data='+ d +']');
	//加载中
	_loadmore(dom);
	if(!statusOption[d]){
		var option = statusOption[d] = {beginTime:'', endTime: '', createBeginTime: '', createEndTime:'', status: status , currPage: 1, pageSize: 10 }
	}else{
		var option = statusOption[d];
	}
	//console.log( option );
	$.get('/merchant/getPluralismPostListByPage.json', {
			"beginTime" : option.beginTime,
			"endTime" : option.endTime,
			"createBeginTime" : option.createBeginTime,
			"createEndTime" : option.createEndTime,
			"currPage" : option.currPage,
			"pageSize" : option.pageSize,
			"status" : option.status
	}, function(json){
		if( json && json.datas.length ){
			for(var i=0; i<json.datas.length; i++){
				json.datas[i] = format(json.datas[i]);
			}
			if( json.datas.length < option['pageSize'] ){
				//没有更多数据
				_nomore(dom);
			}else{
				//加载完成
				_loadready(dom);
			}
			applyTempMore(json);
		}else{
			if( option['currPage'] == 1 ){
				//列表为空
				_nolist(dom);
			}else{
				//没有更多数据
				_nomore(dom);
			}
			
		}
	}, 'json');
}

//渲染加载更多
function applyTempMore(json){
	var html = template('listTpl', json);
	$('.tab-box[data='+ status +'] tbody').append( html );
	loadready();
	tablebg( $('#table tbody') );
}


//格式数据
function format(data){
	data.createTime = formatDate(data.createTime);
	data.workDate = formatDate(data.workDate);
	data.status = getStatus(data.status);
	return data;
}

//加载中
function _loadmore(d){
	d.find('.loadmore').show();
	d.find('.loadmore').text("加载中...");
	d.find('.loadmore').addClass('nomore');
	d.find('.nolist').remove();
}

//加载完成
function _loadready(d){
	d.find('.loadmore').text("加载更多");
	d.find('.loadmore').removeClass('nomore');
}

//没有更多数据
function _nomore(d){
	d.find('.loadmore').text("没有更多数据");
	d.find('.loadmore').addClass('nomore');
}

//空列表
function _nolist(d){
	d.append('<div class="nolist">没有岗位内容</div>');
	d.find('.loadmore').hide();
}

