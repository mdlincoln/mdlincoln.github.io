const edtf = require('edtf');

const input_field = document.getElementById('edtf_input');
const lower_field = document.getElementById('edtf_lower')
const upper_field = document.getElementById('edtf_upper')

const onlyDateToString = function (d) {
  return d.toISOString().substring(0, 9)
}

const parse_boundaries = function (edtf_string) {
  if (!!edtf_string) {
    const parsed_date = edtf(edtf_string);
    const bottom = new Date(parsed_date.min)
    const top = new Date(parsed_date.max)
    return { lower_date: onlyDateToString(bottom), upper_date: onlyDateToString(top) }
  } else {
    return { lower_date: "", upper_date: "" }
  }
}

const render_all_dates = function (all_input) {
  const input_string = all_input.target.value
  var lower_dates = new Array
  var upper_dates = new Array
  input_string.split("\n").forEach(e => {
    const lims = parse_boundaries(e)
    lower_dates.push(lims.lower_date)
    upper_dates.push(lims.upper_date)
  })
  lower_field.value = lower_dates.join("\n")
  upper_field.value = upper_dates.join("\n")
}

input_field.addEventListener('input', render_all_dates);