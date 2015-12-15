//签到
$('.registerBtn').click(function(){
	var signNo = $(this).parents('tr').find('input:checkbox').attr('data-id');
	var thisObj = $(this);
	$.post('/batchRegister.json',{'signNos':signNo},function(result){
		if(result.status == 'successful'){
			$(thisObj).parent("td").html("无");
			$(thisObj).parents('tr').find('input:checkbox').hide();
			$(thisObj).parents('tr').find('.status').html('已签到');
			var date = new Date(new Date());
			$(thisObj).parents('tr').find('.registerDateTd').html(date.format("yyyy-MM-dd HH:mm:ss"));
			reload();
		}else{
			pop(result.message);
		}
	},'json');
});
//批量签到或签退
$('.confirmSubmit').click(function(){
	var checkboxs = $(this).parents('tbody').find('input[type=checkbox]:checked');
	if(checkboxs.length == 0){ pop('没有选择用户！'); return}
	var registerSignNos = '';
	var registerOutSignNos = '';
	for(var i=0;i<checkboxs.length;i++){
		var isRegister = checkboxs.eq(i).parents('tr').find('.registerBtn');
		if(isRegister.length==0){
			registerOutSignNos +=$(checkboxs).eq(i).attr('data-id') + ',';
		}else{
			registerSignNos +=$(checkboxs).eq(i).attr('data-id') + ',';
		}
	}
	
	var message = '';
	
	if(registerSignNos.length > 0 && registerOutSignNos.length > 0){
		pop('请分开签到和签退，这样不容易出错哦！');
	}else{
		if(registerSignNos.length > 0){
			registerSignNos = registerSignNos.substring(0,registerSignNos.length-1);
			$.post('/batchRegister.json',{'signNos':registerSignNos},function(result){
				pop(result.message);
				if(result.status == 'successful'){
					setTimeout(function() {
						reload();
					}, 300);
				}
			},'json');
		}else if(registerOutSignNos.length > 0){
			registerOutSignNos = registerOutSignNos.substring(0,registerOutSignNos.length-1);
			$.post('/batchRegisterOut.json',{'signNos':registerOutSignNos},function(result){
				pop(result.message);
				if(result.status == 'successful'){
					setTimeout(function() {
						reload();
					}, 300);
				}
			},'json');
		}
	}
	
});

$('.allchecked').click(function(){
	var checkboxs = $(this).parents('tbody').find('input:checkbox');
	for(var i=0;i<checkboxs.length;i++){
		$(checkboxs).eq(i).attr("checked",'checked');
	}
});

//签退
$('.registerOutBtn').click(function(){
	var signNo = $(this).parents('tr').find('input:checkbox').attr('data-id');
	var thisObj = $(this);
	$.post('/batchRegisterOut.json',{'signNos':signNo},function(result){
		if(result.status == 'successful'){
			$(thisObj).hide();
			var date = new Date(new Date());
			$(thisObj).parents('tr').find('.status').html('已签退');
			$(thisObj).parents('tr').find('input:checkbox').hide();
			$(thisObj).parents('tr').find('.registerOutDateTd').html(date.format("yyyy-MM-dd HH:mm:ss"));
			reload();
		}else{
			pop(result.message);
		}
	},'json');
});