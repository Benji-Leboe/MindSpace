$(function() {
  //document.ready
  getUsers();
  postRegister();
  postLogin();
  getSubject();
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

function getSubject(){
  $('#subjectGrid').on('click', function(event) {
    event.preventDefault();
    var currentTarget = $(event.target);
    console.log($(currentTarget).parent('.card').attr('id'));
  });
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
      url: '/api/users/logout',
      method: 'POST',
      success: function() {
        console.log('Logout successful');
        $('#login-register').css('display', 'block');
        $('#logout').css('display', 'none');
      }
    });
  });
}