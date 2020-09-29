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

    window.addEventListener('load', () => {
    if(!localStorage.hasOwnProperty('uId')){
      console.log('not exist')
      window.location.replace('../../index.html')
    }
    else if(currentUid === null || currentUid.length <= 20){
      window.location.replace('../../index.html')
    }
  })

  let db = firebase.database()
  let loader = document.getElementById('loader')

  



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

  btnSend.addEventListener("click", () => {
  let typeMessage = document.getElementById('typeMessage')
    console.log(typeMessage.value)
    // console.log(chatList)
    chatList.innerHTML = chatList.innerHTML + `
    <li class="me" id="me">
        <span class="chatSnip meBg">
            ${typeMessage.value}
        </span><br /><sup class="time">8:18 PM</sup>
    </li>` 

  })
  //------------------CHATAREA END------------------

  //------------------ifNoChat START------------------

  //------------------ifNoChat END------------------

  //------------------messages START------------------
  //------------------messages END------------------

  //------------------friends START------------------
  let frnd = document.getElementById('frnd')
  let frndsList = document.getElementById('frndsList')
  let showFriendsList =() => {
    console.log('Friends List')
    loader.style.display = 'block'
    db.ref(`users`).once('value', snapshot => {
      let data = snapshot.val()
      console.log(data)
      frndsList.innerHTML = ``
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
        console.log(user.fullName)
        frndsList.innerHTML += `
        <li class="frnd" id="frnd" onclick="testing(this)">
          <p class="userName" id="userName">
            <img class="user-images" src="${user.profile}" alt="${user.fullName}"> 
            ${user.fullName}
          </p>
          <p class="fa fa-comments mesgIcon" id="mesgIcon"></p>
        </li>
        `
    }  
  }
  else{
    frndsList.innerHTML += `
        <li class="frnd" id="frnd" onclick="testing(this)">
          You have no Friends
        </li>
        `
  }
}
  
  let testing = e => {
    console.log(e.id)
  }
  //------------------friends END------------------

  //------------------profile START------------------
  //------------------profile END------------------

