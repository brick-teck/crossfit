"use strict";
// Inline SVG keeps icons available offline and avoids an additional CDN dependency.
const ICONS = {
  arrow: '<path d="M4 12h16m-6-6 6 6-6 6"/>',
  left: '<path d="M20 12H4m6-6-6 6 6 6"/>',
  diagonal: '<path d="M6 18 18 6M6 6h12v12"/>',
  down: '<path d="M12 4v16m-6-6 6 6 6-6"/>',
  up: '<path d="M12 20V4m-6 6 6-6 6 6"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  close: '<path d="m6 6 12 12M6 18 18 6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  barbell: '<path d="M2 9v6m3-9v12m14-12v12m3-9v6M5 12h14"/>',
  activity: '<path d="M2 12h5l3-8 4 16 3-8h5"/>',
  pulse: '<path d="M2 12h4l3-7 6 14 3-7h4"/>',
  people:
    '<circle cx="9" cy="7" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3M16 4a3 3 0 0 1 0 6m2 5a5 5 0 0 1 3 5"/>',
  target:
    '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v.1"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
};
const icon = (name) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ICONS.arrow}</svg>`;
const escapeHTML = (value) =>
  String(value ?? "").replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ],
  );
const select = (selector) => document.querySelector(selector);
const all = (selector) => [...document.querySelectorAll(selector)];
const imagePath = (value) =>
  /^(assets\/images\/|https:\/\/)/.test(String(value))
    ? escapeHTML(value)
    : "assets/images/box.jpg";
const safeURL = (value) => {
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.href : "";
  } catch {
    return "";
  }
};
const currency = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
let selectedPeriod = CONFIG.periodos[0].id;
let galleryIndex = 0;
const dialogTriggers = new Map();

function hydrateIcons(scope = document) {
  scope.querySelectorAll("[data-icon]").forEach((el) => {
    el.innerHTML = icon(el.dataset.icon);
  });
}
function showDialog(dialog) {
  if (dialog.open) return;
  dialogTriggers.set(dialog.id, document.activeElement);
  dialog.showModal();
  document.body.classList.add("modal-open");
}
function abrirModalDemo(text, title = "CONHEÇA O BOX.") {
  select("#dialog-title").textContent = title;
  select("#dialog-text").textContent = text;
  showDialog(select("#info-dialog"));
}
function abrirWhatsApp(message) {
  const number = String(CONFIG.whatsapp || "").replace(/\D/g, "");
  if (!/^[1-9]\d{9,14}$/.test(number)) {
    abrirModalDemo(
      "Contato disponível na versão oficial. Este website é uma demonstração. Configure o WhatsApp do box para solicitar informações e combinar sua visita.",
      "SEU PRIMEIRO PASSO.",
    );
    return;
  }
  window.open(
    `https://wa.me/${number}?text=${encodeURIComponent(message)}`,
    "_blank",
    "noopener,noreferrer",
  );
}
function renderModalities() {
  select("#modalidades-grid").innerHTML = CONFIG.modalidades
    .map(
      (item, index) =>
        `<article class="modality-card reveal"><div class="card-photo"><img src="${imagePath(item.imagem)}" alt="Fotografia ilustrativa de ${escapeHTML(item.nome)}" width="800" height="550" loading="lazy"><span class="card-tag">${escapeHTML(item.tag)}</span></div><div class="card-body"><div class="card-title"><h3>${escapeHTML(item.nome)}</h3>${icon(item.icon)}</div><p>${escapeHTML(item.texto)}</p><button class="text-link" data-modality="${index}" aria-label="Saiba mais sobre ${escapeHTML(item.nome)}">Saiba mais ${icon("arrow")}</button></div></article>`,
    )
    .join("");
}
function renderPlans() {
  const period = CONFIG.periodos.find((item) => item.id === selectedPeriod);
  select("#planos-grid").innerHTML = CONFIG.planos
    .map(
      (plan, index) =>
        `<article class="plan-card ${plan.destaque ? "featured" : ""}">${plan.destaque ? '<span class="plan-badge">MAIS ESCOLHIDO · EXEMPLO</span>' : ""}<h3>${escapeHTML(plan.nome)}</h3><p class="plan-description">${escapeHTML(plan.descricao)}</p><div class="price"><span class="currency">R$</span><span class="price-value">${currency.format(plan.precos[selectedPeriod])}</span><span class="price-unit">/${escapeHTML(period.unidade)}</span></div><p class="billing-note">Valor total ilustrativo por ${escapeHTML(period.unidade)}.</p><ul>${plan.beneficios.map((benefit) => `<li>${icon("check")}<span>${escapeHTML(benefit)}</span></li>`).join("")}</ul><button class="button ${plan.destaque ? "button-primary" : "button-outline"}" data-plan="${index}" aria-label="Escolher plano ${escapeHTML(plan.nome)}">Escolher plano ${icon("arrow")}</button></article>`,
    )
    .join("");
  all("#period-selector button").forEach((button) =>
    button.setAttribute(
      "aria-pressed",
      String(button.dataset.period === selectedPeriod),
    ),
  );
}
function renderSchedule(index, focus = false) {
  const day = CONFIG.horarios[index];
  const tabs = all("#schedule-tabs button");
  tabs.forEach((tab, i) => {
    tab.setAttribute("aria-selected", String(i === index));
    tab.tabIndex = i === index ? 0 : -1;
  });
  const panel = select("#schedule-panel");
  panel.setAttribute("aria-labelledby", `day-${index}`);
  panel.innerHTML = day.aulas.length
    ? day.aulas
        .map(
          ([time, type, coach]) =>
            `<div class="schedule-row"><span class="schedule-time">${escapeHTML(time)}</span><span class="schedule-type">${icon("barbell")}${escapeHTML(type)}</span><span class="schedule-coach">${escapeHTML(coach || "A confirmar")}</span><span class="schedule-status">Consultar vagas<button data-class-info="${escapeHTML(`${day.dia} às ${time} — ${type}`)}" aria-label="Consultar aula de ${escapeHTML(type)} de ${escapeHTML(day.dia)} às ${escapeHTML(time)}">${icon("arrow")}</button></span></div>`,
        )
        .join("")
    : '<p class="schedule-bottom">Nenhuma aula cadastrada para este dia. Consulte a equipe para conhecer a programação.</p>';
  if (focus) tabs[index].focus();
}
function renderCoaches() {
  select("#coaches-grid").innerHTML = CONFIG.coaches
    .map(
      (coach, index) =>
        `<article class="coach-card reveal"><div class="coach-photo"><img src="${imagePath(coach.imagem)}" style="object-position:${escapeHTML(coach.posicao || "center")}" alt="Foto ilustrativa para o perfil fictício de ${escapeHTML(coach.nome)}" width="600" height="800" loading="lazy"><span>PERFIL ILUSTRATIVO</span></div><div class="coach-details"><h3>${escapeHTML(coach.nome)}</h3><p class="coach-specialty">${escapeHTML(coach.especialidade)}</p><p>${escapeHTML(coach.descricao)}</p><button class="text-link" data-coach="${index}" aria-label="Conhecer ${escapeHTML(coach.nome)}">Conhecer ${icon("diagonal")}</button></div></article>`,
    )
    .join("");
}
function renderGallery() {
  select("#gallery-grid").innerHTML = CONFIG.galeria
    .map(
      (photo, index) =>
        `<button class="gallery-item reveal" data-gallery="${index}" aria-label="Ampliar: ${escapeHTML(photo.titulo)}"><img src="${imagePath(photo.imagem)}" alt="${escapeHTML(photo.alt)}; fotografia ilustrativa" width="900" height="700" loading="lazy"><span class="gallery-title">${escapeHTML(photo.titulo)} ${icon("plus")}</span></button>`,
    )
    .join("");
}
function updateLightbox() {
  const photo = CONFIG.galeria[galleryIndex];
  const img = select("#lightbox-image");
  img.src = photo.imagem;
  img.alt = `${photo.alt}; fotografia ilustrativa`;
  select("#lightbox-caption").textContent =
    `${photo.titulo} · Foto ilustrativa`;
  select("#lightbox-counter").textContent =
    `${galleryIndex + 1} / ${CONFIG.galeria.length}`;
}
function moveGallery(direction) {
  galleryIndex =
    (galleryIndex + direction + CONFIG.galeria.length) % CONFIG.galeria.length;
  updateLightbox();
}
function renderWod() {
  const wod = CONFIG.wod;
  select("#wod-board").innerHTML =
    `<div class="board-top"><span>FORGE BOX / TRAINING BOARD</span><span>WOD DEMONSTRATIVO</span></div><h3 class="board-name">${escapeHTML(wod.nome)}</h3><div class="board-timer">${escapeHTML(wod.duracao)}<span>${escapeHTML(wod.tipo)}</span></div><p class="board-format">${escapeHTML(wod.formato)}</p><ul class="board-movements">${wod.movimentos.map(([quantity, movement]) => `<li><strong>${escapeHTML(quantity)}</strong><span>${escapeHTML(movement)}</span></li>`).join("")}</ul><p class="board-note">${escapeHTML(wod.orientacao)}</p>`;
}
function renderCommunity() {
  select("#events-grid").innerHTML = CONFIG.eventos
    .map(
      (event, index) =>
        `<article class="event-card reveal"><div class="event-photo"><img src="${imagePath(event.imagem)}" alt="Fotografia ilustrativa de treino para ${escapeHTML(event.nome)}" width="800" height="550" loading="lazy"><span class="card-tag">${escapeHTML(event.tag)}</span></div><h3>${escapeHTML(event.nome)}</h3><p>${escapeHTML(event.texto)}</p><button class="text-link" data-event="${index}">Conhecer a proposta ${icon("arrow")}</button></article>`,
    )
    .join("");
  select("#testimonials-grid").innerHTML = CONFIG.depoimentos
    .map(
      (item) =>
        `<article class="testimonial reveal"><div class="stars" aria-label="Cinco estrelas ilustrativas">★★★★★</div><blockquote>“${escapeHTML(item.texto)}”</blockquote><div class="testimonial-author"><span class="author-avatar" aria-hidden="true">${escapeHTML(item.nome.slice(0, 1))}</span><div><strong>${escapeHTML(item.nome)}</strong><small>Depoimento fictício · Exemplo de layout</small></div></div></article>`,
    )
    .join("");
}
function renderFaq() {
  select("#faq-list").innerHTML = CONFIG.faq
    .map(
      ([question, answer], index) =>
        `<div class="faq-item"><h3><button class="faq-question" id="faq-question-${index}" aria-expanded="false" aria-controls="faq-answer-${index}">${escapeHTML(question)}${icon("plus")}</button></h3><div class="faq-answer" id="faq-answer-${index}" role="region" aria-labelledby="faq-question-${index}" hidden>${escapeHTML(answer)}</div></div>`,
    )
    .join("");
}
function configureLocation() {
  select("#opening-hours").textContent = CONFIG.funcionamento;
  if (!CONFIG.endereco.trim()) return;
  select("#address-text").textContent = CONFIG.endereco;
  const maps =
    safeURL(CONFIG.mapsUrl) ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONFIG.endereco)}`;
  select("#directions-button").dataset.maps = maps;
  const mapArea = select("#map-area");
  mapArea.classList.add("has-map");
  mapArea.innerHTML = `<iframe title="Mapa de localização de ${escapeHTML(CONFIG.nome)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://maps.google.com/maps?q=${encodeURIComponent(CONFIG.endereco)}&output=embed"></iframe>`;
}
function toggleMenu(open) {
  select("#menu-toggle").setAttribute("aria-expanded", String(open));
  select("#menu-toggle").setAttribute(
    "aria-label",
    open ? "Fechar menu" : "Abrir menu",
  );
  select("#main-nav").classList.toggle("open", open);
  if (open) select("#main-nav a")?.focus();
}
function setupEvents() {
  document.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    if (button.dataset.contact)
      abrirWhatsApp(
        CONFIG.mensagens[button.dataset.contact] || CONFIG.mensagens.contato,
      );
    if ("plan" in button.dataset) {
      const plan = CONFIG.planos[Number(button.dataset.plan)];
      const period = CONFIG.periodos.find((item) => item.id === selectedPeriod);
      abrirWhatsApp(
        `Olá! Gostaria de saber mais sobre o plano ${plan.nome} na periodicidade ${period.nome.toLowerCase()}.`,
      );
    }
    if (button.dataset.period) {
      selectedPeriod = button.dataset.period;
      renderPlans();
    }
    if ("day" in button.dataset) renderSchedule(Number(button.dataset.day));
    if ("modality" in button.dataset) {
      const item = CONFIG.modalidades[Number(button.dataset.modality)];
      abrirModalDemo(
        `${item.detalhe} Modalidade demonstrativa; confirme a oferta real com a equipe.`,
        item.nome.toUpperCase(),
      );
    }
    if ("coach" in button.dataset) {
      const coach = CONFIG.coaches[Number(button.dataset.coach)];
      abrirModalDemo(
        `${coach.especialidade}. ${coach.descricao} A fotografia é ilustrativa e não representa esse profissional.`,
        coach.nome.toUpperCase(),
      );
    }
    if ("event" in button.dataset) {
      const item = CONFIG.eventos[Number(button.dataset.event)];
      abrirModalDemo(item.texto, item.nome.toUpperCase());
    }
    if (button.dataset.classInfo)
      abrirWhatsApp(
        `Olá! Gostaria de informações sobre a aula de ${button.dataset.classInfo}.`,
      );
    if ("gallery" in button.dataset) {
      galleryIndex = Number(button.dataset.gallery);
      updateLightbox();
      showDialog(select("#lightbox"));
    }
    if (button.dataset.close) select(`#${button.dataset.close}`).close();
    if (button.classList.contains("faq-question")) {
      const expanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!expanded));
      document.getElementById(button.getAttribute("aria-controls")).hidden =
        expanded;
    }
    if ("instagram" in button.dataset) {
      const url = safeURL(CONFIG.instagram);
      if (url && /(^|\.)instagram\.com$/.test(new URL(url).hostname))
        window.open(url, "_blank", "noopener,noreferrer");
      else
        abrirModalDemo(
          "O Instagram do box estará disponível na versão oficial. Este website é uma demonstração.",
          "VAMOS NOS CONECTAR.",
        );
    }
  });
  select("#directions-button").addEventListener("click", (event) => {
    const maps = event.currentTarget.dataset.maps;
    if (maps) window.open(maps, "_blank", "noopener,noreferrer");
    else
      abrirModalDemo(
        "A localização estará disponível na versão oficial. O endereço do box ainda não foi configurado.",
        "NOS VEMOS NO BOX.",
      );
  });
  select("#menu-toggle").addEventListener("click", () =>
    toggleMenu(select("#menu-toggle").getAttribute("aria-expanded") !== "true"),
  );
  all("#main-nav a").forEach((link) =>
    link.addEventListener("click", () => toggleMenu(false)),
  );
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".header")) toggleMenu(false);
  });
  window
    .matchMedia("(min-width:1051px)")
    .addEventListener("change", (event) => {
      if (event.matches) toggleMenu(false);
    });
  select("#schedule-tabs").addEventListener("keydown", (event) => {
    const tab = event.target.closest("[role=tab]");
    if (!tab) return;
    const index = Number(tab.dataset.day),
      count = CONFIG.horarios.length;
    const target = {
      ArrowRight: (index + 1) % count,
      ArrowLeft: (index - 1 + count) % count,
      Home: 0,
      End: count - 1,
    }[event.key];
    if (target !== undefined) {
      event.preventDefault();
      renderSchedule(target, true);
    }
  });
  select("#lightbox-prev").addEventListener("click", () => moveGallery(-1));
  select("#lightbox-next").addEventListener("click", () => moveGallery(1));
  document.addEventListener("keydown", (event) => {
    const modal = all("dialog").find((dialog) => dialog.open);
    if (modal && event.key === "Tab") {
      const controls = [
        ...modal.querySelectorAll(
          'a[href],button:not(:disabled),input:not(:disabled),[tabindex="0"]',
        ),
      ].filter((el) => el.getClientRects().length);
      const first = controls[0],
        last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }
    if (
      select("#lightbox").open &&
      ["ArrowLeft", "ArrowRight"].includes(event.key)
    ) {
      event.preventDefault();
      moveGallery(event.key === "ArrowLeft" ? -1 : 1);
    }
    if (
      event.key === "Escape" &&
      select("#main-nav").classList.contains("open")
    ) {
      toggleMenu(false);
      select("#menu-toggle").focus();
    }
  });
  all("dialog").forEach((dialog) => {
    dialog.addEventListener("close", () => {
      if (!all("dialog").some((item) => item.open))
        document.body.classList.remove("modal-open");
      const trigger = dialogTriggers.get(dialog.id);
      if (trigger?.isConnected) trigger.focus({ preventScroll: true });
    });
    dialog.addEventListener("click", (event) => {
      const rect = dialog.getBoundingClientRect();
      if (
        event.target === dialog &&
        (event.clientX < rect.left ||
          event.clientX > rect.right ||
          event.clientY < rect.top ||
          event.clientY > rect.bottom)
      )
        dialog.close();
    });
  });
  let queued = false;
  const updateScroll = () => {
    select("#header").classList.toggle("scrolled", window.scrollY > 35);
    select("#back-top").hidden = window.scrollY < 700;
    queued = false;
  };
  window.addEventListener(
    "scroll",
    () => {
      if (!queued) {
        queued = true;
        requestAnimationFrame(updateScroll);
      }
    },
    { passive: true },
  );
  updateScroll();
}
function setupReveal() {
  if (!("IntersectionObserver" in window)) return;
  document.body.classList.add("motion-enabled");
  const reveal = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          reveal.unobserve(entry.target);
        }
      }),
    { threshold: 0.08 },
  );
  all(".reveal").forEach((el) => reveal.observe(el));
  const navLinks = all("#main-nav a");
  const navObserver = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting)
          navLinks.forEach((link) => {
            const active = link.hash === `#${entry.target.id}`;
            link.classList.toggle("active", active);
            if (active) link.setAttribute("aria-current", "location");
            else link.removeAttribute("aria-current");
          });
      }),
    { rootMargin: "-15% 0px -65% 0px" },
  );
  navLinks.forEach((link) => {
    const target = select(link.hash);
    if (target) navObserver.observe(target);
  });
}
function syncBrand() {
  all("[data-brand]").forEach((el) => {
    const parts = CONFIG.nome.split(" ");
    const last = parts.pop();
    el.innerHTML = `${escapeHTML(parts.join(" "))}<span class="brand-box">${escapeHTML(last)}</span>`;
  });
  all("[data-box-name]").forEach((el) => {
    el.textContent = CONFIG.nome;
  });
  all("[data-slogan]").forEach((el) => {
    el.textContent = CONFIG.slogan;
  });
  document.title = `${CONFIG.nome} — ${CONFIG.slogan}`;
  select(".header .brand").setAttribute("aria-label", `${CONFIG.nome}, início`);
  select(".hero-side").textContent = `${CONFIG.slogan} — ${CONFIG.nome}`;
  select(".about-copy .eyebrow").textContent = `Bem-vindo à ${CONFIG.nome}`;
  select("#info-dialog .eyebrow").textContent = `${CONFIG.nome} / Demonstração`;
  select(".board-top span").textContent = `${CONFIG.nome} / TRAINING BOARD`;
}
function init() {
  if (/^#[0-9a-f]{6}$/i.test(CONFIG.cores.primaria))
    document.documentElement.style.setProperty(
      "--primary",
      CONFIG.cores.primaria,
    );
  if (/^#[0-9a-f]{6}$/i.test(CONFIG.cores.fundo))
    document.documentElement.style.setProperty("--bg", CONFIG.cores.fundo);
  [
    ["hero-image", "hero"],
    ["trial-image", "experimental"],
    ["about-image", "sobre"],
    ["final-image", "final"],
  ].forEach(([id, key]) => {
    document.getElementById(id).src = CONFIG.imagens[key];
  });
  select("#current-year").textContent = new Date().getFullYear();
  select("#period-selector").innerHTML = CONFIG.periodos
    .map(
      (period) =>
        `<button data-period="${escapeHTML(period.id)}" aria-pressed="${period.id === selectedPeriod}">${escapeHTML(period.nome)}</button>`,
    )
    .join("");
  select("#schedule-tabs").innerHTML = CONFIG.horarios
    .map(
      (day, index) =>
        `<button role="tab" id="day-${index}" data-day="${index}" aria-controls="schedule-panel" aria-selected="${index === 0}" tabindex="${index === 0 ? "0" : "-1"}">${escapeHTML(day.dia)}</button>`,
    )
    .join("");
  renderModalities();
  renderPlans();
  renderSchedule(0);
  renderCoaches();
  renderGallery();
  renderWod();
  renderCommunity();
  renderFaq();
  configureLocation();
  hydrateIcons();
  setupEvents();
  setupReveal();
  syncBrand();
}
init();
