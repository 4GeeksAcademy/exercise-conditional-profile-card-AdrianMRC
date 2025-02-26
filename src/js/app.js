import "../style/index.css";

function render(variables = {}) {
  console.log("These are the current variables: ", variables); // print on the console

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
    "Full Name";
  const role = variables.role || "Role";
  const location =
    [variables.city, variables.country].filter(Boolean).join(", ") ||
    "City, Country";

  // Aplicar width y height al widget si están definidos
  const width = variables.width ? `${variables.width}px` : 500;
  const height = variables.height ? `${variables.height}px` : 500;

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
    includeCover: true,
    background: "https://images.unsplash.com/photo-1511974035430-5de47d3b95da",
    avatarURL: "https://randomuser.me/api/portraits/women/42.jpg",
    socialMediaPosition: "position-left",
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
  // Add event listener para el boton duplicador
  document.addEventListener("click", function(e) {
    if (e.target && e.target.id === "duplicateButton") {
      const widgetCloned = document.querySelector(".widget");
      if (widgetCloned) {
        const clone = widgetCloned.cloneNode(true);
        document.querySelector("#widget_content").appendChild(clone);
      }
    }
  });
};

/*
SE QUE NO HACE FALTA, PERO DEJO POR AQUI OTRA FUNCION RENDER PARA QUE EL TEXTO Y LAS IMAGENES SE AJUSTEN DEPENDIENDO DE EL WIDTH Y HEIGHT 
ME DABA UN POCO DE TOC QUE NO SE AJUSTASE CASI NADA A LA CARD :D

function render(variables = {}) {
  console.log("These are the current variables: ", variables); // print on the console

  // Calcular proporciones para adaptarse a la altura variable
  const heightValue = variables.height ? parseInt(variables.height) : 350;
  const defaultHeight = 350;
  const scaleFactor = heightValue / defaultHeight;

  // Calcular altura de la cover image proporcionalmente
  const coverHeight = Math.round(160 * scaleFactor);

  // Imagen de portada
  const backgroundUrl =
    variables.customBackground ||
    "https://images.unsplash.com/photo-1511974035430-5de47d3b95da";
  const cover = `<div class="cover" style="height: ${coverHeight}px;">
   ${
     variables.includeCover
       ? `<img src="${backgroundUrl}" style="min-height: ${coverHeight}px;" />`
       : ""
   }
 </div>`;

  // Foto de perfil
  const avatarUrl =
    variables.customImage || "https://randomuser.me/api/portraits/women/42.jpg";

  // Calcular posición y tamaño de la foto de perfil
  const photoTop = Math.round(85 * scaleFactor);
  const photoSize = Math.round(100 * scaleFactor);
  const photoMargin = Math.round(-55 * scaleFactor);

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
    "Full Name";
  const role = variables.role || "Role";
  const location =
    [variables.city, variables.country].filter(Boolean).join(", ") ||
    "City, Country";

  // Aplicar width y height al widget si están definidos
  const width = variables.width ? `${variables.width}px` : "300px";
  const height = variables.height ? `${variables.height}px` : "350px";

  // Calcular márgenes superiores para el texto
  const h1MarginTop = Math.round(60 * scaleFactor);

  // Calcular tamaños de fuente
  const h1FontSize = Math.max(16, Math.round(26 * scaleFactor));
  const h2FontSize = Math.max(12, Math.round(16 * scaleFactor));
  const h3FontSize = Math.max(10, Math.round(12 * scaleFactor));

  // HTML final
  document.querySelector(
    "#widget_content"
  ).innerHTML = `<div class="widget" style="width: ${width}; height: ${height};">
 ${cover}
 <img src="${avatarUrl}" class="photo" style="top: ${photoTop}px; width: ${photoSize}px; height: ${photoSize}px; margin: 0 0 0 ${photoMargin}px;" />
 <h1 style="margin-top: ${h1MarginTop}px; font-size: ${h1FontSize}px;">${fullName}</h1>
 <h2 style="font-size: ${h2FontSize}px;">${role}</h2>
 <h3 style="font-size: ${h3FontSize}px;">${location}</h3>
 <ul class="${socialPosition}" style="top: ${Math.round(
    20 * scaleFactor
  )}px;">${socialMedia}</ul>
</div>
<button id="duplicateButton">Duplicate Card</button>`;
}
*/
