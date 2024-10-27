let apiQuotes = [];

// New Quote
const newQuote = () =>{
  // Pick random quote from api array
  const quote = apiQuotes[Math.floor(Math.random()* apiQuotes.length)];
  console.log(quote)
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

// On Load
getQuotes()