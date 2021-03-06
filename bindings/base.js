// First, let's define some basic functions so that we don't duplicate
// code in both emacs.js and vi.js later. We can also declare private
// variables within a file to share between functions/bindings.

// WebKit normally scrolls 1 line on up/down and the viewport's height
// minus 1 line on pageup/pagedown. FIXME: need this to scale with font.

var lineHeight = 40;

// Horizontal scrolling seems to use the same number of pixels.

var lineWidth = 40;

yak.functions.add({
    scrollLines: function(n) {
        window.scrollBy(0, n * lineHeight);
    },
    scrollCols: function(n) {
        window.scrollBy(n * lineWidth, 0);
    },
    scrollPages: function(n) {
        var direction = n >= 0 ? 1 : -1;
        var distance = Math.abs(n) * window.innerHeight - lineHeight;
        window.scrollBy(0, direction * distance);
    },

    colLeft: function() {
        yak.functions.scrollCols(-1);
    },
    colRight: function() {
        yak.functions.scrollCols(1);
    },
    lineUp: function() {
        yak.functions.scrollLines(-1);
    },
    lineDown: function() {
        yak.functions.scrollLines(1);
    },

    pageDown: function() {
        yak.functions.scrollPages(1);
    },
    pageUp: function() {
        yak.functions.scrollPages(-1);
    },

    gotoBottom: function() {
        window.scroll(window.scrollX, document.height);
    },
    gotoTop: function() {
        window.scroll(window.scrollX, 0);
    },
    gotoLeft: function() {
        window.scroll(0, window.scrollY);
    },
    gotoRight: function() {
        window.scroll(document.width, window.scrollY);
    },

    tabSelect: function(n) {
        yak.tabs.getAllInWindow(null, function(tabs) {
            tabs.forEach(function(t) {
                if (t.index === n) {
                    yak.tabs.update(t.id, {selected: true});
                }
            });
        });
    },
    tabSelectRelative: function(n) {
        yak.tabs.getSelected(null, function(tab) {
            yak.functions.tabSelect(tab.index + n);
        });
    },
    tabLeft: function() {
        yak.functions.tabSelectRelative(-1);
    },
    tabRight: function() {
        yak.functions.tabSelectRelative(1);
    },

    goBack: function() {
        history.go(-1);
    },
    goUp: function() {
        var components = location.pathname.split('/');
        if (components.pop() === '') components.pop();
        components.push('');
        location.href = location.protocol + '//' + location.host +
            components.join('/');
    },
    goRoot: function() {
        location.href = location.protocol + '//' + location.host + '/';
    },

    pass: function() {
        return false;
    }
});

// A simple binding that will be welcome in both the Emacs and vi
// flavors (since they each will want C-u for something else.) This
// isn't particularly "natural" to me (I think it's from IE), but it
// is at least not pulled out of thin air.

yak.bindings.add({
    '<f2>': {
        onkeydown: function(event) {
            yak.tabs.create({url: 'view-source:' + location.href});
        }
    }
});
