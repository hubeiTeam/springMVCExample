var timeout = null;
var register = {
	init: function(){
		this.smsCode();
		this.submit();
	},
	smsCode: function(){ //短信验证码

		//获取cookie
		var cookie = $.cookie("cookie_reg_time");
		var cookie_phone = $.cookie("cookie_reg_phone");
		var time = 60;
		if(cookie && cookie_phone ){ //存在cookie
			var time = parseInt(cookie) - (new Date().getTime());
			time = parseInt(time/1000);
			$("#verificationSMS").addClass('get-code-dis');
			$("#phone").val(cookie_phone);
			$(".img-code").parents(".form-code").hide();

			timeout = setInterval(function(){
				if(time<=0){
					$("#verificationSMS").text('请重新获取验证码！');
					$("#verificationSMS").removeClass('get-code-dis');
					$(".img-code").parents(".form-code").show();
					clearTimeout(timeout);
				}else{
					$("#verificationSMS").text('验证码还有'+time+'秒超时！');
					time--;
				}
			}, 1000);
		}

		//如果不是当前手机
		$("#phone").on("blur", function(){
			if( $(this).val() != cookie_phone ){
				time = 60;
				clearTimeout(timeout);
				$('#verificationSMS').html('请获取验证码！');
				$("#verificationSMS").removeClass('get-code-dis');
			}
		});

		$('#verificationSMS').on("click",function(){
			$(".form-error").hide();
			if( $(this).is(".get-code-dis") ){
				return false;
			}
			var codereg = /^[0-9]{4}$/g;
			var imgcode = $("#imgcode");
			console.log(imgcode.val());
			if( !codereg.test(imgcode.val()) ){
				logonerror('验证码错误！');
				return false;
			}

			//对手机号验证
			var phone = $('#phone');
			var phonereg = /^[1][3,4,5,8,7][0-9]{9}$/g;
			if( !phonereg.test(phone.val()) ){
				logonerror('您输入的手机号码格式不对！');
				return false;
			}

			$.post('/sendRegisterSMS.json',{'phone':phone.val(), 'code': imgcode.val() },function(result){
				//提示信息
				if(result.status == 'successful'){

					//设置超时
					var cookietime = new Date(); 
					var overtime = new Date().getTime()+(5 * 60 * 1000);
					cookietime.setTime(new Date().getTime() + (5 * 60 * 1000));//coockie保存5分钟 
					$.cookie("cookie_reg_time", overtime, {expires:cookietime});
					$.cookie("cookie_reg_phone", phone.val(), {expires:cookietime});
					clearTimeout(timeout);

					$("#verificationSMS").addClass('get-code-dis');
					$(".img-code").parents(".form-code").hide();
					timeout = setInterval(function(){
						if(time<=0){
							$("#verificationSMS").text('请重新获取验证码！');
							$("#verificationSMS").removeClass('get-code-dis');
							$(".img-code").parents(".form-code").show();
							clearTimeout(timeout);
						}else{
							$("#verificationSMS").text('验证码还有'+time+'秒超时！');
							time--;
						}
					}, 1000);
				}else if(result.status == "fail"){
					logonerror(result.message);
					return false;
				}else{
					logonerror('请输入正确地手机格式！');
					return false;
				}
			},'json');
		});
	},
	submit: function(){
		$('#registerBtn').on("click", function(){
			//alert();
			var phone = $('#phone');
			var phoneVerificationCode = $('#phoneVerificationCode');
			var logonPassword = $('#logonPassword');
			var phonereg = /^[1][3,4,5,8,7][0-9]{9}$/g;
			var codereg = /^[0-9]{6}$/g;

			//手机验证
			if( !phonereg.test(phone.val()) ){
				logonerror('请输入正确地手机号码！');
				return false;
			}
			var cookie = $.cookie("cookie_reg_time");
			var cookie_phone = $.cookie("cookie_reg_phone");
			if(!cookie || !cookie_phone){
				logonerror('验证码失效重新发送！');
				$("#verificationSMS").removeClass('get-code-dis');
				return false;
			}

			//验证码验证
			if( !codereg.test(phoneVerificationCode.val()) ){
				logonerror('请输入六位数字验证码！');
				return false;
			}

			//密码长度验证
			if(logonPassword.val().length < 6){
				logonerror('密码长度不能小于6位');
				return false;
			}
			$.post('/merchant/doRegister.json',{'phone':phone.val(),'phoneVerificationCode':phoneVerificationCode.val(),'logonPassword':logonPassword.val()},function(result){
				//console.log(result);
				if(result.status == 'successful'){
					clearTimeout(timeout);
					//注册成功跳转首页
					window.location.href = "/merchant/enterpriseInfo.html";
				}else{
					if(result.failCode == 8001){
						logonerror(result.message);
					}else{
						logonerror('请输入正确地验证码！');
					}
				}
			},'json')
		});
	}
}

$(function(){
	register.init();
});

