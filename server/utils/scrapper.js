'use strict'

var Scrapper = module.exports;
var flag = {};

var request = require('request');
var cheerio = require('cheerio');
var orderDates=[];
var caseName, caseStatus;
var data = {};

var caseNumberDelhi;
var locationDelhi;
var caseDateDelhi;
var caseBriefDelhi;
var latestOrderDelhi, caseStatusDelhi;
var cnf;
var linkOrder;
var linkDate;
request=request.defaults({jar:true});



Scrapper.supremeCourt = function(caseType, caseNumber, year, callback) {
  delete data.caseStatus;
  delete data.caseBrief;
  delete data.caseDate;
  delete data.latestOrder;
  delete data.caseNotFound;
  delete data.errorMsg;
  console.log('scrapping supremecourt');
  request.post(
  'http://courtnic.nic.in/supremecourt/casestatus_new/querycheck_new.asp',
  { form: {seltype:caseType , txtnumber:caseNumber , selcyear:year, Submit:"Submit"} },
  function (error, response, body) {0
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(body);
       //console.log(body)
      var x=[];
      var lenTable = $('table').length;
      console.log("Length==="+$('table').length);
      $('table').each(function(i, elem) {
         if(lenTable===21 || lenTable===17){
          if(lenTable === 21){
            x[i] = $(this).text();
            if(i==18){
              $(this).find('tr').each(function(k, elem) {
                if(k==1){
                  x[i] = $(this).find('td').eq(5).text();
                  data.caseDate = x[i];
                  console.log('caseDate' + data.caseDate);
                }
              });
            }
            if(i==5){
              x[i] = $(this).find('tr').eq(0).children().eq(2).text();
            }
          }
          else if(lenTable === 17){
            x[i] = $(this).text();
            if(i==14){
              $(this).find('tr').each(function(k, elem) {
                if(k==1){
                  x[i] = $(this).find('td').eq(5).text();
                  data.caseDate = x[i];
                  console.log('caseDate' + data.caseDate);
                }
              });
            }
            if(i==5){
              x[i] = $(this).find('tr').eq(0).children().eq(2).text();
            }
          }

          data.caseBrief = x[8];
          data.caseStatus = x[5];
          console.log("case Status::"+data.caseStatus);
          

          request.get(
            'http://courtnic.nic.in/supremecourt/casestatus_new/querycheck_page2.asp',
            function (err, res, html) {
              if (!err && res.statusCode == 200) {
                var $ = cheerio.load(html);
                var z = [];
                $('table').each(function(i, elem) {
                  if(i===0){
                    $(this).each(function(j,k){
                      z[j]=$(this).find('td').eq(3).children().eq(1).text();
                      if(z[0]!=="No Order(s) Found"){
                        var lenDate = $(this).find('td').eq(3).find('option').length;
                        for(var i=0;i<lenDate;i++){
                          orderDates[i]=$(this).find('td').eq(3).find('option').eq(i+1).text();
                          data.latestOrder = orderDates[0];
                          //console.log('orderDate' + data.latestOrder);
                        }
                      }
                    });
                  }
                });
              }
              else
              {
                console.log("*********page 2 not found**");
              }
            });
          }
          else if(lenTable === 5){
            console.log("case not found");
            data.errorMsg="case not found";
            //data = "Case Not Found..";
            //showErrorMsg();
          }
          else if(lenTable === 0){
            console.log("Internal server error/Error 500 or 404 page not found");
            data.errorMsg="Internal server error/Error 500 or 404 page not found";
           /* $('#error-show-block').html("Internal server error/Error 500 or 404 page not found");
            $('#error-show-block').show();*/
            //data = "Internal server error/Error 500 or 404 page not found";

          }
        });
        if(data.caseDate != undefined){
          data.caseDate = data.caseDate.trim();
          data.caseDate = data.caseDate.split('/')[1]+'/'+data.caseDate.split('/')[0]+'/'+data.caseDate.split('/')[2];    
        }
        if(data.latestOrder != undefined){
          data.latestOrder = data.latestOrder.trim();
          data.latestOrder = data.latestOrder.split('/')[1]+'/'+data.latestOrder.split('/')[0]+'/'+data.latestOrder.split('/')[2];
        }
        console.log("case Status::"+data.caseStatus);
        console.log("case brief::"+data.caseBrief);
        console.log("case Date::"+data.caseDate);
    }
    else
    {
      console.log("*********page One not found**");
    }
    callback(data);
  });
  
}

