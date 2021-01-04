$(document).ready(function() {

    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 10,
        autoplay: true,
        autoplayTimeout: 5000,
        margin: 50,
        center: true,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 3
            },
            1000: {
                items: 5
            }
        }
    })

    $(window).on('load', function() {
        headerControl("onload");
        $('.navbar-toggler').click(function() {
            headerControl("onclick");
        });
    });

    $(window).on('resize', function() {
        headerControl("onload");
    });

    $(window).on('scroll', function() {
        headerControl("onscroll");
    });
});