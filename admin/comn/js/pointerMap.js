class PointerMap {
	constructor(option){
		this.className = {
			container: "pointerMap",
			img: "pointerMap-img",
			displayPointers: "pointerMap-displayPointers",
			pointers: "pointerMap-pointers",
			pointer: {
				container: "pointerMap-pointer",
				index: "pointerMap-pointer-index",
				coords: "pointerMap-pointer-coords",
				select: "pointerMap-pointer-select select",
				btns: "pointerMap-pointer-btns",
				btn: "pointerMap-pointer-btn",
				btnSave: "pointerMap-pointer-btn-savePointer",
				btnUpdate: "pointerMap-pointer-btn-updatePointer",
				btnRemove: "pointerMap-pointer-btn-removePointer",
			},
			sidebar: {
				container: "pointerMap-sidebar",
				btnToggle: "pointerMap-sidebar-btnToggle"
			},
			places: "pointerMap-places",
			place: {
				container: "pointerMap-place",
				index: "pointerMap-place-index",
				btn: "pointerMap-place-btn",
				btns: "pointerMap-place-btns",
				btnCreatePointer: "pointerMap-place-btn-createPointer",
			},
			displayPointer: "pointerMap-displayPointer",
			currentCoords: {
				x: "pointerMap-currentCoords-x .value",
				y: "pointerMap-currentCoords-y .value",
			},
			search: "pointerMap-search input",
			miniMap: {
				container: "pointerMap-miniMap",
				img: "pointerMap-miniMap-img",
				screen: "pointerMap-miniMap-screen",
				btnToggle: "pointerMap-miniMap-btn",
				displayPointers: "pointerMap-miniMap-displayPointers",
			}
		};
		
		this.displayPointerSize = {
			width:93,
			height:93
		};
		
		this.miniMap = option.miniMap ? option.miniMap : {
			zoom: 0.1,
		};
		
		this.onPointerRemove = option.onPointerRemove;
		
		this.onPointerUpdate = option.onPointerUpdate;
		
		this.onPointerSave = option.onPointerSave;
		
		this.targetIndex = null;
		
		this.currentCoords = {
			x: 0,
			y: 0,
		};
		
		this.places = option.places ? option.places : [];
		
		this.targetPlace = null;
		
		this.word = "";
		
		/*
		[{
			id: 1,
			title: "장소1"
		}]
		*/
		
		this.pointers = option.pointers ? option.pointers : [];
		
		this.originPointer = null;
		
		this.currentCoords = {
			x: 0,
			y: 0,
		};
		
		this.currentCenterCoords = option.currentCenterCoords ? option.currentCenterCoords : null;
		
		this.pointer = {
			x: 0,
			y: 0,
			place_id: null,
		};
		
		this.init();
	}
	
	init(){
		let self = this;
		
		this.createPlacesEl();
		
		this.createPointersEl();
		
		$(document).mousemove(function(event) {
			self.currentCoords.x = event.pageX;
			self.currentCoords.y = event.pageY;
			//$("." + self.className.currentCoords).text(event.pageX + "," + event.pageY);
		});
		
		$("." + this.className.search).on("input", function(event){
			self.word = event.target.value;
			
			self.createPlacesEl();
		});
		
		$("." + this.className.sidebar.btnToggle).click(function(){
			$("." + self.className.sidebar.container).toggleClass("fold");
		});
		$("body").scrollLeft(500);
		
		setTimeout(function(){
			self.createMiniMapEl();
			
			$("." + self.className.currentCoords.x).text(parseInt($("." + self.className.miniMap.screen).width() / 2) / self.miniMap.zoom);
			$("." + self.className.currentCoords.y).text(parseInt($("." + self.className.miniMap.screen).height() / 2) / self.miniMap.zoom);
		}, 100);
		
		$(window).scroll(function(){
			$("." + self.className.miniMap.screen)
				.css("top", $(this).scrollTop() * self.miniMap.zoom)
				.css("left", $(this).scrollLeft() * self.miniMap.zoom);
			
			$("." + self.className.currentCoords.x).text(parseInt($(this).scrollLeft()) + parseInt($("." + self.className.miniMap.screen).width() / 2) / self.miniMap.zoom);
			$("." + self.className.currentCoords.y).text(parseInt($(this).scrollTop()) + parseInt($("." + self.className.miniMap.screen).height() / 2) / self.miniMap.zoom);
		});
		
		setTimeout(function(){
			if(self.currentCenterCoords){
				self.moveScreen(parseInt(self.currentCenterCoords.x) - $(window).width() / 2, self.currentCenterCoords.y - $(window).height() / 2);
			}
		}, 1000);
	}
	
	getCurrentCenterCoordinates(){
		return {
			x: $("." + this.className.currentCoords.x).text(),
			y: $("." + this.className.currentCoords.y).text()
		}
	}
	
	createMiniMapEl(){
		// 스크롤 생길때만 미니맵 만들기 처리 추가 필요
		let img = $("." + this.className.img);
		let container = $("html");
		let self = this;
		
		$("." + this.className.miniMap.container)
			.width(img.width() * this.miniMap.zoom)
			.height(img.height() * this.miniMap.zoom);
		
		$("." + this.className.miniMap.screen)
			.width(container.width() * this.miniMap.zoom)
			.height(container.height() * this.miniMap.zoom);
		
		$("." + this.className.miniMap.screen).draggable({
			'scroll':false,
			containment:'parent', //부모 요소 안에서만 이동 범위 제한
			drag: function( event, ui ) {
				container.scrollTop(ui.position.top / self.miniMap.zoom);
				container.scrollLeft(ui.position.left / self.miniMap.zoom);
			}
		});
		
		$("." + this.className.miniMap.btnToggle).click(function(){
			$("." + self.className.miniMap.container).toggleClass("fold");
		});
		
		this.createMiniMapDisplayPointersEl();
	}
	
	createMiniMapDisplayPointersEl(){
		let self = this;
		
		$("." + this.className.miniMap.displayPointers).html("");

		this.pointers.map(function(pointer){
			$("." + self.className.miniMap.displayPointers).append("<div class='pointerMap-miniMap-displayPointer' style='width:" + (self.displayPointerSize.width * self.miniMap.zoom) + "px; height:" + (self.displayPointerSize.height * self.miniMap.zoom)   + "px; left:" + (pointer.x * self.miniMap.zoom) + "px; top:" + (pointer.y * self.miniMap.zoom)+ "px'></div>")
		});
	}
	
	createPointersEl(){
		let self = this;
		
		$("." +  this.className.pointers).html("");
		$("." +  this.className.displayPointers).html("");
		
		this.pointers.map(function(pointer, index){
			self.createPointer(pointer, index);
		});
		
		this.createMiniMapDisplayPointersEl();
		
	}
	
	createPointer(pointer, index){
		if(!pointer){
			pointer = {
				x: $("html").scrollLeft() + window.innerWidth / 2,
				y: $("html").scrollTop() + window.innerHeight / 2,
				place_id: this.targetPlace.id
			};
			
			this.pointers.push(pointer);
			
			index = this.pointers.length - 1;
		}
		
		this.createPointerEl(pointer, index);
		
	}
	
	createPointerEl(pointer, index){
		let state = pointer.id ? "" : " create ";
		let self = this;
		let foundPlace = this.places.find(function(place){
			return place.id == pointer.place_id;
		});
		
		let pointerEl = "<div class='" + this.className.pointer.container + state + "' data-index='" + index + "'>" +
			/* "<p class='"+ this.className.pointer.index + "'>" + index + "</p>" + */
			"<div class='pointerMap-pointer-mark'></div>" +
			"<div class='pointerMap-pointer-content'>" +
			"<div class='pointerMap-pointer-select'>" +
			foundPlace.title +
			"</div>" +
			"<p class='" + this.className.pointer.coords + "'>" + pointer.x + ", " + pointer.y + "</p>" +
			"</div>" +
			"<div class='" + this.className.pointer.btns + "'>" +
			"<button type='button' class='" + this.className.pointer.btn + " " + this.className.pointer.btnSave + "'></button>" +
			/* "<button type='button' class='" + this.className.pointer.btn + " " + this.className.pointer.btnUpdate + "'>수정</button>" + */
			"<button type='button' class='" + this.className.pointer.btn + " " + this.className.pointer.btnRemove +"'></button>" +
			"</div>" +
			"</div>";
		
		let displayPointerEl = "<div class='pointerMap-displayPointer" + state + "' data-index='" + index + "' style='left:" + pointer.x + "px; top:" + pointer.y + "px'></div>";
		
		$("." + this.className.pointers).append(pointerEl);
		
		$("." + this.className.displayPointers).append(displayPointerEl);
		
		// 포인터 드래그 시
		$("." + this.className.displayPointer + "[data-index='" + index + "']").draggable({
			drag: function( event, ui ) {
				self.changeTarget($(this).attr("data-index"));
				/*if($(this).attr("data-index") != self.targetIndex){
					self.changeTarget($(this).attr("data-index"));
				}*/
				
				self.changeCoords(ui.position);
			}
		});
		
		// 포인터 클릭 시
		$("." + this.className.displayPointer + "[data-index='" + index + "']").click(function(){
			self.changeTarget($(this).attr("data-index"));
		});
		
		$("." + this.className.pointer.container + "[data-index='" + index + "']").click(function(){
			self.changeTarget($(this).attr("data-index"));
			
			self.moveScreen(parseInt(self.pointers[self.targetIndex].x) - $(window).width() / 2, parseInt(self.pointers[self.targetIndex].y) - $(window).height() / 2);
		});
		
		// 포인터 저장 시
		$("." + this.className.pointer.container + "[data-index='" + index + "'] " + "." + this.className.pointer.btnSave).click(function(e){
			e.stopPropagation();
			
			self.changeTarget($(this).parents("." + self.className.pointer.container).index());
			
			self.pointers[self.targetIndex].id
				? self.updatePointer()
				: self.savePointer();
			
			self.originPointer = self.getObjectValue(self.pointers[self.targetIndex]);
		});
		
		// 포인터 삭제 시
		$("." + this.className.pointer.container + "[data-index='" + index + "'] " + "." +  this.className.pointer.btnRemove).click(function(e){
			e.stopPropagation();
			
			if(confirm("정말로 삭제하시겠습니까?")){
				self.removePointer($(this).parents("." + self.className.pointer.container).index());
				
				self.createPlacesEl();
			}
		});
		
		// 포인터 수정 시
		$("." + this.className.pointer.container + "[data-index='" + index + "'] " + "." +  this.className.pointer.btnUpdate).click(function(){
			self.changeTarget($(this).parents("." + self.className.pointer.container).index());
			
			self.updatePointer($(this).parents("." + self.className.pointer.container).index());
		});
		
		// 장소 수정 시
		$("." + this.className.pointer.container + "[data-index='" + index + "'] " + "." +  this.className.pointer.select).change(function(event){
			self.pointers[index].place_id = event.target.value;
		});
		
		// 장소 select 클릭 시 이동 방지
		/*$("." + this.className.pointer.container + "[data-index='" + index + "'] " + "." +  this.className.pointer.select).click(function(event){
			event.stopPropagation();
		});*/
	}
	
	updatePointerEl(){
		let pointer = this.pointers[this.targetIndex];
		let pointerClassName = "." + this.className.pointer.container + "[data-index='" + this.targetIndex + "'] ";
		let displayPointerClassName = "." + this.className.displayPointer + "[data-index='" + this.targetIndex + "']";
		let coords = pointer.x + "," + pointer.y;
		
		$(pointerClassName + "." + this.className.pointer.coords).text(coords);
		
		$(displayPointerClassName).css("left", this.originPointer.x + "px").css("top", this.originPointer.y + "px");
		
		let place = this.places.find(function(place) {
			if(place.id === pointer.place_id)
				return place;
		});
		
		if(place) {
			$(pointerClassName + "." + this.className.pointer.select).val(place.id);
		}
	}
	
	createPlacesEl(){
		let self = this;
		let alreadyUsed = false;
		
		$("." +  this.className.places).html("");
		
		this.places.map(function(place, index){
			alreadyUsed = false;
			
			alreadyUsed = self.pointers.some(function(pointer) {
				return pointer.place_id == place.id;
			});
			
			if(place.title.indexOf(self.word) != -1 && !alreadyUsed){
				self.createPlaceEl(place, index);
			}
			
		});
	}
	
	createPlaceEl(place, index){
		let self = this;
		
		let placeEl = "<div class='" + this.className.place.container + "' data-index='" + index + "'>" +
			"<div class='pointerMap-place-mark'></div>" +
			"<div class='pointerMap-place-content'>" +
			"<div class='pointerMap-place-select'>" +
			place.title +
			"</div>" +
			"</div>" +
			"<div class='" + this.className.place.btns + "'>" +
			"<button type='button' class='" + this.className.place.btn + " " + this.className.place.btnCreatePointer + "'></button>" +
			"</div>" +
			"</div>";
		
		$("." + this.className.places).append(placeEl);
		
		// 생성버튼 클릭 시
		$("." + this.className.place.container + "[data-index='" + index + "'] " + "." + this.className.place.btnCreatePointer).click(function(){
			$(this).parents("." + self.className.place.container).remove();
			
			self.targetPlace = self.places[index];
			
			self.createPointer();
			
			self.changeTarget(self.pointers.length - 1);
			
			self.createMiniMapDisplayPointersEl();
		});
	}
	
	changeTarget(index){
		let confirmUpdate;
		let beforeTarget = this.pointers[this.targetIndex];
		let newTarget = this.pointers[index];
		
		/*if((JSON.stringify(beforeTarget) != JSON.stringify(this.originPointer) || !beforeTarget.id) && this.originPointer){
			confirmUpdate = confirm("수정중이던 포인터를 저장하시겠습니까?");
			
			if(confirmUpdate) {
				beforeTarget.id ? this.updatePointer() : this.savePointer();
			}else{
				this.pointers[this.targetIndex] = this.getObjectValue(this.originPointer);
				
				this.updatePointerEl();
			}
		}*/
		
		this.targetIndex = index;
		
		this.originPointer = this.getObjectValue(newTarget);
		
		$("." + this.className.displayPointer).removeClass("active");
		$("." + this.className.displayPointer).eq(index).addClass("active");
		
		$("." + this.className.pointer.container).removeClass("active");
		$("." + this.className.pointer.container).eq(index).addClass("active");
	}
	
	changeCoords(position){
		this.pointers[this.targetIndex].x  = position.left;
		this.pointers[this.targetIndex].y  = position.top;
		
		this.updatePointerEl();
		
		this.createMiniMapDisplayPointersEl();
	}
	
	removePointer(index){
		
		this.onPointerRemove(this.pointers[index]);
		
		$("." + this.className.displayPointer).eq(index).remove();
		
		this.pointers = this.pointers.filter(function(pointer, dataIndex){
			if(dataIndex !== index){
				return pointer
			}
		});
		
		this.createPointersEl();
	}
	
	updatePointer(){
		this.onPointerUpdate(this.pointers[this.targetIndex]);
		
		$("." + this.className.pointer.container + ".active").removeClass("active");
		$("." + this.className.displayPointer + ".active").removeClass("active");
	}
	
	savePointer() {
		let self = this;
		
		let index = this.targetIndex;
		
		this.onPointerSave(this.pointers[index], function(createdPointer){
			self.pointers[index] = createdPointer;
			
			self.createPointersEl();
			
			$("." + self.className.pointer.container + ".active").removeClass("active");
			$("." + self.className.displayPointer + ".active").removeClass("active");
		});
	}
	
	getObjectValue(object){
		return JSON.parse(JSON.stringify(object));
	}
	
	moveScreen(x, y){
		$("html").scrollLeft(x);
		$("html").scrollTop(y);
	}
}