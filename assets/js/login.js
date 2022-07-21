$(function(){
    $('#link_reg').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click',function(){
        $('.login-box').show()
        $('.reg-box').hide()
    })
    // 表单验证
    var form=layui.form
    form.verify({
        pwd:[/^[\S]{6,12}$/,'密码必须为6~12位，且不能出现空格'],
        repwd:function(value){
            var pwd=$('.reg-box [name=password]').val()
            if(pwd!=value){
                return '两次密码不一致'
            }
        }
    })
    // 发起注册请求
    $('#form_reg').on('submit',function(e){
        e.preventDefault()
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
          }
        $.post('/api/reguser',data,function(res){
            if(res.status!==0){
                return layui.layer.msg(res.message)
            }
            layui.layer.msg('注册成功')
            $('#link_login').click()
        })
    })
    $('#form_login').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            url:'/api/login',
            method:'post',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg('登录成功')
                console.log(res.token);
                // location.href='/index.html'
                
            }
            
        })
    })

   

})