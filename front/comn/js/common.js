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

	// header
	$('.header .btn_sitemap').click(function(){

		if( $(this).hasClass("is-active")){
			$('.gnbs.pc .depth02').removeClass("active");
			$('.base_depth02').removeClass("active");
		}else {
			$('.gnbs.pc .depth02').addClass("active");
			$('.base_depth02').addClass("active");
		}

		$(this).toggleClass('is-active')


	});
	
	$('.header .gnb').mouseenter(function(){
		$('.base_depth02').addClass("active");
		$('.gnbs.pc .depth02').addClass("active");
	});
	
	$('.header .gnbs').mouseleave(function(){
		$('.base_depth02').removeClass("active");
		$('.gnbs.pc .depth02').removeClass("active");
		$('.header .btn_sitemap').removeClass("is-active");
	});
	

	var quickMenu = $('.quicks');
	var originTop;
	var footer = $('.footer');
	var bottom;
	var animating = false;
	
	$(window).scroll(function(){
		// header 제어
		if($(window).scrollTop() > 450)
			$('.header').addClass("active");
		else
			$('.header').removeClass("active");
		
		if($(this).scrollTop() < 10)
			$('.btn_top').css("bottom", "-60px");
		else
			$('.btn_top').css("bottom", "20px");
		
		// 퀵메뉴
		if(footer.length){
			bottom = $(window).scrollTop() + quickMenu.height() + 200;
			
			if(footer.offset().top - 30 < bottom) {
				originTop = quickMenu.css('top');
				
				quickMenu.addClass('active');
			}else{
				quickMenu.removeClass('active');
			}
		}

	});
	
	/// gnb hover stick moving animation
	var gnbs = $(".header .pc .gnb");
	var deco = $(".header .gnbs .deco");
	var activeGnb = {
		index: null,
		width: null,
		left: 0
	};
	
	$(".header .pc .gnb").mouseenter(function(){
		deco.addClass("active");
		
		activeGnb = {
			index: $(this).index(),
			width: $(this).width(),
			left:0
		};
		
		gnbs.each(function(index, gnb){
			if(index < activeGnb.index) {
				activeGnb.left += $(gnb).width();
			}
		});
		
		deco.css("left", activeGnb.left)
			.css("max-width", activeGnb.width);
	});
	
	$(".header .pc .deco").mouseenter(function(){
		deco.addClass("active");
	});
	
	$(".header .pc .gnb").mouseleave(function(){
		deco.removeClass("active");
	});

	$('.m .gnb .text').click(function(e){
		if($(this).attr("data-link")){
			//console.log($(this).parent().find('a').length)
			if($(this).parent().find('a').length == 0){
				location.href = $(this).attr("data-link");	
			}
		}
	});

	$('.m .gnb').click(function(){
		$('.gnb').not($(this)).removeClass('active').find('.depth02').slideUp();
		$(this).toggleClass('active').find('.depth02').slideToggle();
	});

	var isActive = false;
	var gnbsEl = $('.header .gnbs.m');
	var topEl = $('.header .links');
	var topEl2 = $('.header .top .btn-VR');
	var blockEl = $('.header .block');

	$('.header .btn_menu').click(function(){
		if(isActive) {
			gnbsEl.animate({left:-250}, 300);
			topEl.animate({left:-250}, 300);
			topEl2.animate({left:-125}, 300);

			$(this).removeClass('active');
			$(this).children('.hamburger').removeClass('active');
		}else{
			gnbsEl.animate({left:0}, 300);
			topEl.animate({left:0}, 300);
			topEl2.animate({left:125}, 300);

			$(this).addClass('active');
			$(this).children('.hamburger').addClass('active');

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

	// sitemap
	var btnSitemap = $('.btn_sitemap button');

	btnSitemap.click(function(){
		$(this).toggleClass("active");
		$(".header").toggleClass("active");
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

	$(".m-tabs").each(function(index, item){
		$(item).find(".m-tabs-tab").eq(0).addClass("active");
		$(item).siblings(".m-tabs-contents").find(".m-tabs-content").eq(0).addClass("active");
	});

	tab.click(function(){
		tabsWrap = $(this).parents('.m-tabs');

		tabsWrap.find(".m-tabs-tab").removeClass('active');

		$(this).addClass('active');

		tabIndex = $(this).index();
		
		tabsContent = tabsWrap.siblings(".m-tabs-contents").find(".m-tabs-content");

		tabsContent.removeClass('active');

		tabsContent.eq(tabIndex).addClass('active');
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
		$(this).siblings(".contents_pop").slideToggle();
	});

	$('.btn_top').click(function(){
		$('body, html').scrollTop(0);
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
	
	if(!animation)
		animation = "toggle";
	
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
	// 카테고리 위치로 스크롤
	/* var cate_cd = 0; // 이 부분이 동적으로 바뀌어야됨
	var cateX = parseInt($('#cate_'+cate_cd).offset().left);
	$('.categories').animate({
		scrollLeft: cateX - 120
	}, 200); */
});