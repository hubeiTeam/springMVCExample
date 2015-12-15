$('.confirmGiveWage').click(function(){
	var checkboxs = $(this).parents('tbody').find('input[type=checkbox]:checked');
	if(checkboxs.length == 0){ 
		// pop('没有选择用户！');
		new $.flavr('没有选择用户！'); 
		return
	}
	
	new $.flavr({ 
		content : '确认发放工资？',
		dialog : 'confirm',
		onConfirm : function(){ 
			var signNos = '';
			for(var i=0;i<checkboxs.length;i++){
				signNos += $(checkboxs).eq(i).attr('data-id') + ',';
			}
			signNos = signNos.substring(0,signNos.length-1);
			$.post('/confirmGiveWage.json',{'signNos':signNos},function(result){
				pop(result.message);
				if(result.status == 'successful'){
					reload();
				}
			},'json');
		}, 
		onCancel : function(){
		} 
	});

});

$('.give').click(function(){
	var wage = $(this).parents('tr').find('.wage').text();
	var realName = $(this).parents('tr').find('.realName').text();
	var signNo = $(this).parents('tr').find('input:checkbox').attr('data-id');
	var thisObj = $(this);
	new $.flavr({ 
		content : '确认发放工资？',
		dialog : 'confirm',
		onConfirm : function(){ 
			onConfirm();
		}, 
		onCancel : function(){
		} 
	});

	var onConfirm = function(){
		$.post('/confirmGiveWage.json',{"signNos":signNo},function(result){
			if(result.status == 'successful'){
				$(thisObj).parents('tr').find('.status').html("已发工资");
				$(thisObj).hide();
				$(thisObj).parent('td').html('');
				reload();
			}else{
				pop(result.message);
			}
		},'json');
	}
});

$('.allchecked').click(function(){
	var checkboxs = $(this).parents('tbody').find('input:checkbox');
	for(var i=0;i<checkboxs.length;i++){
		$(checkboxs).eq(i).attr("checked",'checked');
	}
});

$('.refuse,.reasonBtn').click(function(){

	//return false;
	var signNo = $(this).parents('tr').find('input:checkbox').attr('data-id');
	var refuseReason = $(this).parents('td').find('.reason').val();
	var wage = $(this).parents("tr").find(".wage").text();
	var realName = $(this).parents("tr").find(".realName").text();
	//if(refuseReason){
		var data = {
				refuseReason: refuseReason,
				wage: wage,
				realName: realName
		}
		var html = template('refuseReasonBox',  data);
	//}
	
	new $.flavr({ 
		title : '拒绝理由',
		dialog: 'confirm',
        content: html, 
        onConfirm: function(){
        		var reason = $('#reason').val();
				var wage = $('#wage').val();
				$.post('/refusalAskWage.json',{'signNo':signNo,'reason':reason,'wage':wage},function(result){
					if(result.status == 'successful'){
						reload();
					}else{
						// $('.pop').remove();
						// pop(result.message);
						new $.flavr({ 
							content : result.message,
							dialog : 'confirm',
							onConfirm : function(){ 
								onConfirm();
							}, 
							onCancel : function(){
							} 
						});
					}
				});
        	},
    	onCancel : function(){
		} 
    });
});

$(".maintain").on("click", function(){
	var signNo = $(this).parents('tr').find('input:checkbox').attr('data-id');
	var data = {};
	var _html = template('maintain', data);
	new $.flavr({ 
		title : '申诉',
		dialog: 'confirm',
        content: _html, 
        onConfirm: function(){
    		var reason = $("#maintainreason").val();
			$.post('/insertDemension.json',{'signNo':signNo,'reason':reason, 'type': 'EnterpriseDemension'},function(result){
				if(result.status == 'successful'){
					setTimeout(function() {
						reload();
					}, 300);
				}
				new $.flavr({ 
					content : result.message,
					dialog : 'confirm',
					onConfirm : function(){ 
						onConfirm();
					}, 
					onCancel : function(){
					} 
				});
			});
    	},
    	onCancel : function(){
		} 
    });
})

$(document).on("keyup", "#wage", function(){
	var val = $(this).val();
	var reg = /^[0-9]*$/g;

	if( !reg.test(val) ){
		$(this).val( val.replace(/\D/i,'') );
	}
});