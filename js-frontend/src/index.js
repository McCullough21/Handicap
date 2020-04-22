// send fetch to find user after user enters name
// render html with user specific info
// gives option to add a new score /// which also gives selection of courses to choose from 
// calculates handicap based on 8 most recent scores

// find() will have to be moved to a method that will take login form info and fetch user data

const loginForm = document.getElementById("login")
const signupForm = document.getElementById("signup")
const loginButton = document.getElementById("loginbutton")
const signupButton = document.getElementById("signupbutton")
const newScoreButton = document.getElementById("new")
const scoreTable = document.getElementById("scores")
const handicapDisplay = document.getElementById("handicap")
const head = document.getElementById("head")
const scoreForm = document.getElementById("newScore")

document.addEventListener("DOMContentLoaded", () => {
    hideForms()
    formDisplay()
    hideLabels()
    fetchCourses()
    
  });

  function hideLabels() {
    handicap.style.display = "none";
    scoreTable.style.display = "none";
    newScoreButton.style.display = "none"

  }

  function showLabels() {
    handicap.style.display = "block";
    scoreTable.style.display = "block"
    
  }
  function hideForms() {
    loginForm.style.display = "none";
    signupForm.style.display = "none";
    scoreForm.style.display = "none"
  }
  function hideButtons() {
    loginButton.style.display = "none"
    signupButton.style.display = "none"
    
  }

  function formDisplay() {
    loginButton.addEventListener("click", function(e) {
    loginForm.style.display = "block"
    hideButtons()
    login()
    })
    signupButton.addEventListener("click", function(e) {
    signupForm.style.display = "block"
    hideButtons()
    newUser()
    })
  }
  
    function newUser() {
        signupForm.addEventListener("submit", event => {
            event.preventDefault()
        let name = document.getElementById("newname").value
        let password = document.getElementById("newpassword").value
        fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
             body:JSON.stringify({"username": name, "password": password})  
        })
        go(name, password)
    })
}

function go(name, password) {
  fetchUser(name, password)
}

function fetchUser(name, password) {
  fetch(`http://localhost:3000/users/${name}/${password}`)
  .then(resp => resp.json())
  .then(json => profileName(json))
}
//  singup is firing fetchuser before user is created
    function login() {
      loginForm.addEventListener("submit", function(event) {
      event.preventDefault()
        let name = document.getElementById("name").value
        let password = document.getElementById("password").value
        fetchUser(name, password)
      })
    }

    

function profileName(info) {
  hideForms()
  showLabels()
  newScoreButton.style.display = "block"
  let name = info.username
  head.innerText = `${name}'s ${head.innerText}`
  let currentUser = document.getElementById("user")
  currentUser.setAttribute("value", `${info.id}`)
  fetchScores(info.id)
}



    function fetchCourses() {
      
      
      newScoreButton.addEventListener("click", event => {
        if (scoreForm.style.display == "block") {
          event.stopPropagation()
        } else {
        scoreForm.style.display = "block"
      fetch("http://localhost:3000/courses")
      .then(resp => resp.json())
      .then(json => newScoreForm(json))
      }
     })
    }

    function newScoreForm(info) {
      
      postScore()
      
      let courseSelect = document.getElementById("courses")
      info.data.forEach(course => {
        let option = document.createElement("OPTION")
        option.setAttribute("value", `${course.attributes.id}`)
        option.setAttribute("name", `${course.attributes.name}`)
        option.innerText = `${course.attributes.name}`
        courseSelect.appendChild(option)
      })
    }

     function postScore() {
      
       scoreForm.addEventListener("submit", event => {
         event.preventDefault()
        
         let total = document.getElementById("score").value
         let courseId = document.getElementById("courses").value
         let user = document.getElementById("user").value
         let courseName = document.getElementById("courses")[courseId - 1].text
         fetch("http://localhost:3000/scores", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
             body:JSON.stringify({"total": total, "course_id": courseId, "user_id": user})
        })  
       scoreForm.reset() 
       updateScoreList(total, courseName)
     })
    }

      function updateScoreList(score, course) {
        let list = document.getElementById("scoreList")
        if (list.childNodes.length > 4) {
          list.lastElementChild.remove()
        } 
        let newScore = document.createElement("h4")
            newScore.innerText = `Score: ${score}  Course: ${course}`
            list.insertBefore(newScore, list.childNodes[0])
        }
    

    // should new score delete last score on page, 
    // then create html seperately from fetching all scores? would still populate and post fetch new score

    function fetchScores(id) {
      
      fetch(`http://localhost:3000/users/${id}`)
        .then(resp => resp.json())
        .then(json => createUserInstance(json))
    }
        function createUserInstance(info) {     
            let user = new User(info)
            info.forEach(score => {
                user.scores.unshift(score)
            })
            populateScores(user.allScores)
            showHandicap(user) 
            // let currentUser = document.getElementById("user")
            // currentUser.setAttribute("value", `${user._id}`)
    
        }

    //  need to capture user_id

  //  make seperate button for each course?

  // fetch course, use id in collection select. new score post fetch total, user_id, course_id,
  // reload scores

    

    function populateScores(scores) {
     
        let list = document.createElement("h3")
        list.setAttribute("id", "scoreList")
        scoreTable.appendChild(list)
        
        let x = scores.slice(0, 5)
        x.forEach(score => {
            let postLine = document.createElement("h4")
            postLine.innerText = `Score: ${score.total}  Course: ${score.course.name}`
            
            list.appendChild(postLine)
        })
    }
    function showHandicap(user) {
        // newScoreButton.style.display = "block"
        handicapDisplay.innerText = `${user._name}'s Handicap:  ${user.handicap}`
    }
    

class User {
    constructor(info) {
        this._name = info[0].user.username
        this._id = info[0].user.id
        this.scores = []
    }
    get allScores() {
        return this.scores
    }

    get handicap() {
        let differentials = []
        this.scores.forEach(score => {
        let dif = (score.total - score.course.rating) * 113 / score.course.slope
        differentials.push(dif)
        })
        let cap = differentials.reduce((previous, current) => current += previous) / differentials.length
        return cap.toFixed(1)
    }
    

     
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
      
  

  