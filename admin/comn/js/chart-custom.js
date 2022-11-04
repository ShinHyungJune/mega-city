function drawLineChart(data){
	var gradientLine01 = data.ctx.createLinearGradient(0, 0, -20, 400);
	gradientLine01.addColorStop(0, 'rgba(80,187,116,.3)');
	gradientLine01.addColorStop(1, 'rgba(80,187,116,0)');
	
	var gradientLine02 = data.ctx.createLinearGradient(0, 0, -20, 400);
	gradientLine02.addColorStop(0, 'rgba(195,132,158,.3)');
	gradientLine02.addColorStop(1, 'rgba(195,132,158,0)');
	
	var chart = new Chart(data.ctx, {
		// The type of chart we want to create
		type: 'line',
		
		// The data for our dataset
		data: {
			labels: data.labels,
			datasets: [{
				label: '회원',
				backgroundColor: "transparent", // 차트 배경색
				fill : "start", // "end" 차트 위쪽, 아래쪽 중 어느쪽에 색깔을 채울지
				borderColor: 'rgb(80,187,116)', // 라인 색깔
				borderWidth: 4, // 라인 넓이(px)
				pointBorderWidth: 3, // 꼭지점 border 넓이
				pointBackgroundColor: "transparent",
				pointBorderColor: "transparent",
				pointRadius: 5,
				data: data.data01,
			},{
				label: '비회원',
				backgroundColor: "transparent", // 차트 배경색
				fill : "start", // "end" 차트 위쪽, 아래쪽 중 어느쪽에 색깔을 채울지
				borderColor: 'rgba(195,132,158,76)', // 라인 색깔
				borderWidth: 4, // 라인 넓이(px)
				pointBorderWidth: 3, // 꼭지점 border 넓이
				pointBackgroundColor: "transparent",
				pointBorderColor: "transparent",
				pointRadius: 5,
				data: data.data02,
			}]
		},
		
		// Configuration options go here
		options: {
			responsive: false,
			scales: {
				xAxes: [{
					gridLines: {
						display:false
					}
				}],
				yAxes: [{
					gridLines: {
						display:true
					}
				}]
			},
			legend: {
				labels: {
					fontFamily: 'Noto Sans KR'
				}
			}
		}
	});
	
	return chart;
}

function drawDoughnutChart(data){
	var chart = new Chart(data.ctx, {
		type: 'doughnut',
		data: {
			labels: data.labels,
			datasets: data.datasets
		},
		options: data.labels
	});
	
	return chart;
}

function drawGageChart(data){
	data.ctx.find(".m-graph-gage-active").css("width", data.active / data.total * 100 + "%");
	
	return data.ctx;
}

function drawChart(type, data){
	switch (type) {
		case "line":
			drawLineChart(data);
			break;
		
		case "doughnut":
			drawDoughnutChart(data);
			break;
		
		case "gage":
			drawGageChart(data);
			break;
	}
}