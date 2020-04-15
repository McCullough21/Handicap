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
    fetchUser()
    })
    signupButton.addEventListener("click", function(e) {
    signupForm.style.display = "block"
    hideButtons()
    newUser()
    })
  }
   
    function newUser() {
        signupForm.addEventListener("submit", event => {
            
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
    })
}

    function fetchUser() {
      loginForm.addEventListener("submit", function(event) {
      event.preventDefault()
        let name = document.getElementById("name").value
        let password = document.getElementById("password").value
        fetch(`http://localhost:3000/users/${name}/${password}`)
        .then(resp => resp.json())
        .then(json => profileName(json))
    })
}
function profileName(info) {
  hideForms()
  let name = info.username
  head.innerText = `${name}'s ${head.innerText}`
  fetchScores(info.id)
  
}



    function fetchCourses() {
      newScoreButton.addEventListener("click", function() {
        scoreForm.style.display = "block"
        
      fetch("http://localhost:3000/courses")
      .then(resp => resp.json())
      .then(json => newScoreForm(json))
    })
    }

    function newScoreForm(info) {
      fetchCourses()
      postScore()
      let courseSelect = document.getElementById("courses")
      info.data.forEach(course => {
        let option = document.createElement("OPTION")
        option.setAttribute("value", `${course.attributes.id}`)
        option.innerText = `${course.attributes.name}`
        courseSelect.appendChild(option)
      })
    }

     function postScore() {
      
       scoreForm.addEventListener("submit", event => {
         event.preventDefault()
        document.getElementById("scoreList").remove()
         let total = document.getElementById("score").value
         let course = document.getElementById("courses").value
         let user = document.getElementById("user").value
         fetch("http://localhost:3000/scores", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
             body:JSON.stringify({"total": total, "course_id": course, "user_id": user})
        })  
       scoreForm.reset() 
        fetchScores(user)
     })
    }

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
            let currentUser = document.getElementById("user")
            currentUser.setAttribute("value", `${user._id}`)
    
        }

    //  need to capture user_id

  //  make seperate button for each course?

  // fetch course, use id in collection select. new score post fetch total, user_id, course_id,
  // reload scores

    

    function populateScores(scores) {
      showLabels()
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
        newScoreButton.style.display = "block"
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
      
  

  