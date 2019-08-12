/*! Candy v2.0.0 by Puzzalea
    Docs: https://github.com/puzzalea/candy */

/* Custom Modernizr build for detecting if the browser supports position sticky */

/*! modernizr 3.5.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-csspositionsticky-setclasses !*/
!function(e,n,s){function t(e,n){return typeof e===n}function o(){var e,n,s,o,a,i,f;for(var c in r)if(r.hasOwnProperty(c)){if(e=[],n=r[c],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(s=0;s<n.options.aliases.length;s++)e.push(n.options.aliases[s].toLowerCase());for(o=t(n.fn,"function")?n.fn():n.fn,a=0;a<e.length;a++)i=e[a],f=i.split("."),1===f.length?Modernizr[f[0]]=o:(!Modernizr[f[0]]||Modernizr[f[0]]instanceof Boolean||(Modernizr[f[0]]=new Boolean(Modernizr[f[0]])),Modernizr[f[0]][f[1]]=o),l.push((o?"":"no-")+f.join("-"))}}function a(e){var n=c.className,s=Modernizr._config.classPrefix||"";if(u&&(n=n.baseVal),Modernizr._config.enableJSClass){var t=new RegExp("(^|\\s)"+s+"no-js(\\s|$)");n=n.replace(t,"$1"+s+"js$2")}Modernizr._config.enableClasses&&(n+=" "+s+e.join(" "+s),u?c.className.baseVal=n:c.className=n)}function i(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):u?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}var l=[],r=[],f={_version:"3.5.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var s=this;setTimeout(function(){n(s[e])},0)},addTest:function(e,n,s){r.push({name:e,fn:n,options:s})},addAsyncTest:function(e){r.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=f,Modernizr=new Modernizr;var c=n.documentElement,u="svg"===c.nodeName.toLowerCase(),p=f._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];f._prefixes=p,Modernizr.addTest("csspositionsticky",function(){var e="position:",n="sticky",s=i("a"),t=s.style;return t.cssText=e+p.join(n+";"+e).slice(0,-e.length),-1!==t.position.indexOf(n)}),o(),a(l),delete f.addTest,delete f.addAsyncTest;for(var m=0;m<Modernizr._q.length;m++)Modernizr._q[m]();e.Modernizr=Modernizr}(window,document);

const html = document.querySelector('html');
const body = document.querySelector('body');
const nav = document.querySelector('.main-nav');
let navIsSticky = nav.classList.contains('sticky-nav');

// Check if mobile width
const isMobileWidth = () => getComputedStyle(nav.querySelector('.menu > ul')).position === 'fixed';

// Check if valid selector
function isValidSelector(selector) {
    try {
        document.querySelector(selector);
    } catch (error) {
        return false;
    }
    return true;
}

// Smooth scrolling
const animateScroll = (toPosition, duration) => {
    const start = window.scrollY;
    const change = toPosition - start;
    let currentTime = 0;
    const increment = 10;

    // Magic?? ¯\_(ツ)_/¯
    const easeInOutQuad = (t, b, c, d) => {
        t /= d/2;
        if (t < 1) return c/2*t*t + b;
        t--;
        return -c/2 * (t*(t-2) - 1) + b;
    };

    const movePosition = () => {
        currentTime += increment;
        const val = easeInOutQuad(currentTime, start, change, duration);
        window.scrollTo(0, val);
        if (currentTime < duration) setTimeout(movePosition, increment);
    };

    movePosition();
}

const linkElements = document.querySelectorAll('a[href]');

for (let el of linkElements) {
    el.addEventListener('click', e => {
        const t = e.target;
        const link = t.getAttribute('href');
        const linkPath = link.split('#')[0];
        const sectionID = '#' + link.split('#')[1];
        if (!isValidSelector(sectionID)) return;

        const section = document.querySelector(sectionID);
        const currentPage = window.location.pathname;

        if (section && (linkPath === '' || linkPath === currentPage)) {
            e.preventDefault();

            let navOffset = navIsSticky ? nav.getBoundingClientRect().height : 0;
            let newPosition = section.offsetTop - navOffset;

            animateScroll(newPosition, 1000);
        }
    })
}

// Fix nav for browsers that don't support position sticky
let scrollTop = window.scrollY;
let navIsFixed = false;
let navOriginalPosition = nav.offsetTop;
let navHeight = nav.getBoundingClientRect().height;
const navPlaceholder = document.createElement('div');

const adjustNav = () => {
    scrollTop = window.scrollY;
    navHeight = nav.getBoundingClientRect().height;

    if (navHeight !== navPlaceholder.getBoundingClientRect().height) {
        navPlaceholder.style.height = `${navHeight}px`;
    }

    if (scrollTop >= navOriginalPosition && !navIsFixed) {
        nav.parentNode.insertBefore(navPlaceholder, nav);
        nav.style.position = 'fixed';
        navIsFixed = true;
        navOriginalPosition = navPlaceholder.offsetTop;
    } else if (scrollTop < navOriginalPosition && navIsFixed) {
        nav.style.position = 'static';
        navPlaceholder.remove();
        navIsFixed = false;
    }
};

if (!html.classList.contains('csspositionsticky') && navIsSticky) {
    adjustNav();
    window.addEventListener('scroll', adjustNav);
    window.addEventListener('resize', adjustNav);
}

// Mobile menu appearance
const menuTrigger = document.querySelector('.open-menu');
const closeMenuTrigger = document.querySelector('.close-menu');

menuTrigger.addEventListener('click', e => {
    e.target.parentNode.querySelector('ul').classList.add('show-menu');
    closeMenuTrigger.classList.add('show-close-menu');
});

// Close mobile menu
const elementsThatTriggerMenuClose = document.querySelectorAll('.close-menu, .menu li:not(.has-dropdown) > a');

for (let el of elementsThatTriggerMenuClose) {
    el.addEventListener('click', e => {
        document.querySelector('.menu ul').classList.remove('show-menu');
        closeMenuTrigger.classList.remove('show-close-menu');
    });
}

// Submenu appearance
const navSubMenuParents = document.querySelectorAll('.has-dropdown');

for (let el of navSubMenuParents) {
    el.addEventListener('click', e => {
        if (e.target.parentNode.classList.contains('has-dropdown')) e.preventDefault();

        const dropdown = e.target.parentNode.querySelector('ul');
        if (!dropdown) return;

        if (dropdown.classList.contains('show-dropdown')) {
            dropdown.classList.remove('show-dropdown');

            // Close other dropdowns
            const otherOpenDropdowns = document.querySelectorAll('.has-dropdown ul.show-dropdown');

            for (let dd of otherOpenDropdowns) {
                if (dd === dropdown) { continue; }
                dd.classList.remove('show-dropdown');
            }
        } else {
            dropdown.classList.add('show-dropdown');
        }
    });
}

// Close all dropdowns when the user clicks on something that is not a dropdown
document.addEventListener('click', e => {
    // Close dropdowns on large screens
    if (!e.target.closest('.has-dropdown') && !isMobileWidth()) {
        const dropdowns = document.querySelectorAll('.has-dropdown ul')
        for (let dd of dropdowns) { dd.classList.remove('show-dropdown'); }
    }

    // Close dropdowns and mobile menu on small screens
    if (!e.target.closest('.menu') && isMobileWidth()) {
        const submenus = document.querySelectorAll('.menu > ul');
        for (let s of submenus) { s.classList.remove('show-menu'); }

        const dropdowns = document.querySelectorAll('.has-dropdown ul');
        for (let dd of dropdowns) { dd.classList.remove('show-dropdown'); }

        closeMenuTrigger.classList.remove('show-close-menu');
    }
});

// Accordion hide and reveal
const accordionHeadlines = document.querySelectorAll('.accordion-headline');

for (let headline of accordionHeadlines) {
    headline.addEventListener('click', e => {
        const accordion = e.target.closest('.accordion');
        const content = accordion.querySelector('.accordion-content');

        accordion.classList.toggle('active-accordion');

        if (content.style.display === 'block') {
            Object.assign(content.style, { height: 0, paddingTop: 0, paddingBottom: 0 });
            setTimeout(() => {
                Object.assign(content.style, {
                    display: '',
                    height: '',
                    paddingTop: '',
                    paddingBottom: ''
                });
            }, 400);
        } else {
            content.style.display = 'block';
            const contentHeight = content.getBoundingClientRect().height;
            Object.assign(content.style, { height: 0, paddingTop: 0, paddingBottom: 0 });
            setTimeout(() => {
                Object.assign(content.style, {
                    height: `${contentHeight}px`,
                    paddingTop: '',
                    paddingBottom: ''
                });
            }, 10);
        }
    });
}
