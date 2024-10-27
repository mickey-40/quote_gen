const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

let apiQuotes = [];

// show loading
const loading = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// hide loading
const complete = () => {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// New Quote
const newQuote = () =>{
  loading();
  // Pick random quote from api array
  const quote = apiQuotes[Math.floor(Math.random()* apiQuotes.length)];
  // Check if author field is blank or Anonymous and replace with 'Unknown
  let author = !quote.author || quote.author === 'Anonymous' ? authorText.textContent = 'Unknown': authorText.textContent = quote.author;
  // Check quote length to determine styling
  let quoteStyle = quote.text.length > 120 ? quoteText.classList.add('long-quote'): quoteText.classList.remove('long-quote');

  // set quote, hide loader
  quoteText.textContent = quote.text;
  complete();
}

// Get Quotes from API
const getQuotes = async () => {
  loading();
  const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json'
  try{
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    alert(error);
    // Catch Error Here
  }
}

// Tweet a quote
const tweetQuote = () => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();
