/* jshint browser: true */
(function () {
    /* Global var/consts */
    var
        sBrightcove = "/Themes/Corporate/ui/js/brightcove.js",
        // For debug remove .min extension.
        sEuroLandScript =
            "https://tools.euroland.com/tools/common/eurolandiframeautoheight/eurolandtoolsintegrationobject.min.js";

    /* Polyfills */
    String.prototype.replaceAll = function (search, replacement) {
        var target = this;
        return target.replace(new RegExp(search, 'g'), replacement);
    };
    String.prototype.startsWith = function (searchString, position) {
        position = position || 0;
        return this.indexOf(searchString, position) === position;
    };
    if (window.NodeList && !NodeList.prototype.forEach) {
        NodeList.prototype.forEach = function (callback, thisArg) {
            thisArg = thisArg || window;
            for (var i = 0; i < this.length; i++) {
                callback.call(thisArg, this[i], i, this);
            }
        };
    }

    /* Fix for soft hyphen */
    var pageLanguage = document.getElementsByTagName('html')[0].getAttribute('lang');
    if (pageLanguage != null) {
        var match = pageLanguage.match(
            /ja|ja-JP|ko|kok|kok-IN|ko-KP|ko-KR|km|km-KH|kn|kn-IN|zh|zh-CHS|zh-CHT|zh-CN|zh-Hans|zh-Hans-HK|zh-Hans-MO|zh-Hant|zh-HK|zh-MO|zh-SG|zh-TW|zgh|zgh-Tfng|zgh-Tfng-MA/g);
        if (!document.querySelector("#tinymce") && match == null) {
            var aSpans = document.querySelectorAll('.custom-shy'),
                nSpans = aSpans.length;
            for (i = 0; i < nSpans; i++) aSpans[i].outerHTML = '&shy;';
        }
    }
    /* End soft hyphen fix */

    /* Handle <body>-overflow for Mobile Navigation */
    var
        oMenuWrapper = document.querySelector(".menu__wrapper"),
        oToggle = document.querySelector("#tgl-mobile"),
        oToggleSearch = document.querySelector("#tgl-search");

    if (oMenuWrapper && oToggle && oToggleSearch) {
        document.addEventListener("touchmove",
            function (event) {
                if (oToggle.checked) event.preventDefault();
            });

        oMenuWrapper.addEventListener("touchmove",
            function (event) {
                event.stopPropagation();
            });

        oToggle.addEventListener("click",
            function () {
                document.body.style.overflow = this.checked ? "hidden" : "visible";
                if (this.checked && oToggleSearch.checked) oToggleSearch.checked = false;
            });

        oToggleSearch.addEventListener("click",
            function () {
                if (this.checked && oToggle.checked) {
                    oToggle.checked = false;
                    document.body.style.overflow = "visible";
                }
            });
    }

    /* [MIGRATED] */
    // var
    //     oService = document.querySelector(".nav-service"),
    //     oServiceMobile = document.querySelector(".nav-service--mobile");
    // if (oService && oServiceMobile) oServiceMobile.innerHTML = oService.innerHTML;


    /* [MIGRATED] Language selector toggle */

    var aLang = document.querySelectorAll('.language-selector__item--active'),
        nLang = aLang.length;

    // while (nLang--) aLang[nLang].addEventListener('click', toggleLang);

    function toggleLang() {
        var oElm = this.parentNode.querySelector('.language-selector__list-wrap');
        var oSize = oElm.querySelector('.language-selector__list').getBoundingClientRect().height;
        var oOverlay = this.parentNode.querySelector('.language-selector__overlay');

        if (oElm.classList.contains('js-active')) {
            oElm.classList.remove('js-active');
            oElm.style.height = 0;
            oOverlay.classList.remove('js-active');
        } else if (!oElm.classList.contains('js-active')) {
            oElm.classList.add('js-active');
            oElm.style.height = oSize + 'px';
            oOverlay.classList.add('js-active');
        }

        var header = document.querySelector('#wrapper-menu');
        var menu = header.querySelector(".menu__wrapper");

        var scroll_interval_var = setInterval(scroll_interval, 5);


        function scroll_interval() {
            if (menu.scrollTop + menu.clientHeight >= menu.scrollHeight) {
                clearInterval(scroll_interval_var);
            } else {
                menu.scrollTop += 1;
            }
        }

        oOverlay.addEventListener('click',
            function () {
                oElm.classList.remove('js-active');
                oElm.style.height = 0;
                this.classList.remove('js-active');
            });
    }


    /* Fix for download links */
    var
        aDownloadLinks = document.querySelectorAll(".download--link, .download--link > a"),
        nDownloadLinks = aDownloadLinks.length;

    while (nDownloadLinks--) {
        modifyDownloadLinks(aDownloadLinks[nDownloadLinks]);
    }

    function modifyDownloadLinks(link) {
        link.target = "_blank";
    }
    /* End fix */

    /* Page disclaimer */
    var pagePopup = document.querySelector(".js-block-page-disclaimer");
    if (pagePopup) {
        var delayInput = $(pagePopup).find(".js-page-disclaimer-delay");
        var delaySec = parseInt($(delayInput).val());
        var delayMillisec = delaySec * 1000;
        var isCookie = $(pagePopup).find(".js-cookie-duration-delay");
        var pageDisclaimerCookieName = $(pagePopup).attr('id').substr(1);
        var existingCookie = document.cookie.indexOf(pageDisclaimerCookieName + "=");

        if ($(isCookie).length == 0 && (existingCookie >= 0)) {
            removeCookie(pageDisclaimerCookieName);
            existingCookie = -1;
        }

        if (existingCookie < 0) {
            openPageDisclaimerModal(pagePopup, delayMillisec);
        }

        $(pagePopup).on('click',
            'a',
            function (target) {
                if ($(this).data('dismiss') == 'modal' && $(isCookie).length > 0) {
                    var duration = parseInt($(isCookie).val());
                    setCookie(pageDisclaimerCookieName, duration);
                }
            });
    }

    function openPageDisclaimerModal(popup, delay) {
        setTimeout(function () {
            $(popup).modal('show');
        },
            delayMillisec);
    }

    function setCookie(cookieName, duration) {
        var expires = "";
        var date = new Date();
        date.setDate(date.getDate() + duration);
        expires = "; expires=" + date.toUTCString();
        if (duration === 0) {
            expires = "; expires=0";
        }
        document.cookie = cookieName + "=1" + expires + "; path=/";
    }

    function removeCookie(cookieName) {
        var date = new Date();
        date.setDate(date.getDate() - 1);
        var expires = "; expires=" + date.toUTCString();
        document.cookie = cookieName + "=1" + expires + "; path=/";
    }
    /* End page disclaimer */

    /* Add Scroll-menu-style when scrolling, change position of totop when bottom is reached */
    var
        bIsStoryPage = document.querySelector("body").classList.contains("storypage"),
        oClose = document.querySelector("#tgl-overlay"),
        oFooter = document.querySelector(".footer"),
        oHeader = document.querySelector(".main__header"),
        oMain = document.querySelector("main"),
        oSecondary = document.querySelector(".secondary"),
        oToTop = document.querySelector(".totop__wrapper"),
        topMargin = 0;

    if (oSecondary != null) topMargin = window.getComputedStyle(oSecondary, null).getPropertyValue('margin-top');

    if (oHeader && oToTop && oFooter) {
        var
            nHeaderHeight = oHeader.getBoundingClientRect().height,
            nFooterHeight = oFooter.getBoundingClientRect().height;

        // Go to top when click on "ToTop"
        oToTop.addEventListener("click", function () { window.scrollTo(0, 0); });

        // Listen for scroll events, show shrinked menu, change position of ToTop
        window.addEventListener("scroll",
            throttle(function () {
                var
                    nPageHeight = pageHeight(),
                    nScrollPos = scrollPosition(),
                    nViewportHeight = viewportHeight();

                /* oToTop.style.position = (nScrollPos + nViewportHeight > (nPageHeight - nFooterHeight)) ? "static" : "fixed"; */
                oToTop.style.opacity = (nScrollPos > 400) ? "1" : "0";
                oToTop.style.visibility = (nScrollPos > 400) ? "visible" : "hidden";

                if (nScrollPos >= nHeaderHeight) {
                    oMain.style.paddingTop = nHeaderHeight + "px";
                    oClose.checked = true;
                    oHeader.classList.add("main__header--scroll");
                    if (oSecondary) {
                        if (!bIsStoryPage) oSecondary.style.marginTop = -nHeaderHeight + "px";
                        oSecondary.classList.add("secondary--scroll");
                    }
                } else {
                    oMain.style.paddingTop = "0px";
                    oHeader.classList.remove("main__header--scroll");
                    if (oSecondary) {
                        oSecondary.classList.remove("secondary--scroll");
                        if (!bIsStoryPage) oSecondary.style.marginTop = topMargin;
                    }
                }
            },
                250));
    }

    /* Handle Secondary Headings on mobile */
    var
        aSecondaryHeading = document.querySelector(".secondary__heading");
    if (aSecondaryHeading) {
        aSecondaryHeading.addEventListener("click",
            function () {
                nViewportWidth = getWidth();
                if (nViewportWidth >= 1024) window.location.href = this.getAttribute("data-href");
            });
    }


    /* Tables, add wrapper around to allow scrolling */
    var aTables = document.getElementsByTagName("table"), nTables = aTables.length, sTableTmp;
    while (nTables--) {
        sTableTmp = aTables[nTables].outerHTML;
        //console.log(sTableTmp);
        aTables[nTables].outerHTML = "<div class=\"takeda__table__wrapper\">" + sTableTmp + "</div>";
    }


    /* Handle Cookies / Banners */
    var
        aBanners = document.querySelectorAll("[data-cookie]"),
        n = aBanners.length;
    while (n--) {
        var
            cookieBanner = aBanners[n],
            cookieName = cookieBanner.getAttribute('data-cookie'),
            cookieValue = cookieBanner.getAttribute('data-cookie-value'),
            cookieBlockName = cookieBanner.getAttribute('data-cookie-element');

        if (cookieGet(cookieName) !== cookieValue) {
            var cookieBlock = cookieBlockName ? document.querySelector(cookieBlockName) : this;

            if (cookieBlock) {
                cookieBlock.parentNode.classList.remove('hide');
                cookieBanner.addEventListener("click", acceptCookie);
            }
        }
    }

    function acceptCookie() {
        var
            oDate,
            oCookie = this.getAttribute("data-cookie-element")
                ? document.querySelector(this.getAttribute("data-cookie-element"))
                : this,
            sCookieName = this.getAttribute("data-cookie"),
            sCookieVal = this.getAttribute("data-cookie-value"),
            sCookieExp = this.getAttribute("data-cookie-expire");

        oDate = new Date();

        if (sCookieExp) {
            oDate.setDate(oDate.getDate() + parseInt(sCookieExp));
        } else {
            oDate.setFullYear(oDate.getFullYear() + 1);
        }

        cookieSet(sCookieName, sCookieVal, oDate);
        oCookie.parentNode.classList.add("hide");
    }

    /* Forms */
    var
        aReset = document.querySelectorAll("[type=\"reset\"]"),
        aTextMax = document.querySelectorAll("textarea[maxlength]"),
        nResetLen = aReset.length,
        nTextMax = aTextMax.length;

    while (nTextMax--) {
        aTextMax[nTextMax].addEventListener("keydown", countChar);
    }

    while (nResetLen--) {
        aReset[nResetLen].addEventListener("click", resetForm);
    }

    function resetForm() {
        var
            aElements,
            nLen,
            oForm = this.form;

        if (oForm) {
            aElements = oForm.querySelectorAll(".ValidationFail");
            nLen = aElements.length;

            oForm.classList.remove("ValidationFail");
            oForm.classList.add("ValidationSuccess");

            if (nLen) {
                while (nLen--) aElements[nLen].classList.remove("ValidationFail");
            }
        }
    }

    /* Simple Login Form */

    function serialize(form) {
        var field, s = [];
        if (typeof form == 'object' && form.nodeName == "FORM") {
            var len = form.elements.length;
            for (i = 0; i < len; i++) {
                field = form.elements[i];
                if (field.name &&
                    !field.disabled &&
                    field.type != 'file' &&
                    field.type != 'reset' &&
                    field.type != 'submit' &&
                    field.type != 'button') {
                    if (field.type == 'select-multiple') {
                        for (j = form.elements[i].options.length - 1; j >= 0; j--) {
                            if (field.options[j].selected)
                                s[s.length] = encodeURIComponent(field.name) +
                                    "=" +
                                    encodeURIComponent(field.options[j].value);
                        }
                    } else if ((field.type != 'checkbox' && field.type != 'radio') || field.checked) {
                        s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value);
                    }
                }
            }
        }
        return s.join('&').replace(/%20/g, '+');
    }

    simpleLoginSubmit();
    simpleLogoutSubmit();

    function simpleLoginSubmit() {
        var simpleLoginSubmitBtn = document.querySelectorAll(".simple-login-submit");

        for (var i = 0; i < simpleLoginSubmitBtn.length; i++) {
            simpleLoginSubmitBtn[i].addEventListener('click',
                function (e) {
                    e.preventDefault();
                    var form = this.parentNode.parentNode; // path to the form tag
                    var container = this.parentNode.parentNode.parentNode; // path to .simple-login tag
                    var actionUrl = form.getAttribute("action"); // action Url
                    var data = serialize(form);
                    var xhr = new XMLHttpRequest();

                    xhr.open("POST", actionUrl, true);
                    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                            var resources = JSON.parse(xhr.response);

                            if (!resources.IsSuccessful) {
                                container.innerHTML = resources.Html;
                                simpleLoginSubmit();
                            } else {
                                if (resources.RedirectUrl && resources.RedirectUrl.length > 0) {
                                    window.location.href = resources.RedirectUrl;
                                } else {
                                    window.location.reload(true);
                                }
                            }
                        }
                    }
                    xhr.send(data);
                });
        }
    }

    function simpleLogoutSubmit() {
        var simpleLogoutSubmitButtons = document.querySelectorAll(".simple-logout-submit");

        for (var i = 0; i < simpleLogoutSubmitButtons.length; i++) {
            simpleLogoutSubmitButtons[i].addEventListener('click',
                function (e) {
                    e.preventDefault();
                    var form = this.parentNode; // path to the form tag
                    var actionUrl = form.getAttribute("action"); // action Url
                    var data = serialize(form);
                    var xhr = new XMLHttpRequest();

                    xhr.open("POST", actionUrl, true);
                    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                            var resources = JSON.parse(xhr.response);

                            if (resources.IsSuccessful) {
                                window.location.reload(true);
                            }
                        }
                    }
                    xhr.send(data);
                });
        }
    }

    /* DocCheck Login Form */

    docCheckLogoutSubmit();

    function docCheckLogoutSubmit() {
        var docCheckLogoutSubmitButtons = document.querySelectorAll(".doccheck-logout-submit");

        for (var i = 0; i < docCheckLogoutSubmitButtons.length; i++) {
            docCheckLogoutSubmitButtons[i].addEventListener('click',
                function (e) {
                    e.preventDefault();
                    var form = this.parentNode; // path to the form tag
                    var actionUrl = form.getAttribute("action"); // action Url
                    var data = serialize(form);
                    var xhr = new XMLHttpRequest();

                    xhr.open("POST", actionUrl, true);
                    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                            var resources = JSON.parse(xhr.response);

                            if (resources.IsSuccessful) {
                                window.location.reload(true);
                            }
                        }
                    }
                    xhr.send(data);
                });
        }
    }

    /* Product and Search Result Filter */
    var
        oType = document.getElementById("type");
    if (oType) {
        oType.addEventListener("change", function () { this.form.submit(); });
    }

    var
        oTopic = document.getElementById("topic");
    if (oTopic) {
        oTopic.addEventListener("change", function () { this.form.submit(); });
    }

    var
        oChron = document.getElementById("chron");
    if (oChron) {
        oChron.addEventListener("change", function () { this.form.submit(); });
    }

    initializeSharePopups();

    /* Social Share */
    var
        aSocial = document.querySelectorAll("[data-category=\"Share\"]"),
        nSocial = aSocial.length;

    while (nSocial--) {
        aSocial[nSocial].addEventListener("click", socialShare);
    }

    function socialShare() {
        var sURL = this.getAttribute("data-redirect-url");
        if (sURL) window.open(sURL, '_blank');
    }

    //function socialShareOpen(oJSON) {
    //    if (oJSON && oJSON.url) {
    //        if (window["takeda_"] == undefined) {
    //            if (oJSON.openInNewWindow === false) {
    //                window.location.href = oJSON.url;
    //            } else {
    //                window.open(oJSON.url);
    //            }
    //        } else
    //            showDisclaimer(oJSON.url, (oJSON.openInNewWindow ? "_blank" : ""));
    //    }
    //}

    //function showDisclaimer(sHref, sTarget) {
    //    var tkd = new takeda_.LinkDisclaimer();

    //    if (typeof _disclaimerInternalLinks != "undefined" &&
    //        tkd.disclaimerInternalUrl(sHref, _disclaimerInternalLinks)) {
    //        tkd.openInternalLinkDisclaimer_ext(sHref, sTarget);
    //        return;
    //    }

    //    if (typeof _disclaimerExternalLinks != "undefined" &&
    //        tkd.disclaimerExternalUrl(sHref, _disclaimerExternalLinks, _disclaimerInternalLinks_)) {
    //        tkd.openExternalLinkDisclaimer_ext(sHref, sTarget);
    //        return;
    //    }


    //    if (sTarget !== "_blank") {
    //        window.location.href = sHref;
    //    } else {
    //        window.open(sHref);
    //    }
    //}

    /* Social Overlay */

    var
        oSearch = document.querySelector(".search-results"),
        oSocialToggle = document.getElementById("social-overlay"),
        aUrl = document.querySelectorAll("[data-share-url]"),
        nUrl = aUrl.length;

    if (oSearch) {
        oSearch.addEventListener("click",
            function (evt) {
                var oElm = evt.target;
                if (oElm.getAttribute("data-share-contenturl")) {
                    setSocialOverlay(evt, oElm);
                }
            });
    }

    while (nUrl--) { //Add eventListeners to sharing icons in overlay
        aUrl[nUrl].addEventListener("click", urlSocialOverlay);
    }

    /* Social Share within story-block */
    aUrl = document.querySelectorAll(".story__page__thumbnails__item__wrapper [data-share-contenturl]");
    nUrl = aUrl.length;

    while (nUrl--) { //Add eventListeners to sharing icons in overlay
        aUrl[nUrl].addEventListener("click",
            function (evt) {
                evt.preventDefault();
                setSocialOverlay(evt, this);
            });
    }

    function setSocialOverlay(event, oElm) {
        event.preventDefault();
        if (oSocialToggle) {
            oSocialToggle.checked = true;
            oSocialToggle.value = oElm.getAttribute("data-share-contenturl");
        }
    }

    function urlSocialOverlay() {
        var sURL = oSocialToggle.value + this.getAttribute("data-share-url");
        oSocialToggle.checked = false;
        if (sURL) window.open(sURL, '_blank');
    }


    /* Load iFrame Scripts */
    var
        aIframes = document.querySelectorAll(".EurolandTool"),
        nIframes = aIframes.length,
        oIframeScript;

    if (nIframes) {
        oIframeScript = document.createElement("script");
        oIframeScript.src = sEuroLandScript;
        oIframeScript.onload = setIframes;
        document.head.appendChild(oIframeScript);
    }

    function setIframes() {
        while (nIframes--) {
            if (window.EurolandToolIntegrationObject)
                window.EurolandToolIntegrationObject.set(aIframes[nIframes].getAttribute("id"));
        }
    }

    /* Generate Templates */
    var
        aTemplates = document.querySelectorAll("[data-template]"),
        nTmpLen = aTemplates.length,
        oTemplate,
        oWrapper;

    while (nTmpLen--) {
        oWrapper = aTemplates[nTmpLen];
        oTemplate = document.querySelector(oWrapper.getAttribute("data-template"));
        ajaxJSON(oWrapper.getAttribute("data-json"), true, render, [oTemplate, oWrapper]);
    }

    /* Carousel Block */
    var
        aCarousel = document.querySelectorAll(".carousel__wrapper"),
        nCarousel = aCarousel.length;

    while (nCarousel--) {
        initCarousel(aCarousel[nCarousel]);
    }

    function initCarousel(oParent) {
        var
            aItems = oParent.querySelectorAll(".spotblock"),
            nItems = aItems.length,
            oContent = oParent.querySelector(".carousel"),
            oLeft = oParent.querySelector(".carousel__nav--left"),
            oRight = oParent.querySelector(".carousel__nav--right"),
            oWrapper = oParent.querySelector(".carousel__content");

        if (oLeft) oLeft.addEventListener("click", function () { move(true); });
        if (oRight) oRight.addEventListener("click", function () { move(false); });

        window.addEventListener("resize",
            debounce(function () {
                move(true, 1);
            },
                250));

        function move(bLeft, nCur) {
            var
                nMaxTranslate,
                nPageItems = getNumOfPages(),
                nShowed = Math.ceil(nItems / nPageItems),
                nCurPage = oWrapper.getAttribute("data-page") - 0,
                nCurTranslate;
            nMaxTranslate = (nShowed - 1) * 100;

            if (nCur) {
                nCurTranslate = -(Math.ceil((nCur / nShowed)) - 1) * 100;
                nCurPage = Math.ceil(nCur / nShowed);
            } else {
                if (bLeft) {
                    nCurPage--;
                    if (nCurPage < 1) nCurPage = nPageItems;
                } else {
                    nCurPage++;
                    if (nCurPage > nPageItems) nCurPage = 1;
                }
                nCurTranslate = -100 * (nCurPage - 1);
            }

            oWrapper.setAttribute("data-page", nCurPage);
            if (oContent) oContent.style.transform = "translateX(" + nCurTranslate + "%)";
        }

        function getNumOfPages() {
            var
                nPages = Math.ceil(nItems / 2),
                nViewportWidth = getWidth();
            if (nViewportWidth >= 1024) nPages = Math.ceil(nItems / 4);
            return nPages;
        }
    }

    /* Video Implementation */
    var
        oVideoButtons = document.querySelectorAll(".video__block__wrapper"),
        nVideoButtons = oVideoButtons.length,
        nViewportWidth = getWidth(),
        oVideoScript;

    if (nVideoButtons) {
        oVideoScript = document.createElement("script");
        oVideoScript.src = sBrightcove;
        oVideoScript.onload = setVideoJS;
        window.addEventListener('load', () => document.head.appendChild(oVideoScript));
    }

    if (nViewportWidth >= 768) {
        while (nVideoButtons--) oVideoButtons[nVideoButtons].addEventListener("click", hideCaption);
    }

    function setVideoJS() {
        var
            oVideoJS = document.querySelectorAll(".video-js"),
            nVideoJS = oVideoJS.length;

        while (nVideoJS--) {
            videojs(oVideoJS[nVideoJS].id, {}, function () { this.ga(); });
        }
    }

    function hideCaption() {
        var
            oCaption = this.querySelector(".gallery__focus__content--caption");
        if (oCaption) {
            oCaption.style.display = "none";
        }
    }

    /* Accordion */
    var oAccordion = document.querySelectorAll(".accordion__title");
    var nAccordion = oAccordion.length;

    while (nAccordion--) addAnimateHeight();

    function addAnimateHeight() {
        oAccordion[nAccordion].addEventListener("click", animateHeight, false);
    }

    /* Helper Functions */
    function ajaxJSON(sURI, bAsync, fCallBack, oArgs) {
        var
            aArg,
            O,
            oRequest = new XMLHttpRequest();
        oRequest.open("GET", sURI, bAsync);
        oRequest.setRequestHeader("Accept", "text/plain");
        oRequest.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status >= 200 && this.status < 400) {
                    O = this.responseText;
                    O = JSON.parse(O);
                    if (oArgs) {
                        aArg = Array.isArray(oArgs) ? oArgs : Array.prototype.slice.call(oArgs);
                        aArg.push(O);
                        fCallBack.apply(null, aArg);
                    } else {
                        fCallBack(O);
                    }
                }
            }
        };
        oRequest.send();
        oRequest = null;
    }

    function animateHeight(event) {
        var
            oContent = this.nextElementSibling,
            oInput = document.getElementById(this.getAttribute("for")),
            nHeight = oContent.firstElementChild.clientHeight;

        event.preventDefault();
        oInput.checked = !oInput.checked;

        if (oInput.checked && oContent) {
            oContent.style.height = nHeight + "px";
        } else {
            oContent.style.height = 0;
        }
    }

    function cookieSet(sName, sValue, oDate) {
        var expireDate = oDate ? oDate.toGMTString() : "";
        document.cookie = sName + "=" + sValue + ";path=/; " + "expires=" + expireDate;
    }

    function cookieGet(cookieName) {
        var regexPattern = '(?:(?:^|.*;\\s*)' + cookieName + '\\s*\\=\\s*([^;]*).*$)|^.*$';
        var regex = new RegExp(regexPattern, 'g');
        var cookieValue = document.cookie.replace(regex, "$1");
        return cookieValue;
    }

    function countChar() {
        var oChar = this.parentNode.querySelector(".form__textcounter__value");
        if (oChar) oChar.innerText = (this.getAttribute("maxlength") - 0 - this.value.length);
    }

    function debounce(oFunc, nDelay) {
        var
            nTimer = null;
        return function () {
            var
                aArgs = arguments,
                oScope = this;
            clearTimeout(nTimer);
            nTimer = setTimeout(function () { oFunc.apply(oScope, aArgs); }, nDelay);
        };
    }

    function getWidth() {
        return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }

    function throttle(fn, threshhold, scope) {
        threshhold = typeof threshhold !== "undefined" ? threshhold : 250;
        var
            last,
            deferTimer;
        return function () {
            var
                context = scope || this,
                now = +new Date(),
                args = arguments;
            if (last && now < last + threshhold) {
                clearTimeout(deferTimer);
                deferTimer = setTimeout(function () {
                    last = now;
                    fn.apply(context, args);
                },
                    threshhold);
            } else {
                last = now;
                fn.apply(context, args);
            }
        };
    }

    function pageHeight() {
        return Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.offsetHeight,
            document.body.clientHeight,
            document.documentElement.clientHeight
        );
    }

    function randomID(sPfx, nLen) {
        sPfx = sPfx || "";
        nLen = nLen || 4;
        return sPfx + (65536 * (1 + Math.random())).toString(16).slice(0, nLen);
    }

    function render(oTemplate, oWrapper, oJSON) {
        var
            sCnt = template(oTemplate.innerHTML, "data")(oJSON),
            sCallBack = oWrapper.getAttribute("data-callback");
        if (sCnt) sCnt = sCnt.replace(/data-bool=\"([^\"]*)\"/g, "$1").replace(/data-tmp-/g, "");
        if (sCnt) oWrapper.innerHTML = sCnt;
        if (sCallBack) {
            var fn = window[sCallBack];
            if (typeof fn === "function") {
                fn();
            }
        }
    }

    function scrollPosition() {
        return (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0);
    }

    function template(sTmpl, sDataPrfx) {
        var F =
            "var p=[];" +
            "p.push('" +
            sTmpl.replace(/[\r\t\n]/g, " ")
                .replace(/'(?=[^!--]*-->)/g, "\t")
                .split("'").join("\\'")
                .split("\t").join("'")
                .replace(/<!--#(.+?)-->/g, "',$1,'")
                .replace(/&lt;!--#(.+?)--&gt;/g, "',$1,'")
                .split("<!--").join("');")
                .split("-->").join("p.push('") +
            "');return p.join('');";
        return new Function(sDataPrfx, F);
    }

    function viewportHeight() {
        return (window.innerHeight ||
            document.documentElement.clientHeight ||
            document.getElementsByTagName("body")[0].clientHeight ||
            0);
    }


    replaceUTCDate();

    /* Convert UTC date to client's date */
    /*function utcDateToClientTimeZone() {
        var dt = new Date();
        document.cookie = "ClientTimeZone=" + dt.getTimezoneOffset() + ";path=/";
    }*/

    /* SiteLandingPopUp */
    function siteLandingPopUp() {
        var defaulDuration = 5;
        var showIn = 0;
        var modals = document.getElementsByClassName("js-block-site-landing-popup");
        if (modals.length === 0) return;
        var sitePopup = modals[0];
        var cookieName = sitePopup.getAttribute("data-popup-cookie");
        var cookieValue = cookieGet(cookieName);
        var cookieExpiresDays = sitePopup.getAttribute("data-popup-cookie-expire-days");

        var durationTime = parseFloat(sitePopup.getAttribute("data-popup-duration"));
        durationTime = isNaN(durationTime) ? defaulDuration : durationTime;

        var defaultLanguage = sitePopup.getAttribute("data-default-language");

        var oDate = new Date();
        if (cookieExpiresDays > 0) {
            oDate.setDate(oDate.getDate() + parseInt(cookieExpiresDays));
        } else {
            oDate = "";
        }

        var SLPUsetCookie = function (name, value, date) {
            if (!name) return;
            cookieSet(name, value, date);
        };

        var links = sitePopup.querySelectorAll('a');

        var closeModal = function () {
            $(sitePopup).on("shown.bs.modal", function () {
                setTimeout(function () {
                    $(sitePopup).modal("hide");
                    SLPUsetCookie(cookieName, defaultLanguage, oDate);
                }, durationTime * 1000);
            });
        };

        links.forEach(function (el) {
            var languageCode = el.getAttribute("data-language");
            languageCode = languageCode ? languageCode : defaultLanguage;

            if (languageCode === defaultLanguage) {
                el.onclick = function (e) {
                    e.preventDefault();
                    SLPUsetCookie(cookieName, languageCode, oDate);
                    $(sitePopup).modal("hide");
                };
            }
            else {
                el.onclick = function (e) {
                    e.preventDefault();
                    SLPUsetCookie(cookieName, languageCode, oDate);
                    window.location.href = this.getAttribute("href");
                };
            }

        });

        setTimeout(function () {
            $(sitePopup).on("show.bs.modal", function () {
                $("body").addClass("site-landing-popup-in");
            });
            $(sitePopup).on("hidden.bs.modal", function () {
                $("body").removeClass("site-landing-popup-in");
            });
            closeModal();
            $(sitePopup).modal("show");
        }, showIn * 1000);
    }
    ready(siteLandingPopUp);

    //utcDateToClientTimeZone();

    /* Share Price */
    function callSharePriceJson(sURI, bAsync, fCallBack, oArgs) {
        var
            aArg,
            O,
            oRequest = new XMLHttpRequest();
        oRequest.open("GET", sURI, bAsync);
        oRequest.setRequestHeader("Accept", "text/plain");
        oRequest.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status >= 200 && this.status < 400) {
                    try {
                        O = this.responseText;
                        O = JSON.parse(O);
                        O = O[Object.keys(O)[0]];
                    } catch (e) {
                        return false;
                    }
                    if (oArgs) {
                        aArg = Array.isArray(oArgs) ? oArgs : Array.prototype.slice.call(oArgs);
                        aArg.push(O);
                        fCallBack.apply(null, aArg);
                    }
                    else {
                        fCallBack(O);
                    }
                }
            }
        };
        oRequest.send();
        oRequest = null;
    }

    function callbackSharePriceJson() {

    }

    var
        aTemplatesEuroland = document.querySelectorAll("[data-templateeuroland]"),
        nTmpEurolandLen = aTemplatesEuroland.length,
        oTemplateEuroland,
        oWrapperEuroland;

    while (nTmpEurolandLen--) {
        oWrapperEuroland = aTemplatesEuroland[nTmpEurolandLen];
        oTemplateEuroland = document.querySelector(oWrapperEuroland.getAttribute("data-templateeuroland"));
        callSharePriceJson(oWrapperEuroland.getAttribute("data-json"), true, render, [oTemplateEuroland, oWrapperEuroland]);
    }



    window["takeda"] = {
        "socialShare": setSocialOverlay
    };

    return window["takeda"];

})();

