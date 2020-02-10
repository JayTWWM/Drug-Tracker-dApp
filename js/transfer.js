var namer1 = null;
var hehe = null;
function searchAsset1() {
  // clear previous search result
  $("#searchResulter").html("");
  var input;
  input = parseInt(document.getElementById("myInputer").value);
  AssetTrackerContract.methods.getAsset(input).call((error, response) => {
    if (error) console.log(error);
    else {
      // if found
      if (response[1] !== "") {
        let content =
          "<h4>Drug Found</h4>Name: " +
          response[1] +
          "<br>" +
          "Owner: " +
          response[3] +
          "<br>" + "<a href=" + "https://www.google.com/maps/search/?api=1&query=" + response[4] + ">" +
          "Go To Location" + "</a>" +
          "<br>" +
          "<strong>Quantity: </strong>" +
          response[6] +
          "<br>";
        $("#searchResulter").append(content);
        $("#transferFrom").show();
        $("#QR").show();
      } else {
        //   if not found
        let content = "<h4>Asset Not Found</h4>";
        $("#searchResulter").append(content);
        $("#transferFrom").hide();
        $("#QR").hide();
      }
    }
  });
}

function transferAsset() {

  hehe = AssetTrackerContract.methods.getidentityCount();

  console.log(hehe);
  AssetTrackerContract.methods.getIdentity(1, account0)
    .call((error, response) => {
      if (error) console.log(error);
      else {
        namer1 = response[1];
        console.log(namer1);
      }
    });

  let assetId = parseInt(document.getElementById("myInputer").value);
  let honor = document.getElementById("newOwner").value;
  let newOwner = document.getElementById("newOwner").value + '(' + document.getElementById("newStatus").value + ')';
  let newStatus = document.getElementById("newLocation").innerText;
  let newQuantity = document.getElementById("newQuantity").value;
  AssetTrackerContract.methods.getAsset(assetId).call((error, response) => {
    if (error) console.log(error);
    else {
      if (response[1] !== "") {
        let stag = sha256(response[0] + ' ' + response[1] + ' ' + response[2]);
        let qrContent = document.getElementById("content").innerText;
        if (qrContent == stag) {
          // transfer the asset
          var reso = response[3].split("(");
          console.log(reso[0]);
          if (namer1 == reso[0]) {
            // if (checkers(honor)) {
              
            // }
            // else {
            //   alert("Person Does Not Exist!");
            // }
            AssetTrackerContract.methods
                .transferAsset(assetId, newOwner, newStatus, newQuantity, response[3])
                .send()
                .then(tx => {
                  console.log(tx);
                  location.reload();
                });
          }
          else {
            alert("You are not the owner!");
          }

        }
        else {
          alert("Wrong QR Code!");
        }
      }
    }
  });
}

//Location
function geoFindMe() {
  if ("geolocation" in navigator) { //check geolocation available 
    //try to get user current location using getCurrentPosition() method
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Found your location \nLat : " + position.coords.latitude + " \nLang :" + position.coords.longitude);
      $("#newLocation").html(position.coords.latitude.toFixed(6) + "," + position.coords.longitude.toFixed(6));
    });
  } else {
    console.log("Browser doesn't support geolocation!");
  }
}

// function checkers(grim) {
//   for (let i = parseInt(hehe); i >= 1; i--) {
//     console.log("In Loop");
//     AssetTrackerContract.methods.getIdentity(i, account0)
//       .call((error, response) => {
//         if (error) console.log(error);
//         else {
//           console.log(response[1])
//           if (grim == response[1]) {
//             return true;
//           }
//         }
//       });
//   }
//   return false;
// }