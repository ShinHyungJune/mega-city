$(document).ready(function(){
	$(".btn-down").on("click", function(){
		$(".area_vr .sidebar .menus").scrollTop(parseInt($(".area_vr .sidebar .menus").scrollTop()) + parseInt($(".sidebar .menus .menu").outerHeight() * 10));
	});
	
	$(".btn-up").on("click", function(){
		$(".area_vr .sidebar .menus").scrollTop(parseInt($(".area_vr .sidebar .menus").scrollTop()) - parseInt($(".sidebar .menus .menu").outerHeight() * 10));
	});
	
	$(".area_vr .sidebar .detail > .btn-close").click(function(){
		$(".area_vr .sidebar .detail").removeClass("active");
	});
	
	$(".area_vr .sidebar .menus-wrap > .menus > .menu .btn-icon").click(function(event){
		event.preventDefault();
		
		event.stopPropagation();
		
		$(".area_vr .sidebar .detail").addClass("active");
	});
	
	$(".area_vr .sidebar .menus-wrap > .menus > .menu").click(function(event){
		$(".area_vr .sidebar .menus-wrap > .menus > .menus").hide();
		$(".area_vr .sidebar .menus-wrap > .menus > .menu").removeClass("active");
		$(this).next(".menus").show();
		$(this).addClass("active");
	});
	
	$(".header").removeClass("fold");
	
	$(".area_vr .sidebar .btn-fold").click(function(){
		
		$(".header").toggleClass("fold");
		
		$(this).toggleClass("active");
		
		$(".area_vr .sidebar").toggleClass("active");
	});
	
	$(".m-pop-btn-close").click(function(){
		$(".area_vr .sidebar .menus-wrap > .menus > .menus .btn-icon").removeClass("active");
		
		$(this).parents(".m-pop").removeClass("active");
	});
	
	$(".area_vr .sidebar .menus-wrap > .menus > .menus .btn-icon").click(function(event){
		event.preventDefault();
		
		event.stopPropagation();
		
		$(".area_vr .sidebar .menus-wrap > .menus > .menus .btn-icon").removeClass("active");

		$(this).addClass("active");
		
		$(".m-pop").addClass("active");
	});
	
	$(".area_vr .btn-sound").click(function(){
		$(this).toggleClass("active");
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
	
	if($(window).width() < 768){
		$(".sidebar").removeClass("active");
	}
});