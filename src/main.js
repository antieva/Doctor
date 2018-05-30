import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { bike } from './bike.js';

$(document).ready(function() {
  $('#bike').submit(function(event) {
    event.preventDefault();
    let date = $('#date').val();
    let location = $('#location').val();
    $('#location').val("");
    $('#date').val("");

    let request = new XMLHttpRequest();
    let url = `https://bikeindex.org:443/api/v3/search?page=1&per_page=25&location=${location}&distance=10&stolenness=proximity`;
console.log(url);
    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        let response = JSON.parse(this.responseText);
        getElements(response);
      }
    }

    request.open("GET", url, true);
    request.send();

    let getElements = function(response) {
      console.log(response);
      $('.showOutput').append('<h4>' + `The brand of the bike is ${response.bikes[0].manufacturer_name}.` + '</h4>');
      $('.showOutput').append('<p>' + `The serial number is ${response.bikes[0].serial}.` + '</p>');
      $('.showOutput').append('<p>' + `The color of the bike is ${response.bikes[0].frame_colors}.` + '</p>');
      $('.showOutput').append('<p>' + `Date stolen: ${response.bikes[0].date_stolen}.` + '</p>');
      }

    //   function(error) {
    //   $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    // }

  });
});
