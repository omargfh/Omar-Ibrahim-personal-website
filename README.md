# Omar Ibrahim Portfolio
This website is designed to serve as an expanded portfolio, including highlights, projects made, and courses taken. It is designed in HTML, CSS, Javascript, and JSON, while it also uses Bootstrap 4, GreenSock Animation Platform, Particles JS, jQuery, and Ajax. The website is live on <https:www.omaribrahim.live> hosted on GitHub Pages and linked to a domain provided by *Name.com*.

# Landing Page
The landing page (index.html)[https://www.omaribrahim.live] is organized using the Bootstrap Grid system and also uses other Bootstrap components including navigation bar (used in other pages) and (contact form)[https://www.omaribrahim.live/index.html#footer]. In this page, the Bootstrap carousel is modified to add an overlay effect instead of the classic title style provided natively by Bootstrap. Icons on the page are divided between Bootstrap Web Font icons and Font Awesome (not the best decision, but the shift was made late in the project so I replaced Bootstrap Web Font icons with their SVG components instead of loading the entire font file). The page introduces custom Javascript component that is used as a counter in the page (see counter.js below).

# Creative Writing Page
The (creative writing page)[https://www.omaribrahim.live/writing.html] is a blog-like website with an app style. This page was the last to be designed and involved a lot of work in the making. The page natively houses creative writing categories, and when a category is clicked, an Ajax call is fired to load the respective *.json* file from the `/data` directory. Each *.json* file is dynamically created from a SQL *.db* in Python. The conversion was done to keep the website static and to minimize processing power, instead of dealing with SQL on the client-side, which can be very exhaustive. Whenever a category or an article is clicked, the URL, website title, and URL are changed to reflect the current page and register it in the user's history (see */js/writing-blog-app.js* for the code). If the URL, which happens to be formatted in a similar style to the GET request format, is used to reach the page, a code is used to parse the URL and direct the user to the requested page. Ultimately, the objective here is to achieve similar effects to these seen from dynamically-generated server-based websites without a server, even if it comes with numerous caveats.

# Graphic Design Page
The (graphic design page)[https://www.omaribrahim.live/art.html]

# License
(GNU AGPLv3)[https://choosealicense.com/licenses/agpl-3.0/]