/* Popup Safari fix */
function initializeSharePopups() {
    var
        sharePopup = document.querySelector(".social-sharing__overlay__content"),
        aShareButtons = document.querySelectorAll(".news-list__content__item--actions--share, .story__page__share"),
        nShareButtons = aShareButtons.length,
        aShareClosingElems = document.querySelectorAll(".social-sharing__overlay__bg, .social-sharing__overlay__content label, .social-sharing__icons > span > svg"),
        nShareClosingElems = aShareClosingElems.length;

    while (nShareButtons--) { initializeShareButtons(aShareButtons[nShareButtons]); }
    while (nShareClosingElems--) { initializeShareClosingElements(aShareClosingElems[nShareClosingElems]); }

    function initializeShareButtons(shareButton) {
        shareButton.addEventListener('click', function (event) {
            if (sharePopup)
                sharePopup.setAttribute("style", "display: block; z-index: 9999;");
        });
    }

    function initializeShareClosingElements(element) {
        element.addEventListener('click', function (event) {
            sharePopup.setAttribute("style", "display: none; z-index: -1;");
        });
    }
}
/* End of safari fix */

/* SVG Symbol-support for older browsers */
!function (a, b) { "function" == typeof define && define.amd ? define([], function () { return a.svg4everybody = b() }) : "object" == typeof exports ? module.exports = b() : a.svg4everybody = b() }(this, function () { function a(a, b) { if (b) { var c = document.createDocumentFragment(), d = !a.getAttribute("viewBox") && b.getAttribute("viewBox"); d && a.setAttribute("viewBox", d); for (var e = b.cloneNode(!0); e.childNodes.length;) c.appendChild(e.firstChild); a.appendChild(c) } } function b(b) { b.onreadystatechange = function () { if (4 === b.readyState) { var c = b._cachedDocument; c || (c = b._cachedDocument = document.implementation.createHTMLDocument(""), c.body.innerHTML = b.responseText, b._cachedTarget = {}), b._embeds.splice(0).map(function (d) { var e = b._cachedTarget[d.id]; e || (e = b._cachedTarget[d.id] = c.getElementById(d.id)), a(d.svg, e) }) } }, b.onreadystatechange() } function c(c) { function d() { for (var c = 0; c < l.length;) { var g = l[c], h = g.parentNode; if (h && /svg/i.test(h.nodeName)) { var i = g.getAttribute("xlink:href") || g.getAttribute("href"); if (e && (!f.validate || f.validate(i, h, g))) { h.removeChild(g); var m = i.split("#"), n = m.shift(), o = m.join("#"); if (n.length) { var p = j[n]; p || (p = j[n] = new XMLHttpRequest, p.open("GET", n), p.send(), p._embeds = []), p._embeds.push({ svg: h, id: o }), b(p) } else a(h, document.getElementById(o)) } } else ++c } k(d, 67) } var e, f = Object(c), g = /\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/, h = /\bAppleWebKit\/(\d+)\b/, i = /\bEdge\/12\.(\d+)\b/; e = "polyfill" in f ? f.polyfill : g.test(navigator.userAgent) || (navigator.userAgent.match(i) || [])[1] < 10547 || (navigator.userAgent.match(h) || [])[1] < 537; var j = {}, k = window.requestAnimationFrame || setTimeout, l = document.getElementsByTagName("use"); e && d() } return c });
svg4everybody();

