$("#banji").click(function(){
    $(".photo_box2").css({display:"none"})
    console.log($(this).val())
    $(".photo_box2").eq($(this).val()).css({display:"block"})
})
$("#taiyang").click(function () {
    console.log("#taiyang")
    window.location.href="daban_taiyangban.html"
})
$("#daban").click(function () {
    window.location.href="daban_yliangban.html"
})
$("#tiankong").click(function () {
    window.location.href="zhoban_tiankong.html"
})
$("#haiyang").click(function () {
    window.location.href="zhoban_haiyang.html"
})
$("#weife").click(function () {
    window.location.href="xiaoban_weifeng.html"
})
$("#yulu").click(function () {
    window.location.href="xiaoban_yulu.html"
})
$(".shanchu").click(function () {
    $("#p1").remove();
})
$(".shanchu1").click(function () {
    $("#p2").remove();
})
if (typeof FileReader == 'undefined') {
    document.getElementById("xmTanDiv").InnerHTML = "<h1>当前浏览器不支持FileReader接口</h1>";
    //使选择控件不可操作
    document.getElementById("xdaTanFileImg").setAttribute("disabled", "disabled");
}
//选择图片，马上预览
function xmTanUploadImg(obj) {
    var file = obj.files[0];

    console.log(obj);console.log(file);
    console.log("file.size = " + file.size);  //file.size 单位为byte

    var reader = new FileReader();

    //读取文件过程方法
    reader.onloadstart = function (e) {
        console.log("开始读取....");
    }
    reader.onprogress = function (e) {
        console.log("正在读取中....");
    }
    reader.onabort = function (e) {
        console.log("中断读取....");
    }
    reader.onerror = function (e) {
        console.log("读取异常....");
    }
    reader.onload = function (e) {
        console.log("成功读取....");

        var img = document.getElementById("xmTanImg");
        img.src = e.target.result;
        //或者 img.src = this.result;  //e.target == this
    }

    reader.readAsDataURL(file)
}
$("#fabu").on("click",function () {
    let imgsrc =$('#xmTanImg').attr("src")
    $("#kk").append(`<div class="col-sm-6 col-md-3">
                             <a href="#" class="thumbnail">
                                 <img src=${imgsrc} alt="">
                             </a>
                         </div>`)
})


