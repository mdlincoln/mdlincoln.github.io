const edtf = require('edtf');
const input_field = document.getElementsByName('edtf_input')[0];
const lower_field = document.getElementsByName('edtf_lower')[0];
const upper_field = document.getElementsByName('edtf_upper')[0];
const error_div = document.getElementById('error_div');
const error_list = document.getElementById('input_errors');
const submit_btn = document.getElementById('convert_btn');

const n_values_entered_el = document.getElementById("n_values_entered");
const n_blanks_el = document.getElementById("n_blanks");
const n_errors_el = document.getElementById("n_errors");

var n_values_entered = 0;
var n_blanks = 0;
var n_errors = 0;

n_values_entered_el.textContent = n_values_entered;
n_blanks_el.textContent = n_blanks;
n_errors_el.textContent = n_errors;

const reset_metrics = function () {
  n_values_entered = 0
  n_blanks = 0
  n_errors = 0
}

const onlyDateToString = function (d) {
  return d.toISOString().substring(0, 10)
}

const show_errors = function (bool) {
  if (bool) {
    error_div.setAttribute("class", "error_list")
  } else {
    error_div.setAttribute("class", "error_list hidden")
  }
}

const parse_boundaries = function (edtf_string) {
  n_values_entered += 1;
  if (!!edtf_string) {
    try {
      const parsed_date = edtf(edtf_string);
      const bottom = new Date(parsed_date.min)
      const top = new Date(parsed_date.max)
      return { lower_date: onlyDateToString(bottom), upper_date: onlyDateToString(top) }
    }
    catch (e) {
      // When line is error, update errors
      var parse_error = document.createElement("li")
      parse_error.innerHTML = `<code>${edtf_string}</code>`
      error_list.appendChild(parse_error)
      n_errors += 1;
    }
  }
  // When all else fails, return blank
  n_blanks += 1;
  return { lower_date: "", upper_date: "" }
}

const render_all_dates = function () {
  reset_metrics()
  show_errors(false)
  // Clear error list on update
  while (error_list.firstChild) {
    error_list.removeChild(error_list.firstChild);
  }
  const input_string = input_field.value
  var lower_dates = new Array
  var upper_dates = new Array
  input_string.split(/\r?\n/).forEach(e => {
    const lims = parse_boundaries(e)
    lower_dates.push(lims.lower_date)
    upper_dates.push(lims.upper_date)
  })
  lower_field.value = lower_dates.join("\n")
  upper_field.value = upper_dates.join("\n")
  n_values_entered_el.textContent = n_values_entered;
  n_blanks_el.textContent = n_blanks;
  n_errors_el.textContent = n_errors;
  if (error_list.firstChild) {
    show_errors(true)
  }
}

submit_btn.onclick = render_all_dates;