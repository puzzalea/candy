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
    
    // Fix anchor links causing a section to be covered by the nav on page load
    var anchorLinkSection = window.location.hash;

    if (navIsSticky && anchorLinkSection && isValidSelector(anchorLinkSection) && $(anchorLinkSection).length > 0) {
        var navHeight = $nav.outerHeight();

        $window.load(function() {
            $('html, body').animate({
               scrollTop: $(anchorLinkSection).offset().top - navHeight
            }, 0);
        });
    }
    
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
            
            var navHeight = $nav.outerHeight();
            
            $('html, body').animate({
               scrollTop: $(section).offset().top - navHeight
            }, 1500);
        }
    });
});
