var userid = localStorage.getItem('uid')
console.log(userid)
const txt = document.getElementById("txt");
var Name, signinGrade, userName;
var chosenSubject = localStorage.getItem("clickedSubject")
var text
var currentdate = new Date();
var date = currentdate.toString();
var x = 0;
var TName = localStorage.getItem('Tname')
var rName, rMessage, rTime, replyInfo;
if (localStorage.getItem('sOrT') === "student") {
    //navbar
    document.getElementById("navbar").innerHTML = "<li><a href='AfterSignin.html' id='nav1'>Questions</a></li><li><a href='YourQuestions.html' id='nav1'>Your Questions</a></li><li><a href='tChat.html' id='nav2'>Chats</a></li><li><a href='Teacher.html' id='nav2'>Teachers</a></li><li><a href='Community.html' id='nav2'>Community</a></li>"
    document.getElementById('send').addEventListener('click', e => {
        db.collection('users').doc(sId).update({
            //adds the userid of the user to the chats field of the person the user is chatting with in the databsae
            Chats: firebase.firestore.FieldValue.arrayUnion(userid)
        })
        db.collection('users').doc(userid).update({
            //adds the userid of the person that the user is chatting with to the chats field of the user in the database
            Chats: firebase.firestore.FieldValue.arrayUnion(sId)
        })
    })
    var docref = db.collection('users').get().then(
        (snapshot) => {
            snapshot.forEach(doc => {
                if (doc.id === userid) {
                    //retrieve data about the user
                    Name = doc.data().Name
                    signinGrade = doc.data().Grade;
                    localStorage.setItem("sName", Name)
                }
            });
        }
    )
    
    localStorage.setItem('tId', userid)
    document.getElementById("tooltiptext").innerHTML = localStorage.getItem('Name') + "<br>" + "Grade : " + localStorage.getItem('Grade')
}
db.collection('users').get().then(
    (snapshot) => {
        snapshot.forEach(doc => {
            if (doc.id === userid) {
                //retrieve data about the user
                Name = doc.data().Name
            }
        });
    }
)
db.collection('users').doc(localStorage.getItem('sId')).get().then(doc=>{
        localStorage.setItem('otherName', doc.data().Name)
        console.log(doc.data().Name)
        document.getElementById("TeacherName").innerHTML = localStorage.getItem('otherName')
    })
document.getElementById('send').addEventListener('click', e => {
    var text = txt.value;
    e.preventDefault();
    if (text !== '') {
        var xyz = db.collection('users').doc(tId).collection(sId).doc();
        //adding the message sent to the collection of the person the user is contacting
        xyz.set({
            text: text,
            name: Name,
            CreatedAt: date,
            timeStamp: currentdate
        }).then(e => {  
            if(localStorage.getItem('chatType')==="s-s"){
            db.collection('users').doc(sId).collection(tId).doc().set({
                //adding the message sent to the collection of the user
                text: text,
                name: Name,
                CreatedAt: date,
                timeStamp: currentdate
            })}
            location.reload()
        })
    }
})

var sName = localStorage.getItem('sName')
if (localStorage.getItem('sOrT') === "teacher") {
    //navbar for teacher
    document.getElementById("tooltiptext").innerHTML = TName + "<br>" + "Teacher"
    document.getElementById("navbar").innerHTML = "<li ><a href='AfterSignin.html' id='nav1'>Questions</a></li><li><a href='YourQuestions.html' id='nav1'>Your Questions</a></li> <li><a href='tChat.html' id='nav2'>Chats</a></li><li><a href='Community.html' id='nav2'>Community</a></li>"
    localStorage.setItem('tId', userid)
    db.collection('users').doc(userid).get().then((snapshot) => {
        localStorage.setItem('Tname', snapshot.data().Name)
    })
}
var sId = localStorage.getItem('sId')
var tId = localStorage.getItem('tId');

db.collection('users').doc(tId).collection(sId)
    .orderBy("timeStamp", "asc")
    .get().then(
        (snapshot) => {
            snapshot.forEach(doc => {
                //retrieving and displaying the messages exchanged and the sender name and time
                var qName = doc.data().name;
                var CreatedAt = doc.data().CreatedAt;
                var qTime = CreatedAt.slice(16, 21)
                var qMessage = doc.data().text;
                var qDate = CreatedAt.slice(4, 15)
                x = x + 1
                document.getElementById("Message").innerHTML += "<section id='text'>" + "<p style='font-size:20px; margin-right:150px; width:75%; word-wrap:break-word'><b>" + qMessage + '<p/>' +
                    "<p style='color:#eeeee;width:20%;word-wrap:break-word'><p style='margin-top:-20px; text-align:right; margin-left:5px'>"
                    + qName + " " + qTime +" "+qDate+ "<b/><p/>" + "</section>" +
                    '<br/>' + '<br/>';

            })
        })

function Signout() {
    firebase.auth().signOut().then(() => {
        location.href = "index.html"
    })
}
function back() {
    location.href = "Teacher.html"
}
