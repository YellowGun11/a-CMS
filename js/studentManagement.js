//每页8行数据
const rowNum=8;
//当前页数
var currentPage =1;

$(document).ready(function () {
    pageDown(0,students,true);
    pageNum(students,currentPage);
    $(".page_btn").eq(0).addClass("active").siblings().removeClass("active");
});
$(".page_title").click(function () {
    $(location).attr('href', '../pages/studentManagment.html');
})

//生成表格数据
function pageDown(fistNum,arr,hasHead) {
    if (hasHead){
        for(let item in students[0]){
            if(item=="studentId"){
                $("#mytable thead tr").append("<th style=\"width: 104px\">学号</th>")
            }else if(item=="studentName"){
                $("#mytable thead tr").append("<th style=\"width: 58px\">姓名</th>")
            }else if(item=="sex"){
                $("#mytable thead tr").append("<th style=\"width: 40px\">性别</th>")
            }else if(item=="birthday"){
                $("#mytable thead tr").append("<th style=\"width: 95px\">出生日期</th>")
            }
            else if(item=="grade"){
                $("#mytable thead tr").append("<th style=\"width: 100px\">年级</th>")
            }
            else if(item=="parentsName"){
                $("#mytable thead tr").append("<th style=\"width: 76px\">家长姓名</th>")
            }else if(item=="relationship"){
                $("#mytable thead tr").append("<th style=\"width: 40px\">关系</th>")
            }else if(item=="telNumber"){
                $("#mytable thead tr").append("<th style=\"width: 115px\">家长电话</th>")
            }else if(item=="address"){
                $("#mytable thead tr").append("<th style=\"width: 167px\">地址</th>")
            }
        }
        $("#mytable thead tr").append("<th style=\"width: 139px\">操作</th>")
    }
    $("#mytable tbody").text("");
    for (let i=fistNum; i<fistNum+rowNum; i++){
        if (i<arr.length){
            $("#mytable tbody").append(`<tr>
                                            <td>${arr[i].studentId}</td>
                                            <td>${arr[i].studentName}</td>
                                            <td>${arr[i].sex}</td>
                                            <td>${arr[i].birthday}</td>
                                            <td>${arr[i].grade}</td>
                                            <td>${arr[i].parentsName}</td>
                                            <td>${arr[i].relationship}</td>
                                            <td>${arr[i].telNumber}</td>
                                            <td>${arr[i].address}</td>
                                            <td>
                                               <button title="编辑" class="btn btn-primary btn-xs btn_edit" data-toggle="modal" data-target="#myBox"><i class="fa fa-pencil"></i></button>
                                               <button title="删除" class="btn btn-danger btn-xs btn_delete" data-toggle="modal" data-target="#myBox"><i class="fa fa-trash-o "></i></button>   
                                               <button title="转班" class="btn btn-warning btn-xs btn_exchange" data-toggle="modal" data-target="#myBox"><i class="glyphicon glyphicon-refresh"></i></button>   
                                               <button title="退学" class="btn btn-danger btn-xs btn_out" data-toggle="modal" data-target="#myBox"><i class="glyphicon glyphicon-remove-circle"></i></button>   
                                            </td>
                                       </tr>`);
        }
    }
}

//生成分页按钮事件
function pageNum(arr,current){
    for (let i=current; i<=Math.ceil(arr.length/rowNum); i++){
        $(".next_btn").before(`<li class="page_btn"><a  href="#">${i}</a></li>`);
        if ($(".page_ul").children().length>5){
            if (current>=Math.ceil(arr.length/rowNum)-4 ) {
                $(".next_btn").before(`<li class="page_btn page_omit"><a  href="#">${i+1}</a></li>`)
            }else {
                $(".next_btn").before(`<li class="page_omit"><a  href="#">...</a></li>`);
            }
            return false;
        }
    }
}



//刷新分页数量
function deletePage(){
    for (let i=1; i<=5; i++){
        $(".prev_btn").next().remove();
    }
}

