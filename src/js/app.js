import "../style/index.css";

/**
 *  EDIT ONLY INSIDE THIS RENDER FUNCTION
 *  This function is called every time the user changes types or changes any input
 * 
    {
        includeCover: true, // if includeCover is true the algorithm should show the cover image
        background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da", // this is the image's url that will be used as a background for the profile cover
        avatarURL: "https://randomuser.me/api/portraits/women/42.jpg", // this is the url for the profile avatar
        socialMediaPosition: "right", // social media bar position (left or right)
        
        twitter: null, // social media usernames
        github: null,
        linkedin: null,
        instagram: null,

        name: null,
        lastName: null,
        role: null,
        country: null,
        city: null
    }
 */
function render(variables = {}) {
  console.log("These are the current variables: ", variables); // print on the console
  // here we ask the logical questions to make decisions on how to build the html
  // if includeCover==false then we reset the cover code without the <img> tag to make the cover transparent.
  let cover = `<div class="cover"><img src="${variables.background}" /></div>`;
  if (variables.includeCover == false) cover = "<div class='cover'></div>";

  const socialPosition =
    variables.socialMediaPosition === "position-right"
      ? "position-right"
      : "position-left";

  const socialMedia = ["twitter", "github", "linkedin", "instagram"]
    .filter(platform => variables[platform])
    .map(
      platform =>
        `<li><a href="https://${platform}.com/${
          platform === "linkedin" ? "in/" : ""
        }${variables[platform]}"><i class="fab fa-${platform}"></i></a></li>`
    )
    .join("");

  const fullName =
    [variables.name, variables.lastName].filter(Boolean).join(" ") ||
    "Enter Name";
  const role = variables.role || "Enter Role";
  const location =
    [variables.city, variables.country].filter(Boolean).join(", ") ||
    "City, country";

  document.querySelector("#widget_content").innerHTML = `<div class="widget">
    ${cover}
    <img src="${variables.avatarURL}" class="photo" />
    <h1>${fullName}</h1>
    <h2>${role}</h2>
    <h3>${location}</h3>
    <ul class="${socialPosition}">${socialMedia}</ul>
  </div>`;
}

/**
 * Don't change any of the lines below, here is where we do the logic for the dropdowns
 */
window.onload = function() {
  window.variables = {
    // if includeCover is true the algorithm should show the cover image
    includeCover: true,
    // this is the image's url that will be used as a background for the profile cover
    background:
      "https://img.freepik.com/fotos-premium/representacion-3d-ilustracion-escena-ciencia-ficcion_138734-889.jpg",
    // this is the url for the profile avatar
    avatarURL:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5Jrt06-J4Yd1AR1iotjGysGzIVsGd_hd-Iw&s",
    // social media bar position (left or right)
    socialMediaPosition: "position-left",
    // social media usernames
    twitter: null,
    github: null,
    linkedin: null,
    instagram: null,
    name: null,
    lastName: null,
    role: null,
    country: null,
    city: null
  };
  render(window.variables); // render the card for the first time

  document.querySelectorAll(".picker").forEach(function(elm) {
    elm.addEventListener("change", function(e) {
      // <- add a listener to every input
      const attribute = e.target.getAttribute("for"); // when any input changes, collect the value
      let values = {};
      values[attribute] =
        this.value == "" || this.value == "null"
          ? null
          : this.value == "true"
          ? true
          : this.value == "false"
          ? false
          : this.value;
      render(Object.assign(window.variables, values)); // render again the card with new values
    });
  });
};