Scrapper.delhiHighCourt = function(caseType, caseNumber, year, callback) {
  delete data.caseStatus;
  delete data.caseBrief;
  delete data.caseDate;
  delete data.latestOrder;
  delete data.caseNotFound;
  delete data.errorMsg;
	console.log('scrapping Delhi High Court');
  request.post(
  'http://delhihighcourt.nic.in/dhc_case_status_list_new.asp',
  {form: {sno:"1" , ctype: caseType , cno: caseNumber, cyear: year}},
  function (error, response, body) {
    if (!error && response.statusCode == 200)
    {
     //console.log(body); 
     var $ = cheerio.load(body);
      /////////////////

      console.log("Lenght----"+$('table').length);
      if($('font').attr('color')==='red'){
        console.log(""+$('font').text());
        data.caseStatus = $('font').text();
        //data.caseStatus = caseStatusDelhi;

      }
      if($('font').attr('color')==='green'){
        console.log(""+$('font').text());
        data.caseStatus = $('font').text();
        //data.caseStatus = caseStatusDelhi;

      }
      $('table').each(function(i,elem){
        if(i===0){
          cnf = $(this).find('div.innertxt').text();
          if(cnf === 'CASE NOT FOUND'){
            console.log('CASE NOT FOUND');
          }

          //console.log("Case statusCode=="+cnf);
        }
        //console.log("i th value ..== "+i+"=== "+$(this).text());
        if(i===16){
          //console.log($(this).text());
          $(this).find('td').each(function(j,ele){
            if(j===9){
              console.log("Case brief=="+$(this).text());
              /****** Case Brief variable ***********/
              data.caseBrief = $(this).text();
              //data.caseBrief = caseBriefDelhi;
            }
            if(j==10){
              /****** Case Hearing Date variable ***********/
              if(data.caseStatus === '[PENDING]'){
                data.caseDate =  $(this).text().split('Date:')[1];
                console.log("Case date=="+ data.caseDate);
                //data.caseDate = caseDateDelhi;
              }
              else if(data.caseStatus === '[DISPOSED OFF]'){
                if($(this).text() != undefined && $(this).text().split('\n')[3] != undefined) {
                  data.caseDate =  $(this).text().split('\n')[3].split('on')[1];
                  console.log("Case date=="+ data.caseDate);
                  //data.caseDate = caseDateDelhi;  
                }
                
              }
              
            }
          });
        }
      });

     if(cnf !== 'CASE NOT FOUND'){
      var gh = $('button').attr('onclick');
      console.log(gh);
      if(gh !== undefined) {
        var num = gh.split('=')[2];  
      }
      else {
        var num = undefined;
      }
      
      request.get('http://delhihighcourt.nic.in/dhc_case_status_oj_list.asp?pno='+num,
        function (err, res, html)
        {
          if (!err && res.statusCode == 200)
          {
            //console.log(html)
            var $ = cheerio.load(html);
            var z = [];
            var x = $('table').text();

            $('table').each(function(i,elem){
            if(i===16)
            {
              //console.log("date;;;;"+$(this).text());

              $(this).find('tr').each(function(j,ele)
              {
                //console.log("checking   ---"+$(this).find('td').eq('2').text());

                if(j==5){
                  /****** Case Order Date variable ***********/
                  data.latestOrder =  $(this).find('td').eq('2').text();//split('\n')[3];
                  console.log("Case date order=="+ data.latestOrder);
                 // data.latestOrder = latestOrderDelhi;
                }
                if(j >= 5){
                  if($(this).find('td').eq('2').text() !==""){
                    orderDates[j-5]=$(this).find('td').eq('2').text();
                  console.log("Case date ordersList=="+ orderDates[j-5]);
                  }
                }
              });
            }
          });
          if(data.caseDate !== undefined) {
            data.caseDate = data.caseDate.trim(); 
            data.caseDate = data.caseDate.split('/')[1]+'/'+data.caseDate.split('/')[0]+'/'+data.caseDate.split('/')[2];
          }
           
          
          if(data.latestOrder !== undefined) {
            data.latestOrder = data.latestOrder.trim(); 
            data.latestOrder = data.latestOrder.split('/')[1]+'/'+data.latestOrder.split('/')[0]+'/'+data.latestOrder.split('/')[2];
          }
           
          
        console.log("Latest order=="+data.latestOrder + "Case Date == "+ data.caseDate);
        }
        else
        {
          console.log("*********page 2 not found**");
        }
      });
    }
    console.log("case status= "+ caseStatusDelhi);
    console.log("case brief = "+ data.caseBrief);
  }
    else
    {
      console.log("hello=" +error);
    }
  console.log("Latest order=="+data.latestOrder + "Case Date == "+ data.caseDate);
  callback(data);
  });

}

