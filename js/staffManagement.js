//每页5行数据
const rowNum=8;
//当前页数
var currentPage =1;

$(document).ready(function () {
    pageDown(0,employee,true);
    pageNum(employee);
});
$(".page_title").click(function () {
    $(location).attr('href', '../pages/staffManagement.html');

})
//生成表格数据
function pageDown(fistNum,arr,hasHead) {
    if (hasHead){
        for(let item in employee[0]){
            if(item=="employeeNumber"){
                $("#mytable thead tr").append("<th>编号</th>")
            }else if(item=="employeeName"){
                $("#mytable thead tr").append("<th>姓名</th>")
            }else if(item=="sex"){
                $("#mytable thead tr").append("<th>性别</th>")
            }else if(item=="thePost"){
                $("#mytable thead tr").append("<th>职务</th>")
            }else if(item=="theSubject"){
                $("#mytable thead tr").append("<th>科目</th>")
            }else if(item=="grade"){
                $("#mytable thead tr").append("<th>年級</th>")
            }else if(item=="birthday"){
                $("#mytable thead tr").append("<th>出生日期</th>")
            }else if(item=="telNumber"){
                $("#mytable thead tr").append("<th>电话</th>")
            }else if(item=="mail"){
                $("#mytable thead tr").append("<th>邮箱</th>")
            }
        }
        $("#mytable thead tr").append("<th>操作</th>")
    }
    $("#mytable tbody").text("");
    for (let i=fistNum; i<fistNum+rowNum; i++){
        if (i<arr.length){
            $("#mytable tbody").append(`<tr>
                                            <td>${arr[i].employeeNumber}</td>
                                            <td>${arr[i].employeeName}</td>
                                            <td>${arr[i].sex}</td>
                                            <td>${arr[i].thePost}</td>
                                            <td>${arr[i].theSubject}</td>
                                            <td>${arr[i].grade}</td>
                                            <td>${arr[i].birthday}</td>
                                            <td>${arr[i].telNumber}</td>
                                            <td>${arr[i].mail}</td>
                                            <td>  
                                               <button title="关联状态" class="btn btn-success  btn-xs btn_status" value="1"><i class="fa fa-check" ></i></button>
                                               <button title="编辑" class="btn btn-primary btn-xs btn_edit" data-toggle="modal" data-target="#myBox"><i class="fa fa-pencil"></i></button>
                                               <button title="删除" class="btn btn-danger btn-xs btn_delete" data-toggle="modal" data-target="#myBox"><i class="fa fa-trash-o "></i></button>   
                                               <button title="重置密码" class="btn btn-warning btn-xs btn_reset" data-toggle="modal" data-target="#myBox"><i class="glyphicon glyphicon-refresh "></i></button>   
                                            </td>
                                       </tr>`);
        }
    }
}

//生成分页按钮事件
function pageNum(arr){
    for (let i=1; i<=Math.ceil(arr.length/rowNum); i++){
        if (i==1){
            $(".next_btn").before(`<li class="page_btn active"><a  href="#">${i}</a></li>`);
        }else {
            $(".next_btn").before(`<li class="page_btn"><a  href="#">${i}</a></li>`);
        }

    }
}

//刷新分页数量
function deletePage(arr){
    for (let i=1; i<=Math.ceil(arr.length/rowNum); i++){
        $(".prev_btn").next().remove();
    }
}

//分页中数字按钮点击事件
$(".page_ul").on("click",".page_btn",function () {
    $(this).addClass("active").siblings().removeClass("active");
    // console.log($(this).text());
    let num = $(this).text();
    currentPage = num;
    num = (num-1)*rowNum;
    pageDown(num,employee,false)
});

