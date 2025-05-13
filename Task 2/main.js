let timeStorage = localStorage
let time

if(timeStorage.getItem("time")!= null) {
	time = parseInt(timeStorage.getItem("time"))
}	else {
	time = 300
	timeStorage.setItem("time", time)
}


let answer = [
		["гаррі потер", "harry potter"],
		["губка боб", "gąbka bob"],
		["пірати карибського моря", "Джек Горобець"],
		["сімпсони", "simpsonowie"],
		["зоряні війни", "gwiezdne wojny"],
		["król lew", "король лев"],
		["zimne serce", "холодне серце"],
		["shrek", "шрек"],
		["shrek", "шрек"],
		["rocky", "роккі"],
		["індіанна джонс", "indiana jones"],
		["один в дома", "jeden w domu"],
		["terminator", "термінатор"],
		["назад в майбутнє", "powrót do przyszłości"],
		["мисливці за привидами", "pogromcy duchów"]

 ]		
let was = []
let progress = 0
let num = Math.floor(1 + Math.random() * 9)

console.log(answer[num - 1])
$(document).ready(function() {
	$(".progress").knob({
		"min": 0,
		"max": 10,
		"angleOffset": -60,
		"angleArc": 120,
		"readOnly": true
})
	$(".time").knob({
		"min": 0,
		"max": 300,
		"angleOffset": -60,
		"angleArc": 120,
		"readOnly": true
})
	$(".start").click(function(){
		$(".start").css('display', 'none')
		$(".taskProgress, .timeProgress, .sound, .answer").css('display', 'block')
		startRebus(num)
		startTime()
	})





	startRebus(num)
	$("#btnTask1").click(function(){
		if(answer[num - 1].indexOf($("#inputTask1").val().toLowerCase()) != -1) {
			alertify.success("Right answer!")
			$("#inputTask1").val("")
			progress++
			$(".progress").val(progress).trigger('change')
			was.push(num)
			console.log(was)

			console.log(answer[num - 1])
			if(progress < 10) {
				do{
					num = Math.floor(1 + Math.random() * 9)
				}
					while (was.includes(num))
						console.log(answer[num - 1])
					startRebus(num)
				}	else {
					$(".img, .answer, .taskProgress").css({
						'display' : 'none'
					})
					$("#nextTask").css({
						'display' : 'flex'
					})


					alertify.alert("Game close")
				}

			
		} else {
			alertify.error("Wrong answer. Try again!")
		}
	})
})



function startRebus(arg) {
	$("#melody").attr("src", `sound/${arg}.mp3`)
}

function startTime() {
	setInterval(function() {
		time = parseInt(localStorage.getItem("time")) - 1	
		$(".time").val(time).trigger('change')
		if(time == 0) {
			alertify.error("time is out!")
			setTimeout(()=>window.open("../Task 1/index.html", "_self", false), 2000)
			localStorage.removeItem("time")
		} else if(time > 0) {
			localStorage.setItem("time", time)
		}
		
	}, 1000)
}