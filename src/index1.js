getAllQuotes()



// GRAB ELEMENTS FROM THE DOM

// OBJ 1
const quoteList = document.querySelector('#quote-list')

// Obj 2
const newQuoteFrom = document.querySelector('#new-quote-form')



//  EVENT LISTENERS

// OBJ 2
newQuoteFrom.addEventListener('submit', gatherFormData)

// OBJ 3
quoteList.addEventListener('click', function(event) {

   const quoteCard = event.target.closest('li.quote-card')
   const id = quoteCard.dataset.id

   if (event.target.matches('button.btn-danger')) {
      console.log(event.target)
      console.log(quoteCard)
      console.log(id)
      quoteCard.remove()
      deleteQuote(id)
   } else if (event.target.matches('button.btn-success')) {
      console.log('you found the like button', event.target, quoteCard)
      const likeBtn = event.target
      let likeSpan = likeBtn.querySelector('.like-span')
      let currLikes = parseInt(likeSpan.innerHTML)
      let newLikes = currLikes + 1
      console.log(newLikes)
      likeSpan.innerHTML = newLikes
      incLikeCount(id)
   }
})



// NETWORK REQUESTS TO DATABASE

// OBJ 1
function getAllQuotes() {
   fetch("http://localhost:3000/quotes?_embed=likes")
   // take response object and turn the body into json
   .then(response => response.json())
   // .then(addQuotesToDom)  --> same as line below
   .then(data => addQuotesToDom(data))
}

// OBJ 2
function createQuote(quoteObj) {
   fetch("http://localhost:3000/quotes",{
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(quoteObj)
      })
   // running .then gives a 'promise' of a return item that is result of previous callback funtction
   .then(response => response.json())
   .then(addSingleQuoteToDom)
}

// OBJ 3
function deleteQuote(quoteId) {
   fetch(`http://localhost:3000/quotes/${quoteId}`, {
      method: 'DELETE'
   })
      .then(response => response.json())
}

// OBJ 4
function incLikeCount(id) {
   fetch(`http://localhost:3000/likes`, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ quoteId: id }),
   })
   
   // add like object to number of likes in database
}




// DOM MANIPULATION AND LOGIC

// OBJ 1
function addQuotesToDom(allQuotes) {
   allQuotes.forEach(quote => {
      quoteList.innerHTML += 
         `<li class='quote-card' data-id='${quote.id}'>
            <blockquote class="blockquote">
               <p class="mb-0">${quote.quote}</p>
               <footer class="blockquote-footer">${quote.author}</footer>
               <br>
               <button class='btn-success'>Likes: <span class='like-span'>${quote.likes.length}</span></button>
               <button class='btn-danger'>Delete</button>
            </blockquote>
         </li>`
   })
}

// OBJ 2

function addSingleQuoteToDom(singleQuote) {
   quoteList.innerHTML += 
         `<li class='quote-card' data-id='${singleQuote.id}'>
            <blockquote class="blockquote">
               <p class="mb-0">${singleQuote.quote}</p>
               <footer class="blockquote-footer">${singleQuote.author}</footer>
               <br>
               <button class='btn-success'>Likes: <span class='like-span'>${0}</span></button>
               <button class='btn-danger'>Delete</button>
            </blockquote>
         </li>`
}

function gatherFormData(event) {
   event.preventDefault()
   // console.log(event.target)

   const quote = event.target.quote.value
   const author = event.target.author.value

   // const quoteObj = {quote, author}
   const quoteObj = {
      quote: quote,
      author: author
   }

   createQuote(quoteObj)
   event.target.reset()
}










// objective 1:
   // -> send fetch request to gather all data
   // -> take data from fetch request and render to the dom


// objective 2:
   // pessimistically render new quote to page and also send POST fetch request

// ocbjective 3:
   // delete button should remove the correlated quote from the DOM and database