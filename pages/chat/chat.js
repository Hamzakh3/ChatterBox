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

  let showChatArea = (user, chatKey) => {
    ifNoChat.style.display = 'none'
    messages.style.display = 'none'
    profile.style.display = 'none'
    friends.style.display = 'none'
    chatArea.style.display = 'flex'
    oppositeUser = user
    chatHeader.innerHTML = `
    <span>
      <img class="userImage" id='${user.userId}' key='${chatKey}' src="${user.profile}" width="35" height="35" alt="${user.fullName}">
      ${user.fullName}
    </span>
    `
    getMessageData(chatKey)
    
  }
 
  let checkOneToOne = () => {
      
  }

  let getMessageData = (chatNode) => {
    db.ref(`chats/${currentUid}/chatWith/${chatNode}`).on('value', snap => {
      // console.log(snap.val())
      let classAndId, childClass;
      if(snap.val() !== null){
        db.ref(`usersChats/${chatNode}`).on('child_added', snap=>{
          let chats = snap.val()
          // for(let key in chats){
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
              </span><br /><sup class="time">${new Date(chats.textTime*1000)}</sup>
            </li>`
          // }
        })
      }
    })


    // db.ref(`chats/${chatNode}`).on('child_added', mesges => {
    //   let data = mesges.val()
    //   let classAndId, childClass;
    //   if(data.senderId === currentUid){
    //     classAndId = 'me'
    //     childClass = 'meBg'
    //   }
    //   else{
    //     classAndId = 'frnd'
    //     childClass = 'frndBg'
    //   }
    //   chatList.innerHTML = chatList.innerHTML + `
    //    <li class="${classAndId}" id="${classAndId}">
    //      <span class="chatSnip ${childClass}" >
    //          ${data.text}
    //      </span><br /><sup class="time">${new Date(data.textTime*1000)}</sup>
    //    </li>`
    // })
  }
  btnSend.addEventListener("click", () => {
  let typeMessage = document.getElementById('typeMessage')
  let getOppositeId = document.getElementById('chatHeader').childNodes[1].childNodes[1].id
  let getChatKey1 = document.getElementById('chatHeader').childNodes[1].childNodes[1]
  let getChatKey = getChatKey1.getAttribute('key')

  console.log(getOppositeId, getChatKey)
  let mesgObj = {
    text : typeMessage.value,
    textTime : firebase.database.ServerValue.TIMESTAMP,
    senderId : currentUid,
    recieverId : getOppositeId
    }
    db.ref(`usersChats/${getChatKey}`).push(mesgObj).then(res => {
      console.log('success')
      
    }).catch(e=>{
      console.log(e)
    })

    // let chatKey;
    
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
    // console.log('Friends List')
    db.ref(`users`).on('value', snapshot => {
      let data = snapshot.val()
      console.log(data)
      

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
          <p class="mesgIcon" id="mesgIcon" onclick="mesgIconClick(this,'${user.userId}')">
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
let mesgIconClick = (e, id) => {
    let selectedUser;
    let chatKey = currentUid+id
    // let chatWith = []
    let chatKeyFlag = false
    db.ref(`chats/${currentUid}/chatWith/`).on('value', snap=>{
      let getData = snap.val()
      if(getData != null){
      // console.log(getData)

        for(let a in getData){
          // console.log(a)
          if(a === chatKey){
            // console.log(chatKey)
            chatKeyFlag = false
            break;
          }
          else{
            chatKeyFlag = true
          }
        }
      }
      else{
        chatKeyFlag = true
        // console.log(chatKeyFlag)

      }
      db.ref(`users`).on('value', snapshot => {
        let users = snapshot.val()
        selectedUser = users[id]
        // console.log(chatKeyFlag)
        
        if(chatKeyFlag){
          db.ref(`chats/${currentUid}/chatWith`).child(`${chatKey}`).set(chatKey)
          .then(()=>{
            db.ref(`chats/${id}/chatWith`).child(`${chatKey}`).set(chatKey)
          })
          .catch(e => {
            console.log(e)
         })
        }
        showChatArea(selectedUser, chatKey)
      })
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
          return(`<li class="frnd" id="frnd">
              <p class="userName" id="userName" onclick="userNameClick(this, '${user.userId}')">
                <img class="user-images" src="${user.profile}" alt="${user.fullName}"> 
                ${user.fullName}
              </p>
              <p class="mesgIcon" id="mesgIcon" onclick="mesgIconClick(this,'${user.userId}')">
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

  //------------------profile START------------------
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