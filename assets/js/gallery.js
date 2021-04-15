const container = document.querySelector("#gallery .images");
const images = document.getElementsByClassName("image");
if (images.length > 0) {
    for (var i = 0; i < images.length; i++) {
        images[i].addEventListener("mouseenter", function (event) {
            var translate = 20;
            if (!this.previousElementSibling || !this.nextElementSibling) {
                translate = 40;
            }

            var prev = this, next = this;
            while (prev = prev.previousElementSibling) {
                prev.style.transform = "translateX(-" + translate + "%)";
                prev.classList.add("overlay");
            }
            while (next = next.nextElementSibling) {
                next.style.transform = "translateX(" + translate + "%)";
                next.classList.add("overlay");
            }
        }, false);
        images[i].addEventListener("mouseleave", function (event) {
            for (var j = 0; j < images.length; j++) {
                if (images[j] != this) {
                    images[j].style.transform = "";
                    images[j].classList.remove("overlay");
                }
            }
        }, false);
    }

    var timer = null;
    function handleMouseMove(event) {
        var x = event.clientX, y = event.clientY;

        const outerRect = container.getBoundingClientRect();
        x -= outerRect.x;
        y -= outerRect.y;

        var edgeOffset = outerRect.width * 0.4;
        var mustScrollRight = outerRect.width - x < edgeOffset;
        var mustScrollLeft = x < edgeOffset;

        if (!(mustScrollLeft || mustScrollRight)) {
            clearTimeout(timer);
            return;
        }

        (function checkScroll() {
            clearTimeout(timer);
            if (scroll())
                timer = setTimeout(checkScroll, 3);
        })();

        function scroll() {
            var currentScroll = container.scrollLeft;
            var scrollPercent = Math.round(100 * currentScroll / (container.scrollWidth - container.offsetWidth));
            var canScrollLeft = scrollPercent > 0;
            var canScrollRight = scrollPercent < 100;

            var nextScroll = currentScroll;
            var step = 800;
            if (mustScrollLeft && canScrollLeft) {
                nextScroll -= step / (25 + x);
            } else if (mustScrollRight && canScrollRight) {
                nextScroll += step / (outerRect.width - x + 25);
            }

            if (nextScroll != currentScroll) {
                container.scrollLeft = nextScroll;
                return true;
            }
            return false;
        }
    }

    const mediaQuery = window.matchMedia("(min-width: 768px)");
    function handleTabletChange(event) {
        if (event.matches) {
            container.addEventListener("mousemove", handleMouseMove);
        } else {
            container.removeEventListener("mousemove", handleMouseMove);
        }
    }

    mediaQuery.addListener(handleTabletChange);
    handleTabletChange(mediaQuery);
}
