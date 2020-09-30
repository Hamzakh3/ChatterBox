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
  let currentUid = localStorage.getItem('uId')
  let db = firebase.database()
  let loader = document.getElementById('loader')
  let mainLoader = document.getElementById('mainLoader')



  window.addEventListener('load', () => {
    if(!localStorage.hasOwnProperty('uId')){
        // console.log('not exist')
         window.location.replace('../../index.html')
      }
      else if(currentUid === null || currentUid.length <= 20){
        window.location.replace('../../index.html')
      }
  })




  



  let chatArea = document.getElementById('chatArea')
  let ifNoChat = document.getElementById('ifNoChat') 
  let messages = document.getElementById('messages') 
  let friends = document.getElementById('friends') 
  let profile = document.getElementById('profile')
  
  let mesgLink = document.getElementById('mesgLink')
  let frndLink = document.getElementById('frndLink')
  let profLink = document.getElementById('profLink')
  let startConv = document.getElementById('startConv')

  mesgLink.addEventListener('click', e => {
    console.log('Messages')
    chatArea.style.display = 'none'
    ifNoChat.style.display = 'none'
    friends.style.display = 'none'
    profile.style.display = 'none'
    messages.style.display = 'flex'

  })

  frndLink.addEventListener('click', e => {
    chatArea.style.display = 'none'
    ifNoChat.style.display = 'none'
    messages.style.display = 'none'
    profile.style.display = 'none'

    friends.style.display = 'flex'

    showFriendsList()
  })

  profLink.addEventListener('click', e => {
    console.log('Profile')
    chatArea.style.display = 'none'
    ifNoChat.style.display = 'none'
    messages.style.display = 'none'
    friends.style.display = 'none'
    profile.style.display = 'flex'
  })

  startConv.addEventListener('click', w => {
    chatArea.style.display = 'none'
    ifNoChat.style.display = 'none'
    messages.style.display = 'none'
    profile.style.display = 'none'
    friends.style.display = 'flex'
  })


  //------------------CHATAREA START------------------
  let btnSend = document.getElementById('btnSend')
  let chatList = document.getElementById('chatList')
  let chatHeader = document.getElementById('chatHeader')
  let oppositeUser;

  let showChatArea = (user) => {
    ifNoChat.style.display = 'none'
    messages.style.display = 'none'
    profile.style.display = 'none'
    friends.style.display = 'none'
    chatArea.style.display = 'flex'
    oppositeUser = user
    chatHeader.innerHTML = `
    <span>
      <img class="userImage" src="${user.profile}" width="35" height="35" alt="${user.fullName}">
      ${user.fullName}
    </span>
    `
  }

  btnSend.addEventListener("click", () => {
  let typeMessage = document.getElementById('typeMessage')
  console.log(typeMessage.value)
  let mesgObj = {
    text : typeMessage.value,
    textTime : firebase.database.ServerValue.TIMESTAMP,
    userId : currentUid
    }
    db.ref(`chats/${oppositeUser.userId+currentUid}/`).push(mesgObj)
    .then(()=>{
      db.ref(`chats/${oppositeUser.userId+currentUid}/`).once('value', mesges => {
        let data = mesges.val()
        chatList.innerHTML = chatList.innerHTML + `
        <li class="me" id="me">
          <span class="chatSnip meBg">
              ${data.text}
          </span><br /><sup class="time">${new Date(data.textTime*1000)}</sup>
        </li>`
      }).then(()=>{ 
        
      }).catch((er)=>{
        console.log(er.message)
      })
    }).catch(err => {
      console.log(err)
    })
    // console.log(typeMessage.value)
    // // console.log(chatList)
     

  })
  //------------------CHATAREA END------------------

  //------------------ifNoChat START------------------

  //------------------ifNoChat END------------------

  //------------------messages START------------------
  //------------------messages END------------------

  //------------------friends START------------------

  let frnd = document.getElementById('frnd')
  let frndsList = document.getElementById('frndsList')
  let mesgIcon;
  let userName
  let showFriendsList =() => {
    frndsList.innerHTML = ``
    loader.style.display = 'block'
    console.log('Friends List')
    db.ref(`users`).once('value', snapshot => {
      let data = snapshot.val()
      console.log(data)
      

      setTimeout(()=>{
        loader.style.display = 'none'
        renderFrndList(data)
      },1000)
    })
  }
  let renderFrndList = (list) => {
    if(list){
      for(let key in list){
        let user = list[key]
        if(user.userId === currentUid){
          continue;
        }
        console.log(user.fullName)
        frndsList.innerHTML += `
        <!-- onclick="testing(this) -->
        <li class="frnd" id="frnd"      >
          <p class="userName" id="userName" onclick="userNameClick(this, '${user.userId}')">
            <img class="user-images" src="${user.profile}" alt="${user.fullName}"> 
            ${user.fullName}
          </p>
          <p class="mesgIcon" id="mesgIcon" key="${user.userId}" onclick="mesgIconClick(this,'${user.userId}')">
            Message <span class="fa fa-comments"></span>
          </p>
        </li>

        `
        mesgIcon = document.getElementById('mesgIcon')
        userName = document.getElementById('userName')

        
    }  
  }
  else{
    frndsList.innerHTML += `
        <li class="frnd" id="frnd">
          You have no Friends
        </li>
        `
  }

}
  let mesgIconClick = (e, id) => {
    let selectedUser;
    db.ref(`users/${id}`).once('value', snapshot => {
      let data = snapshot.val()
      selectedUser = data
    }).then(()=>{
      showChatArea(selectedUser)
    }).catch((er)=>{
      swal({
        title:'Something Wrong',
        icon: 'error',
        text:er.message,
        button:'ok'
      })
    })
  }
          
          
  let userNameClick = (e, id) => {
    let selectedUser;
    console.log('Click on userName', id)
    db.ref(`users/${id}`).once('value', snapshot => {
      let data = snapshot.val()
      selectedUser = data
    }).then(()=>{
      Swal.fire({
        text: selectedUser.fullName,
        imageUrl: selectedUser.profile,
        imageWidth: 200,
        imageHeight: 200,
        imageBorderRadius: 10,
        imageAlt: 'User Profile Image',
        showCancelButton: true,
        confirmButtonColor: '#12797e',
        cancelButtonColor: '#d3d3d3',
        confirmButtonText: 'Start Chat'
      }).then((result) => {
        if (result.isConfirmed) {
          // console.log('=====>', selectedUser)
          showChatArea(selectedUser)
        }
      })
    }).catch((er)=>{
      swal({
        title:'Something Wrong',
        icon: 'error',
        text:er.message,
        button:'ok'
      })
    })
    
  }

  
  let testing = e => {
    console.log(e.id)
  }
  //------------------friends END------------------

  //------------------profile START------------------
  //------------------profile END------------------

  //------------------sign out START------------------
  let signOutLink = document.getElementById('signOutLink')

  signOutLink.addEventListener('click', e => {
    console.log('Sign out')
    signOut()
  })
  let signOut = () => {
    firebase.auth().signOut()
    .then((s)=>{
      console.log(s)
      localStorage.setItem('uId', null)
      window.location.replace('../../index.html')
    }).catch(err => {
      swal({
        title: 'Something Wrong',
        text: err.messages,
        icon: 'error',
        button: 'Ok'
      })
    })
  }
  //------------------sign out START------------------
  

