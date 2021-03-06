var REG_EMAIL = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/i;

$(function() {
    // login
    var login_email = $("#id_login_email");
    var login_pw = $("#id_login_pw");
    var login_checked = true;

    login_email.blur(function() {
        if(login_email.val() === ''){
            $(".email-error").html("请输入邮箱地址");
            login_checked = false;
        }else if(!REG_EMAIL.test(login_email.val())){
            $(".email-error").html("箱邮格式不正确");
            login_checked = false;
        }else{
            $(".email-error").html("");
        }
    })

    login_pw.blur(function(){
        if(login_pw.val() === ''){
            $(".pw-error").html("请输入密码");
            login_checked = false;
        }else if(login_pw.val().length < 6){
            $(".pw-error").html("密码不能小于六个字符");
            login_checked = false;
        }else{
            $(".pw-error").html("");
        }
    })

    $(".login-form").submit(function(){
        login_checked=true;
        login_email.blur();
        login_pw.blur();
        return login_checked;
    });

    // 用户注册
    var reg_email = $("#id_reg_email");
    var reg_pw = $("#id_reg_pw");
    var reg_checked=true;

    reg_email.blur(function() {
        var self = $(this);
        if(reg_email.val() === ''){
            $(".email-error").html("请输入邮箱地址");
            reg_checked = false;
        }else if(!REG_EMAIL.test(reg_email.val())){
            $(".email-error").html("箱邮格式不正确");
            reg_checked = false;
        }else{
            checkEmail(reg_email.val(), function(isReg){
                if (isReg){
                    $(".email-error").html("用户名已被注册");
                    reg_checked=false;
                } else {
                    $(".email-error").html("");
                    reg_checked=true;
                }
            });
        }
    });

    reg_pw.blur(function(){
        if(reg_pw.val() === ''){
            $(".pw-error").html("请输入密码");
            reg_checked = false;
        }else if(reg_pw.val().length < 6){
            $(".pw-error").html("密码不能小于六个字符");
            reg_checked = false;
        }else{
            $(".pw-error").html("");
        }
    });

    $(".reg-form").submit(function(){

        reg_email.blur();
//        alert(reg_checked);
        reg_pw.blur();
        return reg_checked;
    })
});

function checkEmail(email, callBack){
    if(typeof(callBack) !== "function"){
        callBack = function(){};
    }

    $.ajax({
        url: '/auth/ckemail',
        data: {'email': email},
        type: "POST",
        success: function(data){
            if(data==='1'){
                callBack(true);
            }else{
                callBack(false);
            }
        }
    });
}

