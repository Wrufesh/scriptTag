var loadScript = function (url, callback) {

    /* JavaScript that will load the jQuery library on Google's CDN.
     We recommend this code: http://snipplr.com/view/18756/loadscript/.
     Once the jQuery library is loaded, the function passed as argument,
     callback, will be executed. */
    var script = document.createElement("script")
    script.type = "text/javascript";

    if (script.readyState) {  //IE
        script.onreadystatechange = function () {
            if (script.readyState == "loaded" ||
                script.readyState == "complete") {
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {  //Others
        script.onload = function () {
            callback();
        };
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);

};

var myAppJavaScript = function ($) {
    /* Your app's JavaScript here.
     $ in this scope references the jQuery object we'll use.
     Don't use 'jQuery', or 'jQuery191', here. Use the dollar sign
     that was passed as argument.*/
    // $('body').append('<p>Wrufesh jquery version ' + $.fn.jquery + '</p>');
    $("button[id^='AddToCart-'][name='add'][type='submit']").text("Sales Disabled Temporarily");
    $("input[id^='AddToCart-'][name='add'][type='submit']").val("Sales Disabled Temporarily");

    $("button[id^='AddToCart-'][name='add'][type='submit'], input[id^='AddToCart-'][name='add'][type='submit']").attr("disabled", "disabled");

    var observeDOM = (function () {
        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
            eventListenerSupported = window.addEventListener;

        return function (obj, callback) {
            if (MutationObserver) {
                // define a new observer
                var obs = new MutationObserver(function (mutations, observer) {
                    if (mutations[0].addedNodes.length || mutations[0].removedNodes.length)
                        callback();
                });
                // have the observer observe foo for changes in children
                obs.observe(obj, {childList: true, subtree: true});
            }
            else if (eventListenerSupported) {
                obj.addEventListener('DOMNodeInserted', callback, false);
                obj.addEventListener('DOMNodeRemoved', callback, false);
            }
        };
    })();

// Observe a specific DOM element:
    observeDOM(document.body, function () {
        console.log('dom changed');
    });
};

if ((typeof jQuery === 'undefined') || (parseFloat(jQuery.fn.jquery) < 1.7)) {
    loadScript('//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js', function () {
        jQuery191 = jQuery.noConflict(true);
        myAppJavaScript(jQuery191);
    });
} else {
    myAppJavaScript(jQuery);
}