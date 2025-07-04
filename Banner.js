document.addEventListener("DOMContentLoaded", function () {
  const banner = document.querySelector(".banner");
  const okBtn = document.querySelector("#bannerOk");
  const mainContent = document.getElementById("main_content");

  // double check that all the required elements exist
  if (!banner || !okBtn || !mainContent) {
    console.warn("One or more elements are missing: .banner, #bannerOK, #main_content");
    return;
  }

  // // Show the banner only if not dismissed before
  // if (!localStorage.getItem("bannerDismissed")) {
  //   banner.classList.remove("hidden");
     mainContent.classList.add("blurred");
  // }

  // Handle OK button click
  okBtn.addEventListener("click", function () {
    banner.classList.add("hidden");
    mainContent.classList.remove("blurred");
    localStorage.setItem("bannerDismissed", "true");
  });
});