/* =========================================
   UNTOLD — STORY SCRIPT
========================================= */

const STORY_PASSWORD = "Nimra";


/* PASSWORD */

const passwordScreen =
	document.getElementById("passwordScreen");

const passwordInput =
	document.getElementById("passwordInput");

const unlockBtn =
	document.getElementById("unlockBtn");

const errorMessage =
	document.getElementById("errorMessage");

const storyApp =
	document.getElementById("storyApp");


function unlockStory() {

	const enteredPassword =
		passwordInput.value.trim();

	if (enteredPassword === STORY_PASSWORD) {

		passwordScreen.classList.add("hidden");

		storyApp.classList.remove("hidden");

		document.body.classList.add("unlocked");

		passwordInput.value = "";

		errorMessage.textContent = "";

	} else {

		errorMessage.textContent =
			"Wrong password. Try again.";

		passwordInput.value = "";

		passwordInput.focus();

	}
}


unlockBtn.addEventListener(
	"click",
	unlockStory
);


passwordInput.addEventListener(
	"keydown",
	function(event) {

		if (event.key === "Enter") {
			unlockStory();
		}

	}
);


/* =========================================
   PAGE SYSTEM
========================================= */

const pages =
	document.querySelectorAll(".story-page");

const dots =
	document.querySelectorAll(".dot");

let currentPage = 0;


function showPage(index) {

	if (index < 0) {
		index = 0;
	}

	if (index >= pages.length) {
		index = pages.length - 1;
	}

	pages.forEach(function(page) {
		page.classList.remove("active-page");
	});

	dots.forEach(function(dot) {
		dot.classList.remove("active");
	});

	pages[index].classList.add("active-page");

	if (dots[index]) {
		dots[index].classList.add("active");
	}

	currentPage = index;
}


function nextPage() {

	if (currentPage < pages.length - 1) {
		showPage(currentPage + 1);
	}

}


function previousPage() {

	if (currentPage > 0) {
		showPage(currentPage - 1);
	}

}


function restartStory() {

	showPage(0);

}


/* =========================================
   KEYBOARD
========================================= */

document.addEventListener(
	"keydown",
	function(event) {

		if (event.key === "ArrowRight") {
			nextPage();
		}

		if (event.key === "ArrowLeft") {
			previousPage();
		}

	}
);


/* =========================================
   TOUCH SWIPE
========================================= */

let touchStartX = 0;

let touchEndX = 0;


document.addEventListener(
	"touchstart",
	function(event) {

		touchStartX =
			event.changedTouches[0].screenX;

	}
);


document.addEventListener(
	"touchend",
	function(event) {

		touchEndX =
			event.changedTouches[0].screenX;

		const difference =
			touchStartX - touchEndX;

		if (difference > 60) {
			nextPage();
		}

		if (difference < -60) {
			previousPage();
		}

	}
);
