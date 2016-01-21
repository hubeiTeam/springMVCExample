/**
 * 提取字符串查询字符串之后，转化为对象的形式
 * 调用方法 console.dir(toQueryParams.call(linkURL));
 */
function toQueryParams(){
    var search = this.replace(/^\s+/,'').replace(/\s+$/,'');
    var search = search.split("?");
    var searchStr  = search[1];
    if(!searchStr){
        return {};
    }
    var searchStr  = search[1];
    var searchHash = searchStr.split('&');

    var ret = {};
    for(var i = 0, len = searchHash.length; i < len; i++){
        var pair = searchHash[i];
        if((pair = pair.split('='))[0]){
            var key   = decodeURIComponent(pair.shift());
            var value = pair.length > 1 ? pair.join('=') : pair[0];
            
            if(value != undefined){
                value = decodeURIComponent(value);
            }
            if(key in ret){
                if(ret[key].constructor != Array){
                    ret[key] = [ret[key]];
                }
                ret[key].push(value);
            }else{
                ret[key] = value;
            }
        }
    }
    return ret;
}

/**
 * 获取哈希内容 并转为对象 哈希内容为当前的内容
 */
function toHashParams(){
    var search = this.replace(/^\s+/,'').replace(/\s+$/,'');
    var search = search.split("#");
    var searchStr  = search[1];
    if(!searchStr){
        return {};
    }
    var searchHash = searchStr.split('&');

    var ret = {};
    for(var i = 0, len = searchHash.length; i < len; i++){
        var pair = searchHash[i];
        if((pair = pair.split('='))[0]){
            var key   = decodeURIComponent(pair.shift());
            var value = pair.length > 1 ? pair.join('=') : pair[0];
            
            if(value != undefined){
                value = decodeURIComponent(value);
            }
            if(key in ret){
                if(ret[key].constructor != Array){
                    ret[key] = [ret[key]];
                }
                ret[key].push(value);
            }else{
                ret[key] = value;
            }
        }
    }
    return ret;
}

/**
 * 单个key-》value 转URI
 */
function toQueryPair(key, value) {
    if (typeof value == 'undefined'){
        return key;
    }
    return key + '=' + encodeURIComponent(value === null ? '' : String(value));
}

/**
 * 一个 obj 转化为URI
 */
function toQueryString(obj) {
    var ret = [];
    for(var key in obj){
        key = encodeURIComponent(key);
        var values = obj[key];
        if(values && values.constructor == Array){//数组
            var queryValues = [];
            for (var i = 0, len = values.length, value; i < len; i++) {
                value = values[i];
                queryValues.push(toQueryPair(key, value));
            }
            ret = ret.concat(queryValues);
        }else{ //字符串
            ret.push(toQueryPair(key, values));
        }
    }
    return ret.join('&');
} 

/**
 * 直接变换为URI传对象
 */
function changeHash(obj){
    var title = document.title;
    var newUrl = window.location.pathname+'?'+toQueryString(obj);
    history.pushState({},title,newUrl);
}

/**
 * 获取cookie
 */
function getCookie(name){
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

/**
 * 拓展 $ jQuery 对象
 * POST打开新页面
 * 使用方法 $.StandardPost('url/path/req',{arg0:'arg0',arg1:'arg1'});
 */
$.extend({
    StandardPost:function(url,args){
    	var blank = ""
        if( arguments[2] ){
        	blank = "target='_blank'";
        }
        var body = $(document.body),
            form = $("<form method='post' "+ blank +" ></form>"),
            input;
        form.attr({"action":url});
        $.each(args,function(key,value){
            input = $("<input type='hidden'>");
            input.attr({"name":key});
            input.val(value);
            form.append(input);
        });

        form.appendTo(document.body);
        form.submit();
        document.body.removeChild(form[0]);
    }
});

/**
 * 时间格式化
 * (new Date().Format('yyyy-MM-dd'));
 */
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

