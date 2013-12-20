(function ($) {
  $.fn.menuMasonry = function (menuClass, openClass, options) {
    var menu = $(menuClass);

    /*
    *   Adjust the menu items margin
    */
    function adjustMainMenu() {
      var width = $(window).width(), layout, skip, gutter;
      for (var i = options.breakpoints.length - 1; i >= 0; i--) {
        if(width > options.breakpoints[i]) {
          layout = options.layouts[i];
          skip = options.skips[i];
          gutter = options.margins[i];
          break;
        }
      };
      if(!layout || menu.attr('adjusted') === layout || !menu.is(':visible')) return;

      console.log('Readjusting menu for', width, layout);
      var elems = menu.find('> ul > li').toArray();

      for(var i = 0, l = elems.length; i<l; i++) {
        var elem = $(elems[i]);
        elem.css('margin-top', gutter + 'px');
        if(i < skip) continue;

        var prev = $(elems[i-skip]);
        var margin = (prev.offset().top + prev.height()) - elem.offset().top + 2*gutter;

        // console.log(prev.offset().top + ' - ' + prev.height() + ' - ' + elem.offset().top + ' > ' + margin);
        if(margin <= gutter) {
          elem.css('margin-top', margin + 'px');
        }
      }
      menu.attr('adjusted', layout);
    }

    /*
    *   Toggle the menu visibile
    */
    function toggleMenu () {
      if(menu.is(':visible')) {
        $('body').removeClass(openClass);
      } else {
        $('body').addClass(openClass);
        setTimeout(adjustMainMenu, 50);
      }
    }

    // Attach to click event
    $(this).click(toggleMenu);

    // Listen for window resizes
    var rszTimeout = false;
    $(window).resize(function() {
      clearInterval(rszTimeout);
      rszTimeout = setTimeout(adjustMainMenu, 200);
    });
  }

})(window.jQuery);