Scrapper.greenTribunal = function(caseType, caseNumber, searchDate, callback) {
  console.log('scrapping national green tribunal');
  delete data.caseNotFound;
  delete data.caseStatus;
  delete data.caseBrief;
  delete data.caseDate;
  delete data.latestOrder;
  delete data.errorMsg;
  var orderDate = [];
  request.get(
  'http://www.greentribunal.gov.in/getorder_list.php?ordate='+searchDate,
  function (error, response, body) {
    if (!error && response.statusCode == 200) {
      //console.log(body)
      var $ = cheerio.load(body);
      var caseNotFound = $('table').find('tr').eq(3).children().eq(0).text();
      if(caseNotFound !== 'No Result Found')
      {     
        $('table').find('tr').each(function(i, elem)
        {
          var name = $(this).children().eq(0).html();
          // console.log("**"+name);
          var cv = caseType+" "+caseNumber;
          if(name.indexOf(cv) != -1){
            linkOrder = $(this).children().eq(3).find('a').attr('href');
            console.log("Link of order "+linkOrder);
          }
        });
        request.get('http://www.greentribunal.gov.in/'+linkOrder,
          function (err, res, html) {
            if (!err && res.statusCode == 200) {
              var $ = cheerio.load(html);
              $('table.pro').find('tr').each(function(i, elem){
                if(i==3){
                  console.log($(this).find('span').text());
                  data.caseStatus = $(this).find('span').text();
                }
                if(data.caseStatus ==='Pending'){
                  if(i==5){
                    console.log(" i =5 ="+$(this).text());
                    data.caseBrief = $(this).text();
                    
                  }

                  if(i==7){
                    console.log(" i =7 ="+$(this).text());             
                    data.caseBrief =   data.caseBrief+" VS "+ $(this).text();
                    console.log(data.caseBrief);
                  }
                  
                  if(i>=11 && i%2===1){
                    if($(this).children().eq(1).text()!==''){
                      orderDate[i-11] = $(this).children().eq(1).text();
                      console.log("heelloo "+ $(this).children().eq(1).text());

                      if(i==11){
                        if($(this).children().eq(2).text() === '--' ){
                          data.caseDate = $(this).children().eq(2).text();
                          console.log(" caseDate ="+data.caseDate);
                        }
                        else{
                          data.caseDate = $(this).children().eq(2).text();
                          console.log(" caseDate ="+data.caseDate);
                        }
                      }
                      else if(i==13 && data.caseDate == '--'){
                        data.caseDate = $(this).children().eq(2).text();
                        console.log("i==13 .."+$(this).children().eq(2).text());
                        console.log(" caseDate ="+data.caseDate);
                      }
                    }
                  }


                }
                else if(data.caseStatus === 'Disposed Off'){
                  
                  if(i==7){
                    console.log(" i =7 ="+$(this).text());             
                    data.caseBrief = $(this).text();
                  }
                  
                  if(i==9){
                    console.log(" i =9 ="+$(this).text());
                    data.caseBrief = data.caseBrief+" VS "+ $(this).text();  
                    console.log(data.caseBrief);

   
                  }

                  if(i>=13 && i%2===1){
                    if($(this).children().eq(1).text()!==''){
                      orderDate[i-13] = $(this).children().eq(1).text();
                      console.log("heelloo "+ $(this).children().eq(1).text());

                      if(i==13){
                        if($(this).children().eq(2).text() === '--' ){
                          data.caseDate = $(this).children().eq(2).text();
                          console.log(" caseDate ="+data.caseDate);
                        }
                        else{
                          data.caseDate = $(this).children().eq(2).text();
                          console.log(" caseDate ="+data.caseDate);
                        }
                      }
                      else if(i==15 && data.caseDate == '--'){
                        data.caseDate = $(this).children().eq(2).text();
                        console.log("i==13 .."+$(this).children().eq(2).text());
                        console.log(" caseDate ="+data.caseDate);
                      }
                    }
                  }

                }
               
                
              });
               data.caseDate = data.caseDate.split('-')[1]+'/'+data.caseDate.split('-')[0]+'/'+data.caseDate.split('-')[2];
               data.latestOrder = orderDate[0].split('-')[1]+'/'+orderDate[0].split('-')[0]+'/'+orderDate[0].split('-')[2];
              console.log("latest order == "+data.latestOrder+"... Case Date .."+data.caseDate);
            }
            else
            {
              console.log("*********page 2 not found**");
            }
          });
        }
        else
        { 
          console.log("yahi par hai " + caseNotFound);
        }
      }
    else{
      console.log(error);
    }
  callback(data);
  });
  
 
}

