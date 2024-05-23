const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twittenBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show Loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show New Quote
function newQuote(){

    loading();
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    // ** Remove the ", type.fit" from the Authors text line
    quote.author = quote.author.replace(/(, )?type\.fit/, "");
        
    // Check if Author field is blank or "type.fit" and replace it with 'Unkown'
    if (!quote.author || quote.author === "type.fit") {
        // console.log(quote.author);
        authorText.textContent = 'Unknown';
    } else {
        // console.log(quote.author);
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
    complete();
}

// Get Quotes from API
async function getQuotes(){
   const apiUrl = 'https://type.fit/api/quotes';
   try{
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
   } catch (error){
    // Catch Error Here 
   }   
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listners
newQuoteBtn.addEventListener('click',newQuote);
twittenBtn.addEventListener('click', tweetQuote);


// On Load
getQuotes();