
// goods_list是商品列表的ul的类名  商品共有七类
const shopDiv: any = document.querySelectorAll(".goods_list a");
const goTop: HTMLElement | null = document.querySelector(".go_top");

init();
function init() {
    // goTop?.addEventListener()
    // 滚动事件监听  需要节流
    document.addEventListener("scroll", scrollHandler)
}

function scrollHandler(e: any) {
    const scrollTop = document.documentElement.scrollTop;
    // 显示隐藏初次bug
    goTop!.style.display = scrollTop > 600 ? "block" : "none";
}

shopDiv.forEach((item: any) => {
    item.href = "javascript:void(0)";
    // item.addEventListener("click", function (e: Event) {
    //     clickHandler(item);
    // });
})

function clickHandler(item: Element) {
    // 点击商品跳转至商品详情页面
    console.log(item);
    window.location.href = "./detail.html";
}

// 倒计时
function changeTime() {
    var time = document.querySelector(".time");
    let hours, min, sec;
    var date = new Date();
    if (date.getHours() < 22) {
        hours = 22 - date.getHours() - 1;
        min = 59 - date.getMinutes();
        sec = 59 - date.getSeconds();
        time!.children[0].innerHTML = hours < 10 ? "0" + hours.toString() : hours.toString();
        time!.children[1].innerHTML = min < 10 ? "0" + min.toString() : min.toString();
        time!.children[2].innerHTML = sec < 10 ? "0" + sec.toString() : sec.toString();
    }
}

// 轮播图
var direction: string, x: number, bool: boolean, pos = 0, prev: any, autoBool: boolean = true;
const WIDTH = 1226, speed = 100;
let time = 200;
const bannerDiv: HTMLElement | null = document.querySelector(".banner");
bannerDiv?.addEventListener("mouseleave", () => { autoBool = true })
bannerDiv?.addEventListener("mouseenter", () => { autoBool = false })
const imgCon: any = document.querySelector(".imgCon");
imgCon!.style.width = 1226 * 2 + "px";
const ulDot: HTMLElement = document.createElement("ul");
const left: HTMLElement | null = document.querySelector(".lunbo-left");
const right: HTMLElement | null = document.querySelector(".lunbo-right");
left?.addEventListener("click", function () {
    direction = "right";
    pos--;
    if (pos < 0) pos = imgList.length - 1;
    createNextImg();
});
right?.addEventListener("click", function () {
    direction = "left";
    pos++;
    if (pos > imgList.length - 1) pos = 0;
    createNextImg();
});
ulDot.className = "ulDot";
const imgList: string[] = ["./assets/images/banner_01.jpg", "./assets/images/banner_02.jpg", "./assets/images/banner_03.jpg", "./assets/images/banner_04.jpg", "./assets/images/banner_05.jpg"];
// 添加第一个图片
imgCon.appendChild(getItem(imgList[0]));
imgList.forEach(() => {
    const li = createLiDot();
    ulDot.appendChild(li);
});
bannerDiv?.appendChild(ulDot);
ulDot.addEventListener("click", clickDotHandler)

// 创建小圆点
function createLiDot() {
    var liDot: HTMLElement = document.createElement("li");
    return liDot
}
// 点击小圆点
function clickDotHandler(e: any) {
    if (e.target.nodeName !== "LI") return;
    const index = Array.from(ulDot.children).indexOf(e.target);
    if (index === pos) return;
    direction = index > pos ? "left" : "right";
    pos = index;
    createNextImg();
}

// 创建下一张图片
function createNextImg() {
    if (direction === "left") {
        imgCon!.appendChild(getItem(imgList[pos]));
        x = 0;
    } else {
        imgCon!.insertBefore(getItem(imgList[pos]), imgCon!.firstElementChild);
        x = -WIDTH;
    }
    imgCon!.style.left = x + "px";
    prevChange();
    bool = true;
}
// 创建图片
function getItem(src: any) {
    const img = document.createElement("img");
    img.src = src;
    return img;
}

// 切换
function prevChange() {
    if (prev) prev.style.backgroundColor = "#ddd";
    prev = ulDot.children[pos];
    prev.style.backgroundColor = "#ff6700";
}

function update() {
    imgConMove();
    autoPlayCarousel();
}

function imgConMove() {
    if (!bool) return;
    if (direction === "left") {
        x -= speed;
        if (x <= -WIDTH) {
            imgCon.firstElementChild.remove();
            x = 0;
            bool = false;
        }
    } else {
        x += speed;
        if (x >= 0) {
            imgCon.lastElementChild.remove();
            x = 0;
            bool = false;
        }
    }
    imgCon!.style.left = x + "px";
}

function autoPlayCarousel() {
    // 自动播放
    if (!autoBool) return;
    time--;
    if (time > 0) return;
    time = 300;
    var evt = new MouseEvent("click");
    document.querySelector(".lunbo-right")!.dispatchEvent(evt);
}

// 节流函数
var timer:any = 0;
var _throttle = (func: any, wait = 500) => {
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


function animation() {
    requestAnimationFrame(animation);
    update();
    _throttle(changeTime, 1000)()
}
animation()


