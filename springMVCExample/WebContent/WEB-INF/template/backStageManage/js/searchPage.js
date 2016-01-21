(function(){
    var option = {};
    var param = toQueryParams.call(window.location.href);
    /**
     * option  
     * url 获取的参数
     * resolve: function(res){}//对参数精修修改并解析return出去
     * thisLaypage.render();刷新当前页面列表
     */
    window.thisLaypage = function(op){
        option = op;
        run();
    };

    function run(){
        randerForm(param, $('form[name=search]'));
        var currPage = param.currPage || 1;
        // $.get( option.url, param, function(res){
        //     var pages = Math.ceil(res.count/10) || 1;
            thisLaypage = laypage({
                cont: $('#page'),
                // pages: 8, //通过后台拿到的总页数
                curr: currPage, //初始化当前页
                skip: true,
                jump: function(e){ //触发分页后的回调
                    param.currPage = e.curr;
                    changeHash(param);
                    loading();
                    $.getJSON(option.url, param, function(res){
                        console.log(thisLaypage);
                        e.pages = e.last = Math.ceil(res.count/10) || 1; //重新获取总页数，一般不用写
                        thisLaypage.rePage();
                        rander(res);
                    });
                }
            // });
        });
    }

    function loading(){
        $('.page-loading').addClass('dimmer');
    }

    function unload(){
        $('.page-loading').removeClass('dimmer');
    }

    function rander(res){
        if( res && res.datas ){
            //<h5 class="ui dividing header " align="right" id="table-count">总条数：6 条</h5>
            if( $(".page-list #table-count").size()>0 ){
                $('.page-list #table-count').text('总条数：' +res.count+ ' 条');
            }else{
                $(".page-list table").after('<h5 class="ui dividing header " align="right" id="table-count">总条数：'+ res.count +' 条</h5>')
            }
            var datas = res.datas;
            var currPage = param.currPage;
            for( var i=0; i<datas.length; i++ ){
                datas[i].tableTitle = (currPage-1)*10 +i+1;
            }
            res.datas = datas;
            data = option.resolve(res);
            var _html = template('list', data);
            $('.page-list tbody').html(_html);
            unload();
        }else{
            alert(res.message);
        }
    }


    //重新渲染表单
    function randerForm(param, form){
        for( k in param ){
            var cv = '[name='+k+']';
            form.find('input'+cv).val(param[k]);
            form.find('select'+cv).find('option[value='+ param[k] +']').prop('selected','selected');
        }
    }
})();