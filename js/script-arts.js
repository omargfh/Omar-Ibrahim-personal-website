$(document).ready(function () {

    $(window).on('load', function () {
        headerControl("onload", "else");
        $('.navbar-toggler').click(function () {
            headerControl("onclick");
        });
    });

    $(window).on('resize', function () {
        headerControl("onload");
    });

    $(window).on('scroll', function () {
        headerControl("onscroll");
    });
});