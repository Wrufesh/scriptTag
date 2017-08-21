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

    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

    var observer = new MutationObserver(function(mutations, observer) {
        // fired when a mutation occurs
        console.log("Wrufesh it has just changed.");
        var selected =  $("button[type='submit'][name='checkout'], input[type='submit'][name='checkout']");
        for(var i in selected){
            if(!$(selected[i]).is(':disabled')){
                $(selected[i]).attr("disabled", "disabled");
            }
        }
        // console.log(mutations, observer);
        // ...
    });

    // define what element should be observed by the observer
    // and what types of mutations trigger the callback
    observer.observe(document, {
      subtree: true,
      attributes: true
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