//分页中数字按钮点击事件
$(".page_ul").on("click",".page_btn",function () {
    _text=$(this).text();
    btn_click(students,_text);

});
function btn_click(arr,_text){
    let num =_text;
    currentPage = num;
    num = (num-1)*rowNum;
    deletePage();
    if (currentPage==1){
        pageNum(arr,currentPage);
    }
    else if (currentPage>=Math.ceil(arr.length/rowNum)-4){
        currentFirst=Math.ceil(arr.length/rowNum)-4;
        pageNum(arr,currentFirst);
    }
    else {
        pageNum(arr,currentPage-1);
    }
    for (let j=0; j<=$(".page_btn").length; j++){
        if ($(".page_btn").eq(j).text()==_text){
            $(".page_btn").eq(j).addClass("active").siblings().removeClass("active");
        }
    }
    pageDown(num,arr,false)
}

//分页中的左右按钮点击事件
$(".page_ul").on("click",".prev_btn,.next_btn",function () {
    let _val=$(this).val();
    leftRightClick(students,_val);

});
function leftRightClick(arr,_val){
    if(_val==0){
        currentPage--;
        if (currentPage<1){
            currentPage=1;
            return false;
        }
        for (let j=0; j<=$(".page_btn").length; j++){
            if ($(".page_btn").eq(j).text()==currentPage){
                $(".page_btn").eq(j).addClass("active").siblings().removeClass("active");
            }
        }
        if (currentPage>=2&&currentPage<=Math.ceil(arr.length/rowNum)-3){
            deletePage();
            pageNum(arr,currentPage-1);
            for (let j=0; j<=$(".page_btn").length; j++){
                if ($(".page_btn").eq(j).text()==currentPage){
                    $(".page_btn").eq(j).addClass("active").siblings().removeClass("active");
                }
            }
        }
        let prevPage = (currentPage-1)*rowNum;
        pageDown(prevPage,arr,false)
    }
    if(_val==1){
        currentPage++;
        if (currentPage>Math.ceil(arr.length/rowNum)){
            currentPage=Math.ceil(arr.length/rowNum);
            return false;
        }
        for (let j=0; j<=$(".page_btn").length; j++){
            if ($(".page_btn").eq(j).text()==currentPage){
                $(".page_btn").eq(j).addClass("active").siblings().removeClass("active");
            }
        }
        if (currentPage>=3&&currentPage<=Math.ceil(arr.length/rowNum)-3){
            deletePage();
            pageNum(arr,currentPage-1);
            for (let j=0; j<=$(".page_btn").length; j++){
                if ($(".page_btn").eq(j).text()==currentPage){
                    $(".page_btn").eq(j).addClass("active").siblings().removeClass("active");
                }
            }
        }
        let nextPage = (currentPage-1)*rowNum;
        pageDown(nextPage,arr,false)
    }
}

