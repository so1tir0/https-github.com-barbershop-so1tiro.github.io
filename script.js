(function(){
  "use strict";
  var STORE = "bit_cookie_choice";

  document.getElementById("year").textContent = new Date().getFullYear();

  // бургер-меню
  var burger = document.getElementById("burger"), links = document.getElementById("navLinks");
  burger.addEventListener("click", function(){
    var open = links.classList.toggle("open");
    burger.setAttribute("aria-expanded", String(open));
  });
  links.addEventListener("click", function(e){
    if (e.target.tagName === "A") { links.classList.remove("open"); burger.setAttribute("aria-expanded","false"); }
  });

  // модальные окна
  var lastFocus = null;
  function openModal(id){
    var m = document.getElementById("m-" + id);
    if (!m) return;
    lastFocus = document.activeElement;
    m.classList.add("open");
    document.body.classList.add("locked");
    var f = m.querySelector(".modal-body"); if (f) f.focus();
  }
  function closeModals(){
    var open = document.querySelectorAll(".modal.open");
    for (var i=0;i<open.length;i++) open[i].classList.remove("open");
    document.body.classList.remove("locked");
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  document.addEventListener("click", function(e){
    var t = e.target.closest ? e.target.closest("[data-modal]") : null;
    if (t) { e.preventDefault(); openModal(t.getAttribute("data-modal")); return; }
    if (e.target.hasAttribute && e.target.hasAttribute("data-close")) { closeModals(); return; }
    if (e.target.classList && e.target.classList.contains("modal")) closeModals();
  });
  document.addEventListener("keydown", function(e){ if (e.key === "Escape") closeModals(); });

  // cookie-баннер
  var bar = document.getElementById("cookieBar");
  var stored = null;
  try { stored = localStorage.getItem(STORE); } catch(err) {}
  if (!stored) bar.classList.add("show");
  function choose(v){
    try { localStorage.setItem(STORE, v); } catch(err) {}
    bar.classList.remove("show");
  }
  document.getElementById("cookieAccept").addEventListener("click", function(){ choose("all"); });
  document.getElementById("cookieDecline").addEventListener("click", function(){ choose("necessary"); });

  // валидация формы (только на клиенте, данные никуда не отправляются)
  var form = document.getElementById("bookForm");
  function setErr(id, bad){ document.getElementById(id).classList.toggle("invalid", bad); }
  function digits(s){ return (s || "").replace(/\D/g, ""); }
  form.addEventListener("submit", function(e){
    e.preventDefault();
    var name = form.name.value.trim().slice(0,60);
    var phone = digits(form.phone.value);
    var service = form.service.value;
    var agree = document.getElementById("agree").checked;

    var badName = name.length < 2 || !/^[A-Za-zА-Яа-яЁё\s\-']{2,60}$/.test(name);
    var badPhone = !(phone.length === 11 || phone.length === 10);
    var badService = !service;
    var badAgree = !agree;

    setErr("f-name", badName); setErr("f-phone", badPhone);
    setErr("f-service", badService); setErr("f-agree", badAgree);

    var firstBad = form.querySelector(".field.invalid input, .field.invalid select");
    if (badName || badPhone || badService || badAgree) { if (firstBad) firstBad.focus(); return; }

    document.getElementById("formSuccess").style.display = "block";
    form.reset();
  });
})();
