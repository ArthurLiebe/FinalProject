const quoteContainer = document.querySelector('.quote-section');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const saveCommentBtn = document.getElementById('save-comment');
const loader = document.getElementById('loader');



// let apiQuotes = [];

function updateCalendar(date) {
  const event = new CustomEvent('updateCalendar', { detail: date });
  window.dispatchEvent(event);
}

// Loading Spinner Shown
function loading() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// Remove Loading Spinner
function complete() {
  quoteContainer.hidden = false
  loader.hidden = true;
}

// Show New Quote
function newQuote() {
  loading();
  console.log(localQuotes);
  // Pick a random quote from array
  const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
  // Check if Author field is blank and replace it with 'Unknown'
  if (!quote.author) {
    authorText.textContent = 'Unknown';
  } else {
    authorText.textContent = quote.author;
  }
  // Check Quote length to determine styling
  if (quote.text.length > 120) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
  // Set Quote, Hide Loader
  quoteText.textContent = quote.text;
  updateCalendar(new Date());
  complete();
}

// // Get Quotes From API
// async function getQuotes() {
//   loading();
//   const apiUrl = 'https://goquotes-api.herokuapp.com/api/v1/random?count=';
//   try {
//     const response = await fetch(apiUrl);
//     apiQuotes = await response.json();
//     newQuote();
//   } catch (error) {
//     Catch Error Here
//   }
// }

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${authorText.innerText}`;
  window.open(twitterUrl, '_blank');
}
function saveComment() {
  const commentBox = document.getElementById('user-input');
  const currentDate = new Date().toISOString().split('T')[0]; // Format the date as YYYY-MM-DD

  const comment = commentBox.value.trim();

  if (comment === "") {
      alert("Please enter a comment.");
      return;
  }

  const commentData = {
      text: comment,
      date: currentDate
  };

  // Save to localStorage
  let comments = JSON.parse(localStorage.getItem('comments')) || [];
  comments.push(commentData);
  localStorage.setItem('comments', JSON.stringify(comments));

  // Clear the comment box after saving
  commentBox.value = "";
  alert("Comment saved!");
}

// Load comments (if needed for display)
function loadComments() {
  const comments = JSON.parse(localStorage.getItem('comments')) || [];
  comments.forEach(commentData => {
      console.log(`Comment: ${commentData.text}, Date: ${commentData.date}`);
      // You can display these comments on the page if needed
  });
}


// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
console.log(newQuoteBtn)
twitterBtn.addEventListener('click', tweetQuote);
saveCommentBtn.addEventListener('click', saveComment);

// On Load
// getQuotes();
newQuote()