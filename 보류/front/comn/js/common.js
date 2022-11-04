$(document).ready(function(){
	var agent = navigator.userAgent.toLowerCase();
	
	if ( (navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
		$("body").addClass("ie");
	}
	
	if(navigator.vendor.indexOf("Apple") != -1){
		$("body").addClass("safari");
	}
	
	$(function(){
		AOS.init();
	});
	
	$(".section-cards .btn-filter").click(function(){
		$(".box-options-wrap").addClass("active");
		
		$(".black").fadeIn(300);
	});
	
	/*$(".box-options.type01 + .btns.type01 .btn").click(function(){
		$(".box-options-wrap").removeClass("active");
		
		$(".black").fadeOut(300);
	});*/
	
	$(".section-cards .black, .section-cards .btn-close").click(function(){
		$(".box-options-wrap").removeClass("active");
		
		$(".black").fadeOut(300);
	});

	if($("#app.sub").length){
		$('.btn_top').click(function(){
			$('body, html').animate({"scrollTop": 0}, 200);
		});
		
		$('.btn_down').click(function(){
			$('body, html').animate({"scrollTop": $(document).height() + 'px'}, 200);
		});
	}
	
	$(window).scroll(function(){
		if($("html").scrollTop() < 100){
			$(".btn_top").removeClass("active");
			$(".btn_vr").removeClass("active");
		}else{
			$(".btn_top").addClass("active");
			$(".btn_vr").addClass("active");
		}
		
		if($(window).scrollTop() == $(document).height() - $(window).height()){
			$(".btn_down").removeClass("active");
			$(".btn_vr").addClass("bottom");
		}else{
			$(".btn_down").addClass("active");
			$(".btn_vr").removeClass("bottom");
		}

	});
	
	var leaveSubGnb = false;
	var leaveGnb = false;

	setTimeout(function(){
		$(".icon-scroll").hide(300);
	}, 2000);
	$(".gnb").mouseenter(function(){
		leaveGnb = false;
		leaveSubGnb = false;

		$(".subgnb").removeClass("active");

		$(".subgnb").eq($(this).index()).addClass("active");
	});

	$(".gnb").mouseleave(function(){
		leaveGnb = true;

		if(leaveGnb && leaveSubGnb)
			$(".subgnb").removeClass("active");
	});

	$(".subgnb").mouseleave(function(){
		leaveSubGnb = true;

		if(leaveGnb && leaveSubGnb)
			$(".subgnb").removeClass("active");
	});
	if($(window).width() < 1400) {
		$(".subgnb").click(function () {
			if($(this).hasClass("active")){
				$(".subgnb").removeClass("active");
				$(".subgnb").find(".links").slideUp();
			}else{
				$(".subgnb").removeClass("active");
				$(".subgnb").find(".links").slideUp();
				
				$(this).addClass("active");
				
				$(this).find(".links").slideToggle();
			}
			

		});
	}

	var isActive = false;
	var gnbsEl = $('.subgnbs');
	var blockEl = $('.black');

	setTimeout(function () {
		$(".subgnbs").show();
	}, 1000);

	$('.btn-sidebar').click(function(){
		if($(this).hasClass("active")){
			gnbsEl.animate({right:-250}, 300, function(){
				gnbsEl.removeClass("active");
			});
		}else{
			gnbsEl.addClass("active");
		}
		
		setTimeout(function(){
			$(".btn_top").removeClass("active");
		}, 100);
		
		if(isActive) {
			
			gnbsEl.animate({right:-250}, 300);

			$("html, body, .area_main").css("overflow-y", "auto");

			$(".btn-sidebar").removeClass('active');
			$(".btn-sidebar").children('.hamburger').removeClass('active');
			$(".area_main").css("z-index", "auto");
			
			$("#section01").removeClass("hide");
			
			$(window).scrollTop($("#section01").height())
		}else{
			
			$("html, body, .area_main").css("overflow-y", "hidden");

			$("#section01").addClass("hide");
			
			$(window).scrollTop(0);

			// ;

			gnbsEl.animate({right:0}, 300);

			$(".btn-sidebar").addClass('active');
			$(".btn-sidebar").children('.hamburger').addClass('active');
			$(".area_main").css("z-index", "101");
			
		}

		blockEl.toggle();

		isActive = !isActive;
	});

	// 웹접근성용 gnb 포커스 제어
	/*
	$('.gnb').focusin(function(){
		$('.depth02').removeClass("active");

		$(this).find('.depth02').addClass("active");

	});

	$('.gnb .depth02 a').focusin(function(){
		$('.gnb .depth02').removeClass("active");

		$(this).parents('.depth02').addClass("active");
	});

	 */

	$(".sidebar-toggle-btn").click(function(){
		$(".sidebar").toggleClass("active");
	});

	// sitemap
	var btnSitemap = $('.btn_sitemap');
	var btnClose = $('.sitemap .btn_close_sitemap');
	var siteMap = $('.sitemap.pop');

	btnSitemap.click(function(){
		siteMap.show();

		$('body').css('overflow-y', 'hidden');

	});


	btnClose.click(function(){
		siteMap.hide();

		$('body').css('overflow-y', 'auto');
	});

	// 팝업창 제어
	var target;
	var type;
	var animation;

	$('.btn_open_pop').click(function(){
		$(this).toggleClass('active');

		target = $(this).attr('data-target');

		type = $(this).attr('data-type');

		animation = $(this).attr('data-animation');

		if(type === "toggle"){
			if(animation === "slide")
				return $(target).slideToggle();

			return $(target).toggle();
		}

		if(animation === "slide")
			return $(target).slideDown();

		$(target).show();
		$('#all_search_keyword').focus();
	});

	$('.btn_close_pop').click(function(){
		target = $(this).attr('data-target');

		$(target).hide();
	});

	$('.popup-btn-open').click(function(){
		$(this).toggleClass('active');

		target = $(this).attr('data-target');

		type = $(this).attr('data-type');

		animation = $(this).attr('data-animation');

		if(type === "toggle"){
			if(animation === "slide")
				return $(target).slideToggle();

			return $(target).toggle();
		}

		if(animation === "slide")
			return $(target).slideDown();

		$(target).show();
	});

	$('.popup-btn-close').click(function(){
		target = $(this).attr('data-target');

		$(target).hide();
	});

	// tab
	var tab = $('.tab');
	var tabIndex;
	var tabsWrap;
	var tabsContent;

	tab.click(function(){
		tabsWrap = $(this).parents('.wrap_tabs');

		tab.removeClass('active');

		$(this).addClass('active');

		tabIndex = $(this).index();

		tabsContent = tabsWrap.find('.tabs_content');

		tabsContent.removeClass('active');

		tabsContent.eq(tabIndex).addClass('active');
	});
	
	var tab = $('.m-tabs-tab');
	var tabIndex;
	var tabsWrap;
	var tabsContent;
	
	tab.click(function(){
		tabsWrap = $(this).parents('.m-tabs');
		
		tab.removeClass('active');
		
		$(this).addClass('active');
		
		tabIndex = $(this).index();
		
		tabsContent = tabsWrap.siblings(".m-tabs-contents").find(".m-tabs-content");
		
		tabsContent.removeClass('active');
		
		tabsContent.eq(tabIndex).addClass('active');
	});

	$(".m-tabs.point .m-tabs-tab").click(function(){
		$(".m-tabs.point .m-tabs-content").hide();

		$(this).siblings(".m-tabs-content").show();
		console.log($(this).parents(".m-tabs-fragment"));
	});

	// ellipsis
	setTimeout(function(){
		$('.ellipsis').each(function (index, item) {
			var wordArray = item.innerHTML.split(' ');

			while (item.scrollHeight > item.offsetHeight) {
				wordArray.pop();
				item.innerHTML = wordArray.join(' ') + '...';
			}
		});
	}, 100);

	$('.btn_pop').click(function(){
		$(this).siblings(".contents_pop_wrap").slideToggle();
		$(this).parent(".box_family").toggleClass("close");
	});

	// faq roll
	$(".m-faq-question").on('click',function(){
		$(this).parent(".m-faq").toggleClass("active");
		$(this).siblings(".m-faq-answer").slideToggle();
	});
	
	// responsive table
	var title = null;
	
	$(".m-table-responsive th").each(function(index){
		title = $(this).text();
		
		$(".m-table-responsive tbody tr").each(function(){
			$(this).find("td").eq(index).attr("data-th", title);
		})
	});
	
	var popButton = $(".m-script-pop");
	var target;
	var animation;
	
	popButton.click(function(){
		target = $(this).attr("data-target");
		animation = $(this).attr("data-animation");

		if(animation === "toggle")
			return $(target).toggle();
		
		if(animation === "slideToggle")
			return $(target).slideToggle();
		
		if(animation === "show"){
			$($(this).attr("data-similar")).hide();

			$("." + $(this).attr("class").split(" ")[0]).removeClass("active");
			
			$(this).addClass("active");
			
			return $(target).show();
		}
		
		return $(target).toggle();
	});

	$(".box-options .btn-scrollTop").click(function(){
		$(this).toggleClass("active");
		$(".box-options .box-body").toggle();
	});

});