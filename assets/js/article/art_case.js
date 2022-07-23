$(function(){
    initArtCateList()


    // 获取文章列表
    function initArtCateList(){
        $.ajax({
            method:'GET',
            url:'/my/article/cates',
            success:function(res){
                var htmlStr=template('tpl-table',res )
                $('tbody').html(htmlStr)
            }
        })
    }

    // 为添加类别绑定点击事件
    $('#btnAddCate').on('click',function(){
        layui.layer.open({
            area:['500px','250px'],
            type:1,
            title:'添加文章分类',
            content:$('#dialog-add').html(),
        })
    })
    // 添加类别，委托
    $('body').on('submit','#form-add',function(e){
        e.preventDefault()
        $.ajax({
            method:'post',
            url:'/my/article/addcates',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return console.log('成功');
                }
                initArtCateList()
                layui.layer.msg('成功')
                // layui.layer.close(indexAdd)
            }

        })    
    })
    //绑定编辑
    $('tbody').on('click','#btn-edit',function(){
        var indexEdit=null
        indexEdit=layui.layer.open({
            area:['500px','250px'],
            type:1,
            title:'修改文章分类',
            content:$('#dialog-edit').html(),
        })
        var id=$(this).attr('data-id')
        $.ajax({
            method:'get',
            url:'/my/article/cates/'+id,
            success:function(res){
               layui.form.val('form-edit',res.data) 
            }
        })
    })
    // 修改内容
    $('body').on('submit','#form-edit',function(e){
        e.preventDefault()
        $.ajax({
            method:'post',
            url:'/my/article/updatecate',
            data:$(this).serialize(),
            success:function(res){
                console.log(res);
                if(res.status!==0){
                    return layui.layer.msg('更新数据失败')
                }
                layui.layer.msg('更新数据成功')
                initArtCateList()
            }
        })
    })
    $('body').on('click','.btn-delete',function(){
        var id=$(this).attr('data-id')
        layui.layer.confirm('确认删除？',{icon:3,title:'提示'},function(index){
            $.ajax({
                method:'get',
                url:'/my/article/deletecate'+id,
                success:function(res){
                    if(res.status!==0){
                        return layui.layer.msg('失败')
                    }
                    layui.layer.msg('成功')
                    layui.layer.close(index)
                    initArtCateList()

                }
            })
            
        })
    })


})