const shop_ather: HTMLLIElement | null = document.querySelector(".shop_ather");
const shop_commend: HTMLLIElement | null = document.querySelector(".shop_commend");
const shop_car: HTMLLIElement | null = document.querySelector(".shop_car");
const empty_car: HTMLLIElement | null = document.querySelector(".empty_car")

// 获取localstorage
var shopList = JSON.parse(localStorage.getItem("shopList")!);
renderShopCar(shopList)

// 渲染购物车
function renderShopCar(shopList: any) {
    if (!shopList?.length) {
        shop_commend!.style.display = "block";
        return;
    } else {
        shop_ather!.style.display = "block";
        empty_car!.style.display = "none";
    }
    var car = document.createElement("div");
    car.className = "car_box center clearfix";
    // 创建购物车头
    var opt = {
        check: "全选",
        is_test: 0,
        img: "",
        goods_name: "商品名称",
        goods_price: "单价",
        num: "数量",
        total: "小记",
        action: "操作"
    }
    var t = shopList.every((item: any) => {
        return item.is_test === 1;
    })
    // 是否全部选择
    opt.is_test = t ? 1 : 0;
    var car_head = createOne(opt);
    car_head.className = "car_head";
    car.appendChild(car_head);
    var car_body = document.createElement("div");
    car_body.className = "car_body";
    var plus_price = 0;
    var num_shop = 0;
    var select_num = 0;
    shopList.forEach((item: any) => {
        item.total = item.num * Number(item.goods_price)
        if (item.is_test === 1) {
            plus_price += item.total;
            select_num += item.num;
        }
        num_shop += item.num;
        car_body.appendChild(createOne(item))
    });
    car.appendChild(car_body);
    shop_car?.appendChild(car);
    // 创建尾
    shop_car?.appendChild(createOver(num_shop, select_num, plus_price));
}

// 创建一行： 选择框 图片 名称 单价 数量 小记 操作
function createOne(data: any) {
    var div: any = document.createElement("div");
    div.data = data
    div.addEventListener("click", clickCarHandler)
    var img = `<img src="${data.img}" />`;
    var number = `
        <div class="change-num">
            <i class="iconfont icon-jian"></i><input value="${data.num}" class="shop_num" /><i class="iconfont icon-jia"></i>
        </div>
    `;
    var del = `<i class="iconfont icon-guanbi"></i>`
    div.innerHTML = `
        <div class="car_check"><i class="iconfont icon-check${data.is_test === 1 ? " checked" : ""}"></i>${data.check ? data.check : ""}</div>
        <div class="car_img">${data.img !== "" ? img : ""}</div>
        <div class="car_name">${data.goods_name}</div>
        <div class="car_price">${data.goods_price === "单价" ? data.goods_price : data.goods_price + "元"}</div>
        <div class="car_num">${typeof data.num === "number" ? number : data.num}</div>
        <div class="car_total">${data.total === "小记" ? data.total : data.total + "元"}</div>
        <div class="car_action">${data.action === "操作" ? "操作" : del}</div>
    `;
    return div;
}

// 创建尾
function createOver(num_shop: number, select_num: number, plus_price: number) {
    var overDiv = document.createElement("div");
    overDiv.className = "car_foot center"
    overDiv.innerHTML = `
        <div class="over_left">
            <a href="./index.html">继续购物</a>
            <span>共<b>${num_shop}</b>件商品，已选择<b>${select_num}</b>件</span>
        </div>
        <div class="over_right">
            <b>合计：<i>${plus_price}</i>元</b>
            <a>去结算</a>
        </div>
    `;
    return overDiv
}

// 购物车操作
function clickCarHandler(e: any) {
    // 当前商品绑定的数据
    // console.log(e.currentTarget.data)
    // console.log(e.target.className)
    //重新获取localstorage
    var local = JSON.parse(localStorage.getItem("shopList")!);
    var index: any, car_data;
    local.forEach((item: any, i: any) => {
        if (item.goods_id === e.currentTarget.data.goods_id) {
            index = i;
            car_data = e.currentTarget.data;
        }
    });
    // 查找不到时
    if (index === undefined) {
        // 点击全选时
        if (e.target.className === "iconfont icon-check") {
            // 需要修改chec
            local.forEach((item: any) => {
                item.is_test = 1
            })
        } else if (e.target.className === "iconfont icon-check checked") {
            // 需要修改chec
            local.forEach((item: any) => {
                item.is_test = 0
            });
        }
        // 其他情况return
        else return;
    } else {
        switch (e.target.className) {
            case "iconfont icon-guanbi":
                window.confirm("确定要删除吗？") ? local.splice(index, 1) : "";
                break;
            case "iconfont icon-jia":
                local[index].num < 20 ? local[index].num++ : "";
                break;
            case "iconfont icon-jian":
                local[index].num > 1 ? local[index].num-- : "";
                break;

            case "iconfont icon-check checked":
                local[index].is_test = 0;
                break;
            case "iconfont icon-check":
                local[index].is_test = 1;
                break;
            case "car_name":
                localStorage.setItem("shop", JSON.stringify(car_data));
                window.location.href = "detail.html";
                break;
            case "shop_num":
                e.target.addEventListener("blur", () => {
                    var val = ~~e.target.value.replace(/\D/g, "");
                    // console.log(val < 1)
                    if (val < 1) local[index].num = 1;
                    else if (val > 20) local[index].num = 20;
                    else local[index].num = val;
                    reload(local);
                })
                return
            default: return;
        }
    }
    reload(local);
}

// 重新绘制
function reload(local:any) {// 重新设置localstorage
    localStorage.setItem("shopList", JSON.stringify(local));
    // 清除购物车
    shop_car!.innerHTML = ""
    // 重新渲染购物车
    renderShopCar(local);
}