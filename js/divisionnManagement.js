//每页5行数据
const rowNum=5;
//当前页数
var currentPage =1;

$(document).ready(function () {
    pageDown(0,departmentObj,true);
    // pageNum(departmentObj);
});

//生成表格数据
function pageDown(fistNum,arr,hasHead) {
    if (hasHead){
        for(let item in departmentObj[0]){
            if(item=="departmentID"){
                $("#mytable thead tr").append("<th>编号</th>")
            }else if(item=="departmentName"){
                $("#mytable thead tr").append("<th>名称</th>")
            }else if(item=="departmentLeader"){
                $("#mytable thead tr").append("<th>部长</th>")
            }else if(item=="departmentMember"){
                $("#mytable thead tr").append("<th>人数</th>")
            }else if(item=="departmentDescription"){
                $("#mytable thead tr").append("<th>描述</th>")
            }
        }
        $("#mytable thead tr").append("<th>操作</th>")
    }
    $("#mytable tbody").text("");
    for (let i=fistNum; i<fistNum+rowNum; i++){
        if (i<arr.length){
            $("#mytable tbody").append(`<tr>
                                            <td>${arr[i].departmentID}</td>
                                            <td>${arr[i].departmentName}</td>
                                            <td>${arr[i].departmentLeader}</td>
                                            <td>${arr[i].departmentMember}</td>
                                            <td>${arr[i].departmentDescription}</td>
                                            <td>   
                                            <button class="btn btn-info btn-xs btn_look" data-toggle="modal" data-target="#myBox"><i class="glyphicon glyphicon-search "></i></button>       
                                               <button class="btn btn-primary btn-xs btn_edit" data-toggle="modal" data-target="#myBox"><i class="fa fa-pencil"></i></button>
                                               <button class="btn btn-danger btn-xs btn_delete" data-toggle="modal" data-target="#myBox"><i class="fa fa-trash-o "></i></button>
                                               
                                            </td>
                                       </tr>`);
        }
    }
}

//生成分页按钮事件
function pageNum(arr){
    for (let i=1; i<=Math.ceil(arr.length/rowNum); i++){
        $(".next_btn").before(`<li><a class="page_btn" href="#">${i}</a></li>`);
    }
}

//分页中数字按钮点击事件
$(".page_ul").on("click",".page_btn",function () {
    let num = $(this).text();
    currentPage = num;
    num = (num-1)*rowNum;
    pageDown(num,departmentObj,false)
});

//分页中的左右按钮点击事件
$(".page_ul").on("click",".prev_btn,.next_btn",function () {
    if($(this).val()==0){
        currentPage--;
        if (currentPage<1){
            currentPage=Math.ceil(departmentObj.length/rowNum);
        }
        let prevPage = (currentPage-1)*rowNum;
        pageDown(prevPage,departmentObj,false)
    }
    if($(this).val()==1){
        currentPage++;
        if (currentPage>Math.ceil(departmentObj.length/rowNum)){
            currentPage=1;
        }
        let nextPage = (currentPage-1)*rowNum;
        pageDown(nextPage,departmentObj,false)
    }

});

//查看详情按钮点击事件函数

