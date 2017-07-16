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
});
