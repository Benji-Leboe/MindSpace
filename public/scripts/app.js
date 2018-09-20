$(function() {
  //document.ready
  getUsers();
});


let getUsers = () => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    users.forEach(user => {
      console.log(user);
    })
  });
};
