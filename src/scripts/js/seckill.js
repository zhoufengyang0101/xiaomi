; (function (win) {
  var shopList = [
    {
      "goods_id": "313100001",
      "goods_name": "小米全面屏电视65英寸 E65X",
      "desc": "全面屏设计！",
      "title": "「5月9日特惠秒杀1388元！」「价保30天！」",
      "info": "全面屏设计/无边视野/世界精彩一览无余",
      "goods_price": "3299",
      "seckill_Price": "3099",
      "img": "../assets/images/pms_1601189808.02058075.jpg",
      "pc_img": "../assets/images/03a9e7e96a09d256ca1badeec186c859.png",
      "is_test": "0",
    },
    {
      "goods_id": "313100002",
      "goods_name": "小米电视4A 70英寸",
      "desc": "5月9日限时特惠3688元！",
      "title": "70英寸震撼巨屏",
      "info": "70英寸震撼巨屏 / 4K画质 细腻如真 / 杜比音效 身临其境 / PatchWall智能系统 内置小爱同学 / 海量好内容",
      "goods_price": "3999",
      "seckill_Price": "3688",
      "img": "../assets/images/pms_1589855374.71192668.jpg",
      "pc_img": "../assets/images/20d36fbaa18625e4fe507af31e4e9f83.png",
      "is_test": "0",
    },
    {
      "goods_id": "313100003",
      "goods_name": "小米电视4A 70英寸",
      "desc": "5月9日限时特惠3688元！",
      "title": "70英寸震撼巨屏",
      "info": "70英寸震撼巨屏 / 4K画质 细腻如真 / 杜比音效 身临其境 / PatchWall智能系统 内置小爱同学 / 海量好内容",
      "goods_price": "3999",
      "seckill_Price": "3688",
      "img": "../assets/images/pms_1568199413.36224361.jpg",
      "pc_img": "../assets/images/9d8674cd21c486feff5328772ab9cf01.png",
      "is_test": "0",
    },
    {
      "goods_id": "313100004",
      "goods_name": "米家互联网对开门冰箱 540L",
      "desc": "电脑控温,持久保鲜",
      "title": "风冷无霜/环绕出风/纤薄箱体/电脑控温,持久保鲜/智能互联",
      "info": "「风冷无霜对开门热卖爆品，到手价仅2899元！超大容量，分区存储，1级能效，智能操控！」",
      "goods_price": "3699",
      "seckill_Price": "2899",
      "img": "../assets/images/pms_1606296263.35176186.jpg",
      "pc_img": "../assets/images/6bed167fc905bab57dee478bcf1e5e0d.png",
      "is_test": "0",
    },
    {
      "goods_id": "313100005",
      "goods_name": "Redmi全自动波轮洗衣机1A 8kg",
      "desc": "8kg大容量 / 10种洗涤模式",
      "title": "「爆品直降！到手价仅799元！」「10种洗涤模式， 耐腐蚀金属机身 ，桶自洁、桶风干模式，避免细菌滋生，热卖中...」",
      "info": "8kg大容量 / 10种洗涤模式 / 10挡水位调节 / 耐腐蚀金属机身 / 桶自洁、桶风干模式避免细菌滋生 / 空气阻尼减震 / 免运费及基础安装费",
      "goods_price": "899",
      "seckill_Price": "799",
      "img": "../assets/images/pms_1552868299.23297041.jpg",
      "pc_img": "../assets/images/b8c63a2024528fe5410ebe669b7d2407.png",
      "is_test": "0",
    },
    {
      "goods_id": "313100006",
      "goods_name": "Air 13.3 2019款",
      "desc": "轻薄全金属机身",
      "title": "轻薄全金属机身 / MX250独立显卡 / 9.5小时超长续航 / FHD全高清屏幕 / 指纹解锁 / 兼顾办公娱乐与轻薄的高性能笔记本",
      "info": "轻薄全金属机身 / MX250独立显卡 / 9.5小时超长续航 / FHD全高清屏幕 / 指纹解锁 / 兼顾办公娱乐与轻薄的高性能笔记本",
      "goods_price": "6299",
      "seckill_Price": "5699",
      "img": "../assets/images/pms_1559028554.20186490.png",
      "pc_img": "../assets/images/74e573c4c0d89048392d14831cc507d5.png",
      "is_test": "0",
    },
    {
      "goods_id": "313100007",
      "goods_name": "米家互联网烟灶套装（天然气）",
      "desc": "跨界创新一体式集烟腔",
      "title": "烟灶联动 /缔造爆炒大吸力 / 跨界创新一体式集烟腔 / 自动巡航增压 / 磁吸隐藏式油杯 / 易清洁",
      "info": "烟灶联动 /缔造爆炒大吸力 / 跨界创新一体式集烟腔 / 自动巡航增压 / 磁吸隐藏式油杯 / 易清洁",
      "goods_price": "2298",
      "seckill_Price": "2098",
      "img": "../assets/images/pms_1560232653.29021311.jpg",
      "pc_img": "../assets/images/7e5f89adf98ab3fccb34012b5209cd58.png",
      "is_test": "0",
    },
    {
      "goods_id": "313100008",
      "goods_name": "米家电烤箱",
      "desc": "上下独立控温",
      "title": "32L大容积 / 上下独立控温 / 旋转烤叉 / 热风循环 / 40°C恒温发酵 / 120分钟定时 / 支持免定时持续运行",
      "info": "32L大容积 / 上下独立控温 / 旋转烤叉 / 热风循环 / 40°C恒温发酵 / 120分钟定时 / 支持免定时持续运行",
      "goods_price": "299",
      "seckill_Price": "269",
      "img": "../assets/images/pms_1559644554.07563517.jpg",
      "pc_img": "../assets/images/1612c93ad4756215774a0dbec7a81bb2.png",
      "is_test": "0",
    }
  ]

  // 抢购时间 00 10 14  20  22 
  // 当前抢购商品  倒计时距离结束事件 立即抢购

  // 即将开始抢购商品  开抢提醒
  // 第二天开始  明日开抢
  var list = [0, 10, 14, 20, 22, 24];
  var nav = $(".seckill-nav ul");
  var ul = nav[0].children;

  var start = 0; // 记录切换前的下标

  // 确定初次选中 并渲染内容
  function sortList() {
    var date = new Date();
    var h = date.getHours();
    var left = [], right = [];
    for (var i = 0; i < list.length; i++) {
      if (list[i] < h && list[i + 1] > h || list[i] >= h) left.push(list[i]);
      else right.push(list[i]);
    }
    list = left.concat(right);
    renderNavbar(list);
  }

  // 渲染
  function renderNavbar(list) {
    // 去除24
    list.splice(list.indexOf(24), 1);
    list.forEach((item, index, arr) => {
      var li = $(`<li></li>`)
      if (index === 0) {
        li.html(`<b>${item}:00</b><div><span>抢购中</span><span class="secktime"></span></div>`);
        li.addClass("active"); // 初次添加选中类名
        renderShopList(shopList, start === 0 ? "立即抢购" : "开抢提醒") // 初次渲染商品列表
      }
      else if (item < arr[0]) li.html(`<b>${item}:00</b>明日开始`);
      else li.html(`<b>${item}:00</b>即将开始`);
      li.click(function (e) { changeNavbar(e.currentTarget) })
      nav.append(li);
    })
    $(".secktime").html("距结束" + changeTime(list[1]));
    animation()
  }

  // 修改倒计时
  function animation() {
    setInterval(() => {
      // changeTime 在Utils
      $(".secktime").html("距结束" + changeTime(list[1]));
    }, 1000)
  }

  // 切换navbar
  function changeNavbar(elem) {
    var i;  // 获取点击菜单对应的下标
    if (elem.nodeName !== "LI") return;
    Array.from(ul).forEach((item, index) => {
      if (elem === item) {
        i = index;
      }
    })
    // 得到下标i
    $(ul[start]).removeClass("active");
    start = i
    $(ul[i]).addClass("active");
    renderShopList(shopList, start === 0 ? "立即抢购" : "开抢提醒")
  }

  // 渲染商品列表
  function renderShopList(shopList, text) {
    var box = $(".seckill-shoplist ul");
    box.html("");
    shopList.forEach(item => {
      var li = $(`
          <li>
              <div><img src="${item.img}"></div>
              <div>
                  <p>${item.title}</p>
                  <p>${item.desc}</p>
                  <span>${item.seckill_Price}元<del>${item.goods_price}元</del></span>
                  <a class="${text === "立即抢购" ? "active_a" : ""}">${text}</a>
              </div>
          </li>
          `)
      // 绑定数据
      if (text === "立即抢购") item.type = "seckill";  // 商品类型
      else item.type = "shop";
      item.time = list[1];
      li[0].data = item;
      box.append(li);
    })
    $(".seckill-shoplist li").click(function (e) {
      if (e.target.nodeName === "A" && e.target.className !== "active_a") {
        // 点击链接  开抢提醒 
        var info = `<div id="info">
          <h3>设置提醒</h3><br><p>请安装小米商城App，开抢前15分钟获得提醒</p>
        </div>`
        layer.confirm(info, {
          btn: ['小米商城app', '取消'], //按钮
          title: false
        }, function () {
          layer.msg('下载成功！', { icon: 1 });
        });
        return;
      }
      if (e.currentTarget.nodeName === "LI") {
        // 点击商品  去详情页面
        toDetileHandler(e.currentTarget.data)
      }
    })
  }


  win.sortList = sortList;
})(window)