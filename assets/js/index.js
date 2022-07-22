$(function(){
    getUserInfo()


    // 退出页面
    $('#btnLogout').on('click',function(){
        layui.layer.confirm('确认退出程序',{icon:3,title:'提示'},function(){
            localStorage.removeItem('token')
            location.href='./login.html'
            layui.layer.close(index)
        })
    })
})
// 获取用户信息函数
function getUserInfo(){
    $.ajax({
        url:'/my/userinfo',
        method:'GET',
        // headers:{
        //     Authorization:localStorage.getItem('token')||''
        // },
        success:function(res){
            if(res.status!==0){
                return layui.layer.msg('获取用户信息失败')
            }
            renderAvatar(res.data)
        },
        // complete:function(res){
        //     if(res.responseJSON.status===1&&res.responseJSON.msg==='身份认证失败'){
        //         localStorage.removeItem('token')
        //         location.href='./login.html'
        //     }
        // }

    })
}
// 头像渲染函数
function renderAvatar(user){
    var name=user.nickname||user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;'+name)
    if(user.user_pic!==null){
        $('.layui-nav-img').attr('src','user.user_pic').show()
        $('.text-avatar').hide()
    }else{
        $('.layui-nav-img').hide()
        const first=name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}