//修改按钮点击事件
$("#mytable").on("click",".btn_edit",function () {
    $("#myBox").html("");
    $("#myBox").html(`<div class="modal-dialog modal-md">
        <div class="modal-content">
            <!-- 模态框头部 -->
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">编辑</h4>
            </div>

            <!-- 模态框主体 -->
            <div class="modal-body">
                <form class="form-horizontal tasi-form" method="get">
                    <div class="form-group has-default">
                        <label class="col-sm-3 col-md-3 control-label col-lg-3" for="studentId">学号</label>
                        <div class="col-lg-8 col-md-7">
                            <input type="text" class="form-control" id="studentId">
                        </div>
                    </div>
                    <div class="form-group has-default">
                        <label class="col-sm-3 col-md-3 control-label col-lg-3" for="studentName">姓名</label>
                        <div class="col-lg-8 col-md-7">
                            <input type="text" class="form-control" id="studentName">
                        </div>
                    </div>
                    <div class="form-group has-default">
                        <label class="col-sm-3 col-md-3 control-label col-lg-3" for="sex">性别</label>
                        <div class="col-lg-8 col-md-7">
                            <input type="text" class="form-control" id="sex">
                        </div>
                    </div>
                    <div class="form-group has-default">
                        <label class="col-sm-3 col-md-3 control-label col-lg-3" for="birthday">出生日期</label>
                        <div class="col-lg-8 col-md-7">
                            <input type="text" class="form-control" id="birthday">
                        </div>
                    </div>
                    <div class="form-group has-default">
                        <label class="col-sm-3 col-md-3 control-label col-lg-3" for="grade">年级</label>
                        <div class="col-lg-8 col-md-7">
                            <input type="text" class="form-control" id="grade">
                        </div>
                    </div>
                    <div class="form-group has-default">
                        <label class="col-sm-3 col-md-3 control-label col-lg-3" for="parentsName">家长姓名</label>
                        <div class="col-lg-8 col-md-7">
                            <input type="text" class="form-control" id="parentsName">
                        </div>
                    </div>
                    <div class="form-group has-default">
                        <label class="col-sm-3 col-md-3 control-label col-lg-3" for="relationship">关系</label>
                        <div class="col-lg-8 col-md-7">
                            <input type="text" class="form-control" id="relationship">
                        </div>
                    </div>
                    <div class="form-group has-default">
                        <label class="col-sm-3 col-md-3 control-label col-lg-3" for="telNumber">家长电话</label>
                        <div class="col-lg-8 col-md-7">
                            <input type="text" class="form-control" id="telNumber">
                        </div>
                    </div>
                    <div class="form-group has-default">
                        <label class="col-sm-3 col-md-3 control-label col-lg-3" for="address">地址</label>
                        <div class="col-lg-8 col-md-7">
                            <input type="text" class="form-control" id="address">
                        </div>
                    </div>
                </form>
            </div>

            <!-- 模态框底部 -->
            <div class="modal-footer">
                <button type="button" class="btn btn-success edit_true" data-dismiss="modal">确认</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal">关闭</button>
            </div>

        </div>
    </div>`);
    let _this=$(this);
    let theId=$(this).parent().siblings().first("td").text();
    let theName=$(this).parent().siblings().eq(1).text();
    let theSex=$(this).parent().siblings().eq(2).text();
    let theBirth=$(this).parent().siblings().eq(3).text();
    let theGrade=$(this).parent().siblings().eq(4).text();
    let theParentName=$(this).parent().siblings().eq(5).text();
    let theRelationship=$(this).parent().siblings().eq(6).text();
    let theTel=$(this).parent().siblings().eq(7).text();
    let theAddress=$(this).parent().siblings().eq(8).text();
    $("#myBox #studentId").val(theId);
    $("#myBox #studentName").val(theName);
    $("#myBox #sex").val(theSex);
    $("#myBox #birthday").val(theBirth);
    $("#myBox #grade").val(theGrade);
    $("#myBox #parentsName").val(theParentName);
    $("#myBox #relationship").val(theRelationship);
    $("#myBox #telNumber").val(theTel);
    $("#myBox #address").val(theAddress);
    $(".edit_true").click(function () {
        _this.parent().siblings().first("td").text($("#myBox #studentId").val())
        _this.parent().siblings().eq(1).text($("#myBox #studentName").val())
        _this.parent().siblings().eq(2).text($("#myBox #sex").val())
        _this.parent().siblings().eq(3).text($("#myBox #birthday").val())
        _this.parent().siblings().eq(4).text($("#myBox #grade").val())
        _this.parent().siblings().eq(5).text($("#myBox #parentsName").val())
        _this.parent().siblings().eq(6).text($("#myBox #relationship").val())
        _this.parent().siblings().eq(7).text($("#myBox #telNumber").val())
        _this.parent().siblings().eq(8).text($("#myBox #address").val())
    });
});




//删除按钮点击事件
$("#mytable").on("click",".btn_delete",function () {
    $("#myBox").html("");
    $("#myBox").html(`<div class="modal-dialog modal-sm">
        <div class="modal-content">
            <!-- 模态框头部 -->
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">删除</h4>
            </div>
            <!-- 模态框主体 -->
            <div class="modal-body">
            确定要删除该学生吗?
            </div>
            <!-- 模态框底部 -->
            <div class="modal-footer">
                <button type="button" class="btn btn-success edit_true" >确定</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal">关闭</button>
            </div>

        </div>
    </div>`);
    let theName=$(this).parent().siblings().eq(1).text();
    console.log(theName)
    _this=$(this);
    $(".edit_true").click(function () {
        $(this).remove();
        students.forEach(function (item,index){
            if(item.studentName==theName){
                console.log(item.studentName)
                console.log(index)
                $("#myBox .modal-body").text("删除成功！");
                // deletePage(students);
                console.log(students.length)
                students.splice(index,1);
                console.log(students.length)
                $("tbody").html("");
                pageDown(currentPage,students,false);
                // pageNum(students,currentPage);
                // $(".pageBtn").html("")
            }
        });
    })

});

