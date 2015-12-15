//封装request对象
var xhr = new XMLHttpRequest();

function reload(){
	window.location.reload();
}

//iframe跳转
function goForm(url,id){
	$('#mainIframe').attr('src',url);
	//循环去掉所有li的 class="active";
	if(id != null){
		var lis = $('.active');
		for(var i=0;i<lis.length;i++){
			$(lis[i]).removeAttr('class');
		}
		$('#'+id).parent('li').attr('class','active');
	}
	
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

var dataTableInit = function(){
	dataTable.fnDestroy();
	init();
}

//弹窗
var aceAlert = function(text,title){
	if(!title){
		title = '提示';
	}
	$.gritter.add({
		title: title,
		text: text,
		//time: '',
		class_name: 'gritter-light'
	});
}

Timmer = (function($){
	var Timmer = function(Obj, fen, success, error){
		this.Obj = Obj; //需要操作的对象
		this.fen = fen; //队列大小
		this.len = 0; //当前所在位置
		this.queue = 0; //当前队列中数量
		this.error = error; //成功
		this.success = success; //失败
	};

	Timmer.prototype.start = function(){

		//判断是否再队列限制以内
		if( this.Obj.length <= this.fen  ){
			for( var i=0; i< this.obj.length; i++ ){
				this.add();
				this.ajax( 'post', this.Obj[i] );
			}
		}else{
			for( var i=0; i< this.fen; i++  ){
				this.add();
				this.ajax( 'post', this.Obj[i] );
			}
			//符合条件开始进行队列
			this.polling();
		};
	};

	Timmer.prototype.ajax = function(type, obj){

		//对当前的所在作用于赋值
		var curr = this;

		//ajax申请
		$.ajax({
			type: type,
			url: obj.url,
			data: obj.param,
			dataType: 'json',
			success: function(json){
				curr.success(obj.dom);
				curr.pop.call(curr);
			},
			error: function(json){
				curr.error(obj.dom);
				curr.pop.call(curr);
			}
		});
	}

	Timmer.prototype.polling = function(){

		var curr = this;
		var timeout = null;
		timeout = setInterval( function(){
			if( curr.len >= curr.Obj.length ){ //当是最后一个时结束
				clearTimeout(timeout);
			}else if( curr.fen > curr.queue ){
				curr.ajax( 'post', curr.Obj[curr.len] );
			}
		}, 100);
	}

	Timmer.prototype.pop = function(){
		this.len ++;
		this.queue --;
	}
	Timmer.prototype.add = function(){
		this.queue ++;
	}

	return Timmer;
})($);
