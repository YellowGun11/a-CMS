//每页8行数据
const rowNum=8;
//当前页数
var currentPage =1;

$(document).ready(function () {
    pageDown(0,classArray,true);
    pageNum(classArray);
});
$(".page_title").click(function () {
    $(location).attr('href', '../pages/classManagement.html');
})
//生成表格数据
function pageDown(fistNum,arr,hasHead) {
    if (hasHead){
        for(let item in classArray[0]){
            if(item=="className"){
                $("#mytable thead tr").append("<th>名字</th>")
            }else if(item=="classGrade"){
                $("#mytable thead tr").append("<th>年级</th>")
            }else if(item=="classTeacher1"){
                $("#mytable thead tr").append("<th>主班老师</th>")
            }else if(item=="classTeacher2"){
                $("#mytable thead tr").append("<th>副班老师</th>")
            }
        }
        $("#mytable thead tr").append("<th>操作</th>")
    }
    $("#mytable tbody").text("");
    for (let i=fistNum; i<fistNum+rowNum; i++){
        if (i<arr.length){
            $("#mytable tbody").append(`<tr>
                                            <td>${arr[i].className}</td>
                                            <td>${arr[i].classGrade}</td>
                                            <td>${arr[i].classTeacher1}</td>
                                            <td>${arr[i].classTeacher2}</td>
                                            <td>  
                                               <button title="查看详情" class="btn btn-info btn-xs btn_look" data-toggle="modal" data-target="#myBox"><i class="glyphicon glyphicon-search "></i></button> 
                                               <button title="编辑" class="btn btn-primary btn-xs btn_edit" data-toggle="modal" data-target="#myBox"><i class="fa fa-pencil"></i></button>
                                               <button title="删除" class="btn btn-danger btn-xs btn_delete" data-toggle="modal" data-target="#myBox"><i class="fa fa-trash-o "></i></button>   
                                               <button title="升班" class="btn btn-warning btn-xs btn_up" data-toggle="modal" data-target="#myBox"><i class="glyphicon glyphicon-circle-arrow-up"></i></button>   
                                               <button title="毕业" class="btn btn-success btn-xs btn_graduate" data-toggle="modal" data-target="#myBox"><i class="glyphicon glyphicon-send "></i></button>   
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
    let num = $(this).text();
    currentPage = num;
    num = (num-1)*rowNum;
    pageDown(num,classArray,false)
});

//分页中的左右按钮点击事件
$(".page_ul").on("click",".prev_btn,.next_btn",function () {
    if($(this).val()==0){
        currentPage--;
        if (currentPage<1){
            currentPage=Math.ceil(classArray.length/rowNum);
        }
        $(".page_btn").eq(currentPage-1).addClass("active").siblings().removeClass("active");
        let prevPage = (currentPage-1)*rowNum;
        pageDown(prevPage,classArray,false)
    }
    if($(this).val()==1){
        currentPage++;
        if (currentPage>Math.ceil(classArray.length/rowNum)){
            currentPage=1;
        }
        $(".page_btn").eq(currentPage-1).addClass("active").siblings().removeClass("active");
        let nextPage = (currentPage-1)*rowNum;
        pageDown(nextPage,classArray,false)
    }

});

//查看按钮点击事件
$("#mytable").on("click",".btn_look",function () {
    $("#myBox").html("");
    $("#myBox").html(`<div class="modal-dialog modal-lg">
        <div class="modal-content">
            <!-- 模态框头部 -->
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">班级人数: <span class="childrenAccount"></span></h4>
            </div>

            <!-- 模态框主体 -->
            <div class="modal-body">
                <table id="lookTable" class="table table-striped table-advance table-hover">
                    <thead>
                        <tr>
                            <th>学生姓名</th>
                            <th>年龄</th>
                            <th>性别</th>
                            <th>家长姓名</th>
                            <th>家长电话</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>

            <!-- 模态框底部 -->
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">关闭</button>
            </div>

        </div>
    </div>`);

    $("#lookTable tbody").text("");
    let className=$(this).parent().siblings().eq(0).text();
    let classMembers=0;
    // console.log(className);
    for (let i=0; i<students.length; i++){
        let grade=students[i].grade.split("-")[1];
        if (grade==className){
            classMembers++;
        }
        let age=2018-parseInt(students[i].birthday.split(".")[0]);
        if (grade==className){
            $("#lookTable tbody").append(`<tr>
                                            <td>${students[i].studentName}</td>
                                            <td>${age}</td>
                                            <td>${students[i].sex}</td>
                                            <td>${students[i].parentsName}</td>
                                            <td>${students[i].telNumber}</td>
                                       </tr>`);
        }
    }
    $(".childrenAccount").text(classMembers);

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
                        <label class="col-sm-3 control-label col-lg-3 col-md-3" for="className">名字</label>
                        <div class="col-lg-8 col-md-7">
                            <input type="text" class="form-control" id="className">
                        </div>
                    </div>
                    <div class="form-group has-default">
                        <label class="col-sm-3 control-label col-lg-3 col-md-3" for="classGrade">年级</label>
                        <div class="col-lg-8 col-md-7">
                            <input type="text" class="form-control" id="classGrade">
                        </div>
                    </div>
                    <div class="form-group has-default">
                        <label class="col-sm-3 control-label col-lg-3 col-md-3" for="classTeacher1">主班老师</label>
                        <div class="col-lg-8 col-md-7">
                            <input type="text" class="form-control" id="classTeacher1">
                        </div>
                    </div>
                    <div class="form-group has-default">
                        <label class="col-sm-3 control-label col-lg-3 col-md-3" for="classTeacher2">副班老师</label>
                        <div class="col-lg-8 col-md-7">
                            <input type="text" class="form-control" id="classTeacher2">
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
    let theName=$(this).parent().siblings().first("td").text();
    let theGrade=$(this).parent().siblings().eq(1).text();
    let theTeacher1=$(this).parent().siblings().eq(2).text();
    let theTeacher2=$(this).parent().siblings().eq(3).text();
    $("#myBox #className").val(theName);
    $("#myBox #classGrade").val(theGrade);
    $("#myBox #classTeacher1").val(theTeacher1);
    $("#myBox #classTeacher2").val(theTeacher2);
    $(".edit_true").click(function () {
        _this.parent().siblings().first("td").text($("#myBox #className").val())
        _this.parent().siblings().eq(1).text($("#myBox #classGrade").val())
        _this.parent().siblings().eq(2).text($("#myBox #classTeacher1").val())
        _this.parent().siblings().eq(3).text($("#myBox #classTeacher2").val())
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
    let theName=$(this).parent().siblings().first("td").text();
    classArray.forEach(function (item,index){

        if(item.className==theName){
            let classMembers=0;
            for (let i=0; i<students.length; i++) {
                let grade = students[i].grade.split("-")[1];
                if (grade == theName) {
                    classMembers++;
                }
            }
            if (classMembers>0){
                $("#myBox .modal-body").text("该班级有学生，不能删除！");
            }
            if (classMembers==0){
                $("#myBox .modal-body").text("删除成功！");
                deletePage(classArray);
                classArray.splice(index,1);
                $("tbody").html("");
                pageDown(0,classArray,false);
                pageNum(classArray);
                // $(".pageBtn").html("")
            }
        }
    });
});

//升班按钮点击事件
$("#mytable").on("click",".btn_up",function () {
    $("#myBox").html("");
    $("#myBox").html(`<div class="modal-dialog modal-sm">
        <div class="modal-content">
            <!-- 模态框头部 -->
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">升班结果</h4>
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
    let theGrade=$(this).parent().siblings().eq(1).text();
    if (theGrade=="大班") {
        $("#myBox .modal-body").text("该班已经是大班，不能再升班了！");
    }
    if (theGrade=="中班") {
        $(this).parent().siblings().eq(1).text("大班");
        $("#myBox .modal-body").text("升班成功！");
    }
    if (theGrade=="小班") {
        $(this).parent().siblings().eq(1).text("中班");
        $("#myBox .modal-body").text("升班成功！");
    }
})

//毕业按钮点击事件
$("#mytable").on("click",".btn_graduate",function () {
    $("#myBox").html("");
    $("#myBox").html(`<div class="modal-dialog modal-sm">
        <div class="modal-content">
            <!-- 模态框头部 -->
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">毕业</h4>
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
    let theGrade=$(this).parent().siblings().eq(1).text();
    if (theGrade=="大班") {
        $("#myBox .modal-body").text("恭喜这个班的小朋友，毕业啦！");
        $(this).attr("title","已毕业").addClass('btn-danger disabled').removeClass('btn-success');
    }
    if (theGrade=="中班") {
        $("#myBox .modal-body").text("该班还不能毕业！");
    }
    if (theGrade=="小班") {
        $("#myBox .modal-body").text("该班还不能毕业！");
    }
})

//添加中确定按钮点击事件
$(".add_box").on("click",".btn",function () {
    $("#myBox").html("");
    $("#myBox").html(`<div class="modal-dialog modal-md">
        <div class="modal-content">
            <!-- 模态框头部 -->
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">添加新班级</h4>
            </div>

            <!-- 模态框主体 -->
            <div class="modal-body">
                <form class="form-horizontal tasi-form" method="get">
                    <div class="form-group has-default">
                        <label class="col-sm-3 control-label col-md-3 col-lg-3" for="addName">名字</label>
                        <div class="col-md-7 col-lg-7">
                            <input type="text" class="form-control" id="addName">
                        </div>
                    </div>
                    <div class="form-group has-default">
                        <label class="col-sm-3 control-label col-md-3 col-lg-3" for="addGrade">年级</label>
                        <div class="col-md-7 col-lg-7">
                            <input type="text" class="form-control" id="addGrade">
                        </div>
                    </div>
                    <div class="form-group has-default">
                        <label class="col-sm-3 control-label col-md-3 col-lg-3" for="addTeacher1">主班老师</label>
                        <div class="col-md-7 col-lg-7">
                            <input type="text" class="form-control" id="addTeacher1">
                        </div>
                    </div>
                    <div class="form-group has-default">
                        <label class="col-sm-3 control-label col-md-3 col-lg-3" for="addTeacher2">副班老师</label>
                        <div class="col-md-7 col-lg-7">
                            <input type="text" class="form-control" id="addTeacher2">
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
        for (let i=0; i<classArray.length; i++){
            if ($("#myBox #addName").val()==classArray[i].className||$("#myBox  #addName").val()==""){
                $("#myBox .modal-body").text("编号为空或者重复,请重新输入一个新的编号！");
                $(this).remove();
                flag=false;
                return false;
            }
            if ($("#myBox #addGrade").val()==classArray[i].classGrade||$("#myBox  #addGrade").val()==""){
                $("#myBox .modal-body").text("姓名为空或者重复,请重新输入一个新的名称！");
                $(this).remove();
                flag=false;
                return false;
            }
            if ($("#myBox #addTeacher1").val()==classArray[i].classTeacher1||$("#myBox  #addTeacher1").val()==classArray[i].classTeacher2){
                $("#myBox .modal-body").text("该老师已是主班老师,请重新输入一个老师的名字！");
                $(this).remove();
                flag=false;
                return false;
            }
        }
        if (flag){
            classArray.push({
                classId:classArray.length+1,
                className:$("#myBox #addName").val(),
                classGrade:$("#myBox #addGrade").val(),
                classTeacher1:$("#myBox #addTeacher1").val(),
                classTeacher2:$("#myBox #addTeacher2").val(),
            });
            // $("#mytable tbody").append(`<tr>
            //                                 <td>${$("#myBox #addName").val()}</td>
            //                                 <td>${$("#myBox #addGrade").val()}</td>
            //                                 <td>${$("#myBox #addTeacher1").val()}</td>
            //                                 <td>${$("#myBox #addTeacher2").val()}</td>
            //
            //                                 <td>
            //                                    <button title="查看详情" class="btn btn-info btn-xs btn_look" data-toggle="modal" data-target="#myBox"><i class="glyphicon glyphicon-search "></i></button>
            //                                    <button title="编辑" class="btn btn-primary btn-xs btn_edit" data-toggle="modal" data-target="#myBox"><i class="fa fa-pencil"></i></button>
            //                                    <button title="删除" class="btn btn-danger btn-xs btn_delete" data-toggle="modal" data-target="#myBox"><i class="fa fa-trash-o "></i></button>
            //                                    <button title="升班" class="btn btn-warning btn-xs btn_up" data-toggle="modal" data-target="#myBox"><i class="glyphicon glyphicon-circle-arrow-up"></i></button>
            //                                    <button title="毕业" class="btn btn-success btn-xs btn_graduate" data-toggle="modal" data-target="#myBox"><i class="glyphicon glyphicon-send "></i></button>
            //                                 </td>
            //                            </tr>`);
            $("#myBox .modal-body").text("添加成功！");
            pageDown(0,classArray,false);
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
    deletePage(classArray);
    $(".prev_btn").remove();
    $(".next_btn").remove();
    let hasResult=false;
    classArray.forEach(function (item,index){
        if(item.className==theSearch||item.className.split("")[0]==theSearch){
            hasResult=true;
            count.push(1);
            $("#mytable tbody").append(`<tr>
                                            <td>${item.className}</td>
                                            <td>${item.classGrade}</td>
                                            <td>${item.classTeacher1}</td>
                                            <td>${item.classTeacher2}</td>
                                            <td>  
                                               <button title="查看详情" class="btn btn-info btn-xs btn_look" data-toggle="modal" data-target="#myBox"><i class="glyphicon glyphicon-search "></i></button> 
                                               <button title="编辑" class="btn btn-primary btn-xs btn_edit" data-toggle="modal" data-target="#myBox"><i class="fa fa-pencil"></i></button>
                                               <button title="删除" class="btn btn-danger btn-xs btn_delete" data-toggle="modal" data-target="#myBox"><i class="fa fa-trash-o "></i></button>   
                                               <button title="升班" class="btn btn-warning btn-xs btn_up" data-toggle="modal" data-target="#myBox"><i class="glyphicon glyphicon-circle-arrow-up"></i></button>   
                                               <button title="毕业" class="btn btn-success btn-xs btn_graduate" data-toggle="modal" data-target="#myBox"><i class="glyphicon glyphicon-send "></i></button>   
                                            </td>
                                       </tr>`);
        }
        if(item.classTeacher1==theSearch||item.classTeacher1.split("")[0]==theSearch){
            hasResult=true;
            count.push(1);
            $("#mytable tbody").append(`<tr>
                                            <td>${item.className}</td>
                                            <td>${item.classGrade}</td>
                                            <td>${item.classTeacher1}</td>
                                            <td>${item.classTeacher2}</td>
                                            <td>  
                                               <button title="查看详情" class="btn btn-info btn-xs btn_look" data-toggle="modal" data-target="#myBox"><i class="glyphicon glyphicon-search "></i></button> 
                                               <button title="编辑" class="btn btn-primary btn-xs btn_edit" data-toggle="modal" data-target="#myBox"><i class="fa fa-pencil"></i></button>
                                               <button title="删除" class="btn btn-danger btn-xs btn_delete" data-toggle="modal" data-target="#myBox"><i class="fa fa-trash-o "></i></button>   
                                               <button title="升班" class="btn btn-warning btn-xs btn_up" data-toggle="modal" data-target="#myBox"><i class="glyphicon glyphicon-circle-arrow-up"></i></button>   
                                               <button title="毕业" class="btn btn-success btn-xs btn_graduate" data-toggle="modal" data-target="#myBox"><i class="glyphicon glyphicon-send "></i></button>   
                                            </td>
                                       </tr>`);
        }
    });
    if (hasResult==false){
        $("#mytable tbody").append(`<tr>
                                            <td colspan="10">搜素无结果</td>
                                       </tr>`);
    }
    /*for (let i=1; i<=Math.ceil(count.length/rowNum); i++){
        $(".next_btn").before(`<li><a class="page_btn" href="#">${i}</a></li>`);
    }*/
})