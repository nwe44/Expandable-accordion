(function( $ ){
	// heavilly cut down version of jquery ui accordion 
	// only use for expand all functionality 
	// author: Nick Evans (based based on jquery ui accordion)
	var methods = {
    init : function( options ) { 
	    return this.each(function(){
	    	// add the expand all markup in js so non-js users, who will never be able to use it
	    	// never see it, they'll never miss it after all.
	    	$(this).before("<div class='ui-expand-collapse-toggle-before clearfix'><a href='#' class='ui-expand-all'>Expand all</a> <a href='#' class='ui-collapse-all'>Collapse all</a></div>");
	    	$(this).after("<div class='ui-expand-collapse-toggle-after clearfix'><a href='#' class='ui-expand-all'>Expand all</a> <a href='#' class='ui-collapse-all'>Collapse all</a></div>");
	    	$(this).prev('.ui-expand-collapse-toggle-before').find('.ui-expand-all').click(function(event){
	    		$(this)
	    		.parent()
	    		.next('.ui-expandable-accordion')
	    		.find(".ui-accordion-header")
	    		.each(function(){
	    			if(!$(this).hasClass('ui-state-active')){$(this).trigger('click');}
	    		});
	    		event.preventDefault();
	    	});
	    	$(this).next('.ui-expand-collapse-toggle-after').find('.ui-expand-all').click(function(event){
	    		$(this)
	    		.parent()
	    		.prev('.ui-expandable-accordion')
	    		.find(".ui-accordion-header")
	    		.each(function(){
	    			if(!$(this).hasClass('ui-state-active')){$(this).trigger('click');}
	    		});
	    		event.preventDefault();
	    	});
	    	$(this).prev('.ui-expand-collapse-toggle-before').find('.ui-collapse-all').click(function(event){
	    		$(this)
	    		.parent()
	    		.next('.ui-expandable-accordion')
	    		.find(".ui-accordion-header.ui-state-active")
	    		.trigger('click');
	    		event.preventDefault();
	    	});
	    	$(this).next('.ui-expand-collapse-toggle-after').find('.ui-collapse-all').click(function(event){
	    		$(this)
	    		.parent()
	    		.prev('.ui-expandable-accordion')
	    		.find(".ui-accordion-header.ui-state-active")
	    		.trigger('click');
	    		event.preventDefault();
	    	});
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

			});

			

     },
    show : function( ) { },
    hide : function( ) { },
    update : function( content ) { }
  };

	$.fn.expandableAccordion = function( method ) {
		if ( methods[method] ) {
		  return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
		  return methods.init.apply( this, arguments );
		} else {
		  $.error( 'Method ' +  method + ' does not exist on jQuery.expandableAccordion' );
		} 
	}
})(jQuery);
