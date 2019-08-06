//(function() {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBqIe2qkdMpMppVAsRUJfkIiZUPTMeLqD8",
    authDomain: "zombiebroccoli1.firebaseapp.com",
    databaseURL: "https://zombiebroccoli1.firebaseio.com",
    projectId: "zombiebroccoli1",
    storageBucket: "zombiebroccoli1.appspot.com",
    messagingSenderId: "571075515450"
  };


  firebase.initializeApp(config);
  var firestore = firebase.firestore();
  const settings = {timestampsInSnapshots: true};
  firestore.settings(settings);

  const outputHeader = document.querySelector("#highScores");
  const highScoreNameInput = document.querySelector("#name");
  const highScoreScoreInput = document.querySelector("#score");
  const saveButton = document.querySelector("#saveButton");
//  const loadButton = document.querySelector("#loadButton");
//  const name = nameInput.value;

//   firebase.database().ref(“top10”).set(textToSave);
//   firebase.database().ref("sharedHighScore").on("value", function (snapshot) {
//   highScore = snapshot.val();
// });

  function save() {
    const name = highScoreNameInput.value;
    const score = highScoreScoreInput.value;
    saveValues(name, score);
  }

  function saveValues(name, score) {
    console.log("I am going to save " + name + ": " + score + " to Firestore");

    let entry = {
      name: name,
      score: score
    };

    if(name == "reset" && score == "12345") {
      let nullEntry = {
        name: "   ",
        score: 0
      };
      firestore.collection("highScores").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(hs) {
          firestore.doc("highScores/" + hs.id).set(nullEntry);
        });
      });
    }
    else {
      firestore.collection("highScores").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(hs) {
            if(parseInt(score, 10) > parseInt(hs.data().score, 10)){
              let temp = hs.data();
              firestore.doc("highScores/" + hs.id).set(entry).then(
                console.log(hs.id, " => ", hs.data())
              );
              entry = temp;
            }
            else {
              console.log(hs.id, " => ", hs.data());
            }
        });
      });
    }
  }
  saveButton.addEventListener("click", save);


//load button function
//   function load() {
//     docRef.get().then(function (doc) {
//       if(doc && doc.exists) {
//         const myData = doc.data();
//         top10.innerText = "Top 10:\n " + myData.highScore;
//       }
//     }).catch(function(error) {
//       console.log("Got an error: ", error);
//     });
// }
// loadButton.addEventListener("click", load);

  // getRealtimeUpdates = function() {
  //   firestore.doc("highScores/top10").onSnapshot(function (doc) {
  //     if(doc && doc.exists) {
  //       const myData = doc.data();
  //       top10.innerText = "Top 10:\n " + myData.highScore;
  //     }
  //   });
  // }

  getRealtimeUpdates = function() {
    top10.innerText = "";
    firestore.collection("highScores").onSnapshot(function(querySnapshot) {
      querySnapshot.forEach(function(hs) {
        if(hs.id == "top0"){
          top10.innerText = "";
        }
        top10.innerText += hs.id + ": " + hs.data().name + " = " + hs.data().score + "\n";
      });
    });
  }


// trying to store name with scores
//   docRef.collection("users").doc("highScores").set({
//     name: nameInput.value,
//     score: highScoreInput.value
//   })
//   .then(function() {
//     console.log("Document successfully written!");
//   })
//   .catch(function(error) {
//     console.error("Error writing document: ", error);
//   });

  getRealtimeUpdates();



//})();
