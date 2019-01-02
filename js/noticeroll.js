function noticeUp(obj, top, time) {
    $(obj).animate({
        marginTop: top
    }, time, function () {
        $(this).css({marginTop: "0"}).find(":first").appendTo(this);
    })
};

$(function () {
    setInterval("noticeUp('.notice ul','-35px',900)", 2000);
});