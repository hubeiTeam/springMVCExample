var changePasswd = {
	init: function(){
		this.bind();
	},
	bind: function(){
		$("#submit").on("click", function(){
			var data = changePasswd.validate();//进行验证
			if( data ){
				changePasswd.submit( data );
			}
		});
	},
	validate: function(){
		var oldpassd = $("input[name=oldpassd]");
		var newpassd = $("input[name=newpassd]");
		var renewpassd = $("input[name=renewpassd]");

		//验证密码是否相等
		if( oldpassd.val().length<6 ){
			oldpassd.addClass('error');
			oldpassd.parent('td').next().html('<span class="error_text">旧密码长度不够6位！</span>');
			return false;
		}else{
			oldpassd.removeClass('error');
			oldpassd.parent('td').next().html('');
		}

		//验证密码是否相等
		if( newpassd.val().length<6 ){
			newpassd.addClass('error');
			newpassd.parent('td').next().html('<span class="error_text">新密码长度不够6位！</span>');
			return false;
		}else{
			newpassd.removeClass('error');
			newpassd.parent('td').next().html('');
		}
		var reg = /[0-9]{6}/;
		if( !reg.test(newpassd.val()) ){
			newpassd.addClass('error');
			newpassd.parent('td').next().html('<span class="error_text">密码必须为6位数字！</span>');
			return false;
		}else{
			newpassd.removeClass('error');
			newpassd.parent('td').next().html('');
		}

		//验证密码是否相等
		if( newpassd.val() != renewpassd.val() ){
			renewpassd.addClass('error');
			renewpassd.parent('td').next().html('<span class="error_text">重复密码不一致！</span>');
			return false;
		}else{
			renewpassd.removeClass('error');
			renewpassd.parent('td').next().html('');
		}

		return {oldpassd : oldpassd.val(), newpassd : newpassd.val() };
	},
	submit: function(data){
		$.post("/updateTradePassword.json", {oldTradePassword:data.oldpassd,newTradePassword:data.newpassd}, function(json){
			if(json.status == "fail"){
				var oldpassd = $("input[name=oldpassd]");
				oldpassd.addClass('error');
				oldpassd.parent('td').next().html('<span class="error_text">'+ json.message +'</span>');
			}else if(json.status == "successful"){
				message($(".c_center"), "修改交易密码成功", "index.html", "返回首页");
			}
		},'json');
	}
}

$(function(){
	changePasswd.init();
});