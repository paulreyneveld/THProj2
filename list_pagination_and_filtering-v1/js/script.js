/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

const list = document.querySelectorAll('li');
const itemsPerPage = 10;


let newDiv = document.createElement("div");
let newInput = document.createElement("input");
let newButton = document.createElement("button");
newDiv.className = "student-search";
document.querySelector(".page-header").appendChild(newDiv);
document.querySelector(".student-search").appendChild(newInput);
document.querySelector(".student-search").appendChild(newButton);
newButton.textContent = "Search";
newInput.placeholder = "Search for students...";
newInput.type = "text";
newInput.id = "search-input";
let searchInput = document.querySelector("#search-input");
console.log(list[0].textContent);
function searchFun(searchInput, list) {
	console.log(searchInput);
	console.log(searchInput.value);
	for (let i = 0; i < list.length; i += 1) {
		list[i].style.display = 'none';
		if (searchInput.value.length != 0 && list[i].textContent.toLowerCase().indexOf(searchInput.value.toLowerCase()) > -1) {
			list[i].style.display = 'list-item';
			console.log("I've found it");
		}
	}
	
}

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

showPage(list, 1);
appendPageLinks(list);
newButton.addEventListener('click', (e) => {
	event.preventDefault();
	searchFun(searchInput, list);
	console.log('Submit function is working!');
});

newInput.addEventListener('keyup', (e) => {
	event.preventDefault();
	searchFun(searchInput, list);
	console.log("Keylog is functioning");
});
