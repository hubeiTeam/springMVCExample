var base = {
	init: function(){
		this.nav();
		//this.select();
        this.bind();
	},

	nav: function(){ //导航部分
		$(".nav>li").on("mouseover", function(){
			$(this).siblings().removeClass('nav_act');
			$(this).addClass("nav_act");
			$(this).find(".dropbox").show();
		});
		$(".nav>li").on("mouseout", function(){
			$(this).removeClass('nav_act');
			$(this).find(".dropbox").hide();
		});
	},
	
	select: function(){
		$("select").select2({minimumResultsForSearch: Infinity});
	},

    bind: function(){
        $('.img-code').on("click", function(){

            $(this).find('img').remove();
            $(this).html("<img width='190' height='50' src='/imageInput.json?v="+ "1."+( Math.random() + '' ).substr(2,5) +"'>");
        });
    }
}

$(function(){
	base.init();
});

function loading(){
	$('body>.m').hide();
	$('body').append('<div class="loading"><div class="img"><img src="/resources/protal/images/loading.gif" width="120" height="120"></div></div>');
}

function unload(){
	$('body').find('.loading').remove();
}

function error(dom, str, btm, url){
	dom.html('<div class="error_msg"><div class="c"><img src="/resources/protal/images/error.png" width="200"><h3 class="error_str">'+ str +'</h3><a class="error_a" href="'+ url +'">'+ btm +'</a><div class="clear"></div></div></div>');
}

function reload(){
	window.location.reload();
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

//错误提示
function inputError(dom, text){
	dom.addClass('error');
	dom.parent("td").next().html('<span class="error_text">'+ text +'</span>');
	dom.focus();
}

//清空错误提示
function clearError(){
	$(document).find('td .error').removeClass('error');
	$(document).find('td .error_text').remove();
}

//错误提示
function logonerror(text){
	$('.form-error').find('span').text(text);
	$('.form-error').show();
}


$(function(){
	$('.form-item').find('.form-input').bind('focus blur', function(e){
		if( e.type == 'focus' ){
			$(this).parent().find('.item-tip').addClass('item-tip-focus');
			$(this).parent().find('.item-icon').addClass('item-icon-focus');
			$(this).addClass('form-input-focus');
		}else if( e.type == 'blur' ){
			if( $.trim( $(this).val() ).length <= 0 ){
				$(this).parent().find('.item-tip').removeClass('item-tip-focus');
				$(this).parent().find('.item-icon').removeClass('item-icon-focus');
				$(this).removeClass('form-input-focus');
			}
		}
	});
	$('.item-tip').on('click', function(){
		$(this).parent().find('.form-input').focus();
	});
});



