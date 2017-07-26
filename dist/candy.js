/*
 * Candy v1.0.0 by Puzzalea
 * Docs: https://github.com/puzzalea/candy
 */

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
    
/* Custom Modernizr build for detecting if the browser supports position sticky */

/*! modernizr 3.5.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-csspositionsticky-setclasses !*/
!function(e,n,s){function t(e,n){return typeof e===n}function o(){var e,n,s,o,a,i,f;for(var c in r)if(r.hasOwnProperty(c)){if(e=[],n=r[c],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(s=0;s<n.options.aliases.length;s++)e.push(n.options.aliases[s].toLowerCase());for(o=t(n.fn,"function")?n.fn():n.fn,a=0;a<e.length;a++)i=e[a],f=i.split("."),1===f.length?Modernizr[f[0]]=o:(!Modernizr[f[0]]||Modernizr[f[0]]instanceof Boolean||(Modernizr[f[0]]=new Boolean(Modernizr[f[0]])),Modernizr[f[0]][f[1]]=o),l.push((o?"":"no-")+f.join("-"))}}function a(e){var n=c.className,s=Modernizr._config.classPrefix||"";if(u&&(n=n.baseVal),Modernizr._config.enableJSClass){var t=new RegExp("(^|\\s)"+s+"no-js(\\s|$)");n=n.replace(t,"$1"+s+"js$2")}Modernizr._config.enableClasses&&(n+=" "+s+e.join(" "+s),u?c.className.baseVal=n:c.className=n)}function i(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):u?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}var l=[],r=[],f={_version:"3.5.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var s=this;setTimeout(function(){n(s[e])},0)},addTest:function(e,n,s){r.push({name:e,fn:n,options:s})},addAsyncTest:function(e){r.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=f,Modernizr=new Modernizr;var c=n.documentElement,u="svg"===c.nodeName.toLowerCase(),p=f._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];f._prefixes=p,Modernizr.addTest("csspositionsticky",function(){var e="position:",n="sticky",s=i("a"),t=s.style;return t.cssText=e+p.join(n+";"+e).slice(0,-e.length),-1!==t.position.indexOf(n)}),o(),a(l),delete f.addTest,delete f.addAsyncTest;for(var m=0;m<Modernizr._q.length;m++)Modernizr._q[m]();e.Modernizr=Modernizr}(window,document);
