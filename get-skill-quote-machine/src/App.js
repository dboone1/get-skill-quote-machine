import React, {useEffect, useState} from 'react';
import './App.css';
import {library} from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitterSquare } from '@fortawesome/free-brands-svg-icons'
library.add(faTwitterSquare);


let quoteDBUrl = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"

const COLORS_ARRAY =  ["#7E0505", "#8F05C6", "#1401B2","#03750B", "#04B3A8","#DD0960"];



function App() {
  //const [state, setState] = useState(initialState)

  const [quote, setQuote] = useState("Work is 10% what happens to me and 90% of how I react to it")
  //access to setQuote function

  const[author, setAuthor] = useState("Charles Swindoll")
  
  const[randomNumber, setRandomNumber] = useState(0)

  const[quotesArray, setQuotesArray] = useState(null)

  const[allColors, setColors] = useState('#062138')
  
  //async function to parse url
  
    const fetchQuotes = async (url) => {
      const response = await fetch(url)
      const parsedJSON = await response.json(); //this database has quotes around keys like a JSON object which JS does not accept so it is parsed into acceptable JS 
      setQuotesArray(parsedJSON.quotes) //.quotes set to the actual array instead of key value pair
    }
  useEffect(() => {//run effects after app loads
    fetchQuotes(quoteDBUrl)
  }, [quoteDBUrl])
  
  const changeQuoteAndAuthor0 = () => {
    setQuote("Life lmao");
    setAuthor("Schopenhauer")
  }
  const changeQuoteAndAuthor1 = () => {
    setQuote("Yes");
    setAuthor("Hemingway")
  }
  const changeQuoteAndAuthor2 = () => {
    setQuote("Imposter is sus");
    setAuthor("Obama")
  }

  const getRandomQuote = () => {
    let randomInteger = Math.floor(quotesArray.length*Math.random())
    let randomColor = Math.floor(COLORS_ARRAY.length*Math.random())
    

    setRandomNumber(randomInteger)
    setQuote(quotesArray[randomInteger].quote)
    setAuthor(quotesArray[randomInteger].author)
    setColors(COLORS_ARRAY[randomColor])
  }


  //const OURquotesArray = [{"quote": "Schopenhauer", author:"Life lmao"}, 
  //{quote: "Yes", author:"Hemingway"}, {quote: "Imposter is sus", author:"Obama"}, 
  //{quote: "Everything vibrates, nothing is static", author:"Kybalion"}]
  
  return (
    <div className="App">
      <header className="App-header" style={{backgroundColor:allColors, color :allColors}}>
        <div id ="quote-box" style={{color:allColors}}>
        
        <p id="text">
         "{quote}"
        </p>
        <p id="author">-{author}</p>
        <button id="new-quote" style={{backgroundColor:allColors}}  onClick={() => getRandomQuote()}>
          Generate A Random Number
        </button>
          <div className="buttons">
            <a id="tweet-quote" style={{color:allColors, borderColor:allColors}} 
            href={encodeURI(`https://www.twitter.com/intent/tweet?text=${quote} -${author}`)}>
              <FontAwesomeIcon icon={faTwitterSquare} size="lg" /></a>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
