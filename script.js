function Book(bookID, title, author, pages, year, haveRead) {
	this.bookID = bookID;
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.year = year;
	this.haveRead = haveRead;
}

const bookmarkList = [];
const addBookForm = document.getElementById("addBookForm");
const bookmarkListContainer = document.querySelector(".bookmark-list");

function populateBookmarkList(bookmarkList) {
	bookmarkListContainer.innerHTML = "";

	for (let i = 0; i <= bookmarkList.length - 1; i++) {
		bookmarkListContainer.innerHTML += `
		<div class="bookmark" data-bookID="${bookmarkList[i].bookID}">
			<h3 class="book-title">${sanitizeFormInputs(bookmarkList[i].title)}</h3>
			<p class="book-data">
				<b>Author:</b> ${sanitizeFormInputs(bookmarkList[i].author)} <br />
				<b>Pages:</b> ${sanitizeFormInputs(bookmarkList[i].pages)} <br />
				<b>Year:</b> ${sanitizeFormInputs(bookmarkList[i].year)} <br />
			</p>
			<div class="book-status">
				<p>Read:</p>
				<label
					class="toggle"
					for="toggle-${bookmarkList[i].bookID}}">
					<input
						class="toggle__input"
						type="checkbox"
						id="toggle-${bookmarkList[i].bookID}}" 
						${bookmarkList[i].haveRead && "checked"}
						/>
					<div class="toggle__fill"></div>
				</label>
			</div>
		</div>
		`;
	}

	bookmarkListContainer.innerHTML += `
		<button
			onclick="addBtn.showModal()"
			class="add-bookmark"
			type="submit">
				<img
					style="height: 3rem"
					src="./assets/img/plus.svg"
					alt="add bookmark icon" />
		</button>
	`;
}

// Sanitize the string inputs to avoid XSS vulnerabilities
function sanitizeFormInputs(str) {
	return String(str)
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");
}

function addBooktoLibrary(e) {
	const formElements = e.target;

	const bookID = crypto.randomUUID();
	const bookName = formElements.elements["bookName"].value;
	const author = formElements.elements["bookAuthor"].value;
	const pages = formElements.elements["bookPages"].value;
	const year = formElements.elements["bookYear"].value;
	const haveRead = formElements.elements["haveReadToggle"].checked;

	bookmarkList.push(new Book(bookID, bookName, author, pages, year, haveRead));

	populateBookmarkList(bookmarkList);
	addBookForm.reset();
}

addBookForm.addEventListener("submit", (e) => addBooktoLibrary(e));
