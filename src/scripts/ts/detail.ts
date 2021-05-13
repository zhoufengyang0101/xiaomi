
// 获取localstorage
const data = JSON.parse(localStorage.getItem("shop")!);
var center = document.querySelector(".detail_box");

renderDetail()
// 渲染详细信息
function renderDetail() {
    var kill_price = `<span>${data.seckill_Price}</span>
                        <del>${data.goods_price}</del>`;
    var price = `<span>${data.goods_price}</span>`;
    var del = `<p>${data.goods_name} &emsp;&emsp;${data.seckill_Price}元&emsp;<del>${data.goods_price}元</del></p>`;
    var nodel = `<p>${data.goods_name} &emsp;&emsp;${data.goods_price}元</p>`
    var seckill = `<div class="detail_seckill">
        <span>秒杀价￥<b>${data.seckill_Price}</b></span>
        <span>市场价￥<del>${data.goods_price}</del></span>
        <div>距结束<em>00:00:00</em></div>
    </div>`
    var detail_price = `<div class="detail_price">
        ${data.seckill_Price ? kill_price : price}
        </div>`;
    return center!.innerHTML = `
    <div class="zoom">
        <div class="zoom-min" style='background-image: url("${data.img}")'>
            <div class="zoom-mask"></div>
        </div>
        <div class="zoom-max"></div>
    </div>
    <!-- 商品详细信息 -->
    <div class="detail">
        <h2>${data.goods_name}</h2>
        <p class="detail_detail">
        <font color="#ff4a00">
            ${data.title} 
        </font>
        ${data.info}
        </p>
        <p title="小米自营">小米自营</p>
        ${data.type && data.type === "seckill" ? seckill : detail_price}
        <div class="detail_address">
            <p>北京北京市海淀区清河街道修改
            <br>有现货</p>
        </div>
        <div class="select_color">
            <h3>选择颜色</h3>
            <ul class="clearfix">
                <li>白色</li>
            </ul>
            <div>
            ${data.seckill_Price ? del : nodel}
            <span>总计：${data.seckill_Price ? data.seckill_Price : data.goods_price}元</span>
        </div>
    </div>
    <div class="shop_buy">
        <button class="shop_car">${data.type && data.type === "seckill" ? "立即抢购" : "加入购物车"}</button>
        <button class="shop_like">喜欢</button>
    </div>
    <div class="shop_tab">
        <em class="iconfont icon-zhengque"></em>小米自营
        <em class="iconfont icon-zhengque"></em>小米发货
        <em class="iconfont icon-zhengque"></em>支持7天无理由退货（安装后不支持）
        <em class="iconfont icon-zhengque"></em>运费说明
        <em class="iconfont icon-zhengque"></em>企业信息
        <em class="iconfont icon-zhengque"></em>售后服务政策
        <em class="iconfont icon-zhengque"></em>30天价格保护
    </div>
</div>
    `;
}

// 放大镜
const MIN_WIDTH = 500, MAX_WIDTH = 600;
var min: HTMLElement | null,
    mask: HTMLElement | null,
    max: HTMLElement | null,
    rect: any;
var x: number, y, maskWidth = 0;

initZoom();
function initZoom() {
    min = document.querySelector(".zoom-min");
    max = document.querySelector(".zoom-max");
    mask = document.querySelector(".zoom-mask");
    rect = document.querySelector(".zoom")!.getBoundingClientRect();
    min!.addEventListener("mouseenter", mouseHandler);
    min!.addEventListener("mouseleave", mouseHandler);
}
function mouseHandler(e: any) {
    if (e.type === "mouseenter") {
        var img = new Image();
        img.src = getComputedStyle(e.target).backgroundImage.slice(5, -2);
        img.addEventListener("load", loadHandler);
        mask!.style.display = "block";
        max!.style.display = "block";
        max!.style.backgroundImage = getComputedStyle(e.target).backgroundImage;
        min!.addEventListener("mousemove", mouseHandler);
    } else if (e.type === "mouseleave") {
        mask!.style.display = "none";
        max!.style.display = "none";
        min!.removeEventListener("mousemove", mouseHandler);
    } else if (e.type === "mousemove") {
        x = e.x - rect.x - maskWidth / 2;
        y = e.y - rect.y - maskWidth / 2;
        if (x < 0) x = 0;
        else if (x > rect.width - maskWidth) x = rect.width - maskWidth;
        if (y < 0) y = 0;
        else if (y > rect.height - maskWidth) y = rect.height - maskWidth
        mask!.style.left = x + "px";
        mask!.style.top = y + "px";
        var scale = MAX_WIDTH / maskWidth;
        max!.style.backgroundPositionX = -scale * x + "px";
        max!.style.backgroundPositionY = -scale * y + "px";
    }
}

