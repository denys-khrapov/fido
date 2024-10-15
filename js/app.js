(() => {
    "use strict";
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    document.addEventListener("DOMContentLoaded", (() => {
        initMobileMenu();
        initSwiper();
        readMore();
        if (document.querySelector(".loading-page")) initPreloader();
        function initMobileMenu() {
            const burgerMenu = document.querySelector(".menu-burger");
            const closeBurgerMenu = document.querySelector(".menu-close");
            const menu = document.querySelector(".header__menu");
            burgerMenu.addEventListener("click", (() => {
                menu.classList.toggle("active");
            }));
            closeBurgerMenu.addEventListener("click", (() => {
                menu.classList.remove("active");
            }));
        }
        function initSwiper() {
            new Swiper(".hero__swiper", {
                effect: "fade",
                pagination: {
                    el: ".hero__swiper .swiper-pagination-bullets",
                    dynamicBullets: true,
                    type: "bullets",
                    clickable: true
                },
                on: {
                    init: function(swiper) {
                        updatePaginationFraction(swiper);
                    },
                    slideChange: function(swiper) {
                        updatePaginationFraction(swiper);
                    }
                },
                breakpoints: {
                    768: {
                        direction: "vertical"
                    }
                }
            });
            function updatePaginationFraction(swiper) {
                let currentSlide = (swiper.activeIndex + 1).toString().padStart(2, "0");
                let totalSlides = swiper.slides.length.toString().padStart(2, "0");
                document.querySelector(".swiper-pagination-fraction").innerHTML = currentSlide + "<span>|</span>" + totalSlides;
            }
            new Swiper(".gallery__swiper", {
                effect: "fade",
                slidesPerView: 1,
                spaceBetween: 0,
                pagination: {
                    el: ".gallery__swiper .swiper-pagination",
                    dynamicBullets: true,
                    type: "bullets",
                    clickable: true
                }
            });
            new Swiper(".offer__swiper", {
                slidesPerView: "auto",
                spaceBetween: 4
            });
        }
        function readMore() {
            readMore(jQuery(".spoiler"), 4);
            function readMore(jObj, lineNum) {
                if (isNaN(lineNum)) lineNum = 4;
                new ReadMore(jObj, lineNum);
            }
            function ReadMore(_jObj, lineNum) {
                let READ_MORE_LABEL = "Read more ...";
                let HIDE_LABEL = "Less more";
                _jObj.each((function() {
                    let jObj = jQuery(this);
                    let lineHeight = parseInt(jObj.children(".hidden-text").css("line-height"), 10);
                    let textMinHeight = lineHeight * lineNum + "px";
                    let textMaxHeight = jObj.children(".hidden-text")[0].scrollHeight + "px";
                    if (parseInt(textMaxHeight, 10) > parseInt(textMinHeight, 10)) {
                        jObj.children(".hidden-text").css("height", "" + textMinHeight);
                        jObj.children(".hidden-text").css("transition", "height .5s");
                        jObj.append('<button class="read-more">' + READ_MORE_LABEL + "</button>");
                        jObj.children(".read-more").click((function() {
                            if (jObj.children(".hidden-text").css("height") === textMinHeight) {
                                jObj.children(".hidden-text").css("height", "" + textMaxHeight);
                                $(this).html(HIDE_LABEL).addClass("active");
                            } else {
                                jObj.children(".hidden-text").css("height", "" + textMinHeight);
                                $(this).html(READ_MORE_LABEL).removeClass("active");
                            }
                        }));
                    } else jObj.children(".hidden-text").css("height", "auto");
                }));
            }
        }
        if (document.querySelector("[data-fancybox]")) Fancybox.bind("[data-fancybox]", {});
        if (document.getElementById("myCarousel")) {
            new Carousel(document.getElementById("myCarousel"), {
                Dots: false,
                Thumbs: {
                    type: "classic"
                },
                on: {
                    ready: carousel => {
                        updateCaption(carousel);
                    },
                    change: carousel => {
                        updateCaption(carousel);
                    }
                }
            }, {
                Thumbs
            });
        }
        function updateCaption(carousel) {
            const slide = carousel.slides[carousel.page];
            const caption = slide.el.dataset.caption || "";
            const captionElement = document.getElementById("carousel-caption");
            if (captionElement) captionElement.innerHTML = `${caption}`;
        }
        function initPreloader() {
            const titlePreloader = document.querySelector(".loading-page__title");
            titlePreloader.innerHTML = titlePreloader.textContent.split("").map((letter => `<span class="letter">${letter}</span>`)).join("");
            let tl = gsap.timeline();
            tl.fromTo(".letter", {
                opacity: 0,
                y: 50
            }, {
                opacity: 1,
                y: 0,
                duration: .5,
                stagger: .2
            }).fromTo(".loading-page__subtitle", {
                opacity: 0,
                y: 50
            }, {
                opacity: 1,
                y: 0,
                duration: 1,
                delay: .5
            }).to(".loading-page", {
                opacity: 0,
                duration: 1.5,
                delay: 1.5
            });
        }
    }));
    !function($) {
        let activeLine = $('<div class="active-line"></div>');
        let tabsNav = $(".tabs-nav");
        let tabsNavHome = $(".offer .tabs-nav");
        let activeItem = $(".tabs-nav .nav-item.active");
        function updateActiveLine(item) {
            if (!item.length) return;
            let itemWidth = item.outerWidth();
            let itemPosition = item.position();
            if (itemPosition) {
                let itemLeft = itemPosition.left - tabsNav.scrollLeft();
                if ($(window).width() >= 1280) activeLine.css({
                    width: itemWidth + "px",
                    left: itemLeft + "px",
                    top: ""
                }); else activeLine.css({
                    width: "100%",
                    left: ""
                });
            }
        }
        tabsNavHome.append(activeLine);
        updateActiveLine(activeItem);
        $(".tabs-nav .nav-item").click((function() {
            let id = $(this).attr("data-tab");
            let content = $('.tabs-content .tab-item[data-tab="' + id + '"]');
            $(".tabs-nav .nav-item.active").removeClass("active");
            $(".tabs-content .tab-item.active").removeClass("active");
            $(this).addClass("active");
            content.addClass("active");
            updateActiveLine($(this));
        }));
        $(window).resize((function() {
            updateActiveLine($(".tabs-nav .nav-item.active"));
        }));
    }(jQuery);
    window["FLS"] = true;
})();