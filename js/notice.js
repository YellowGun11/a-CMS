
// ------------------------------3组 刘树道------------------------------

//---------------------内容span元素浮动
$("#notice_show_myDiv_ul>li>span:nth-of-type(1)").css("float", "left");
$("#notice_show_myDiv_ul>li>span:nth-of-type(2)").css("float", "right");

//---------------------内容上面标题元素样式
$("#notice_show_header").css({
    "margin":"auto",
    "width":"96%",
    "height":"30px",
    "padding-top":"5px",
    "line-height":"14px",
    "background-color":"#337ab7",
});
$("#notice_show_header span:nth-of-type(1)").css({
    "color":"white",
    "float":"left",
    "margin-left":"10px",
});
$("#notice_show_header span:nth-of-type(2)").css({
    "color":"white",
    "float":"right",
    "margin-right":"10px",
});

//---------------------发布公告按钮
$("#notice_show_btnDiv").click(function(){
    $("#notice_issue").animate({
        top:"-565px"
    },700)
});
$("#notice_show_btnDiv").css({
    "width":"100px",
    "height":"66px",
});

$("#notice_activate_True").css({
    "width":"100px",
    "height":"40px",
});
$("#notice_activate_False").css({
    "width":"100px",
    "height":"40px",
});

//---------------------点击发送，取消按钮  获取当前时间  判断是否有标题内容
$("#notice_show_send").click(function () {
    var obj = new Object();
    obj.theme = $("#notice_issue_theme").val();
    obj.details = $("#notice_issue_details").val();
    obj.usertext = $("textarea").val();

    //-----------------------时间
    var myDate = new Date();
    /*myDate.getYear(); //获取当前年份(2位)
      myDate.getFullYear(); //获取完整的年份(4位,1970-????)
      myDate.getMonth(); //获取当前月份(0-11,0代表1月)
      myDate.getDate(); //获取当前日(1-31)
      myDate.getDay(); //获取当前星期X(0-6,0代表星期天)
      myDate.getTime(); //获取当前时间(从1970.1.1开始的毫秒数)
      myDate.getHours(); //获取当前小时数(0-23)
      myDate.getMinutes(); //获取当前分钟数(0-59)
      myDate.getSeconds(); //获取当前秒数(0-59)
      myDate.getMilliseconds(); //获取当前毫秒数(0-999)
      myDate.toLocaleDateString(); //获取当前日期
      var mytime=myDate.toLocaleTimeString(); //获取当前时间
      myDate.toLocaleString( ); //获取日期与时间*/
    obj.nowdate = myDate.getFullYear() + "年" + (myDate.getMonth() + 1) + "月" + myDate.getDate() + "日" + "   " + myDate.getHours() + ":" + myDate.getMinutes();
    if (obj.theme != "") {
        if (obj.usertext != "") {
            notice_show_add(obj);
            notice_show_myModal(obj);
            notice_show_send_clear();
            $("#notice_issue").animate({
                top: "0"
            }, 700);
            $("#notice_issue_hint").css("opacity", "0");
        } else {
            $("#notice_issue_hint").text("请输入内容").css("opacity", "1");
        }
    } else {
        $("#notice_issue_hint").text("请输入标题").css("opacity", "1");
    }
});

//---------------------点击取消按钮模态框消失(透明度变为0)
$("#notice_show_close").click(function () {
    $("#notice_issue").animate({
        top: "0"
    }, 700);
    $("#notice_issue_hint").css("opacity", "0");
});

