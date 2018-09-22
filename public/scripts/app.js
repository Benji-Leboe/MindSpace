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
  }).done((users) => {
    users.forEach(user => {
      console.log(user);
    })
  });
};

function getSubject(){
  $('#subjectGrid').on('click', function(event) {
    event.preventDefault();
    let currentTarget = $(event.target);
    console.log($(currentTarget).parent('.card').attr('id'));
  })
}

function postRegister() {
  $('#nav-bar').on('submit', '#registerForm', function(event) {
    event.preventDefault();
    console.log('Submit successful')
    let formData = {
      'email': $('input[id=registerFormEmail]').val(),
      'username': $('input[id=registerFormUsername]').val(),
      'password': $('input[id=registerFormPassword]').val(),
      'passwordCheck': $('input[id=registerConfirmPassword]').val()
    };

    console.log(formData);
    $.ajax({
      url: '/register',
      method: 'POST',
      data: formData,
      success: function() {
        console.log('Form submission successful!');
        $('#registerDropToggle').dropdown('toggle');
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
    let formData = {
      'email': $('input[id=loginFormEmail]').val(),
      'password': $('input[id=loginFormPassword]').val()
    };

    console.log(formData);
    $.ajax({
      url: '/login',
      method: 'POST',
      data: formData,
      success: function() {
        console.log('Form submission successful!');
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