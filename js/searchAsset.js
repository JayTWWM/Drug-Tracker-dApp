function searchAsset() {

  $("#loading").show();
  let id = parseInt($('input[name="id"]').val());

  // search in the smart contract
  AssetTrackerContract.methods.getAsset(id).call((error, response) => {
    if (error) console.log(error);
    else {
      if (response[1] !== "") {

        document.getElementById('qrResult').innerHTML = "";
        var qrcode = new QRCode(document.getElementById('qrResult'), {
          width: 100,
          height: 100
        });
        // asset is found
        $("#statusHistory").html("<br>" + "<h4>" + "Status History" + "</h4>" + "</div>");
        let result =
          '<br><h2 style="color: #218f76;">Drug found</h2>' +
          "<strong>Name: </strong>" +
          response[1] +
          "<br>" +
          "<strong>Batch No: </strong>" +
          response[0] +
          "<br>" +
          "<strong>Manufacturer: </strong>" +
          response[2] +
          "<br>" +
          "<strong>Owner: </strong>" +
          response[3] +
          "<br>" +
          "<strong>Description: </strong>" +
          response[5] +
          "<br>" + "<a href=" + "https://www.google.com/maps/search/?api=1&query=" + response[4] + ">" + 
          "<strong>Go To Location</strong>" +
          "</a>" +
          "<br>" +
          "<strong>QR Code: </strong>" + 
          "<br>" +
          "<strong>Quantity: </strong>" +
          response[6] + 
          "<br>";

        qrcode.makeCode(sha256(response[0] + ' ' + response[1] + ' ' + response[2]));

        $("#searchResult").html("");
        $("#loading").hide();
        $("#searchResult").append(result);

        // show the status history
        $("#statusHistory").show();
        // asset history
        assetHistory(id);
      } else {
        // asset is not found
        $("#statusHistory").hide();
        $("#statusHistory").html("<br>" + "<h4>" + "Status History" + "</h4>" + "</div>");
        document.getElementById('qrResult').innerHTML = "";
        let result = "<h3>Drug Not Found</h3>";
        $("#searchResult").html("");
        $("#loading").hide();
        $("#searchResult").append(result);
      }
    }
  });
}

function assetHistory(id) {
  AssetTrackerContract.methods.AssetStore(id).call((error, response) => {
    if (error) console.log(error);
    else {
      let statusCount = parseInt(response[5]);
      for (let i = statusCount; i >=1 ; i--) {
        AssetTrackerContract.methods
          .getStatus(id, i)
          .call((error, response) => {
            if (error) console.log(error);
            else {
              let date = new Date(parseInt(response[0]) * 1000);
              let event =
                date +
                "<br>" +
                response[2] +
                "<br>" + "<a href=" + "https://www.google.com/maps/search/?api=1&query=" + 
                response[1] +  ">" + 
                "Go To Location" +
                "</a>" +
                "<br>" +
                "<br>";
              $("#statusHistory").append(event);
            }
          });
      }
    }
  });
}
