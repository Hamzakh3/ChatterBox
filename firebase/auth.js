firebaseConfig = {
  apiKey: "AIzaSyCPf0MEy1ByiurtBi_d7ATP8xc4Qu5tL00",
  authDomain: "chatterr-box.firebaseapp.com",
  databaseURL: "https://chatterr-box.firebaseio.com",
  projectId: "chatterr-box",
  storageBucket: "chatterr-box.appspot.com",
  messagingSenderId: "851614672621",
  appId: "1:851614672621:web:f77aac734309dccad58ee4",
  measurementId: "G-23W62XNWZT"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

window.addEventListener('load', () => {
  if(localStorage.hasOwnProperty('uId')){
    localStorage.setItem('uId', null)
  }
  else{
    localStorage.setItem('uId', null)
  }
})

  let loginEmail=document.getElementById('btnLoginWithEmail');
  let loginFb=document.getElementById('btnLoginWithFb');
  let signUpEmail=document.getElementById('btnSignUpWithEmail');

//- - - - - - - - - - Sign In With Email
  // let e=document.getElementById('txtLoginEmail');
  // let p=document.getElementById('txtLoginPass');

  

  loginEmail.addEventListener('click',()=>{
    let e=document.getElementById('txtLoginEmail').value;
    let p=document.getElementById('txtLoginPass').value;
    // console.log(e,p)
    signIn(e, p);
  })

  let signIn = (email, pass) => {
    // console.log(email, pass)
    firebase.auth().signInWithEmailAndPassword(email, pass)
      .then(res => {
        // console.log(res.user.uid)
        localStorage.setItem('uId', res.user.uid)
        window.location.replace(`./pages/chat/chat.html`)
      }).catch(error => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      swal({
        title: "Error",
        text: error.message,
        icon: "error",
        button: "Ok"
      })
    });
  }

//- - - - - - - - - - Sign In With Facebook
let provider= new firebase.auth.FacebookAuthProvider();

loginFb.addEventListener('click',()=>{    
    signInWithFb()
  })

  let signInWithFb = () => {
    console.log(`Login with Facebook`)
    firebase.auth().signInWithPopup(provider).then((result)=>{
      console.log(result)
      let token=result.credential.accessToken;
      console.log(token)
      let user=result.user;
      console.log(user);
    }).catch((e)=>{
      console.log(e.message);
    })
  }
//- - - - - - - - - - Sign Up With Email

  signUpEmail.addEventListener('click', ()=>{
    let fullName=document.getElementById('txtFullName').value;
    let email=document.getElementById('txtEmail').value;
    let pass=document.getElementById('txtPass').value;
    // let rePass=document.getElementById('txtRePass').value;
    let image=document.getElementById('imgProfile').files[0]


    let newUser = {
      fullName,
      email
    }
    // console.log('Successful')

    signUpWithEmail(newUser, pass, image)
  })

let signUpWithEmail = (user, pass, img) => {
  firebase.auth().createUserWithEmailAndPassword(user.email, pass)
  .then(res => {
    let userId = res.user.uid
    localStorage.setItem('uId', userId)
    user.userId = userId
    // user.chats = ['testing']
    let storageRef = firebase.storage().ref().child(`profile/${img.name}`)
    storageRef.put(img)
    .then(url => {
      url.ref.getDownloadURL()
      .then(urlRef => {
        user.profile = urlRef

        let database = firebase.database()
        database.ref(`users/${userId}`).set(user)
      .then(res =>{
        // console.log('success', res)
        swal({
          title: "User Created Successfuly",
          text: "Press Continue for Next",
          icon: "success",
          button: "Continue"
        }).then(()=>{
          window.location.replace(`./pages/chat/chat.html`)
        })
      }).catch(error => {
        // console.log(error.message)
        swal({
          title: "Error",
          text: error.message,
          icon: "error",
          button: "Ok"
        })
      })
    }).catch(function(error) {
    // Handle Errors here.
    // console.log(errorMessage, errorCode)
    swal({
      title: "Error",
      text: error.message,
      icon: "error",
      button: "Ok"
    })
  });
      }).catch(error => {
        // console.log(error.message)
        swal({
          title: "Error",
          text: error.message,
          icon: "error",
          button: "Ok"
        })
      })
    })

    
}




  let flag=false;
  window.addEventListener('load',()=>{
      flag=false    
  })
  //------------------STRING VALIDATION
  function strCheck(element, val){
      
      let strMesg="This field is badly formated";
      let trget=element.nextSibling;
      let mesg=trget.nextSibling;
      let chkTxt=/^[A-Za-z]+$/;

      if(val.length<3){
          mesg.setAttribute('class','dnger')
          mesg.innerHTML="Min 3 characters allow";
          flag=false
      }
      else if(val.length===0){
          mesg.setAttribute('class','dnger')
          mesg.innerHTML="This field is empty";
          flag=false
      }
      
      else if(val.match(chkTxt) && val.length>=3){
          flag=true;
      }
      else{
          mesg.setAttribute('class','dnger')
          mesg.innerHTML=strMesg;
          flag=false
      }
      return flag
      
  
  
  }
  //--------------------EMAIL VALIDATION
  function emailCheck(element, val, mesges){
    let chkEmail = /^[\w\-\.\+]+\@[a-zA-Z0-9\. \-]+\.[a-zA-z0-9]{2,4}$/;
    let emailMesg="Email is badly formated";
    let trget=element.nextSibling;
    let mesg=trget.nextSibling;
    if(val.match(chkEmail)){
        flag=true;
    }
    else{
        mesg.setAttribute('class','dnger')
        mesg.innerHTML=emailMesg;
        flag=false
    }
    return flag
  }
  //-------------------------PASSWORD AND CONFIRM PASSWORD
  function passCheck(element1,element2,val1,val2,mesges){
    let passMesg="Password don't matched";
    let trget=element1.nextSibling;
    let trget1=element2.nextSibling;
    let mesg=trget.nextSibling;
    let mesg1=trget1.nextSibling;
    if(val1>=6 && val1===val2){
        flag=true
    }
    else if(val1.length<6 || val1.length===0){
        mesg.setAttribute('class','dnger')
        mesg.innerHTML="Atleast 6 or more characters allow"
        flag=false
        if(val2.length<6 || val2.length===0){
            mesg1.setAttribute('class','dnger')
            mesg1.innerHTML="Atleast 6 or more characters allow"
            flag=false
        }
    }
    else if(val2.length<6 || val2.length===0){
        mesg1.setAttribute('class','dnger')
        mesg1.innerHTML="Atleast 6 or more characters allow"
        flag=false
    }
    else if(val1!==val2){
        mesg.setAttribute('class','dnger')
        mesg.innerHTML=passMesg
        mesg1.setAttribute('class','dnger')
        mesg1.innerHTML=passMesg
        flag=false
    }
    else{
        mesg.setAttribute('class','dnger')
        mesg.innerHTML=mesges
        flag=false
    }
    return flag
  }