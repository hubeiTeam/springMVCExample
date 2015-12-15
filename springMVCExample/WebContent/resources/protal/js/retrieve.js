var retrieve = {
	init: function(){
		this.next();
	},
	next: function(){
		$('#nextBtn').on("click", function(){
			var index = $(".progress .pross").index($('.pross-ok'));
			//alert(index);
			if( index == 0 ){
				$('.form-error').hide();
				var phone = $("input[name=phone]");
				var phonereg = /^[1][3,4,5,8,7][0-9]{9}$/g;

				if( !phonereg.test(phone.val()) ){
					logonerror("请填写正确地手机号");
					return false;
				}

				var code = $("input[name=code]");
				var codereg = /^[0-9]{6}$/g;

				if( !codereg.test(code.val()) ){
					logonerror("请填写正确地验证码");
					return false;
				}
				$(".progress .pross").removeClass('pross-ok');
				$(".progress .pross").removeClass('pross-pass');
				$(".progress .pross").eq(index).addClass('pross-pass');
				$(".progress .pross").eq(index+1).addClass('pross-ok');
				$(".tab").hide();
				$(".tab").eq(index+1).show();
			}else if( index == 1 ){
				$('.form-error').hide();
				var phone = $("input[name=phone]");
				var phonereg = /^[1][3,4,5,8,7][0-9]{9}$/g;

				if( !phonereg.test(phone.val()) ){
					inputError(phone,"请填写正确地手机号");
					return false;
				}

				var passwd = $("input[name=passwd]");
				var repasswd = $("input[name=repasswd]");

				if( passwd.val().length<6){
					logonerror("密码长度不够！");
					return false;
				}

				if( passwd.val() != repasswd.val() ){
					logonerror("重复密码不一致！");
					return false;
				}

				submit();
			}
		});
	}
};

$(function(){
	retrieve.init();

	$(".get-code").on("click", function(){
		var phone = $("input[name=phone]");
		var phonereg = /^[1][3,4,5,8,7][0-9]{9}$/g;
		if( !phonereg.test(phone.val()) ){
			logonerror("手机号码格式错误！");
			return false;
		}
		if( !$(this).is(".get-code-dis") ){
			getSMS(phone.val());
		}
	});

});

var timeout = "";

// 获取找回登录密码验证码
function getSMS(phone){
	$.post('/sendSMS.json', {phone: phone, category:"FORGOT_PASSWORD"}, function(data, textStatus, xhr) {
		if( !data ){
			logonerror( '网络错误！' );
			return false;
		}
		if( data && data.status == 'fail' ){
			logonerror( data.message );
			return false;
		}
		if( timeout ){
			clearTimeout(timeout);
		}
		var time = 300;
		timeout = setInterval(function(){
			if(time<=0){
				$(".get-code").text('请重新获取验证码！');
				$(".get-code").removeClass('get-code-dis');
				clearTimeout(timeout);
			}else{
				$(".get-code").text('验证码'+time+'秒超时！');
				time--;
			}
		}, 1000);
		$(".get-code").addClass('get-code-dis');
	});
}

function submit(){
	var phone = $("input[name=phone]");
	var passwd = $("input[name=passwd]");
	var code = $("input[name=code]");
	var data = {
		phone: phone.val(),
		phoneCode: code.val(),
		logonPassword: passwd.val()
	}
	$.post('/resetLogonPassword.json', data, function(data, textStatus, xhr) {
		if(data && data.status == "fail"){
			logonerror( data.message );
			$(".progress .pross").removeClass('pross-ok');
			$(".progress .pross").removeClass('pross-pass');
			$(".progress .pross").eq(0).addClass('pross-ok');
			$(".tab").hide();
			$(".tab").eq(0).show();
		}else{
			$(".progress .pross").removeClass('pross-ok');
			$(".progress .pross").removeClass('pross-pass');
			$(".progress .pross").eq(1).addClass('pross-pass');
			$(".progress .pross").eq(2).addClass('pross-ok');
			$(".tab").hide();
			$(".tab").eq(2).show();
		}
	}, "json");
}
