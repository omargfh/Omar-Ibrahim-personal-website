$(document).ready(function () {

    $('.carousel').carousel({
        interval: 5000
    });

    $('.carousel-fast').carousel({
        interval: 1000
    });

    $(window).on('load', function() {
        headerControl("onload");
        showElements('#section-2', 'card');
        showElements('#section-3-nav', 'timeline');
        showElements('#section-1-nav', 'section-1');
        changeText("#right-down", 767, "To the right, you can see a picture of me during the last STEM Model UN!", "If you look down, you can see a picture of me during the last STEM Model UN!");
        
        $('.navbar-toggler').click(function() {
            headerControl("onclick");
        });
        $('.pop-up-call').each(function(i, el){
            $(el).click(function(){
                $.ajax({
                    type: 'GET',
                    url: el.dataset.content,
                    timeout: 5000,
                    success: function(data) {
                        $('#pop-up-content').html(data);
                    },
                    complete: function() {
                        $('#pop-up-window').addClass('pop-up-window-animate');
                        $('#pop-up').removeClass('hidden');
                    }
                });           
            });
        });
        $('#pop-up-close').click(function() {
            $('#pop-up-window').removeClass('pop-up-window-animate');
            setTimeout(()=> {
                $('#pop-up-window').addClass('pop-up-window-close-animate'); 
            }, 200);
            setTimeout(() =>{
                $('#pop-up-content').html("");
                $('#pop-up-window').removeClass('pop-up-window-close-animate');  
                $('#pop-up').addClass('hidden');
            }, 1200);
        });
    });

    $(window).on('resize', function() {
        headerControl("onload");
        changeText("#right-down", 767, "To the right, you can see a picture of me during the last STEM Model UN!", "If you look down, you can see a picture of me during the last STEM Model UN!");
    });

    $(window).on('scroll', function() {
        showElements('#section-2', 'card');
        showElements('#section-3-nav', 'timeline');
        showElements('#section-1-nav', 'section-1');
        headerControl("onscroll");
    });
});

function isElementInViewport (el) {

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
    if (isElementInViewport(document.querySelector(check))){
        let elements = document.getElementsByClassName(el);
        for (let i = 0; i < elements.length; i++)
        {
            if (elements[i].classList.contains('visible-mobile')){
                elements[i].classList.toggle('visible-mobile');
                let string = el + '-animate';
                elements[i].classList.toggle(string);
            }
            else {
                break;
            }
        }
    }
}

function changeText(el, wd, lg, sm) {
    let docref = $(el)[0];
    if (window.innerWidth <= wd) {
        docref.innerHTML = sm;
    }
    else {
        docref.innerHTML = lg;
    }
}

function headerControl(n) {
    if (n === "onclick") {
        $('.navbar-bg').toggleClass('hidden');
        $('#ch-pic').removeClass('ch-pic-transit');
        $('#btn-learn-more-content').toggleClass('btn');
        if (window.innerWidth < 991) {
            $('.header-flex').toggleClass('visible-desktop');
        }
        else {
            $('.header-flex').removeClass('hidden');
        }
    }
    else if (n === "onload") {
        let header = $('.workflow-header')[0];
        let img = $('#img-bg')[0]; 
        let header_height = img.clientHeight;
        header.style.height = parseInt(header_height) + "px";
    }
    else if (n === "onscroll") {
        $('.navbar-bg').addClass('hidden');
        $('#navbarSupportedContent').removeClass('show');
        $('.header-flex').removeClass('visible-desktop');
        $('#ch-pic').addClass('ch-pic-transit');
        $('#btn-learn-more-content').addClass('btn');
        let rect = $('#img-bg')[0].getBoundingClientRect();
        if (rect.bottom <= 100)
        {
            $('.navbar').addClass('bg-light-onscroll');
            $('#logo').addClass('logo-small');
        }
        else
        {
            $('.navbar').removeClass('bg-light-onscroll');
            $('#logo').removeClass('logo-small');
        }
    }
}