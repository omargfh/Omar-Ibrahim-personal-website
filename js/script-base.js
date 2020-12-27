$(document).ready(function() {
    // Activate Carousel
    $('.carousel').carousel({
        interval: 5000
    });

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

    $(window).on('scroll', function() {
        $('.gallery-item').each(function(i, el) {
            if (isElementInViewport(el)) {
                $(el).addClass('gallery-item-hover');
            } else {
                $(el).removeClass('gallery-item-hover');
            }
        });
    });

    $(window).on('load', function() {
        // Check for scroll/resize statuses to update DOM
        $('.scroll-behavior').scroll();
        $('.resize-behvior').resize();

        // Smooth-scrolling
        $('.scroll').click(function(event) {
            console.log(this);
            if (this.hash !== "") {
                event.preventDefault();
                var hash = this.hash;
            }
            $('html, body').animate({
                scrollTop: ($(hash).offset().top - 60)
            }, 800, function() {
                history.pushState({}, '', hash);
            });
        });

        // Image gallery (on "arts.html")
        $('.gallery-item').each(function(i, el) {
            $(el).mouseover(function() {
                if ($(el).children().prop('naturalWidth') >= $(el).width()) {
                    // Extract data
                    var image = new Image();
                    image.src = $(el).children()[0].dataset.hover;
                    image.onload = function() {
                        var update = $('.show-gallery-item-on-hover');
                        update.each(function(i, up) {
                            update = $(up);
                            update.css({
                                opacity: 0
                            });
                            update.html("");
                            update.html(image);
                            setTimeout(() => {
                                // Adjust preview dimensions (responsive)
                                var nH = update.children().prop('naturalHeight');
                                var nW = update.children().prop('naturalWidth');
                                if (update.children().prop('naturalWidth') > 2 * $(el).width() && nW >= nH) {
                                    update.children().width(2 * $(el).width());
                                    update.children().height(nH * ((2 * $(el).width()) / nW));
                                } else if (update.children().prop('naturalHeight') > 2 * $(el).width()) {
                                    update.children().height(2 * $(el).width());
                                    update.children().width(nW * ((2 * $(el).height()) / nH));
                                }

                                // Calculate new position
                                pos = $(el).parent().offset();
                                pos.right = Math.round(pos.left + $(el).width());
                                pos.bottom = Math.round($(el).height() + pos.top);
                                pos.width = update.children().width() !== 0 ? update.children().width() : nW;
                                pos.height = update.children().height() !== 0 ? update.children().height() : nH;
                                pos.midY = (pos.top + pos.bottom) / 2;
                                pos.midX = (pos.left + pos.right) / 2;
                                pos.newY = Math.round(pos.midY - (pos.height / 2) - $('.navbar').offset().top) <= 72.5 ?
                                    pos.top : pos.midY - pos.height / 2 >= 0 ?
                                    pos.midY - pos.height / 2 : 0;
                                pos.newX = Math.round(pos.right - $(window).width()) >= -20 ?
                                    pos.right - pos.width : pos.midX - pos.width / 2 >= 0 ?
                                    pos.midX - pos.width / 2 : 0;

                                // Update elements

                                update.parent()[0].dataset.content = $(el).children()[0].dataset.popup;
                                update.parent()[0].dataset.flairs = $(el).children()[0].dataset.flairs;
                                if ($(el).children()[0].dataset.type === "XHTML") {
                                    update.parent()[0].dataset.type = $(el).children()[0].dataset.type;
                                } else {
                                    update.parent()[0].dataset.type = "image";
                                }
                                update.css({
                                    top: pos.newY,
                                    left: pos.newX,
                                    zIndex: 10,
                                    boxShadow: "0px 0px 10px rgba(32, 32, 32, 0.6)",
                                    opacity: 0
                                });
                                update.animate({
                                    opacity: 1
                                }, 600);
                                setTimeout(() => {
                                    $('.show-gallery-item-on-hover').mouseleave();
                                }, 30000);
                            }, 50);
                        });
                    }
                }

            });
            $('.show-gallery-item-on-hover').mouseleave(function(event) {
                this.innerHTML = "";
            });
        });

        // DOM Manipulation based on hover
        $('.img-bar').each(function(i, el) {
            $(el).hover(function() {
                data = el.dataset;
                $('.img-bar').removeClass('active');
                $(el).addClass('active');
                $('#program').html(el.alt);
                $('#years').html(data.years + "+ years");
                $('#projects').html("Notable projects: " + data.prj);
                $('.experience-bar-after').width(el.dataset.exp + "%");
            });
        });
        $('#img-active').mouseover();
        // Pop-ups
        $(function() {
            $('.pop-up-call').each(function(i, el) {
                $(el).click(function() {
                    $('#pop-up').removeClass('remove');
                    $('#pop-up-window').addClass('pop-up-window-animate');
                    if (el.dataset.type === "XHTML") {
                        $('#close-image').removeClass('close-image');
                        $('#pop-up-content').html('<div style="display: flex; flex: 100%; width: 100%; height: 100%; align-items: center; justify-content: center;"><img src="https://i.stack.imgur.com/oQ0tF.gif" width="40px" alt="load"></div>');
                        $.ajax({
                            type: 'GET',
                            url: el.dataset.content,
                            timeout: 5000,
                            success: function(data) {
                                $('#pop-up-content').html(data);
                            },
                            error: function(a, b) {
                                setTimeout(() => {
                                    $('#pop-up-close').click();
                                }, 1000)
                            }
                        });
                        $(window).resize(function(event) {
                            event.preventDefault();
                            $('#pop-up-window').width("90%");
                        });
                        $(window).resize();
                    } else if (el.dataset.type === "image") {
                        var img = new Image();
                        img.src = el.dataset.content;
                        $('#pop-up-window').addClass('image-display').css("background-image", "url(./" + el.dataset.content + ")");
                        // Loop through flairs and append them
                        if (el.dataset.flairs !== "") {
                            var flairs = el.dataset.flairs.split(" ");
                            flairs.forEach(function(el, i) {
                                if (i % 2 == 0) {
                                    $('.' + el).removeClass('remove');
                                } else {
                                    $('.group').removeClass('remove');
                                    $('.' + flairs[i - 1]).children()[0].href = el;
                                }
                            });
                        }
                        // Adjusts placement of "X" button and other flairs
                        img.onload = function() {
                            $(window).resize(function(event) {
                                var newWidth = img.width;
                                var newHeight = img.height;
                                if (img.height > 0.9 * $(window).height() && $(window).width() > 568) {
                                    newWidth = img.width * (0.9 * $(window).height() / img.height);
                                    $('#pop-up-window').width(newWidth);
                                    if ($(window).width() < newWidth) {
                                        $('#pop-up-window').width("90%");
                                    }
                                } else {
                                    $('#pop-up-window').width("90%");
                                }
                                if (newWidth > 0.9 * $(window).width()) {
                                    $('.flair').addClass('flair-bottom');
                                } else {
                                    $('.flair').removeClass('flair-bottom');
                                }
                            });
                            $(window).resize();
                        }
                    }
                });
            });
            $('#pop-up-close').click(function() {
                // Remove the intro animation
                $('#pop-up-window').removeClass('pop-up-window-animate');
                // Animate the window close (delay for CSS render)
                setTimeout(() => {
                    $('#pop-up-window').addClass('pop-up-window-close-animate');
                }, 200);
                setTimeout(() => {
                    // Hide pop-up from workflow
                    $('#pop-up').addClass('remove');
                    // Remove content for XHTML pop-up calls
                    $('#pop-up-content').html("");
                    // Remove classes from window body
                    $('#pop-up-window').removeClass('pop-up-window-close-animate').removeClass('image-display').width("90vh").css("background-image", "");
                    // Hide flairs
                    $('.flair').addClass('remove');
                    $('#close-image').addClass('close-image');
                }, 1200);
            });
        });
    });
});

