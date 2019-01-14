'use strict';
import axios from 'axios';

function fixString() {
  var x = document.getElementById("subdomain");
  x.value = x.value.toLowerCase().replace(/\s+/g, '');
}

function subdomainInvalid() {
  var x = document.getElementById("subdomain");
  x.setCustomValidity('Por favor, preencha este campo.');
}

function subdomainValid() {
  var x = document.getElementById("subdomain");
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

document.getElementById("subdomain").addEventListener("keyup", fixString);
document.getElementById("subdomain").addEventListener("invalid", subdomainInvalid);
document.getElementById("subdomain").addEventListener("change", subdomainValid);
document.getElementById("email").addEventListener("invalid", emailInvalid);
document.getElementById("email").addEventListener("change", emailValid);
document.getElementById("terms").addEventListener("invalid", termInvalid);
document.getElementById("terms").addEventListener("change", termValid);

var form = document.querySelector("form");
form.addEventListener("submit", function(evt){
  var error = false, data = {};
  document.querySelector("input[type='submit']").disabled = true;
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
    return axios({
      method: 'post',
      url: "",
      data: data,
    })
    .then(function (response) {
        form.reset();
    })
  }
});
