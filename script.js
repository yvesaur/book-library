const bookmarkList = [];
const addBookForm = document.getElementById("addBookForm");
const bookmarkListContainer = document.querySelector(".bookmark-list");

function Book(bookID, title, author, pages, year, haveRead) {
	this.bookID = bookID;
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.year = year;
	this.haveRead = haveRead;
}

const bookInit = new Book(
	crypto.randomUUID(),
	"How to Win Friends and Influence People",
	"Dale Carnegie",
	400,
	2020,
	true
);
bookmarkList.push(bookInit);

// const bookmarkTemplate = document.querySelector(".bookmark");
// const bookmarkTemplateClone = bookmarkTemplate.content.cloneNode(true);
function populateBookmarkList(bookName, author, pages, year, haveRead) {
	bookmarkListContainer.removeChild(document.querySelector("button"));
	console.log("Have Read Value: " + haveRead);
	bookmarkListContainer.innerHTML += `
		<div class="bookmark">
			<h3 class="book-title">${sanitizeFormInputs(bookName)}</h3>
			<p class="book-data">
				<b>Author:</b> ${sanitizeFormInputs(author)} <br />
				<b>Pages:</b> ${sanitizeFormInputs(pages)} <br />
				<b>Year:</b> ${sanitizeFormInputs(year)} <br />
			</p>
			<div class="book-status">
				<p>Read:</p>
				<label
					class="toggle"
					for="readButton">
					<input
						class="toggle__input"
						type="checkbox"
						id="readButton" 
						${haveRead && "checked"}
						/>
					<div class="toggle__fill"></div>
				</label>
			</div>
		</div>

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

	const bookName = formElements.elements["bookName"].value;
	const author = formElements.elements["bookAuthor"].value;
	const pages = formElements.elements["bookPages"].value;
	const year = formElements.elements["bookYear"].value;
	const haveRead = formElements.elements["haveReadToggle"].checked;

	bookmarkList.push(
		new Book(crypto.randomUUID(), bookName, author, pages, year, haveRead)
	);

	// console.log(bookmarkList);
	populateBookmarkList(bookName, author, pages, year, haveRead);
}

addBookForm.addEventListener("submit", (e) => addBooktoLibrary(e));