function loadMore(oElm) {
    var
        aUrl,
        nUrl,
        oData = oElm.getAttribute("data-loadmore"),
        oSocialToggle = document.getElementById("social-overlay"),
        oWrapper = oElm.parentNode,
        oRequest = new XMLHttpRequest();
    oRequest.onreadystatechange = function () {

        if (this.readyState == 4 && this.status == 200) {
            oWrapper.innerHTML = this.response;
            aUrl = oWrapper.querySelectorAll(".story__page__thumbnails__item__wrapper [data-share-contenturl]");
            nUrl = aUrl.length;
            initializeSharePopups();
            replaceUTCDate();
            while (nUrl--) {
                aUrl[nUrl].addEventListener("click", function (evt) {
                    evt.preventDefault();
                    oSocialToggle.checked = true;
                    oSocialToggle.value = this.getAttribute("data-share-contenturl");
                });
            }

            var
                oTopic = oWrapper.querySelector("#topic");
            if (oTopic) {
                oTopic.addEventListener("change", function () { this.form.submit(); });
            }
        }
    };
    oRequest.open("GET", oData, true);
    oRequest.send();
}


window.onload = function () {
    var re = "http://";
    var re1 = "www.";
    var re2 = "https://";
    var re3 = " ";
    var url = window.location.href.replace(re, "").replace(re1, "").replace(re2, "").replace(re3, "").toLowerCase().replace(/(\r\n|\n|\r)/gm, "");
    if (url.indexOf("live-") !== 0) return;

    var customVal = $("#quickNavigatorHiddenInput").data("value");
    if (customVal == "0") {
        var quicknav = document.getElementById('epi-quickNavigator');
        var t = null;

        if (quicknav != null) {
            t = quicknav.getElementsByClassName('epi-quickNavigator-dropdown');
            t[0].remove();

            t = quicknav.getElementsByClassName('epi-quickNavigator-editLink')[0];
            t.removeChild(t.childNodes[0]);
        } else {
            var ul = document.createElement('ul')
            ul.setAttribute("id", "epi-quickNavigator");
            ul.style.background = "#f7542b";
            ul.style.border = "1px solid #f7542b";
            ul.style.borderTop = "none";
            ul.style.boxShadow = "0 0 10px 0 rgba(0,0,0,0.25)";
            ul.style.display = "inline-block";
            ul.style.listStyle = "none";
            ul.style.margin = "0";
            ul.style.padding = "0";
            ul.style.position = "fixed";
            ul.style.right = "10px";
            ul.style.top = "0";
            ul.style.zIndex = "100000";

            var li = document.createElement('li');
            li.setAttribute("class", "epi-quickNavigator-editLink");
            li.style.lineHeight = "16px";
            li.style.boxSizing = "border-box";
            li.style.display = "block";
            li.style.float = "left";
            li.style.position = "relative";


            document.body.appendChild(ul);
            ul.appendChild(li);

            t = li;
        }

        var a = document.createElement('a');
        var linkText = document.createTextNode("Logout");
        a.appendChild(linkText);
        a.title = "Logout";
        a.href = "/Util/logout.aspx";
        a.style.color = "White";
        a.style.padding = "7px";
        a.style.fontWeight = "bold";
        a.style.display = "block";

        t.appendChild(a);
    }
}

