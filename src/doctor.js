import $ from 'jquery';
import 'bootstrap';
import 'es6';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import './main.js';
var Promise = require('es6-promise').Promise;


export function get() {
  let issue = $('#simptom').val();
  $('#simptom').val("");
  return issue;
}
