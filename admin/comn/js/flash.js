class Flash {
	constructor(type, speed){
		this.className = {
			message: "m-flash"
		};
		
		this.index = 1;
		
		this.type = type ? type : "fadeInUp";
		
		this.speed = speed ? speed : 400; // ms
	}
	
	hide(index){
		$("." + this.className.message + "[data-index='" + index + "']").animate({opacity: 0}, 300, 'linear', function(){
			$(this).remove();
		});
	}
	
	show(message){
		let index = this.index;
		let self = this;
		let el = '<div class="m-flash type01" data-index="' + index + '">' + message + '</div>';
	
		$("body").append(el);
		
		$("." + this.className.message + "[data-index='" + index + "']").show();
		
		setTimeout(function(){
			self.hide(index);
		}, 1000);
		
		this.index += 1;
	}
}