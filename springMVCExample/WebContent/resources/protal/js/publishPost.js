var map,marker;
var publishPost = {
	init: function(){
		this.bind();
	},
	bind: function(){

		(function(){
			var x = $("input[name=workLongitude]").val();
			var y = $("input[name=workDimensions]").val();
			var option = {
			        	resizeEnable: true,
			            zoom:13//地图显示的缩放级别
				};
			// console.log(x,y);
			if( x!='' && y!= '' ){
				$(".map").show();
				map = new AMap.Map("mapContainer", {
					resizeEnable: true,
			        view: new AMap.View2D( option ),
					resizeEnable: true
				});
				map.plugin(["AMap.ToolBar"],function(){		
					toolBar = new AMap.ToolBar();
					map.addControl(toolBar);
				});
				addMarker(x, y);
			}


			//为地图注册click事件获取鼠标点击出的经纬度坐标				

			function addMarker(LngLatX,LngLatY){
	
				marker = new AMap.Marker({				  
					icon: "http://webapi.amap.com/images/marker_sprite.png",
					position:new AMap.LngLat(LngLatX,LngLatY)
				});
				marker.setMap(map);
				  //在地图上添加点
				map.setFitView(); //调整到合理视野
			}
		})(this);

		$("#submit").on("click", function(){
			var data = publishPost.verifier();
			if( data  ){
				//console.log(data);
				var _sou = null;
				_sou = clone(data);
				_sou.type = type;
				_sou.lables = data.lables.split(",");
				console.log(_sou);
				_sou.btime = data.workStartTime.split(" ");
				_sou.etime = data.workStopTime.split(" ")
				var _html = template('preview', _sou);
				new $.flavr({ 
					title : '确认岗位信息',
					dialog: 'confirm',
			        content: _html,
			        position: 'top-mid', 
			        onConfirm: function(){
			        		publishPost.submit(data);
					},
			    	onCancel : function(){
					}
			    });

				// popwitdh(_html , function(){
				// 	// data.lables = data.lables.join(",");
				// 	// //data['type'] = null;
				// 	// delete data.type;
				// 	//console.log(data);
				// 	publishPost.submit(data);
				// });
			}
			
		});

		$("input[name=workAddressName]").on("focus", function(){
			$(".map").show();
			//var map,marker;
			//初始化地图对象，加载地图
			var x = $("input[name=workLongitude]").val();
			var y = $("input[name=workDimensions]").val();
			var option = {
			        	resizeEnable: true,
			            zoom:10//地图显示的缩放级别
				};
			if( x=='' || y== '' ){
				
				map = new AMap.Map("mapContainer", {
					resizeEnable: true,
			        view: new AMap.View2D( option ),
					resizeEnable: true
				});
				map.plugin(["AMap.ToolBar"],function(){		
					toolBar = new AMap.ToolBar();
					map.addControl(toolBar);
				});
			}
			
			//为地图注册click事件获取鼠标点击出的经纬度坐标
			var clickEventListener=AMap.event.addListener(map,'click',function(e){
				if( marker ){
					marker.setMap(null);
				}
				
				$("input[name=workLongitude]").val( e.lnglat.getLng() );
				$("input[name=workDimensions]").val( e.lnglat.getLat() );
				var lnglatXY = new AMap.LngLat(e.lnglat.getLng(),e.lnglat.getLat());
				geocoder( lnglatXY );
				addMarker(e.lnglat.getLng(),e.lnglat.getLat());
			});

			function addMarker(LngLatX,LngLatY){
	
				marker = new AMap.Marker({				  
					icon: "http://webapi.amap.com/images/marker_sprite.png",
					position:new AMap.LngLat(LngLatX,LngLatY)
				});
				marker.setMap(map);
				  //在地图上添加点
				map.setFitView(); //调整到合理视野
			}

			function geocoder(lnglatXY) {

			    var MGeocoder;
			    //加载地理编码插件
			    AMap.service(["AMap.Geocoder"], function() {        
			        MGeocoder = new AMap.Geocoder({ 
			            radius: 1000,
			            extensions: "all"
			        });
			        //逆地理编码
			        MGeocoder.getAddress(lnglatXY, function(status, result){
			        	if(status === 'complete' && result.info === 'OK'){
			        		//console.log(result);
			        		$("input[name=workAddressName]").val(result.regeocode.formattedAddress);
			        	}
			        });
				});
			}
		});
		
		$("input[name=workAddressName]").on("blur", function(){
			$("#result").fadeOut(500);
		});

		$("input[name=workAddressName]").on("keyup", function(){
			var keywords = $(this).val();
			if( keywords.length>0 ){
				$("#result").show();
				search();
			}else{
				$("#result").hide();
			}
			function search(){
				map.plugin(["AMap.Autocomplete"], function() {
					//var keywords = "杭州中小企业";
					var auto;
			        var autoOptions = {
			            city: "" //城市，默认全国
			        };
			        auto = new AMap.Autocomplete(autoOptions);
			        //查询成功时返回查询结果
			        if ( keywords.length > 0) {
			        	// alert();
			            AMap.event.addListener(auto,"complete",autocomplete_CallBack);
			            auto.search(keywords);
			        }
			        else {
			            //document.getElementById("result1").style.display = "none";
			        }
			    });
			}

			function autocomplete_CallBack(data){
				var _html = "";
				if( data.type == "complete" && data.info == "OK" ){
					_html +="<ul>";
					var data = data.tips;
					for( var i=0; i<data.length; i++ ){
						if( data[i].location ){
							var location = data[i]['location'];
							// location = location.split(',');
							_html += '<li x-data="'+ location.lng+'" y-data="'+ location.lat +'">'+ data[i]['district']+ '<span>' +data[i]['name']+'</span>' +'</li>';
						}
					}
					_html += "</ul>";
					$('#result').html(_html);
				}else{
					$('#result').html('<h4 align="center" class="red">没有查找到数据！</h4>');
				}
			}

		});
		
		$("#result").on("click", 'li', function(){
			var x = $(this).attr('x-data');
			var y = $(this).attr('y-data');
			var adr = $(this).text();
			addMarker(x, y);
			function addMarker(LngLatX,LngLatY){
				if( marker ){
					marker.setMap(null);
				}
				marker = new AMap.Marker({				  
					icon: "http://webapi.amap.com/images/marker_sprite.png",
					position:new AMap.LngLat(LngLatX,LngLatY)
				});
				marker.setMap(map);
				  //在地图上添加点
				map.setFitView(); //调整到合理视野
				$("input[name=workLongitude]").val( LngLatX );
				$("input[name=workDimensions]").val( LngLatY );
				$("input[name=workAddressName]").val( adr );
				$("#result").hide();
			}

		});
	},
	verifier: function(){
		clearError();

		var title = $("input[name=title]"),
		companyName = $("input[name=companyName]"), //（公司名称）*
		wage = $("input[name=wage]"), //（薪资，整型）*
		// workDate = $("input[name=workDate]"),//（工作日期，格式yyyy-MM-dd）*
		workStartTime = $("input[name=workStartTime]"),//（工作开始日期时间，格式yyyy-MM-dd HH:mm）*
		workStopTime = $("input[name=workStopTime]"), //（工作结束日期时间，格式yyyy-MM-dd HH:mm）*
		personalNumber = $("input[name=personalNumber]"), //（招聘人数，整型）*
		workAddressName = $("input[name=workAddressName]"),//（工作地点名称）*
		workLongitude = $("input[name=workLongitude]"),//（工作地点经度）*
		workDimensions = $("input[name=workDimensions]"),//（工作地点纬度）*
		workDesc = $("textarea[name=workDesc]"),//（工作描述）*
		replyHour = $("select[name=replyHour]"), //（几小时回复，否则默认录取）*
		linkPhone = $("input[name=linkPhone]"), //（联系电话）*
		sex = $("select[name=sex]"), //（要求性别）
		ageMin = $("select[name=ageMin]"), // （最小年龄）
		ageMax = $("select[name=ageMax]"), //（最大年龄）
		bodyHeightMin = $("select[name=bodyHeightMin]"), //（最低身高）
		bodyHeightMax = $("select[name=bodyHeightMax]"), //（最高身高）
		bodyWeightMin = $("select[name=bodyWeightMin]"), //（最低体重）
		bodyWeightMax = $("select[name=bodyWeightMax]"), //（最高体重）
		cityId = $("input[name=cityId]"), //（岗位所在城市id）*
		categoryId = $("select[name=categoryId]"), //（岗位分类id）*
		linkName = $("input[name=linkName]"), //（联系人姓名）*
		startDate = $("input[name=startDate]"), //开始日期
		endDate = $("input[name=endDate]"); //结束日期

		var data = {};
		data = {
			title: title.val(),
			companyName : $("input[name=companyName]").val(), //（公司名称）*
			wage : $("input[name=wage]").val(), //（薪资，整型）*
			workDate : startDate.val(),//（工作日期，格式yyyy-MM-dd）*
			workStartTime : startDate.val() +" "+ $("select[name=bhour]").val()+":"+$("select[name=bmm]").val(),//（工作开始日期时间，格式yyyy-MM-dd HH:mm）*
			personalNumber : $("input[name=personalNumber]").val(), //（招聘人数，整型）*
			workAddressName : $("input[name=workAddressName]").val(),//（工作地点名称）*
			workLongitude : $("input[name=workLongitude]").val(),//（工作地点经度）*
			workDimensions : $("input[name=workDimensions]").val(),//（工作地点纬度）*
			workDesc : $("textarea[name=workDesc]").val(),//（工作描述）*
			replyHour : $("select[name=replyHour]").val(), //（几小时回复，否则默认录取）*
			linkPhone : $("input[name=linkPhone]").val(), //（联系电话）*
			cityId : $("input[name=cityId]").val(), //（岗位所在城市id）*
			categoryId : $("select[name=categoryId]").val(), //（岗位分类id）*
			linkName : $("input[name=linkName]").val(), //（联系人姓名）*
			city :  $("input[name=city]").val()
		};

		if( endDate.val() != "" ){
			data.workStopTime = endDate.val() +" "+ $("select[name=endhour]").val()+":"+$("select[name=endmm]").val();
		}else{
			data.workStopTime = startDate.val() +" "+ $("select[name=endhour]").val()+":"+$("select[name=endmm]").val();
		}

		if( !$.trim(title.val()) ){
			inputError(title, "岗位名称不能为空！");
			return false;
		}
		if( ($.trim(title.val())).length > 13 ){
			inputError(title, "岗位标题不能大于13个字符！");
			return false;
		}
		if( !categoryId.val() ){
			inputError(categoryId, "岗位类别不能为空！");
			return false;
		}

		var reg = /^[1-9][0-9]*$/g;
		if( !reg.test( personalNumber.val() ) ){
			inputError( personalNumber, "招聘人数请填写整数！");
			return false;
		}
		
		reg = /^[1-9][0-9]*$/g;
		if( !reg.test( wage.val() ) ){
			inputError( wage, "工资请填写整数！");
			return false;
		}

		if( !startDate.val() ){
			inputError( workDate, "请选择日期！");
			return false;
		}

		var starttime = new Date(Date.parse(( startDate.val() +" "+ $("select[name=bhour]").val()+":"+$("select[name=bmm]").val() ).replace(/-/g,"/"))).getTime();
		var endtime = new Date(Date.parse(( startDate.val() +" "+ $("select[name=endhour]").val()+":"+$("select[name=endmm]").val() ).replace(/-/g,"/"))).getTime();
		// console.log( endtime );
		if( !cityId.val() ){
			inputError(cityId, "您还没有选择城市！" );
			return false;
		}
		if( starttime >= endtime ){
			inputError($("select[name=endmm]"), "开始时间不能大于结束时间！" );
			return false;
		}

		if( empty(replyHour.val()) ){
			inputError( replyHour, "请选择回复时间！");
			return false;
		}
		if( !linkName.val() ){
			inputError( linkName, "请填写联系人！");
			return false;
		}

		reg = /^[1][3,4,5,8,7][0-9]{9}$/g;

		if( !reg.test(linkPhone.val()) ){
			inputError( linkPhone, "请填写正确地手机号！");
			return false;
		}

		if( !workDesc.val() ){
			inputError( workDesc, "请填写工作要求！");
			return false;
		}

		if( workDesc.val().length > 200 ){
			inputError( workDesc, "请坐要求不能大于200字！");
			return false;
		}
		
		if( !empty(sex.val()) ){
			data.sex = sex.val();
		}
		if( !empty(ageMin.val()) ){
			data.ageMin = ageMin.val();
		}
		if( !empty( ageMax.val() ) ){
			data.ageMax = ageMax.val();
		}
		if( !empty(ageMin.val()) && empty( ageMax.val() ) ){
			inputError( ageMin, "请填写完整的年龄要求！");
			return false;
		}
		if( !empty(ageMax.val()) && empty( ageMin.val() ) ){
			inputError( ageMax, "请填写完整的年龄要求！");
			return false;
		}
		if( !empty( bodyHeightMin.val() ) ){
			data.bodyHeightMin = bodyHeightMin.val();
		}
		if( !empty( bodyHeightMax.val() ) ){
			data.bodyHeightMax = bodyHeightMax.val();
		}
		if( !empty(bodyHeightMin.val()) && empty( bodyHeightMax.val() ) ){
			inputError( bodyHeightMin, "请填写完整的身高要求！");
			return false;
		}
		if( !empty(bodyHeightMax.val()) && empty( bodyHeightMin.val() ) ){
			inputError( bodyHeightMax, "请填写完整的身高要求！");
			return false;
		}
		if( !empty( bodyWeightMin.val() ) ){
			data.bodyWeightMin = bodyWeightMin.val();
		}
		if( !empty( bodyWeightMax.val() ) ){
			data.bodyWeightMax = bodyWeightMax.val();
		}
		if( !empty(bodyWeightMin.val()) && empty( bodyWeightMax.val() ) ){
			inputError( bodyWeightMin, "请填写完整的体重要求！");
			return false;
		}
		if( !empty(bodyWeightMax.val()) && empty( bodyWeightMin.val() ) ){
			inputError( bodyWeightMax, "请填写完整的体重要求！");
			return false;
		}

		data.lables ="";
		if( $(".checkedlable .canbu").is(".checked") ){
			data.lables += "1";
		}
		if( $(".checkedlable .chebu").is(".checked") ){
			if(data.lables.length >0){
				data.lables += ",2";
			}else{
				data.lables = "2";
			}
		}
		return data;
	},
	submit: function(data){
		console.log(data);
		$.post('/publishPostInfo.json', data, function(json) {
			if(json.status == "fail"){
				console.log(json);
				if(json.code && json.code == '500'){
					new $.flavr("当前登录已超时，请刷新页面！");
				}else{
					new $.flavr(json.message); 
				}
			}else{
				window.location.href="/merchant/calculate.html?orderId="+json.orderId;
			}
		},"json");
	},
	map: function(){

	}
};

