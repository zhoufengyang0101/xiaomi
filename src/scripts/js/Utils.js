; (function (win) {
    // 封装cookie，获取cookie 
    function getCookie(name) {
        let reg = new RegExp('(^|)' + name + '=([^;]*)(;|$)');
        return document.cookie.match(reg) ? document.cookie.match(reg)[2] : null;
    }
    // 设置cookie
    function setCookie(name, value, options) {
        if (!name) return null;
        options = options || {};
        if (typeof options.expires === "number") {
            var date = new Date();
            date.setDate(date.getDate() + options.expires);
        }
        return document.cookie = [
            name, "=", value,
            typeof options.path === "string" ? ";path=" + options.path : "",
            typeof options.domain === "string" ? ";domain=" + options.domain : "",
            typeof options.expires === "number" ? ";expires=" + date : ""
        ].join("")
    }
    // 删除cookie
    // 删除cookie，重新设置cookie过期时间为-1, 
    // 不指定path时只能删除当前路径下的cookie
    function delCookie(name, path) {
        // path 可以是对象,也可以是指定路径的字符串
        let options = { expires: -1 };
        switch (typeof path) {
            case "string":
                options.path = path;
                break;
            case "object":
                if (path !== null && !(path instanceof Array)) {
                    Object.assign(options, path);
                }
        }
        return setCookie(name, null, options);
    }
    // 发送ajax请求
    function ajax(_options) {
        // 默认数据
        let _default = {
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            jsonp: "cb",   // callback在get请求中的字段，(默认值是callback)后端通过它来获取全局函数名
            dataType: "json",   // dataType 为jsonp时执行jsonp跨域请求； 其他值时为解析响应的格式
            cb: "cb"         // 拼接全局函数的自定义前缀
        };
        var data = "";
        let options = _options;
        if (!options) options = {};
        for (var prop in options) {
            _default[prop] = options[prop];
        }
        options = _default;
        if (isObject(options.data)) {
            for (var prop in options.data) {
                data += "&" + prop + "=" + options.data[prop];
            }
            data = data.slice(1);
        }
        options.data = data;
        switch (options.dataType) {
            case "jsonp":
                return _jsonp(options);
            default:
                return _xhrRequest(options);
        }
    }
    function _jsonp(options) {
        return new Promise(function (fulfill, reject) {
            var global_fn_name = options.cb + Date.now() + Math.random()
            global_fn_name = global_fn_name.replace(/0\./g, "_");
            // 制造伪全局变量; 
            window[global_fn_name] = function (res) {
                delete window[global_fn_name];
                fulfill(res);
                typeof options.callback === "function" ? options.callback(res) : "";
            }
            // 判断URL有没有? 如果有我们用 & 拼接; 
            options.url += (/\?/.test(options.url) ? "&" : "?") + options.jsonp + "=" + global_fn_name;
            var script = document.createElement("script");
            script.src = options.url;
            document.body.appendChild(script);
            script.addEventListener("load", removeHander);
        })
    }
    function removeHander(e) {
        document.body.removeChild(e.target);
    }
    function _xhrRequest(options) {
        return new Promise(function (fulfill, reject) {
            let req_type = options.type.toUpperCase();
            if (req_type === "GET") {
                options.url += "?" + options.data;
            }
            let xhr = new XMLHttpRequest();
            xhr.open(req_type, options.url);
            // POST 请求时，加上请求头
            if (req_type === "POST") {
                xhr.setRequestHeader("Content-Type", options.contentType);
            }
            xhr.send(req_type === "GET" ? null : options.data);
            // 监听请求状态，当readyState改变时触发
            xhr.options = options;
            // xhr.addEventListener("readystatechange", this.readyStateHandler);
            xhr.onreadystatechange = function (e) {
                // 这里this指向xhr对象
                if (this.readyState === 4 && /^2\d{2}$/.test(this.status)) {
                    var res = this.responseText;
                    switch (this.options.dataType) {
                        case "html":
                            res = res;
                            break;
                        case "json":
                            res = JSON.parse(res);
                            break;
                    }
                    fulfill(res);
                    typeof this.options.callback === "function" ? this.options.callback(res) : "返回信息";
                }
                // 删除事件
                // console.log(this)
                // console.log(this.readyStateHandler, "-");
                this.removeEventListener("readystatechange", this.readyStateHandler);
            }
        })
    }
    // 判断是否是对象
    function isObject(obj) {
        return (typeof obj === "object" && obj !== null && !(obj instanceof Array));
    }

    // 懒加载
    function lazyLoad(options) {
        var imgs = document.querySelectorAll(options.el);
        // 1. 获取imgs的top数据; 
        // - JS 的DOM操作性能消耗是最高的 ; 我们希望的是一次性处理好数据;  
        // - 获取的值应该是图片到文档顶部的距离; 
        var imgs_top_list = [];
        for (var i = 0; i < imgs.length; i++) {
            imgs_top_list.push(_getAbsPosition(imgs[i]).top);
        }
        // 哪些图片显示了 : 
        // scrollTop + 窗口的clientHieght 相加大于了图片的高度，那么图片就显示了; 
        // 优化 : 节流和防抖; 
        window.addEventListener("scroll", _hanlderChangeHeight)
        window.addEventListener("resize", _hanlderChangeHeight)

        function _hanlderChangeHeight() {
            var ch = window.innerHeight;
            var st = document.body.scrollTop || document.documentElement.scrollTop;
            for (var index in imgs_top_list) {
                if (imgs_top_list[index] < st + ch) {
                    // 图片应该显示; 
                    imgs[index].src = imgs[index].getAttribute("data-src");
                    delete imgs_top_list[index]
                } else {
                    break;
                }
            }
        }
        window.dispatchEvent(new Event("scroll"));
    }
    function _getAbsPosition(ele) {
        var abs = {
            left: ele.offsetLeft,
            top: ele.offsetTop
        }
        while (ele.offsetParent !== document.body) {
            ele = ele.offsetParent;
            abs.left += ele.offsetLeft;
            abs.top += ele.offsetTop;
        }
        return abs;
    }

    // 最终版：除了支持this和event还支持：立即执行，函数可能有返回值，支持取消功能
    // immediate 是否立即执行，执行完再进行时间间隔
    function debounce(func, wait, immediate) {
        // console.log(func)
        var timeout, result;
        var debounced = function () {
            var context = this;
            var args = arguments;
            if (timeout) clearTimeout(timeout);
            console.log(immediate === true)
            if (immediate) {
                // 如果执行过，不再执行
                var callNow = !timeout;
                timeout = setTimeout(function () {
                    timeout = null;
                }, wait)
                console.log(callNow)
                if (callNow) result = func.apply(context, args)
            } else {
                timeout = setTimeout(function () {
                    func.apply(context, args);
                }, wait)
            }
            return result;
        };
        debounced.cancel = function () {
            clearTimeout(timeout);
            timeout = null;
        };
        return debounced;
    }
    // 简易版节流
    function throttle(func, wait = 500) {
        var timer;
        return function () {
            var args = arguments;
            if (!timer) {
                timer = setTimeout(() => {
                    func(args)
                    timer = 0;
                    clearTimeout(timer)
                }, wait)
            }
        }
    }
    // 倒计时--获取时间
    function changeTime(h, m, s) {
        var time = ""
        if(h === undefined) return "00:00:00"
        if(h === 0) h = 24; // 修改0点负值bug
        let hours, min, sec;
        var date = new Date();
        if (date.getHours() < 24) {
            hours = h - date.getHours() - 1;
            min = m | 59 - date.getMinutes();
            sec = s | 59 - date.getSeconds();
            time += hours < 10 ? "0" + hours.toString() + ":" : hours.toString() + ":";
            time += min < 10 ? "0" + min.toString() + ":" : min.toString() + ":";
            time += sec < 10 ? "0" + sec.toString() : sec.toString();
        }
        return time;
    }
    window.getCookie = getCookie;
    window.setCookie = setCookie;
    window.delCookie = delCookie;
    window.ajax = ajax;
    window.isObject = isObject;
    window.lazyLoad = lazyLoad;
    window.debounce = debounce;
    window.throttle = throttle;
    window.changeTime = changeTime;
})(window);
