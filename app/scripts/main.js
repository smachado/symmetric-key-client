var clientsecret = 'clientsecret';
var serversecret = 'serversecret';

$('#form').submit(function (event) {
  event.preventDefault();
  var message = $("input[name=cleartext]").val();
  var encrypted = CryptoJS.AES.encrypt(message, clientsecret);

  $("#encrypted").text('(OpenSSL compatible format) ' + encrypted);

  $.post('http://localhost:3000/cypher', {data:encrypted.toString()}).done(function (response) {
    var decrypted = CryptoJS.AES.decrypt(response.data, serversecret);
    $("#decrypted").text('Decyphered from server: ' + decrypted.toString(CryptoJS.enc.Utf8));
  }).fail(function () {
    console.log('Fail');
  })
});