function loadHandler(e: any) {
    // // 计算小黄快的宽高 大盒子宽度除以大图宽度 乘以小盒子宽度
    maskWidth = MAX_WIDTH / e.target.width * MIN_WIDTH;
    mask!.style.width = maskWidth + "px";
    mask!.style.height = maskWidth + "px";
}

// 加入购物车
const goToCar = document.querySelector(".shop_car");
goToCar?.addEventListener("click", toCarHandler);
function toCarHandler(e: Event) {

    // 登录判断：未登录跳转至登录页面登录        登录直接至购物车
    let reg = new RegExp('(^|)' + "login" + '=([^;]*)(;|$)');
    let login;
    if(document.cookie.match(reg)) {
        login = JSON.parse(document.cookie.match(reg)![2]);
    }
    if(!login) {
        window.location.href = "./login.html";
        return
    }

    // 使用localstorage存储购物车商品
    // 获取localstorage
    var storage = localStorage.getItem("shopList")
    var shopList = JSON.parse(storage!);

    // 判断shopList是否为空  是 重新设置[]
    if (shopList === null) shopList = [];
    // 给data一个计数的属性
    data.num = 1
    data.total = data.num * data.goods_price
    var addShop = true;
    // 判断商品是否已经存在 是 商品数量加1
    for (var prop in shopList) {
        if (shopList[prop].goods_id === data.goods_id) {
            shopList[prop].num++;
            addShop = false
        }
    }
    // addShop为false时，添加
    if (addShop) shopList.push(data);

    // 重新设置localstorage
    localStorage.setItem("shopList", JSON.stringify(shopList!))
    // 去购物车页面
    window.location.href = "./shopCar.html";
}


// 选项卡
var selNav = document.querySelector(".selcar_nav");
var selMain: any = document.querySelector(".selcar_main");
var start = 0; // 记录初始下标
renderSelCar(0);
select();
function select() {
    selNav?.addEventListener("click", changeSelNav);
    // var evt = new MouseEvent();
}
function changeSelNav(e: any) {
    var elem = e.target
    if (elem.className === "selcar_nav") return
    var list = Array.from(selNav!.children)
    var index = list.indexOf(elem);
    if(index === start) return;
    list[index].classList.add("selcar_active");
    list[start].classList.remove("selcar_active");
    selMain!.children[start].style.display = "none";
    selMain!.children[index].style.display = "block";
    renderSelCar(index)
    console.log(index)
    start = index;
}
function renderSelCar(i: number) {
    var lis = selMain.children;
    switch (i) {
        case 0:
            lis[0].innerHTML = `
                <img src="${data.img}"/><br>
                <img src="${data.pc_img}"/><br>
                <img src="./assets/images/a482afa34053b1b32ece1023475af7fb.png"/>
                `;
            break;
        case 1:
            lis[1].innerHTML = `
                <h3>${data.goods_name}</h3>
                <p>${data.title}</p>
                <p>${data.desc}</p>
                <p>${data.info}</p>
                <p>已下单商品，请在小米提示的时间内点击付款，如您在小米提示的时间内未进行付款的，订单将会自动关闭；如相关商品小米另有规定的，以具体规定为准。 当出现订单信息填写不完整、商品无货、地址信息不匹配等情形时，订单有可能无法提交成功。</p>
            `;
            break;
        case 2:
            lis[2].innerHTML = `
                <p><span>future:</span>这个商品我给五星</p>
                <p><span>楚汉传奇:</span>这个商品我打满分</p>
                <p><span>官方回复:</span>山在那里，努力的人会继续前行。你的宝贵反馈也在那里，我们也会继续改进升级。有任何问题您都可以咨询咱们的客服MM哦，我们很乐意帮助您哒，感谢您的支持，祝您生活愉快！感谢您的支持，祝您生活愉快！</p>
            `;
            break;
    }
}