function isElementInViewport(el) {

    // Special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }

    let rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
    );
}

function showElements(check, el) {
    if (isElementInViewport(document.querySelector(check))) {
        let elements = document.getElementsByClassName(el);
        for (let i = 0; i < elements.length; i++) {
            if (elements[i].classList.contains('visible-mobile')) {
                elements[i].classList.toggle('visible-mobile');
                let string = el + '-animate';
                elements[i].classList.toggle(string);
            } else {
                break;
            }
        }
    }
}

function changeText(el, wd, lg, sm) {
    let docref = $(el)[0];
    if (window.innerWidth <= wd) {
        docref.innerHTML = sm;
    } else {
        docref.innerHTML = lg;
    }
}

function headerControl(n, m) {
    if (n === "onclick") {
        $('.navbar-bg').toggleClass('hidden');
        if (m === "index") {
            $('#ch-pic').removeClass('ch-pic-transit');
            $('#btn-learn-more-content').toggleClass('btn');
        }
        if (window.innerWidth < 991) {
            $('.header-flex').toggleClass('visible-desktop');
        } else {
            $('.header-flex').removeClass('hidden');
        }
    } else if (n === "onload") {
        if (m === "index") {
            let header = $('.workflow-header')[0];
            let img = $('#img-bg')[0];
            let header_height = img.clientHeight;
            header.style.height = parseInt(header_height) + "px";
        }
    } else if (n === "onscroll") {
        // Controls responsive behavior to scrolling
        $('.navbar-bg').addClass('hidden');
        $('#navbarSupportedContent').removeClass('show');
        $('.header-flex').removeClass('visible-desktop');
        // Controls special behavior on index page
        if (m === "index") {
            $('#ch-pic').addClass('ch-pic-transit');
            $('#btn-learn-more-content').addClass('btn');
        }
        // Controls color and logo of banner
        let rect = $('.bg')[0].getBoundingClientRect();
        if (rect.bottom <= 100) {
            $('.navbar').addClass('bg-light-onscroll');
            if (m === "index") {
                $('#logo').addClass('logo-small');
            } else {
                URI = "images/title-" + $('#logo')[0].dataset.alt + ".png";
                $('#logo')[0].src = URI;
                $('#logo').css("max-height", "50px");
            }
        } else {
            $('#logo')[0].src = "images/logo-sm-wh.png";
            $('#logo').css("max-height", "45px");
            $('.navbar').removeClass('bg-light-onscroll');
            $('#logo').removeClass('logo-small');
        }
    }
}