$("#mytable").on("click",".btn_look",function () {
    $("#myBox").html("");
    $("#myBox").html("<div class=\"modal-dialog modal-sm\">\n" +
        "        <div class=\"modal-content\">\n" +
        "            <!-- 模态框头部 -->\n" +
        "            <div class=\"modal-header\">\n" +
        "                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
        "                <h4 class=\"modal-title\">成员详情</h4>\n" +
        "            </div>\n" +
        "\n" +
        "            <!-- 模态框主体 -->\n" +
        "            <div class=\"modal-body\">\n" +
        "                <table id=\"lookTable\" class=\"table table-striped table-advance table-hover\">\n" +
        "                    <thead>\n" +
        "                        <tr>\n" +
        "                            <th>名字</th>\n" +
        "                            <th>手机</th>\n" +
        "                            <th>激活状态</th>\n" +
        "                        </tr>\n" +
        "                    </thead>\n" +
        "                    <tbody></tbody>\n" +
        "                </table>\n" +
        "            </div>\n" +
        "\n" +
        "            <!-- 模态框底部 -->\n" +
        "            <div class=\"modal-footer\">\n" +
        "                <button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\">关闭</button>\n" +
        "            </div>\n" +
        "\n" +
        "        </div>\n" +
        "    </div>");
    lookPage(employee);
});
//激活状态
var activatedState = false;
function lookPage(arr) {
    $("#lookTable tbody").text("");
    for (let i=0; i<arr.length; i++){
        if (i<arr.length){
            $("#lookTable tbody").append(`<tr>
                                            <td>${arr[i].employeeName}</td>
                                            <td>${arr[i].telNumber}</td>
                                            <td>激活</td>
                                       </tr>`);
        }
    }
}

