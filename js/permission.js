let permissionArray={
    Administrator:{
        basicModule:['部门管理','职工管理','班级管理','学生管理','权限管理'],
        basicModuleHref:['pages/divisionManagement.html','pages/staffManagement.html','pages/classManagement.html','pages/studentManagment.html','pages/power.html'],
        courseHref:'pages/course.html',
        photoModuleHref:'pages/photo wall.html',
        checkWork:['出勤管理'],
        checkWorkHref:['pages/kaoqing.html'],
        noticeModule:['查看公告'],
        noticeModuleHref:['pages/news.html'],
    },
    Teacher:{
        basicModule:['班级管理','学生管理'],
        //仅自己班级
        basicModuleHref:['pages/staffManagement.html','pages/classManagement.html'],
        courseHref:'pages/course.html',
        photoModuleHref:'pages/photo wall.html',
        checkWork:['出勤管理'],
        checkWorkHref:['pages/kaoqing.html'],
        noticeModule:['发布公告','查看公告'],
        noticeModuleHref:['pages/notice.html','pages/news.html'],
    },

    Director:{
        basicModule:['班级管理','学生管理'],
        //圈校所有人
        basicModuleHref:['pages/staffManagement.html','pages/classManagement.html'],
        courseHref:'pages/course.html',
        photoModuleHref:'pages/photo wall.html',
        checkWork:['出勤管理'],
        checkWorkHref:['pages/kaoqing.html'],
        noticeModule:['发布公告','查看公告'],
        noticeModuleHref:['pages/notice.html','pages/news.html'],
    }
}