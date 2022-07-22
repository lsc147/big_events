$(function(){
  var form=layui.form
  
  
  form.verify({
      nickname:function(valus){
          if(value.length>6){
              return '昵称必须在1~6个字符之间'
          }
      }
  })

  initUserInfo()
  //   个人中心：获取用户信息
  function initUserInfo(){
      $.ajax({
          method:'GET',
          url:'/my/userinfo',
          success:function(res){
              if(res.status!==0){
                  return layui.layer.msg('获取用户信息失败')
              }
              console.log(res.data);
              form.val('formUserInfo',res.data)
          }
      })
  }

//   重置表单数据
  $('#btnReset').on('click',function(e){
    e.preventDefault()
    initUserInfo()
  })

  $('.layui-form').on('submit',function(e){
    e.preventDefault()
    $.ajax({
        method:'post',
        url:'/my/userinfo',
        data:$(this).serialize(),
        success:function(res){
          if(res.status!==0){
              return layui.layer.msg('失败')
          }
          layui.layer.msg('更新成功')
          window.parent.getUserInfo()
        }
    })
  })
})