(function (window)
{

showElements('#section-2', 'card');
showElements('#section-3-nav', 'timeline');
showElements('#section-1-nav', 'section-1');
changeRightDown();

window.onresize = function() {
    changeRightDown();
}

window.onload = function() {
    document.querySelector('.navbar-toggler').onclick = function() {
        document.querySelector('.navbar-bg').classList.toggle('hidden');
        if (window.innerWidth < 656) {
            document.querySelector('.header-flex').classList.toggle('hidden');
        }
        else {
            document.querySelector('.header-flex').classList.remove('hidden');
        }
    };
    window.onscroll = function(){
        showElements('#section-2', 'card');
        showElements('#section-3-nav', 'timeline');
        showElements('#section-1-nav', 'section-1');
    };
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
            if (elements[i].classList.contains('hidden')){
            elements[i].classList.toggle('hidden');
            let string = el + '-animate';
            elements[i].classList.toggle(string);
            }
            else {
                break;
            }
        }
    }
}

function changeRightDown() {
    if (window.innerWidth <= 767) {
        document.querySelector('#right-down').innerHTML = "If you look down, you can see a picture of me during the last STEM Model UN!";
    }
    else {
        document.querySelector('#right-down').innerHTML = "To the right, you can see a picture of me during the last STEM Model UN!";
    }
}