//修改按钮点击事件
$("#mytable").on("click",".btn_edit",function () {
    $("#myBox").html("");
    $("#myBox").html("<div class=\"modal-dialog modal-md\">\n" +
        "        <div class=\"modal-content\">\n" +
        "            <!-- 模态框头部 -->\n" +
        "            <div class=\"modal-header\">\n" +
        "                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
        "                <h4 class=\"modal-title\">编辑</h4>\n" +
        "            </div>\n" +
        "\n" +
        "            <!-- 模态框主体 -->\n" +
        "            <div class=\"modal-body\">\n" +
        "                <form class=\"form-horizontal tasi-form\" method=\"get\">\n" +
        "                    <div class=\"form-group has-default\">\n" +
        "                        <label class=\"col-sm-3 control-label col-lg-3 col-md-3\" for=\"departmentID\">编号</label>\n" +
        "                        <div class=\"col-lg-8 col-md-7\">\n" +
        "                            <input type=\"text\" class=\"form-control\" id=\"departmentID\">\n" +
        "                        </div>\n" +
        "                    </div>\n" +
        "                    <div class=\"form-group has-default\">\n" +
        "                        <label class=\"col-sm-3 control-label col-lg-3 col-md-3\" for=\"departmentName\">名称</label>\n" +
        "                        <div class=\"col-lg-8 col-md-7\">\n" +
        "                            <input type=\"text\" class=\"form-control\" id=\"departmentName\">\n" +
        "                        </div>\n" +
        "                    </div>\n" +
        "                    <div class=\"form-group has-default\">\n" +
        "                        <label class=\"col-sm-3 control-label col-lg-3 col-md-3\" for=\"departmentLeader\">部长</label>\n" +
        "                        <div class=\"col-lg-8 col-md-7\">\n" +
        "                            <input type=\"text\" class=\"form-control\" id=\"departmentLeader\">\n" +
        "                        </div>\n" +
        "                    </div>\n" +
        "                    <div class=\"form-group has-default\">\n" +
        "                        <label class=\"col-sm-3 control-label col-lg-3 col-md-3\" for=\"departmentMember\">人数</label>\n" +
        "                        <div class=\"col-lg-8 col-md-7\">\n" +
        "                            <input type=\"text\" class=\"form-control\" id=\"departmentMember\">\n" +
        "                        </div>\n" +
        "                    </div>\n" +
        "                    <div class=\"form-group has-default\">\n" +
        "                        <label class=\"col-sm-3 control-label col-lg-3 col-md-3\" for=\"departmentDescription\">描述</label>\n" +
        "                        <div class=\"col-lg-8 col-md-7\">\n" +
        "                            <textarea class=\"form-control\" name=\"\" id=\"departmentDescription\" cols=\"30\" rows=\"10\" style=\"resize:none;height: 58px\" ></textarea>\n" +
        "                        </div>\n" +
        "                    </div>\n" +
        "                </form>\n" +
        "            </div>\n" +
        "\n" +
        "            <!-- 模态框底部 -->\n" +
        "            <div class=\"modal-footer\">\n" +
        "                <button type=\"button\" class=\"btn btn-success edit_true\" data-dismiss=\"modal\">确认</button>\n" +
        "                <button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\">关闭</button>\n" +
        "            </div>\n" +
        "\n" +
        "        </div>\n" +
        "    </div>");
    let _this=$(this);
    let theId=$(this).parent().siblings().first("td").text();
    let theName=$(this).parent().siblings().eq(1).text();
    let theLeader=$(this).parent().siblings().eq(2).text();
    let theNumber=$(this).parent().siblings().eq(3).text();
    let theText=$(this).parent().siblings().eq(4).text();
    $("#myBox #departmentID").val(theId);
    $("#myBox #departmentName").val(theName);
    $("#myBox #departmentLeader").val(theLeader);
    $("#myBox #departmentMember").val(theNumber);
    $("#myBox #departmentDescription").val(theText);
    $("#myBox").on("click",".edit_true",function () {
        _this.parent().siblings().first("td").text($("#myBox #departmentID").val())
        _this.parent().siblings().eq(1).text($("#myBox #departmentName").val())
        _this.parent().siblings().eq(2).text($("#myBox #departmentLeader").val())
        _this.parent().siblings().eq(3).text($("#myBox #departmentMember").val())
        _this.parent().siblings().eq(4).text($("#myBox #departmentDescription").val())
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
    let theMember=$(this).parent().siblings().eq(3).text();
    departmentObj.forEach(function (item,index){
        if(item.departmentID==theDeta){
            if (theMember!=0){
                $("#myBox .modal-body").text("该部门下还有人员，不能删除！");
            }
            if (theMember==0){
                $("#myBox .modal-body").text("删除成功！");
                departmentObj.splice(index,1);
                $("tbody").html("");
                pageDown(0,departmentObj ,false);
                // $(".pageBtn").html("")
            }
        }
    });
});
//删除新添加
$("#mytable").on("click",".addBtn_delete",function () {
    let theMember=$(this).parent().siblings().eq(3).text();
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
    if (theMember!=0){
        $("#myBox .modal-body").text("该部门下还有人员，不能删除！");
    }
    if (theMember==0){
        $("#myBox .modal-body").text("删除成功！");
        $(this).parent().parent().html("");
    }
})

//添加中确定按钮点击事件
$(".add_box").on("click",".btn",function () {
    $("#myBox").html("");
    $("#myBox").html("<div class=\"modal-dialog modal-md\">\n" +
        "        <div class=\"modal-content\">\n" +
        "            <!-- 模态框头部 -->\n" +
        "            <div class=\"modal-header\">\n" +
        "                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
        "                <h4 class=\"modal-title\">添加新部门</h4>\n" +
        "            </div>\n" +
        "\n" +
        "            <!-- 模态框主体 -->\n" +
        "            <div class=\"modal-body\">\n" +
        "                <form class=\"form-horizontal tasi-form\" method=\"get\">\n" +
        "                    <div class=\"form-group has-default\">\n" +
        "                        <label class=\"col-sm-3 control-label col-lg-3 col-md-3\" for=\"addID\">编号</label>\n" +
        "                        <div class=\"col-lg-8 col-md-7 \">\n" +
        "                            <input type=\"text\" class=\"form-control\" id=\"addID\" placeholder=\"请输入部门编号\">\n" +
        "                        </div>\n" +
        "                    </div>\n" +
        "                    <div class=\"form-group has-default\">\n" +
        "                        <label class=\"col-sm-3 control-label col-lg-3 col-md-3\" for=\"addName\">名称</label>\n" +
        "                        <div class=\"col-lg-8 col-md-7\">\n" +
        "                            <input type=\"text\" class=\"form-control\" id=\"addName\" maxlength=\"20\" placeholder=\"请输入部门名称\">\n" +
        "                        </div>\n" +
        "                    </div>\n" +
        "                    <div class=\"form-group has-default\">\n" +
        "                        <label class=\"col-sm-3 control-label col-lg-3 col-md-3\" for=\"addLeader\">部长</label>\n" +
        "                        <div class=\"col-lg-8 col-md-7\">\n" +
        "                            <input type=\"text\" class=\"form-control\" id=\"addLeader\" placeholder=\"可为空\">\n" +
        "                        </div>\n" +
        "                    </div>\n" +
        "                    <div class=\"form-group has-default\">\n" +
        "                        <label class=\"col-sm-3 control-label col-lg-3 col-md-3\" for=\"addMember\" >人数</label>\n" +
        "                        <div class=\"col-lg-8 col-md-7\">\n" +
        "                            <input type=\"text\" class=\"form-control\" id=\"addMember\" value=\"0\">\n" +
        "                        </div>\n" +
        "                    </div>\n" +
        "                    <div class=\"form-group has-default\">\n" +
        "                        <label class=\"col-sm-3 control-label col-lg-3 col-md-3\" for=\"addDescription\">描述</label>\n" +
        "                        <div class=\"col-lg-8 col-md-7\">\n" +
        "                            <textarea class=\"form-control\" name=\"\" id=\"addDescription\" cols=\"30\" rows=\"10\" style=\"resize:none;height: 58px\" maxlength=\"20\"  placeholder=\"请输入部门描述\" ></textarea>\n" +
        "                        </div>\n" +
        "                    </div>\n" +
        "                </form>\n" +
        "            </div>\n" +
        "\n" +
        "            <!-- 模态框底部 -->\n" +
        "            <div class=\"modal-footer\">\n" +
        "                <button type=\"button\" class=\"btn btn-success add_true\">确认</button>\n" +
        "                <button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\">关闭</button>\n" +
        "            </div>\n" +
        "\n" +
        "        </div>\n" +
        "    </div>");
    let flag0=true;
    $(".add_true").click(function () {
        for (let i=0; i<departmentObj.length; i++){
            if ($("#myBox #addID").val()==departmentObj[i].departmentID||$("#myBox  #addID").val()==""){
                $("#myBox .modal-body").text("编号为空或者重复,请重新输入一个新的编号！");
                $(this).remove();
                flag0=false;
                return false;
            }
            if ($("#myBox #addName").val()==departmentObj[i].departmentName||$("#myBox  #addName").val()==""){
                $("#myBox .modal-body").text("名称为空或者重复,请重新输入一个新的名称！");
                $(this).remove();
                flag0=false;
                return false;
            }
        }
        if (flag0){
            console.log(123);
            $("#mytable tbody").append(`<tr>
                                            <td>${$("#myBox #addID").val()}</td>
                                            <td>${$("#myBox #addName").val()}</td>
                                            <td>${$("#myBox #addLeader").val()}</td>
                                            <td>${$("#myBox #addMember").val()}</td>
                                            <td>${$("#myBox #addDescription").val()}</td>
                                            <td>   
                                            <button title="查看详情" class="btn btn-info btn-xs btn_look" data-toggle="modal" data-target="#myBox"><i class="glyphicon glyphicon-search "></i></button>       
                                               <button title="编辑" class="btn btn-primary btn-xs btn_edit" data-toggle="modal" data-target="#myBox"><i class="fa fa-pencil"></i></button>
                                               <button title="删除" class="btn btn-danger btn-xs addBtn_delete" data-toggle="modal" data-target="#myBox"><i class="fa fa-trash-o "></i></button>
                                               
                                            </td>
                                       </tr>`);
            $("#myBox .modal-body").text("添加成功！");
            $(this).remove();
            flag0=false;
        }
    })
    // pageDown(0,departmentObj,false);
});
