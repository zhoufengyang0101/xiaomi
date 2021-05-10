var options;
var login_url = "http://d38893333x.zicp.vip//php/login_register/login.php"
var register_url = "http://d38893333x.zicp.vip//php/login_register/register.php"
init();
// 初始函数
function init() {
    // 点击form表单分发事件
    $("form").click(function (e) {
        switch (e.target.id) {
            case "login_h":
            case "reg_h":
                changeWall(e.target)
                break;
            case "freelog":
                $(e.target).attr("id", "checked");
                break;
            case "checked":
                $(e.target).attr("id", "freelog");
                break;
            // 执行函数无法使用防抖   单独写出去 
            // case "login":
            // case "register":
            //     debounce(loginHandler, 1000, true).bind(this, e.target, 2);
            //     break;
            default: return;
        }
    })
    // 登录注册事件  加了防抖
    $("#login").click(debounce(loginHandler, 2000, true))
    $("#register").click(debounce(loginHandler, 2000, true))
    // 初次渲染抛发一次事件
    dispach();
    // 获取cookie信息
    var getCook = getCookie("login");
    if (getCook) freeLogin(getCook); // 如果存在cookie  去免登录
    // input框事件监听
    $("input").blur(function (e) { inputHandler(e) });
}
// 抛发一次事件  确保页面面板在初始化时时登录面板
function dispach() {
    var evt = new Event("click", { bubbles: true });
    $("#login_h")[0].dispatchEvent(evt);
}

// 点击登录注册切换面板 elem 当前元素
function changeWall(elem) {
    if (elem.id === "login_h") {
        $(".reg_wall").hide(200, () => {
            $("#login_h")[0].className = "underline";
            $("#reg_h")[0].className = "";
            $(".login_wall").show(200)
        })
    } else {
        $(".login_wall").hide(200, () => {
            $("#login_h")[0].className = "";
            $("#reg_h")[0].className = "underline";
            $(".reg_wall").show(200)
        })
    }
}

// 离开输入框 e 事件对象
function inputHandler(e) {
    if ($.trim(e.target.value) === "") {
        e.target.className = "check_input";
        $(e.target).nextAll()[0].style.display = "block"
    } else {
        e.target.className = "";
        $(e.target).nextAll()[0].style.display = "none"
    }
}

// 点击登录注册按钮 elem 当前元素
function loginHandler(e) {
    var elem = e.target
    let username = $.trim($("#username").val())
    let password = $.trim($("#password").val())
    let name = $.trim($("#name").val())
    let pass = $.trim($("#pass").val())
    // 点击登录
    if (elem.id === "login") {
        if (!password || !username) return;
        if (username.length < 3 || username.length > 12) {
            layer.msg("用户名无效", { icon: 2, time: 1500 })
            return
        }
        options = {
            url: login_url,
            data: {
                username: username,
                password: password,
            },
            // callback: (res) => loginSuccess(res)
        }
        loginSuccess(options);
    }
    // 点击注册
    else if (elem.id === "register") {
        if (!pass || !name) return;
        if (name.length < 3 || name.length > 12) {
            layer.msg("用户名必须在3位和12位之间！", { icon: 2, time: 1500 })
            return
        } else if (pass.length < 6 || pass.length > 12) {
            layer.msg("密码必须在6位和12位之间！", { icon: 2, time: 1500 })
            return
        }
        options = {
            url: register_url,
            type: "post",
            contentType: "application/x-www-form-urlencoded",
            data: {
                username: name,
                password: pass,
            },
            // callback: res => registerSuccess(res)
        }
        registerSuccess(options);
    }
}

// 处理登录请求
function loginSuccess(options) {
    ajax(options).then(res => {
        switch (res.code) {
            case -2:
                layer.msg("账号不存在！", { icon: 2, time: 1500 })
                return;
            case -3:
                if (res.num === "3") {
                    layer.msg(`密码错误${res.num}次，请24:00后再试！`, { icon: 2, time: 1500 })
                    return
                }
                layer.msg(`密码错误${res.num}次，今日还有${3 - res.num}次机会！`, { icon: 2, time: 1500 })
                return;
            case 200:
                layer.msg("登录成功！", { icon: 1, time: 2000 }, loginSuccessCheck(res.username, res.password))
                return;
        }
    })
}

// 登录成功
function loginSuccessCheck(name, pass) {
    // 将登录信息存储在cookie
    let id = $(".login_wall_check span").prop("id")
    let value = {
        "username": name,
        "password": pass,
        "checked": id
    }
    // 根据用户是否选中免登录设置cookie有效时间
    var date;
    id === "freelog" ? date = 7 : date = 0
    setCookie("login", JSON.stringify(value), { path: "/", expires: date })
    history.back();
}

// 处理注册请求
function registerSuccess(options) {
    ajax(options).then(res => {
        switch (res.code) {
            case -2:
                layer.msg("用户名已存在！", { icon: 2, time: 1500 })
                return;
            case 200:
                layer.msg("注册成功，请登录！", { icon: 1, time: 2000 }, dispach)
                return;
        }
    })
}

// 免登录
function freeLogin(data) {
    var cookie = JSON.parse(data)
    $(".login_wall_check span").prop("id", cookie.checked)
    if (cookie.checked === "checked") {
        console.log($("#username", cookie.username))
        $("#username").val(cookie.username);
        $("#password").val(cookie.password);
        console.log(history)
        layer.msg("已经登录", { icon: 1, time: 1000 }, function () {
            // history.back();
            window.location.href = "./index.html";
        })
    }
}
