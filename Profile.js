var newPassword = document.getElementById("newPassword")
const email = localStorage.getItem('email')
const password = localStorage.getItem('password')
document.getElementById("newEmail").value = email;
document.getElementById("newPassword").value = password;
if (localStorage.getItem('sOrT') === "student") {
    //Displays the details of the user if the user is a student
    var grade = localStorage.getItem('Grade')
    document.getElementById("tooltiptext").innerHTML = localStorage.getItem('Name') + "<br>" + "Grade : " + grade
    document.getElementById("field").innerHTML = "<label>Grade:</label><input type='number' class='form-control' id='grade' min='06' max='12' placeholder='Enter Grade'"+ "><label>Location:</label><input type='text' class='form-control' id='location' placeholder='Enter Location'>"    
    document.getElementById('grade').value=grade
    document.getElementById('location').value=localStorage.getItem('location')
    document.getElementById("navbar").innerHTML = "<li><a href='AfterSignin.html' id='nav1'>Questions</a></li><li><a href='YourQuestions.html' id='nav1'>Your Questions</a></li><li><a href='AfterSignin.html' id='nav1'>Chats</a></li><li><a href='Teacher.html' id='nav2'>Teachers</a></li><li><a href='Community.html' id='nav2'>Community</a></li>"
} else {
    //Displays the details of the user if the user is a teacher
    document.getElementById("tooltiptext").innerHTML = localStorage.getItem('Name') + "<br>" + "Teacher"
    var qualification = localStorage.getItem('qualification');   
    var subject1  = localStorage.getItem('sub1');
    var subject2  = localStorage.getItem('sub2');
    var subject3  = localStorage.getItem('sub3');
    document.getElementById("field").innerHTML = "<label>Grades:</label><br><select name='qualification' id='qual'><option value='6-8'>6-8</option><option value='9-10'>9-10</option><option value='11-12'>11-12</option></select><br><br>"+
    "<label>Subjects:</label><br><select name='subject' id='subject1'><option value='' disabled selected>Subject1</option><option value='English'>English</option><option value='Mathematics'>Mathematics</option><option value='Physics'>Physics</option><option value='Chemistry'>Chemistry</option><option value='Biology'>Biology</option></select><br>"+
    "<select name='subject' id='subject2'><option value=''>Subject 2</option><option value='English'>English</option><option value='Mathematics'>Mathematics</option><option value='Physics'>Physics</option><option value='Chemistry'>Chemistry</option><option value='Biology'>Biology</option></select><br>"+
    "<select name='subject' id='subject3'><option value=''>Subject 3</option><option value='English'>English</option><option value='Mathematics'>Mathematics</option><option value='Physics'>Physics</option><option value='Chemistry'>Chemistry</option><option value='Biology'>Biology</option></select><br>"
    document.getElementById("navbar").innerHTML = "<li ><a href='AfterSignin.html' id='nav1'>Questions</a></li><li><a href='YourQuestions.html' id='nav1'>Your Questions</a></li>"
    +"<li><a href='tChat.html' id='nav2'>Chats</a></li><li><a href='Community.html' id='nav2'>Community</a></li>"
    document.getElementById("qual").value = qualification
    document.getElementById('subject1').value = subject1
    document.getElementById('subject2').value = subject2
    document.getElementById('subject3').value = subject3
}

document.getElementById("Updatebtn").addEventListener('click', e => {
    e.preventDefault();
    const newEmail = document.getElementById("newEmail").value
    const newPassword1 = document.getElementById("newPassword").value
    firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then(function (userCredentials) {
            //updates the new email of the user
            const promise= userCredentials.user.updateEmail(newEmail)
            promise.catch(e => {
                console.log(e.message)
                alert(e.message);
            })
            promise.then(snapshot=>{
            //upadates the new password of the user
            userCredentials.user.updatePassword(newPassword1)
            if (localStorage.getItem('sOrT') === "teacher") {
                const qualValue = document.getElementById("qual").value
                const subject1 = document.getElementById('subject1').value
                const subject2 = document.getElementById('subject2').value
                const subject3 = document.getElementById('subject3').value
                 //updates all the other details in the database if the user is a teacher
                db.collection("users").doc(userCredentials.user.uid).update({
                    Email:newEmail,
                    Qualification: qualValue,
                    Subject: subject1,
                    Subject2:subject2,
                    Subject3: subject3
                }).then(e=>{
                    //updates the details of the user in local storage
                    localStorage.setItem('qualification', qualValue)
                    localStorage.setItem('sub1', subject1);
                    localStorage.setItem('sub2', subject2);
                    localStorage.setItem('sub3', subject3);
                    localStorage.setItem('email', newEmail);
                    localStorage.setItem('password', newPassword1);
                })
                
            } else {
                const newGrade = document.getElementById('grade').value
                const location = document.getElementById('location').value
                //updates all the other details in the database if the user is a teacher
                 db.collection("users").doc(userCredentials.user.uid).update({
                    Email:newEmail,
                    Grade: newGrade,
                    Location: location,               
                }).then(e=>{
                //updates the details of the user in local storage
                localStorage.setItem('Grade', newGrade)
                localStorage.setItem('location', location)
                localStorage.setItem('email', newEmail);
                localStorage.setItem('password', newPassword1);
            })
            }
            alert("Your Profile has been updated")})
        })
       


}
)

function show() {
//displays the typed password
    var icon = document.getElementById("icon")
    if (newPassword.type === "password") {
        newPassword.type = "text"
        icon.style.color = "grey"
    } else {
        newPassword.type = "password"
        icon.style.color = '#eeeeee';
    }
}
function Signout() {
    firebase.auth().signOut().then(() => {
        location.href = "index.html"
    })
}