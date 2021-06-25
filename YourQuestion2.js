
var userid = localStorage.getItem('uid')
console.log(userid)
const txt = document.getElementById("txt");
var Name;
var chosenSubject=localStorage.getItem("clickedSubject")
var signinGrade = localStorage.getItem("Grade")
var text
var currentdate = new Date();
var date = currentdate.toString();
var x = 0;
var rName, rMessage, rTime, replyInfo;
document.getElementById("title").innerHTML="Grade"+signinGrade+'-'+chosenSubject
var collection= signinGrade+chosenSubject
var abc = db.collection(collection)
.orderBy("timeStamp", "asc")
.get().then(
    (snapshot) => {

        snapshot.forEach(doc => {
            //retrieving and displaying the questions asked by the user on the page along with the username and time
            var qName = doc.data().name;
            var CreatedAt = doc.data().CreatedAt;
            var qTime = CreatedAt.slice(16, 21)
            var qDate = CreatedAt.slice(4, 15)
            var qMessage = doc.data().text;
            var qUid=doc.data().uid
            db.collection(signinGrade+chosenSubject).doc(doc.id).collection("reply")
                .orderBy("timeStamp", "asc")
                .get().then(
                    (snapshot) => {
                        if(qUid===userid){
                        x = x + 1
                        document.getElementById("Message").innerHTML += "<pre style='background-color:#00adb5; color:#f8f3d4;white-space:pre-wrap;'><div style='background-color:#00adb5; padding:5px; border-radius:10px;margin-bottom:10px;'>"+"<div><p style='font-size:20px;white-space:normal;width:83%;'><b>"
                                + qMessage + '<b/><p/>' + "<p style='margin-top:-5px; text-align:right; margin-left:5px; margin-right:5px'>"
                                + qName + " " + qTime +" "+qDate+ '<p/><div/><pre/>' + '<br/>' +'<p id="replyinfo" style="padding-left: 20px; padding-right: 20px;"></p>' +
                            '<input type="text" class="form-control" id="reply" placeholder="type your reply">' +
                            '<center><button type="button" id="replyButton" onClick="replyButton(this.id)" style="background-color:#00adb5;margin-top:10px; height:40px; width:70px;border-radius:10px; color:#222831;font-weight:bold">Reply</button></center>' 
                            + '<br/>' + '<br/>';
                        document.getElementById('replyinfo').id = "replyinfo" + x;
                        document.getElementById('replyButton').id = "replyButton" + x;
                        document.getElementById('reply').id = "reply" + x;
                        document.getElementById('replyButton' + x).setAttribute('docId', doc.id);
                        document.getElementById('reply' + x).setAttribute('docId', doc.id);
                        document.getElementById('replyButton' + x).setAttribute('no', x);
                        document.getElementById('reply' + x).setAttribute('no', x);


                        snapshot.forEach(doc => {
                             //retrieving and displaying the replies to the user's questions on the page along with the replier's name and time
                            rName = doc.data().name
                            rMessage = doc.data().Message
                            rTime = doc.data().time.slice(16, 21)
                            rDate = doc.data().time.slice(4, 15)
                            rSorT = doc.data().sOrT
                            if (rMessage !== "") {
                                document.getElementById("replyinfo" + x).innerHTML += "<div style='background-color:#00adb5; padding:5px; border-radius:10px;margin-bottom:10px;'>"+"<div><p style='font-size:15px;white-space:normal;width:83%;color:#222831;'><b>"
                                + rMessage + '<b/><p/>' + "<p style='margin-top:-5px; text-align:right; margin-left:5px; margin-right:5px'>"
                                + rName + "("+rSorT+")" +" "+ rTime +" "+ rDate+ '<p/>'+  '<p/><div/>'

                            }
                        })}
                    })
        }
        )
    }
);

function replyButton(clicked_id) {
    //Storing the reply and replier details in the database
    var id = document.getElementById(clicked_id).getAttribute('docId');
    var no = document.getElementById(clicked_id).getAttribute('no');
    const replyMessage = document.getElementById('reply' + no);
    var replyMessage1 = replyMessage.value;
    if (replyMessage1 !== "") {
        db.collection(signinGrade+chosenSubject).doc(id).collection("reply").add({
            Message: replyMessage1,
            time: date,
            name: localStorage.getItem('Name'),
            timeStamp: currentdate,
            sOrT:localStorage.getItem('sOrT')
        }).then(e=>{
        location.reload();
        })
        
    }

}
function Signout(){
firebase.auth().signOut().then(()=>{
 location.href="index.html"
    })
}
if(localStorage.getItem('sOrT')==="student"){
    //navbar for student
    document.getElementById("tooltiptext").innerHTML = localStorage.getItem('Name') + "<br>" +"Grade:"+ localStorage.getItem('Grade')
    document.getElementById("navbar").innerHTML="  <li><a href='AfterSignin.html' id='nav1'>Questions</a></li><li><a href='YourQuestions.html' id='nav1'>Your Questions</a></li><li><a href='tChat.html' id='nav2'>Chats</a></li><li ><a href='Teacher.html' id='nav2'>Teachers</a></li><li><a href='Community.html' id='nav2'>Community</a></li>"
} else{
    //navbar for teacher
    document.getElementById("tooltiptext").innerHTML=localStorage.getItem('Name')+"<br>"+"Teacher"
    document.getElementById("navbar").innerHTML="  <li><a href='AfterSignin.html' id='nav1'>Questions</a></li><li><a href='YourQuestions.html' id='nav1'>Your Questions</a></li><li ><a href='Teacher.html' id='nav2'>Chats</a></li><li><a href='Community.html' id='nav2'>Community</a></li>"
}