//转班按钮点击事件
$("#mytable").on("click",".btn_exchange",function () {
    $("#myBox").html("");
    $("#myBox").html(`<div class="modal-dialog modal-sm">
        <div class="modal-content">
            <!-- 模态框头部 -->
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">转班</h4>
            </div>
            <!-- 模态框主体 -->
            <div class="modal-body change_class">
            </div>
            <!-- 模态框底部 -->
            <div class="modal-footer">
                <button type="button" class="btn btn-success change_true">确认</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal">关闭</button>
            </div>

        </div>
    </div>`);
    let _this=$(this);
    let theGrade=$(this).parent().siblings().eq(4).text().split("-")[0];
    let theClassName=$(this).parent().siblings().eq(4).text().split("-")[1]
    if (theGrade=="大班") {
        // $("#myBox .modal-body").html("");
        $("#myBox .modal-body").html(`<div class="btn-group" data-toggle="buttons">
                                         <label class="btn btn-primary active">
                                         <input type="radio" name="options" id="option1" autocomplete="off" checked value="太阳班">太阳班
                                         </label>
                                         <label class="btn btn-primary">
                                         <input type="radio" name="options" id="option2" autocomplete="off" value="月亮班">月亮班
                                         </label>
                                         <label class="btn btn-primary">
                                         <input type="radio" name="options" id="option3" autocomplete="off" value="星星班">星星班
                                         </label>
                                      </div>`);
    }
    if (theGrade=="中班") {
        // $("#myBox .modal-body").html("");
        $("#myBox .modal-body").html(`<div class="btn-group" data-toggle="buttons">
                                            <label class="btn btn-primary active">
                                            <input type="radio" name="options" id="option1" autocomplete="off" checked value="天空班">天空班
                                            </label>
                                            <label class="btn btn-primary">
                                            <input type="radio" name="options" id="option2" autocomplete="off" value="大地班">大地班
                                            </label>
                                            <label class="btn btn-primary">
                                            <input type="radio" name="options" id="option3" autocomplete="off" value="海洋班">海洋班
                                            </label>
</div>`);
    }
    if (theGrade=="小班") {
        // $("#myBox .modal-body").html("");
        $("#myBox .modal-body").html(`<div class="btn-group" data-toggle="buttons">
                                         <label class="btn btn-primary active">
                                         <input type="radio" name="options" id="option1" autocomplete="off" checked value="阳光班">阳光班
                                         </label>
                                         <label class="btn btn-primary">
                                         <input type="radio" name="options" id="option2" autocomplete="off" value="雨露班">雨露班
                                         </label>
                                         <label class="btn btn-primary">
                                         <input type="radio" name="options" id="option3" autocomplete="off" value="微风班">微风班
                                         </label>
                                         </div>`);
    }

    $(".change_true").click(function () {
        if (theClassName==$('input:radio:checked').val()){
            $("#myBox .modal-body").html("");
            $("#myBox .modal-body").text(`该学生就在该班,转班失败！`);
            $(this).remove();
            console.log("转班失败！");
        }
        else {
            theClassName=$('input:radio:checked').val();
            let newClass=[theGrade,theClassName].join("-");
            _this.parent().siblings().eq(4).text(newClass);
            $("#myBox .modal-body").text(`转班成功！`);
            $(this).remove();
        }
    });
})

