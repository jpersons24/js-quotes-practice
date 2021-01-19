// Dom elements

const quoteUl = document.querySelector('ul#quote-list')
const quoteForm = document.querySelector('#new-quote-form')


// Event Handlers

quoteForm.addEventListener('submit', function(event){
   event.preventDefault()
   console.log(event.target)

   let quoteInput = quoteForm.querySelector('#new-quote')
   let authorInput = quoteForm.querySelector('#author')
   const newQuoteObj = {
      quote: quoteInput.value,
      author: authorInput.value,
      likes: 0
   }
   newQuote(newQuoteObj)
})

quoteUl.addEventListener("click", function(event){
   const quoteCard = event.target.closest('.quote-card')
    if (event.target.matches(".btn-danger")) {
        // console.log("likes")
        const id = quoteCard.dataset.id
      //   console.log(id)
        deleteQuote(id)
        quoteCard.remove()
    } else if (event.target.matches('.btn-success')) {
      //  console.log(event.target)
       const id = quoteCard.dataset.id
       createLike(id)

       const span = event.target.querySelector("span")
       const numberOfLikes = parseInt(span.textContent) + 1
       span.textContent = numberOfLikes
    }
})


// Render Functions

function renderQuote(quoteObj) {
   const quoteLi = document.createElement("Li")
   quoteLi.className = "quote-card"
   quoteLi.dataset.id = quoteObj.id
   quoteLi.innerHTML =
         `<blockquote class="blockquote">
            <p class="mb-0">${quoteObj.quote}</p>
            <footer class="blockquote-footer">${quoteObj.author}</footer>
            <br>
            <button class='btn-success'>Likes: <span>${quoteObj.likes}</span></button>
            <button class='btn-danger'>Delete</button>
         </blockquote>`

         
   quoteUl.append(quoteLi) 
}

 




// fetch functions
function getQuotes() {
   fetch("http://localhost:3000/quotes?_embed=likes")
      .then(r => r.json())
      .then(quoteArray => {
         console.log(quoteArray)
         quoteArray.forEach(quoteObj => {
         renderQuote(quoteObj)
         })
      })
} 


function newQuote(newQuoteObj){
    fetch("http://localhost:3000/quotes", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newQuoteObj),
    })
    .then( r => r.json())
    .then(newQuote => {
      //   console.log(newQuote)
      renderQuote(newQuote)
    })
}

function deleteQuote(id) {
    fetch(`http://localhost:3000/quotes/${id}`, {
        method: 'DELETE',
    })  
      .then(r => r.json()) 
}

function createLike(id){
    fetch ("http://localhost:3000/likes",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
           quoteId: parseInt(id)
        }),
    })
    .then( response => response.json())
    .then(data => {
        console.log(data)
        data.id 
    })
}



// Initial render

getQuotes()