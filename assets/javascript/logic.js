var config = {
  apiKey: "AIzaSyC8VKvXj5uv7ubTsqRfp0H7L8mTHKcK6WE",
  authDomain: "traintimer-f3fb2.firebaseapp.com",
  databaseURL: "https://traintimer-f3fb2.firebaseio.com",
  projectId: "traintimer-f3fb2",
  storageBucket: "",
  messagingSenderId: "637968218628"
};
firebase.initializeApp(config);

var database = firebase.database();
var trainName = "";
var destination = "";
var firstTrainTime = "";
var frequency = 0;

$("#addTrain").on("click", function () {
  trainName = $('#nameInput').val().trim();
  destination = $('#destinationInput').val().trim();
  firstTrainTime = $('#firstTrainInput').val().trim();
  frequency = $('#frequencyInput').val().trim();

  database.ref().push({
    trainName: trainName,
    destination: destination,
    firstTrainTime: firstTrainTime,
    frequency: frequency
  });

  $("#nameInput").empty();
  $("#destinationInput").empty();
  $("#firstTrainInput").empty();
  $("#frequencyInput").empty();
  
  return false;
});

database.ref().on("child_added", function (snapshot) {

  trainName = snapshot.val().trainName;
  destination = snapshot.val().destination;
  firstTrainTime = snapshot.val().firstTrainTime;
  frequency = snapshot.val().frequency;

  var firstTrainMoment = moment(firstTrainTime, 'HH:mm');
  var nowMoment = moment();

  var minutesSinceFirstArrival = nowMoment.diff(firstTrainMoment, 'minutes');
  var minutesSinceLastArrival = minutesSinceFirstArrival % frequency;
  var minutesAway = frequency - minutesSinceLastArrival;

  var nextArrival = nowMoment.add(minutesAway, 'minutes');
  var formatNextArrival = nextArrival.format("HH:mm");

  var tr = $('<tr>');
  var a = $('<td>');
  var b = $('<td>');
  var c = $('<td>');
  var d = $('<td>');
  var e = $('<td>');
  a.append(trainName);
  b.append(destination);
  c.append(frequency);
  d.append(formatNextArrival);
  e.append(minutesAway);
  tr.append(a).append(b).append(c).append(d).append(e);
  $('#newTrains').append(tr);
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);

});
