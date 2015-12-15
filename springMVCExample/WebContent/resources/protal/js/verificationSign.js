//录取报名
$('.enrollBtn').click(function(){
	var signNo = $(this).parents('tr').find('input:checkbox').attr('data-id');
	var thisObj = $(this);
	$.post('/verificationSignUp.json',{'signNos':signNo},function(result){
		if(result.status == 'successful'){
			reload();
			// $(thisObj).parents('tr').find('.refuseBtn').parent("td").html("无");
			// $(thisObj).parents('tr').find('#signStatus').html('<font color="green">已录取</font>');
			// $(thisObj).parents('tr').find('input:checkbox').remove();
			// $(thisObj).hide();

		}else{
			pop(result.message);
		}
	},'json');
});
//批量同意
$('.enrollBtnAll').click(function(){
	var checkboxs = $(this).parents('tbody').find('input[type=checkbox]:checked');
	if(checkboxs.length == 0){ pop('没有选择用户！'); return}
	var signNos = '';
	for(var i=0;i<checkboxs.length;i++){
		signNos += $(checkboxs).eq(i).attr('data-id') + ',';
	}
	signNos = signNos.substring(0,signNos.length-1);
	$.post('/verificationSignUp.json',{'signNos':signNos},function(result){
		pop(result.message);
		if(result.status == 'successful'){
			reload();
		}
	},'json');
});

$('.allchecked').click(function(){
	var checkboxs = $(this).parents('tbody').find('input:checkbox');
	for(var i=0;i<checkboxs.length;i++){
		$(checkboxs).eq(i).attr("checked",'checked');
	}
});

$('.cancelEnroll').click(function(){
	var dataId = $(this).attr('data-id');
	console.log(dataId);
	$.post('/cancelEnroll.json',{'signNo':dataId},function(result){
		if(result.status == 'successful'){
			reload();
		}else{
			alert(result.message);
		}
	});
});

//拒绝报名
$('.refuseBtn').click(function(){
	var signNo = $(this).parents('tr').find('input:checkbox').attr('data-id');
	var thisObj = $(this);
	$.post('/refuseSignUp.json',{'signNo':signNo},function(result){
		if(result.status == 'successful'){
			$(thisObj).hide();
			$(thisObj).parents('tr').find('#signStatus').html('<font color="red">已拒绝</font>');
			reload();
		}else{
			pop(result.message);
		}
	},'json');
});