//分页中的左右按钮点击事件
$(".page_ul").on("click",".prev_btn,.next_btn",function () {
    if($(this).val()==0){
        currentPage--;
        if (currentPage<1){
            currentPage=Math.ceil(employee.length/rowNum);
        }
        $(".page_btn").eq(currentPage-1).addClass("active").siblings().removeClass("active");
        let prevPage = (currentPage-1)*rowNum;
        pageDown(prevPage,employee,false)
    }
    if($(this).val()==1){
        currentPage++;
        if (currentPage>Math.ceil(employee.length/rowNum)){
            currentPage=1;
        }
        $(".page_btn").eq(currentPage-1).addClass("active").siblings().removeClass("active");
        let nextPage = (currentPage-1)*rowNum;
        pageDown(nextPage,employee,false)
    }

});

//关联按钮点击事件
$("#mytable").on("click",".btn_status",function () {
    let flag=$(this).attr("value");
    if(flag==1){
        $(this).attr("value","0").html(`<i class="glyphicon glyphicon-remove" ></i>`).addClass('btn-danger');
    }
    if(flag==0){
        $(this).attr("value","1").html(`<i class="fa fa-check" ></i>`).removeClass('btn-danger');
    }

})

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
                        <label class="col-sm-3 control-label col-lg-3 col-md-3" for="employeeNumber">编号</label>
                        <div class="col-lg-8 col-md-7">
                            <input type="text" class="form-control" id="employeeNumber">
                        </div>
                    </div>
                    <div class="form-group has-default">
                        <label class="col-sm-3 control-label col-lg-3 col-md-3" for="employeeName">姓名</label>
                        <div class="col-lg-8 col-md-7">
                            <input type="text" class="form-control" id="employeeName">
                        </div>
                    </div>
                    <div class="form-group has-default">
                        <label class="col-sm-3 control-label col-lg-3 col-md-3" for="sex">性别</label>
                        <div class="col-lg-8 col-md-7">
                            <input type="text" class="form-control" id="sex">
                        </div>
                    </div>
                    <div class="form-group has-default">
                        <label class="col-sm-3 control-label col-lg-3 col-md-3" for="thePost">职务</label>
                        <div class="col-lg-8 col-md-7">
                            <input type="text" class="form-control" id="thePost">
                        </div>
                    </div>
                    <div class="form-group has-default">
                        <label class="col-sm-3 control-label col-lg-3 col-md-3" for="theSubject">科目</label>
                        <div class="col-lg-8 col-md-7">
                            <input type="text" class="form-control" id="theSubject">
                        </div>
                    </div>
                    <div class="form-group has-default">
                        <label class="col-sm-3 control-label col-lg-3 col-md-3" for="grade">年级</label>
                        <div class="col-lg-8 col-md-7">
                            <input type="text" class="form-control" id="grade">
                        </div>
                    </div>
                    <div class="form-group has-default">
                        <label class="col-sm-3 control-label col-lg-3 col-md-3" for="birthday">出生日期</label>
                        <div class="col-lg-8 col-md-7">
                            <input type="text" class="form-control" id="birthday">
                        </div>
                    </div>
                    <div class="form-group has-default">
                        <label class="col-sm-3 control-label col-lg-3 col-md-3" for="telNumber">电话</label>
                        <div class="col-lg-8 col-md-7">
                            <input type="text" class="form-control" id="telNumber">
                        </div>
                    </div>
                    <div class="form-group has-default">
                        <label class="col-sm-3 control-label col-lg-3 col-md-3" for="mail">邮箱</label>
                        <div class="col-lg-8 col-md-7">
                            <input type="text" class="form-control" id="mail">
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
    let thePost=$(this).parent().siblings().eq(3).text();
    let theSubject=$(this).parent().siblings().eq(4).text();
    let theGrade=$(this).parent().siblings().eq(5).text();
    let theBirth=$(this).parent().siblings().eq(6).text();
    let theTel=$(this).parent().siblings().eq(7).text();
    let theEmail=$(this).parent().siblings().eq(8).text();
    $("#myBox #employeeNumber").val(theId);
    $("#myBox #employeeName").val(theName);
    $("#myBox #sex").val(theSex);
    $("#myBox #thePost").val(thePost);
    $("#myBox #theSubject").val(theSubject);
    $("#myBox #grade").val(theGrade);
    $("#myBox #birthday").val(theBirth);
    $("#myBox #telNumber").val(theTel);
    $("#myBox #mail").val(theEmail);
    $("#myBox").on("click",".edit_true",function () {
        _this.parent().siblings().first("td").text($("#myBox #employeeNumber").val())
        _this.parent().siblings().eq(1).text($("#myBox #employeeName").val())
        _this.parent().siblings().eq(2).text($("#myBox #sex").val())
        _this.parent().siblings().eq(3).text($("#myBox #thePost").val())
        _this.parent().siblings().eq(4).text($("#myBox #theSubject").val())
        _this.parent().siblings().eq(5).text($("#myBox #grade").val())
        _this.parent().siblings().eq(6).text($("#myBox #birthday").val())
        _this.parent().siblings().eq(7).text($("#myBox #telNumber").val())
        _this.parent().siblings().eq(8).text($("#myBox #mail").val())

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
            </div>
            <!-- 模态框底部 -->
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">关闭</button>
            </div>

        </div>
    </div>`);
    let theDeta=$(this).parent().siblings().first("td").text();
    let theStatus=$(this).siblings().eq(0).attr("value");
    console.log(theDeta)
    employee.forEach(function (item,index){
        console.log(item.employeeNumber)
        if(item.employeeNumber==theDeta){
            if (theStatus==1){
                $("#myBox .modal-body").text("该职工关联着班级，不能删除！");
            }
            if (theStatus==0){
                $("#myBox .modal-body").text("删除成功！");
                deletePage(employee);
                employee.splice(index,1);
                $("tbody").html("");
                pageDown(0,employee,false);
                pageNum(employee);
                // $(".pageBtn").html("")
            }
        }
    });
});

//添加中确定按钮点击事件
$(".add_box").on("click",".btn",function () {
    $("#myBox").html("");
    $("#myBox").html(`<div class="modal-dialog modal-md">
        <div class="modal-content">
            <!-- 模态框头部 -->
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">添加</h4>
            </div>

            <!-- 模态框主体 -->
            <div class="modal-body">
                <form class="form-horizontal tasi-form" method="get">
                    <div class="form-group has-default">
                        <label class="col-sm-3 control-label col-lg-3 col-md-3" for="employeeNumber">编号</label>
                        <div class="col-lg-8 col-md-7">
                            <input type="text" class="form-control" id="employeeNumber">
                        </div>
                    </div>
                    <div class="form-group has-default">
                        <label class="col-sm-3 control-label col-lg-3 col-md-3" for="employeeName">姓名</label>
                        <div class="col-lg-8 col-md-7">
                            <input type="text" class="form-control" id="employeeName">
                        </div>
                    </div>
                    <div class="form-group has-default">
                        <label class="col-sm-3 control-label col-lg-3 col-md-3" for="sex">性别</label>
                        <div class="col-lg-8 col-md-7">
                            <input type="text" class="form-control" id="sex">
                        </div>
                    </div>
                    <div class="form-group has-default">
                        <label class="col-sm-3 control-label col-lg-3 col-md-3" for="thePost">职务</label>
                        <div class="col-lg-8 col-md-7">
                            <input type="text" class="form-control" id="thePost">
                        </div>
                    </div>
                    <div class="form-group has-default">
                        <label class="col-sm-3 control-label col-lg-3 col-md-3" for="theSubject">科目</label>
                        <div class="col-lg-8 col-md-7">
                            <input type="text" class="form-control" id="theSubject">
                        </div>
                    </div>
                    <div class="form-group has-default">
                        <label class="col-sm-3 control-label col-lg-3 col-md-3" for="grade">年级</label>
                        <div class="col-lg-8 col-md-7">
                            <input type="text" class="form-control" id="grade">
                        </div>
                    </div>
                    <div class="form-group has-default">
                        <label class="col-sm-3 control-label col-lg-3 col-md-3" for="birthday">出生日期</label>
                        <div class="col-lg-8 col-md-7">
                            <input type="text" class="form-control" id="birthday">
                        </div>
                    </div>
                    <div class="form-group has-default">
                        <label class="col-sm-3 control-label col-lg-3 col-md-3" for="telNumber">电话</label>
                        <div class="col-lg-8 col-md-7">
                            <input type="text" class="form-control" id="telNumber">
                        </div>
                    </div>
                    <div class="form-group has-default">
                        <label class="col-sm-3 control-label col-lg-3 col-md-3" for="mail">邮箱</label>
                        <div class="col-lg-8 col-md-7">
                            <input type="text" class="form-control" id="mail">
                        </div>
                    </div>
                </form>
            </div>

            <!-- 模态框底部 -->
            <div class="modal-footer">
                <button type="button" class="btn btn-success add_true" data-dismiss="modal">确认</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal">关闭</button>
            </div>

        </div>
    </div>`);
    let flag=true;
    $(".add_true").click(function () {
        for (let i=0; i<employee.length; i++){
            if ($("#myBox #addID").val()==employee[i].employeeNumber||$("#myBox  #addID").val()==""){
                $("#myBox .modal-body").text("编号为空或者重复,请重新输入一个新的编号！");
                $(this).remove();
                flag=false;
                return false;
            }
            if ($("#myBox #addName").val()==employee[i].employeeName||$("#myBox  #addName").val()==""){
                $("#myBox .modal-body").text("姓名为空或者重复,请重新输入一个新的名称！");
                $(this).remove();
                flag=false;
                return false;
            }
        }
        if (flag){
            employee.push({
                employeeNumber:$("#myBox #employeeNumber").val(),
                employeeName:$("#myBox #employeeName").val(),
                sex:$("#myBox #sex").val(),
                thePost:$("#myBox #thePost").val(),
                theSubject:$("#myBox #theSubject").val(),
                grade:$("#myBox #grade").val(),
                birthday:$("#myBox #birthday").val(),
                telNumber:$("#myBox #telNumber").val(),
                mail:$("#myBox #mail").val()
            });
            // $("#mytable tbody").append(`<tr>
            //                                 <td>${$("#myBox #employeeNumber").val()}</td>
            //                                 <td>${$("#myBox #employeeName").val()}</td>
            //                                 <td>${$("#myBox #sex").val()}</td>
            //                                 <td>${$("#myBox #thePost").val()}</td>
            //                                 <td>${$("#myBox #theSubject").val()}</td>
            //                                 <td>${$("#myBox #grade").val()}</td>
            //                                 <td>${$("#myBox #birthday").val()}</td>
            //                                 <td>${$("#myBox #telNumber").val()}</td>
            //                                 <td>${$("#myBox #mail").val()}</td>
            //
            //                                 <td>
            //                                    <button title="关联状态" class="btn btn-success  btn-xs btn_status" value="1"><i class="fa fa-check" ></i></button>
            //                                    <button title="编辑" class="btn btn-primary btn-xs btn_edit" data-toggle="modal" data-target="#myBox"><i class="fa fa-pencil"></i></button>
            //                                    <button title="删除" class="btn btn-danger btn-xs btn_delete" data-toggle="modal" data-target="#myBox"><i class="fa fa-trash-o "></i></button>
            //                                    <button title="重置密码" class="btn btn-warning btn-xs btn_reset" data-toggle="modal" data-target="#myBox"><i class="glyphicon glyphicon-refresh "></i></button>
            //                                 </td>
            //                            </tr>`);
            $("#myBox .modal-body").text("添加成功！");
            $(this).remove();
            flag=false;
        }
    })
});


