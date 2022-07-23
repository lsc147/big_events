$(function(){
    var q = {
        pagenum: 1, // 页码值，默认请求第一页的数据
        pagesize: 2, // 每页显示几条数据，默认每页显示2条
        cate_id: '', // 文章分类的 Id
        state: '' // 文章的发布状态
      }

      initTable()
      function initTable() {
        $.ajax({
          method: 'GET',
          url: '/my/article/list',
          data: q,
          success: function(res) {
              console.log(res);
            if (res.status !== 0) {
              return layui.layer.msg('获取文章列表失败！')
            }
            var htmlStr=template('tpl-table',res.data)
            $('tbody').html(htmlStr)
          }
        }) 
      }   
})