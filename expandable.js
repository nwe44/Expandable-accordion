/*!
*	 heavilly cut down version of jquery ui accordion 
*	 only use for expand all functionality 
*	 author: Nick Evans (based on jquery ui accordion)
*/
(function( $ ){

	$.fn.expandableAccordion = function( options ) {
		var opts = $.extend({}, $.fn.expandableAccordion.defaults, options);
		var numberOfAccordions = this.length;
	    return this.each(function(i){
			if($(this).attr('id')){
				var myID = $(this).attr('id');
			}else{
				var myID =  "ui-expandable-accordion-" + i;
				$(this).attr('id', myID);
			}
			$(this).addClass( "ui-expandable-accordion ui-widget ui-helper-reset" )
				// in lack of child-selectors in CSS
				// we need to mark top-LIs in a UL-accordion for some IE-fix
				.children( "li" )
					.addClass( "ui-accordion-li-fix" );
				var headers = "> li > :first-child,> :not(li):even";
				var iconHeaderSelected = "ui-icon-triangle-1-s";
				var iconHeader = "ui-icon-triangle-1-e";
			$(this).find( headers )
				.addClass( "ui-accordion-header ui-helper-reset ui-state-default ui-corner-all" )
				.bind( "mouseenter.expandableAccordion", function() {
					$( this ).addClass( "ui-state-hover" );
				})
				.bind( "mouseleave.expandableAccordion", function() {
					$( this ).removeClass( "ui-state-hover" );
				})
				.bind( "focus.expandableAccordion", function() {
					$( this ).addClass( "ui-state-focus" );
				})
				.bind( "blur.expandableAccordion", function() {
					$( this ).removeClass( "ui-state-focus" );
				}).bind("click",function(event){
					$(this)
					.toggleClass( "ui-state-active ui-corner-top" )
					.toggleClass( "ui-state-default ui-corner-all" )
					.next().slideToggle()
					.toggleClass( "ui-accordion-content-active"); // this is where the magic happens
					$(this)
					.children( ".ui-icon" )
						.toggleClass( iconHeaderSelected )
						.toggleClass( iconHeader );
					event.preventDefault();
				}).next()
				.addClass( "ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom" );
			$( "<span></span>" )
				.addClass( "ui-icon " + iconHeader )
				.prependTo( $(this).find(headers) );
			$(this).children( ".ui-icon" )
				.toggleClass(iconHeader)
				.toggleClass(iconHeaderSelected);
			$(this).addClass( "ui-accordion-icons" );

			if(opts.toggleControls){
			// add the expand all markup in js so non-js users, who will never be able to use it
	    	// never see it, they'll never miss it after all.
	    	
	    	// first, build the buttons
	    	var toggleButtons = function(options, thisID){
	    		var myClass = $.extend({ className: 'ui-expand-collapse-toggle-before'}, options);
				var toggler = ['<div class="' + myClass.className + ' ui-expand-collapse-toggle clearfix">'];
				toggler.push('<a href=#' + thisID + ' class="ui-expand-all">Expand All <span class="ui-icon ui-icon-triangle-1-s"></span></a>');
				toggler.push('<a href=#' + thisID + ' class="ui-collapse-all ui-expand-collapse-toggle-disabled">Collapse All <span class="ui-icon ui-icon-triangle-1-s"></span></a>');
				toggler.push('</div>');
				return toggler.join('');
	    	}
			// to do: add class to "disable" collapse all button when all elements are collapsed
		    	if(!opts.multiple || i ==0 ){// add expand all button either to every one, or to the first one
			    	$(this).before(toggleButtons({}, myID));
		    	}
		    	if(!opts.multiple || i == numberOfAccordions - 1 ){// add expand all button either to every one, or to the last one
			    	$(this).after(toggleButtons({ className: 'ui-expand-collapse-toggle-after'}, myID));
				}

		    	$('.ui-expand-collapse-toggle a').click(function(event){
		    		var selector = $(this).hasClass("ui-expand-all") ? ".ui-accordion-header:not(.ui-state-active)" : ".ui-state-active";
					(!opts.multiple ? ($($(this).attr("href"))).find(selector) : $(".ui-expandable-accordion " + selector)).click();
		    		event.preventDefault();
		    	});
	    	}
		});
	}
	$.fn.expandableAccordion.defaults = {
		multiple: false,
		toggleControls : true
	};
})(jQuery);