$(function(){
  var flagSel = 0;
  $('#change-hdate').on('click', function(event){
    console.log('sajkkads');
    $('.change-date').css("display","block");
  });


  $('.selectpicker').selectpicker();

  $('#datetimepicker4').datetimepicker({
      pickDate: false
  });
  
  $('.see-less').click(function() {
    $('.courtentry').hide();
    $('.see-less').hide();
    $('.see-all').show();
  })

  $('.see-all').click(function() {
    $('.courtentry').show();
    $('.see-less').show();
    $('.see-all').hide();
  })

  $('.check-all').prop("checked", true);
  $('#meeting').prop("checked", true);
  $('#select-all').prop("checked", true);
  
  $("#meeting").click(function () {
    if($('#meeting').is(':checked')) {
      $.each( $('.row-table').find('p.meeting-date'), function( index, value ){
        console.log(new Date($(value).text().split('/')[1]+'/'+$(value).text().split('/')[0]+'/'+$(value).text().split('/')[2]) + " " +new Date($('#amount').text().split('/')[1]+'/'+$('#amount').text().split('/')[0]+'/'+$('#amount').text().split('/')[2]));
        if(new Date($(value).text().split('/')[1]+'/'+$(value).text().split('/')[0]+'/'+$(value).text().split('/')[2]) 
            >= new Date($('#amount').text().split('/')[1]+'/'+$('#amount').text().split('/')[0]+'/'+$('#amount').text().split('/')[2]) && new Date($(value).text().split('/')[1]+'/'+$(value).text().split('/')[0]+'/'+$(value).text().split('/')[2]) <=
            new Date($('#amount1').text().split('/')[1]+'/'+$('#amount1').text().split('/')[0]+'/'+$('#amount1').text().split('/')[2])) {
          $(this).parents('.row-table').show();   
        }
      });
    }
    else {
      $.each( $('.row-table').find('p.meeting-date'), function( index, value ){
        console.log($(value).text());
        $(this).parents('.row-table').hide();  
      });
    }
  })

  $("#select-all").click(function () {
    $('.check-all').prop('checked', this.checked);
    if($('#select-all').is(':checked')) {
      $.each( $('.row-table').find('p.hearing-date'), function( index, value ){
        console.log($(value).text());
        if(new Date($(value).text().split('/')[1]+'/'+$(value).text().split('/')[0]+'/'+$(value).text().split('/')[2]) 
            >= new Date($('#amount').text().split('/')[1]+'/'+$('#amount').text().split('/')[0]+'/'+$('#amount').text().split('/')[2]) && new Date($(value).text().split('/')[1]+'/'+$(value).text().split('/')[0]+'/'+$(value).text().split('/')[2]) <=
            new Date($('#amount1').text().split('/')[1]+'/'+$('#amount1').text().split('/')[0]+'/'+$('#amount1').text().split('/')[2])) {
          $(this).parents('.row-table').show();   
        }
      });
    }
    else {
      $.each( $('.row-table').find('p.hearing-date'), function( index, value ){
        console.log($(value).text());
        $(this).parents('.row-table').hide(); 
      });
    }
  });

  $(".check-all").click(function(){

    if($(".check-all").length == $(".check-all:checked").length) {
      $("#select-all").prop("checked", true);
    } else {
      $("#select-all").removeAttr("checked");
    }

  });

  $('#check-supreme').click(function(){
    $(".check-all").prop("disabled", true);
    
    if($('#check-supreme').is(':checked')) {
      $.each( $('.row-table').find('td.supremeCourtRow'), function( index, value ){
        console.log(new Date($(value).text().split('/')[1]+'/'+$(value).text().split('/')[0]+'/'+$(value).text().split('/')[2]) + " " +new Date($('#amount').text().split('/')[1]+'/'+$('#amount').text().split('/')[0]+'/'+$('#amount').text().split('/')[2]));
        if(new Date($(value).text().split('/')[1]+'/'+$(value).text().split('/')[0]+'/'+$(value).text().split('/')[2]) 
            >= new Date($('#amount').text().split('/')[1]+'/'+$('#amount').text().split('/')[0]+'/'+$('#amount').text().split('/')[2]) && new Date($(value).text().split('/')[1]+'/'+$(value).text().split('/')[0]+'/'+$(value).text().split('/')[2]) <=
            new Date($('#amount1').text().split('/')[1]+'/'+$('#amount1').text().split('/')[0]+'/'+$('#amount1').text().split('/')[2])) {
          $(this).parents('.row-table').show();   
        }
      });
    }
    else {
      $.each( $('.row-table').find('p.court-name'), function( index, value ){
        console.log($(value).text());
        var court = $(value).text();
        if(court === 'Supreme Court of India') {
          $(this).parents('.row-table').hide(); 
        }
      });
    }
    
    $(".check-all").prop("disabled", false);
  });

  $('#check-delhi').click(function(){
    $(".check-all").prop("disabled", true);
    
    if($('#check-delhi').is(':checked')) {
      $.each( $('.row-table').find('td.delhiHighCourtRow'), function( index, value ){
        console.log(new Date($(value).text().split('/')[1]+'/'+$(value).text().split('/')[0]+'/'+$(value).text().split('/')[2]) + " " +new Date($('#amount').text().split('/')[1]+'/'+$('#amount').text().split('/')[0]+'/'+$('#amount').text().split('/')[2]));
        if(new Date($(value).text().split('/')[1]+'/'+$(value).text().split('/')[0]+'/'+$(value).text().split('/')[2]) 
            >= new Date($('#amount').text().split('/')[1]+'/'+$('#amount').text().split('/')[0]+'/'+$('#amount').text().split('/')[2]) && new Date($(value).text().split('/')[1]+'/'+$(value).text().split('/')[0]+'/'+$(value).text().split('/')[2]) <=
            new Date($('#amount1').text().split('/')[1]+'/'+$('#amount1').text().split('/')[0]+'/'+$('#amount1').text().split('/')[2])) {
          $(this).parents('.row-table').show();   
        }
      });
    }
    else {
      $.each( $('.row-table').find('p.court-name'), function( index, value ){
        console.log($(value).text());
        var court = $(value).text();
        if(court === 'Delhi High Court') {
          $(this).parents('.row-table').hide(); 
        }
      });
    }
    
    $(".check-all").prop("disabled", false);
  });

  $('#check-green').click(function(){
    $(".check-all").prop("disabled", true);
    
    if($('#check-green').is(':checked')) {
      $.each( $('.row-table').find('td.greenTribunalRow'), function( index, value ){
        console.log(new Date($(value).text().split('/')[1]+'/'+$(value).text().split('/')[0]+'/'+$(value).text().split('/')[2]) + " " +new Date($('#amount').text().split('/')[1]+'/'+$('#amount').text().split('/')[0]+'/'+$('#amount').text().split('/')[2]));
        if(new Date($(value).text().split('/')[1]+'/'+$(value).text().split('/')[0]+'/'+$(value).text().split('/')[2]) 
            >= new Date($('#amount').text().split('/')[1]+'/'+$('#amount').text().split('/')[0]+'/'+$('#amount').text().split('/')[2]) && new Date($(value).text().split('/')[1]+'/'+$(value).text().split('/')[0]+'/'+$(value).text().split('/')[2]) <=
            new Date($('#amount1').text().split('/')[1]+'/'+$('#amount1').text().split('/')[0]+'/'+$('#amount1').text().split('/')[2])) {
          $(this).parents('.row-table').show();   
        }
      });
    }
    else {
      $.each( $('.row-table').find('p.court-name'), function( index, value ){
        console.log($(value).text());
        var court = $(value).text();
        if(court === 'National Green Tribunal') {
          $(this).parents('.row-table').hide(); 
        }
      });
    }
    
    $(".check-all").prop("disabled", false);
    
  });

  $('#check-telecom').click(function(){
    $(".check-all").prop("disabled", true);
    
    if($('#check-telecom').is(':checked')) {
      $.each( $('.row-table').find('td.telecomDisputeRow'), function( index, value ){
        console.log(new Date($(value).text().split('/')[1]+'/'+$(value).text().split('/')[0]+'/'+$(value).text().split('/')[2]) + " " +new Date($('#amount').text().split('/')[1]+'/'+$('#amount').text().split('/')[0]+'/'+$('#amount').text().split('/')[2]));
        if(new Date($(value).text().split('/')[1]+'/'+$(value).text().split('/')[0]+'/'+$(value).text().split('/')[2]) 
            >= new Date($('#amount').text().split('/')[1]+'/'+$('#amount').text().split('/')[0]+'/'+$('#amount').text().split('/')[2]) && new Date($(value).text().split('/')[1]+'/'+$(value).text().split('/')[0]+'/'+$(value).text().split('/')[2]) <=
            new Date($('#amount1').text().split('/')[1]+'/'+$('#amount1').text().split('/')[0]+'/'+$('#amount1').text().split('/')[2])) {
          $(this).parents('.row-table').show();   
        }
      });
    }
    else {
      $.each( $('.row-table').find('p.court-name'), function( index, value ){
        console.log($(value).text());
        var court = $(value).text();
        if(court === 'National Telecom Disputes') {
          $(this).parents('.row-table').hide(); 
        }
      });
    }
    
    $(".check-all").prop("disabled", false);
    
  });

  $('#check-bifr').click(function(){
    $(".check-all").prop("disabled", true);
    
    if($('#check-bifr').is(':checked')) {
      $.each( $('.row-table').find('td.bifrCourtRow'), function( index, value ){
        console.log(new Date($(value).text().split('/')[1]+'/'+$(value).text().split('/')[0]+'/'+$(value).text().split('/')[2]) + " " +new Date($('#amount').text().split('/')[1]+'/'+$('#amount').text().split('/')[0]+'/'+$('#amount').text().split('/')[2]));
        if(new Date($(value).text().split('/')[1]+'/'+$(value).text().split('/')[0]+'/'+$(value).text().split('/')[2]) 
            >= new Date($('#amount').text().split('/')[1]+'/'+$('#amount').text().split('/')[0]+'/'+$('#amount').text().split('/')[2]) && new Date($(value).text().split('/')[1]+'/'+$(value).text().split('/')[0]+'/'+$(value).text().split('/')[2]) <=
            new Date($('#amount1').text().split('/')[1]+'/'+$('#amount1').text().split('/')[0]+'/'+$('#amount1').text().split('/')[2])) {
          $(this).parents('.row-table').show();   
        }
      });
    }
    else {
      $.each( $('.row-table').find('p.court-name'), function( index, value ){
        console.log($(value).text());
        var court = $(value).text();
        if(court === 'BIFR Court') {
          $(this).parents('.row-table').hide(); 
        }
      });
    }
    
    $(".check-all").prop("disabled", false);
    
  });

  $('#check-consdispute').click(function(){
    $(".check-all").prop("disabled", true);
    
    if($('#check-consdispute').is(':checked')) {
      $.each( $('.row-table').find('td.consumerDisputeRow'), function( index, value ){
       console.log(new Date($(value).text().split('/')[1]+'/'+$(value).text().split('/')[0]+'/'+$(value).text().split('/')[2]) + " " +new Date($('#amount').text().split('/')[1]+'/'+$('#amount').text().split('/')[0]+'/'+$('#amount').text().split('/')[2]));
        if(new Date($(value).text().split('/')[1]+'/'+$(value).text().split('/')[0]+'/'+$(value).text().split('/')[2]) 
            >= new Date($('#amount').text().split('/')[1]+'/'+$('#amount').text().split('/')[0]+'/'+$('#amount').text().split('/')[2]) && new Date($(value).text().split('/')[1]+'/'+$(value).text().split('/')[0]+'/'+$(value).text().split('/')[2]) <=
            new Date($('#amount1').text().split('/')[1]+'/'+$('#amount1').text().split('/')[0]+'/'+$('#amount1').text().split('/')[2])) {
          $(this).parents('.row-table').show();   
        }
      });
    }
    else {
      $.each( $('.row-table').find('p.court-name'), function( index, value ){
        console.log($(value).text());
        var court = $(value).text();
        if(court === 'National Consumer Dispute') {
          $(this).parents('.row-table').hide(); 
        }
      });
    }
    
    $(".check-all").prop("disabled", false);
    
  });

  $('#check-saket').click(function(){
    $(".check-all").prop("disabled", true);
    
    if($('#check-saket').is(':checked')) {
      $.each( $('.row-table').find('td.saketRow'), function( index, value ){
        console.log(new Date($(value).text().split('/')[1]+'/'+$(value).text().split('/')[0]+'/'+$(value).text().split('/')[2]) + " " +new Date($('#amount').text().split('/')[1]+'/'+$('#amount').text().split('/')[0]+'/'+$('#amount').text().split('/')[2]));
        if(new Date($(value).text().split('/')[1]+'/'+$(value).text().split('/')[0]+'/'+$(value).text().split('/')[2]) 
            >= new Date($('#amount').text().split('/')[1]+'/'+$('#amount').text().split('/')[0]+'/'+$('#amount').text().split('/')[2]) && new Date($(value).text().split('/')[1]+'/'+$(value).text().split('/')[0]+'/'+$(value).text().split('/')[2]) <=
            new Date($('#amount1').text().split('/')[1]+'/'+$('#amount1').text().split('/')[0]+'/'+$('#amount1').text().split('/')[2])) {
          $(this).parents('.row-table').show();   
        }
      });
    }
    else {
      $.each( $('.row-table').find('p.court-name'), function( index, value ){
        console.log($(value).text());
        var court = $(value).text();
        if(court === 'District Court Saket') {
          $(this).parents('.row-table').hide(); 
        }
      });
    }
    
    $(".check-all").prop("disabled", false);
  });

  $('#check-law').click(function(){
    $(".check-all").prop("disabled", true);
    
    if($('#check-law').is(':checked')) {
      $.each( $('.row-table').find('p.court-name'), function( index, value ){
        console.log(new Date($(value).text().split('/')[1]+'/'+$(value).text().split('/')[0]+'/'+$(value).text().split('/')[2]) + " " +new Date($('#amount').text().split('/')[1]+'/'+$('#amount').text().split('/')[0]+'/'+$('#amount').text().split('/')[2]));
        if(new Date($(value).text().split('/')[1]+'/'+$(value).text().split('/')[0]+'/'+$(value).text().split('/')[2]) 
            >= new Date($('#amount').text().split('/')[1]+'/'+$('#amount').text().split('/')[0]+'/'+$('#amount').text().split('/')[2]) && new Date($(value).text().split('/')[1]+'/'+$(value).text().split('/')[0]+'/'+$(value).text().split('/')[2]) <=
            new Date($('#amount1').text().split('/')[1]+'/'+$('#amount1').text().split('/')[0]+'/'+$('#amount1').text().split('/')[2])) {
          $(this).parents('.row-table').show();   
        }
      });
    }
    else {
      $.each( $('.row-table').find('p.court-name'), function( index, value ){
        console.log($(value).text());
        var court = $(value).text();
        if(court === 'Company Law Board') {
          $(this).parents('.row-table').hide(); 
        }
      });
    }
    
    $(".check-all").prop("disabled", false);
  });

  $('#check-karkardooma').click(function(){
    $(".check-all").prop("disabled", true);
    
    if($('#check-karkardooma').is(':checked')) {
      $.each( $('.row-table').find('td.karkardoomaRow'), function( index, value ){
        console.log(new Date($(value).text().split('/')[1]+'/'+$(value).text().split('/')[0]+'/'+$(value).text().split('/')[2]) + " " +new Date($('#amount').text().split('/')[1]+'/'+$('#amount').text().split('/')[0]+'/'+$('#amount').text().split('/')[2]));
        if(new Date($(value).text().split('/')[1]+'/'+$(value).text().split('/')[0]+'/'+$(value).text().split('/')[2]) 
            >= new Date($('#amount').text().split('/')[1]+'/'+$('#amount').text().split('/')[0]+'/'+$('#amount').text().split('/')[2]) && new Date($(value).text().split('/')[1]+'/'+$(value).text().split('/')[0]+'/'+$(value).text().split('/')[2]) <=
            new Date($('#amount1').text().split('/')[1]+'/'+$('#amount1').text().split('/')[0]+'/'+$('#amount1').text().split('/')[2])) {
          $(this).parents('.row-table').show();   
        }
      });
    }
    else {
      $.each( $('.row-table').find('p.court-name'), function( index, value ){
        console.log($(value).text());
        var court = $(value).text();
        if(court === 'District Court Karkardooma') {
          $(this).parents('.row-table').hide(); 
        }
      });
    }
    
    $(".check-all").prop("disabled", false);
    
  });

  $('#scheduleMeeting').on('click', function(event){
      $('#meeting-form-modal').show();
      $('#select-court-meeting').hide();
      $('#btn-back-modal').show();
      $('#btn-confirm-modal').show();
      $('#supreme-court-modal-data').hide();
      $('#competition-appellate-tribunal-data-modal').hide();
      $('#company-law-board-data-modal').hide();
      $('#national-consumer-disputes-data-modal').hide();
      $('#national-green-tribunal-data-modal').hide();
      $('#telecom-dispute-data-modal').hide();
      $('#delhi-high-court-data-modal').hide();
      $('#bifr-court-modal-data').hide();
      

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
    $('#karkardooma-data-modal').hide();
    $('#saket-data-modal').hide();
    $('#btn-back-modal').hide();
  });
});