//重置密码按钮点击事件
$("#mytable").on("click",".btn_reset",function () {
    $("#myBox").html("");
    $("#myBox").html(`<div class="modal-dialog modal-sm">
        <div class="modal-content">
            <!-- 模态框头部 -->
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">重置密码</h4>
            </div>
            <!-- 模态框主体 -->
            <div class="modal-body">
            重置密码成功！新密码为手机后六位！
            </div>
            <!-- 模态框底部 -->
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">关闭</button>
            </div>

        </div>
    </div>`);
});

//搜索按钮点击事件
$(".search_btn").click(function () {
    let theSearch=$(".search_text").val();
    $("#mytable tbody").text("");
    let count=[];
    deletePage(employee);
    $(".prev_btn").hide();
    $(".next_btn").hide();
    let hasResult=false;
    employee.forEach(function (item,index){
        if(item.employeeName==theSearch||item.employeeName.split("")[0]==theSearch){
            hasResult=true;
            count.push(1);
            $("#mytable tbody").append(`<tr>
                                            <td>${item.employeeNumber}</td>
                                            <td>${item.employeeName}</td>
                                            <td>${item.sex}</td>
                                            <td>${item.thePost}</td>
                                            <td>${item.theSubject}</td>
                                            <td>${item.grade}</td>
                                            <td>${item.birthday}</td>
                                            <td>${item.telNumber}</td>
                                            <td>${item.mail}</td>
                                            <td>  
                                               <button title="关联状态" class="btn btn-success  btn-xs btn_status" value="1"><i class="fa fa-check" ></i></button>
                                               <button title="编辑" class="btn btn-primary btn-xs btn_edit" data-toggle="modal" data-target="#myBox"><i class="fa fa-pencil"></i></button>
                                               <button title="删除" class="btn btn-danger btn-xs btn_delete" data-toggle="modal" data-target="#myBox"><i class="fa fa-trash-o "></i></button>   
                                               <button title="重置密码" class="btn btn-warning btn-xs btn_reset" data-toggle="modal" data-target="#myBox"><i class="glyphicon glyphicon-refresh "></i></button>   
                                            </td>
                                       </tr>`);
        }
        else if(item.thePost==theSearch||item.thePost.split("")[0]==theSearch){
            hasResult=true;
            count.push(1);
            $("#mytable tbody").append(`<tr>
                                            <td>${item.employeeNumber}</td>
                                            <td>${item.employeeName}</td>
                                            <td>${item.sex}</td>
                                            <td>${item.thePost}</td>
                                            <td>${item.theSubject}</td>
                                            <td>${item.grade}</td>
                                            <td>${item.birthday}</td>
                                            <td>${item.telNumber}</td>
                                            <td>${item.mail}</td>
                                            <td>  
                                               <button title="关联状态" class="btn btn-success  btn-xs btn_status" value="1"><i class="fa fa-check" ></i></button>
                                               <button title="编辑" class="btn btn-primary btn-xs btn_edit" data-toggle="modal" data-target="#myBox"><i class="fa fa-pencil"></i></button>
                                               <button title="删除" class="btn btn-danger btn-xs btn_delete" data-toggle="modal" data-target="#myBox"><i class="fa fa-trash-o "></i></button>   
                                               <button title="重置密码" class="btn btn-warning btn-xs btn_reset" data-toggle="modal" data-target="#myBox"><i class="glyphicon glyphicon-refresh "></i></button>   
                                            </td>
                                       </tr>`);
        }
    });
    if (hasResult==false){
        $("#mytable tbody").append(`<tr>
                                            <td colspan="10">搜素无结果</td>
                                       </tr>`);
    }
    // for (let i=1; i<=Math.ceil(count.length/rowNum); i++){
    //     $(".next_btn").before(`<li><a class="page_btn" href="#">${i}</a></li>`);
    // }
})