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
    console.log('Friend')
    chatArea.style.display = 'none'
    ifNoChat.style.display = 'none'
    messages.style.display = 'none'
    profile.style.display = 'none'
    friends.style.display = 'flex'
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

  frnd.addEventListener('click', e => {
    console.log(e.target)
  })
  //------------------friends END------------------

  //------------------profile START------------------
  //------------------profile END------------------


