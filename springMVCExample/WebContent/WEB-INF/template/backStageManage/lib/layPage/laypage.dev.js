/*!
 
 @Name : layPage v1.2 - 分页插件
 @Author: 贤心
 @Site：http://sentsin.com/layui/laypage
 @License：MIT
 
 */

;!function(){
"use strict";

function laypage(options){
    // var skin = 'laypagecss';
    // laypage.dir = 'dir' in laypage ? laypage.dir : Page.getpath + '/skin/laypage.css';
    return new Page(options);
    // if(laypage.dir && !doc[id](skin)){
    //     Page.use(laypage.dir, skin);
    // }
}

laypage.v = '1.2';

var doc = document, id = 'getElementById', tag = 'getElementsByTagName';
var index = 0, Page = function(options){
    var that = this;
    var conf = that.config = options || {};
    conf.item = index++;
    that.render(true);
};

Page.on = function(elem, even, fn){
    elem.attachEvent ? elem.attachEvent('on'+ even, function(){
        fn.call(elem, window.even); //for ie, this指向为当前dom元素
    }) : elem.addEventListener(even, fn, false);
    return Page;
};

Page.getpath = (function(){
    var js = document.scripts, jsPath = js[js.length - 1].src;
    return jsPath.substring(0, jsPath.lastIndexOf("/") + 1);
}())

Page.use = function(lib, id){
    var link = doc.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = laypage.dir;
    id && (link.id = id);
    doc[tag]('head')[0].appendChild(link);
    link = null;
};

//判断传入的容器类型
Page.prototype.type = function(){
    var conf = this.config;
    if(typeof conf.cont === 'object'){
        return conf.cont.length === undefined ? 2 : 3;
    }
};

//分页视图
Page.prototype.view = function(){
    var that = this, conf = that.config, view = [], dict = {};
    conf.pages = conf.pages|0;
    conf.curr = (conf.curr|0) || 1;
    // conf.groups = 'groups' in conf ? (conf.groups|0) : 5;
    conf.groups = 5;
    conf.first = 'first' in conf ? conf.first : 1;
    conf.last = 'last' in conf ? conf.last : conf.pages;
    conf.prev = 'prev' in conf ? conf.prev : '\u4e0a\u4e00\u9875';
    conf.next = 'next' in conf ? conf.next : '\u4e0b\u4e00\u9875';
    
    if(conf.groups > conf.pages){
        conf.groups = conf.pages;
    }
    
    //计算当前组
    dict.index = Math.ceil((conf.curr + ((conf.groups > 1 && conf.groups !== conf.pages) ? 1 : 0))/(conf.groups === 0 ? 1 : conf.groups));
    
    //当前页非首页，则输出上一页
    if(conf.curr > 1 && conf.prev){
        view.push('<a href="javascript:;" class="laypage_prev item" data-page="'+ (conf.curr - 1) +'">'+ conf.prev +'</a>');
    }
    
    //当前组非首组，则输出首页
    if(dict.index > 1 && conf.first && conf.groups !== 0){
        view.push('<a href="javascript:;" class="laypage_first item" data-page="1"  title="\u9996\u9875">'+ conf.first +'</a><span class="item">\u2026</span>');
    }
    
    //输出当前页组
    dict.poor = Math.floor((conf.groups-1)/2);
    dict.start = dict.index > 1 ? conf.curr - dict.poor : 1;
    dict.end = dict.index > 1 ? (function(){
        var max = conf.curr + (conf.groups - dict.poor - 1);
        return max > conf.pages ? conf.pages : max;
    }()) : conf.groups;
    if(dict.end - dict.start < conf.groups - 1){ //最后一组状态
        dict.start = dict.end - conf.groups + 1;
    }
    for(; dict.start <= dict.end; dict.start++){
        if(dict.start === conf.curr){
            view.push('<a class="laypage_curr item active" href="javascript:;" '+ (/^#/.test(conf.skin) ? 'style="background-color:'+ conf.skin +'"' : '') +'>'+ dict.start +'</a>');
        } else {
            view.push('<a class="item" href="javascript:;" data-page="'+ dict.start +'">'+ dict.start +'</a>');
        }
    }
    
    //总页数大于连续分页数，且当前组最大页小于总页，输出尾页
    if(conf.pages > conf.groups && dict.end < conf.pages && conf.last && conf.groups !== 0){
         view.push('<span class="item" href="javascript:;">\u2026</span><a href="javascript:;" class="laypage_last item" title="\u5c3e\u9875"  data-page="'+ conf.pages +'">'+ conf.last +'</a>');
    }
    
    //当前页不为尾页时，输出下一页
    dict.flow = !conf.prev && conf.groups === 0;
    if(conf.curr !== conf.pages && conf.next || dict.flow){
        view.push((function(){
            return (dict.flow && conf.curr === conf.pages) 
            ? '<a href="javascript:;" class="page_nomore" title="\u5df2\u6ca1\u6709\u66f4\u591a">'+ conf.next +'</a>'
            : '<a href="javascript:;" class="item laypage_next" data-page="'+ (conf.curr + 1) +'">'+ conf.next +'</a>';
        }()));
    }
    
    return '<div name="laypage'+ laypage.v +'" class="ui right floated pagination menu laypage_main laypageskin_'+ (conf.skin ? (function(skin){
        return /^#/.test(skin) ? 'molv' : skin;
    }(conf.skin)) : 'default') +'" id="laypage_'+ that.config.item +'">'+ view.join('') + function(){
        return conf.skip 
        ? '<div class="ui right labeled input laypage_total"><input type="text" style="width:100px;" placeholder="输入页数" min="1" onkeyup="this.value=this.value.replace(/\\D/, \'\');" class="laypage_skip">'
        + '<button class="ui tag label laypage_btn">跳至</button>' 
        : '';
    }() +'</div>';
};

//跳页
Page.prototype.jump = function(elem){
    var that = this, conf = that.config, childs = elem.children;
    var btn = elem[tag]('button')[0];
    var input = elem[tag]('input')[0];
    for(var i = 0, len = childs.length; i < len; i++){
        if(childs[i].nodeName.toLowerCase() === 'a'){
            Page.on(childs[i], 'click', function(){
                if( $(this).is(".laypage_curr") ){
                    return false;
                }
                var curr = this.getAttribute('data-page')|0;
                conf.curr = curr;
                that.render();
                
            });
        }
    }
    if(btn){
        Page.on(btn, 'click', function(){
            var curr = input.value.replace(/\s|\D/g, '')|0;
            if(curr && curr <= conf.pages){
                conf.curr = curr;
                that.render();
            }
        });
    }
};

//渲染分页
Page.prototype.render = function(load){
    var that = this, conf = that.config, type = that.type();
    var view = that.view();
    if(type === 2){
        conf.cont.innerHTML = view;
    } else if(type === 3){
        conf.cont.html(view);
    } else {
        doc[id](conf.cont).innerHTML = view;
    }
    conf.jump && conf.jump(conf, load);
    that.jump(doc[id]('laypage_' + conf.item));
    if(conf.hash && !load){
        location.hash = '!'+ conf.hash +'='+ conf.curr;
    }
};

Page.prototype.rePage = function(){
    var that = this, conf = that.config, type = that.type();
    var view = that.view();
    if(type === 2){
        conf.cont.innerHTML = view;
    } else if(type === 3){
        conf.cont.html(view);
    } else {
        doc[id](conf.cont).innerHTML = view;
    }
    that.jump(doc[id]('laypage_' + conf.item));
    if(conf.hash && !load){
        location.hash = '!'+ conf.hash +'='+ conf.curr;
    }
};

window.laypage = laypage;

}();