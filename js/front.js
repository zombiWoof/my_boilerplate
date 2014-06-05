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

    skinSelect();
});

})(jQuery, window, document);

// Skinned dropdown list
function skinSelect() {
    var select = $("select.skinMe-select").not('.skinned');

    select.addClass('skinned').css('opacity','0').wrap("<div class='selectWrapper'></div>").after("<span class='placeholder'></span>");

    select.each(function() {
        var defaultTxt = $('option:selected', this).text();
        var disabled = $(this).attr('disabled');
        var multiple = $(this).attr('multiple');

        $(this).next('.placeholder').text(defaultTxt);

        if (typeof disabled !== 'undefined' && disabled !== false) {
            $(this).parent('.selectWrapper').addClass('disabled');
        }

        if (typeof multiple !== 'undefined' && multiple !== false) {
            $(this).parent('.selectWrapper').addClass('multiple');
            $(this).find('option').each(function() {
                $(this).append('&nbsp; ');
            });
        }
    });

    select.change(function() {
        var defaultTxt = $('option:selected', this).text();
        $(this).next('.placeholder').text(defaultTxt);
    });
}

function killSkinSelect() {
    var skinnedOnes =  $("select.skinned");

    skinnedOnes.each(function() {
        $(this).removeClass('skinned').css('opacity','1').unwrap().next(".placeholder").remove();
    });
    skinnedOnes.off();
}

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