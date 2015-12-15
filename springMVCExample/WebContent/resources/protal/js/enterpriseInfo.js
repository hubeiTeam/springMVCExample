var enterprise = {
	init: function(){
		//this.city();
		this.uploadhead();
		this.submit();
	},
	file:{
		head: null,
		company: null
	},
	uploadhead: function(){
		$('#uploadhead').uploadify({
			'method'   : 'post',
			'formData' : {category:'HEAD'},
			'swf' : '/resources/protal/lib/uploadify/uploadify.swf',
			'uploader' : '/uploadResources.json',
			'fileTypeDesc' : 'Image Files',
            //允许上传的文件后缀
            'fileTypeExts' : '*.gif; *.jpg; *.png',
            'auto': true,
            'buttonText' : '点击上传头像',
            'removeCompleted' : false,
            'fileObjName':"fileData",
            'queueSizeLimit':1,
            'multi'    : false,
            'onUploadSuccess' : function (file, data, response) {
            	//console.log(typeof data);
            	data = eval('(' + data + ')')
            	//console.log(data);
            	enterprise.file.head = data;
            	$('.uphead img').remove();
            	$('.uphead').prepend('<img src="'+ data.dns +'" width="120" height="120" class="fc">');
            	// this.destroy;
            	// $('#uploadhead').uploadify('disable', false);
            	//console.log(this.disabled);
            	$("#uploadhead").fadeOut();
            },
            'onFallback': function () {  
	            alert("您未安装FLASH控件，无法上传！请安装FLASH控件后再试。");  
	        }
   		});

		$('#uploadcert').uploadify({
			'method'   : 'post',
			'formData' : {category:'MERCHANT_ATTEST'},
			'swf' : '/resources/protal/lib/uploadify/uploadify.swf',
			'uploader' : '/uploadResources.json',
			'fileTypeDesc' : 'Image Files',
            //允许上传的文件后缀
            'fileTypeExts' : '*.gif; *.jpg; *.png',
            'auto': true,
            'buttonText' : '点击上传证书',
            'removeCompleted' : false,
            'fileObjName':"fileData",
            'onUploadSuccess' : function (file, data, response) {
            	data = eval('(' + data + ')');
            	//console.log(data);
            	enterprise.file.company = data;
            	$('.uploadcert').html('<img src="'+ data.dns +'" width="250">');
            	$("#uploadcert").fadeOut();
            },
	        //检测FLASH失败调用  
	        'onFallback': function () {  
	            alert("您未安装FLASH控件，无法上传！请安装FLASH控件后再试。");  
	        }
		});
	},
	submit: function(){
		$("#bottsubmit").on('click', function(){

			if($(this).is(".loading")){
				return false;
			}
			
			var data = {};
			if( enterprise.file.head ){
				data.headPicture = enterprise.file.head.path;
			}
			claerErr(); //清除错误
			data.companySummary = $('textarea[name=companySummary]').val();
			data.companyName = $('input[name=companyName]').val();
			data.companyAddress = $('textarea[name=companyAddress]').val();
			data.companyCodeId = $('input[name=companyCodeId]').val();
			data.cityId = $('input[name=cityId]').val();
			//console.log(data);
			
			if( $.trim(data.companyName).length<=0){
				submitErr( $('input[name=companyName]'),'请输入公司名称！');
				return false;
			}

			if(data.companySummary.length<=0){
				submitErr($('textarea[name=companySummary]'),'公司简介不能为空！');
				return false;
			}

			if(data.companySummary.length>200){
				submitErr($('textarea[name=companySummary]') ,'公司简介不能大于200字！');
				return false;
			}

			if(data.cityId=='0' || data.cityId == "" || data.cityId == undefined ){
				submitErr($('input[name=cityId]'),'城市不能为空！');
				return false;
			}

			if(data.companyAddress.length<=0){
				submitErr($('textarea[name=companyAddress]') ,'公司简介不能大于200字！');
				return false;
			}

			if(data.companyCodeId.trim().length<=0){
				submitErr($('input[name=companyCodeId]') ,'请输入企业证书！');
				return false;
			}

			if(!enterprise.file.company){
				submitErr($('.uploadcert') ,'请上传证书！');
				return false;
			}
			//loading();
			$.post("/completeEnterpriseInfo.json", data, function(json){
				// console.log(json);
				loading();
				$(this).addClass('loading');
				if(json.status == "successful"){
					//上传企业信息成功
					$.post("/attestEnterprise.json", {licenseImageId:enterprise.file.company.sourceId}, function(json2){
						unload();
						if(json2.status == "successful"){
							window.location.href = "index.html";
						}else{
							//提交失败
							error($('body .center'), "提交错误请重新提交！", "重新提交", "enterpriseInfo.html");
						}
					}, 'json');
				}else {
					//提交失败
					error($('body .center'), "提交错误请重新提交！", "重新提交", "enterpriseInfo.html");
				}
			},'json');
		});
	}
}

$(function(){
	enterprise.init();
});

function submitErr( input, text ){
	input.parents('.form-table').find('.form-err').addClass('form-err-s');
	input.parents('.form-table').find('.form-err span').text(text);
	input.focus();
}

function claerErr(){
	$('.form-err').removeClass('form-err-s');
}