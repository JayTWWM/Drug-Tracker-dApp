var assetCount = 0;
var namer = null;
$(document).ready(() => {
  setTimeout(function delay() {
    renderPageContent();
  }, 6000);
});

function renderPageContent() {
  AssetTrackerContract.methods.getAssetCount().call((error, response) => {
    if (error) console.log(error);
    else {
      assetCount = response;
      $("#count").html("Total " + response + " Drugs");
      renderTable();
    }
  });

  function renderTable() {
    for (let i = 1; i <= parseInt(assetCount); i++) {
      AssetTrackerContract.methods.getAsset(i).call((error, response) => {
        if (error) console.log(error);
        else {
          let row =
            '<tr><th scope="row">' +
            i +
            "</th>" +
            "<td>" +
            response[0] +
            "</td>" +
            "<td>" +
            response[1] +
            "</td>" +
            "<td>" +
            response[2] +
            "</td>" +
            "<td>" +
            response[3] +
            "</td>" +
            "<td>" + "<a href=" + "https://www.google.com/maps/search/?api=1&query=" + response[4] + ">" +
            "Go To Location" + "<a/>" +
            "</td>" +
            "<td>" +
            response[6] +
            "</td></tr>";

          $("tbody").append(row);
        }
      });
    }
    $("#loading").hide();
  }

}

function createNewAsset() {
  AssetTrackerContract.methods.getIdentity(1, account0)
    .call((error, response) => {
      if (error) console.log(error);
      else {
        namer = response[1];
      }
    });
  let batchNo = $('input[name="batchNo"]').val();
  let name = $('input[name="name"]').val();
  let desc = $('input[name="desc"]').val();
  let manufacturer = namer;
  let owner = namer + '(Manufacturer)';
  let quantity = $("#quantity").val();


  let status = document.getElementById("status").innerText;

  // send these values to the smart contract
  AssetTrackerContract.methods
    .createAsset(batchNo, name, desc, manufacturer, owner, quantity, status)
    .send()
    .then(result => {
      if (result.status === true) {
        alert("Success");
        $("#loading").show();
        $("tbody").html("");

        // render the table again
        renderPageContent();
        // clear the form
        $('input[name="batchNo"]').val("");
        $('input[name="name"]').val("");
        $('input[name="desc"]').val("");
        $('input[name="manufacturer"]').val("");
        $('input[name="owner"]').val("");
        $('#quantity').val("");
        $("#status").html("");
      }
    });
  $("#exampleModal").modal("hide");


}

$("#exampleModal").on("shown.bs.modal", e => {
  // fill the modal form with fake data when modal is shown
  $('input[name="batchNo"]').val(faker.random.number().toString());
  $('input[name="name"]').val(faker.commerce.product());
  $('input[name="desc"]').val(faker.lorem.text());
  $('input[name="manufacturer"]').val(faker.company.companyName());
  $('input[name="owner"]').val(faker.company.companyName());
  $('#quantity').val(faker.company.quantity());
});

// Listen for events
// reload the ledger after any event

// AssetTrackerContract.events.AssetTransfer((error, result) => {
//   if (error) console.log(error);
//   else {
//     $("#count").html("");
//     $("tbody").html("");
//     renderPageContent();
//   }
// });

//Location
function geoFindMe() {
  if ("geolocation" in navigator) { //check geolocation available 
    //try to get user current location using getCurrentPosition() method
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Found your location \nLat : " + position.coords.latitude + " \nLang :" + position.coords.longitude);
      $("#status").html(position.coords.latitude.toFixed(6) + "," + position.coords.longitude.toFixed(6));
    });
  } else {
    console.log("Browser doesn't support geolocation!");
  }
}

function signUp() {
  console.log(account0);
  let addresser = account0;
  let name = $("#name").val();
  let phone = $("#phone").val();
  let email = $("#email").val();
  let password = $("#password").val();

  // send these values to the smart contract
  AssetTrackerContract.methods
    .createIdentity(addresser, name, phone, email, password)
    .send()
    .then(result => {
      if (result.status === true) {
        alert("Success");
        window.location = "./home.html";
      }
    });
}

function login() {
  var id = $("#ider").val();
  var password = $('#passworder').val();
  console.log(id + password + account0);
  AssetTrackerContract.methods.getIdentity(id, account0)
    .call((error, response) => {
      if (error) console.log(error);
      else {
        console.log(response[4]);
        if (response[4] == password) {
            alert("Success");
            window.location = "./home.html";
        }

      }
    });
}