Scrapper.telecomDispute = function(caseType, caseNumber, caseYear, searchDate, callback) {
  var link;
  delete data.errorMsg;
  delete data.caseStatus;
  delete data.caseBrief;
  delete data.caseDate;
  delete data.latestOrder;
  delete data.caseNotFound;

  console.log('data' + data.caseStatus + data.caseBrief + data.caseDate + data.latestOrder);
 
  console.log('caseType' + caseType+ 'caseNumber' + caseNumber + 'caseYear' + caseYear, 'searchDate' + searchDate);
  var arrSearchDate = searchDate.split('/');
  var searchDateFinal = new Date(arrSearchDate[2], arrSearchDate[1], arrSearchDate[0]);
  console.log('scrapping telecom disputes');
  request.get(
  'http://www.tdsat.nic.in/orders.htm',
  function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // console.log(body)
      var $ = cheerio.load(body);
      console.log("Length:=="+$('table').length);
      /*var tesst = "Petition No.170(C) of 2014"
      var test = tesst.match(/Petition No.179(.*)2014/);
      if(test !=null){ alert(test);} else{ alert("not find string");}*/
      $('table').each(function(i, elem){
        if(i==1){
          //var link = $(this).find('tr').find('a').attr('href');
          $(this).find('tr').each(function(j,elem){
            //console.log($(this).text());
            if($(this).text() != undefined) {
              var txtRemCol = $(this).text().split('(')[1];  
            }
            
            if(txtRemCol != undefined && txtRemCol.split(')')[0] != undefined) {
              var tempDate1 = txtRemCol.split(')')[0].split('to')[0];  
            }
            if (txtRemCol != undefined && txtRemCol.split(')')[0]) {
              var tempDate2 = txtRemCol.split(')')[0].split('to')[1];  
            };
            

            //console.log("date 1 = "+date1+" ::: date2 = "+date2);
            if(tempDate1 != undefined){
              var arrStartDate = tempDate1.split("/");  
            }
            if(arrStartDate != undefined){
              var date1 = new Date(arrStartDate[2], arrStartDate[1], arrStartDate[0]);  
            }
            
            if(tempDate2 != undefined) {
              var arrEndDate = tempDate2.split("/");  
            }
            if(arrEndDate != undefined) {
              var date2 = new Date(arrEndDate[2], arrEndDate[1], arrEndDate[0]);  
            }
            

            if(+searchDateFinal >= +date1 && +searchDateFinal <= +date2){
              linkDate = $(this).find('a').attr('href');
            }
          });
          
        }    
      });


      /**** second get request starts *****/
     request.get('http://www.tdsat.nic.in/'+linkDate,
        function (err, res, html) {
          if (!err && res.statusCode == 200)
          {
            //console.log(html)
            var $ = cheerio.load(html);
            //console.log("length=="+$('table').length);
            $('table').each(function(j, elem){
              if(j==0){
                //str.indexOf(substr) != -1
                $(this).children().eq(5).children().eq(0).children().eq(0).find('tr').each(function(k,ele){
                  if(k > 0 ){
                    var brf = $(this).find('td').eq(0).text();
                    var expression_one = new RegExp(caseType,'g');
                    var expression_two = new RegExp(caseNumber,'g');
                    var expression_t = new RegExp(caseYear,'g');
                    var jj = /(.*)/;
                    var expression_three = new RegExp(expression_one.source + expression_two.source +jj.source+ expression_t.source);
                   
                   
                    
                    if(brf.indexOf(caseType+caseNumber) != -1 ){

                      //console.log(brf+ "Index of == "+brf.indexOf(cType+cNum));
                      //data.caseBrief 
                      
                      //data.latestOrder = data.caseDate;
                                          //console.log("case Brief ="+a+b);
                      var test = brf.replace(/\s{2,}/g, ' ').match(expression_three);
                      var brf = $(this).find('td').eq(0).text();
                      if(test !== null){
                        console.log(test);
                        data.caseBrief = $(this).find('td').eq(1).text();
                      //data.caseDate = 
                      data.caseDate = $(this).find('th').eq(1).text();
                   console.log("case Brief ="+data.caseBrief);
                   data.caseDate = data.caseDate.trim();
                   data.caseDate = data.caseDate.split('.')[1]+'/'+data.caseDate.split('.')[0]+'/'+data.caseDate.split('.')[2];
                   console.log("case Date ="+data.caseDate);
                      }

                      //console.log("brf =="+brf.replace(/\s{2,}/g, ' '));


                  //console.log($(this).find('.MsoNormalTable').text());
                    }
                  }

                });
               
              }
            });
          }
          else
          {
            console.log("*********page 2 not found**");
          }
        });
      /**** second get request end *****/
    }
    else{
      console.log(error);
    }
    callback(data);
  });
  
}


