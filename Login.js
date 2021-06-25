const txtEmail = document.getElementById("signEmail")
const txtPassword = document.getElementById("signPassword")
const btnLogin = document.getElementById("Loginbtn");
var uid;
document.getElementById("Loginbtn").addEventListener('click', e => {
//Login verification code
    e.preventDefault();
    const email = txtEmail.value;
    const password = txtPassword.value;
    const auth = firebase.auth();
    localStorage.setItem('email', email)
    localStorage.setItem('password', password)
    const promise = auth.signInWithEmailAndPassword(email, password);
    promise.then(e => {
        uid = e.user.uid;
        localStorage.setItem('uid', e.user.uid)

        db.collection('users').doc(uid).get().then(snapshot => {
            alert("Hello " + snapshot.data().Name + "!\r\nWelcome to Crackit!!")
            localStorage.setItem("location", snapshot.data().Location)
            location.href = "AfterSignin.html";
        })

    })
    promise.catch(e => {
        console.log(e.message)
        alert(e.message);
    })
}
)

document.getElementById("forgotPassword").addEventListener('click', e => {
//function forgotPassword(){
      e.preventDefault();
      alert("in forgotpassword")
      var auth = firebase.auth();
      const email = document.getElementById('signEmail').value
      if(email !== "")
      {
          auth.sendPasswordResetEmail(email).then(function(){
                window.alert("email has been sent")
          })
          .catch(function(error){
              alert(error.message)
              console.log(error.message)
          })
      }
  }
)
/*document.getElementById("forgotPassword").addEventListener('click', e => {
    //In case the user forgets the password
    e.preventDefault();
    var email = txtEmail.value;
    var auth = firebase.auth()
    alert(email)
    if (email !== "") {
        
        auth.sendPasswordResetEmail(email).then(function()
        {
            alert("Email has been sent to you. Please check.")
        })
        .catch(function(e){
                const errorMessage = e.message
                alert(errorMessage)
                console.log(errorMessage)
            })
    } else {
        alert("Please enter your email first")
    }
})*/

function show() {
    //Code for viewing typed pasword
    var icon = document.getElementById("icon")
    if (txtPassword.type === "password") {
        txtPassword.type = "text"
        icon.style.color = "grey"
    } else {
        txtPassword.type = "password"
        icon.style.color = '#eeeeee';
    }
}