$(function(){
	publishPost.init();
});

function empty(v){ 
	switch (typeof v){ 
		case 'undefined' : return true; 
		case 'string' : if($.trim(v).length == 0) return true; break; 
		case 'boolean' : if(!v) return true; break; 
		case 'number' : if(0 === v) return true; break; 
		case 'object' : 
			if(null === v) return true; 
			if(undefined !== v.length && v.length==0) return true; 
			for(var k in v){return false;} return true; 
			break; 
	}
	return false; 
}

function popwitdh(text, callback){

	//移出其他的 .pop；
	$(".pop").remove();

	//pop框的div 和代码
	var _html = '<div class="pop" style="position: fixed; background:#FFF; top: 50%; left: 50%; margin-left: -275px; width: 550px; border:1px solid #0099CC; font-size: 16px; z-index:999;">';
	_html += '<p class="pop-title" style="margin: 0; padding: 0; line-height: 2em; padding: 0 10px; background: #0099CC; color: #FFF;">提示</p>';
	_html += '<div class="pop-content" style="padding: 10px; width:530px; height:400px;overflow:scroll; font-weight: bold; line-height:1.5em; text-indent:2em;">'+ text +'</div>';
	_html += '<div class="pop-footer" style="padding-bottom: 10px;  width: 100%; position: absolute; bottom: 0; padding-bottom: 10px;">';
	if( callback ){
		_html += '<a class="pop-bottum-hide" style="display: inline-block; float: right; height: 28px; line-height: 28px; color: #0099CC; padding: 0 10px; margin-right: 10px; border: 1px solid #0099CC;">返回修改</a>';
		_html += '<a class="pop-bottum-access" style="display: inline-block; float: right; height: 30px; line-height: 30px; color: #FFF; padding: 0 10px; margin-right: 10px; background: #0099CC;">确定发布</a>';
	}else{
		_html += '<a class="pop-bottum-hide" style="display: inline-block; float: right; height: 30px; line-height: 30px; color: #FFF; padding: 0 10px; margin-right: 10px; background: #0099CC;">确定</a>';
	}

	_html += '<div style="clear:both;"></div></div>';
	_html += '</div>';

	_html += '<div class="fiexder" style="position: fixed; top:0; left:0; height:100%; width:100%; background:#333; z-index:998;filter:alpha(opacity=50); opacity: 0.5; -moz-opacity:0.5; "></div>';

	//生成的html插入body中
	$('body').append(_html);

	//计算出来高度 并设置
	var b_h = $('.pop').height();
	$('.pop').css({
		"margin-top": -b_h/2
	});

	//绑定点击事件，并执行回调
	$('.pop .pop-bottum-access').on("click", function(){
		setTimeout(callback, 10);
		$('.fiexder').remove();
	});
	$('.pop .pop-bottum-hide').on("click", function(){
		$('.pop').remove();
		$('.fiexder').remove();
	});
};
//克隆对象
function clone(myObj){  
  if(typeof(myObj) != 'object') return myObj;  
  if(myObj == null) return myObj;  
    
  var myNewObj = new Object();  
    
  for(var i in myObj)  
     myNewObj[i] = clone(myObj[i]);  
    
  return myNewObj;  
}

 function parseISO8601(dateStringInRange) {
   var isoExp = /^\s*(\d{4})-(\d\d)-(\d\d)\s*$/,
       date = new Date(NaN), month,
       parts = isoExp.exec(dateStringInRange);
 
   if(parts) {
     month = +parts[2];
     date.setFullYear(parts[1], month - 1, parts[3]);
     if(month != date.getMonth() + 1) {
       date.setTime(NaN);
     }
   }
   return date;
 }