Scrapper.consumerDispute = function(userType, caseNumber, stateCode, stateCode_D, distCode, callback) {
  delete data.caseStatus;
  delete data.caseBrief;
  delete data.caseDate;
  delete data.latestOrder;
  delete data.IdNo;
  delete data.caseNotFound;
  delete data.errorMsg;

  console.log('scrapping national consumer disputes');
  request.get(
  'http://cms.nic.in/ncdrcusersWeb/login.do?method=caseStatus',
  function (error, response, body) {
    if (!error && response.statusCode == 200) 
    {
      //console.log(body)
      var $ = cheerio.load(body)
     var func =  $( "input[value='View History & Orders']" ).attr('onclick');
     //console.log("function name:: "+func);
     //console.log($('script').text());

     //{form:{userType:'E',state_idD:'14',dist_id:'158', fano:'CC/171/2014'}}
     // statusCodeValue
     // distCodeValue
     // caseNumberValue
     var  cidValue = stateCode+"/"+distCode+"/"+caseNumber;
     //A/2014/1234
     //{form:{method:'loadCaseStatusRep',ncdrc_id:'ncdrc',
      //stateCode:'14',distCode:'158',cid:'14/158/CC/171/2014',userType:'E' ,state_id:'14',state_idD:'14' ,dist_id:'158', fano:'CC/171/2014'}}
     request.post('http://cms.nic.in/ncdrcusersWeb/ViewProceedingCS.jsp?method=ViewProceedingCS', {form:{method:'loadCaseStatusRep',ncdrc_id:'ncdrc',
      stateCode:stateCode,distCode:distCode,cid:cidValue,userType:userType ,state_id: stateCode, state_idD: stateCode_D ,dist_id: distCode, fano: caseNumber}},
      function (err, resp, html) {
        if (!err && resp.statusCode == 200)
        {
          //console.log(body)
          var $ = cheerio.load(html)
          //console.log(html)
          //console.log($('table').length);
        
          data.caseDate = $('table').find('tr').eq(3).children().eq(1).text();
          data.caseDate = data.caseDate.split('/')[1]+'/'+data.caseDate.split('/')[0]+'/'+data.caseDate.split('/')[2];
          data.latestOrder = $('table').find('tr').eq(3).children().eq(0).text();
          data.latestOrder = data.latestOrder.split('/')[1]+'/'+data.latestOrder.split('/')[0]+'/'+data.latestOrder.split('/')[2];
          console.log("latest order date--"+$('table').find('tr').eq(3).children().eq(0));
          console.log("next hearing date--"+$('table').find('tr').eq(3).children().eq(1));
          var brf1 = $('table').find('tr').eq(1).children().eq(1).text();
          var brf2 = $('table').find('tr').eq(1).children().eq(3).text();
          data.caseBrief = brf1 +" VS "+ brf2;
          console.log(data.caseBrief);
        }
        else{
           console.log(err);
        }
      });
    }
    else
    {
      console.log(error);
    }
    callback(data);
  });
}

