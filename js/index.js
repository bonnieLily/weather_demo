$(function(){

	$.ajax({
		url: 'https://api.asilu.com/weather/weather/',
		type: 'get',
		data: {
			id: 	101280101
		},
		success: function(res){
			// console.log(res)
			var html1 = template('todayTpl',res)
			$('#head').html(html1)

			var html2 = template('dayTpl', res)
			$('#wList').html(html2)

			var today = $(".date")[0]
			today.parentNode.className="today"

			var sunny = $(".sunny")
			var sun = $(".sun")

			var rainy = $('.rainy')
			var rain = $('.rain')

			var cloudy = $('.cloudy')

			var des = "";
			// 判断天气 给预测的天数加上 天气图标
			$('.icon').each(function(index,ele){
				des = ele.getAttribute('data')

				if(des.indexOf('阴')!=-1||des.indexOf('云')!=-1){
					this.innerText="";
				}
				else if(des.indexOf('晴')!=-1){
					this.innerText="";
				}
				else if(des.indexOf('雨')!=-1){
					this.innerText="";
				}
				else{
					this.innerText=""
				}
			})

			// 判断今天属于什么天气 页面打开是 动画出现

			var spanTo = $('.icon')[0]
			if(spanTo.innerText==""){
				cloudy.fadeIn();
				setTimeout(function(){
					cloudy.fadeOut()
				},2300)
			}else if(spanTo.innerText==""){
				rainy.fadeIn();
				setTimeout(function(){
					rainy.fadeOut();
					rain.fadeIn();
				},2300)
			}else if(spanTo.innerText==""){
				sunny.fadeIn();
				setTimeout(function(){
					sunny.fadeOut();
					sun.fadeIn();
				},2300)
			}

			// 给每个li注册事件
			var li = document.getElementById('wList').children

			var degree = document.querySelector('.degree')

			var weather = document.querySelector('.weather')


			$("#wList").on('tap','li',function(){
				// console.log('点我')
				this.style.backgroundColor="rgba(8,0,255,.4)";
				this.style.color="#fff"
				$(this).siblings().css({
					'backgroundColor':"#fff",
					"color":"#333"
				})

				var text = this.children[3].innerText;
				//多云、阴天
				if(text == ""){
					cloudy.fadeIn();

					rainy.fadeOut();
					rain.fadeOut();
					sunny.fadeOut();
					sun.fadeOut();

					setTimeout(function(){
						cloudy.fadeOut()
					},2300);

					getData(weather,degree,this)

				}else if(text == ""){
					rainy.fadeIn();

					cloudy.fadeOut();
					sunny.fadeOut();
					sun.fadeOut();

					setTimeout(function(){
						rainy.fadeOut();
						rain.fadeIn();
					},2300)

					getData(weather,degree,this)

				}else if(text == ""){
					sunny.fadeIn();

					rainy.fadeOut();
					rain.fadeOut();
					cloudy.fadeOut();

					setTimeout(function(){
						sunny.fadeOut();
						sun.fadeIn();
					},2300);

					getData(weather,degree,this)
				}

				// console.log(this)
				//this.getAttribute('data')
				//this是鼠标点击当前日期
				// console.log(this.children[3].innerText)
			})


			var myScroll = new IScroll(document.querySelector('#wrapper'),{
				mouseWhell: true,
				scrollY: true
			})

		},
		dataType: 'jsonp'
	})



})



function getData(weather,degree,obj){
	weather.innerText=obj.getAttribute('data');
	degree.innerText=obj.children[1].innerText;
}