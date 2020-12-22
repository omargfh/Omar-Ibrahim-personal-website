$(document).ready(function () {
    $('.carousel-fast').carousel({
        interval: 1000
    });

    $(window).on('load', function() {
        headerControl("onload", "index");
        $('.navbar-toggler').click(function() {
            headerControl("onclick", "index");
        });
        showElements('#section-2', 'card');
        showElements('#section-3-nav', 'timeline');
        showElements('#section-1-nav', 'section-1');
        changeText("#right-down", 767, "To the right, you can see a picture of me during the last STEM Model UN!", "If you look down, you can see a picture of me during the last STEM Model UN!");
    });

    $(window).on('resize', function() {
        headerControl("onload", "index");
        changeText("#right-down", 767, "To the right, you can see a picture of me during the last STEM Model UN!", "If you look down, you can see a picture of me during the last STEM Model UN!");
    });

    $(window).on('scroll', function() {
        headerControl("onscroll", "index");
        showElements('#section-2', 'card');
        showElements('#section-3-nav', 'timeline');
        showElements('#section-1-nav', 'section-1');
    });
});