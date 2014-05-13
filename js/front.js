(function ($, window, document, undefined) {
'use strict';

$(function () {


    if (!Modernizr.svg) {
        $("img[src$='.svg']").each(function() {
            var fallback =  $(this).data('fallback');
            $(this).attr("src", fallback);
        });
    }

    if(!Modernizr.input.placeholder){
        polyfillPlaceholder();
    }

});

})(jQuery, window, document);

// html5 placeholder fallback
function polyfillPlaceholder(){
    var active = document.activeElement;
    $('[placeholder]').focus(function () {
        if ($(this).attr('placeholder') !== '' && $(this).val() === $(this).attr('placeholder')) {
            $(this).val('').removeClass('placeholder');
        }
    }).blur(function () {
            if ($(this).attr('placeholder') !== '' && ($(this).val() === '' || $(this).val() == $(this).attr('placeholder'))) {
                $(this).val($(this).attr('placeholder')).addClass('placeholder');
            }
        });
    $('[placeholder]').blur();
    $('[placeholder]').parents('form').submit(function() {
        $(this).find('[placeholder]').each(function() {
            if ($(this).val() == $(this).attr('placeholder')) {
                $(this).val('');
            }
        });
    });
    $(active).focus();
}