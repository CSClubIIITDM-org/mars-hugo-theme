const navbar = document.getElementsByClassName('navbar')[0];

if (typeof navbar !== undefined ) {
    var lastScrollPos = 0;
    window.onscroll = function() {
        var scrollPos = window.pageYOffset;

        if (scrollPos > window.innerHeight) {
            navbar.classList.add("bg-dark");
            navbar.classList.remove("bg-transparent");
        }
        else {
            navbar.classList.add("bg-transparent");
            navbar.classList.remove("bg-dark");
        }


        if(scrollPos < lastScrollPos) {
            navbar.classList.remove('hide');
            navbar.classList.add('show');
        }
        else {
            navbar.classList.remove('show');
            navbar.classList.add('hide');
        }
        lastScrollPos = scrollPos;
    };
}
