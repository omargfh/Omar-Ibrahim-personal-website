(function (window)
{

window.onload = function() {
    headerControl("onload");
    document.querySelector('.navbar-toggler').onclick = function() {
        headerControl("onclick");
    };
    document.querySelector('#btn-learn-more').onclick = function() {

    }
    showElements('#section-2', 'card');
    showElements('#section-3-nav', 'timeline');
    showElements('#section-1-nav', 'section-1');
    changeText("#right-down", 767, "To the right, you can see a picture of me during the last STEM Model UN!", "If you look down, you can see a picture of me during the last STEM Model UN!");
};

window.onresize = function() {
    headerControl("onload");
    changeText("#right-down", 767, "To the right, you can see a picture of me during the last STEM Model UN!", "If you look down, you can see a picture of me during the last STEM Model UN!");
}

window.onscroll = function(){
    showElements('#section-2', 'card');
    showElements('#section-3-nav', 'timeline');
    showElements('#section-1-nav', 'section-1');
    headerControl("onscroll");
};

})(window);

function isElementInViewport (el) {

    // Special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }

    var rect = el.getBoundingClientRect();
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
    let docref = document.querySelector(el);
    if (window.innerWidth <= wd) {
        docref.innerHTML = sm;
    }
    else {
        docref.innerHTML = lg;
    }
}

function headerControl(n) {
    if (n === "onclick") {
        document.querySelector('.navbar-bg').classList.toggle('hidden');
        document.querySelector('#ch-pic').classList.remove('ch-pic-transit');
        document.querySelector('#btn-learn-more-content').classList.toggle('btn');
        if (window.innerWidth < 991) {
            document.querySelector('.header-flex').classList.toggle('visible-desktop');
        }
        else {
            document.querySelector('.header-flex').classList.remove('hidden');
        }
    }
    else if (n === "onload") {
        let header = document.querySelector('.workflow-header');
        let img = document.querySelector('#img-bg'); 
        let header_height = img.clientHeight;
        header.style.height = parseInt(header_height) + "px";
    }
    else if (n === "onscroll") {
        document.querySelector('.navbar-bg').classList.add('hidden');
        document.querySelector('#navbarSupportedContent').classList.remove('show');
        document.querySelector('.header-flex').classList.remove('visible-desktop');
        document.querySelector('#ch-pic').classList.add('ch-pic-transit');
        document.querySelector('#btn-learn-more-content').classList.add('btn');
        let rect = document.querySelector('#img-bg').getBoundingClientRect();
        if (rect.bottom <= 0)
        {
            document.querySelector('.navbar').classList.add('bg-light-onscroll');
        }
        else
        {
            document.querySelector('.navbar').classList.remove('bg-light-onscroll');
        }
    }
}