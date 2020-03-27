// send fetch to find user after user enters name
// render html with user specific info
// gives option to add a new score /// which also gives selection of courses to choose from 
// calculates handicap based on 8 most recent scores
const loginForm = document.getElementById("login")
const signupForm = document.getElementById("signup")

document.addEventListener("DOMContentLoaded", () => {
    loginForm.style.display = "none";
    signupForm.style.display = "none";
    formDisplay()
    
  });

  function formDisplay() {
    let loginButton = document.getElementById("loginbutton")
    loginButton.addEventListener("click", function(e) {
    loginForm.style.display = "block"
    loginButton.style.display = "none"
    signupButton.style.display = "none"
    })
    let signupButton = document.getElementById("signupbutton")
    signupButton.addEventListener("click", function(e) {
    signupForm.style.display = "block"
    loginButton.style.display = "none"
    signupButton.style.display = "none"
    })
  }

  
//   function test() {
//     let form = document.getElementById("create-task-form")
//     form.addEventListener("submit", function(event) {
//       event.preventDefault()
//       let text = document.getElementById("fname")
//       let h3 = document.createElement("h3")
//       h3.innerText = text.value
//       let main = document.querySelector("h2")
//       main.appendChild(h3)
//     })
    
//   }
      
  

  