# Omar Ibrahim Portfolio
This website is designed to serve as an expanded portfolio, including highlights, projects made, and courses taken. It is designed in HTML, CSS, Javascript, and JSON, while it also uses Bootstrap 4, GreenSock Animation Platform, Particles JS, jQuery, and Ajax. The website is live on <https:www.omaribrahim.live> hosted on GitHub Pages and linked to a domain provided by *Name.com*.

# Landing Page
The landing page [index.html](https://www.omaribrahim.live) is organized using the Bootstrap Grid system and also uses other Bootstrap components including navigation bar (used in other pages) and [contact form](https://www.omaribrahim.live/index.html#footer). In this page, the Bootstrap carousel is modified to add an overlay effect instead of the classic title style provided natively by Bootstrap. Icons on the page are divided between Bootstrap Web Font icons and Font Awesome [not the best decision, but the shift was made late in the project so I replaced Bootstrap Web Font icons with their SVG components instead of loading the entire font file]. The page introduces custom Javascript component that is used as a counter in the page (see counter.js below).

# Creative Writing Page
The [creative writing page](https://www.omaribrahim.live/writing.html) is a blog-like website with an app style. This page was the last to be designed and involved a lot of work in the making. The page natively houses creative writing categories, and when a category is clicked, an Ajax call is fired to load the respective *.json* file from the `/data` directory. Each *.json* file is dynamically created from a SQL *.db* in Python. The conversion was done to keep the website static and to minimize processing power, instead of dealing with SQL on the client-side, which can be very exhaustive. Whenever a category or an article is clicked, the URL, website title, and URL are changed to reflect the current page and register it in the user's history (see `/js/writing-blog-app.js` for the code). If the URL, which happens to be formatted in a similar style to the GET request format, is used to reach the page, a code is used to parse the URL and direct the user to the requested page. Ultimately, the objective here is to achieve similar effects to these seen from dynamically-generated server-based websites without a server, even if it comes with numerous caveats.

# Graphic Design Page
The [graphic design page](https://www.omaribrahim.live/art.html) is a gallery page with multiple section, preceded with a header. Aside from native HTML and bootstrap, a dynamic *software* section is generated using Javascript. This page introduces two custom Javascript elements, which are the jQuery Gallery (see jQuery-Gallery below) and the Ajax Pop-up (see Pop-Up below). The jQuery gallery uses three images, a small and cropped `.webp` image with dimension of *450px ✕ 450px*, a full version of the cropped picture with the smallest dimension set to *450px* while the other is calculated to keep the aspects ratio, and a full-quality image. The choice of using three pictures instead of one comes to the fact that this website is a client-based static website, and generating various variations of the picture on the client side means the client have to load over 60MB of data and wait for a lengthy process of image processing to occur. Using two small pictures, however, lightens the data load by *lazyloadin* the hover pictures. Since this process takes time, a python code [(see here)](https://github.com/omargfh/jQ-gallery-generator) was used to automate the process.

# Programming Page
The [programming page](https://www.omaribrahim.live/code.html) is a developer portfolio page, which includes a brief, a courses section, and a projects section. The courses sections consists of cards displayed in Masonry Layout, a layout in which each row does not have a specific height across adjacent elements. This is achieved using three `flexbox` elements each set to `flex-direction: column;` and housed in a Bootstrap Column `<div class="col-md-4">`. The courses section is collapsed by default, and since its height is dynamically created, the transition is creating by add a hypothetical `max-height` value and following it with a `transition: max-height 1s ease-in-out` on the man `div` in the CSS code. The second part of the page is a carousel, and since I wanted to add extra functionality to the native Bootstrap carousel, I recreated it in jQuery with control on external elements (the side captions), modified image `div` container which supports both overlay and scale transitions, and support for videos. 

# Counter.js
```$(".count").each(function(i, el) {
            _el = $(el);
            if (isElementInViewport(el) && !_el.hasClass("counted")) {
                _el.addClass("counted");
                str = el.innerHTML;
                step = _el.data("step");
                num = Number(str);
                time = 1 * 1000 / num * step;
                time = _el.data("time") ? _el.data("time") * time : 2 * time;
                html = "";
                for (let i = 0, c = 0; Number((i).toFixed(1)) <= num; i += step, c++) {
                    if (_el.hasClass("count-float")) {
                        val = str.split(".");
                        n = val[0].length + val[1].length;
                        html = "";
                        if (i.toPrecision(n).length === n + 1) {
                            html = i.toPrecision(n);
                        } else {
                            html = i.toPrecision(n - 1);
                        }
                    } else {
                        html = i;
                    };
                    count(el, html, c, time);
                }
            }
        });
```

# License
[GNU AGPLv3](https://choosealicense.com/licenses/agpl-3.0/)