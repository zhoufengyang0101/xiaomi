; (function (window) {
    // 退出登录
    function exitLogin() {
        // 显示用户登录
        var user = document.querySelector("#user");
        var cook = JSON.parse(getCookie("login"));
        if (cook) {
            user.innerHTML = `<span>${cook.username}</span>
                    <span class="iconfont icon-you"></span>
                    <div>退出登录</div>
                    `
        }
        // 退出登录
        var user = document.querySelector("#user div");
        if (user) {
            user.addEventListener("click", function () {
                // 删除cookie
                delCookie("login", "/");
                history.go(0);
            })
        }
    }
    // input输入框改变事件
    function inputChange() {
        var find_url = "http://d38893333x.zicp.vip//php/login_register/findShop.php"
        var options;
        // input框
        var input = $(".serch input");
        // 下拉列表
        var searchList = $(".search-list");
        input.focus(function () {
            searchList.css("display", "block");
        });
        input.blur(function () {
            searchList.css("display", "none");
        });
        // 监听input框值改变  
        // 把回调函数放在外边  实现节流
        // 添加节流之后首页搜索框 
        input.bind('input propertychange', throttle(inputChangeHandler, 500));

        function inputChangeHandler() {
            var goods_name = $.trim($(".serch input").val());
            // console.log(goods_name)
            // 首页搜索框无法获取input监听
            options = {
                url: find_url,
                data: {
                    goods_name: goods_name,
                }
            }
            ajax(options).then(res => {
                _renderSearchList(res);
            })
        }
        // 点击搜索按钮
        // 把回调函数放在外边  实现防抖
        $(".serch a span").click(debounce(clickSearchHandler, 1500, true))
        function clickSearchHandler() {
            var goods_name = $.trim($(".serch input").val());
            options = {
                url: find_url,
                data: {
                    goods_name: goods_name,
                }
            }
            ajax(options).then(res => {
                // 将搜索商品存储在sessionStorage（页面关闭就自动清理）
                sessionStorage.setItem("searchShop", JSON.stringify(res));

                renderShopList($(".goods_list"), res)
                window.location.href = "./search.html"
            })
        }
    }
    // 渲染下拉列表
    function _renderSearchList(data) {
        var searchList = $(".search-list")
        searchList.html('');
        for (var i = 0; i < (data.length < 10 ? data.length : 10); i++) {
            searchList.append($("<li></li>").text(data[i].goods_name))
        }
    }

    // 渲染商品列表
    // box 商品渲染的盒子  dataList 商品数据列表
    function renderShopList(box, dataList) {
        // 判断box是否为jquery对象
        if (box instanceof jQuery === false) box = $(box);
        // 将页面已有商品清空
        box.html("");
        // 判断dataList类型
        if (typeof dataList === "string") dataList = JSON.parse(dataList);
        if (dataList.length) {
            /* for (var i = 0; i < (dataList.length > 50 ? 50 : dataList.length); i++) {
                var li = createLi(dataList[i]);
                // 可以添加点击去详情页的 事件
                li.addEventListener("click", function () { toDetileHandler(dataList[i]) })
                box.append(li);
            } */
            dataList.forEach((item, index) => {
                if (index < 50) {
                    var li = createLi(item);
                    // 可以添加点击去详情页的 事件
                    li.addEventListener("click", function () { toDetileHandler(item) })
                    box.append(li);
                }
            });
        } else {
            box.append($("<h1 id='no-shop'>没有商品！</h3>"))
        }


    }

    // 创建一个商品
    function createLi(data) {
        // console.log(data.seckill_Price)
        var li = document.createElement("li");
        var kill_price = `<p class="price">${data.seckill_Price}元&nbsp;<span>${data.goods_price}元</span></p>`;
        var price = `<p class="price">${data.goods_price}元</p>`;
        li.innerHTML = `
        <a>
            <img src="${data.pc_img}" alt="${data.desc}">
            <h3>${data.goods_name}</h3>
            <p>${data.desc}</p>
            ${data.seckill_Price ? kill_price : price}
        </a>
      `
        return li;
    }

    // 去详情页面
    function toDetileHandler(data) {
        localStorage.setItem("shop", JSON.stringify(data))
        window.location.href = "./detail.html";
    }

    window.exitLogin = exitLogin;
    window.inputChange = inputChange;
    window.renderShopList = renderShopList;
    window.toDetileHandler = toDetileHandler;
})(window);