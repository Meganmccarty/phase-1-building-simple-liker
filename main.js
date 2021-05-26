// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!

const hearts = document.querySelectorAll('.like-glyph');

hearts.forEach(heart => {
    heart.addEventListener('click', () => {
        if (heart.innerText === FULL_HEART) {
            heart.innerText = EMPTY_HEART;
            heart.removeAttribute('class', 'activated-heart');
            console.log('this post has been unliked; no call to server was made');
        } else {
            mimicServerCall()
            .then(response => {
                heart.innerText = FULL_HEART;
                heart.setAttribute('class', 'activated-heart');
                console.log('this post has been liked; server call successful');
            })
            .catch(error => {
                const errorModal = document.querySelector('#modal');
                const errorMessage = document.querySelector('#modal-message');
                errorModal.removeAttribute('class', 'hidden');
                errorMessage.innerText = error;
                setTimeout(() => {
                    errorModal.setAttribute('class', 'hidden');
                }, 3000);
                console.log('this post has been liked; server call failed');
            })    
        }
    })
})




//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
