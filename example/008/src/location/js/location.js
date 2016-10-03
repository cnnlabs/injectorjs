window.populateLocationHtml = function (html) {
  $(".content.location").html(html);

  $(".location-button").click(
    function () {
      alert('save location details');
    }
  );
};
