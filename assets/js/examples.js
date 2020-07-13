$(document).ready(function () {
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".top").fadeIn();
      $(".header-wrap").addClass("nav-back");
    } else {
      $(".top").fadeOut();
      $(".header-wrap").removeClass("nav-back");
    }
  });
  $(".top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 400);
    return false;
  });
  /* map height 조절 */
  var id;
  $(window)
    .resize(function () {
      clearTimeout(id);
      id = setTimeout(doneResizing, 50);
    })
    .resize();

  function doneResizing() {
    $height = $(".map-size").height();
    $width = $(".map-size").width();
    $newHeight = Math.floor($height - 385);

    $(".map-size").height($newHeight);
  }
});
