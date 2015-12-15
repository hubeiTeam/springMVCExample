function getParams(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

function validate(){
	var phone = $('#phone');
	var logonPassword = $('#logonPassword');
	
	//验证手机号
	var phonereg = /^[1][3,4,5,8,7][0-9]{9}$/g; // 手机号正则
	if( !phonereg.test( phone.val() ) ){
		logonerror("手机号格式不正确！");
		return false;
	}

	//密码长度验证
	if( logonPassword.val().length<6 ){
		logonerror("密码长度不够！");
		return false;
	}
	//检查是否有target
	var target = getParams('target');
	if(!target){
		target = '';
	}

	$.post('/merchant/doLogon.json',{'phone':phone.val(),'logonPassword':logonPassword.val(),'target':target},function(result){
		if(result.status == 'successful'){
			window.location.href=result.target;
		}else{
			//console.log(result);
			if( result.status && result.status == "fail" ){
				logonerror(result.message);
				return false;
			}
		}
	},'json');
}

var logon = {
	init: function(){
		this.validate();
	},
	validate: function(){
		$("#logonBtn").on("click",function(){ //绑定点击
			return validate();
		});
	}
}

$(function(){
	logon.init();
});