import $ from 'jquery';
import 'bootstrap';
import 'es6';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import './main.js';
var Promise = require('es6-promise').Promise;


$(document).ready(function() {
  $('#search').submit(function(event) {
    event.preventDefault();

  });
});
