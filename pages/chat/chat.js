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
  firebase.initializeApp(firebaseConfig);
  let currentUid = localStorage.getItem('uId')
  const db = firebase.database()

  window.addEventListener('load', () => {
    if(!localStorage.hasOwnProperty('uId')){
        // console.log('not exist')
         window.location.replace('../../index.html')
      }
      else if(currentUid === null || currentUid.length <= 20){
        window.location.replace('../../index.html')
      }
  })
  
  let loader = document.getElementById('loader')
  let mainLoader = document.getElementById('mainLoader')

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
    // console.log('Messages')
    chatArea.style.display = 'none'
    ifNoChat.style.display = 'none'
    friends.style.display = 'none'
    profile.style.display = 'none'
    messages.style.display = 'flex'

    getConversation();

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
    // console.log('Profile')
    chatArea.style.display = 'none'
    ifNoChat.style.display = 'none'
    messages.style.display = 'none'
    friends.style.display = 'none'
    profile.style.display = 'flex'

    showProfile()
  })

  startConv.addEventListener('click', w => {
    chatArea.style.display = 'none'
    ifNoChat.style.display = 'none'
    messages.style.display = 'none'
    profile.style.display = 'none'
    friends.style.display = 'flex'

    showFriendsList()
  })


  //------------------CHATAREA START------------------
  let btnSend = document.getElementById('btnSend')
  let chatList = document.getElementById('chatList')
  let chatHeader = document.getElementById('chatHeader')
  let oppositeUser;

  let showChatArea = (user, cKey) => {
    ifNoChat.style.display = 'none'
    messages.style.display = 'none'
    profile.style.display = 'none'
    friends.style.display = 'none'
    chatArea.style.display = 'flex'
    oppositeUser = user
    chatHeader.innerHTML = `
    <span>
      <img class="userImage" id='${user.userId}' key='${cKey}' src="${user.profile}" width="35" height="35" alt="${user.fullName}">
      ${user.fullName}
    </span>
    `
    // console.log(user)
    getMessageData(cKey)
    
  }
 
  let getMessageData = (chatNode) => {
    chatList.innerHTML = ``

    db.ref(`chats/${chatNode}`).on('value', snap => {
      let chatRoom = snap.val()
      if(chatRoom !== null){
    chatList.innerHTML = ``
        
        // db.ref(`chats/${chatNode}`).on('child_added', snap=>{
                // let chats = snap.val()
                // console.log(chatRoom)
                for(let key in chatRoom){
                  let chats = chatRoom[key]
                  if(chats.senderId === currentUid){
                    classAndId = 'me'
                    childClass = 'meBg'
                  }
                  else{
                    classAndId = 'frnd'
                    childClass = 'frndBg'
                  }
                  chatList.innerHTML = chatList.innerHTML + `
                  
                  <li class="${classAndId}" id="${classAndId}">
                    <span class="chatSnip ${childClass}" >
                    ${chats.text}
                    </span><br /><sup class="time">${new Date(chats.textTime).toLocaleTimeString()}</sup>
                  </li>`
                }
              // })
      }
      else{
        chatList.innerHTML = `<li>No chat Available</li>`
      }

    })



  }
  btnSend.addEventListener("click", () => {
  let typeMessage = document.getElementById('typeMessage')
  let getOppositeId = document.getElementById('chatHeader').childNodes[1].childNodes[1].id
  let getChatKey = document.getElementById('chatHeader').childNodes[1].childNodes[1].getAttribute('key')
  // let getChatKey = getChatKey1.getAttribute('key')

  // console.log(document.getElementById('chatList').lastChild)
  let mesgObj = {
    text : typeMessage.value,
    textTime : firebase.database.ServerValue.TIMESTAMP,
    senderId : currentUid,
    recieverId : getOppositeId
    }
    db.ref(`chats/${getChatKey}`).push(mesgObj).then(res => {
      // console.log('success')
      typeMessage.value = ''
      
      
    }).catch(e=>{
      // console.log(e)
    })

    // let chatKey;
    
  })
  //------------------CHATAREA END------------------

  //------------------messages START------------------
  let abc = (e, oppId)=>{
    // console.log(oppId)
    let selectedUser;
    db.ref(`users/${oppId}`).once('value',snap=>{
      selectedUser = snap.val()
      // selectedUser = user[oppId]
      let chatKey = selectedUser.chatsWith[currentUid]
      // console.log(chatKey)
      showChatArea(selectedUser, chatKey)
    })
  }

  let getConversation = ()=>{
    mesgesList.innerHTML = ``
    db.ref(`users`).once('value', snap => {
      let users = snap.val()      
      let conv = users[currentUid].chatsWith      
      // console.log(conv)
      if(conv !==undefined){
        for(let key in conv){
          // console.log(users[key])
          let user = users[key]
          // console.log(user)
          mesgesList.innerHTML = mesgesList.innerHTML+`
            <li class="convList" id="convId" key="${user.userId}" onclick ="abc(this, '${user.userId}')" >
              <p class="userName1" id="">
                <img class="user-images" src="${user.profile}" alt="${user.fullName}"> 
                ${user.fullName}
              </p>
              <p class="icon" id="">
                <span class="fa fa-comments"></span>
              </p>
            </li>
          `  
        }
      }else{
        
        mesgesList.innerHTML = `
        <p style="display: flex !important; justify-content:center !important; align-items: center !important;">
                  No Chats Available
            </p>
      `  
      }
    })
  }
  // getConversation()
  //------------------messages END------------------

  //------------------friends START------------------

  let frnd = document.getElementById('frnd')
  let frndsList = document.getElementById('frndsList')
  let mesgIcon;
  let userName
  let showFriendsList =() => {
    frndsList.innerHTML = ``
    loader.style.display = 'block'
    // console.log('Friends List')
    db.ref(`users`).on('value', snapshot => {
      let data = snapshot.val()
      // console.log(data)
      

      setTimeout(()=>{
        loader.style.display = 'none'
        renderFrndList(data)
      },100)
    })
  }

  // let userNameLen = name => {
  //   if(name.length>5){
  //     let shortName = name.slice(0, 5)+'..'
  //     return shortName
  //   }
  //   else{
  //     return name
  //   }
  // }

  let renderFrndList = (list) => {
    frndsList.innerHTML = ``

    if(list){
      for(let key in list){
        let user = list[key]
        if(user.userId === currentUid){
          continue;
        }
        // console.log(user.fullName)
        frndsList.innerHTML += `<li class="frnd" id="frnd">
          <p class="userName" id="userName" label='${user.fullName}' onclick="userNameClick(this, '${user.userId}')">
            <img class="user-images" src="${user.profile}" alt="${user.fullName}"> 
            ${user.fullName}
          </p>
          <p class="mesgIcon" id="mesgIcon" onclick="mesgIconClick(this,'${user.userId}', '${user.chatsWith ? user.chatsWith[currentUid] : null}')">
            Message <span class="fa fa-comments"></span>
          </p>
        </li>`        
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
let createChatNode = (cId, oId, cK)=>{
  db.ref(`users/${cId}/chatsWith/${oId}`).set(cK).then(res=>{
    // console.log('=> new chat node created for both user')
  }).catch(e=>{console.log(e)})
  db.ref(`users/${oId}/chatsWith/${cId}`).set(cK)
  .then(res=>{
    // console.log('new chat node created for both user')  
  }).catch(e=>{console.log(e)})
}
let mesgIconClick = (e, oppId, chatKey) => {
    let selectedUser;
    let chKey = currentUid+oppId
    // let chatWith = []
    let chatKeyFlag = false

    db.ref(`users`).once('value', snap=>{
      let users = snap.val()
      selectedUser = users[oppId] 
      let forUid =  users[currentUid].chatsWith
      let forOppId =  users[oppId].chatsWith
      if(forUid !== undefined && forOppId !== undefined){ 
          if(forUid[oppId] === chatKey && forOppId[currentUid] === chatKey){
            // console.log(forUid[oppId], forOppId[currentUid])
            // console.log('dono same hain')
            showChatArea(selectedUser, chatKey)
          }
          else{
            // console.log('inner else')
            createChatNode(currentUid, oppId, chKey)
            showChatArea(selectedUser, selectedUser.chatsWith? selectedUser.chatsWith[currentUid]?selectedUser.chatsWith[currentUid]: chKey : chKey)    
          }
      }
      else{
        // console.log('else')
        createChatNode(currentUid, oppId, chKey)
        showChatArea(selectedUser, selectedUser.chatsWith? selectedUser.chatsWith[currentUid]?selectedUser.chatsWith[currentUid]: chKey : chKey)        
      }
      
    }) 
  }

  let userNameClick = (e, id) => {
    let selectedUser;
    // console.log('Click on userName', id)
    db.ref(`users/${id}`).once('value', snapshot => {
      let data = snapshot.val()
      selectedUser = data
    }).then(()=>{
      Swal.fire({
        text: selectedUser.fullName,
        textColor: '#12797e !important',
        imageUrl: selectedUser.profile,
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: 'User Profile Image',
        showOkButton: true
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

  let searchFrnd = document.getElementById('searchFrnd')

  searchFrnd.addEventListener('keyup', e => {
    frndsList.innerHTML = ``

    db.ref('users/').on('value', snap => {
      const data = snap.val()
      // console.log(searchVal)
      let findData = []
      for(let key in data){
        let x = data[key]
        // console.log(searchFrnd.val, x.fullName)
        if(searchFrnd.value.toLowerCase() === x.fullName.toLowerCase() && x.userId !== currentUid){
        findData.push(x)
        // console.log(findData)

        }

      }
      if(findData.length>0){
        // console.log('hamza')
        frndsList.innerHTML += findData.map(user => {
          // let chKey = currentUid+user.userId
          return(`<li class="frnd" id="frnd">
              <p class="userName" id="userName" onclick="userNameClick(this, '${user.userId}')">
                <img class="user-images" src="${user.profile}" alt="${user.fullName}"> 
                ${user.fullName}
              </p>
              <p class="mesgIcon" id="mesgIcon" onclick="mesgIconClick(this,'${user.userId}', '${user.chatsWith ? user.chatsWith[currentUid] : null}')">
                Message <span class="fa fa-comments"></span>
              </p>
            </li>`)
        })
      }
      else if(searchFrnd.value.length <= 0){
        showFriendsList()
      }
      else{
        frndsList.innerHTML += `
            <!-- onclick="testing(this) -->
            <p style="display: flex !important; justify-content:center !important; align-items: center !important;">
                  Not Available
            </p>
            `
      }
    })
  })

  

  //------------------friends END------------------

  //------------------profile START----------------
  let profileInfo = document.getElementById('profileInfo')

  let showProfile = ()=> {
    db.ref(`users/${currentUid}`).once('value', snap => {
      let user = snap.val()
      profileInfo.innerHTML = `
        <div class="profileImg">
          <img src="${user.profile}" alt="${user.fullName}"/>
          
        </div>
        <div class="info">
          <p class="labl">User Name</p>
          <p>${user.fullName}</p>
          <p class="labl">Email</p>
          <p>${user.email}</p>
          <p class="labl">Password</p>
          <p class="passChange"><a href="">******</a></p>
        </div>
      `
    })
  }
  //------------------profile END------------------

  //------------------sign out START------------------
  let signOutLink = document.getElementById('signOutLink')

  signOutLink.addEventListener('click', e => {
    // console.log('Sign out')
    signOut()
  })
  let signOut = () => {
    firebase.auth().signOut()
    .then((s)=>{
      // console.log(s)
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
  

      // let li = document.createElement('li')
      // li.setAttribute('class', classAndId)
      // li.setAttribute('id', classAndId)
      // chatList.appendChild(li)
      // let span = document.createElement('span')
      // let br = document.createElement('br')
      // let sup = document.createElement('sup')
      // span.setAttribute('class',`chatSnip ${childClass}`)
      // span.innerText = data.text
      // sup.setAttribute('class','time')
      // sup.innerText = new Date(data.textTime*1000)
      // li.appendChild(span)
      // li.appendChild(br)
      // li.appendChild(sup)


