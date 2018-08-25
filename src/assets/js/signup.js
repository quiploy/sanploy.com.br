'use strict';
import axios from 'axios';

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
	if (!error) {
    return axios({
      method: 'post',
      url: "https://app.dev.quiploy.com/users/",
      data: data,
    })
    .then(function (response) {
      form.reset();
    });
  }
});
