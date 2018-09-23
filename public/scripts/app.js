$(function() {
  //document.ready
  getUsers();
  postRegister();
  postLogin();
  postLogout();
  getSubject();
  fetchPreview();
});


function getUsers() {
  $.ajax({
    method: "GET",
    url: "/api/users"
  })
  .done( function (users) {
    users.forEach( function (user) {
      console.log(user);
    })
  });
};

function getSubject() {
  $('#subjectGrid').on('click', function(event) {
    event.preventDefault();
    var currentTarget = $(event.target);
    var destination = $(currentTarget).parent('.card').attr('id');
    $.ajax({
      method: "GET",
      url: `/subjects/${destination}`,
      success: function(data) {
        console.log("AJAX response data:", data);
        //figure out async function handling
      }
    });
  });

  $(document).ready(function() {
    $('a.subject-link').on('click', function(event) {
      event.preventDefault();
      var currentTarget = $(event.target);
      console.log(currentTarget);
      var destination = $(currentTarget).text();
      console.log(destination);
      $.ajax({
        method: "GET",
        url: `/subjects/${destination}`,
        success: function(data) {
          //figure out async function handling
          
        }
      });
    });
  });
}

function fetchPreview(url) {
  console.log('function called');
  $.ajax({
    url: `https://api.linkpreview.net?key=5ba7bba9b092023678bec1cebcf7cab6ea56b2ec203cf&q=${url}`,
    type: "GET",
    contentType: "application/json",
    success: function(result){
      console.log("request success");
      return result;
    }
  });
}

function listBuilder(responseObject) {
  console.log(responseObject);
  var { id, post_id, external_url, title, description, created_at, user_id } = responseObject;
  console.log(external_url);
  var linkPreview = fetchPreview(external_url);
  console.log(linkPreview);
}


function postRegister() {
  $('#nav-bar').on('submit', '#registerForm', function(event) {
    event.preventDefault();
    console.log('Submit successful')
    var formData = {
      'email': $('input[id=registerFormEmail]').val(),
      'username': $('input[id=registerFormUsername]').val(),
      'password': $('input[id=registerFormPassword]').val(),
      'passwordCheck': $('input[id=registerConfirmPassword]').val()
    };

    $.ajax({
      url: '/api/users/register',
      method: 'POST',
      data: formData,
      success: function(data) {
        $('#registerDropToggle').dropdown('toggle');
        $('#login-register').css('display', 'none');
        $('#logout').css('display', 'block');
      },
      error: function (req, status, error){
        console.log("Req: " + req);
        console.log("Status: " + status);
        console.log("Error: " + error);
      }
    });
  });
}

  function postLogin() {
    $('#nav-bar').on('submit', '#loginForm', function(event) {
    event.preventDefault();
    console.log('Submit successful')
    var formData = {
      'email': $('input[id=loginFormEmail]').val(),
      'password': $('input[id=loginFormPassword]').val()
    };

    console.log(formData);
    $.ajax({
      url: '/api/users/login',
      method: 'POST',
      data: formData,
      success: function(data) {
        console.log("Login success:", data);
        console.log('Form submission successful!');
        $('#login-register').css('display', 'none');
        $('#logout').css('display', 'block');
        $('#loginDropToggle').dropdown('toggle');
      },
      error: function (req, status, error){
        console.log("Req: " + req);
        console.log("Status: " + status);
        console.log("Error: " + error);
      }
    });
  });

}

function postLogout() {
  $('#nav-bar').on('click', '#logoutBtn', function(event) {
    event.preventDefault();
    console.log('Logout clicked')
    $.ajax({
      url: '/logout',
      method: 'POST',
      success: function() {
        console.log('Logout successful');
        $('#login-register').css('display', 'block');
        $('#logout').css('display', 'none');
      },
      error: function(req, status, error) {
        console.log("Req: " + req);
        console.log("Status: " + status);
        console.log("Error: " + error);
      }
    });
  });
}