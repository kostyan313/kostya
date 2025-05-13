let timeStorage = localStorage
let time

if(timeStorage.getItem("time")!= null) {
	time = parseInt(timeStorage.getItem("time"))
}	else {
	time = 300
	timeStorage.setItem("time", time)
}


let was = []

let progress = 0

let firstCard = null
let secondCard = null

let cards = [
{	
	name: "php",
	img: "https://th.bing.com/th/id/OIP.qF-5pDFdeBN8DhoN2tlBcQHaD3?rs=1&pid=ImgDetMain",
	id: 1
},
{
	name: "c++",
	img: "https://th.bing.com/th/id/OIP.J3gwgUR-rRHYusRAMC7K6AHaHy?rs=1&pid=ImgDetMain",
	id: 2
},
{
	name: "c#",
	img: "https://blog.underc0de.org/wp-content/uploads/2020/09/charp.png",
	id: 3
},
{
	name: "php",
	img: "https://th.bing.com/th/id/OIP.9R_fb34E0UOlINHFR9cenQHaDe?rs=1&pid=ImgDetMain",
	id: 4
},
{
	name: "php",
	img: "https://soyhorizonte.com/wp-content/uploads/2020/10/Javascript-by-SoyHorizonte.jpg",
	id: 5
},
{
	name: "gta5",
	img: "https://th.bing.com/th/id/OIP.GiNMjqimBduVO26VwYqyFwHaEK?rs=1&pid=ImgDetMain",
	id: 6
},
{
	name: "rust",
	img: "https://th.bing.com/th/id/OIP.cRs-0Q124-Qn6JRezcrEsgHaEK?rs=1&pid=ImgDetMain",
	id: 7
},
{
	name: "forza",
	img: "https://th.bing.com/th/id/OIP.7V4T7uaf233N55YieZI7JQHaEK?rs=1&pid=ImgDetMain",
	id: 8
},
{
	name: "metro2033",
	img: "https://th.bing.com/th/id/OIP.1v3IGNlR4McVrbu5YS0PxQHaEo?rs=1&pid=ImgDetMain",
	id: 9
},
{
	name: "nodejs",
	img: "https://th.bing.com/th/id/R.46b18209ee551b9f10cc525b9c8eba6e?rik=F8n5PYbwXy%2fpKg&pid=ImgRaw&r=0",
	id: 10
},
{
	name: "teraria",
	img: "https://th.bing.com/th/id/OIP.1eJML8cHfY1-bQudhteDVQHaEK?rs=1&pid=ImgDetMain",
	id: 11
},
{
	name: "roblox",
	img: "https://th.bing.com/th/id/R.076d146437ffc79cebc36bf2ded91196?rik=C%2f9D3lpgvSBUiw&pid=ImgRaw&r=0",
	id: 12


}
] 
$(document).ready(function() {
	$(".progress").knob({
		"min": 0,
		"max": 12,
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
		startTime()
		fillBoard()
		$(".card").on("click", cardClicked)
	})

 })
	function fillBoard() {
		let board = shuffle([...cards, ...cards])
		for (i = 0; i< board.length; ++i) {
        let cardHTML = 
        `<div class="card" data-id="${board[i].id}">
                <div class="front">ROBOCODE</div>
                <div class="black">
                    <img src="${board[i].img}" alt="">
                </div>
        </div>`
        $('.gameBoard').append(cardHTML)
    }


	}


function shuffle(array) {
  var copy = [], n = array.length, i;

  // While there remain elements to shuffle…
  while (n) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * array.length);

    // If not already shuffled, move it to the new array.
    if (i in array) {
      copy.push(array[i]);
      delete array[i];
      n--;
    }
  }

  return copy;
}

function cardClicked(event) {
	console.log(event)
	if (secondCard || $(this).hasClass('matched')) {
		return
	}

	if (!firstCard) {
		firstCard = $(this)
		firstCard.addClass("flip")
		return
	}

	if (firstCard) {
		secondCard = $(this)
		secondCard.addClass("flip")
		if (firstCard.attr("data-id")== secondCard.attr("data-id")) {
			firstCard.addClass("matched")
			secondCard.addClass("matched")
			firstCard = null
			secondCard = null
			progress++
			$(".progress").val(progress).trigger('change')
			if (progress == 12) {
				alertify.alert("Win")
			}
			return
		} else{
			setTimeout(function(){
				firstCard.removeClass("flip")
				secondCard.removeClass("flip")
				firstCard = null
				secondCard = null
			}, 600)
		}
	}
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