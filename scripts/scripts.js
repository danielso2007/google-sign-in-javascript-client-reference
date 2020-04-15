function init() {
  gapi.load('client:auth2', function () {
    auth2 = gapi.auth2.init({
      client_id: '<YOUR-CLIENT-ID>'
    }).then(() => {
      if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
        console.log('Logged');
        setTitle(getUser().getName());
        showElementsIsLogged();
      } else {
        renderButton();
        console.log('Disconnected');
      }
    });
  });
}

function getUser() {
  if (gapi.auth2.getAuthInstance().isSignedIn.get()) {
    return gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile();
  } else {
    return '';
  }
}

function setTitle(value) {
  document.getElementById("h2bemvindo").innerHTML = `Bem vindo, ${value}`;
}

function showElementsIsLogged() {
  document.getElementById("bt_signout").style.display = "block";
  document.getElementById("content").style.display = "block";
  document.getElementById("btLogin").style.display = "none";
  [].forEach.call(document.querySelectorAll('.nav-item'), function (el) {
    el.style.visibility = 'visible';
  });
}

function renderButton() {
  document.getElementById("content").style.display = "none";
  document.getElementById("bt_signout").style.display = "none";
  document.getElementById("btLogin").style.display = "block";
  
  [].forEach.call(document.querySelectorAll('.nav-item'), function (el) {
    el.style.visibility = 'hidden';
  });

  gapi.signin2.render('btLogin', {
    'scope': 'email profile https://www.googleapis.com/auth/plus.login', // solicitando acesso ao profile e ao e-mail do usuário
    'width': 180,
    'height': 40,
    'longtitle': true,
    'onsuccess': onSuccess,
    'onfailure': onFailure
  });
}

/**
  Função executada quando o login é efetuado com sucesso
*/
function onSuccess(googleUser) {
  // Recuperando o profile do usuário
  profile = googleUser.getBasicProfile();

  // console.log("ID: " + profile.getId()); // Don't send this directly to your server!
  // console.log("Name: " + profile.getName());
  // console.log("Image URL: " + profile.getImageUrl());
  // console.log("Email: " + profile.getEmail());

  // Recuperando o token do usuario. Essa informação você necessita passar para seu backend
  // let id_token = googleUser.getAuthResponse().id_token;
  // console.log("ID Token: " + id_token);

  setTitle(profile.getName());
  showElementsIsLogged();
}

/**
  Função executada quando ocorrer falha no logn
*/
function onFailure(error) {
  console.log(error);
}

/**
  Função de deslogar o usuário
*/
function signOut() {
  gapi.auth2.getAuthInstance().signOut().then(function () {
    console.log('User signed out.');
    renderButton();
  });
}