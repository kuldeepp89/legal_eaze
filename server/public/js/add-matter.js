$(function(){
$("#court-select").change(function(){
    if (this.value == "supreme-court") {
      $('#supreme-court-modal-data').show();
      $('#competition-appellate-tribunal-data-modal').hide();
      $('#company-law-board-data-modal').hide();
      $('#national-consumer-disputes-data-modal').hide();
      $('#national-green-tribunal-data-modal').hide();
      $('#telecom-dispute-data-modal').hide();
      $('#bifr-court-modal-data').hide();
      $('#delhi-high-court-data-modal').hide();
      $('#select-court-meeting').hide();
      $('#btn-back-modal').show();
      //$('#btn-back-modal').css({'visibility':'visible'});
      $('#btn-confirm-modal').show();
    }
    else if(this.value == "competition-appellate-tribunal"){
      $('#competition-appellate-tribunal-data-modal').css("display","block");
      $('#supreme-court-modal-data').hide();
      $('#company-law-board-data-modal').hide();
      $('#national-consumer-disputes-data-modal').hide();
      $('#national-green-tribunal-data-modal').hide();
      $('#telecom-dispute-data-modal').hide();
      $('#delhi-high-court-data-modal').hide();
      $('#select-court-meeting').hide();
      $('#bifr-court-modal-data').hide();
      $('#btn-back-modal').show();
      //$('#btn-back-modal').css({'visibility':'visible'});
      $('#btn-confirm-modal').show();

    }
     else if(this.value == "bifr"){
      $('#bifr-court-modal-data').css("display","block");
      $('#telecom-dispute-data-modal').hide();
      $('#supreme-court-modal-data').hide();
      $('#competition-appellate-tribunal-data-modal').hide();
      $('#national-consumer-disputes-data-modal').hide();
      $('#national-green-tribunal-data-modal').hide();
      $('#delhi-high-court-data-modal').hide();
      $('#company-law-board-data-modal').hide();
      $('#select-court-meeting').hide();
      $('#btn-back-modal').show();
      $('#btn-confirm-modal').hide();
    }
    else if(this.value == "company-law-board"){
      $('#company-law-board-data-modal').css("display","block");
      $('#supreme-court-modal-data').hide();
      $('#competition-appellate-tribunal-data-modal').hide();
      $('#national-consumer-disputes-data-modal').hide();
      $('#national-green-tribunal-data-modal').hide();
      $('#telecom-dispute-data-modal').hide();
      $('#delhi-high-court-data-modal').hide();
      $('#bifr-court-modal-data').hide();
      $('#select-court-meeting').hide();
      $('#btn-back-modal').show();
      //$('#btn-back-modal').css({'visibility':'visible'});
      $('#btn-confirm-modal').show();

    }
     else if(this.value == "national-green-tribunal"){
      $('#national-green-tribunal-data-modal').css("display","block");
      $('#supreme-court-modal-data').hide();
      $('#competition-appellate-tribunal-data-modal').hide();
      $('#national-consumer-disputes-data-modal').hide();
      $('#bifr-court-modal-data').hide();
      $('#company-law-board-data-modal').hide();
      $('#telecom-dispute-data-modal').hide();
      $('#delhi-high-court-data-modal').hide();
      $('#select-court-meeting').hide();
      $('#btn-back-modal').show();
      //$('#btn-back-modal').css({'visibility':'visible'});
      $('#btn-confirm-modal').show();
    }

     else if(this.value == "national-consumer-disputes"){
      $('#national-consumer-disputes-data-modal').css("display","block");
      $('#supreme-court-modal-data').hide();
      $('#competition-appellate-tribunal-data-modal').hide();
      $('#company-law-board-data-modal').hide();
      $('#national-green-tribunal-data-modal').hide();
      $('#telecom-dispute-data-modal').hide();
      $('#delhi-high-court-data-modal').hide();
      $('#bifr-court-modal-data').hide();
      $('#select-court-meeting').hide();
      $('#btn-back-modal').show();
      $('#btn-confirm-modal').show();
      //$('#btn-back-modal').css({'visibility':'visible'});
      $('#national-consumer-disputes-statelist').hide();
    }
     else if(this.value == "delhi-high-court"){
      $('#delhi-high-court-data-modal').css("display","block");
      $('#supreme-court-modal-data').hide();
      $('#competition-appellate-tribunal-data-modal').hide();
      $('#national-consumer-disputes-data-modal').hide();
      $('#national-green-tribunal-data-modal').hide();
      $('#telecom-dispute-data-modal').hide();
      $('#company-law-board-data-modal').hide();
      $('#bifr-court-modal-data').hide();
      $('#select-court-meeting').hide();
      $('#btn-back-modal').show();
      //$('#btn-back-modal').css({'visibility':'visible'});
      $('#btn-confirm-modal').show();
    }

    else if(this.value == "telecom-dispute"){
      $('#telecom-dispute-data-modal').css("display","block");
      $('#supreme-court-modal-data').hide();
      $('#competition-appellate-tribunal-data-modal').hide();
      $('#national-consumer-disputes-data-modal').hide();
      $('#national-green-tribunal-data-modal').hide();
      $('#delhi-high-court-data-modal').hide();
      $('#company-law-board-data-modal').hide();
      $('#bifr-court-modal-data').hide();
      $('#select-court-meeting').hide();
      $('#btn-back-modal').show();
      //$('#btn-back-modal').css({'visibility':'visible'});
      $('#btn-confirm-modal').show();
    }

    else if(this.value == "karkardooma"){
      $('#karkardooma-data-modal').css("display","block");
      $('#telecom-dispute-data-modal').hide();
      $('#supreme-court-modal-data').hide();
      $('#competition-appellate-tribunal-data-modal').hide();
      $('#national-consumer-disputes-data-modal').hide();
      $('#national-green-tribunal-data-modal').hide();
      $('#delhi-high-court-data-modal').hide();
      $('#company-law-board-data-modal').hide();
      $('#bifr-court-modal-data').hide();
      $('#select-court-meeting').hide();
      $('#btn-back-modal').show();
      //$('#btn-back-modal').css({'visibility':'visible'});
      $('#btn-confirm-modal').show();
    }

    else if(this.value == "saket"){
      $('#saket-data-modal').css("display","block");
      $('#karkardooma-data-modal').hide();
      $('#telecom-dispute-data-modal').hide();
      $('#supreme-court-modal-data').hide();
      $('#competition-appellate-tribunal-data-modal').hide();
      $('#national-consumer-disputes-data-modal').hide();
      $('#national-green-tribunal-data-modal').hide();
      $('#delhi-high-court-data-modal').hide();
      $('#company-law-board-data-modal').hide();
      $('#bifr-court-modal-data').hide();
      $('#select-court-meeting').hide();
      $('#btn-back-modal').show();
      //$('#btn-back-modal').css({'visibility':'visible'});
      $('#btn-confirm-modal').show();
    }

    else{
      $('#delhi-high-court-data-modal').hide();
      $('#supreme-court-modal-data').hide();
      $('#competition-appellate-tribunal-data-modal').hide();
      $('#national-consumer-disputes-data-modal').hide();
      $('#national-green-tribunal-data-modal').hide();
      $('#telecom-dispute-data-modal').hide();
      $('#company-law-board-data-modal').hide();
      $('#bifr-court-modal-data').hide();
      $('#select-court-meeting').show();
      $('#btn-back-modal').hide();
      //$('#btn-back-modal').css({'visibility':'visible'});
      $('#btn-confirm-modal').hide();
    }
  });

$('#know-case-status-states').on('click',function(event){
  $('#national-consumer-disputes-statelist').show();
  $('#national-consumer-disputes-ncdrc').hide();
  $('#national-consumer-disputes-state-with-district').hide();
  $('#national-consumer-disputes-district').hide();
  

});

$('#know-case-status-ncdrc').on('click', function(event){
  $('#national-consumer-disputes-statelist').hide();
  $('#national-consumer-disputes-ncdrc').show();
  $('#national-consumer-disputes-state-with-district').hide();
  $('#national-consumer-disputes-district').hide();
});

$('#know-case-status-district').on('click', function(event){
  $('#national-consumer-disputes-statelist').hide();
  $('#national-consumer-disputes-ncdrc').hide();
  $('#national-consumer-disputes-state-with-district').show();
  $('#national-consumer-disputes-district').show();

});


$('#scheduleMeeting').on('click', function(event){
  $('#meeting-form-modal').show();
  $('#delhi-high-court-data-modal').hide();
  $('#supreme-court-modal-data').hide();
  $('#competition-appellate-tribunal-data-modal').hide();
  $('#national-consumer-disputes-data-modal').hide();
  $('#national-green-tribunal-data-modal').hide();
  $('#telecom-dispute-data-modal').hide();
  $('#company-law-board-data-modal').hide();
  $('#select-court-meeting').hide();
  $('#btn-back-modal').show();
  //$('#btn-back-modal').css({'visibility':'visible'});
  $('#btn-confirm-modal').show();
  });

 $('#btn-back-modal').on('click', function(event){
    console.log('sajkkads');
    $('#select-court-meeting').show();
    $('#meeting-form-modal').hide();
    $('#supreme-court-modal-data').hide();
    $('#competition-appellate-tribunal-data-modal').hide();
    $('#company-law-board-data-modal').hide();
    $('#national-consumer-disputes-data-modal').hide();
    $('#national-green-tribunal-data-modal').hide();
    $('#telecom-dispute-data-modal').hide();
    $('#delhi-high-court-data-modal').hide();
    $('#bifr-court-modal-data').hide();
    $('#btn-back-modal').hide();
    $('#btn-confirm-modal').hide();
    $('#court-select').val("").trigger('change');
  });

  $("#btn-close-modal").on('click', function(event){
  console.log('close button clicked');

  $('#btn-back-modal').css('display','none');
  $('#btn-confirm-modal').css('display','none');

  $('#meeting-form-modal').css('display','none');
  $('#first-block-modal').css('display', 'block');
  $('#select-court-meeting').css('display','block');
  $('#second-block-progress-bar').css('display','none');
  $('#scrapping-message').css('display', 'none');
  $('#third-block-case-details').css('display','none');

  $('#bifr-court-modal-data').css('display','none');
  $('#telecom-dispute-data-modal').css('display','none');
  $('#supreme-court-modal-data').css('display','none');
  $('#competition-appellate-tribunal-data-modal').css('display','none');
  $('#national-consumer-disputes-data-modal').css('display','none');
  $('#national-green-tribunal-data-modal').css('display','none');
  $('#delhi-high-court-data-modal').css('display','none');
  $('#company-law-board-data-modal').css('display','none');
  $('#karkardooma-data-modal').css('display', 'none');
  $('#saket-data-modal').css('display', 'none');
  $('#error-show-block').css('display', 'none');
  $('#already-added').css('display', 'none');
  $('#btn-add-premium-member').css('display', 'none');
  $('#court-select').val("").trigger('change');

});

$(".close").on('click', function(event){

  console.log('close button clicked');
  //$('#btn-back-modal').css({'visibility'key: "value", 'hidden'});
  $('#btn-back-modal').css('display','none');
  $('#btn-confirm-modal').css('display','none');

  $('#meeting-form-modal').css('display','none');
  $('#first-block-modal').css('display', 'block');
  $('#select-court-meeting').css('display','block');
  $('#second-block-progress-bar').css('display','none');
  $('#scrapping-message').css('display', 'none');
  $('#third-block-case-details').css('display','none');

  $('#bifr-court-modal-data').css('display','none');
  $('#telecom-dispute-data-modal').css('display','none');
  $('#supreme-court-modal-data').css('display','none');
  $('#competition-appellate-tribunal-data-modal').css('display','none');
  $('#national-consumer-disputes-data-modal').css('display','none');
  $('#national-green-tribunal-data-modal').css('display','none');
  $('#delhi-high-court-data-modal').css('display','none');
  $('#company-law-board-data-modal').css('display','none');
  $('#karkardooma-data-modal').css('display', 'none');
  $('#saket-data-modal').css('display', 'none');

  //$('#court-select option').eq(0).attr('selected', true);
  $('#court-select').val("").trigger('change');
  $('#already-added').css('display', 'none');
  $('#error-show-block').css('display', 'none');
  $('#btn-add-premium-member').css('display', 'none');
  //$('#court-select [value=" "]').attr("selected","selected");
  //$("#court-select").change();
});



$('#add-supreme-court-matter').on('click',function(event){
  var courtName = "Supreme Court of India";
  var caseType = $("#supreme-court-case-type").val();
  var caseNumber = $("#case-number-supreme-court").val();
  var caseYear = $("#case-year-supreme-court").val();
  var caseCsrf = $("#csrf-token").val();
  console.log('CSRF supreme court::' + caseCsrf);
  
    if (caseType=== '') {
      alert("Select a case type");
      return false;
    }

    if (caseNumber=== '') {
      alert("Enter your case number");
      return false;
    }

    if (caseYear=== '') {
      alert("Select a valid case year");
      return false;
    }

    var percentage = 10;

    var formData = {'_csrf':caseCsrf, 'courtName': courtName , 'caseType':caseType, 'caseNumber':caseNumber, 'caseYear': caseYear};  //Array
    $('#second-block-progress-bar').show();
    $('#scrapping-message').show();
    $('#first-block-modal').hide();
    $('#third-block-case-details').hide();
    $('#case-progress-bar').css('width',  '10%');
    $('#case-progress-bar').html("10%");  
    sendReceive(formData, courtName);
      

});


$('#btn-delhi-high-court-submit').on('click',function(event){

  var courtName = "Delhi High Court";
  var caseType = $("#delhi-high-court-select").val();
  var caseNumber = $("#delhi-high-court-case-number").val();
  var caseYear = $("#delhi-high-court-case-year").val();

  var caseCsrfD = $("#csrf-token-delhi").val();
  console.log('CSRF delhi high court::' + caseCsrfD);

    if (caseType=== '') {
      alert("Select a case type");
      return false;
    }
    if (caseNumber=== '') {
      alert("Enter your case number");
      return false;
    }
    if (caseYear=== '') {
      alert("Select a valid case year");
      return false;
    }

    var percentage = 10;
    var formData = {'_csrf':caseCsrfD, 'courtName': courtName , 'caseType':caseType, 'caseNumber':caseNumber, 'caseYear': caseYear}; //Array
      $('#second-block-progress-bar').show();
      $('#scrapping-message').show();
      $('#first-block-modal').hide();
      $('#case-progress-bar').css('width',  '10%');
      $('#case-progress-bar').html("10%");  
      $('#third-block-case-details').hide();
      sendReceive(formData, courtName);
});



$('#btn-national-green-tribunal-submit').on('click',function(event){
  console.log("submit green tribunal 1");
  var courtName = $("#national-green-tribunal-court-name").val();
  var caseDate = $("#national-green-tribunal-case-date").val();
  var caseType = $("#national-green-tribunal-case-type").val();
  var caseNumber = $("#national-green-tribunal-case-number").val();
  var caseCsrfNg = $("#csrf-token-green-tribunal").val();

  if (caseDate=== '') {
      alert("Select a valid case date");
      return false;
    }

    if (caseType=== '') {
      alert("Select a valid case type");
      return false;
    }

    if (caseNumber=== '') {
      alert("Enter a valid case number");
      return false;
    }

       var percentage = 10;
       console.log("submit green tribunal 2");

    var formData = {'_csrf':caseCsrfNg, 'courtName': courtName , 'caseYear': caseDate, 'caseType':caseType, 'caseNumber':caseNumber};  //Array
    $('#second-block-progress-bar').show();
    $('#scrapping-message').show();
    $('#first-block-modal').hide();
    $('#third-block-case-details').hide();
    $('#case-progress-bar').css('width',  '10%');
    $('#case-progress-bar').html("10%");  
    sendReceive(formData, courtName);
    console.log("submit green tribunal 3");
});


$('#btn-national-consumer-disputes-submit').on('click',function(event){
  var userType, statusCode, distCode, statusCode_D, caseNumber;
  var csrfNtConsDisp = $('#csrf-token-consumer-dispute').val();
  var courtName = $('#national-consumer-disputes-court-name').val();
  caseNumber = $('#national-consumer-disputes-case-number').val();
  if($('#know-case-status-ncdrc').is(':checked')) {
    userType =  $('#know-case-status-ncdrc').val();
    stateCode = 0;
    distCode = 0;
    stateCode_D = 0;
    // distCodeValue
   //#national-consumer-disputes-ncdrc
  }

  else if($('#know-case-status-states').is(':checked')){
    userType =  $('#know-case-status-states').val();
    stateCode = $('#national-consumer-disputes-statelist').val();
    stateCode_D = $('#national-consumer-disputes-statelist').val();;
    distCode = 0;
    if(stateCode === '') {
     alert("Select a state");
    }
  }
  else if($('#know-case-status-district').is(':checked')){
    userType =  $('#know-case-status-district').val();
    stateCode = $('#national-consumer-disputes-state-with-district').val();
    stateCode_D = $('#national-consumer-disputes-state-with-district').val();
    distCode = $('#national-consumer-disputes-district').val();
    if(stateCode_D === '')  {
     alert("Select a state");
    }
    if(distCode === '') {
      alert("Select a district");
    }
  }
  else {
   alert("check any case status");

  }

 var percentage = 10;


var formData = {'_csrf':csrfNtConsDisp, 'courtName': courtName ,'userType': userType, 'stateCode':
               stateCode, 'stateCode_D':stateCode_D, 'distCode': distCode, 'caseNumber': caseNumber};  //Array
   $('#second-block-progress-bar').show();
   $('#scrapping-message').show();
   $('#first-block-modal').hide();
   $('#third-block-case-details').hide();
   $('#case-progress-bar').css('width',  '10%');
    $('#case-progress-bar').html("10%");  
   sendReceive(formData, courtName);

   console.log("submit national-consumer-disputes");
  
});

 


$('#btn-telecom-dispute-submit').on('click',function(event){
  var courtName = $("#telecom-dispute-courtname").val();
  var caseNumber = $("#telecom-dispute-case-number").val();
  var caseDate = $("#telecom-dispute-date").val();
  var caseYear = $("#telecom-dispute-case-year").val();
  var csrfTelecom = $('#csrf-token-telecom-dispute').val();
  var caseType = $('#telecom-dispute-case-type').val();

  console.log("selected telecom-dispute");

  if (caseDate=== '') {
      alert("Select valid case date");
      return false;
    }

  if (caseYear=== '') {
      alert("Select valid case year");
      return false;
    }

  if (caseType=== '') {
      alert("Select valid case type");
      return false;
    }

  if (caseNumber=== '') {
      alert("Enter a valid case number");
      return false;
    }

     var percentage = 10;
     console.log("submit telecom dispute");

    var formData = {'_csrf':csrfTelecom, 'courtName': courtName ,'caseType':caseType, 'caseNumber':caseNumber,'caseYear': caseYear,  'caseDate': caseDate};  //Array
    $('#second-block-progress-bar').show();
    $('#scrapping-message').show();
    $('#first-block-modal').hide();
    $('#third-block-case-details').hide();
    $('#case-progress-bar').css('width',  '10%');
    $('#case-progress-bar').html("10%");  
    sendReceive(formData, courtName);
    console.log("submit telecom dispute");
    

});


$('#btn-company-law-board-submit').on('click',function(event){
  var csrfClb = $("#csrf-token-company-law-board").val();
  var courtName = $("#company-law-board-court-name").val();
  var courtType = $("#company-law-board-select").val();
  var caseDate = $("#company-law-board-case-date").val();

  if (caseDate=== '') {
      alert("Select a valid case date");
      return false;
    }
    if (courtType=== '') {
      alert("Select a court type");
      return false;
    }
    var percentage = 10;

    var formData = {'_csrf':csrfClb, 'courtName': courtName ,'courtType':courtType, 'caseDate': caseDate};  //Array
    $('#second-block-progress-bar').show();
    $('#scrapping-message').show();
    $('#first-block-modal').hide();
    $('#third-block-case-details').hide();
    $('#case-progress-bar').css('width',  '10%');
    $('#case-progress-bar').html("10%");  
    sendReceive(formData, courtName);

    console.log("submit company-law-board");
    
});




$('#btn-competition-appellate-tribunal-submit').on('click',function(event){

  var caseType = $("#competition-appellate-tribunal-case-type").val();
  var caseDate = $("#competition-appellate-tribunal-date").val();

  if (caseType=== '') {
      alert("Select a case type");
      return false;
    }

    if (caseDate=== '') {
      alert("Select a valid case date");
      return false;
    }
  
});

$('#add-bifr-court-matter').on('click',function(event){
  var csrfBifr = $("#csrf-token-bifr").val();
  var courtName = 'Board for Industrial & Financial Reconstruction';
  var caseYear = $("#case-year-bifr-court").val();
  var caseNumber = $("#case-number-bifr-court").val();

  if (caseNumber=== '') {
    alert("Select a case number");
    return false;
  }

  if (caseYear=== '') {
    alert("Select a valid case year");
    return false;
  }
    var percentage = 10;
    var formData = {'_csrf':csrfBifr, 'courtName': courtName ,'caseNumber': caseNumber, 'caseYear': caseYear};  //Array
    $('#second-block-progress-bar').show();
    $('#scrapping-message').show();
    $('#first-block-modal').hide();
    $('#third-block-case-details').hide();
    $('#case-progress-bar').css('width',  '10%');
    $('#case-progress-bar').html("10%");  
    sendReceive(formData, courtName);
    console.log("submit bifr");
});

$('#btn-karkardooma-submit').on('click',function(event){
  var csrfKK = $("#csrf-token-karkardooma").val();
  var courtName = 'District Court Karkardooma';
  var caseYear = $("#karkardooma-case-year").val();
  var caseType  = $("#karkardooma-case-type").val();
  var caseNumber = $("#karkardooma-case-number").val();
  var caseId = $("#karkardooma-case-id").val();

  console.log(csrfKK + " " + courtName + " " + caseYear + " " + caseType+" " + caseNumber);
  if (caseType === '') {
    alert("Select a case Type");
    return false;
  }

  if (caseNumber === '') {
    alert("Select a case number");
    return false;
  }

  if (caseYear === '') {
    alert("Select a valid case year");
    return false;
  }

  if (caseId === '') {
    alert("Enter a valid case Id");
    return false;
  }

    var percentage = 10;

    var formData = {'_csrf':csrfKK, 'courtName': courtName , 'caseType': caseType, 'caseNumber': caseNumber, 'caseYear': caseYear, 'caseId': caseId};  //Array
    $('#second-block-progress-bar').show();
    $('#scrapping-message').show();
    $('#first-block-modal').hide();
    $('#third-block-case-details').hide();
    $('#case-progress-bar').css('width',  '10%');
    $('#case-progress-bar').html("10%");  
    sendReceive(formData, courtName);
    console.log('hello');
  });

$('#btn-saket-submit').on('click',function(event){
  var csrfSaket = $("#csrf-token-saket").val();
  var courtName = 'District Court Saket';
  var caseYear = $("#saket-case-year").val();
  var caseType  = $("#saket-case-type").val();
  var caseNumber = $("#saket-case-number").val();
  var caseId = $('#saket-case-id').val();

  console.log(csrfSaket + " " + courtName + " " + caseYear + " " + caseType+" " + caseNumber);
  if (caseType=== '') {
    alert("Select a case Type");
    return false;
  }

  if (caseNumber=== '') {
    alert("Select a case number");
    return false;
  }

  if (caseYear=== '') {
    alert("Select a valid case year");
    return false;
  }

  if (caseId === '') {
    alert("Enter a valid case id");
    return false;
  }

    var percentage = 10;
    var formData = {'_csrf':csrfSaket, 'courtName': courtName , 'caseType': caseType, 'caseNumber': caseNumber, 'caseYear': caseYear, 'caseId': caseId};  //Array
    $('#second-block-progress-bar').show();
    $('#scrapping-message').show();
    $('#first-block-modal').hide();
    $('#third-block-case-details').hide();
    $('#case-progress-bar').css('width',  '10%');
    $('#case-progress-bar').html("10%");  
    sendReceive(formData, courtName);
    console.log('hello');
  });


  $('#button-meeting-submit').on('click', function(event){

   
    console.log('Meeting Add Matter');
    //var courtName = "Meeting Location";
    var meetingTime = $("#meeting-time").val();
    var meetingLocation = $("#meeting-location").val();
    var meetingNumber = $("#meeting-description").val(); 

    if(meetingTime == ''){
      alert("Choose a meeting time");
      return false;
    }

    if(meetingLocation == ''){
      alert("Choose a meeting location");
      return false;
    }

    if(meetingNumber == ''){
      alert("Write some description");
      return false;
    }
    if($('#isPremium').val() == 'false'){
      alert('you are not a premium member');
      $('#second-block-progress-bar').hide();
      $('#first-block-modal').hide();
      $('#third-block-case-details').hide();
      $('#premium-member-block').show(); 
      $('#btn-add-premium-member').css('display', 'block');
      return false;
    }
    
  });

  var invoker;

  $('#EditDate').on('show.bs.modal', function (e) {
    invoker = $(e.relatedTarget).data('id');
    console.log("invoker=== "+invoker);
    $('#court-id').val(invoker);
    $('#edit-date').attr('action');
    $('#homepage-token').val(true);
    $('#edit-date').attr('action', '/editHearingDate/' + invoker);
  });

  
    setInterval(function() {
      if($('#scrappingvalue').val() === 'true') {
        console.log('hello');    
        $('#scrapNow').prop('disabled', true);
        $('#scheduleScrap').prop('disabled', true);
        $('#court-select').prop('disabled', true);
        $('#timeScrap').prop('disabled', true);
      }
    }, 1000)
    
 
});