//---------------------点击图像所在的位置选择自己的本地图片
/*上传图片教学
https://blog.csdn.net/aixiaoyang168/article/details/49468337?locationNum=10&fps=1*/
function checkImg(file) {
    let myWidth = 100;
    let myHeight = 100;
    let div = document.getElementById('check');
    if (file.files && file.files[0]) {
        div.innerHTML = '<img id=myImg onclick=$("#checkImg").click()>';
        let img = document.getElementById('myImg');
        img.onload = function () {
            var rect = AddScale(myWidth, myHeight, img.offsetWidth, img.offsetHeight);
            img.width = rect.width;
            img.height = rect.height;
            img.style.marginTop = rect.top + 'px';
        };
        let reader = new FileReader();
        reader.onload = function (evt) {
            img.src = evt.target.result;
        };
        reader.readAsDataURL(file.files[0]);
    }
    else
    {
        div.innerHTML = '<img id=myImg>';
        let img = document.getElementById('myImg');

        let rect = AddScale(myWidth, myHeight, img.offsetWidth, img.offsetHeight);
        status = ('rect:' + rect.top + ',' + rect.left + ',' + rect.width + ',' + rect.height);
        div.innerHTML =
            "<div id = myHead style = 'width:" + rect.width + "px;"
            + "height:" + rect.height + "px; margin-right: 30px;"
            + "margin-top:" + rect.top + "px;"
            + sFilter + src + "\"'>"
            + "</div>";
    }
}

//---------------------把图片显示区域设置为固定大小
function AddScale(myWidth, myHeight, width, height) {
    var scale = {top: 0, left: 0, width: width, height: height};
    if (width > myWidth || height > myHeight) {
        rateWidth = width / myWidth;
        rateHeight = height / myHeight;
        if (rateWidth > rateHeight) {
            scale.width = myWidth;
            scale.height = Math.round(height / rateWidth);
        } else {
            scale.width = Math.round(width / rateHeight);
            scale.height = myHeight;
        }
    }
    scale.left = Math.round((myWidth - scale.width) / 2);
    scale.top = Math.round((myHeight - scale.height) / 4);
    return scale;
}

//---------------------点击发送按钮返回选中值
function notice_show_send_clear() {
    // 返回被选中元素的值
    $("#notice_issue_theme").val("");
    $("#notice_issue_details").val("");
    $("textarea").val("");
}

//---------------------分页
const myNum = 6;//---------------每页显示的数量
var myDate = [];//---------------日期
var pages = Math.ceil(myDate.length / myNum);
var thisDate = function (curr) {
    let str = '', last = curr * myNum - 1;
    last = last >= myDate.length ? (myDate.length - 1) : last;
    for (let i = (curr * myNum - myNum); i <= last; i++) {
        str = str + myDate[i];
    }
    return str;
};

//---------------------layPage插件
function notice_show_add(obj) {
    let str = "<li data-toggle='modal' data-target=#li" + (myDate.length + 1) + " name=li" + (myDate.length + 1) + "><span>" + obj.theme + "</span><span>" + obj.nowdate + "</span></li>";
    myDate.push(str);
    pages = Math.ceil(myDate.length / myNum);

    //-----------------调用分页插件
    laypage({
        cont: 'notice_show_two',//容器。id、dom对象，jquery对象
        pages: pages,//--------------------------------总页数
        group: 3,//----------------------------最多可显示的页数
        /*curr: 1, //当前页
        skin: '#ffc900',//分页按钮的样式
        skip: true,//是否开启跳页
        limit: 10,
        first: '首页',
        last: '尾页',
        prev: '上一页',
        next: '下一页',*/
        jump: function (obj) {
            document.getElementById('notice_show_myDiv_ul').innerHTML = thisDate(obj.curr);
        }
    })
}

//---------------------添加模态框
function notice_show_myModal(obj) {
    let myTest = "&emsp;";
    // ----------------单行文本对齐
    $("body").append(
        "<div class='modal fade' id = li" + (myDate.length) + ">" +
        "<div class= 'modal-dialog bs-example-modal-lg modal-lg mySize' id='mySize'>" +
        "<div class='modal-content'>" +
        "<div class='modal-header' style='text-align: center'>" +
        "<h3>" + obj.theme + "</h3>" +
        "<span>" + obj.nowdate + "</span>" +
        "<button class='close' data-dismiss='modal'>" +
        "</button>" +
        "</div>" +
        "<div class='media-body'>" +
        "<div class='form-group myTest' id='myTest'>" +
        "<span>" + myTest + obj.usertext + "</span>" +
        "</div>" +
        "</div>" +
        "<div class='modal-footer'>" +
        "<button class='btn btn-danger' onclick='myDell(this)' data-dismiss='modal'>删除</button>" +
        "<button class='btn btn-danger'  data-dismiss='modal' >关闭</button>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>"
    )}

