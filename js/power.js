$(function () {

    var teacherArr = [];
    function teachers() {
        teacherList.forEach(function (ele, index) {
            var $item = '';
            $index = teacherList.length;
            $item += '<tr class="item" index=' + index + '><td><div class="checkbox"><label>' +
                '<input type="checkbox" name="checkbox" class="check-item" id="blankCheckbox" value="option1" aria-label="...">' +
                '</label>' +
                '</div>' +
                '</td>' +
                '<td>' + ele.jobNum + '</td>' +
                '<td>' + ele.name + '</td>' +
                '<td>' + ele.sex + '</td>' +
                '<td>' + ele.age + '</td>' +
                '<td>' + ele.tel + '</td>' +
                '<td>' + ele.department + '</td>' +
                '<td>' + ele.course + '</td>' +
                '<td>' + ele.class + '</td>' +
                '<td>' + ele.time + '</td> ' +
                '<td>' +
                '<span class="cursor2 redact" data-toggle="modal" data-target="#check_modal">编辑</span>' +
                '<span class="cursor1 single-del">删除</span>' +
                '</td> ' +
                '</tr>';


            $('#tbody-middle').append($item);
            teacherArr.push($item);
            console.log($index);
        });
    }

    teachers();

    $('input[name=checkbox]').on('click', checkboxFc);

    function checkboxFc() {
        if ($(this).is('.pitch-on')) {
            $(this).prop('checked', false);
            $(this).removeClass('pitch-on');
            $('.checked-btn').removeClass('check-all');
        } else {
            $(this).prop('checked', true);
            $(this).addClass('pitch-on');
        }
    }

    $('.checked-btn').on('click', checkAllFc);

    function checkAllFc() {
        if ($(this).is('.check-all')) {
            //console.log('lsd');
            $('input[name=checkbox]').prop('checked', false);
            $('input[name=checkbox]').removeClass('pitch-on');
            $('.checked-btn').removeClass('check-all');
        } else {
            //console.log('lsd');
            $('input[name=checkbox]').prop('checked', true);
            $('input[name=checkbox]').addClass('pitch-on');
            $('.checked-btn').addClass('check-all');
        }
    }

    $('.del').on('click', del);

    function del() {
        $('.del_model_bg,.del_my_model').show();
        $('.dialog-sure').click(function () {
            $('.item').each(function (index, ele) {
                if ($(ele).find('.check-item').is(':checked')) {
                    this.remove();
                }
            });
            removeShaow();
        });
        $('.icon-delete').on('click', removeShaow);
        $('.del_model_bg').on('click', removeShaow);
        $('.dialog-close').on('click', removeShaow);
    }

    $('.single-del').on('click', singleDel);

    function singleDel() {
        $('.del_model_bg,.del_my_model').show();
        $(this).each(function (index, ele) {
            $('.dialog-sure').click(function () {
                $(ele).parents('tr').remove();
                teacherArr.splice(index, 1);
                removeShaow();
            });
            $('.icon-delete').on('click', removeShaow);
            $('.del_model_bg').on('click', removeShaow);
            $('.dialog-close').on('click', removeShaow);
        })
    }

    function removeShaow() {
        $('.del_model_bg,.del_my_model').hide();
    }

    $('.form-control').on('click', matchingFc);
    $('#search-text').on('click', matchingFc3);
    function matchingFc() {
        var $departmentText = $('.select-department').val(),
            $courseText = $('.select-course').val(),
            $searchText = $('.search-box').val();
        $('tr:not(:first)').hide();
        if ($departmentText == '职位' && $courseText == '性别') {
            $('tr:not(:first)').show();
        } else if ($courseText == '性别') {
            $('tr:contains(' + $departmentText + ')').show();
        } else if ($departmentText == '职位') {
            $('tr:contains(' + $courseText + ')').show();
        } else if ($courseText == '男') {
            $('tr:contains(' + $departmentText + ')').show();
            $('tr:contains("女")').hide();
        } else if ($courseText == '女') {
            $('tr:contains(' + $departmentText + ')').show();
            $('tr:contains("男")').hide();

        }
    }
    function matchingFc3() {
        $searchText = $('.search-box').val();
        $('.item')
            .hide()
            .filter('tr:contains(' + $searchText + ')')
            .show();
    }

    function noFc() {
        $('.redact-con,.model_bg').remove();
    }

    $('.reset-btn').on('click', resetFn);

    function resetFn() {
        $('#check_modal').hide().show();
    }

    var $teacherAdd = '';
    $('#add-naw').on('click', function () {
        function redactVal() {
            $('#teacher-jobNum').val('');
            $('#teacher-name').val('');
            $('#teacher-sex').val('');
            $('#teacher-age').val('');
            $('#teacher-tel').val('');
            $('#teacher-department').val('');
            $('#teacher-course').val('');
            $('#teacher-class').val('');
            $('#teacher-time').val('');
        }

        redactVal();

        $('.sure-redact').on('click', yesFc);

        function yesFc() {
            teacherAddFn();
            $('#tbody-middle').append($teacherAdd);
            teacherAddObj();
            $('.sure-redact').off('click', yesFc)
        }

    });

    function teacherAddObj() {
        var $sex = '';
        if ($("input[id='teacher-boy']:checked").val()) {
            $sex = '男';
        } else {
            $sex = '女';
        }

        var $department = '';
        if ($("option[id='department-op1']:checked").val()) {
            $department = '园长';
        } else if($("option[id='department-op2']:checked").val())
        {
            $department = '班主任';
        }else($("option[id='department-op3']:checked").val())
        {
            $department = '任课教师';
        }

        var $course = '';
        if ($("option[id='course-op1']:checked").val()) {
            $course = '男';
        } else if ($("option[id='course-op2']:checked").val()) {
            $course = '女';
        }


        var $class = '';
        if ($("option[id='class-op1']:checked").val()) {
            $class = '大班';
        } else if ($("option[id='class-op2']:checked").val()) {
            $class = '中班';
        }
        else if ($("option[id='class-op3']:checked").val()) {
            $class = '小班';
        }

        var teacherAddObj = {};
        teacherAddObj.jobNum = $('#teacher-jobNum').val();
        teacherAddObj.name = $('#teacher-name').val();
        if ($("input[id='teacher-boy']:checked").val()) {
            teacherAddObj.sex = '男';
        } else {
            teacherAddObj.sex = '女';
        }
        teacherAddObj.age = $('#teacher-age').val();
        teacherAddObj.tel = $('#teacher-tel').val();

        if ($("option[id='department-op1']:checked").val()) {
            teacherAddObj.department = 'y园长';
        } else if($("option[id='department-op2']:checked").val())
        {
            teacherAddObj.department = '班主任';
        }else($("option[id='department-op3']:checked").val())
        {
            teacherAddObj.department = '任课教师';
        }

        if ($("option[id='course-op1']:checked").val()) {
            teacherAddObj.course = '男';
        } else if ($("option[id='course-op2']:checked").val()) {
            teacherAddObj.course = '女';
        }


        if ($("option[id='class-op1']:checked").val()) {
            teacherAddObj.class = '大班';
        } else if ($("option[id='class-op2']:checked").val()) {
            teacherAddObj.class = '中班';
        }
        else if ($("option[id='class-op3']:checked").val()) {
            teacherAddObj.class = '小班';
        }

        teacherAddObj.time = $('#teacher-time').val();

        teacherAddObj.pass = '000000';
        teacherAddObj.role = "2";
        teacherArr.push(teacherAddObj);
    }

    function teacherAddFn() {
        var $sex = '';
        if ($("input[id='teacher-boy']:checked").val()) {
            $sex = '男';
        } else {
            $sex = '女';
        }
        $teacherAdd =
            '<tr class="item" index =' + $index + '>' +
            '<td><div class="checkbox"><label>' +
            '<input type="checkbox" name="checkbox" class="check-item" id="blankCheckbox" value="option1" aria-label="...">' +
            '</label>' +
            '</div>' +
            '</td>' +
            '<td>' + $('#teacher-jobNum').val() + '</td>' +
            '<td>' + $('#teacher-name').val() + '</td>' +
            '<td>' + $sex + '</td>' +
            '<td>' + $('#teacher-age').val() + '</td>' +
            '<td>' + $('#teacher-tel').val() + '</td>' +
            '<td>' + $('#teacher-department option:selected').text() + '</td>' +
            '<td>' + $('#teacher-course option:selected').text() + '</td>' +
            '<td>' + $('#teacher-class option:selected').text() + '</td>' +
            '<td>' + $('#teacher-time').val() + '</td> ' +
            '<td>' +
            '<span class="cursor2 redact" data-toggle="modal" data-target="#check_modal">编辑</span>' +
            '<span class="cursor1 single-del">删除</span>' +
            '</td>' +
            '</tr>';

        $('.single-del').on('click', singleDel);
        $('.del').on('click', del);
        $('.redact').on('click', redactFc);
        $index++
    }

    $('.redact').on('click', redactFc);

    function redactFc() {
        $conStudent = $(this).parents('tr').children();
        console.log($conStudent);
        $index = Number($(this).parents('tr').attr('index'));
        console.log($index);

        function redactVal() {
            $('#teacher-jobNum').val($conStudent.eq(1).text());
            $('#teacher-name').val($conStudent.eq(2).text());

            if ($conStudent.eq(3).text() == '男') {
                $('#teacher-boy').prop('checked', true);
            } else {
                $('#teacher-girl').prop('checked', true);
            }

            $('#teacher-age').val($conStudent.eq(4).text());
            $('#teacher-tel').val($conStudent.eq(5).text());

            if ($conStudent.eq(6).text() == '园长') {
                $('#teacher-department').val('园长');
            } else if($conStudent.eq(6).text() == '班主任')
            {
                $('#teacher-department').val('班主任');
            }else($conStudent.eq(6).text() == '任课教师')
            {
                $('#teacher-department').val('任课教师');
            }

            if ($conStudent.eq(7).text() == '男') {
                $('#teacher-course').val('男');
            } else if ($conStudent.eq(7).text() == '女') {
                $('#teacher-course').val('女');
            }
            if ($conStudent.eq(8).text() == '1班') {
                $('#teacher-class').val('大班');
            } else if ($conStudent.eq(8).text() == '2班') {
                $('#teacher-class').val('中班');
            } else if ($conStudent.eq(8).text() == '3班') {
                $('#teacher-classe').val('小班');
            }
            $('#teacher-time').val($conStudent.eq(9).text());
            console.log($conStudent.eq(9).text())
        }

        redactVal();

        $('.sure-redact').on('click', redactYesFc);
        $('.reset').on('click', resetFn);
        $('.single-del').on('click', singleDel);
        $('.del').on('click', del);
    }

    function redactYesFc() {

        teacherList[$index].jobNum = $('#teacher-jobNum').val();
        $conStudent.eq(1).text($('#teacher-jobNum').val());

        $conStudent.eq(2).text($('#teacher-name').val());
        teacherList[$index].name = $('#teacher-name').val();

        if ($("input[id='teacher-boy']:checked").val()) {
            $conStudent.eq(3).text('男');
            teacherList[$index].sex = '男';
        } else {
            $conStudent.eq(3).text('女');
            teacherList[$index].sex = '女';
        }
        $conStudent.eq(4).text($('#teacher-age').val());
        teacherList[$index].age = $('#teacher-age').val();
        $conStudent.eq(5).text($('#teacher-tel').val());
        teacherList[$index].tel = $('#teacher-tel').val();
        if ($conStudent.eq(6).text() == '园长') {
            $conStudent.eq(6).text('园长');
            teacherList[$index].department = '园长';
        } else if($conStudent.eq(6).text() == '班主任')
        {
            $conStudent.eq(6).text('班主任');
            teacherList[$index].department = '班主任';
        }else($conStudent.eq(6).text() == '任课教师')
        {
            $conStudent.eq(6).text('任课教师');
            teacherList[$index].department = '任课教师';
        }
        if ($conStudent.eq(7).text() == '男') {
            console.log('222')
            $conStudent.eq(7).text('男');
            teacherList[$index].course = '男';
        } else if ($conStudent.eq(7).text() == '女') {
            $conStudent.eq(7).text('女');
            teacherList[$index].course = '女';
        }
        if ($conStudent.eq(8).text() == '大班') {
            $conStudent.eq(8).text('大班');
            teacherList[$index].class = '大班';
        } else if ($conStudent.eq(8).text() == '中班') {
            $conStudent.eq(8).text('中班');
            teacherList[$index].class = '中班';
        } else if ($conStudent.eq(8).text() == '小班') {
            $conStudent.eq(8).text('小班');
            teacherList[$index].class = '小班';
        }
        $conStudent.eq(9).text($('#teacher-time').val());
        teacherList[$index].time = $('#teacher-time').val();
        console.log($conStudent);
        $('.sure-redact').off('click', redactYesFc)
    }
    $('.no').on('click', function () {

    })


}) ;