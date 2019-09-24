var firebaseConfig = {
    apiKey: "AIzaSyCLBRTuLzuEqfS-vQztMJJHmoeQhyOvB9E",
    authDomain: "train-scheduler-5e252.firebaseapp.com",
    databaseURL: "https://train-scheduler-5e252.firebaseio.com/",
    projectId: "train-scheduler-5e252",
    storageBucket: "",
    messagingSenderId: "341669723560",
    appId: "1:341669723560:web:3beeba94ccb7b58900719d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

var trainName = "";
var destination = "";
var firstTrain = "";
var frequency = "";
var nextTrain = "";

$("#submit").on("click", function (event) {
    event.preventDefault();
    
    trainName = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    firstTrain = $("#first-train").val().trim();
    frequency = $("#frequency").val();
    console.log(destination);
    console.log(trainName);
    console.log(firstTrain);
    console.log(frequency);


    database.ref().push({

        "name": trainName,
        "destination": destination,
        "firstTrain": firstTrain,
        "frequency": frequency,
    });

    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train").val("");
    $("#frequency").val("");


});

database.ref().on("child_added", function (snapshot) {
    console.log((snapshot).val());

    var tfrequency = snapshot.val().frequency;
    console.log("frequency = " +tfrequency);
    var currentTime = moment().format("HH:mm");
    console.log(currentTime);

    var firstTrainTime = snapshot.val().firstTrain;
    console.log(firstTrainTime);
    var firstTrainMoment = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    console.log(firstTrainMoment._i);

    var difTime = moment().diff(moment(firstTrainMoment), "minutes");
    console.log("dif time= " + difTime)

    var timeApart = difTime % tfrequency;
    console.log(timeApart);

    var timeTillTrain = tfrequency - timeApart;
    console.log(timeTillTrain);

    var nextTrainTime = moment().add(timeTillTrain, "m");
    console.log("fix this = " + nextTrainTime)

    var nextTrainTimeConverted = moment(nextTrainTime).format("hh:mm a");
    console.log(nextTrainTimeConverted + "converted time");
    

    

    var newRow = $("<tr>");
    var nameCol = $("<td>").text(snapshot.val().name);
    var destinationCol = $("<td>").text(snapshot.val().destination);
    var frequencyCol = $("<td>").text(snapshot.val().frequency);
    var nextTrainCol = $("<td>").text(nextTrainTimeConverted);
    var minAwayCol = $("<td>").text(timeTillTrain);

    $(newRow).append(nameCol, destinationCol, frequencyCol, nextTrainCol, minAwayCol);
    $("#table-body").append(newRow);




});
