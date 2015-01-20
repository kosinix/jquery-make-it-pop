/*
 * jQuery Make It Pop! 1.0.0
 * https://github.com/kosinix/jquery-make-it-pop
 * For a site that pops!
 * 
 * By Nico Amarilla based on https://github.com/joemckie/make-it-pop by Joe McKie
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */
(function($){
    var popcornMp3,
        popcornImages = [
            'https://raw.githubusercontent.com/kosinix/jquery-make-it-pop/master/jquery-make-it-pop/popcorn.png',
            'https://raw.githubusercontent.com/kosinix/jquery-make-it-pop/master/jquery-make-it-pop/popcorn2.png'
        ],
        popcornContainer,
        counter = 0,
        timer;
		
    // Main
    $.fn.makeItPop = function(method) {
        
        _preload();
        
        var konami = new Konami(_popit);
        
        return false;
    }
    
    // Preload fun
    function _preload() {
		// Add audio
        popcornMp3 = new Audio('https://raw.githubusercontent.com/kosinix/jquery-make-it-pop/master/jquery-make-it-pop/popcorn.mp3');
		
		// Remove on end
		popcornMp3.addEventListener('ended', function() {
            _remove();
        }, false);
		
		// Add Images
        for(var i in popcornImages) {
            new Image().src= popcornImages[i];
        }
    }
    
    // Initialise popcorny goodness
    function _popit(){
		// Add container
        popcornContainer = $( "<div></div>" ).appendTo( "body" );
        
        // Add CSS
        popcornContainer.css({
            position : "fixed",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            zIndex: "10000"
        });
        
        // Play music
		popcornMp3.currentTime = 0;
        popcornMp3.play();
		
        // Start popin!
        _addPopcorn();
    }
    function _addPopcorn() {
        timer = setTimeout(function() {
            var popcorn       = null, // Add popcorn
                randomImage   = Math.floor(Math.random() * 2), // 0-1
                positionTop   = Math.floor(Math.random() * document.documentElement.clientHeight),
                positionLeft  = Math.floor(Math.random() * document.body.clientWidth),
                rotation      = Math.floor(Math.random() * 360);
            
            
            // Add to container
            popcorn = $('<img>').appendTo(popcornContainer);
            popcorn.attr('src', popcornImages[randomImage]);
            
            // Add CSS
            popcorn.css({
                position : "absolute",
                top: positionTop+"px",
                left: positionLeft+"px",
                transform: "rotate("+rotation+"deg)",
                webkitTransform: "rotate("+rotation+"deg)",
                mozTransform: "rotate("+rotation+"deg)"
            });
			
			// Behave
            counter++;
            if (counter>500) { // Prevent infinite popcorn madness.
                _remove();
            }
            
            // Repeat loop
            _addPopcorn();
            
        }, 444);
    }
    
    function _remove(){
		popcornMp3.pause();
        clearTimeout(timer);
        popcornContainer.remove();
    }
})(jQuery);