// send fetch to find user after user enters name
// render html with user specific info
// gives option to add a new score /// which also gives selection of courses to choose from 
// calculates handicap based on 8 most recent scores

// find() will have to be moved to a method that will take login form info and fetch user data

const loginForm = document.getElementById("login")
const signupForm = document.getElementById("signup")
let loginButton = document.getElementById("loginbutton")
let signupButton = document.getElementById("signupbutton")


document.addEventListener("DOMContentLoaded", () => {
    hideForms()
    formDisplay()
  });

  function hideForms() {
    loginForm.style.display = "none";
    signupForm.style.display = "none";
  }
  function hideButtons() {
    loginButton.style.display = "none"
    signupButton.style.display = "none"
  }

  function formDisplay() {
    loginButton.addEventListener("click", function(e) {
    loginForm.style.display = "block"
    hideButtons()
    fetchUser()
    })
    signupButton.addEventListener("click", function(e) {
    signupForm.style.display = "block"
    hideButtons()
    })
  }

//   class User {
//         constructor(name) {
            

//         }

      function find() {
        fetch("http://localhost:3000/users/1")
        .then(resp => resp.json())
        .then(json => showUser(json))
      }
      function showUser(json) {
          let userName = document.createElement("h4")
          userName.innerText = json.data.attributes.username
            let p = document.getElementById("test")
            p.appendChild(userName)
            
      }

    function fetchUser() {
    let form = document.getElementById("login")
    form.addEventListener("submit", function(event) {
    event.preventDefault()
        let name = document.getElementById("name").value
        let password = document.getElementById("password").value
        fetch(`http://localhost:3000/users/${name}/${password}`)
        .then(resp => resp.json())
        .then(json => console.log(json))
    })
}


    // }
  
//   function test() {
    // let form = document.getElementById("login")
    // form.addEventListener("submit", function(event) {
    //   event.preventDefault()
//       let text = document.getElementById("fname")
//       let h3 = document.createElement("h3")
//       h3.innerText = text.value
//       let main = document.querySelector("h2")
//       main.appendChild(h3)
//     })
    
//   }
      
  

  