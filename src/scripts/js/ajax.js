export default class Ajax {
    options;
    data = "";  // 请求发送的数据
    xhr;  
    contentType; // 设置请求内容头部
    req_type;  // 请求发送类型大写
    _default = { type: "GET" };
    // 接收对象中必需：options.url请求地址  
    //          可选：options.data发送的数据
    //               options.type请求类型 默认为get
    //               options.contentType 设置请求内容头部 默认值：application/x-www-form-urlencoded
    constructor(options) {
        this.options = options;
        this.optionType();
    }
    // 判断是否为对象 给定默认值
    optionType() {
        if(!this.options) this.options = {};
        // 
        for(var prop in this.options) {
            this._default[prop] = this.options[prop];
        }
        this.options = this._default;
        this.contentType = this.options.contentType; 
        this.optionData();
    }
    // 处理options中的data
    optionData() {
        if(this.isObject(this.options.data)) {
            for(var prop in this.options.data) {
                this.data += "&" + prop + "=" + this.options.data[prop];
            }
            this.data = this.data.slice(1);
        }
        this.requestType();
    }
    // 处理请求方式
    requestType() {
        // GET 方式
        this.req_type = this.options.type.toUpperCase();
        if(this.req_type === "GET") {
            this.options.url += "?" + this.data;
        } 
        // POST 方式
        if(this.req_type === "POST"){
            console.log('post', this.data);
        }
        this.requestSend();
    }
    // 发送请求
    requestSend() {
        this.xhr = new XMLHttpRequest();
        this.xhr.open(this.req_type, this.options.url);
        // 发送数据
        if(this.req_type === "POST"){
            this.xhr.setRequestHeader("Content-Type", this.contentType);
        }
        this.xhr.send(this.req_type === "GET" ? null : this.data);
        // 监听请求状态，当readyState改变时触发
        this.xhr.addEventListener("readystatechange", e => this.readyStateHandler(e));
    }
    // 判断是否为对象
    isObject(obj) {
        return (typeof obj === "object" && obj !== null && !(obj instanceof Array))
    }
    // 处理请求结果
    readyStateHandler(e) {
        if (this.xhr.readyState === 4 && /^2\d{2}$/.test(this.xhr.status)) {
            typeof this.options.callback === "function" ? this.options.callback(this.xhr.response) : "返回信息";
      }
    }
}