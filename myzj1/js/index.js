$(".card").mouseover(function(){
	$(".menu").show();
	$(".Spfl img").css("transform","rotate(180deg)");
})
$(".card").mouseout(function(){
	$(".menu").hide();
//	$(".content").hide();
})
$(".menu li").mouseover(function(){	
	$(this).find("a").css({
		"color":"#ff5c00"		
	});
	$(this).css({
		"border":"1px solid #ff5c00",
		"border-right":"none",
		"width":"140px",
		"z-index":"10"
	}).siblings($(".menu li")).css({
		"border":"none",
		"width":"138px",
		"z-index":"0"});
	$(".content li").eq($(this).index()).css("display","block").siblings($(".content li")).css("display","none");
	$(".Spfl img").css("transform","rotate(180deg)");
})
$(".menu li").mouseout(function(){	
	$(this).find("a").css({
		"color":"#666666"		
	});
})
$(".content li").mouseout(function(){
	$(this).hide();
	$(".Spfl img").css("transform","rotate(0)");
})
//轮播图
var index = 0;
var timer = setInterval(lbt,2000)
function lbt(){
	index++;
	if(index == $(".x_box span").length){
		index = 0
	}
	$(".x_box span").eq(index).addClass("active").siblings().removeClass("active");
	$(".img_box").stop().animate({"left":index*-1090},2000)
}
$(".x_box span").mouseover(function(){
	clearInterval(timer);
	index = $(this).index()-1;
	lbt()
})
$(".x_box span").mouseout(function(){
	timer = setInterval(lbt,2000)
})
//今日特惠
$.ajax({
	type:"get",
	url:"http://127.0.0.1/myzj1/index.json",
	async:true,
	success:function(res){
		for(var i in res){
			
			$(".Th_box").append(`
							<div>
								<div class="THzc">
										<div class="TH_left"></div> 
										<div class="TH_center">
											<span class="Tsp1">${ res[i].name1}</span>
											<span class="Tsp2">${ res[i].name2}</span>
											<p class="Tsp3">Special deals</p>
										</div>
										<div class="TH_right"></div>
									</div>
									<div class="Th_boxb ${i}">
									
									</div>
							</div>																
								`)			
		}
		for(var k in res){		
			
		    var html = "";
			for(var j =0; j<res[k].list.length; j++ ){				
				var child = res[k].list[j];
				console.log(k)
				html += `
						<div class="moban">				
							<img src="${child.src}" alt="" />							
							<div class="moban_right">
								<h4>${child.title}</h4>
								<div class="xian"></div>
								<span>${child.name}</span>
								<p>￥<span>${child.price}</span>起</p>
								<a href="">点击进入</a>
							</div>
						</div>
						`
			}
			 
			$("."+k).html(html);
		}
					
	}	
})
//动态创建    品牌专区
var str = ""
for(var i =1; i<=16 ; i++ ){
	str += `
			<li><img src="img/pp${i}.jpg" alt="" /></li>
			`
}
$(".pp_right").html(str);
