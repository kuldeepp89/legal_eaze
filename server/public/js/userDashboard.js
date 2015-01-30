$(function() {
  $('#btn-schedule-fil').on('click', function(event){
    var startDate = $('#s-date').val();
    var endDate = $('#e-date').val();
    if(startDate == '') {
      alert('please select date range');
      return false;
    }
    else if(endDate == '') {
      alert('please select Second Date');
      return false;
    }
    else if(new Date(startDate) == 'Invalid Date' || new Date(endDate) == 'Invalid Date') {
      alert('please enter date in  MM/DD/YYYY format');
      return false;
    } 
    else if(new Date($('#s-date').val()) > new Date($('#e-date').val()))  {
      alert('From date can not be greater than To date')
      return false; 
    }
  })
  
  $('.deleteCase').click(function() {
    var confirm = window.confirm("Do you really want to delete this case!");
    if(confirm == true) {
      return true;
    }
    else {
      return false
    }
  })
  $('#btn-edit-modal').click(function() {
    if($('#ndate').val() == '') {
      alert('please enter date');
      return false;
    }
    else if(new Date($('#ndate').val()) == 'Invalid Date') {
      alert('please enter date in  MM/DD/YYYY format');
      return false;
    }
  })

  $('#btn-edit-modal-detail').click(function() {
    if($('#nDate').val() == '') {
      alert('please enter date');
      return false;
    }
    else if(new Date($('#nDate').val()) == 'Invalid Date') {
      alert('please enter date in  MM/DD/YYYY format');
      return false;
    }
  })

  $('#btn-editModel').click(function() {
    if($('#ndate').val() == '') {
      alert('please enter date');
      return false;
    }
    else if(new Date($('#ndate').val()) == 'Invalid Date') {
      alert('please enter date in  MM/DD/YYYY format');
      return false;
    }
  })

  $('#uploadDoc').click(function() {
    var docType =  $('#options').val();
    if(docType == '') {
      alert('please select a document type');
      return false;
    }
    if($('#doc').val() == '') {
     alert('please select a file to be upload'); 
     return false;
    }
  })

  $('#commentButton').click(function(){
    if($('#comments').val() ==  '') {
      alert('please enter a comment');
      return false;
    }
  })
  
  $('#calender').css('display', 'none');

  $('#calender-type').click(function(){
  	$('#homelist').css('display', 'none');
  	$('#calender').css('display', 'block');
    $('#meeting-calender').prop("checked", true);
    $('#select-all-calender').prop("checked", true);
  });
 
  $('#list-type').click(function(){
  	$('#calender').css('display', 'none');
  	$('#homelist').css('display', 'block');
  });

  var currMonth = moment().startOf('month');
  var currMonthLast = moment().endOf('month');
  var sdate, edate, filteredCases = [];
  console.log(currMonth._d);

  if($('#start-date').val() === 'undefined') {
    sdate = moment(currMonth._d).subtract(1, 'month')._d;
    console.log('start-date' + sdate)
    $('#sdate').text(sdate.getDate()+'/'+parseInt(sdate.getMonth()+1)+'/'+sdate.getFullYear());
  }
  else  {
    sdate = moment($('#start-date').val());
    console.log('start-date' + sdate)
    $('#sdate').text(sdate._d.getDate()+'/'+parseInt(sdate._d.getMonth()+1)+'/'+sdate._d.getFullYear());
  }

  if($('#end-date').val() === 'undefined') {
    edate = moment(currMonthLast._d).add(1, 'month')._d;
    console.log('end-date' + edate)
    $('#edate').text(edate.getDate()+'/'+parseInt(edate.getMonth()+1)+'/'+edate.getFullYear());
  }
  else  {
    edate = moment($('#end-date').val());
    console.log('end-date' + edate)
    $('#edate').text(edate._d.getDate()+'/'+parseInt(edate._d.getMonth()+1)+'/'+edate._d.getFullYear());
  }

  $( "#slider-range" ).slider({
    range: true,
    min: moment(sdate),
    max: moment(edate),
    values: [ moment()._d, edate],
    slide: function( event, ui ) {
      $( "#amount" ).text(moment(ui.values[ 0 ]).format('DD/MM/YYYY'));
      $( "#amount1" ).text(moment(ui.values[ 1 ]).format('DD/MM/YYYY'));
      $( "#slider-range" ).slider( "disable" );
    },
    stop: function( event, ui ) {
      var a = moment($( "#slider-range" ).slider( "values", 0 )).format('DD/MM/YYYY');
      var b = moment($( "#slider-range" ).slider( "values", 1 )).format('DD/MM/YYYY');
      $.each( $('.row-table').find('p.hearing-date'), function( index, value ){
        var viewDate = new Date($(value).text().split('/')[1]+ '/' + $(value).text().split('/')[0]+ '/' + $(value).text().split('/')[2]);
        console.log("viewDate " + viewDate + " " + new Date(a.split('/')[1]+'/'+a.split('/')[0]+'/'+a.split('/')[2]) +  " " + new Date(b.split('/')[1]+'/'+b.split('/')[0]+'/'+b.split('/')[2]) );
        if(viewDate < (new Date(a.split('/')[1]+'/'+a.split('/')[0]+'/'+a.split('/')[2])) || viewDate > (new Date(b.split('/')[1]+'/'+b.split('/')[0]+'/'+b.split('/')[2]))) {
          $(this).parents('.row-table').hide();  
        }
        else {
         $(this).parents('.row-table').show();  
        }
      });
      $.each( $('.row-table').find('p.meeting-date'), function( index, value ){
        var viewDate = new Date($(value).text().split('/')[1]+ '/' + $(value).text().split('/')[0]+ '/' + $(value).text().split('/')[2]);
        console.log("viewDate " + viewDate + " " + new Date(a.split('/')[1]+'/'+a.split('/')[0]+'/'+a.split('/')[2]) +  " " + new Date(b.split('/')[1]+'/'+b.split('/')[0]+'/'+b.split('/')[2]) );
        if(viewDate < (new Date(a.split('/')[1]+'/'+a.split('/')[0]+'/'+a.split('/')[2])) || viewDate > (new Date(b.split('/')[1]+'/'+b.split('/')[0]+'/'+b.split('/')[2]))) {
          $(this).parents('.row-table').hide();  
        }
        else {
         $(this).parents('.row-table').show();  
        }
      });
      
      $( "#slider-range" ).slider( "enable");
    } 
  });

    $( "#amount" ).text( moment($( "#slider-range" ).slider( "values", 0 )).format('DD/MM/YYYY'));
    $( "#amount1" ).text( moment($( "#slider-range" ).slider( "values", 1 )).format('DD/MM/YYYY'));
    $( "#date1" ).val( moment($( "#slider-range" ).slider( "values", 0 )).format('DD/MM/YYYY'));
    $( "#date2" ).val( moment($( "#slider-range" ).slider( "values", 1 )).format('DD/MM/YYYY'));

  var slide1 = $( "#amount" ).text();
  var slide2 = $( "#amount1" ).text()
  $.each( $('.row-table').find('p.hearing-date'), function( index, value ){
    var viewDate = new Date($(value).text().split('/')[1]+ '/' + $(value).text().split('/')[0]+ '/' + $(value).text().split('/')[2]);
    console.log("viewDate " + viewDate + " " + new Date(slide1.split('/')[1]+'/'+slide1.split('/')[0]+'/'+slide1.split('/')[2]) +  " " + new Date(slide2.split('/')[1]+'/'+slide2.split('/')[0]+'/'+slide2.split('/')[2]) );
    if(viewDate < (new Date(slide1.split('/')[1]+'/'+slide1.split('/')[0]+'/'+slide1.split('/')[2])) || viewDate > (new Date(slide2.split('/')[1]+'/'+slide2.split('/')[0]+'/'+slide2.split('/')[2]))) {
      $(this).parents('.row-table').hide();  
    }
    else {
     $(this).parents('.row-table').show();  
    }
  });


  $.each( $('.row-table').find('p.meeting-date'), function( index, value ){
    var viewDate = new Date($(value).text().split('/')[1]+ '/' + $(value).text().split('/')[0]+ '/' + $(value).text().split('/')[2]);
    console.log("viewDate " + viewDate + " " + new Date(slide1.split('/')[1]+'/'+slide1.split('/')[0]+'/'+slide1.split('/')[2]) +  " " + new Date(slide2.split('/')[1]+'/'+slide2.split('/')[0]+'/'+slide2.split('/')[2]) );
    if(viewDate < (new Date(slide1.split('/')[1]+'/'+slide1.split('/')[0]+'/'+slide1.split('/')[2])) || viewDate > (new Date(slide2.split('/')[1]+'/'+slide2.split('/')[0]+'/'+slide2.split('/')[2]))) {
      $(this).parents('.row-table').hide();  
    }
    else {
     $(this).parents('.row-table').show();  
    }
  });
  
  $("#meeting-calender").click(function () {
    if($('#meeting-calender').is(':checked')) {
      $.each( $('.border-calender').find('p.meeting-cald'), function( index, value ){
        console.log($(value).text());
        console.log($(value).hasClass($('#month-name').text()));
        console.log($('#month-name').text());
        if($(value).text() != 0 && ($(value).hasClass($('#month-name').text()))) {
          $(value).show();
        }
      });
    }
    else {
      $.each( $('.border-calender').find('p.meeting-cald'), function( index, value ){
        $(value).hide();
      });
    }
  })

  $("#select-all-calender").click(function () {
    $('.check-all').prop('checked', this.checked);
    if($('#select-all-calender').is(':checked')) {
      $.each( $('.border-calender').find('p.cases-cald'), function( index, value ){
        console.log($(value).text());
        if($(value).text() != 0 && ($(value).hasClass($('#month-name').text()))) {
          $(value).show();
        }
      });
    }
    else {
      $.each( $('.border-calender').find('p.cases-cald'), function( index, value ){
        $(value).hide();
      });
    }
  });

  $(".check-all").click(function(){

    if($(".check-all").length == $(".check-all:checked").length) {
      $("#select-all-calender").prop("checked", true);
    } else {
      $("#select-all-calender").removeAttr("checked");
    }

  });

  $('#check-supreme-calender').click(function(){
    $(".check-all").prop("disabled", true);
    
    if($('#check-supreme-calender').is(':checked')) {
      $.each( $('.border-calender').find('p.supremeCourtRow'), function( index, value ){
        console.log($(value).text());
        if($(value).text() != 0 && ($(value).hasClass($('#month-name').text()))) {
          $(value).show();
        }
      });
    }
    else {
      $.each( $('.border-calender').find('p.supremeCourtRow'), function( index, value ){
        $(value).hide();
      });
    }
    
    $(".check-all").prop("disabled", false);
  });

  $('#check-delhi-calender').click(function(){
    $(".check-all").prop("disabled", true);
    
    if($('#check-delhi-calender').is(':checked')) {
      $.each( $('.border-calender').find('p.delhiHighCourtRow'), function( index, value ){
        console.log($(value).text());
        if($(value).text() != 0 && ($(value).hasClass($('#month-name').text()))) {
          $(value).show();
        }
      });
    }
    else {
      $.each( $('.border-calender').find('p.delhiHighCourtRow'), function( index, value ){
        $(value).hide();
      });
    }
    
    $(".check-all").prop("disabled", false);
  });

  $('#check-green-calender').click(function(){
    $(".check-all").prop("disabled", true);
    
    if($('#check-green-calender').is(':checked')) {
      $.each( $('.border-calender').find('p.greenTribunalRow'), function( index, value ){
        console.log($(value).text());
        if($(value).text() != 0 && ($(value).hasClass($('#month-name').text()))) {
          $(value).show();
        }
      });
    }
    else {
      $.each( $('.border-calender').find('p.greenTribunalRow'), function( index, value ){
        $(value).hide();
      });
    }
    
    $(".check-all").prop("disabled", false);
    
  });

  $('#check-telecom-calender').click(function(){
    $(".check-all").prop("disabled", true);
    
    if($('#check-telecom-calender').is(':checked')) {
      $.each( $('.border-calender').find('p.telecomDisputeRow'), function( index, value ){
        console.log($(value).text());
        if($(value).text() != 0 && ($(value).hasClass($('#month-name').text()))) {
          $(value).show();
        }
      });
    }
    else {
      $.each( $('.border-calender').find('p.telecomDisputeRow'), function( index, value ){
        $(value).hide();
      });
    }
    
    $(".check-all").prop("disabled", false);
    
  });

  $('#check-bifr-calender').click(function(){
    $(".check-all").prop("disabled", true);
    
    if($('#check-bifr-calender').is(':checked')) {
      $.each( $('.border-calender').find('p.bifrCourtRow'), function( index, value ){
        console.log($(value).text());
        if($(value).text() != 0 && ($(value).hasClass($('#month-name').text()))) {
          $(value).show();
        }
      });
    }
    else {
      $.each( $('.border-calender').find('p.bifrCourtRow'), function( index, value ){
        $(value).hide();
      });
    }
    
    $(".check-all").prop("disabled", false);
    
  });

  $('#check-consdispute-calender').click(function(){
    $(".check-all").prop("disabled", true);
    
    if($('#check-consdispute-calender').is(':checked')) {
      $.each( $('.border-calender').find('p.consumerDisputeRow'), function( index, value ){
        console.log($(value).text());
        if($(value).text() != 0 && ($(value).hasClass($('#month-name').text()))) {
          $(value).show();
        }
      });
    }
    else {
      $.each( $('.border-calender').find('p.consumerDisputeRow'), function( index, value ){
        $(value).hide();
      });
    }
    
    $(".check-all").prop("disabled", false);
    
  });

  $('#check-saket-calender').click(function(){
    $(".check-all").prop("disabled", true);
    
    if($('#check-saket-calender').is(':checked')) {
      $.each( $('.border-calender').find('p.saketRow'), function( index, value ){
        console.log($(value).text());
        if($(value).text() != 0 && ($(value).hasClass($('#month-name').text()))) {
          $(value).show();
        }
      });
    }
    else {
      $.each( $('.border-calender').find('p.saketRow'), function( index, value ){
        $(value).hide();
      });
    }
    
    $(".check-all").prop("disabled", false);
  });

  $('#check-law-calender').click(function(){
    $(".check-all").prop("disabled", true);
    
    if($('#check-law-calender').is(':checked')) {
      $.each( $('.border-calender').find('p.companyLawBoardRow'), function( index, value ){
        console.log($(value).text());
        if($(value).text() != 0 && ($(value).hasClass($('#month-name').text()))) {
          $(value).show();
        }
      });
    }
    else {
      $.each( $('.border-calender').find('p.companyLawBoardRow'), function( index, value ){
        $(value).hide();
      });
    }
    
    $(".check-all").prop("disabled", false);
  });

  $('#check-karkardooma-calender').click(function(){
    $(".check-all").prop("disabled", true);
    
    if($('#check-karkardooma-calender').is(':checked')) {
      $.each( $('.border-calender').find('p.karkardoomaRow'), function( index, value ){
        console.log($(value).text());
        if($(value).text() != 0 && ($(value).hasClass($('#month-name').text()))) {
          $(value).show();
        }
      });
    }
    else {
      $.each( $('.border-calender').find('p.karkardoomaRow'), function( index, value ){
        $(value).hide();
      });
    }
    
    $(".check-all").prop("disabled", false);
    
  });
});