Scrapper.companyLawBoard = function(courtNumber, caseDateHearing, callback) {
  var pdfLink;
  delete data.pdfLink;
  delete data.caseNotFound;
  delete data.caseStatus;
  delete data.caseBrief;
  delete data.caseDate;
  delete data.latestOrder;
  delete data.IdNo;
  delete data.caseNotFound;
  delete data.errorMsg;


  console.log('data' + data.caseStatus + data.caseBrief + data.caseDate + data.latestOrder)
 
  request.get(
  'http://www.clb.nic.in/status_clb.html?value=principal_bench&id=1',
  function (error, response, body) {
    if (!error && response.statusCode == 200)
    {
      // console.log(body)
      var $ = cheerio.load(body);
      //console.log(""+$('ul.outer').children().eq(0));
      if(courtNumber === 'Court I'){
        var chck = $('ul.outer').children().eq(0).find('li.latest');
        chck.each(function(i,elem){
        //console.log($(this).text());
        if($(this).text().indexOf(caseDateHearing) != -1){
          pdfLink = $(this).find('a').attr('href');
          data.caseLink = 'http://www.clb.nic.in/'+pdfLink; 
          console.log('http://www.clb.nic.in/'+pdfLink);
        }
       });
    

      }
      else if(courtNumber === 'Court II'){
       var chck = $('ul.outer').children().eq(1).find('li.latest');
       chck.each(function(i,elem){
        //console.log($(this).text());
        if($(this).text().indexOf(caseDateHearing) != -1){
          pdfLink = $(this).find('a').attr('href');
          data.caseLink = 'http://www.clb.nic.in/'+pdfLink; 
          console.log('hello' + 'http://www.clb.nic.in/'+pdfLink);
        }
       });
      }
      else if(courtNumber === 'Court III'){
        var chck = $('ul.outer').children().eq(2).find('li.latest');
        chck.each(function(i,elem){
        //console.log($(this).text());
        if($(this).text().indexOf(caseDateHearing) != -1){
          pdfLink = $(this).find('a').attr('href');
          data.caseLink = 'http://www.clb.nic.in/'+pdfLink; 
          console.log('http://www.clb.nic.in/'+pdfLink);
        }
       });
      }   
    }
    else
    {
      console.log("Error"+error);
    }
    callback(data);
  });
}