//退学按钮点击事件
$("#mytable").on("click",".btn_out",function () {
    $("#myBox").html("");
    $("#myBox").html(`<div class="modal-dialog modal-sm">
        <div class="modal-content">
            <!-- 模态框头部 -->
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">退学</h4>
            </div>
            <!-- 模态框主体 -->
            <div class="modal-body">
            确定该学生退学?
            </div>
            <!-- 模态框底部 -->
            <div class="modal-footer">
                <button type="button" class="btn btn-success edit_true" >确定</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal">关闭</button>
            </div>

        </div>
    </div>`);
    _this=$(this);
    $(".edit_true").click(function () {
        $("#myBox .modal-body").text("退学成功！");
        _this.attr("title","已退学").addClass('btn-success disabled').removeClass('btn-danger');
        $(this).remove();
    })
})

//添加中确定按钮点击事件
$(".add_box").on("click",".btn",function () {
    $("#myBox").html("");
    $("#myBox").html(`<div class="modal-dialog modal-md">
        <div class="modal-content">
            <!-- 模态框头部 -->
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">添加新学生</h4>
            </div>

            <!-- 模态框主体 -->
            <div class="modal-body">
                <form class="form-horizontal tasi-form" method="get">
                    <div class="form-group has-default">
                        <label class="col-sm-3 col-md-3 control-label col-lg-3" for="studentId">学号</label>
                        <div class="col-lg-8 col-md-7">
                            <input type="text" class="form-control" id="studentId">
                        </div>
                    </div>
                    <div class="form-group has-default">
                        <label class="col-sm-3 col-md-3 control-label col-lg-3" for="studentName">姓名</label>
                        <div class="col-lg-8 col-md-7">
                            <input type="text" class="form-control" id="studentName">
                        </div>
                    </div>
                    <div class="form-group has-default">
                        <label class="col-sm-3 col-md-3 control-label col-lg-3" for="sex">性别</label>
                        <div class="col-lg-8 col-md-7">
                            <input type="text" class="form-control" id="sex">
                        </div>
                    </div>
                    <div class="form-group has-default">
                        <label class="col-sm-3 col-md-3 control-label col-lg-3" for="birthday">出生日期</label>
                        <div class="col-lg-8 col-md-7">
                            <input type="text" class="form-control" id="birthday">
                        </div>
                    </div>
                    <div class="form-group has-default">
                        <label class="col-sm-3 col-md-3 control-label col-lg-3" for="grade">年级</label>
                        <div class="col-lg-8 col-md-7">
                            <input type="text" class="form-control" id="grade">
                        </div>
                    </div>
                    <div class="form-group has-default">
                        <label class="col-sm-3 col-md-3 control-label col-lg-3" for="parentsName">家长姓名</label>
                        <div class="col-lg-8 col-md-7">
                            <input type="text" class="form-control" id="parentsName">
                        </div>
                    </div>
                    <div class="form-group has-default">
                        <label class="col-sm-3 col-md-3 control-label col-lg-3" for="relationship">关系</label>
                        <div class="col-lg-8 col-md-7">
                            <input type="text" class="form-control" id="relationship">
                        </div>
                    </div>
                    <div class="form-group has-default">
                        <label class="col-sm-3 col-md-3 control-label col-lg-3" for="telNumber">家长电话</label>
                        <div class="col-lg-8 col-md-7">
                            <input type="text" class="form-control" id="telNumber">
                        </div>
                    </div>
                    <div class="form-group has-default">
                        <label class="col-sm-3 col-md-3 control-label col-lg-3" for="address">地址</label>
                        <div class="col-lg-8 col-md-7">
                            <input type="text" class="form-control" id="address">
                        </div>
                    </div>
                </form>
            </div>

            <!-- 模态框底部 -->
            <div class="modal-footer">
                <button type="button" class="btn btn-success add_true">确认</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal">关闭</button>
            </div>

        </div>
    </div>`);
    let flag=true;
    $(".add_true").click(function () {
        // console.log($("#myBox  #addName").val()=="")
        for (let i=0; i<students.length; i++){
            if ($("#myBox #studentId").val()==students[i].studentId||$("#myBox  #studentId").val()==""){
                $("#myBox .modal-body").text("学号为空或者重复,请重新输入一个新的学号！");
                $(this).remove();
                flag=false;
                return false;
            }
            if ($("#myBox #studentName").val()==students[i].studentName||$("#myBox  #studentName").val()==""){
                $("#myBox .modal-body").text("名字为空或者重复,请重新输入一个新的名字！");
                $(this).remove();
                flag=false;
                return false;
            }
        }
        if (flag){
            classArray.push({
                studentId:$("#myBox #studentId").val(),
                studentName:$("#myBox #studentName").val(),
                sex:$("#myBox #sex").val(),
                birthday:$("#myBox #birthday").val(),
                grade:$("#myBox #grade").val(),
                parentsName:$("#myBox #parentsName").val(),
                relationship:$("#myBox #relationship").val(),
                telNumber:$("#myBox #grade").val(),
                address:$("#myBox #address").val()
            });
            $("#mytable tbody").append(`<tr>
                                            <td>${$("#myBox #studentId").val()}</td>
                                            <td>${$("#myBox #studentName").val()}</td>
                                            <td>${$("#myBox #sex").val()}</td>
                                            <td>${$("#myBox #birthday").val()}</td>
                                            <td>${$("#myBox #grade").val()}</td>
                                            <td>${$("#myBox #parentsName").val()}</td>
                                            <td>${$("#myBox #relationship").val()}</td>
                                            <td>${$("#myBox #grade").val()}</td>
                                            <td>${$("#myBox #address").val()}</td>
                                     
                                            <td>
                                               <button title="编辑" class="btn btn-primary btn-xs btn_edit" data-toggle="modal" data-target="#myBox"><i class="fa fa-pencil"></i></button>
                                               <button title="删除" class="btn btn-danger btn-xs btn_delete" data-toggle="modal" data-target="#myBox"><i class="fa fa-trash-o "></i></button>   
                                               <button title="转班" class="btn btn-warning btn-xs btn_exchange" data-toggle="modal" data-target="#myBox"><i class="glyphicon glyphicon-refresh"></i></button>   
                                               <button title="退学" class="btn btn-danger btn-xs btn_out" data-toggle="modal" data-target="#myBox"><i class="glyphicon glyphicon-remove-circle"></i></button>   
                                            </td>
                                       </tr>`);
            $("#myBox .modal-body").text("添加成功！");
            $(this).remove();
            flag=false;
        }
    })
    // pageDown(0,departmentObj,false);
});



