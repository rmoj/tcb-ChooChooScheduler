// https://choochooscheduler-307d2.firebaseio.com/

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyA9z7yj1LsrEQJnZYjaEHntEXJJk7oBDFw',
  authDomain: 'choochooscheduler-307d2.firebaseapp.com',
  databaseURL: 'https://choochooscheduler-307d2.firebaseio.com',
  projectId: 'choochooscheduler-307d2',
  storageBucket: 'choochooscheduler-307d2.appspot.com',
  messagingSenderId: '672866618830'
};
firebase.initializeApp(config);
var db = firebase.database();

$('.btn').on('click', function() {
  event.preventDefault();

  var name = $('#name')
    .val()
    .trim();
  var destination = $('#destination')
    .val()
    .trim();
  var firstTime = $('#firstTime')
    .val()
    .trim();
  var frequency = $('#frequency')
    .val()
    .trim();

  if (
    name.length > 0 &&
    destination.length > 0 &&
    firstTime.length > 0 &&
    frequency.length > 0
  ) {
    db.ref().push({
      name: name,
      destination: destination,
      firstTime: firstTime,
      frequency: frequency,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
  }
});
