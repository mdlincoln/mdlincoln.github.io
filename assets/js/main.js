const edtf = require('edtf');

var input_field = document.getElementById('edtf_input');

const lower_field = document.getElementById('edtf_lower')
const upper_field = document.getElementById('edtf_upper')

const update_dates = function (edtf_input) {
  const edtf_string = edtf_input.target.value
  if (!!edtf_string) {
    var parsed_date = edtf(edtf_string);
    var lower_date = new Date(parsed_date.min)
    var upper_date = new Date(parsed_date.max)
    lower_field.value = lower_date.toISOString();
    upper_field.value = upper_date.toISOString();
  }
}

input_field.addEventListener('input', update_dates);