//---------------------删除模态框
var myShanchu = $('li', $("#notice_show_myDiv_ul")).length;
var myClient = 0;
function myDell(obj) {
    myClient = obj.parentNode.parentNode.parentNode.parentNode.getAttribute("id");
    $("li[name=" + myClient + "]").remove();

}


//---------------------接收人页面
$("#notice_myImg").click(function () {
    // console.log(111);
    $("#myBox").animate({
        top:"-1120px"
    },600)
});
$("#notice_activate_True").click(function () {
    $("#myBox").animate({
        top:"0"
    },700)
});
$("#notice_activate_False").click(function () {
    $("#myBox").animate({
        top:"100"
    },0)
});

var myTeacher=true;
function noticeSendTwo(){
    if(myTeacher==true){
        $("#notice_send_box_box2").animate({"height":"120px"},500);
        myTeacher=false;
    }else if(myTeacher==false){
        $("#notice_send_box_box2").animate({"height":"0"},500);
        myTeacher=true
    }
}//-----老师
var theLarge=true;
function noticeSendThree(){
    if(theLarge==true){
        $("#notice_send_box_box3").animate({"height":"90px"},500);
        theLarge=false;
    }else if(theLarge==false){
        $("#notice_send_box_box3").animate({"height":"0"},500);
        theLarge=true
    }
}//---大班
var theMiddle=true;
function noticeSendFour(){
    if(theMiddle==true){
        $("#notice_send_box_box4").animate({"height":"90px"},500);
        theMiddle=false;
    }else if(theMiddle==false){
        $("#notice_send_box_box4").animate({"height":"0"},500);
        theMiddle=true
    }
}//----中班
var theSmall=true;
function noticeSendFive(){
    if(theSmall==true){
        $("#notice_send_box_box5").animate({"height":"90px"},500);
        theSmall=false;
    }else if(theSmall==false){
        $("#notice_send_box_box5").animate({"height":"0"},500);
        theSmall=true
    }
}//----小班


//---------------------------------------------------------1
var allOne=true;
$("#notice_send_box_one_div1").click(function(){
    if(allOne==true){
        $("<div id='notice_send_activates_newTest_1' onclick='notice_send_to_Test_1()'><div/>")
            .html($("#notice_send_box_one_div1").html()).appendTo($("#notice_activate"));
        allOne=false;
    }else if(allOne==false){
        $("#notice_send_activates_newTest_1").remove();
        allOne=true;
    }
});
function notice_send_to_Test_1(){
    $("#notice_send_activates_newTest_1").remove();
    allOne=true;
}

//---------------------------------------------------------2
var x;
var teaOne=true;
$("#notice_send_to_myText1_1").click(function(){
    x = $("#notice_send_to_myText1_1").text();
    if(teaOne==true){
        $("<div id='notice_send_activates_newTest1_1' onclick='notice_send_to_Test1_1()'><div/>")
            .html($("#notice_send_to_myText1_1").html()).appendTo($("#notice_activate"));
        teaOne=false;
    }else if(teaOne==false){
        $("#notice_send_activates_newTest1_1").remove();
        teaOne=true;
    }
});
function notice_send_to_Test1_1(){
    $("#notice_send_activates_newTest1_1").remove();
    teaOne=true;
}
var teaTwo=true;
$("#notice_send_to_myText1_2").click(function(){
    x = $("#notice_send_to_myText1_2").text();
    if(teaTwo==true){
        $("<div id='notice_send_activates_newTest1_2' onclick='notice_send_to_Test1_2()'><div/>")
            .html($("#notice_send_to_myText1_2").html()).appendTo($("#notice_activate"));
        teaTwo=false;
    }else if(teaTwo==false){
        $("#notice_send_activates_newTest1_2").remove();
        teaTwo=true;
    }
});
function notice_send_to_Test1_2(){
    $("#notice_send_activates_newTest1_2").remove();
    teaTwo=true;
}
var teaThree=true;
$("#notice_send_to_myText1_3").click(function(){
    x = $("#notice_send_to_myText1_3").text();
    if(teaThree==true){
        $("<div id='notice_send_activates_newTest1_3' onclick='notice_send_to_Test1_3()'><div/>")
            .html($("#notice_send_to_myText1_3").html()).appendTo($("#notice_activate"));
        teaThree=false;
    }else if(teaThree==false){
        $("#notice_send_activates_newTest1_3").remove();
        teaThree=true;
    }
});
function notice_send_to_Test1_3(){
    $("#notice_send_activates_newTest1_3").remove();
    teaThree=true;
}

