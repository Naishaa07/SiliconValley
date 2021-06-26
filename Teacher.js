function Signout(){
    firebase.auth().signOut().then(()=>{
     location.href="index.html"
        })
}

var grade=localStorage.getItem('Grade')
//displaying the subjects according to the grade
if(grade<8){
    document.getElementById("sub").innerHTML=" <option disabled selected>Subject</option><option value='English'>English</option><option value='Mathematics'>Mathematics</option><option value='Science'>Science</option><option value='Regional Language'>Regional Language</option>"
}else{
   document.getElementById("sub").innerHTML=" <option disabled selected>Subject</option><option value='English'>English</option><option value='Mathematics'>Mathematics</option><option value='Physics'>Physics</option><option value='Chemistry'>Chemistry</option><option value='Biology'>Biology</option><option value='Regional Language'>Regional Language</option>"
}
document.getElementById("tooltiptext").innerHTML=localStorage.getItem('Name')+"<br> Grade : "+localStorage.getItem('Grade')
function changeSub(){
    document.getElementById("teachers").innerHTML=""
sub = document.getElementById("sub").value;
localStorage.setItem('sub', sub)
db.collection('users').get().then(

    (snapshot) => {

        snapshot.forEach(doc => {
            if (doc.data().studOrTeach === 'teacher' ) {
                //displays all the teachers of your grade according to the subject chosen
                if(doc.data().Subject===localStorage.getItem('sub') || doc.data().Subject2===localStorage.getItem('sub')
                || doc.data().Subject3==localStorage.getItem('sub')){
                    if(grade>5 && grade<9 && doc.data().Qualification==="6-8"){
                        document.getElementById("teachers").innerHTML+="<button id="+ doc.id+ " onclick='chat(this.id)'><label>Name : "+doc.data().Name+" <label/><label>  Qualification : "+doc.data().Qualification+"<label/><label> Subject : "+localStorage.getItem('sub')+"</label></button><br>"               
                    }
                    if(grade>8 && grade<11 && doc.data().Qualification==="9-10"){
                        document.getElementById("teachers").innerHTML+="<button id="+ doc.id+ " onclick='chat(this.id)'><label>Name : "+doc.data().Name+"<label/><label> Qualification : "+doc.data().Qualification+"<label/><label> Subject : "+localStorage.getItem('sub')+"</label></button><br>"               
                    } 
                    if(grade>10 && grade<13 && doc.data().Qualification==="11-12"){
                        document.getElementById("teachers").innerHTML+="<button id="+ doc.id+ " onclick='chat(this.id)'><label>Name : "+doc.data().Name+"<label/><label> Qualification : "+doc.data().Qualification+"<label/><label> Subject : "+localStorage.getItem('sub')+"</label></button><br>"               
                    }
                }
                    
            }
           
        }); 
    }
    
)
}
function chat(clicked_id){
    //the student can directly chat with the teacher
   localStorage.setItem('sId', clicked_id)
    db.collection('users').doc(clicked_id).get(). then(function(snapshot){
    var Tname = (snapshot.data().Name);
    localStorage.setItem('Tname', Tname)
    location.href="Chat.html";
    })

}
