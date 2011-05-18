/*!
*	 jQuery Expandable Accordion
*	 v0.11
*	 author: Nick Evans (based on jquery ui accordion)
*	 See https://github.com/nwe44/Expandable-accordion
*
* 	 This is a heavilly cut down version of jquery ui accordion 
*	 to be used when more than one accordion needs to be open
*	 inspired by the advice at http://jqueryui.com/demos/accordion/
*	 
*/
(function($){

	$.fn.expandableAccordion=function(options){
		varopts=$.extend({},$.fn.expandableAccordion.defaults,options);
		varnumberOfAccordions=this.length;
		varstate=[];
		for(vark=0;$("#ui-expandable-accordion-"+k).length;k++);
	returnthis.each(function(i){
			if($(this).attr('id')){
				varmyID=$(this).attr('id');
			}else{
				varmyID="ui-expandable-accordion-"+(i+k);
				$(this).attr('id',myID);
			}
			$(this).addClass("ui-expandable-accordionui-widgetui-helper-reset")
				//inlackofchild-selectorsinCSS
				//weneedtomarktop-LIsinaUL-accordionforsomeIE-fix
				.children("li")
					.addClass("ui-accordion-li-fix");
				varheaders=">li>:first-child,>:not(li):even";
				variconHeaderSelected="ui-icon-triangle-1-s";
				variconHeader="ui-icon-triangle-1-e";
			$(this).find(headers)
				.addClass("ui-accordion-headerui-helper-resetui-state-defaultui-corner-all")
				.bind("mouseenter.expandableAccordion",function(){
					$(this).addClass("ui-state-hover");
				})
				.bind("mouseleave.expandableAccordion",function(){
					$(this).removeClass("ui-state-hover");
				})
				.bind("focus.expandableAccordion",function(){
					$(this).addClass("ui-state-focus");
				})
				.bind("blur.expandableAccordion",function(){
					$(this).removeClass("ui-state-focus");
				}).bind("click",function(event){
					$(this)
					.toggleClass("ui-state-activeui-corner-top")
					.toggleClass("ui-state-defaultui-corner-all")
					.next().slideToggle()
					.toggleClass("ui-accordion-content-active");//thisiswherethemagichappens
					
					if(opts.useBBQ&&$.bbq&&$(this).attr("id")&&$(this).hasClass("ui-state-active")){
						state[$(this).parent().attr("id")]=$(this).attr("id");
						$.bbq.pushState(state);
					}
					if(opts.toggleControls&&opts.hideRedundantToggles){
						if(!$('#'+myID).find('.ui-accordion-content-active').length){
							//Nothing'sopen,soaddaclasstothecollapsetoggles
							$('#'+myID).prev()
										.find('.ui-collapse-all')
										.addClass('ui-expand-collapse-toggle-disabled')
										.end()
										.find('.ui-expand-all')
										.removeClass('ui-expand-collapse-toggle-disabled');
							$('#'+myID).next()
										.find('.ui-collapse-all')
										.addClass('ui-expand-collapse-toggle-disabled')
										.end()
										.find('.ui-expand-all')
										.removeClass('ui-expand-collapse-toggle-disabled');
										
						}elseif(!$('#'+myID).find('.ui-state-default').length){
							//everything'sopen,soaddaclasstotheexpandtoggles
							$('#'+myID).prev()
										.find('.ui-expand-all')
										.addClass('ui-expand-collapse-toggle-disabled')
										.end()
										.find('.ui-collapse-all')
										.removeClass('ui-expand-collapse-toggle-disabled');
							$('#'+myID).next()
										.find('.ui-expand-all')
										.addClass('ui-expand-collapse-toggle-disabled')
										.end()
										.find('.ui-collapse-all')
										.removeClass('ui-expand-collapse-toggle-disabled');
						}else{
							//it'samix,soenablebothtoggleswitches
							$('#'+myID).prev()
										.find('a')
										.removeClass('ui-expand-collapse-toggle-disabled');
							$('#'+myID).next()
										.find('a')
										.removeClass('ui-expand-collapse-toggle-disabled');
						}
					}
					$(this)
					.children(".ui-icon")
						.toggleClass(iconHeaderSelected)
						.toggleClass(iconHeader);
					event.preventDefault();
				}).next()
				.addClass("ui-accordion-contentui-helper-resetui-widget-contentui-corner-bottom");
			$("<span></span>")
				.addClass("ui-icon"+iconHeader)
				.prependTo($(this).find(headers));
			$(this).children(".ui-icon")
				.toggleClass(iconHeader)
				.toggleClass(iconHeaderSelected);
			$(this).addClass("ui-accordion-icons");
			

			//opensavedstate			
			if(opts.useBBQ&&$.bbq&&$.bbq.getState($(this).attr("id")))
				$(this).find("#"+$.bbq.getState($(this).attr("id"))).not(".ui-state-active").click();
			//openthefirstslideifit'sinthesettingstodoso.
			elseif(opts.firstOpen){$(this).find(".ui-accordion-header").eq(0).click();}
			
			if(opts.toggleControls){
			//addtheexpandallmarkupinjssonon-jsusers,whowillneverbeabletouseit
		//neverseeit,they'llnevermissitafterall.
		
			//first,buildthebuttons
			vartoggleButtons=function(options,thisID){
				varmyClass=$.extend({className:'ui-expand-collapse-toggle-before'},options);
					vartoggler=['<divclass="'+myClass.className+'ui-expand-collapse-toggleclearfix">'];
					toggler.push('<ahref="#"target="#'+thisID+'"class="ui-expand-all">ExpandAll<spanclass="ui-iconui-icon-triangle-1-s"></span></a>');
					if(opts.toggleDivider){toggler.push('<spanclass="ui-expand-collapse-toggle-divider">|</span>');}
					toggler.push('<ahref="#"target="#'+thisID+'"class="ui-collapse-allui-expand-collapse-toggle-disabled">CollapseAll<spanclass="ui-iconui-icon-triangle-1-n"></span></a>');
					toggler.push('</div>');
					returntoggler.join('');
			}
			
			if(!opts.multiple||i==0){//addexpandallbuttoneithertoeveryone,ortothefirstone
				$(this).before(toggleButtons({},myID));
			}
			if(!opts.multiple||i==numberOfAccordions-1){//addexpandallbuttoneithertoeveryone,ortothelastone
				$(this).after(toggleButtons({className:'ui-expand-collapse-toggle-after'},myID));
				}

			$('.ui-expand-collapse-togglea').click(function(event){
				varselector=$(this).hasClass("ui-expand-all")?".ui-accordion-header:not(.ui-state-active)":".ui-state-active";
					(!opts.multiple?$($(this).attr("target")).find(selector):$(".ui-expandable-accordion"+selector)).click();
				event.preventDefault();
			});
		}
		});
	}
	$.fn.expandableAccordion.defaults={
		firstOpen:false,
		multiple:false,
		toggleDivider:false,
		toggleControls:true,
		hideRedundantToggles:true,
		useBBQ:false
	};
})(jQuery);