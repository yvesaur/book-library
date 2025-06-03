function Book(bookID, title, author, pages, year, haveRead) {
	this.bookID = bookID;
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.year = year;
	this.haveRead = haveRead;

	this.deleteBookmark = function (bookIndexToDelete) {
		if (bookIndexToDelete !== -1) {
			bookmarkList.splice(bookIndexToDelete, 1);
			populateBookmarkList(bookmarkList);
		}
	};
}

const bookmarkList = [];
const addBookForm = document.getElementById("addBookForm");

function populateBookmarkList(bookmarkList) {
	// select the bookmark container and clear its contents
	const bookmarkListContainer = document.querySelector(".bookmark-list");
	bookmarkListContainer.innerHTML = "";

	for (let i = 0; i <= bookmarkList.length - 1; i++) {
		bookmarkListContainer.innerHTML += `
		<div class="bookmark" data-bookid="${bookmarkList[i].bookID}">
			<h3 class="book-title">${sanitizeFormInputs(bookmarkList[i].title)} ${
			bookmarkList[i].haveRead && "✅"
		}</h3>
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
				<button class="delete-bookmark">
					<img
						src="./assets/img/delete.svg"
						alt="Delete icon" />
				</button>
			</div>
		</div>
		`;
	}

	// Restore the add bookmark button at the end
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

	// Add delete bookmark functionality for each bookmark
	Array.from(bookmarkListContainer.children).forEach((bookmark) => {
		const deleteButton = bookmark.querySelector(".delete-bookmark");

		const bookIndex = bookmarkList.findIndex(
			(obj) => obj.bookID === bookmark.dataset.bookid
		);

		if (deleteButton) {
			deleteButton.addEventListener("click", () => {
				bookmarkList[bookIndex].deleteBookmark(bookIndex);
			});
		}
	});
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

	// Populate the bookmarkListContainer and reset the form input values
	populateBookmarkList(bookmarkList);
	addBookForm.reset();
}

addBookForm.addEventListener("submit", (e) => addBooktoLibrary(e));
