if (localStorage.getItem('sOrT') === "student") {
    //navbar for student
    document.getElementById("tooltiptext").innerHTML = localStorage.getItem('Name') + "<br> Grade:" + localStorage.getItem('Grade')
    document.getElementById("navbar").innerHTML = "  <li><a href='AfterSignin.html' id='nav1'>Questions</a></li><li><a href='YourQuestions.html' id='nav1'>Your Questions</a></li><li><a href='tChat.html' id='nav2'>Chats</a></li> <li ><a href='Teacher.html' id='nav2'>Teachers</a></li><li class='active'><a href='Community.html' id='nav2'>Community</a></li>"
} else {
    //navbar for teacher
    document.getElementById("tooltiptext").innerHTML = localStorage.getItem('Name') + "<br>" + "Teacher"
    document.getElementById("navbar").innerHTML = "  <li><a href='AfterSignin.html' id='nav1'>Questions</a></li><li><a href='YourQuestions.html' id='nav1'>Your Questions</a></li> <li ><a href='tChat.html' id='nav2'>Chats</a></li><li class='active'><a href='Community.html' id='nav2'>Community</a></li>"
}
function Signout() {
    firebase.auth().signOut().then(() => {
        location.href = "index.html"
    })
}
function grade1() {
    if (document.getElementById("sub").value == 'teacher') {
        //grade option to be displayed if the user has chosen to view the information of teachers
        document.getElementById("grade").innerHTML = " <select name='sub' id='grades' onchange='changeSub()'><option value='' disabled selected>Grade</option><option value='6-8'>6-8</option> <option value='9-10'>9-10</option> <option value='11-12'>11-12</option><option value=''>All</option></select>"
    } else {       
         //grade option to be displayed if the user has chosen to view the information of students
        document.getElementById("grade").innerHTML = " <input type='number' class='form-control' id='grades' min='06' max='12' placeholder='Grade' onchange='changeSub()'>"
    }
}
var grade = localStorage.getItem('Grade')
function changeSub() {
//function called everytime the user changes the grade or occupation(teacher or student)
    document.getElementById("teachers").innerHTML = ""
    if (document.getElementById("sub").value == 'teacher') {
        //heading of the table to be displayed if the user is a teacher
        document.getElementById("teachers").innerHTML += "  <table class='styled-table'><thead><tr><th>Name</th><th>Grades</th><th>Subject1</th><th>Subject2</th><th>Subject3</th></tr></thead><tbody id='tableInfo'></tbody></table>"
    } else {
//heading of the table to be displayed if the user is a student
        document.getElementById("teachers").innerHTML += "  <table class='styled-table'><thead><tr><th>Name</th><th>Grades</th><th>Locality</th></tr></thead><tbody id='tableInfo'></tbody></table>"

    }
    var sub = document.getElementById("sub").value;
    localStorage.setItem('sub', sub)
    db.collection('users').get().then(

        (snapshot) => {

            snapshot.forEach(doc => {
                if (sub === "teacher") {
                    if (doc.data().studOrTeach === 'teacher') {
                        if (document.getElementById("grades").value == doc.data().Qualification || document.getElementById("grades").value == '') {
                            //Retrieving and displaying data of all the teachers according to the criterias mentioned
                            document.getElementById("tableInfo").innerHTML += "<tr><td>" + doc.data().Name + "</td><td>" + doc.data().Qualification + "</td><td>" + doc.data().Subject + "</td><td>" + doc.data().Subject2 + "</td><td>" + doc.data().Subject3 + "</td></tr>"
                        }
                    }
                }
                if (sub === "student") {
                    if (document.getElementById("grades").value == doc.data().Grade || document.getElementById("grades").value == '') {
                        if (doc.data().studOrTeach == 'student') {
                            //Retrieving and displaying data of all the students according to the criterias mentioned
                            console.log(document.getElementById("grades").value)
                            if (localStorage.getItem('sOrT') === 'teacher') {
                                document.getElementById("tableInfo").innerHTML += "<tr><td>" + doc.data().Name + "</td><td>" + doc.data().Grade + "</td><td>" + doc.data().Location + "</td></tr>"
                            }
                            if (localStorage.getItem('sOrT') === 'student') {
                                document.getElementById("tableInfo").innerHTML += "<tr name=" + doc.id + " id='chat'><td><button  id='chat' name=" + doc.id + " class='tooltiptext' onClick='chat(this.name)'>Chat</button>" + doc.data().Name + "</td><td>" + doc.data().Grade + "</td><td>" + doc.data().Location + "</td></tr>"
                            }
                        }
                    }
                }
            });
        }
    )
}
function chat(clicked_id) {
    //Option to chat with other students if the user is a student
    localStorage.setItem('tId', clicked_id)
    db.collection('users').doc(clicked_id).get().then(function (snapshot) {
        var Tname = (snapshot.data().Name);
        localStorage.setItem('Tname', Tname)
        window.location.href = "chat.html"
        localStorage.setItem('chatType', "s-s")
    })

}
