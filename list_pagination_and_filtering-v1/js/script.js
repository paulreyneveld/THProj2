/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Constants collect the two variables required to meet the baseline requirements of this project.
const list = document.querySelectorAll('li');
const itemsPerPage = 10; // This number can be altered to set pagination length.

// The following outputs HTML to the page to allow for the usage of a search bar.
// I've left it in because I succeeded at part of the extra credit. . . .
const newDiv = document.createElement("div");
const newInput = document.createElement("input");
const newButton = document.createElement("button");
newDiv.className = "student-search";
document.querySelector(".page-header").appendChild(newDiv);
document.querySelector(".student-search").appendChild(newInput);
document.querySelector(".student-search").appendChild(newButton);
newButton.textContent = "Search";
newInput.placeholder = "Search for students...";
newInput.type = "text";
newInput.id = "search-input";

// showPage requires a list and a page number. It's called initially
// to show the first 10 elements of the list and then called again
// if the search bar has been used but then left blank again.
function showPage(list, page) {
	const startInd = (page * itemsPerPage) - itemsPerPage;
	const endInd = page * itemsPerPage;
	for (let i = 0; i < list.length; i += 1) {
		if (i < startInd || i >= endInd) {
			list[i].style.display = "none";
		}
		else {
			list[i].style.display = "list-item";
		}
	}
}

// appendPageLinks takes a list and determines how many links will
// be required to navigate the data (dependent on itemsPerPage, see above).
// It then dynamically creates a navigation system for the links.
// It also uses an event listener to highlight the active link. 
function appendPageLinks(list) {
	numOfLinks = Math.ceil(list.length / itemsPerPage);

	let li = document.createElement("LI");
	let newDiv = document.createElement("DIV");
	
	newDiv.className = "pagination";
	document.querySelector(".page").appendChild(newDiv);
	let newUl = document.createElement("UL");
	document.querySelector(".pagination").appendChild(newUl);
	for (let i = 1; i <= numOfLinks; i += 1) {
		newUl.appendChild(li);
		let a = document.createElement("A");
		li.appendChild(a);
		a.href = "#";
		a.innerHTML = i;
		a.addEventListener('click', (e) => {
			showPage(list, e.target.textContent);
			let links = document.querySelectorAll("a");
			for (let i = 0; i < links.length; i += 1) {
				links[i].className = "";
			}
			e.target.className = "active";
		});
	}
	
}

// What follows is my attempt at the extra credit. 
// I wasn't able to get the pagination or 'item not found'
// aspect of the project working, and while I love to exceed
// expecations, I've been banging my head against a wall and 
// need to move on. 

// Obtains search criteria from the DOM 
let searchInput = document.querySelector("#search-input ");

// Searchfun takes two inputs, searchInput and list.
// It dynamically compares the name contained within each
// list item to the searchInput string and outputs 
// the list items that have matching values. 

function searchFun(searchInput, list) {
	for (let i = 0; i < list.length; i += 1) {
		list[i].style.display = 'none';
		let nameSearched = list[i].querySelector(".student-details h3").innerText;
		if (searchInput.value.length != 0 && nameSearched.toLowerCase().indexOf(searchInput.value.toLowerCase()) > -1) {
			list[i].style.display = 'list-item';
		}
		else if (searchInput.value.length == 0) {
			showPage(list, 1);
		}
	}
	
}

// Calls showPage function.
showPage(list, 1);

// Call appendPageLinks function.
appendPageLinks(list);

// Handles search submission on button click.
newButton.addEventListener('click', (e) => {
	event.preventDefault();
	searchFun(searchInput, list);
});

// Handles search as keys are entered into the input box. 
newInput.addEventListener('keyup', (e) => {
	event.preventDefault();
	searchFun(searchInput, list);
});
