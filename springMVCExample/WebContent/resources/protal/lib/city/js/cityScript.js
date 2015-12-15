var citySelector = (function(){

    var prov = true;
    var citySelector = {};
    var filter = [10,11,12,13,42,43,41];
    _template = '<div class="city-box" id="js_cityBox"><div class="prov-city" id="js_provCity"><p>热门城市</p><img class="load" src="/resources/protal/images/loading.gif"></div><div class="provence"><div>选择省份</div><div><img class="load" src="/resources/protal/images/loading.gif"></div></div></div>';

    citySelector.cityInit = function (input) {
        $("#" + input).click(function () {
            if( $(this).attr('data') == "false" ){
                prov = false;
                _template = '<div class="city-box" id="js_cityBox"><div class="prov-city" id="js_provCity"><p>热门城市</p><img class="load" src="/resources/protal/images/loading.gif"></div><div class="provence"></div></div>';
            }

            //alert($(this).attr('data'));

            $("#js_cityBox").remove();
            $("body").append(_template);

            getOpenCityList(); //获取热门城市
            if(prov){
                getProvinceList();
            }
            var _top = $(this).offset().top + 40,
                _left = $(this).offset().left,
                _width = $(window).width();
            if (_width - _left < 450) {
                $("#js_cityBox").css({ "top": _top + "px", "right": "0px" }).addClass("rightSelector");
            }
            else {
                $("#js_cityBox").css({ "top": _top + "px", "left": _left + "px" });
            }

            var label = "false";
            $(document).on("click", "#js_provList .provinceName", function () {
                var parentId = $(this).attr('data');
                var parentName = $(this).html();
                if( $.inArray( parseInt( parentId ),filter) >= 0 ){
                    //e.stopPropagation();
                    $("#cityid").val( parentId );
                    $("#" + _input).val(parentName);
                    $("#js_cityBox").remove();
                    return false;
                }
                function createUl(_this){
                    _this.css({ "background": "#fff", "border-color": "#d8d8d8", "border-bottom-color": "#fff", "position": "absolute", "top": "0", "left": "0", "z-index": "999999" });
                    var _html = '<ul id="js_provCitys">';
                    _html += '<img class="load" src="/resources/protal/images/loading.gif">';
                    _html += '</ul>';
                    $("#js_provCitys").remove();
                    _this.parent("li").append(_html);

                    getCityList(_this.attr('data'), _this) //获取城市
                }
                //createUl( $(this) );
                if (label == "false") {
                    label = "true";
                    $(this).attr("now-item", "true");
                    createUl($(this));
                }
                else {
                    if ($(this).attr("now-item") == "" || $(this).attr("now-item") == "false" || $(this).attr("now-item") == undefined) {
                        $(this).parents("#js_provList").find("span").attr("now-item", "false");
                        $(this).attr("now-item", "true");
                        $("#js_provList span").css({ "background": "", "border-color": "", "border-bottom-color": "", "position": "", "top": "", "left": "", "z-index": "" });
                        $("#js_provCitys").remove();
                        createUl($(this));
                    }
                    else {
                        label = "false";
                        $(this).css({ "background": "", "border-color": "", "border-bottom-color": "", "position": "", "top": "", "left": "", "z-index": "" });
                        $("#js_provCitys").remove();
                    }
                }

            });

            var _input = input;
            $("#js_cityBox").on("click", ".js_cityName", function (e) {
                e.stopPropagation();
                $("#cityid").val( $(this).attr("data") );
                $("#" + _input).val($(this).html());
                $("#js_cityBox").remove();
            });
        });
    }
     //获取热门城市
    var getOpenCityList = function(){
        $.get('/getOpenCityList.json?', function(data){
            // console.log(data);
            if( data && data.openCityList ){
                data = data.openCityList;
                var _html = '<ul>';
                for (var i = 0; i < data.length; i++) {
                    _html += "<li class='js_cityName' data='"+ data[i]['id'] +"' >" + data[i]['name'] + "</li>";
                }
                _html += "</ul>";
                $('#js_provCity').append(_html);
                $('#js_provCity .load').remove();
            }else{
                $('#js_provCity').append('<p>没有热门城市</p>');
                $('#js_provCity .load').remove();
            }
        }, 'json');
    }

    //获取省份列表
    var getProvinceList = function(){
        $.get('/merchant/getProvinceList.json', function(data){
             //console.log(data);
            if( data && data.provinceList ){
                data = data.provinceList;
                var _html = '<ul id="js_provList">';
                for (var i = 0; i < data.length; i++) {
                    _html += "<li><span class='provinceName' data='" + data[i]['id'] + "'>" + data[i]['name'] + "</span></li>";
                }

                _html += "</ul>";
                $('.provence').append(_html);
                $('.provence .load').remove();
            }else{
                $('.provence').append('<p>没有热门城市</p>');
                $('.provence .load').remove();
            }
        }, 'json');
    }
    //获取城市列表
    var getCityList = function(parentId, _this){
        $.get("/merchant/getCityList.json", {'parentId':parentId}, function(data){
            if( data && data.cityList ){
                var res = data.cityList;
                var _html = "<ul id='js_provCitys'>";
                for(var i=0; i< res.length; i++){
                    _html += '<li class="js_cityName" data="'+ res[i].id +'">'+res[i].name+"</li>";
                }
                _html += "</ul>";
                $("#js_provCitys").remove();
                _this.parent("li").append(_html);
            }else{
                $("#js_provCitys").remove();
                _this.parent("li").append('<p>没有城市</p>');
            }
        });
    }
    return citySelector;
})();
