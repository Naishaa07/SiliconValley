const txtEmail = document.getElementById("Email")
const txtPassword = document.getElementById("password")
const txtName = document.getElementById("Name")
const txtST = document.getElementsByName("optRadio");

function teacherClick() {
    //Code for selecting grade if user is a teacher
    document.getElementById("Grade1").innerHTML = "<select name='qualification' id='qual' onChange='subjectChoice()'><option value='' disabled selected>Grade</option><option value='6-8'>6-8</option> <option value='9-10'>9-10</option> <option value='11-12'>11-12</option></select><br>"
}
function subjectChoice() {
    //Selection of subjects by teacher according to the grade
    if (document.getElementById("qual").value == "6-8") {
        document.getElementById("subjects").innerHTML = "<select name='subject' id='subject'><option value='' disabled selected>Subject1</option><option value='English'>English</option><option value='Mathematics'>Mathematics</option><option value='Science'>Science</option><option value='Regional Language'>Regional Language</option></select><br>"
            + "<select name='subject' id='subject2'><option value='' disabled selected>Subject2</option><option value='English'>English</option><option value='Mathematics'>Mathematics</option><option value='Science'>Science</option><option value='Regional Language'>Regional Language</option><option value=''>None</option></select><br>"
            + "<select name='subject' id='subject3'><option value='' disabled selected>Subject3</option><option value='English'>English</option><option value='Mathematics'>Mathematics</option><option value='Science'>Science</option><option value='Regional Language'>Regional Language</option><option value=''>None</option></select>"

    } else {
        document.getElementById("subjects").innerHTML = "<select name='subject' id='subject'><option value='' disabled selected>Subject1</option><option value='English'>English</option><option value='Mathematics'>Mathematics</option><option value='Physics'>Physics</option><option value='Chemistry'>Chemistry</option><option value='Biology'>Biology</option><option value='Regional Language'>Regional Language</option></select><br>"
            + "<select name='subject' id='subject2'><option value='' disabled selected>Subject2</option><option value='English'>English</option><option value='Mathematics'>Mathematics</option><option value='Physics'>Physics</option><option value='Chemistry'>Chemistry</option><option value='Biology'>Biology</option><option value='Regional Language'>Regional Language</option><option value=''>None</option></select><br>"
            + "<select name='subject' id='subject3'><option value='' disabled selected>Subject3</option><option value='English'>English</option><option value='Mathematics'>Mathematics</option><option value='Physics'>Physics</option><option value='Chemistry'>Chemistry</option><option value='Biology'>Biology</option><option value='Regional Language'>Regional Language</option><option value=''>None</option></select>"
    }
}
function studentClick() {
    //Code for the student to enter the grade and location
    document.getElementById("subjects").innerHTML=""
    document.getElementById("Grade1").innerHTML = "<input type='number' class='form-control' id='grade' min='06' max='12' placeholder='Grade'><br><input type='text' class='form-control' id='location' placeholder='Location'>";
}


var txtGrade = document.getElementById("grade");
document.getElementById("Register").addEventListener('click', e => {
    e.preventDefault();
    const email = txtEmail.value;
    const password = txtPassword.value;
    const name = txtName.value
    var ST
    if (document.getElementById("teacher").checked === false && document.getElementById("student").checked === false) {
        alert("Please enter all the fields ")
    } else {

        if (document.getElementById("teacher").checked === false) {
            //Registration code if the user is a student
            ST = "student"
            const grade = document.getElementById("grade").value;
            const location = document.getElementById("location").value
            if (document.getElementById("Name").value == "" || document.getElementById("grade").value == "" || document.getElementById("location").value == "") {
                alert("Please enter all the fields ")
            } else {
                const promise = firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(cred => {
                        //Store the information in the database
                        db.collection('users').doc(cred.user.uid).set({
                            Email: email,
                            Name: name,
                            Grade: grade,
                            Location: location,
                            studOrTeach: ST,
                            password:password
                        }).then(() => {
                            if(confirm("You have been successfully registered!!")){
                            window.location.href = "Login.html"}
                        });

                    })
                promise.catch(e => {
                    console.log(e.message)
                    alert(e.message);
                })
            }
        } else {
            //Registration if the user is a teacher
            ST = "teacher"
            const qualification = document.getElementById("qual");
            const qualificationValue = qualification.value;
            const subjectValue = document.getElementById("subject").value;
            const subject2Value = document.getElementById("subject2").value;
            const subject3Value = document.getElementById("subject3").value;
            if (document.getElementById("Name").value === "" || document.getElementById("qual").value == "" ||
                document.getElementById("subject").value == "") {
                alert("Please enter all the fields ")
            } else {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(cred => {
                        //Store the information in the database
                        db.collection('users').doc(cred.user.uid).set({
                            Name: name,
                            Email: email,
                            Qualification: qualificationValue,
                            Subject: subjectValue,
                            Subject2: subject2Value,
                            Subject3: subject3Value,
                            studOrTeach: ST,
                            password:password
                        })
                            .then(e => {
                                if(confirm("You have been successfully registered!!")){
                                location.href = "Login.html"}
                            });

                    })
                    .catch(e => {
                        alert(e.message);
                    })
            }
        }

    }
})
function show() {
    //Code to view the typed password
    var icon = document.getElementById("icon")
    if (txtPassword.type === "password") {
        txtPassword.type = "text"
        icon.style.color = "grey"
    } else {
        txtPassword.type = "password"
        icon.style.color = '#eeeeee';
    }
}
