$(document).ready(function() {
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
      frequency.length > 0 &&
      frequency > 0 &&
      frequency <= 1440
    ) {
      db.ref().push({
        name: name,
        destination: destination,
        firstTime: firstTime,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });

      $('.form-control').val('');
    } else {
      alert(
        'Fields should not be left blank and frequency should only have a value of 1-1400.'
      );
    }
  });

  db.ref().on('child_added', function(snapshot) {
    var snap = snapshot.val();

    var row = $('<tr>');
    var colName = $('<td>').text(snap.name);
    var colDestination = $('<td>').text(snap.destination);
    var colFrequency = $('<td>').text(snap.frequency);

    var safeStart = moment(snap.firstTime, 'HH:mm').subtract(1, 'years');
    var freq = parseInt(snap.frequency);
    var current = moment();
    var elapsed = parseInt(current.diff(safeStart, 'minutes'));
    var away = freq - (elapsed % freq);
    var next = current.add(away, 'minutes').format('HH:mm');

    var colNextArrival = $('<td>').text(next);
    var colMinAway = $('<td>').text(away);

    row.append(colName);
    row.append(colDestination);
    row.append(colFrequency);
    row.append(colNextArrival);
    row.append(colMinAway);

    $('tbody').append(row);
  });
});