Scrapper.competitionAppellateTribunal = function(caseType, caseNumber, year, callback) {
  delete data.caseStatus;
  delete data.caseBrief;
  delete data.caseDate;
  delete data.latestOrder;
	console.log('scrapping compettion tribunal');
  setTimeout(function(){
  	console.log('scrapping setTimeout');
    data.hearingdate = "12/12/2014";
    data.location = "";
    data.orderdate = ["1/1/2014","2/2/2014","3/3/2014"];
    data.hearingDate = "1/1/2014";
    data.comments = ["xyz vs qwerty", "hello"];
    data.status = "pending";
    callback(data);
  }, 20000);
}

Scrapper.boardOfFinance = function(caseYear, caseNumber, callback) {
  delete data.caseStatus;
  delete data.caseBrief;
  delete data.caseDate;
  delete data.latestOrder;
  delete data.caseNotFound;
  delete data.errorMsg;

  console.log('Board of finance: bifr');
  request.get('http://bifr.nic.in/asp/detail1.asp?caseno='+caseNumber+'&year='+caseYear,
  function (error, response, body) {
    if (!error && response.statusCode == 200)
    {
      var $ = cheerio.load(body);
      $('table.forumline').find('tr').eq(2).find('td').each(function(i, elem){
        if(i == 1){
          console.log("case detail="+$(this).text());
          data.caseBrief = $(this).text();
        }
        if(i == 2){
          console.log("case address="+$(this).text());
          data.caseBrief = data.caseBrief+" , "+$(this).text();
        }
        if(i == 3){
          console.log("case status="+$(this).text());
          data.caseStatus = $(this).text();
        }
        if(i == 4){
          data.latestOrder = $(this).text();
         data.latestOrder = data.latestOrder.split('/')[1]+'/'+data.latestOrder.split('/')[0]+'/'+data.latestOrder.split('/')[2];
         console.log("case order date="+data.latestOrder);
        }

      });
    }
    else
    {
      console.log("Error"+error);
    }
    callback(data);
  });
}


Scrapper.karkarDooma = function(caseType, caseNumber, year, caseId, callback) {
  delete data.caseStatus;
  delete data.caseBrief;
  delete data.caseDate;
  delete data.latestOrder;
  delete data.IdNo;
  delete data.caseNotFound;
  delete data.errorMsg;

  console.log('scrapping karkarDooma court');
  request.post( 'http://courtnic.nic.in/DDC_Karkardooma/list_details.asp',  
    { form: {case_type: caseType, case_no: caseNumber, c_year: year} },
    function (error, response, body) {
      if (!error && response.statusCode === 200) {
        var $ = cheerio.load(body);
         //console.log(body);    
          
          //  console.log($('select').children().eq(0).text());
          request.post(
            'http://courtnic.nic.in/DDC_Karkardooma/detail.asp',{ form: {IdNo: caseId} },
            function (err, res, html) {
              if (!err && res.statusCode === 200) {
               // console.log(html);
                var $ = cheerio.load(html);
                console.log('length' + $('table').children().length);
                if($('table').children().length === 0) {
                  console.log('case not found karkarDooma');
                  data.caseNotFound = 'Case Not Found'
                }
                else {
                  var next = 20;
                  var newdate = 14;
                  var pdate = $('p').children().eq(newdate).text();
                  var ndate;
                  for(var i = 1; i <= $('table').children().length; i++) {
                    newdate = newdate+next;
                    ndate = $('p').children().eq(newdate).text();
                    if( i === $('table').children().length) {
                      pdate = pdate;
                    }
                    else if(new Date(pdate) > new Date(ndate)) {
                      pdate = pdate;
                    }
                    else {
                      pdate = ndate;
                    }
                  } 
                  data.caseStatus = $('div').children().eq(0).children().eq(1). text();
                  data.id = $('table').children().eq(0).children().eq(0).children().eq(0).children().eq(1). text();
                  data.caseBrief = $('table').children().eq(0).children().eq(0).children().eq(0).children().eq(2). text() + ' ' + $('table').children().eq(0).children().eq(0).children().eq(0).children().eq(3). text() + " "  + $('table').children().eq(0).children().eq(0).children().eq(0).children().eq(4). text();
                  data.latestOrder = $('table').children().eq(0).children().eq(0).children().eq(2). text();
                  data.caseDate = pdate;
                  
                  console.log('CASEID:' + ' ' + $('table').children().eq(0).children().eq(0).children().eq(0).children().eq(1). text());
                  console.log('Case Detail:' + ' ' + $('table').children().eq(0).children().eq(0).children().eq(0).children().eq(2). text() + ' ' + $('table').children().eq(0).children().eq(0).children().eq(0).children().eq(3). text() + " "  + $('table').children().eq(0).children().eq(0).children().eq(0).children().eq(4). text());
                  console.log('caseStatus ' + $('div').children().eq(0).children().eq(1). text());
                  console.log('Last Listed On:' + ' ' + $('table').children().eq(0).children().eq(0).children().eq(2). text());
                  console.log('Next Hearing Date: ' + pdate); 
                  
                }
              }
              else  {
                console.log("*********page 2 not found**");
              }
            }
          );  
        }
      else  {
        console.log("*********page One not found**");
      }
      callback(data);
    }
  );
}

