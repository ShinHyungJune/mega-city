$(document).ready(function(){
	/* 스크롤 top버튼 애니메이션 type01
	*  - 스크롤 시 나타나기
	*  - border 사각형으로 한 선씩 그리기
	*  - 선 꽉차면 사각형 색깔 채우기 -> 꿀렁거리기
	* */
	var target = $(".m-animation-top.type01");
	
	var totalHeight = $(document).height();
	
	var scrollTop = Math.round($(window).scrollTop()); // 스크롤 길이는 [문서(document) 전체 길이 - 창(window)의 길이임]
	
	var windowHeight = $(window).height();
	
	var borderEl = {
		top: "<span class='border top'></span>",
		right: "<span class='border right'></span>",
		bottom: "<span class='border bottom'></span>",
		left: "<span class='border left'></span>",
	};
	
	target
		.append(borderEl.top)
		.append(borderEl.right)
		.append(borderEl.bottom)
		.append(borderEl.left);
	
	$(window).scroll(function(){
		scrollTop = Math.round($(window).scrollTop());
		
		console.log()
	});
});