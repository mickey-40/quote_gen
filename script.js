const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')

let apiQuotes = [];

// New Quote
const newQuote = () =>{
  // Pick random quote from api array
  const quote = apiQuotes[Math.floor(Math.random()* apiQuotes.length)];
  // Check if author field is blank or Anonymous and replace with 'Unknown
  let author = !quote.author || quote.author === 'Anonymous' ? authorText.textContent = 'Unknown': authorText.textContent = quote.author;
  // Check quote length to determine styling
  let quoteStyle = quote.text.length > 120 ? quoteText.classList.add('long-quote'): quoteText.classList.remove('long-quote');
  quoteText.textContent = quote.text;
}

// Get Quotes from API
const getQuotes = async () => {
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
getQuotes()