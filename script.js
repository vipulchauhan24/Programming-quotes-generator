const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterbtn = document.getElementById('twitter');
const newquotebtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function loaded() {
    if(!loader.hidden){
        loader.hidden = true;
        quoteContainer.hidden = false;
    }
    
}
async function getQuote() {
    loading();
   try {
    fetch('https://programming-quotes-api.herokuapp.com/quotes/random/lang/en')
    .then (res => res.json())
    .then(data => {
        
        console.log(data.en.length);
        if(data.author === '') {
            quoteAuthor.innerText = 'unknown';
        }
        else {
            quoteAuthor.innerText = data.author;
        }
        if(data.en.length > 50){
            quoteText.classList.add('long-qoute');
        }
        else {
            quoteText.classList.remove('long-qoute');
        }
        quoteText.innerText =   data.en;
    });
       
   } catch (error) {
       console.log('error',error);
   }
    loaded();
}
// tweet quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = quoteAuthor.innerText;
    const twitterurl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterurl, '_blank');
}

// event listeners
newquotebtn.addEventListener('click', getQuote);
twitterbtn.addEventListener('click', tweetQuote);

getQuote();