var teaFour=true;
$("#notice_send_to_myText1_4").click(function(){
    x = $("#notice_send_to_myText1_4").text();
    if(teaFour==true){
        $("<div id='notice_send_activates_newTest1_4' onclick='notice_send_to_Test1_4()'><div/>")
            .html($("#notice_send_to_myText1_4").html()).appendTo($("#notice_activate"));
        teaFour=false;
    }else if(teaFour==false){
        $("#notice_send_activates_newTest1_4").remove();
        teaFour=true;
    }
});
function notice_send_to_Test1_4(){
    $("#notice_send_activates_newTest1_4").remove();
    teaFour=true;
}

//--------------------------------------------------------3
var bigOne=true;
$("#notice_send_to_myText2_1").click(function(){
    x = $("#notice_send_to_myText2_1").text();
    if(bigOne==true){
        $("<div id='notice_send_activates_newTest2_1' onclick='notice_send_to_Test2_1()'><div/> ")
            .html($("#notice_send_to_myText2_1").html()).appendTo($("#notice_activate"));
        bigOne=false;
    }else if(bigOne==false){
        $("#notice_send_activates_newTest2_1").remove();
        bigOne=true;
    }
});
function notice_send_to_Test2_1(){
    $("#notice_send_activates_newTest2_1").remove();
    bigOne=true;
}
var bigTwo=true;
$("#notice_send_to_myText2_2").click(function(){
    x = $("#notice_send_to_myText2_2").text();
    if(bigTwo==true){
        $("<div id='notice_send_activates_newTest2_2' onclick='notice_send_to_Test2_2()'><div/>")
            .html($("#notice_send_to_myText2_2").html()).appendTo($("#notice_activate"));
        bigTwo=false;
    }else if(bigTwo==false){
        $("#notice_send_activates_newTest2_2").remove();
        bigTwo=true;
    }
});
function notice_send_to_Test2_2(){
    $("#notice_send_activates_newTest2_2").remove();
    bigTwo=true;
}
var bigThree=true;
$("#notice_send_to_myText2_3").click(function(){
    x = $("#notice_send_to_myText2_3").text();
    if(bigThree==true){
        $("<div id='notice_send_activates_newTest2_3' onclick='notice_send_to_Test2_3()'><div/> ")
            .html($("#notice_send_to_myText2_3").html()).appendTo($("#notice_activate"));
        bigThree=false;
    }else if(bigThree==false){
        $("#notice_send_activates_newTest2_3").remove();
        bigThree=true;
    }
});
function notice_send_to_Test2_3(){
    $("#notice_send_activates_newTest2_3").remove();
    bigThree=true;
}

