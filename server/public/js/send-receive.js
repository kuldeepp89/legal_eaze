function sendReceive(formData, courtNameId){
	var percentage= 10;
  var always;
  $.post("/addMatter", formData).done(function(data, textStatus, jqXHR)
    {
    	console.log("Data: " + data + "\nStatus: " + textStatus);
      console.log(data.message + 'message');
      //event.preventDefault();
      console.log(percentage + 'new percentage');
      //$('#case-progress-bar').css('width', 10 + '%');
      $('#case-progress-bar').css('width',  '10%');
      $('#case-progress-bar').html("10%");  
      
      if(data.message !== undefined && data.message.error!== undefined && data.message.error === 'not premium'){
        $('#second-block-progress-bar').hide();
        $('#scrapping-message').hide();
        $('#first-block-modal').hide();
        $('#third-block-case-details').hide();
        $('#premium-member-block').show(); 
        $('#btn-add-premium-member').css('display', 'block');  
      }

      else if(data.message !== undefined && data.message.failed !== undefined &&  data.message.failed === 'you have already added this case'){
        console.log('aaya '+data.message.url);
        $('#second-block-progress-bar').hide();
        $('#scrapping-message').hide();
        $('#first-block-modal').hide();
        $('#third-block-case-details').hide();
        $('#already-added').show();   
        $('#get-already-added-details').prop('href', data.message.url);
      }

      else if(data.message !== undefined && data.message.success !== undefined &&  data.message.success === 'success' && data.message.data !== undefined){
        setInterval(function(){
          if(percentage < 100){
          percentage = percentage + 10;
          $('#case-progress-bar').css('width', percentage + '%');
          $('#case-progress-bar').html(percentage+"%");
          }  
        }, 7000);
        setTimeout(function(){
          $('#second-block-progress-bar').hide();
          $('#scrapping-message').hide();
          $('#first-block-modal').hide();
          $('#third-block-case-details').show();    
          console.log(data.message.data.caseDate);
          console.log(data.message.data.caseBrief);
          console.log(data.message.data.latestOrder);
          console.log(data.message.data.caseStatus);
          $('#new-case-type').val(formData.caseType);
          $('#new-case-year').val(formData.caseYear);
          $('#new-case-location').val(formData.courtName);
          $('#new-case-time').val(data.message.data.caseDate);
          $('#new-case-number').val(formData.caseNumber);
          $('#new-case-brief').val(data.message.data.caseBrief.trim());
          $('#new-case-status').val(data.message.data.caseStatus);
          $('#new-case-orderDate').val(data.message.data.latestOrder);  
        }, 7000);
        
      }
      else if(data.key !== undefined){
      var timeoutID = setInterval(function(){
        $.get("/addMatterEnquire"+"/"+data.key).done(function(data2, textStatus, jqXHR)
            {   clearInterval(always);        
              
              console.log('caseDate' + data2.message.data.caseDate);
              console.log('caseBrief' + data2.message.data.caseBrief);
              console.log('latestOrder' + data2.message.data.latestOrder);
              console.log('caseStatus' + data2.message.data.caseStatus);    
              if(data2.message.success === "your request is in process"){
              	var inprocess = setInterval(function(){
                  console.log("message===="+data2.message.success);
                  if(percentage < 100){
                    console.log('percentage' + percentage);
                    percentage = percentage + 3;
                    }                 
                    $('#case-progress-bar').css('width', percentage + '%');
                    $('#case-progress-bar').html(percentage+"%");  
                  }, 1000); 
                
              }

              else if(data2.message.data.errorMsg === "case not found" || data2.message.data.errorMsg === "CASE NOT FOUND") {
              	console.log("data message::"+ data2.message.data.errorMsg+" : "+timeoutID);
              	clearInterval(timeoutID);
                var cnfInter = setInterval(function(){
                  if(percentage < 100){
                    percentage = percentage + 10;
                  }          
                  console.log('percentage' + percentage);
                  $('#case-progress-bar').css('width', percentage + '%');
                  $('#case-progress-bar').html(percentage+"%");  
                }, 1000)
                
                setTimeout(function(){
                  $('#second-block-progress-bar').hide();
                  $('#scrapping-message').hide();
                  $('#first-block-modal').hide();
                  $('#third-block-case-details').hide();
                  $('#error-show-block').html(data2.message.data.errorMsg);
                  $('#error-show-block').show();
                  clearInterval(cnfInter);
                }, 7000);
              }
              else if(data2.message.data.errorMsg === "Internal server error/Error 500 or 404 page not found") {
                console.log("data message::"+ data2.message.data.errorMsg+" : "+timeoutID);
                clearInterval(timeoutID);
                var internalServer = setInterval(function(){
                  if(percentage < 100){
                    percentage = percentage + 10;
                    $('#case-progress-bar').css('width', percentage + '%');
                    $('#case-progress-bar').html(percentage+"%");
                  }  
                }, 1000);
                //$('#case-progress-bar').css('width', 100+'%');
                setTimeout(function(){
                  $('#second-block-progress-bar').hide();
                  $('#scrapping-message').hide();
                  $('#first-block-modal').hide();
                  $('#third-block-case-details').hide();
                  $('#error-show-block').html(data2.message.data.errorMsg);
                  $('#error-show-block').show();
                  clearInterval(internalServer);
                },  3000);
              }

              else if(data2.message.data.caseLink !== undefined) {
                clearInterval(timeoutID);
                var caseLink = setInterval(function(){
                  if(percentage < 100){
                    percentage = percentage + 10;
                    $('#case-progress-bar').css('width', percentage + '%');
                    $('#case-progress-bar').html(percentage+"%");
                  }  
                }, 1000);      
                
                setTimeout(function(){
                  $('#new-clb-court-name').val(formData.courtName);
                  $('#new-clb-court-type').val(formData.courtType);
                  $('#new-clb-case-date').val(formData.caseDate);
                  $('#new-clb-case-link').attr('href',data2.message.data.caseLink);
                  $('#new-clb-case-link').attr('target', '_blank');
                  $('#new-input-clb-case-link').val(data2.message.data.caseLink);
                  $('#second-block-progress-bar').hide();
                  $('#scrapping-message').hide();
                  $('#first-block-modal').hide();
                  console.log('aa rha h' + data2.message.data.caseLink);
                  $('#company-law-board-final-submit').show();
                  clearInterval(caseLink);  
                }, 7000)
                
              }

              else if (data2.message.data.caseNotFound !== undefined) {
                console.log('case not found error');
                clearInterval(timeoutID);
                var cnf = setInterval(function(){
                  if(percentage < 100){
                    percentage = percentage + 10;
                    $('#case-progress-bar').css('width', percentage + '%');
                    $('#case-progress-bar').html(percentage+"%");
                  }  
                }, 1000);
                
                setTimeout(function(){
                  $('#error-show-block').html(data2.message.data.caseNotFound);
                  $('#second-block-progress-bar').hide();
                  $('#scrapping-message').hide();
                  $('#error-show-block').show();
                  clearInterval(cnf);
                },7000);

              }

              else if(data2.message.success !== 'done' && data2.message.data.caseBrief !== undefined && data2.message.data.caseLink == undefined) {
                console.log('dataBrief' + data2.message.data.caseBrief);
                clearInterval(timeoutID);
                var notdone = setInterval(function(){
                  if(percentage < 100){
                    percentage = percentage + 10;
                    $('#case-progress-bar').css('width', percentage + '%');
                    $('#case-progress-bar').html(percentage+"%");
                  }  
                }, 1000);     
                clearInterval(notdone);
                
                setTimeout(function(){
                  $('#second-block-progress-bar').hide();
                  $('#scrapping-message').hide();
                  $('#first-block-modal').hide();
                  $('#third-block-case-details').hide();
                  $('#error-show-block').html(data2.message.data.errorMsg);
                  $('#error-show-block').show();
                },3000);
              }

              else if(data2.message.success === 'done' && data2.message.data.caseBrief !== undefined && data2.message.data.caseBrief.length > 5){
                console.log('percentage done' + percentage);
                clearInterval(timeoutID);
                var done = setInterval(function(){
                  if(percentage < 100){
                    percentage = percentage + 10;
                    console.log('percentage done new ' + percentage);
                    $('#case-progress-bar').css('width', percentage + '%');
                    $('#case-progress-bar').html(percentage+"%");
                  }  
                }, 1000);
                setTimeout(function() {
                  console.log("data message::"+ data2.message.success+" : "+timeoutID);
                  console.log('caseDate' + data2.message.data.caseDate);
                  console.log('caseBrief' + data2.message.data.caseBrief);
                  console.log('latestOrder' + data2.message.data.latestOrder);
                  console.log('caseStatus' + data2.message.data.caseStatus);               
                  console.log('caseId' + formData.caseId);
                  if(data2.message.data.caseDate !== undefined) {
                    $('#new-case-time').css('display', 'block');  
                    $('#new-case-time-label').css('display', 'block');  
                    $('#new-case-time').val(data2.message.data.caseDate);  
                  }
                  else {
                   $('#new-case-time').css('display', 'none');  
                   $('#new-case-time-label').css('display', 'none');  
                  }
                  
                  if(formData.caseType != undefined) {
                    $('#new-case-type').css('display', 'block');
                    $('#new-case-type-label').css('display', 'block');
                    $('#new-case-type').val(formData.caseType);  

                  }
                  else {
                    $('#new-case-type').css('display', 'none');
                    $('#new-case-type-label').css('display', 'none');
                  }
                  if(formData.caseYear != undefined) {
                    $('#new-case-year').css('display', 'block');
                    $('#new-case-year-label').css('display', 'block');
                    $('#new-case-year').val(formData.caseYear);  
                  }
                  else {
                    $('#new-case-year').css('display', 'none');
                    $('#new-case-year-label').css('display', 'none');
                  }

                  if(formData.caseDate != undefined)  {
                    $('#new-case-date').css('display', 'block');
                    $('#new-case-date-label').css('display', 'block');
                    $('#new-case-date').val(formData.caseDate);  
                  }
                  else {
                    $('#new-case-date').css('display', 'none');
                    $('#new-case-date-label').css('display', 'none');
                  }
                  
                  $('#new-case-number').val(formData.caseNumber);
                  $('#new-case-location').val(formData.courtName);
                  $('#new-case-brief').val(data2.message.data.caseBrief.trim());
                  if(data2.message.data.caseStatus != undefined) {
                    $('#new-case-status').css('display', 'block');
                    $('#new-case-status-label').css('display', 'block');
                    $('#new-case-status').val(data2.message.data.caseStatus);  
                  }
                  else{
                    $('#new-case-status-label').css('display', 'none');
                    $('#new-case-status').css('display', 'none');
                  }
                  
                  
                  if(formData.caseId != undefined) {
                    $('#case-id-number').css('display', 'block');
                    $('#case-id-number-label').css('display', 'block');
                    $('#case-id-number').val(formData.caseId);  
                  }
                  else{
                    $('#case-id-number').css('display', 'none');
                    $('#case-id-number-label').css('display', 'none');
                  }
                  if(data2.message.data.latestOrder != undefined) {
                    $('#new-case-orderDate').css('display', 'block');
                    $('new-case-order-date-label').css('display', 'block');
                    $('#new-case-orderDate').val(data2.message.data.latestOrder);
                    
                  }
                  else{
                    $('#new-case-orderDate').css('display', 'none');
                    $('#new-case-order-label').css('display', 'none');
                  }
                  
                      
                  $('#second-block-progress-bar').hide();
                  $('#scrapping-message').hide();
                  $('#first-block-modal').hide();
                  $('#third-block-case-details').show();
                  clearInterval(done);
                }, 7000); 
              }

              else {
                clearInterval(timeoutID);
                console.log('last block else' + data2.message.data.success);
                var netProblem = setInterval(function() {
                  console.log('last block else' + data2.message.data.caseBrief);
                  if(percentage < 100){
                    percentage = percentage + 10;
                    $('#case-progress-bar').css('width', percentage + '%');
                    $('#case-progress-bar').html(percentage+"%");
                  }
                }, 1000);
                setTimeout(function(){
                  $('#second-block-progress-bar').hide();
                  $('#scrapping-message').hide();
                  $('#first-block-modal').hide();
                  $('#third-block-case-details').hide();
                  $('#error-show-block').html(data2.message.data.errorMsg);
                  $('#error-show-block').show();
                  clearInterval(netProblem);
                },7000);

              }
              
            }).fail(function(jqXHR, textStatus, errorThrown)
            {
              console.log(" Text status "+textStatus+":: Error thrown "+errorThrown +"::timeout id::"+timeoutID );
              clearInterval(timeoutID);
                $('#error-show-block').html("Error .."+errorThrown).show();
              	$('#second-block-progress-bar').hide();
                $('#scrapping-message').hide();
                $('#first-block-modal').hide();
                $('#third-block-case-details').hide();
            }).always(function() {        
            });
      }, 5000);}
    }).fail(function(jqXHR, textStatus, errorThrown) {
      console.log(" failed textStatus:: "+textStatus);
      var start = setInterval(function(){
          if(percentage < 100){
          percentage = percentage + 10;
          $('#case-progress-bar').css('width', percentage + '%');
          $('#case-progress-bar').html(percentage+"%");
          }  
        }, 3000);
      if(timeoutID !== undefined)
        clearInterval(timeoutID);
      $('#error-show-block').html("Error.."+errorThrown).show();
      $('#second-block-progress-bar').hide();
      $('#scrapping-message').hide();
      $('#first-block-modal').show();
      $('#third-block-case-details').hide();   
    }).always(function() {
      console.log( "finished post request" );
      always = setInterval(function(){
          if(percentage < 100){
          percentage = percentage + 10;
          $('#case-progress-bar').css('width', percentage + '%');
          $('#case-progress-bar').html(percentage+"%");
          }  
        }, 3000);
    });
}