function addHeroPrintImage() {
    if (document.getElementById("globalMenuContainer")) return;
    var heroSpots = document.getElementsByClassName('hero-spot');
    if (heroSpots && heroSpots.length > 0) {
        for (var i = 0; i < heroSpots.length; i++) {
            var $that = $(heroSpots[0]);
            var bgImage = $that.find('[id*="hero-spot-"]').css("background-image");
            $that.prepend('<div class="hero-spot-print-image"></div>');
            $that.find(".hero-spot-print-image").css({
                "background-image": bgImage
            });
        }
    }
}

function ready(fn) {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

ready(addHeroPrintImage);

function toLocaleDateStringSupportsLocales() {
    try {
        new Date().toLocaleDateString("i");
    } catch (e) {
        return e.name === "RangeError";
    }
    return false;
}

/*Change UTC from .locale-date to client's date
  Must be called each time the dom changes to make sure all dates are parsed, for exemple after an ajax load
*/
function replaceUTCDate() {
    if (toLocaleDateStringSupportsLocales()) {
        var userLang = navigator.language || navigator.userLanguage;

        $('.locale-date').each(function () {
            try {
                if ($(this).data('time') && $(this).data('timeformat')) {
                    var options = {};
                    var date = new Date($(this).data('time') * 1000);
                    var userLang = $('html').attr('lang');
                    switch ($(this).data('timeformat')) {
                        //LongTextDate displays 2 month symbol in CJK on specific version of IE11 : FIX
                        case 'LongTextDate': options = { year: 'numeric', month: detectIE() && (userLang.lastIndexOf('ja', 0) === 0 || userLang.lastIndexOf('ko', 0) === 0 || userLang.lastIndexOf('zh', 0) === 0) ? 'short' : 'long', day: 'numeric' }; break; //February 21, 2018

                        case 'ShortTextDate': options = { year: 'numeric', month: 'short', day: 'numeric' }; break; //Feb 21, 2018
                        case 'ShortNumericalDate': { }; break; //2/21/2018
                        case 'ShortDateFormat': options = { year: 'numeric', month: '2-digit', day: '2-digit' }; break; //02/21/2020
                    }
                    $(this).text(date.toLocaleDateString(userLang, options).replace(/\u6708\u6708/g, '\u6708').replace(/\uc6d4\uc6d4/g, '\uc6d4'));
                }
            } catch (e) { }
        });
    }
}

function detectIE() {
    var ua = window.navigator.userAgent;

    // Test values; Uncomment to check result …

    // IE 10
    // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';

    // IE 11
    // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

    // Edge 12 (Spartan)
    // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

    // Edge 13
    // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
        // Edge (IE 12+) => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
}

function toggleRbtn(id) {

    if (document.getElementById('tgl-overlay').checked) {

        document.getElementById('tgl-overlay').checked = false;
    }
    else {
        document.getElementById('tgl-overlay').checked = true;
    }
}


$(window).load(function () {
    $('.locale-date').each(function () {
        var $this = $(this),
            _found = false,
            _text = $this.text().replace(/(\u6708|\uc6d4)/g, function (match, key) { var result = _found ? '' : key; _found = true; return result; });
        $this.text(_text)
    });
})
