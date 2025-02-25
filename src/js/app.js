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

  // Imagen de portada
  const backgroundUrl =
    variables.customBackground ||
    "https://images.unsplash.com/photo-1511974035430-5de47d3b95da";
  const cover = `<div class="cover">${
    variables.includeCover ? `<img src="${backgroundUrl}" />` : ""
  }</div>`;
  // Foto de perfil
  const avatarUrl =
    variables.customImage || "https://randomuser.me/api/portraits/women/42.jpg";

  // Lista de redes sociales
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

  // Construir nombre, rol y ubicación
  const fullName =
    [variables.name, variables.lastName].filter(Boolean).join(" ") ||
    "Lucy Boilett";
  const role = variables.role || "Web Developer";
  const location =
    [variables.city, variables.country].filter(Boolean).join(", ") ||
    "Miami, USA";

  // Aplicar width y height al widget si están definidos
  const width = variables.width ? `${variables.width}px` : 500;
  const height = variables.height ? `${variables.height}px` : 500;

  // HTML final
  document.querySelector(
    "#widget_content"
  ).innerHTML = `<div class="widget" style="width: ${width}; height: ${height};">
  ${cover}
  <img src="${avatarUrl}" class="photo" />
  <h1>${fullName}</h1>
  <h2>${role}</h2>
  <h3>${location}</h3>
  <ul class="${socialPosition}">${socialMedia}</ul>
</div>
  <button id="duplicateButton">Duplicate Card</button>`;
}

/**
 * Don't change any of the lines below, here is where we do the logic for the dropdowns
 */
window.onload = function() {
  window.variables = {
    // if includeCover is true the algorithm should show the cover image
    includeCover: true,
    // this is the image's url that will be used as a background for the profile cover
    background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da",
    // this is the url for the profile avatar
    avatarURL: "https://randomuser.me/api/portraits/women/42.jpg",
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
    city: null,
    customBackground: null,
    customImage: null,
    width: null,
    height: null
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
  // Add event listener for the duplicate button
  document.addEventListener("click", function(e) {
    if (e.target && e.target.id === "duplicateButton") {
      const widget = document.querySelector(".widget");
      if (widget) {
        const clone = widget.cloneNode(true);
        document.querySelector("#widget_content").appendChild(clone);
      }
    }
  });
};
