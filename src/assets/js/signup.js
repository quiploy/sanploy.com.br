'use strict';
import axios from 'axios';

function fixString() {
  var x = document.getElementById("subdomain"),
    regex = /^[0-9a-z].(?:[\w-]+)[0-9a-z]$/g;

  x.value = x.value.toLowerCase().replace(/\s+/g, '');
  if (x.value.match(regex) === null && x.value !== "") {
    x.value = x.value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/([^a-z0-9]+)/gi, "");
  }
}

function subdomainInvalid() {
  var x = document.getElementById("subdomain");
  x.setCustomValidity('Por favor, preencha este campo.');
}

function subdomainValid() {
  var x = document.getElementById("subdomain");
  x.setCustomValidity('');
}

function phoneInvalid() {
  var x = document.getElementById("phone");
  x.setCustomValidity('Por favor, coloque seu contato.');
}

function phoneValid() {
  var x = document.getElementById("phone");
  x.setCustomValidity('');
}

function emailInvalid() {
  var x = document.getElementById("email");
  x.setCustomValidity('Por favor, preencha com seu e-mail.');
}

function emailValid() {
  var x = document.getElementById("email");
  x.setCustomValidity('');
}

function termInvalid() {
  var x = document.getElementById("terms");
  x.setCustomValidity('Para continuar você precisa concordar com os Termos e Condições.');
}

function termValid() {
  var x = document.getElementById("terms");
  x.setCustomValidity('');
}

function formatPhone(evt) {
  var el = evt.target, value;
  value = el.value.replace(/\D/g, "");
  value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
  value = value.replace(/(\d)(\d{4})$/, "$1-$2");
  el.value = value;
}

function checkPhone() {
  var el;
  el = document.getElementById("phone");
  if (el) {
    el.addEventListener("input", formatPhone);
  }
}

document.addEventListener("DOMContentLoaded", checkPhone);

document.addEventListener("DOMContentLoaded", function() {
  var baseUrl = "https://app.sanploy.com.br/",
    form = document.querySelector("form");

  document.getElementById("subdomain").addEventListener("keyup", fixString);
  document.getElementById("subdomain").addEventListener("invalid", subdomainInvalid);
  document.getElementById("subdomain").addEventListener("change", subdomainValid);
  document.getElementById("phone").addEventListener("invalid", phoneInvalid);
  document.getElementById("phone").addEventListener("change", phoneValid);
  document.getElementById("email").addEventListener("invalid", emailInvalid);
  document.getElementById("email").addEventListener("change", emailValid);
  document.getElementById("terms").addEventListener("invalid", termInvalid);
  document.getElementById("terms").addEventListener("change", termValid);
  axios({
    method: 'get',
    url: baseUrl + "get_token",
  })
  .then(function (response) {
    form.querySelector("input[name='csrfmiddlewaretoken']").value = response.data.csrf_token;
  })

  form.addEventListener("submit", function(evt){
    var error = false,
      center = document.createElement("center"),
      strong = document.createElement("strong"),
      data = {};
    evt.preventDefault();
    document.querySelectorAll("input").forEach(
      function (el) {
        if (el.className.indexOf("submit") === -1 && el.value === "" || (el.type == "email" && !el.checkValidity())) {
          el.style["border-color"] = "red";
          error = true;
        } else {
          el.style["border-color"] = "#c6eaf7";
          data[el.name] = el.value;
        }
    });
    delete data[""];

    if (!error) {
      axios.get(baseUrl + "users/", {
        params: {
          subdomain: data["subdomain"],
          phone: data["phone"],
          email: data["email"]
        }
      })
      .then(function (response) {
        if(response.data['subdomain'] == data['subdomain']){
          var alert = document.getElementById("alert-subdomain");
          alert.setAttribute("class", "alert small-11 cell input-group");
          alert.innerHTML = data['subdomain'] + " já existe, por favor escolha outro."
        }
        else {
          var alert = document.getElementById("alert-subdomain");
          alert.removeAttribute("class");
          alert.innerHTML = ""
        }
        if(response.data['email'] == data['email']){
          var alert = document.getElementById("alert-email");
          alert.setAttribute("class", "alert small-11 cell input-group");
          alert.innerHTML = data['email'] + " já existe, por favor escolha outro."
        }
        else {
          var alert = document.getElementById("alert-email");
          alert.removeAttribute("class");
          alert.innerHTML = ""
        }
        if (response.status == 204) {
          document.getElementsByClassName("button submit")[0].value = "Processando...."
          document.getElementsByClassName("button submit")[0].disabled = true;
        }
      })

      return axios({
        method: 'post',
        url: baseUrl + "users/",
        data: data,
      })
      .then(function (response) {
        strong.innerText = response.data["response"];
        center.appendChild(strong);
        form.innerHTML = "";
        form.appendChild(center);
      })
      .catch(function (error) {
        if (error.response.status != 304) {
          form.reset();
          strong.innerText = "Desculpe, tivemos um problema com o seu cadastro. Por favor, nos envie um e-mail para suporte@sanploy.com.br";
          center.appendChild(strong);
          form.innerHTML = "";
          form.appendChild(center);
        }
      })
    }
  });
});
