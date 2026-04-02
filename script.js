document.addEventListener("DOMContentLoaded", () => {
  // Dark/Light mode
  const btn = document.getElementById("themeToggle");

  btn.addEventListener("click", () => {
    document.documentElement.classList.toggle("light");

    if (document.documentElement.classList.contains("light")) {
      btn.textContent = "🌙";
    } else {
      btn.textContent = "☀️";
    }
  });

  // Perfis
  const perfilLinks = document.querySelectorAll(
    'a[href="catalogo/catalogo.html"]',
  );

  perfilLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault(); // segura a navegação

      const figcaption = link.querySelector("figcaption");
      const img = link.querySelector("img");

      const nome = figcaption ? figcaption.textContent.trim() : "";
      let imgSrc = img ? img.getAttribute("src") : "";

      if (imgSrc && imgSrc.startsWith("/")) {
        imgSrc = ".." + imgSrc;
      } else if (imgSrc && !imgSrc.startsWith("http")) {
        imgSrc = "../" + imgSrc; // adiciona ../ para caminhos relativos sem /
      }

      try {
        localStorage.setItem("selectedProfileName", nome);
        localStorage.setItem("selectedProfileImage", imgSrc);
      } catch (e) {
        console.warn(
          "Não foi possível salvar o perfil selecionado no localStorage",
          e,
        );
      }

      // Ativa o preloader com a foto do perfil
      const preloader = document.getElementById("preloader");
      const preloaderFoto = document.getElementById("preloaderFoto");

      preloaderFoto.src = img ? img.src : "";
      preloader.classList.add("ativo");

      // Aguarda 2 segundos e navega
      setTimeout(() => {
        window.location.href = "catalogo/catalogo.html";
      }, 2000);
    });
  });
});
