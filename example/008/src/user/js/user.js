window.populateUserHtml = function (html) {
  $(".content.user").html(html);

  $(".user-button").click(
    function () {
      alert('save user details');
    }
  );
};
