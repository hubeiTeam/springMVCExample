function dialogTBox(tboxId, formId,divTextId) {
	var $dataForm = $('#' + formId);
	$("#" + tboxId).removeClass('hide').dialog({
		resizable : false,
		modal : true,
		title : "详情",
		title_html : true,
		width : "600",
		draggable : true,
		position : [ "center", "top" ],
		dialogClass : "jquery-dialog",
		buttons : [ {
			html : "<i class='icon-plus bigger-110'></i>&nbsp; 保存",
			"class" : "btn btn-primary btn-xs",
			click : function() {
				var methodName = $dataForm.attr('check-params-method');
				if(methodName){
					var is = eval(methodName);
					if(!is) return;
				}
				
				if(divTextId){
					var value = $('#' + divTextId).html();
					$('.divTextHtml').remove();
					$('#' + formId).append('<input type="hidden" class="divTextHtml" name="'+ divTextId +'" value="" />');
					$('.divTextHtml').val(value);
				}
				var data = $dataForm.serialize();
				var addUrl = $dataForm.attr('action');
				var $dialog = $(this);
				$.post(addUrl, data, function(result) {
					aceAlert(result.message);
					if (result.status == 'successful') {
						$dialog.dialog("close");
						dataTableInit();
					}
				});

			}
		}, {
			html : "<i class='icon-remove bigger-110'></i>&nbsp;取消",
			"class" : "btn btn-xs",
			click : function() {
				$(this).dialog("close");
			}
		}]
	});
}
