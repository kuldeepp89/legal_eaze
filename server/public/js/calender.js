$(function() {
  var monthNames = [ "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December" ];
  
  
  $('p.number-cald,p.meeting-cald,p.cases-cald').hide();
  

  if(monthNames[$('#sdate').text().split('/')[1]-1] == monthNames[$('#edate').text().split('/')[1]-1] && monthNames[$('#edate').text().split('/')[1]-1] == monthNames[$('#sdate').text().split('/')[1]-1]
    && $('#edate').text().split('/')[2] == $('#sdate').text().split('/')[2]) {

    $('#right').prop("disabled",true);
    $('#left').prop("disabled",true); 
  }
  else if(monthNames[moment().month()] == monthNames[$('#edate').text().split('/')[1]-1]) {
    $('#right').prop("disabled",true);
  }
  else if(monthNames[moment().month()] == monthNames[$('#sdate').text().split('/')[1]-1]) {
    $('#left').prop("disabled",true);
  }
  
  var month;
  var prevCountJan = 0, prevCountFeb = 0, prevCountMarch = 0; prevCountApril = 0, prevCountMay = 0, 
  prevCountJune = 0, prevCountJul = 0, prevCountAug = 0, prevCountSep = 0, prevCountOct = 0, prevCountNov = 0, prevCountDec = 0;
  var nextCountJan = 0, nextCountFeb = 0, nextCountMarch = 0; nextCountApril = 0, nextCountMay = 0,
      nextCountJune = 0, nextCountJul = 0, nextCountAug = 0, nextCountSep = 0, nextCountOct = 0, nextCountNov = 0, nextCountDec = 0;
  var fillCalender = function(monthNumber, year, count) {
    month = moment().month(monthNumber).year(year);
    var day  = moment(month).startOf('month');
    var numOfDays = moment(day).daysInMonth();
    var day_name =  new Date(day).getDay();

    for(var i = 0; i < numOfDays; i++) {
      if(day_name == 1) {
        var row = Math.floor(i/7);
        var col = i%7;
        console.log(count + ' count');
        if(count == 0) {
          $.each($('.row-table').find('p.hearing-date'), function( index, value ){
            var viewDate = new Date($(value).text().split('/')[1]+ '/' + $(value).text().split('/')[0]+ '/' + $(value).text().split('/')[2]);
            console.log(parseInt($('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.cases-cald').children('span.cases-cald-value').text())+1)
            if(viewDate.getDate() == i+1 && monthNames[viewDate.getMonth()] == $('#month-name').text() && viewDate.getFullYear() == $('#year-name').text() ) {
              $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.cases-cald').show();
              $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.cases-cald').addClass($(value).parents('.row-table').find('td:first').attr('class'));
              $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.cases-cald').addClass(monthNames[monthNumber]);
              if(parseInt($('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.cases-cald').children('span.cases-cald-value').text()) == '')  {
                $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.cases-cald').children('span.cases-cald-value').text(
                  parseInt($('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.cases-cald').children('span.cases-cald-value').text())+1
                )  
              }
              
            }
          });
          $.each( $('.row-table').find('p.meeting-date'), function( index, value ){
            var viewDate = new Date($(value).text().split('/')[1]+ '/' + $(value).text().split('/')[0]+ '/' + $(value).text().split('/')[2]);
            console.log(viewDate.getDate()+" " + (i+1)+ " " + " "+ monthNames[viewDate.getMonth()] + " "+ $('#month-name').text())
            if(viewDate.getDate() == i+1 && monthNames[viewDate.getMonth()] == $('#month-name').text() && viewDate.getFullYear() == $('#year-name').text() ) {
              $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.meeting-cald').show();
              $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.meeting-cald').addClass(monthNames[monthNumber]);
              if(parseInt($('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.meeting-cald').children('span.meeting-cald-value').text()) == 0) {
                $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.meeting-cald').children('span.meeting-cald-value').text(
                  parseInt(1)
                )  
                console.log(parseInt($('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.meeting-cald').children('span.meeting-cald-value').text()) + "hJDLFkfj"); 
              }
              else {
                $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.meeting-cald').children('span.meeting-cald-value').text(
                  parseInt($('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.meeting-cald').children('span.meeting-cald-value').text())+parseInt(1)
                )
              }
              console.log('aaya');
            }
          });
          $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.number-cald').show();  
          $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.number-cald').text(i+1);
        }
        else {
          $.each($('.row-table').find('p.hearing-date'), function( index, value ){
            var viewDate = new Date($(value).text().split('/')[1]+ '/' + $(value).text().split('/')[0]+ '/' + $(value).text().split('/')[2]);
            if(viewDate.getDate() == i+1 && monthNames[viewDate.getMonth()] == $('#month-name').text() && viewDate.getFullYear() == $('#year-name').text() ) {
              $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.cases-cald').show();  
            }
          });
          $.each( $('.row-table').find('p.meeting-date'), function( index, value ){
            var viewDate = new Date($(value).text().split('/')[1]+ '/' + $(value).text().split('/')[0]+ '/' + $(value).text().split('/')[2]);
            if(viewDate.getDate() == i+1 && monthNames[viewDate.getMonth()] == $('#month-name').text() && viewDate.getFullYear() == $('#year-name').text() ) {
              $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.meeting-cald').show();
            }
          });
          $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.number-cald').show();  
          $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.number-cald').text(i+1);
        }
        
        console.log(i+1 + " " + col + ' ' + row);
      }
      else if(day_name == 2) {
        var row = Math.floor((i+1)/7);
        var col = (i+1)%7;
        console.log(count);
        if(count == 0) {
          $.each($('.row-table').find('p.hearing-date'), function( index, value ){
            var viewDate = new Date($(value).text().split('/')[1]+ '/' + $(value).text().split('/')[0]+ '/' + $(value).text().split('/')[2]);
            console.log(parseInt($('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.cases-cald').children('span.cases-cald-value').text())+1)
            if(viewDate.getDate() == i+1 && monthNames[viewDate.getMonth()] == $('#month-name').text() && viewDate.getFullYear() == $('#year-name').text() ) {
              $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.cases-cald').show();
              $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.cases-cald').addClass($(value).parents('.row-table').find('td:first').attr('class'));
              $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.cases-cald').addClass(monthNames[monthNumber]);
              if(parseInt($('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.cases-cald').children('span.cases-cald-value').text()) == '')  {
                $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.cases-cald').children('span.cases-cald-value').text(
                  parseInt($('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.cases-cald').children('span.cases-cald-value').text())+1
                )  
              }
              
            }
          });
          $.each( $('.row-table').find('p.meeting-date'), function( index, value ){
            var viewDate = new Date($(value).text().split('/')[1]+ '/' + $(value).text().split('/')[0]+ '/' + $(value).text().split('/')[2]);
            console.log(viewDate.getDate()+" " + (i+1)+ " " + " "+ monthNames[viewDate.getMonth()] + " "+ $('#month-name').text())
            if(viewDate.getDate() == i+1 && monthNames[viewDate.getMonth()] == $('#month-name').text() && viewDate.getFullYear() == $('#year-name').text() ) {
              $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.meeting-cald').show();
              $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.meeting-cald').addClass(monthNames[monthNumber]);
              if(parseInt($('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.meeting-cald').children('span.meeting-cald-value').text()) == 0) {
                $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.meeting-cald').children('span.meeting-cald-value').text(
                  parseInt(1)
                )  
                console.log(parseInt($('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.meeting-cald').children('span.meeting-cald-value').text()) + "hJDLFkfj"); 
              }
              else {
                $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.meeting-cald').children('span.meeting-cald-value').text(
                  parseInt($('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.meeting-cald').children('span.meeting-cald-value').text())+parseInt(1)
                )
              }
              console.log('aaya');
            }
          });
          $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.number-cald').show();  
          $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.number-cald').text(i+1);
        }
        else {
          $.each($('.row-table').find('p.hearing-date'), function( index, value ){
            var viewDate = new Date($(value).text().split('/')[1]+ '/' + $(value).text().split('/')[0]+ '/' + $(value).text().split('/')[2]);
            if(viewDate.getDate() == i+1 && monthNames[viewDate.getMonth()] == $('#month-name').text() && viewDate.getFullYear() == $('#year-name').text() ) {
              $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.cases-cald').show();  
            }
          });
          $.each( $('.row-table').find('p.meeting-date'), function( index, value ){
            var viewDate = new Date($(value).text().split('/')[1]+ '/' + $(value).text().split('/')[0]+ '/' + $(value).text().split('/')[2]);
            if(viewDate.getDate() == i+1 && monthNames[viewDate.getMonth()] == $('#month-name').text() && viewDate.getFullYear() == $('#year-name').text() ) {
              $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.meeting-cald').show();
            }
          });
          $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.number-cald').show();  
          $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.number-cald').text(i+1);
        }
        
        console.log(i+1 + " " + col + ' ' + row);
      }
      else if(day_name == 3) {
        var row = Math.floor((i+2)/7);
        var col = (i+2)%7;
        console.log(count);
        if(count == 0) {
          $.each($('.row-table').find('p.hearing-date'), function( index, value ){
            var viewDate = new Date($(value).text().split('/')[1]+ '/' + $(value).text().split('/')[0]+ '/' + $(value).text().split('/')[2]);
            console.log(parseInt($('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.cases-cald').children('span.cases-cald-value').text())+1)
            if(viewDate.getDate() == i+1 && monthNames[viewDate.getMonth()] == $('#month-name').text() && viewDate.getFullYear() == $('#year-name').text() ) {
              $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.cases-cald').show();
              $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.cases-cald').addClass($(value).parents('.row-table').find('td:first').attr('class'));
              $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.cases-cald').addClass(monthNames[monthNumber]);
              if(parseInt($('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.cases-cald').children('span.cases-cald-value').text()) == '')  {
                $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.cases-cald').children('span.cases-cald-value').text(
                  parseInt($('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.cases-cald').children('span.cases-cald-value').text())+1
                )  
              }
              
            }
          });
          $.each( $('.row-table').find('p.meeting-date'), function( index, value ){
            var viewDate = new Date($(value).text().split('/')[1]+ '/' + $(value).text().split('/')[0]+ '/' + $(value).text().split('/')[2]);
            console.log(viewDate.getDate()+" " + (i+1)+ " " + " "+ monthNames[viewDate.getMonth()] + " "+ $('#month-name').text())
            if(viewDate.getDate() == i+1 && monthNames[viewDate.getMonth()] == $('#month-name').text() && viewDate.getFullYear() == $('#year-name').text() ) {
              $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.meeting-cald').show();
              $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.meeting-cald').addClass(monthNames[monthNumber]);
              if(parseInt($('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.meeting-cald').children('span.meeting-cald-value').text()) == 0) {
                $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.meeting-cald').children('span.meeting-cald-value').text(
                  parseInt(1)
                )  
                console.log(parseInt($('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.meeting-cald').children('span.meeting-cald-value').text()) + "hJDLFkfj"); 
              }
              else {
                $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.meeting-cald').children('span.meeting-cald-value').text(
                  parseInt($('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.meeting-cald').children('span.meeting-cald-value').text())+parseInt(1)
                )
              }
              console.log('aaya');
            }
          });
          $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.number-cald').show();  
          $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.number-cald').text(i+1);
        }
        else {
          $.each($('.row-table').find('p.hearing-date'), function( index, value ){
            var viewDate = new Date($(value).text().split('/')[1]+ '/' + $(value).text().split('/')[0]+ '/' + $(value).text().split('/')[2]);
            if(viewDate.getDate() == i+1 && monthNames[viewDate.getMonth()] == $('#month-name').text() && viewDate.getFullYear() == $('#year-name').text() ) {
              $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.cases-cald').show();  
            }
          });
          $.each( $('.row-table').find('p.meeting-date'), function( index, value ){
            var viewDate = new Date($(value).text().split('/')[1]+ '/' + $(value).text().split('/')[0]+ '/' + $(value).text().split('/')[2]);
            if(viewDate.getDate() == i+1 && monthNames[viewDate.getMonth()] == $('#month-name').text() && viewDate.getFullYear() == $('#year-name').text() ) {
              $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.meeting-cald').show();
            }
          });
          $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.number-cald').show();  
          $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.number-cald').text(i+1);
        }
        
        console.log(i+1 + " " + col + ' ' + row);
      }
      else if(day_name == 4) {
        var row = Math.floor((i+3)/7);
        var col = (i+3)%7;
        console.log(count);
        if(count == 0) {
          $.each($('.row-table').find('p.hearing-date'), function( index, value ){
            var viewDate = new Date($(value).text().split('/')[1]+ '/' + $(value).text().split('/')[0]+ '/' + $(value).text().split('/')[2]);
            console.log(parseInt($('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.cases-cald').children('span.cases-cald-value').text())+1)
            if(viewDate.getDate() == i+1 && monthNames[viewDate.getMonth()] == $('#month-name').text() && viewDate.getFullYear() == $('#year-name').text() ) {
              $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.cases-cald').show();
              $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.cases-cald').addClass($(value).parents('.row-table').find('td:first').attr('class'));
              $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.cases-cald').addClass(monthNames[monthNumber]);
              if(parseInt($('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.cases-cald').children('span.cases-cald-value').text()) == '')  {
                $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.cases-cald').children('span.cases-cald-value').text(
                  parseInt($('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.cases-cald').children('span.cases-cald-value').text())+1
                )  
              }
              
            }
          });
          $.each( $('.row-table').find('p.meeting-date'), function( index, value ){
            var viewDate = new Date($(value).text().split('/')[1]+ '/' + $(value).text().split('/')[0]+ '/' + $(value).text().split('/')[2]);
            console.log(viewDate.getDate()+" " + (i+1)+ " " + " "+ monthNames[viewDate.getMonth()] + " "+ $('#month-name').text())
            if(viewDate.getDate() == i+1 && monthNames[viewDate.getMonth()] == $('#month-name').text() && viewDate.getFullYear() == $('#year-name').text() ) {
              $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.meeting-cald').show();
              $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.meeting-cald').addClass(monthNames[monthNumber]);
              if(parseInt($('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.meeting-cald').children('span.meeting-cald-value').text()) == 0) {
                $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.meeting-cald').children('span.meeting-cald-value').text(
                  parseInt(1)
                )  
                console.log(parseInt($('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.meeting-cald').children('span.meeting-cald-value').text()) + "hJDLFkfj"); 
              }
              else {
                $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.meeting-cald').children('span.meeting-cald-value').text(
                  parseInt($('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.meeting-cald').children('span.meeting-cald-value').text())+parseInt(1)
                )
              }
              console.log('aaya');
            }
          });
          $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.number-cald').show();  
          $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.number-cald').text(i+1);
        }
        else {
          $.each($('.row-table').find('p.hearing-date'), function( index, value ){
            var viewDate = new Date($(value).text().split('/')[1]+ '/' + $(value).text().split('/')[0]+ '/' + $(value).text().split('/')[2]);
            if(viewDate.getDate() == i+1 && monthNames[viewDate.getMonth()] == $('#month-name').text() && viewDate.getFullYear() == $('#year-name').text() ) {
              $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.cases-cald').show();  
            }
          });
          $.each( $('.row-table').find('p.meeting-date'), function( index, value ){
            var viewDate = new Date($(value).text().split('/')[1]+ '/' + $(value).text().split('/')[0]+ '/' + $(value).text().split('/')[2]);
            if(viewDate.getDate() == i+1 && monthNames[viewDate.getMonth()] == $('#month-name').text() && viewDate.getFullYear() == $('#year-name').text() ) {
              $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.meeting-cald').show();
            }
          });
          $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.number-cald').show();  
          $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.number-cald').text(i+1);
        }
        
        console.log(i+1 + " " + col + ' ' + row);
      }
      else if(day_name == 5) {
        var row = Math.floor((i+4)/7);
        var col = (i+4)%7;
        console.log(count);
        if(count == 0) {
          $.each($('.row-table').find('p.hearing-date'), function( index, value ){
            var viewDate = new Date($(value).text().split('/')[1]+ '/' + $(value).text().split('/')[0]+ '/' + $(value).text().split('/')[2]);
            console.log(parseInt($('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.cases-cald').children('span.cases-cald-value').text())+1)
            if(viewDate.getDate() == i+1 && monthNames[viewDate.getMonth()] == $('#month-name').text() && viewDate.getFullYear() == $('#year-name').text() ) {
              $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.cases-cald').show();
              $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.cases-cald').addClass($(value).parents('.row-table').find('td:first').attr('class'));
              $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.cases-cald').addClass(monthNames[monthNumber]);
              if(parseInt($('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.cases-cald').children('span.cases-cald-value').text()) == '')  {
                $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.cases-cald').children('span.cases-cald-value').text(
                  parseInt($('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.cases-cald').children('span.cases-cald-value').text())+1
                )  
              }
              
            }
          });
          $.each( $('.row-table').find('p.meeting-date'), function( index, value ){
            var viewDate = new Date($(value).text().split('/')[1]+ '/' + $(value).text().split('/')[0]+ '/' + $(value).text().split('/')[2]);
            console.log(viewDate.getDate()+" " + (i+1)+ " " + " "+ monthNames[viewDate.getMonth()] + " "+ $('#month-name').text())
            if(viewDate.getDate() == i+1 && monthNames[viewDate.getMonth()] == $('#month-name').text() && viewDate.getFullYear() == $('#year-name').text() ) {
              $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.meeting-cald').show();
              $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.meeting-cald').addClass(monthNames[monthNumber]);
              if(parseInt($('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.meeting-cald').children('span.meeting-cald-value').text()) == 0) {
                $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.meeting-cald').children('span.meeting-cald-value').text(
                  parseInt(1)
                )  
                console.log(parseInt($('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.meeting-cald').children('span.meeting-cald-value').text()) + "hJDLFkfj"); 
              }
              else {
                $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.meeting-cald').children('span.meeting-cald-value').text(
                  parseInt($('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.meeting-cald').children('span.meeting-cald-value').text())+parseInt(1)
                )
              }
              console.log('aaya');
            }
          });
          $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.number-cald').show();  
          $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.number-cald').text(i+1);
        }
        else {
          $.each($('.row-table').find('p.hearing-date'), function( index, value ){
            var viewDate = new Date($(value).text().split('/')[1]+ '/' + $(value).text().split('/')[0]+ '/' + $(value).text().split('/')[2]);
            if(viewDate.getDate() == i+1 && monthNames[viewDate.getMonth()] == $('#month-name').text() && viewDate.getFullYear() == $('#year-name').text() ) {
              $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.cases-cald').show();  
            }
          });
          $.each( $('.row-table').find('p.meeting-date'), function( index, value ){
            var viewDate = new Date($(value).text().split('/')[1]+ '/' + $(value).text().split('/')[0]+ '/' + $(value).text().split('/')[2]);
            if(viewDate.getDate() == i+1 && monthNames[viewDate.getMonth()] == $('#month-name').text() && viewDate.getFullYear() == $('#year-name').text() ) {
              $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.meeting-cald').show();
            }
          });
          $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.number-cald').show();  
          $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.number-cald').text(i+1);
        }
        
        console.log(i+1 + " " + col + ' ' + row);
      }
      else if(day_name == 6) {
        var row = Math.floor((i+5)/7);
        var col = (i+5)%7;
        console.log(count);
        if(count == 0) {
          $.each($('.row-table').find('p.hearing-date'), function( index, value ){
            var viewDate = new Date($(value).text().split('/')[1]+ '/' + $(value).text().split('/')[0]+ '/' + $(value).text().split('/')[2]);
            console.log(parseInt($('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.cases-cald').children('span.cases-cald-value').text())+1)
            if(viewDate.getDate() == i+1 && monthNames[viewDate.getMonth()] == $('#month-name').text() && viewDate.getFullYear() == $('#year-name').text() ) {
              $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.cases-cald').show();
              $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.cases-cald').addClass($(value).parents('.row-table').find('td:first').attr('class'));
              $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.cases-cald').addClass(monthNames[monthNumber]);
              if(parseInt($('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.cases-cald').children('span.cases-cald-value').text()) == '')  {
                $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.cases-cald').children('span.cases-cald-value').text(
                  parseInt($('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.cases-cald').children('span.cases-cald-value').text())+1
                )  
              }
              
            }
          });
          $.each( $('.row-table').find('p.meeting-date'), function( index, value ){
            var viewDate = new Date($(value).text().split('/')[1]+ '/' + $(value).text().split('/')[0]+ '/' + $(value).text().split('/')[2]);
            console.log(viewDate.getDate()+" " + (i+1)+ " " + " "+ monthNames[viewDate.getMonth()] + " "+ $('#month-name').text())
            if(viewDate.getDate() == i+1 && monthNames[viewDate.getMonth()] == $('#month-name').text() && viewDate.getFullYear() == $('#year-name').text() ) {
              $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.meeting-cald').show();
              $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.meeting-cald').addClass(monthNames[monthNumber]);
              if(parseInt($('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.meeting-cald').children('span.meeting-cald-value').text()) == 0) {
                $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.meeting-cald').children('span.meeting-cald-value').text(
                  parseInt(1)
                )  
                console.log(parseInt($('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.meeting-cald').children('span.meeting-cald-value').text()) + "hJDLFkfj"); 
              }
              else {
                $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.meeting-cald').children('span.meeting-cald-value').text(
                  parseInt($('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.meeting-cald').children('span.meeting-cald-value').text())+parseInt(1)
                )
              }
              console.log('aaya');
            }
          });
          $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.number-cald').show();  
          $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.number-cald').text(i+1);
        }
        else {
          $.each($('.row-table').find('p.hearing-date'), function( index, value ){
            var viewDate = new Date($(value).text().split('/')[1]+ '/' + $(value).text().split('/')[0]+ '/' + $(value).text().split('/')[2]);
            if(viewDate.getDate() == i+1 && monthNames[viewDate.getMonth()] == $('#month-name').text() && viewDate.getFullYear() == $('#year-name').text() ) {
              $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.cases-cald').show();  
            }
          });
          $.each( $('.row-table').find('p.meeting-date'), function( index, value ){
            var viewDate = new Date($(value).text().split('/')[1]+ '/' + $(value).text().split('/')[0]+ '/' + $(value).text().split('/')[2]);
            if(viewDate.getDate() == i+1 && monthNames[viewDate.getMonth()] == $('#month-name').text() && viewDate.getFullYear() == $('#year-name').text() ) {
              $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.meeting-cald').show();
            }
          });
          $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.number-cald').show();  
          $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.number-cald').text(i+1);
        }
        
        console.log(i+1 + " " + col + ' ' + row);
      }
      else if(day_name == 0) {
        var row = Math.floor((i+6)/7);
        var col = (i+6)%7;
        console.log(count);
        if(count == 0) {
          $.each($('.row-table').find('p.hearing-date'), function( index, value ){
            var viewDate = new Date($(value).text().split('/')[1]+ '/' + $(value).text().split('/')[0]+ '/' + $(value).text().split('/')[2]);
            console.log(parseInt($('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.cases-cald').children('span.cases-cald-value').text())+1)
            if(viewDate.getDate() == i+1 && monthNames[viewDate.getMonth()] == $('#month-name').text() && viewDate.getFullYear() == $('#year-name').text() ) {
              $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.cases-cald').show();
              $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.cases-cald').addClass($(value).parents('.row-table').find('td:first').attr('class'));
              $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.cases-cald').addClass(monthNames[monthNumber]);
              if(parseInt($('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.cases-cald').children('span.cases-cald-value').text()) == '')  {
                $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.cases-cald').children('span.cases-cald-value').text(
                  parseInt($('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.cases-cald').children('span.cases-cald-value').text())+1
                )  
              }
              
            }
          });
          $.each( $('.row-table').find('p.meeting-date'), function( index, value ){
            var viewDate = new Date($(value).text().split('/')[1]+ '/' + $(value).text().split('/')[0]+ '/' + $(value).text().split('/')[2]);
            console.log(viewDate.getDate()+" " + (i+1)+ " " + " "+ monthNames[viewDate.getMonth()] + " "+ $('#month-name').text())
            if(viewDate.getDate() == i+1 && monthNames[viewDate.getMonth()] == $('#month-name').text() && viewDate.getFullYear() == $('#year-name').text() ) {
              $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.meeting-cald').show();
              $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.meeting-cald').addClass(monthNames[monthNumber]);
              if(parseInt($('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.meeting-cald').children('span.meeting-cald-value').text()) == 0) {
                $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.meeting-cald').children('span.meeting-cald-value').text(
                  parseInt(1)
                )  
                console.log(parseInt($('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.meeting-cald').children('span.meeting-cald-value').text()) + "hJDLFkfj"); 
              }
              else {
                $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.meeting-cald').children('span.meeting-cald-value').text(
                  parseInt($('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.meeting-cald').children('span.meeting-cald-value').text())+parseInt(1)
                )
              }
              console.log('aaya');
            }
          });
          $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.number-cald').show();  
          $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.number-cald').text(i+1);
        }
        else {
          $.each($('.row-table').find('p.hearing-date'), function( index, value ){
            var viewDate = new Date($(value).text().split('/')[1]+ '/' + $(value).text().split('/')[0]+ '/' + $(value).text().split('/')[2]);
            if(viewDate.getDate() == i+1 && monthNames[viewDate.getMonth()] == $('#month-name').text() && viewDate.getFullYear() == $('#year-name').text() ) {
              $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.cases-cald').show();  
            }
          });
          $.each( $('.row-table').find('p.meeting-date'), function( index, value ){
            var viewDate = new Date($(value).text().split('/')[1]+ '/' + $(value).text().split('/')[0]+ '/' + $(value).text().split('/')[2]);
            if(viewDate.getDate() == i+1 && monthNames[viewDate.getMonth()] == $('#month-name').text() && viewDate.getFullYear() == $('#year-name').text() ) {
              $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.meeting-cald').show();
            }
          });
          $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.number-cald').show();  
          $('#col'+ (parseInt(col)+1)).find('.row'+ (parseInt(row)+1)).children('p.number-cald').text(i+1);
        }
        
        console.log(i+1 + " " + col + ' ' + row);
      }
    }
  }

  console.log(monthNames[(new Date($('#sdate').text().split('/')[1]+ '/' + $('#sdate').text().split('/')[0]+ '/' + $('#sdate').text().split('/')[2])).getMonth()]);
  console.log(monthNames[moment().month()]);
  if(monthNames[(new Date(parseInt($('#sdate').text().split('/')[1]) + 1+ '/' + $('#sdate').text().split('/')[0]+ '/' + $('#sdate').text().split('/')[2])).getMonth()] == monthNames[moment().month()]) {
    $('#month-name').text(monthNames[moment().month()]);
    $('#year-name').text(moment().year());
    fillCalender(moment().month(), moment().year(), 0); 
  }
  else {
    $('#month-name').text(monthNames[new Date($('#sdate').text().split('/')[1]+ '/' + $('#sdate').text().split('/')[0]+ '/' + $('#sdate').text().split('/')[2]).getMonth()]);
    $('#year-name').text(new Date($('#sdate').text().split('/')[1]+ '/' + $('#sdate').text().split('/')[0]+ '/' + $('#sdate').text().split('/')[2]).getFullYear());
    console.log(new Date($('#sdate').text().split('/')[1]+ '/' + $('#sdate').text().split('/')[0]+ '/' + $('#sdate').text().split('/')[2]).getMonth()+" "+ new Date($('#sdate').text().split('/')[1]+ '/' + $('#sdate').text().split('/')[0]+ '/' + $('#sdate').text().split('/')[2]).getFullYear());
    $('#left').prop('disabled', 'true');
    console.log(parseInt($('#sdate').text().split('/')[1]) + 1);
    fillCalender(new Date($('#sdate').text().split('/')[1]+ '/' + $('#sdate').text().split('/')[0]+ '/' + $('#sdate').text().split('/')[2]).getMonth(), new Date($('#sdate').text().split('/')[1]+ '/' + $('#sdate').text().split('/')[0]+ '/' + $('#sdate').text().split('/')[2]).getFullYear(), 0);
  }
  
  $('.arrow-right').click(function() {
    if($('#month-name').text() == 'January') {
      if(monthNames[$('#edate').text().split('/')[1]-1] == 'February' && $('#edate').text().split('/')[2] == $('#year-name').text()) {
        $('#right').prop("disabled",true);
        $('#left').prop("disabled",false);
        $('#month-name').text(monthNames[1]);
        $('p.number-cald,p.meeting-cald,p.cases-cald').hide();  
          fillCalender(1, moment(month).year(), nextCountJan);
          nextCountJan = nextCountJan + 1;
        
      }
      else {
        $('#right').prop("disabled",false);
        $('#left').prop("disabled",false);
        $('#month-name').text(monthNames[1]);
        $('p.number-cald,p.meeting-cald,p.cases-cald').hide();  
          fillCalender(1, moment(month).year(), nextCountJan);
          nextCountJan = nextCountJan + 1;
        
      }
    }
    else if($('#month-name').text() == 'February') {
      if(monthNames[$('#edate').text().split('/')[1]-1] == 'March' && $('#edate').text().split('/')[2] == $('#year-name').text()) {
        $('#right').prop("disabled",true);
        $('#left').prop("disabled",false);
        $('p.number-cald,p.meeting-cald,p.cases-cald').hide();
        $('#month-name').text(monthNames[2]);      
        fillCalender(2, moment(month).year(), nextCountFeb);
        nextCountFeb = nextCountFeb + 1;
      }
      else {
        $('#right').prop("disabled",false);
        $('#left').prop("disabled",false);
        $('p.number-cald,p.meeting-cald,p.cases-cald').hide();
        $('#month-name').text(monthNames[2]);      
        fillCalender(2, moment(month).year(), nextCountFeb);
        nextCountFeb = nextCountFeb + 1;
      }
      
    }
    else if($('#month-name').text() == 'March') {
      if(monthNames[$('#edate').text().split('/')[1]-1] == 'April' && $('#edate').text().split('/')[2] == $('#year-name').text()) {
        $('#right').prop("disabled",true);
        $('#left').prop("disabled",false);
        $('p.number-cald,p.meeting-cald,p.cases-cald').hide();
        $('#month-name').text(monthNames[3]);
        fillCalender(3, moment(month).year(), nextCountMarch);
        nextCountMarch = nextCountMarch + 1;
      }
      else {
        $('#right').prop("disabled",false);
        $('#left').prop("disabled",false);
        $('p.number-cald,p.meeting-cald,p.cases-cald').hide();
        $('#month-name').text(monthNames[3]);
        fillCalender(3, moment(month).year(), nextCountMarch);
        nextCountMarch = nextCountMarch + 1;
      }
      
    }
    else if($('#month-name').text() == 'April') {
      if(monthNames[$('#edate').text().split('/')[1]-1] == 'May' && $('#edate').text().split('/')[2] == $('#year-name').text()) {
        $('#right').prop("disabled",true);
        $('#left').prop("disabled",false);
        $('p.number-cald,p.meeting-cald,p.cases-cald').hide();
        $('#month-name').text(monthNames[4]);
        fillCalender(4, moment(month).year(), nextCountApril);
        nextCountApril = nextCountApril + 1;
      }
      else {
        $('#right').prop("disabled",false);
        $('#left').prop("disabled",false);
        $('p.number-cald,p.meeting-cald,p.cases-cald').hide();
        $('#month-name').text(monthNames[4]);
        fillCalender(4, moment(month).year(), nextCountApril);
        nextCountApril = nextCountApril + 1;
      }
     
    }
    else if($('#month-name').text() == 'May') {
      if(monthNames[$('#edate').text().split('/')[1]-1] == 'June' && $('#edate').text().split('/')[2] == $('#year-name').text()) {
        $('#right').prop("disabled",true);
        $('#left').prop("disabled",false);
        $('p.number-cald,p.meeting-cald,p.cases-cald').hide();
        $('#month-name').text(monthNames[5]);
        fillCalender(5, moment(month).year(), nextCountMay);
        nextCountMay = nextCountMay + 1;
      }
      else {
        $('#right').prop("disabled",false);
        $('#left').prop("disabled",false);
        $('p.number-cald,p.meeting-cald,p.cases-cald').hide();
        $('#month-name').text(monthNames[5]);
        fillCalender(5, moment(month).year(), nextCountMay);
        nextCountMay = nextCountMay + 1;
      }
    }
    else if($('#month-name').text() == 'June') {
      if(monthNames[$('#edate').text().split('/')[1]-1] == 'July' && $('#edate').text().split('/')[2] == $('#year-name').text() ) {
        $('#right').prop("disabled",true);
        $('#left').prop("disabled",false);
        $('p.number-cald,p.meeting-cald,p.cases-cald').hide();
        $('#month-name').text(monthNames[6]);
        fillCalender(6, moment(month).year(), nextCountJune);
        nextCountJune = nextCountJune + 1;
      }
      else {
        $('#right').prop("disabled",false);
        $('#left').prop("disabled",false);
        $('p.number-cald,p.meeting-cald,p.cases-cald').hide();
        $('#month-name').text(monthNames[6]);
        fillCalender(6, moment(month).year(), nextCountJune);
        nextCountJune = nextCountJune + 1;
      }
      
    }
    else if($('#month-name').text() == 'July') {
      if(monthNames[$('#edate').text().split('/')[1]-1] == 'August' && $('#edate').text().split('/')[2] == $('#year-name').text()) {
        $('#right').prop("disabled",true);
        $('#left').prop("disabled",false);
        $('p.number-cald,p.meeting-cald,p.cases-cald').hide();
        $('#month-name').text(monthNames[7]);
        fillCalender(7, moment(month).year(), nextCountJul);
        nextCountJul = nextCountJul + 1;
      }
      else {
        $('#right').prop("disabled",false);
        $('#left').prop("disabled",false);
        $('p.number-cald,p.meeting-cald,p.cases-cald').hide();
        $('#month-name').text(monthNames[7]);
        fillCalender(7, moment(month).year(), nextCountJul);
        nextCountJul = nextCountJul + 1;
      }
      
    }
    else if($('#month-name').text() == 'August') {
      if(monthNames[$('#edate').text().split('/')[1]-1] == 'September' && $('#edate').text().split('/')[2] == $('#year-name').text()) {
        $('#right').prop("disabled",true);
        $('#left').prop("disabled",false);
        $('p.number-cald,p.meeting-cald,p.cases-cald').hide();
        $('#month-name').text(monthNames[8]);
        fillCalender(8, moment(month).year(), nextCountAug);
        nextCountAug = nextCountAug + 1;
      }
      else {
        $('#right').prop("disabled",false);
        $('#left').prop("disabled",false);
        $('p.number-cald,p.meeting-cald,p.cases-cald').hide();
        $('#month-name').text(monthNames[8]);
        fillCalender(8, moment(month).year(), nextCountAug);
        nextCountAug = nextCountAug + 1;
      }
    }
    else if($('#month-name').text() == 'September') {
      if(monthNames[$('#edate').text().split('/')[1]-1] == 'October' && $('#edate').text().split('/')[2] == $('#year-name').text()) {
        $('#right').prop("disabled",true);
        $('#left').prop("disabled",false);
        $('p.number-cald,p.meeting-cald,p.cases-cald').hide();
        $('#month-name').text(monthNames[9]);
        fillCalender(9, moment(month).year(), nextCountSep);
        nextCountSep = nextCountSep + 1;
      }
      else {
        $('#right').prop("disabled",false);
        $('#left').prop("disabled",false);
        $('p.number-cald,p.meeting-cald,p.cases-cald').hide();
        $('#month-name').text(monthNames[9]);
        fillCalender(9, moment(month).year(), nextCountSep);
        nextCountSep = nextCountSep + 1;
      }
    }
    else if($('#month-name').text() == 'October') {
      if(monthNames[$('#edate').text().split('/')[1]-1] == 'November' && $('#edate').text().split('/')[2] == $('#year-name').text()) {
        $('#right').prop("disabled",true);
        $('#left').prop("disabled",false);
        $('p.number-cald,p.meeting-cald,p.cases-cald').hide();
        $('#month-name').text(monthNames[10]);
        fillCalender(10, moment(month).year(), nextCountOct);
        nextCountOct = nextCountOct + 1;

      }
      else {
        $('#right').prop("disabled",false);
        $('#left').prop("disabled",false);
        $('p.number-cald,p.meeting-cald,p.cases-cald').hide();
        $('#month-name').text(monthNames[10]);
        fillCalender(10, moment(month).year(), nextCountOct);
        nextCountOct = nextCountOct + 1;
      }
      
    }
    else if($('#month-name').text() == 'November') {
      if(monthNames[$('#edate').text().split('/')[1]-1] == 'December' && $('#edate').text().split('/')[2] == $('#year-name').text()) {
        $('#right').prop("disabled",true);
        $('#left').prop("disabled",false);
        $('p.number-cald,p.meeting-cald,p.cases-cald').hide();
        $('#month-name').text(monthNames[11]);
        fillCalender(11, moment(month).year(), nextCountNov);
        nextCountNov = nextCountNov + 1;
      }
      else {
        $('#right').prop("disabled",false);
        $('#left').prop("disabled",false);
        $('p.number-cald,p.meeting-cald,p.cases-cald').hide();
        $('#month-name').text(monthNames[11]);
        fillCalender(11, moment(month).year(), nextCountNov);
        nextCountNov = nextCountNov + 1;
      }
    }
    else if($('#month-name').text() == 'December') {
      if(monthNames[$('#edate').text().split('/')[1]-1] != 'January' && $('#edate').text().split('/')[2] != $('#year-name').text()+1) {
        
        $('#right').prop("disabled",false);
        $('#left').prop("disabled",false);
        console.log(parseInt($('#year-name').text())+1 + monthNames[$('#edate').text().split('/')[1]-1] + "dkjsssssssssssssssssssssssssssssss "+ $('#edate').text().split('/')[2] );
        $('p.number-cald,p.meeting-cald,p.cases-cald').hide();
        $('#month-name').text(monthNames[0]); 
        $('#year-name').text(moment(month).year()+1);    
        fillCalender(0, (moment(month).year()+1), nextCountDec);
        nextCountDec = nextCountDec + 1;
      }
      else {
        $('#right').prop("disabled",true);
        console.log($('#year-name').text()+1 + "dkjsssssssssssssssssssssssssssssss "+ $('#edate').text().split('/')[2] );
        $('#left').prop("disabled",false);
        $('p.number-cald,p.meeting-cald,p.cases-cald').hide();
        $('#month-name').text(monthNames[0]); 
        $('#year-name').text(moment(month).year()+1);    
        fillCalender(0, (moment(month).year()+1), nextCountDec);
        nextCountDec = nextCountDec + 1;
      }
    }
  })
 

  $('.arrow-left').click(function() {
    var count = 0;
    if($('#month-name').text() == 'January') {
      if(monthNames[$('#sdate').text().split('/')[1]-1] == 'December' && $('#sdate').text().split('/')[2] == $('#year-name').text()) {
        $('#left').prop("disabled",true);
        $('#right').prop("disabled",false);
        $('p.number-cald,p.meeting-cald,p.cases-cald').hide();
        $('#month-name').text(monthNames[11]);
        $('#year-name').text(moment(month).year()-1);
        fillCalender(11, moment(month).year()-1, prevCountJan);
        prevCountJan = prevCountJan  + 1;
      }
      else {
        $('#left').prop("disabled",false);
        $('#right').prop("disabled",false);
        $('p.number-cald,p.meeting-cald,p.cases-cald').hide();
        $('#month-name').text(monthNames[11]);
        $('#year-name').text(moment(month).year()-1);
        fillCalender(11, moment(month).year()-1, prevCountJan);
        prevCountJan = prevCountJan  + 1;
      }
    }
    else if($('#month-name').text() == 'February') {
      if(monthNames[$('#sdate').text().split('/')[1]-1] == 'January' && $('#sdate').text().split('/')[2] == $('#year-name').text()) {
        $('#left').prop("disabled",true);
        $('#right').prop("disabled",false);
        $('p.number-cald,p.meeting-cald,p.cases-cald').hide();
        $('#month-name').text(monthNames[0]);
        fillCalender(0, moment(month).year(), prevCountFeb);
        prevCountFeb = prevCountFeb + 1;
      }
      else {
        $('#left').prop("disabled",false);
        $('#right').prop("disabled",false);
        $('p.number-cald,p.meeting-cald,p.cases-cald').hide();
        $('#month-name').text(monthNames[0]);
        fillCalender(0, moment(month).year(), prevCountFeb);
        prevCountFeb = prevCountFeb + 1;
      }
      
    }
    else if($('#month-name').text() == 'March') {
      if(monthNames[$('#sdate').text().split('/')[1]-1] == 'February' && $('#sdate').text().split('/')[2] == $('#year-name').text()) {
        $('#left').prop("disabled",true);
        $('#right').prop("disabled",false);
        $('p.number-cald,p.meeting-cald,p.cases-cald').hide();
        $('#month-name').text(monthNames[1]);
        fillCalender(1, moment(month).year(), prevCountMarch);
        prevCountMarch = prevCountMarch + 1;
      }
      else {
        $('#left').prop("disabled",false);
        $('#right').prop("disabled",false);
        $('p.number-cald,p.meeting-cald,p.cases-cald').hide();
        $('#month-name').text(monthNames[1]);
        fillCalender(1, moment(month).year(), prevCountMarch);
        prevCountMarch = prevCountMarch + 1;
      }
      
    }
    else if($('#month-name').text() == 'April') {
      if(monthNames[$('#sdate').text().split('/')[1]-1] == 'March' && $('#sdate').text().split('/')[2] == $('#year-name').text()) {
        $('#left').prop("disabled",true);
        $('#right').prop("disabled",false);
        $('p.number-cald,p.meeting-cald,p.cases-cald').hide();
        $('#month-name').text(monthNames[2]);
        fillCalender(2, moment(month).year(), prevCountApril);
        prevCountApril = prevCountApril + 1;
      }
      else {
        $('#left').prop("disabled",false);
        $('#right').prop("disabled",false);
        $('p.number-cald,p.meeting-cald,p.cases-cald').hide();
        $('#month-name').text(monthNames[2]);prevCountMarch
        fillCalender(2, moment(month).year(), prevCountApril);
        prevCountApril = prevCountApril + 1;
      }
      
    }
    else if($('#month-name').text() == 'May') {
      if(monthNames[$('#sdate').text().split('/')[1]-1] == 'April' && $('#sdate').text().split('/')[2] == $('#year-name').text()) {
        $('#left').prop("disabled",true);
        $('#right').prop("disabled",false);
        $('p.number-cald,p.meeting-cald,p.cases-cald').hide();
        $('#month-name').text(monthNames[3]);
        fillCalender(3, moment(month).year(), prevCountMay);
        prevCount = prevCountMay + 1;
      }
      else {
        $('#left').prop("disabled",false);
        $('#right').prop("disabled",false);
        $('p.number-cald,p.meeting-cald,p.cases-cald').hide();
        $('#month-name').text(monthNames[3]);
        fillCalender(3, moment(month).year(), prevCountMay);
        prevCountMay = prevCountMay + 1;
      }
      
    }
    else if($('#month-name').text() == 'June') {
      if(monthNames[$('#sdate').text().split('/')[1]-1] == 'May' && $('#sdate').text().split('/')[2] == $('#year-name').text()) {
        $('#left').prop("disabled",true);
        $('#right').prop("disabled",false);
        $('p.number-cald,p.meeting-cald,p.cases-cald').hide();
        $('#month-name').text(monthNames[4]);
        fillCalender(4, moment(month).year(), prevCountJune);
        prevCountJune = prevCountJune + 1;
      }
      else {
        $('#left').prop("disabled",false);
        $('#right').prop("disabled",false);
        $('p.number-cald,p.meeting-cald,p.cases-cald').hide();
        $('#month-name').text(monthNames[4]);
        fillCalender(4, moment(month).year(), prevCountJune);
        prevCountJune = prevCountJune + 1;
      }
      
    }
    else if($('#month-name').text() == 'July') {
      if(monthNames[$('#sdate').text().split('/')[1]-1] == 'June' && $('#sdate').text().split('/')[2] == $('#year-name').text()) {
        $('#left').prop("disabled",true);
        $('#right').prop("disabled",false);
        $('p.number-cald,p.meeting-cald,p.cases-cald').hide();
        $('#month-name').text(monthNames[5]);
        fillCalender(5, moment(month).year(), prevCountJul);
        prevCountJul = prevCountJul + 1;
      }
      else {
        $('#left').prop("disabled",false);
        $('#right').prop("disabled",false);
        $('p.number-cald,p.meeting-cald,p.cases-cald').hide();
        $('#month-name').text(monthNames[5]);
        fillCalender(5, moment(month).year(), prevCountJul);
        prevCountJul = prevCountJul + 1;
      }
      
    }
    else if($('#month-name').text() == 'August') {
      if(monthNames[$('#sdate').text().split('/')[1]-1] == 'July' && $('#sdate').text().split('/')[2] == $('#year-name').text()) {
        $('#left').prop("disabled",true);
        $('#right').prop("disabled",false);
        $('p.number-cald,p.meeting-cald,p.cases-cald').hide();
        $('#month-name').text(monthNames[6]);
        fillCalender(6, moment(month).year(), prevCountAug);
        prevCountAug = prevCountAug + 1;
      }
      else {
        $('#left').prop("disabled",false);
        $('#right').prop("disabled",false);
        $('p.number-cald,p.meeting-cald,p.cases-cald').hide();
        $('#month-name').text(monthNames[6]);
        fillCalender(6, moment(month).year(), prevCountAug);
        prevCountAug = prevCountAug + 1;
      }
    }
    else if($('#month-name').text() == 'September') {
      if(monthNames[$('#sdate').text().split('/')[1]-1] == 'August' && $('#sdate').text().split('/')[2] == $('#year-name').text()) {
        $('#left').prop("disabled",true);
        $('#right').prop("disabled",false);
        $('p.number-cald,p.meeting-cald,p.cases-cald').hide();
        $('#month-name').text(monthNames[7]);
        fillCalender(7, moment(month).year(), prevCountSep);
        prevCountSep = prevCountSep + 1;
      }
      else {
        $('#left').prop("disabled",false);
        $('#right').prop("disabled",false);
        $('p.number-cald,p.meeting-cald,p.cases-cald').hide();
        $('#month-name').text(monthNames[7]);
        fillCalender(7, moment(month).year(), prevCountSep);
        prevCountSep = prevCountSep + 1;
      }
    }
    else if($('#month-name').text() == 'October') {
      if(monthNames[$('#sdate').text().split('/')[1]-1] == 'September' && $('#sdate').text().split('/')[2] == $('#year-name').text()) {
        $('#left').prop("disabled",true);
        $('#right').prop("disabled",false);
        $('p.number-cald,p.meeting-cald,p.cases-cald').hide();
        $('#month-name').text(monthNames[8]);
        fillCalender(8, moment(month).year(), prevCountOct);
        prevCountOct = prevCountOct + 1;
      }
      else {
        $('#left').prop("disabled",false);
        $('#right').prop("disabled",false);
        $('p.number-cald,p.meeting-cald,p.cases-cald').hide();
        $('#month-name').text(monthNames[8]);
        fillCalender(8, moment(month).year(), prevCountOct);
        prevCountOct = prevCountOct + 1;
        
      }
    }
    else if($('#month-name').text() == 'November') {
      if(monthNames[$('#sdate').text().split('/')[1]-1] == 'October' && $('#sdate').text().split('/')[2] == $('#year-name').text()) {
        $('#left').prop("disabled",true);
        $('#right').prop("disabled",false);
        $('p.number-cald,p.meeting-cald,p.cases-cald').hide();
        $('#month-name').text(monthNames[9]);
        fillCalender(9, moment(month).year(), prevCountNov);
        prevCountNov = prevCountNov + 1;
        
      }
      else {
        $('#left').prop("disabled",false);
        $('#right').prop("disabled",false);
        $('p.number-cald,p.meeting-cald,p.cases-cald').hide();
        $('#month-name').text(monthNames[9]);
        fillCalender(9, moment(month).year(), prevCountNov);
        prevCountNov = prevCountNov + 1;
      }
    }
    else if($('#month-name').text() == 'December') {
      if(monthNames[$('#sdate').text().split('/')[1]-1] == 'November' && $('#sdate').text().split('/')[2] == $('#year-name').text()) {
        $('#left').prop("disabled",true);
        $('#right').prop("disabled",false);
        $('p.number-cald,p.meeting-cald,p.cases-cald').hide();
        $('#month-name').text(monthNames[10]);
        fillCalender(10, moment(month).year(), prevCountDec);
        prevCountDec = prevCountDec + 1;
      }
      else {
        $('#left').prop("disabled",false);
        $('#right').prop("disabled",false);
        $('p.number-cald,p.meeting-cald,p.cases-cald').hide();
        $('#month-name').text(monthNames[10]);
        fillCalender(10, moment(month).year(), prevCountDec);
        prevCountDec = prevCountDec + 1;
      }
    }
  })
  
})