Scrapper.saket = function(caseType, caseNumber, year, caseId, callback) {
  delete data.caseStatus;
  delete data.caseBrief;
  delete data.caseDate;
  delete data.latestOrder;
  delete data.IdNo;
  delete data.caseNotFound;
  delete data.errorMsg;

  console.log('scrapping saket court');
  request.post( 'http://courtnic.nic.in/ddc_saket/list_details.asp',  
    { form: {case_type: caseType, case_no: caseNumber, c_year: year} },
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var $ = cheerio.load(body);
        console.log(caseId + 'caseid');
        //console.log($('select').children().eq(0).text());
        request.post('http://courtnic.nic.in/DDC_Saket/detail.asp',{ form: {IdNo: caseId} },
          function (err, res, html) {
            if (!err && res.statusCode == 200) {
              var $ = cheerio.load(html);
             // console.log(html);
              console.log('length' + $('table').children().length);
              if($('table').children().length === 0) {
                console.log('case not found saket');
                data.caseNotFound = 'Case Not Found'
              }
              else {
                var next = 20;
                var newdate = 14;
                var pdate = $('p').children().eq(newdate).text();
                var ndate;
                for(var i = 1; i <= $('table').children().length; i++) {
                  newdate = newdate+next;
                  ndate = $('p').children().eq(newdate).text();
                  if( i === $('table').children().length) {
                    pdate = pdate;
                  }
                  else if(new Date(pdate) > new Date(ndate)) {
                    pdate = pdate;
                  }
                  else {
                    pdate = ndate;
                  }
                }
                
                data.caseStatus = $('div').children().eq(0).children().eq(1). text();
                data.id = $('table').children().eq(0).children().eq(0).children().eq(0).children().eq(1). text();
                data.caseBrief = $('table').children().eq(0).children().eq(0).children().eq(0).children().eq(2). text() + ' ' + $('table').children().eq(0).children().eq(0).children().eq(0).children().eq(3). text() + " "  + $('table').children().eq(0).children().eq(0).children().eq(0).children().eq(4). text();
                data.latestOrder = $('table').children().eq(0).children().eq(0).children().eq(2). text();
                data.caseDate = pdate;
                
                console.log('CASEID:' + ' ' + $('table').children().eq(0).children().eq(0).children().eq(0).children().eq(1). text());
                console.log('Case Detail:' + ' ' + $('table').children().eq(0).children().eq(0).children().eq(0).children().eq(2). text() + ' ' + $('table').children().eq(0).children().eq(0).children().eq(0).children().eq(3). text() + " "  + $('table').children().eq(0).children().eq(0).children().eq(0).children().eq(4). text());
                console.log('caseStatus ' + $('div').children().eq(0).children().eq(1). text());
                console.log('Last Listed On:' + ' ' + $('table').children().eq(0).children().eq(0).children().eq(2). text());
                console.log('Next Hearing Date: ' + pdate); 
              }
            }
              
            else
            {
              console.log("*********page 2 not found**");
            }
          }
        );  
      }

      else{
        console.log("*********page One not found**");
      }
      callback(data);
    }
  );
}