//搜索按钮点击事件
$(".search_btn").click(function () {
    let theSearch=$(".search_text").val();
    console.log(theSearch);
    $("#mytable tbody").text("");
    let count=[];
    let i=0;
    deletePage();
    let hasResult=false;
    students.forEach(function (item,index){
        if(item.studentName==theSearch||item.studentName.split("")[0]==theSearch){
            hasResult=true;
            count.push({
                studentId:item.studentId,
                studentName:item.studentName,
                sex:item.sex,
                birthday:item.birthday,
                grade:item.grade,
                parentsName:item.parentsName,
                relationship:item.relationship,
                telNumber:item.telNumber,
                address:item.address
            });
            i++;
            /*if(i<=8){
                $("#mytable tbody").append(`<tr>
                                            <td>${item.studentId}</td>
                                            <td>${item.studentName}</td>
                                            <td>${item.sex}</td>
                                            <td>${item.birthday}</td>
                                            <td>${item.grade}</td>
                                            <td>${item.parentsName}</td>
                                            <td>${item.relationship}</td>
                                            <td>${item.telNumber}</td>
                                            <td>${item.address}</td>
                                            <td>
                                               <button title="编辑" class="btn btn-primary btn-xs btn_edit" data-toggle="modal" data-target="#myBox"><i class="fa fa-pencil"></i></button>
                                               <button title="删除" class="btn btn-danger btn-xs btn_delete" data-toggle="modal" data-target="#myBox"><i class="fa fa-trash-o "></i></button>   
                                               <button title="转班" class="btn btn-warning btn-xs btn_exchange" data-toggle="modal" data-target="#myBox"><i class="glyphicon glyphicon-refresh"></i></button>   
                                               <button title="退学" class="btn btn-danger btn-xs btn_out" data-toggle="modal" data-target="#myBox"><i class="glyphicon glyphicon-remove-circle"></i></button>   
                                            </td>
                                       </tr>`);
            }*/

        }
        if(item.grade.split("-")[0]==theSearch||item.grade.split("")[0]==theSearch){
            hasResult=true;
            count.push({
                studentId:item.studentId,
                studentName:item.studentName,
                sex:item.sex,
                birthday:item.birthday,
                grade:item.grade,
                parentsName:item.parentsName,
                relationship:item.relationship,
                telNumber:item.telNumber,
                address:item.address
            });
            i++;
            /*if(i<=8){
                $("#mytable tbody").append(`<tr>
                                            <td>${item.studentId}</td>
                                            <td>${item.studentName}</td>
                                            <td>${item.sex}</td>
                                            <td>${item.birthday}</td>
                                            <td>${item.grade}</td>
                                            <td>${item.parentsName}</td>
                                            <td>${item.relationship}</td>
                                            <td>${item.telNumber}</td>
                                            <td>${item.address}</td>
                                            <td>
                                               <button title="编辑" class="btn btn-primary btn-xs btn_edit" data-toggle="modal" data-target="#myBox"><i class="fa fa-pencil"></i></button>
                                               <button title="删除" class="btn btn-danger btn-xs btn_delete" data-toggle="modal" data-target="#myBox"><i class="fa fa-trash-o "></i></button>   
                                               <button title="转班" class="btn btn-warning btn-xs btn_exchange" data-toggle="modal" data-target="#myBox"><i class="glyphicon glyphicon-refresh"></i></button>   
                                               <button title="退学" class="btn btn-danger btn-xs btn_out" data-toggle="modal" data-target="#myBox"><i class="glyphicon glyphicon-remove-circle"></i></button>   
                                            </td>
                                       </tr>`);
            }*/

        }
        if(item.grade.split("-")[1]==theSearch||item.grade.split("-")[1].split("")[0]==theSearch){
            hasResult=true;
            count.push({
                studentId:item.studentId,
                studentName:item.studentName,
                sex:item.sex,
                birthday:item.birthday,
                grade:item.grade,
                parentsName:item.parentsName,
                relationship:item.relationship,
                telNumber:item.telNumber,
                address:item.address
            });
            i++;
            /*if(i<=8){
                $("#mytable tbody").append(`<tr>
                                            <td>${item.studentId}</td>
                                            <td>${item.studentName}</td>
                                            <td>${item.sex}</td>
                                            <td>${item.birthday}</td>
                                            <td>${item.grade}</td>
                                            <td>${item.parentsName}</td>
                                            <td>${item.relationship}</td>
                                            <td>${item.telNumber}</td>
                                            <td>${item.address}</td>
                                            <td>
                                               <button title="编辑" class="btn btn-primary btn-xs btn_edit" data-toggle="modal" data-target="#myBox"><i class="fa fa-pencil"></i></button>
                                               <button title="删除" class="btn btn-danger btn-xs btn_delete" data-toggle="modal" data-target="#myBox"><i class="fa fa-trash-o "></i></button>   
                                               <button title="转班" class="btn btn-warning btn-xs btn_exchange" data-toggle="modal" data-target="#myBox"><i class="glyphicon glyphicon-refresh"></i></button>   
                                               <button title="退学" class="btn btn-danger btn-xs btn_out" data-toggle="modal" data-target="#myBox"><i class="glyphicon glyphicon-remove-circle"></i></button>   
                                            </td>
                                       </tr>`);
            }*/

        }
    });
    if (hasResult==false){
        $("#mytable tbody").append(`<tr>
                                            <td colspan="10">搜素无结果</td>
                                       </tr>`);
    }
    if (hasResult==true){
        currentPage =1;
        pageDown(0,count,false);
        pageNum(count,1);
        $(".page_btn").eq(0).addClass("active").siblings().removeClass("active");
        $(".page_ul").on("click",".page_btn",function () {
            _text=$(this).text();
            btn_click(count,_text);

        });
        $(".page_ul").on("click",".prev_btn,.next_btn",function () {
            let _val=$(this).val();
            leftRightClick(count,_val);

        });
    }
    // pageNum(count,1);
    /*for (let i=1; i<=Math.ceil(count.length/rowNum); i++){
        $(".next_btn").before(`<li><a class="page_btn" href="#">${i}</a></li>`);
    }*/
})