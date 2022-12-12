!(function (e, t) {
    "use strict";
    function a() {
        var e = [
            "iPad Simulator",
            "iPhone Simulator",
            "iPod Simulator",
            "iPad",
            "iPhone",
            "iPod",
        ];
        if (navigator.platform)
            for (; e.length; ) if (navigator.platform === e.pop()) return !0;
        return !1;
    }
    function o() {
        var e = t.querySelector("#page-header");
        a() &&
            d &&
            ($("html").addClass("ios-touch"),
            $("input")
                .on("focus", function () {
                    e.classList.add("page-header--abs");
                })
                .on("blur", function () {
                    e.classList.remove("page-header--abs");
                }),
            $("textarea")
                .on("focus", function () {
                    e.classList.add("page-header--abs");
                })
                .on("blur", function () {
                    e.classList.remove("page-header--abs");
                }));
    }
    function i() {
        var a = t.getElementById("page-header");
        e.innerWidth >= 1024 &&
            (e.pageYOffset >= a.offsetHeight
                ? a.classList.add("page-header--fix")
                : e.pageYOffset < a.offsetHeight &&
                  a.classList.remove("page-header--fix")),
            e.innerWidth < 1024 && a.classList.remove("page-header--fix");
    }
    function n() {
        const e = $("#hero-slider"),
            t = ($("#hero-count"), $("#hero-prev")),
            a = $("#hero-next");
        t.click(function (t) {
            e.trigger("prev.owl.carousel");
        }),
            a.click(function (t) {
                e.trigger("next.owl.carousel");
            }),
            d
                ? e.owlCarousel({
                      items: 1,
                      dots: !1,
                      nav: !1,
                      autoplay: !1,
                      autoWidth: !1,
                      mouseDrag: !1,
                      touchDrag: !0,
                      loop: !0,
                      margin: 5,
                  })
                : e.owlCarousel({
                      items: 1,
                      dots: !1,
                      nav: !1,
                      autoplay: !1,
                      autoWidth: !1,
                      loop: !0,
                      margin: 5,
                  });
    }
    function s() {
        const e = t.getElementById("page-header"),
            a = window.innerWidth - $(document).width(),
            o = "calc(100vw - " + a + "px)";
        e.style.width = o;
    }
    const l = $("html"),
        r = $("body");
    if (window.jQuery) {
        $.Velocity;
    } else {
        Velocity;
    }
    var d = "ontouchstart" in window || navigator.msMaxTouchPoints > 0;
    const c = machina.Fsm.extend({
        initialize: function (e, t, a) {
            (this.$el = e.el),
                (this.$logoPanel = e.logoPanel),
                (this.controlResolution = 1023),
                (this.$navbar = e.navbar);
            var o = this;
            this.$el.click(function () {
                o.clickHandler();
            }),
                this.addEvents();
        },
        namespace: "burger",
        initialState: "uninitialized",
        states: {
            uninitialized: {
                _onEnter: function () {
                    e.innerWidth > this.controlResolution
                        ? this.handle("toDesktop")
                        : e.innerWidth <= this.controlResolution &&
                          this.handle("toMobileClose");
                },
                toMobileClose: function () {
                    this.transition("mobileClose");
                },
                toDesktop: function () {
                    this.transition("desktop");
                },
            },
            desktop: {
                _onEnter: function () {
                    this.$el.removeClass("is-active"),
                        this.$logoPanel.removeClass("logo-panel--active"),
                        this.navbar.css({ display: "block" }),
                        this.$navbar.removeClass("header-navbar--active");
                },
            },
            mobileClose: {
                _onEnter: function () {
                    this.close();
                },
            },
            mobileOpen: { _onEnter: function () {} },
        },
        openAnimate: function () {
            var e = this;
            this.$el.addClass("is-active"),
                "mobileClose" === this.state && l.addClass("uk-modal-page"),
                this.$logoPanel.addClass("logo-panel--active"),
                this.$navbar.stop().fadeIn(400, function () {
                    e.$navbar.addClass("header-navbar--active");
                });
        },
        close: function () {
            this.$el.removeClass("is-active"),
                "mobileOpen" === this.state && l.removeClass("uk-modal-page"),
                this.$logoPanel.removeClass("logo-panel--active"),
                this.navbar.css({ display: "none" }),
                this.$navbar.removeClass("header-navbar--active");
        },
        closeAnimate: function () {
            var e = this;
            this.$el.removeClass("is-active"),
                "mobileOpen" === this.state && l.removeClass("uk-modal-page"),
                this.$logoPanel.removeClass("logo-panel--active"),
                this.$navbar.stop().fadeOut(400, function () {
                    e.$navbar.removeClass("mobile-form--active");
                });
        },
        clickHandler: function () {
            switch (this.state) {
                case "mobileClose":
                    this.openAnimate(), this.transition("mobileOpen");
                    break;
                case "mobileOpen":
                    this.closeAnimate(), this.transition("mobileClose");
            }
        },
        resizeHandler: function () {
            switch (this.state) {
                case "desktop":
                    e.innerWidth <= this.controlResolution &&
                        this.transition("mobileClose");
                    break;
                case "mobileClose":
                    e.innerWidth > this.controlResolution &&
                        this.transition("desktop");
                    break;
                case "mobileOpen":
                    e.innerWidth > this.controlResolution &&
                        (l.removeClass("uk-modal-page"),
                        this.transition("desktop"));
            }
        },
        addEvents: function () {
            var t = this;
            e.addEventListener("resize", function (e) {
                t.resizeHandler();
            });
        },
    });
    t.getElementById("logo-panel").addEventListener("touchmove", function (t) {
        e.innerWidth <= 1023 && t.preventDefault();
    }),
        jQuery.validator.addMethod(
            "phoneLength",
            function (e, t) {
                return 11 === e.replace(/[^0-9]/g, "").length;
            },
            "Поле обязательно к заполнению*"
        ),
        t.addEventListener("DOMContentLoaded", function () {
            svg4everybody({}),
                n(),
                s(),
                $(".js-phone-mask").mask("+7 (999) 999-99-99", {
                    autoclear: !1,
                }),
                o(),
                i(),
                new c({
                    el: $("#hamburger"),
                    logoPanel: $("#logo-panel"),
                    navbar: $("#header-navbar"),
                }),
                $("#bottom-form").validate({
                    rules: {
                        name: { required: !0, minlength: 2 },
                        phone: { required: !0, phoneLength: !0 },
                    },
                    messages: {
                        name: {
                            required: "Поле обязательно к заполнению*",
                            minlength: "Введите не менее 2-х символов",
                        },
                        phone: {
                            required: "Поле обязательно к заполнению*",
                            minlength: "Введите не менее 2-х символов",
                        },
                    },
                }),
                $("#callback-form").validate({
                    rules: {
                        name: { minlength: 2 },
                        phone: { required: !0, phoneLength: !0 },
                    },
                    messages: {
                        name: {
                            required: "Поле обязательно к заполнению*",
                            minlength: "Введите не менее 2-х символов",
                        },
                        phone: {
                            required: "Поле обязательно к заполнению*",
                            minlength: "Введите не менее 2-х символов",
                        },
                    },
                }),
                $('a.js-scrollScreen[href*="#"]:not([href="#"])').click(
                    function () {
                        if (
                            location.pathname.replace(/^\//, "") ==
                                this.pathname.replace(/^\//, "") &&
                            location.hostname == this.hostname
                        ) {
                            var e = $(this.hash);
                            if (
                                ((e = e.length
                                    ? e
                                    : $("[id=" + this.hash.slice(1) + "]")),
                                e.length)
                            )
                                return (
                                    $("html, body").animate(
                                        { scrollTop: e.offset().top - 60 },
                                        1e3
                                    ),
                                    !1
                                );
                        }
                    }
                );
            var l = $("#callback-form").validate(),
                h = $("#bottom-form").validate(),
                m = UIkit.modal("#modal-callback"),
                u = $(".modal-callback__title"),
                f = $(".modal-callback__submit-btn"),
                p = $(".modal-callback__notify-btnText"),
                v = u.text(),
                b = f.text();
            $(document).on("click", "[data-uk-modal]", function () {
                $(this).attr("data-modal-form-desc") &&
                    $("#callback-form")
                        .find(".hidden-form_desc")
                        .val($(this).data("modal-form-desc")),
                    $(this).attr("data-modal-title") &&
                        u.html($(this).data("modal-title")),
                    $(this).attr("data-modal-btn-text") &&
                        (f.html($(this).data("modal-btn-text")),
                        p.html($(this).data("modal-btn-text"))),
                    $(this).attr("data-modal-title") || u.html(v),
                    $(this).attr("data-modal-btn-text") ||
                        (f.html(b), p.html(b));
            }),
                m.on({
                    "show.uk.modal": function () {
                        a() &&
                            d &&
                            (r.hasClass("body--fix") ||
                                r.addClass("body--fix")),
                            e.innerWidth <= 767 &&
                                t
                                    .querySelector("#page-header")
                                    .classList.add("page-header--abs");
                    },
                    "hide.uk.modal": function () {
                        $("#callback-form").find(".hidden-form_desc").val(""),
                            r.hasClass("body--fix") &&
                                r.removeClass("body--fix"),
                            e.innerWidth <= 767 &&
                                t
                                    .querySelector("#page-header")
                                    .classList.remove("page-header--abs"),
                            r.hasClass("modal-form-success") &&
                                ($("#modal-callback .form-in").css({
                                    display: "block",
                                }),
                                $("#modal-callback .fin-mess").css({
                                    display: "none",
                                }),
                                $(
                                    "#modal-callback .modal-callback__input-block input"
                                ).val(""));
                    },
                }),
                $("form").on("submit", function (e) {
                    e.preventDefault();
                    var t = $(this);
                    if (l.errorList.length > 0 || h.errorList.length > 0)
                        return !1;
                    var a = $(this).serialize(),
                        o = $(this).find(".mess"),
                        i = $(this).find(".fin-mess"),
                        n = $(this).find(".form-in");
                    o.append(
                        '<img src="/mailSend/preloader.svg" class="preloader" />'
                    ),
                        $.ajax({
                            type: $(this).attr("method"),
                            url: $(this).attr("action"),
                            data: a,
                            success: function (e) {
                                var a = $.parseJSON(e);
                                t.hasClass("modal-callback__form") &&
                                    r.addClass("modal-form-success"),
                                    "true" == a.success
                                        ? setTimeout(function () {
                                              o.stop().hide(200, function () {
                                                  n.stop().slideUp(300),
                                                      i
                                                          .stop()
                                                          .slideDown(
                                                              300,
                                                              function () {
                                                                  i.addClass(
                                                                      "visible"
                                                                  );
                                                              }
                                                          );
                                              }),
                                                  dataLayer &&
                                                      dataLayer.push({
                                                          event: "send-form",
                                                          eventCategory: t
                                                              .find(
                                                                  '[name="form_desc"]'
                                                              )
                                                              .val(),
                                                      });
                                          }, 700)
                                        : o.html(a.mess);
                            },
                            error: function (e, t) {
                                alert("Возникла ошибка: " + e.responseCode);
                            },
                        });
                });
        }),
        e.addEventListener("scroll", function () {
            i();
        }),
        e.addEventListener("resize", function () {
            s();
        });
})(window, document);
