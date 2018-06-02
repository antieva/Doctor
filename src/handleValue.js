import $ from 'jquery';
import 'bootstrap';
import 'es6';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import './main.js';
var Promise = require('es6-promise').Promise;


export function handle(value) {
  let promise = new Promise(function(resolve, reject) {
   let request = new XMLHttpRequest();
   let url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${value}&location=47.5994832%2C-122.3338803%2C20&user_location=47.5994832%2C-122.3338803&skip=0&limit=100&user_key=${process.env.exports.apiKey}`;
   request.onload = function() {
     if (this.status === 200) {
       resolve(request.response);
     } else {
       reject(Error(request.statusText));
     }
   }
   request.open("GET", url, true);
   request.send();
 });
 promise.then(function(response) {
   let counter = 0;
   response = JSON.parse(response);
   let result = response.data;
   $('#output').hide();
   $('.showOutput').empty();
   $('.showHowMany').empty();
   $('#showPractice').empty();

   result.forEach(function(doctor) {
     let practicesCounter = 0;
     let practices = doctor.practices;
     practices.forEach(function(practice) {
       if (practice.within_search_area) {
         practicesCounter++;
       }
     });
     if (practicesCounter > 0) {
       counter++;
       $('.showOutput').append(`<h4>${counter}. <span class="big">${doctor.profile.first_name} ${doctor.profile.last_name}, ${doctor.profile.title}.</span></h4>`);
       $('.showOutput').append(`Locations: <br><br>`);

       practices.forEach(function(practice) {
         if (practice.within_search_area) {
           $('.showOutput').append(`<h6>${practice.name}</h6>`);
           $('.showOutput').append(`Website: <a href ='${practice.website}'>${practice.website || 'N/A'}</a><br>`);
           $('.showOutput').append(`Address: ${practice.visit_address.city}, ${practice.visit_address.state}, ${practice.visit_address.street} ${practice.visit_address.street2 || ''}, ${practice.visit_address.zip}<br>`);
           let phones = practice.phones;
           let stringOfPN = phones[0].number;
           for (let i = 0; i < phones.length; i++) {
             stringOfPN = stringOfPN + `, ${phones[i].number}`;
           }
           $('.showOutput').append(`Phones: ${stringOfPN}<br>`);
           $('.showOutput').append(`Accepts new parients: ${practice.accepts_new_patients}.<br><br>`);
         }
        });
        $('.showOutput').append('<hr>')
      }

   })
   if (counter === 0) {
     $('.showOutput').text(`No doctors were found.`);
   } else {
        $('.showHowMany').text(`Search result: ${counter} doctors.`);
      }
 }, function(error) {
   $('.showErrors').text(`There was an error processing your request: ${error.message}`);
 });
}
