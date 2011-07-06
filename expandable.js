/*!
*     jQuery Expandable Accordion
*     v0.11
*     author: Nick Evans (based on jquery ui accordion)
*     See https://github.com/nwe44/Expandable-accordion
*
*      This is a heavilly cut down version of jquery ui accordion 
*     to be used when more than one accordion needs to be open
*     inspired by the advice at http://jqueryui.com/demos/accordion/
*     
*/
(function ($) {

    $.fn.expandableAccordion = function (options) {
        var opts = $.extend({}, $.fn.expandableAccordion.defaults, options);
        var numberOfAccordions = this.length;
        var state = [];
        for (var k = 0; $("#ui-expandable-accordion-" + k).length; k++);
        return this.each(function (i) {
            if ($(this).attr('id')) {
                var myID = $(this).attr('id');
            } else {
                var myID = "ui-expandable-accordion-" + (i + k);
                $(this).attr('id', myID);
            }
            $(this).addClass( "ui-expandable-accordion ui-widget ui-helper-reset" )
                // in lack of child-selectors in CSS
                // we need to mark top-LIs in a UL-accordion for some IE-fix
                .children("li")
                    .addClass("ui-accordion-li-fix");
                var headers = "> li > :first-child,> :not(li):even";
                var iconHeaderSelected = "ui-icon-triangle-1-s";
                var iconHeader = "ui-icon-triangle-1-e";
            $(this).find(headers)
                .addClass( "ui-accordion-header ui-helper-reset ui-state-default ui-corner-all" )
                .bind( "mouseenter.expandableAccordion", function () {
                    $(this).addClass("ui-state-hover");
                })
                .bind( "mouseleave.expandableAccordion", function () {
                    $(this).removeClass("ui-state-hover");
                })
                .bind( "focus.expandableAccordion", function () {
                    $(this).addClass("ui-state-focus");
                })
                .bind( "blur.expandableAccordion", function () {
                    $(this).removeClass( "ui-state-focus");
                }).bind("click",function (event) {
                    $(this)
                    .toggleClass("ui-state-active ui-corner-top")
                    .toggleClass("ui-state-default ui-corner-all")
                    .next().slideToggle()
                    .toggleClass("ui-accordion-content-active"); // this is where the magic happens
                    
                    if (opts.useBBQ && $.bbq && $(this).attr("id") && $(this).hasClass("ui-state-active")) {
                        state[$(this).parent().attr("id")]=$(this).attr("id");
                        $.bbq.pushState(state);
                    }
                    if ( opts.toggleControls && opts.hideRedundantToggles) {
                        if (!$('#' + myID).find('.ui-accordion-content-active').length) {
                            //Nothing's open, so add a class to the collapse toggles
                            $('#' + myID).prev()
                                        .find('.ui-collapse-all')
                                        .addClass('ui-expand-collapse-toggle-disabled')
                                        .end()
                                        .find('.ui-expand-all')
                                        .removeClass('ui-expand-collapse-toggle-disabled');
                            $('#' + myID).next()
                                        .find('.ui-collapse-all')
                                        .addClass('ui-expand-collapse-toggle-disabled')
                                        .end()
                                        .find('.ui-expand-all')
                                        .removeClass('ui-expand-collapse-toggle-disabled');
                                        
                        }else if (!$('#' + myID).find('.ui-state-default').length) {
                            // everything's open, so add a class to the expand toggles
                            $('#' + myID).prev()
                                        .find('.ui-expand-all')
                                        .addClass('ui-expand-collapse-toggle-disabled')
                                        .end()
                                        .find('.ui-collapse-all')
                                        .removeClass('ui-expand-collapse-toggle-disabled');
                            $('#' + myID).next()
                                        .find('.ui-expand-all')
                                        .addClass('ui-expand-collapse-toggle-disabled')
                                        .end()
                                        .find('.ui-collapse-all')
                                        .removeClass('ui-expand-collapse-toggle-disabled');
                        }else{
                            // it's a mix, so enable both toggle switches
                            $('#' + myID).prev()
                                        .find('a')
                                        .removeClass('ui-expand-collapse-toggle-disabled');
                            $('#' + myID).next()
                                        .find('a')
                                        .removeClass('ui-expand-collapse-toggle-disabled');
                        }
                    }
                    $(this)
                    .children( ".ui-icon" )
                        .toggleClass( iconHeaderSelected )
                        .toggleClass( iconHeader );
                    event.preventDefault();
                }).next()
                .addClass( "ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom" );
            $("<span></span>" )
                .addClass( "ui-icon " + iconHeader )
                .prependTo( $(this).find(headers) );
            $(this).children( ".ui-icon" )
                .toggleClass(iconHeader)
                .toggleClass(iconHeaderSelected);
            $(this).addClass( "ui-accordion-icons" );
            

            //open saved state             
            if (opts.useBBQ && $.bbq && $.bbq.getState($(this).attr("id"))) {
                $(this).find( "#" + $.bbq.getState($(this).attr("id"))).not(".ui-state-active").click();
            }
            
            // open the first slide if it's in the settings to do so.
            else if (opts.firstOpen) {$(this).find( ".ui-accordion-header").eq(0).click();}
            
            if (opts.toggleControls) {
            // add the expand all markup in js so non-js users, who will never be able to use it
            // never see it, they'll never miss it after all.
            
                // first, build the buttons
                var toggleButtons = function (options, thisID) {
                    var myClass = $.extend({ className: 'ui-expand-collapse-toggle-before'}, options);
                    var toggler = ['<div class="' + myClass.className + ' ui-expand-collapse-toggle clearfix">'];
                    toggler.push('<a href="#" target="#' + thisID + '" class="ui-expand-all">Expand All <span class="ui-icon ui-icon-triangle-1-s"></span></a>');
                    if (opts.toggleDivider) {toggler.push('<span class="ui-expand-collapse-toggle-divider">|</span>');}
                    toggler.push('<a href="#" target="#' + thisID + '" class="ui-collapse-all ui-expand-collapse-toggle-disabled">Collapse All <span class="ui-icon ui-icon-triangle-1-n"></span></a>');
                    toggler.push('</div>');
                    return toggler.join('');
                };
                
                if (! opts.multiple || i === 0) {// add expand all button either to every one, or to the first one
                    $(this).before(toggleButtons({}, myID));
                }
                if (!opts.multiple || i == numberOfAccordions - 1) {// add expand all button either to every one, or to the last one
                    $(this).after(toggleButtons({ className: 'ui-expand-collapse-toggle-after'}, myID));
                }

                $('.ui-expand-collapse-toggle a').click(function (event) {
                    var selector = $(this).hasClass("ui-expand-all") ? ".ui-accordion-header:not(.ui-state-active)" : ".ui-state-active";
                    (!opts.multiple ? $($(this).attr("target")).find(selector) : $(".ui-expandable-accordion " + selector)).click();
                    event.preventDefault();
                });
            }
        });
    };
    $.fn.expandableAccordion.defaults = {
        firstOpen: false, // will the first item in the nav be open
        multiple: false, //  should there be one set of toggle controls for all accordions on the page
        toggleDivider: false, // should I try to render a divider between the toggle controls?
        toggleControls : true, // controls to expand/collapse all elements of one or several accordions
        hideRedundantToggles:true, // Hide the collapse button when all elements are collapsed and visa versa
        useBBQ:false // use Ben Almans BBQ hash state plugin to store status of accordion // TODO: experiment with pushState
    };
})(jQuery);