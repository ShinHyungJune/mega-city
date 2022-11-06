// 개발자 수정 필요01 - 회사 인증키값으로 변경
let naver = {
	clientId: "gxg2vo7lgp", // 인증키
	clientSecret: "N0JdQ6AZgSuA3tWOTYm383DozioCbqnnF6TSixbV", // 인증보안키
	drivingUrl: "https://naveropenapi.apigw.ntruss.com/map-direction/v1/driving" // 길찾기요청 url
};

let markers = []; // 마커목록
let infos = []; // 마커정보목록

/*
	@ 기능
	- 지도에 마커, 마커정보 세팅

	@ 입력값
	- items: 위치정보목록

	@ 출력값
	- 생성된 지도객체
*/
function settingMap(items, id){
	// 2020-11-11 #추가부분 (지도 id 전달 받아서 선언도 가능하도록 변경)
	let targetId = id ? id : "map";

	let coordinate = { // 초기좌표
		y: items[0].y,
		x: items[0].x
	};

	let container = document.getElementById(targetId); // 지도를 담을 영역

	let options = { // 지도를 생성할 때 필요한 기본 옵션
		center: new kakao.maps.LatLng(coordinate.y, coordinate.x), // 지도의 중심좌표.
		level: 8 // 지도의 레벨(확대, 축소 정도)
	};

	// 지도객체 생성
	map = new kakao.maps.Map(container, options);

	// 마커 & 마커정보 추가
	items.map(function(item, index) {
		infos.push(addInfo(item));

		markers.push(addMarker(item, index));
	});

	return map;
}

/*
	@ 기능
	- 마커 정보창 생성

	@ 입력값
	- item : 위치정보

	@ 출력값
	- 생성된 마커정보 객체
*/
function addInfo(item){
	return {
		id: item.id,
		content: new kakao.maps.InfoWindow({
			position: new kakao.maps.LatLng(item.y, item.x),
			content: '<div class="infoWindow">' +
					'<p class="infoWindow-title">' +
					item.place_name +
					'</p><p class="infoWindow-subtitle">' +
					item.address_name +
					'</p><a class="infoWindow-link btn type03 type-blue" href="' +
					'https://map.kakao.com/link/to/' + item.place_name + ',' + item.y + ',' + item.x +
					'"target="_blank">길찾기</a>' +
					'</div>',
			removable: true
		})
	}
}

/*
	@ 기능
	- 지도에 마커 추가

	@ 입력값
	- item : 위치정보, index : 노출순서

	@ 출력값
	- 생성된 마커 객체
*/
function addMarker(item, index){
	let targetInfo = null;

	/*let img = {
		src: "../../comn/img/marker" + parseInt(index + 1) + ".png",
		size: new kakao.maps.Size(34,41),
		// 	size: new kakao.maps.Size(45,44)
	};


	img = new kakao.maps.MarkerImage(img.src, img.size);*/

	let marker = {
		id: item.id,
		content: new kakao.maps.Marker({
			map: map,
			position: new kakao.maps.LatLng(item.y,item.x),
			// image: img
		})
	};

	// 마커 클릭 이벤트
	kakao.maps.event.addListener(marker.content, 'click', function(){
		// 열려있던 정보창 닫기
		infos.map(function(info){
			info.content.close()
		});

		// 대상 정보창 열기
		targetInfo = infos.filter(function(info){
			if(info.id === marker.id)
				return true;

			return false;
		})[0];

		if(targetInfo)
			targetInfo.content.open(map, marker.content);
	});

	return marker;
}


/*
	@ 기능
	- 두 위치정보 사이 걸리는 시간, 거리 구하기

	@ 입력값
	- positionA: 위치정보A, positionB: 위치정보B

	@ 출력값
	- void
*/
function getWay(positionA, positionB){
	$.ajax({
		url: naver.drivingUrl,
		data: {
			start: positionA.x + "," + positionA.y,// 출발지 좌표
			goal: positionB.x + "," + positionB.y, // 목적지 좌표
		},
		method: "get",
		headers: {
			"X-NCP-APIGW-API-KEY-ID" : naver.clientId,
			"X-NCP-APIGW-API-KEY" : naver.clientSecret
		},
		success: function(response) {
			console.log("시간: " + response.route.traoptimal[0].summary.duration + "ms");
			console.log("거리: " + response.route.traoptimal[0].summary.distance + "m");
		}
	})
}