//--------------------------------------------------------4
var midOne=true;
$("#notice_send_to_myText3_1").click(function(){
    x = $("#notice_send_to_myText3_1").text();
    if(midOne==true){
        $("<div id='notice_send_activates_newTest3_1' onclick='notice_send_to_Test3_1()'><div/> ")
            .html($("#notice_send_to_myText3_1").html()).appendTo($("#notice_activate"));
        midOne=false;
    }else if(midOne==false){
        $("#notice_send_activates_newTest3_1").remove();
        midOne=true;
    }
});
function notice_send_to_Test3_1(){
    $("#notice_send_activates_newTest3_1").remove();
    midOne=true;
}
var midTwo=true;
$("#notice_send_to_myText3_2").click(function(){
    x = $("#notice_send_to_myText3_2").text();
    if(midTwo==true){
        $("<div id='notice_send_activates_newTest3_2' onclick='notice_send_to_Test3_2()'><div/> ")
            .html($("#notice_send_to_myText3_2").html()).appendTo($("#notice_activate"));
        midTwo=false;
    }else if(midTwo==false){
        $("#notice_send_activates_newTest3_2").remove();
        midTwo=true;
    }
});
function notice_send_to_Test3_2(){
    $("#notice_send_activates_newTest3_2").remove();
    midTwo=true;
}
var midThree=true;
$("#notice_send_to_myText3_3").click(function(){
    x = $("#notice_send_to_myText3_3").text();
    if(midThree==true){
        $("<div id='notice_send_activates_newTest3_3' onclick='notice_send_to_Test3_3()'><div/>")
            .html($("#notice_send_to_myText3_3").html()).appendTo($("#notice_activate"));
        midThree=false;
    }else if(midThree==false){
        $("#notice_send_activates_newTest3_3").remove();
        midThree=true;
    }
});
function notice_send_to_Test3_3(){
    $("#notice_send_activates_newTest3_3").remove();
    midThree=true;
}

//--------------------------------------------------------5
var smallOne=true;
$("#notice_send_to_myText4_1").click(function(){
    x = $("#notice_send_to_myText4_1").text();
    if(smallOne==true){
        $("<div id='notice_send_activates_newTest4_1' onclick='notice_send_to_Test4_1()'><div/>")
            .html($("#notice_send_to_myText4_1").html()).appendTo($("#notice_activate"));
        smallOne=false;
    }else if(smallOne==false){
        $("#notice_send_activates_newTest4_1").remove();
        smallOne=true;
    }
});
function notice_send_to_Test4_1(){
    $("#notice_send_activates_newTest4_1").remove();
    smallOne=true;
}
var smallTwo=true;
$("#notice_send_to_myText4_2").click(function(){
    x = $("#notice_send_to_myText4_2").text();
    if(smallTwo==true){
        $("<div id='notice_send_activates_newTest4_2' onclick='notice_send_to_Test4_2()'><div/>")
            .html($("#notice_send_to_myText4_2").html()).appendTo($("#notice_activate"));
        smallTwo=false;
    }else if(smallTwo==false){
        $("#notice_send_activates_newTest4_2").remove();
        smallTwo=true;
    }
});
function notice_send_to_Test4_2(){
    $("#notice_send_activates_newTest4_2").remove();
    smallTwo=true;
}
var smallThree=true;
$("#notice_send_to_myText4_3").click(function(){
    x = $("#notice_send_to_myText4_3").text();
    if(smallThree==true){
        $("<div id='notice_send_activates_newTest4_3' onclick='notice_send_to_Test4_3()'><div/>")
            .html($("#notice_send_to_myText4_3").html()).appendTo($("#notice_activate"));
        smallThree=false;
    }else if(smallThree==false){
        $("#notice_send_activates_newTest4_3").remove();
        smallThree=true;
    }
});
function notice_send_to_Test4_3(){
    $("#notice_send_activates_newTest4_3").remove();
    smallThree=true;
}

//---------------------输出接收人到input上
/*
$(document).ready(function () {
    $("button").click(function () {
        $("#notice_issue_details").val("");//赋值
    });
});
*/

function notice_activate_myAdd() {
    // console.log(123);
    $("#notice_issue_details").val("");
    $("#notice_issue_details").val(x)
}
$("#notice_activate_True").click(function () {
    notice_activate_myAdd()
});

