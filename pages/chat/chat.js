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

  let btnSend = document.getElementById('btnSend')
  let chatList = document.getElementById('chatList')
//   let typeMessage = document.getElementById('typeMessage')

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