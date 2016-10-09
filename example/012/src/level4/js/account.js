window.populateAccountHtml = function (html) {
  $(".content.account").html(html);

  $(".account-button").click(
    function () {
      alert('save account details');
    }
  );
};
