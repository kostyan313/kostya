let answer = ["річка", "ручка", "годинник","книга", "птах", "лампа", "ноутбук","картина", "вода", "грамота"]
let was = []
let progress = 5
let num = Math.floor(1 + Math.random() * 9)

console.log(answer[num - 1])
$(document).ready(function() {
	$(".progress").knob({
		"min": 0,
		"max": 5,
		"angleOffset": -60,
		"angleArc": 120,
		"readOnly": true


	})
	startRebus(num)
	$("#btnTask1").click(function(){
		if($("#inputTask1").val().toLowerCase() == `${answer[num - 1]}`) {
			$("#inputTask1").val("")
			progress++
			$(".progress").val(progress).trigger('change')
			was.push(num)
			console.log()
			if(progress < 5) {
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
	$("#picture").attr("src", `img/rebus (${arg}).png`)
}
