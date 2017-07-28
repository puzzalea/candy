jQuery('document').ready(function($) {
    var $document = $(document),
        $window = $(window),
        $body = $('body'),
        $nav = $('.main-nav'),
        navIsSticky = $nav.hasClass('sticky-nav');

    // Check for valid jQuery selector
    function isValidSelector(selector) {
        try {
            var $element = $(selector);
        } catch(error) {
            return false;
        }
        return true;
    }

    // Check if mobile width
    var isMobileWidth = function() {
        if ($nav.find('.menu > ul').css('position') === 'fixed') {
            return true;
        } else {
            return false;
        }
    };

    // Smooth scrolling
    $('a[href]').click(function(e) {
        var t = $(this),
            link = t.attr('href'),
            linkPath = link.split('#')[0],
            section = '#' + link.split('#')[1],
            currentPage = window.location.pathname;

        if (isValidSelector(section) &&
            $(section).length > 0 &&
            (linkPath === '' || linkPath === currentPage)) {

            e.preventDefault();

            var navOffset = navIsSticky ? $nav.outerHeight() : 0;

            $('html, body').animate({
               scrollTop: $(section).offset().top - navOffset
            }, 1000);
        }
    });

    // Fix nav for browsers that don't support position sticky
    var scrollTop = $window.scrollTop(),
        navIsFixed = false,
        navOriginalPosition = $nav.offset().top,
        navHeight = $nav.outerHeight(),
        $navPlaceholder = $('<div></div>');

    var adjustNav = function() {
        scrollTop = $window.scrollTop();
        navHeight = $nav.outerHeight();

        if (navHeight !== $navPlaceholder.height()) {
            $navPlaceholder.height(navHeight);
        }

        if (scrollTop >= navOriginalPosition && !navIsFixed) {
            $nav.before($navPlaceholder);
            $nav.css('position', 'fixed');
            navIsFixed = true;
        } else if (scrollTop < navOriginalPosition && navIsFixed) {
            $nav.css('position', 'static');
            $navPlaceholder.detach();
            navIsFixed = false;
        }
    };

    if (!$('html').hasClass('csspositionsticky') && navIsSticky) {
        adjustNav();
        $window.scroll(adjustNav);
        $window.resize(adjustNav);
    }

    // Mobile menu appearance
    var $menuTrigger = $('.open-menu'),
        $closeMenuTrigger = $('.close-menu');

    $menuTrigger.click(function() {
        $(this).siblings('ul').addClass('show-menu');
        $closeMenuTrigger.addClass('show-close-menu');
    });

    // Close mobile menu
    $('.close-menu, .menu li:not(.has-dropdown) > a').click(function() {
        $('.show-menu').removeClass('show-menu');
        $closeMenuTrigger.removeClass('show-close-menu');
    });

    // Submenu appearance
    var $navSubMenuParent = $('.has-dropdown');

    $navSubMenuParent.click(function(e) {
        if ($(e.target).parent().hasClass('has-dropdown')) {
            e.preventDefault();
        }

        var $dropdown = $(this).children('ul');

        if ($dropdown.hasClass('show-dropdown')) {
            $dropdown.removeClass('show-dropdown');
        } else {
            $dropdown.addClass('show-dropdown');

            // Close other dropdowns
            $('.has-dropdown ul.show-dropdown').not($dropdown).removeClass('show-dropdown');
        }
    });

    // Close all dropdowns when the user clicks on something that is
    // not a dropdown
    $document.bind('click', function(e) {
        if ($(e.target).closest('.has-dropdown').length === 0 && !isMobileWidth()) {
            $('.has-dropdown ul').removeClass('show-dropdown');
        }

        if ($(e.target).closest('.menu').length === 0 && isMobileWidth()) {
            $('.menu > ul').removeClass('show-menu');
            $('.has-dropdown ul').removeClass('show-dropdown');
            $('.close-menu').removeClass('show-close-menu');
        }
    });

    // Accordion hide and reveal
    var $accordionHeadlines = $('.accordion-headline');

    $accordionHeadlines.click(function() {
        var $accordion = $(this).closest('.accordion'),
            $content = $accordion.find('.accordion-content');

        $content.slideToggle(500);
        $accordion.toggleClass('active-accordion');
    });
});
