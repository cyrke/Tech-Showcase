/*
    MagicScroll - The jQuery Plugin for adding magic to your scrolling
    by John Polacek (@johnpolacek)
    
    Dual licensed under MIT and GPL.

    Dependencies: jQuery
*/

;(function($) {

    $.MagicScroll = function() {

        var magicScroll = this;

        var i,
            spells = [],
            numSpells = 0,
            doScrollCheck = false,
            magicFunction,
            reverseFunction;

        function initMagic() {
            // when scrolling, do scroll check
            $(window).scroll(function() { doScrollCheck = true; });
            
            (function loop() {
                if (doScrollCheck) {
                    checkScroll();
                    doScrollCheck = false;
                }
                setTimeout(loop, 100); // loop calls itself and runs, then waits 100 miliseconds and runs again
            }());
        }
        
        function checkScroll() {
            var windowTop = $(window).scrollTop();
            for (i=0; i<numSpells; i++) {
                var isBelow = (windowTop > spells[i].trigger);
                if (isBelow !== spells[i].isMagicked) {
                    if (isBelow) {
                        spells[i].magicFunc.call();
                    } else {
                        spells[i].reverseFunc.call();
                    }
                    spells[i].isMagicked = isBelow;
                }
            }
        }

        magicScroll.addMagic = function(triggerPoint, magic, reverse) {
            // add spell to spells
            spells.push({
                trigger:triggerPoint,
                isMagicked:false,
                magicFunc:magic,
                reverseFunc:reverse
            });
            if (numSpells === 0) initMagic();
            numSpells = spells.length;
            checkScroll();
        };

        return magicScroll;
    };

})(jQuery);