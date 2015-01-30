$(function(){

var andaman = "<option value=0>Select</option><option value=597>Andaman</option>";

var andhra = "<option value=0>Select</option> \
<option value=496>Adilabad</option> \
<option value=517>Anantapur</option> \
<option value=518>Chittoor</option> \
<option value=601>Chittoor-II at triputi</option> \
<option value=515>Cuddapah</option><option value=509>East Godavari</option><option value=605>East Godwari-II at Rajahmundry</option><option value=512>Guntur</option><option value=500>Hyderabad</option><option value=602>Hyderabad-II</option><option value=603>Hyderabad-III</option><option value=498>Karimnagar</option><option value=505>Khammam</option><option value=511>Krishna at Machiliptnam</option><option value=606>Krishna at Vijaywada</option><option value=516>Kurnool</option><option value=502>Mahbubnagar</option><option value=499>Medak</option><option value=503>Nalgonda</option><option value=514>Nellore</option><option value=497>Nizamabad</option><option value=513>Prakasam</option><option value=501>Rangareddi</option><option value=506>Srikakulam</option><option value=508>Visakhapatnam</option><option value=604>Visakhapatnam-II</option><option value=507>Vizianagaram</option><option value=504>Warangal</option><option value=510>West Godavari</option>";
 

 var arunachal = "<option value=0>Select</option><option value=617>Anjaw</option><option value=246>Changlang</option><option value=244>Dibang Valley</option><option value=237>East Kameng</option><option value=242>East Siang</option><option value=619>Kurung Kumey</option><option value=245>Lohit</option><option value=618>Lower Dibang Valley</option><option value=239>Lower Subansiri</option><option value=238>Papum Pare </option><option value=235>Tawang</option><option value=247>Tirap</option><option value=243>Upper Siang</option><option value=240>Upper Subansiri</option><option value=236>West Kameng</option><option value=241>West Siang</option>";

 var assam = "<option value=0>Select</option><option value=288>Barpeta</option><option value=287>Bongaigaon</option><option value=304>Cachar </option><option value=291>Darrang</option><option value=296>Dhemaji</option><option value=285>Dhubri</option><option value=298>Dibrugarh</option><option value=286>Goalpara</option><option value=301>Golaghat</option><option value=306>Hailakandi</option><option value=300>Jorhat</option><option value=289>Kamrup</option><option value=302>Karbi Anglong</option><option value=305>Karimganj</option><option value=284>Kokrajhar</option><option value=295>Lakhimpur</option><option value=292>Marigaon</option><option value=293>Nagaon</option><option value=290>Nalbari</option><option value=303>North Cachar Hills</option><option value=299>Sibsagar</option><option value=294>Sonitpur</option><option value=297>Tinsukia</option>";

 var bihar = "<option value=0>Select</option><option value=200>Araria</option><option value=227>Aurangabad</option><option value=216>Banka</option><option value=213>Begusarai</option><option value=215>Bhagalpur</option><option value=222>Bhojpur</option><option value=223>Buxar</option><option value=206>Darbhanga</option><option value=228>Gaya</option><option value=208>Gopalgang</option><option value=230>Jamui</option><option value=226>Jehanabad</option><option value=224>Kaimur(Bhabua)</option><option value=203>Katihar</option><option value=214>Khagaria</option><option value=201>Kishangang</option><option value=218>Lakhisarai</option><option value=204>Madhepura</option><option value=198>Madhubani</option><option value=217>Munger</option><option value=207>Muzaffarpur</option><option value=220>Nalanda</option><option value=229>Nawada</option><option value=195>Pashchim Champaran</option><option value=221>Patna</option><option value=202>Purnia </option><option value=196>Purvi champaran</option><option value=225>Rohtas</option><option value=205>Saharsa</option><option value=212>Samastipur</option><option value=210>Saran</option><option value=219>Sheikhpura</option><option value=599>Sheohar</option><option value=197>Sitamarhi</option><option value=209>Siwan</option><option value=199>Supaul</option><option value=211>Vaishali</option>";

 var chandigarh = "<option value=0>Select</option><option value=60>DF-I</option><option value=636>DF-II</option>";

 var chhattisgarh = "<option value=0>Select</option><option value=386>Baster</option><option value=378>Bilaspur</option><option value=387>Dantewada</option><option value=384>Dhamtari</option><option value=381>Durg</option><option value=377>Janjgir-Champa</option><option value=374>Jashpur</option><option value=385>Kanker</option><option value=379>Kawardha</option><option value=376>Korba</option><option value=372>Koriya</option><option value=383>Mahasamund</option><option value=375>Raigarh</option><option value=382>Raipur</option><option value=380>Rajnandgaon</option><option value=373>Surguja</option>"

 var delhi = "<option value=3>Central Delhi</option><option value=5>East Delhi</option><option value=12>New Delhi</option><option value=9>North</option><option value=10>North East</option><option value=7>North West</option><option value=6>South Delhi</option><option value=16>South II</option><option value=15>South West</option><option value=4>West  Delhi</option>";

 var daman = "<option value=0>Select</option><option value=459>Daman</option><option value=458>Diu</option>";

 var goa = "<option value=0>Select</option><option value=546>North Goa</option><option value=547>South Goa</option>";

 var gujarat = "<option value=0>Select</option><option value=632>Ahmedabad Addl</option><option value=439>Ahmedabad City</option><option value=634>Ahmedabad Rural</option><option value=445>Amreli </option><option value=447>Anand</option><option value=434>Banas Kantha</option><option value=453>Bharuch</option><option value=446>Bhavnagar</option><option value=450>Dohad</option><option value=438>Gandhinagar</option><option value=442>Jamnagar</option><option value=444>Junagadh</option><option value=433>Kachchh</option><option value=448>Kheda </option><option value=436>Mahesana</option><option value=452>Narmada</option><option value=456>Navsari</option><option value=449>Panch Mahals</option><option value=435>Patan</option><option value=443>Porbandar</option><option value=441>Rajkot</option><option value=635>Rajkot Addl</option><option value=437>Sabar kantha</option><option value=454>Surat</option><option value=631>Surat Addl</option><option value=440>Surendranagar</option><option value=455>The Dangs</option><option value=451>Vadodara</option><option value=633>Vadodra Addl</option><option value=457>Valsad</option>";

 var haryana = "<option value=0>Select</option><option value=75>Ambala</option><option value=86>Bhiwani</option><option value=92>Faridabad</option><option value=83>Fatehabad</option><option value=91>Gurgaon</option><option value=85>Hisar</option><option value=88>Jhajjar</option><option value=82>Jind</option><option value=78>Kaithal</option><option value=79>Karnal</option><option value=77>Kurukshetra</option><option value=89>Mahendragarh</option><option value=645>Mewat</option><option value=644>Palwal</option><option value=74>Panchkula</option><option value=80>Panipat</option><option value=90>Rewari</option><option value=87>Rohtak</option><option value=84>Sirsa</option><option value=81>Sonipat</option><option value=76>Yamunanagar</option>";
  
 var himachal = "<option value=0>Select</option><option value=32>Kangra</option><option value=35>Mandi</option><option value=41>Shimla</option><option value=37>Una</option>";

 var jammu = "<option value=0>Select</option><option value=19>Srinagar</option>";
            
 var jharkhand = "<option value=0>Select</option><option value=337>Bokaro</option><option value=327>Chatra</option><option value=331>Deoghar</option><option value=336>Dhanbad</option><option value=335>Dumka</option><option value=325>Garhwa</option><option value=330>Giridih</option><option value=332>Godda</option><option value=340>Gumla</option><option value=328>Hazaribag</option><option value=625>Jamtara</option><option value=329>Kodarma</option><option value=626>Latehar</option><option value=339>Lohardaga</option><option value=334>Pakaur</option><option value=326>Palamu</option><option value=341>Pashchimi Singhbhum</option><option value=600>Purbi Singhbhum</option><option value=338>Ranchi</option><option value=333>Sahibganj</option><option value=627>Sareikela</option><option value=624>Simdega</option>";

 var karnataka = "<option value=0>Select</option><option value=520>Bagalkot</option><option value=539>Bangalore 1st &amp; Rural Additional</option><option value=612>Bangalore 2nd Additional</option><option value=613>Bangalore 3rd Additional</option><option value=614>Bangalore 4th Additional</option><option value=538>Bangalore Urban</option><option value=519>Belgaum</option><option value=530>Bellary</option><option value=523>Bidar</option><option value=521>Bijapur</option><option value=545>Chamrajnagar</option><option value=535>Chikmagalur</option><option value=531>Chitradurga</option><option value=542>Dakshina Kannada</option><option value=532>Davangere</option><option value=527>Dharwad</option><option value=526>Gadag</option><option value=522>Gulbarga</option><option value=541>Hassan</option><option value=529>Haveri</option><option value=543>Kodagu</option><option value=537>Kolar</option><option value=525>Koppal</option><option value=540>Mandya</option><option value=544>Mysore</option><option value=524>Raichur</option><option value=533>Shimoga</option><option value=536>Tumkur</option><option value=534>Udupi</option><option value=528>Uttara Kannda</option><option value=653>Yadagiri</option>";

 var kerala = "<option value=0>Select</option><option value=559>Alappuzha</option><option value=556>Ernakulam</option><option value=557>Idukki</option><option value=550>Kannur</option><option value=549>Kasaragod</option><option value=561>Kollam</option><option value=558>Kottayam</option><option value=552>Kozhikode</option><option value=553>Malappuram</option><option value=554>Palakkad</option><option value=560>Pathanamthitta</option><option value=562>Thiruvananthapuram</option><option value=555>Trissur</option><option value=551>Wayanad</option>";

 var lakshadweep = "<option value=0>Select</option><option value=548>Lakshadweep</option>";

 var madhyapradesh = "<option value=0>Select</option><option value=432>Balaghat</option><option value=415>Barwani</option><option value=422>Betul</option><option value=390>Bhind</option><option value=419>Bhopal</option><option value=396>Chhatarpur</option><option value=430>Chhindwara</option><option value=399>Damoh</option><option value=392>Datia</option><option value=410>Dewas</option><option value=412>Dhar</option><option value=428>Dindori</option><option value=416>East Nimar</option><option value=394>Guna</option><option value=391>Gwalior</option><option value=423>Harda</option><option value=424>Hoshangabad</option><option value=413>Indore</option><option value=426>Jabalpur</option><option value=411>Jhabua</option><option value=425>Katni</option><option value=429>Mandla</option><option value=406>Mandsaur</option><option value=389>Morena</option><option value=427>Narsimhapur</option><option value=405>Neemuch</option><option value=397>Panna</option><option value=421>Raisen</option><option value=417>Rajgarh</option><option value=407>Ratlam</option><option value=401>Rewa</option><option value=398>Sagar</option><option value=400>Satna</option><option value=420>Sehore</option><option value=431>Seoni</option><option value=403>Shahdol</option><option value=409>Shajapur</option><option value=388>Sheopur</option><option value=393>Shivpuri</option><option value=404>Sidhi</option><option value=395>Tikamgarh</option><option value=408>Ujjain</option><option value=402>Umaria</option><option value=418>Vidisha</option><option value=414>West Nimar</option>";

 var maharastra = "<option value=0>Select</option><option value=608>Additional DCF, Mumbai(Suburban)</option><option value=609>Additional DCF, Nagpur</option><option value=610>Additional DCF, Pune</option><option value=611>Additional DCF, Thane</option><option value=486>Ahmednagar</option><option value=465>Akola</option><option value=467>Amravati</option><option value=479>Aurangabad</option><option value=487>Beed</option><option value=470>Bhandara</option><option value=464>Buldana</option><option value=483>Central Mumbai</option><option value=473>Chandrapur</option><option value=607>DCF, South Mumbai</option><option value=462>Dhule</option><option value=472>Gadchiroli</option><option value=471>Gondia</option><option value=476>Hingoli</option><option value=463>Jalgaon</option><option value=478>Jalna</option><option value=494>Kolhapur</option><option value=488>Latur</option><option value=482>Mumbai(Suburban)</option><option value=469>Nagpur</option><option value=475>Nanded</option><option value=461>Nandurbar</option><option value=480>Nashik</option><option value=489>Osmanabad</option><option value=477>Parbhani</option><option value=485>Pune</option><option value=484>Raigad</option><option value=492>Ratnagiri</option><option value=495>Sangli</option><option value=491>Satara</option><option value=493>Sindhudurg</option><option value=490>Solapur</option><option value=481>Thane</option><option value=468>Wardha</option><option value=466>Washim</option><option value=474>Yavatmal</option>";

 var manipur = "<option value=0>Select</option><option value=259>Bishnupur</option><option value=261>Imphal</option><option value=260>Thoubal</option>";

 var meghalaya = "<option value=0>Select</option><option value=278>East Garo Hills</option><option value=282>East Khasi Hills </option><option value=283>Jainita Hills</option><option value=281>Ri Bhoi</option><option value=279>South Garo Hills  </option><option value=277>West Garo Hills</option><option value=280>West Khasi Hills</option>";

 var mizoram = "<option value=0>Select</option><option value=267>Aizawl</option><option value=268>Champhai</option><option value=266>Kolasib</option><option value=271>Lawntlai</option><option value=270>Lunglei</option><option value=265>Mamit</option><option value=272>Saiha</option><option value=269>Serchhip</option>";

 var nagaland = "<option value=0>Select</option><option value=253>Dimapur</option><option value=254>Kohima</option><option value=250>Mokokchung</option><option value=248>Mon</option><option value=255>Phek</option><option value=249>Tuensang</option><option value=252>Wokha</option><option value=251>Zunheboto</option>";

 var orissa = "<option value=0>Select</option><option value=356>Anugul</option><option value=365>Balangir</option><option value=349>Baleshwar</option><option value=342>Bargarh</option><option value=363>Baudh</option><option value=350>Bhadrak</option><option value=353>Cuttak</option><option value=345>Debagarh</option><option value=355>Dhenkanal</option><option value=361>Gajapati</option><option value=360>Ganjam</option><option value=352>Jagatsinghapur</option><option value=354>Jajapur</option><option value=343>Jharsuguda</option><option value=367>Kalahandi</option><option value=362>Kandhamal</option><option value=351>Kendrapara</option><option value=347>Kendujhar</option><option value=358>Khordha</option><option value=370>Koraput</option><option value=371>Malkangiri</option><option value=348>Mayurbhanj</option><option value=369>Nabarangapur</option><option value=357>Nayagarh</option><option value=366>Nuapada</option><option value=359>Puri</option><option value=368>Rayagada</option><option value=344>Sambalpur</option><option value=364>Sonapur</option><option value=346>Sundargarh</option>";

 var pondicherry = "<option value=0>Select</option><option value=594>Pondicherry</option>";

 var punjab = "<option value=0>Select</option><option value=44>Amritsar</option><option value=648>Barnala</option><option value=56>Bhatinda</option><option value=55>Faridkot</option><option value=50>Fatehgarh Sahib</option><option value=53>Firozpur</option><option value=43>Gurdaspur</option><option value=47>Hoshiarpur</option><option value=46>Jalandhar</option><option value=45>Kapurthala</option><option value=51>Ludhiana</option><option value=57>Mansa</option><option value=52>Moga</option><option value=54>Muktsar</option><option value=48>Nawanshahr</option><option value=59>Patiala</option><option value=49>Rupnagar</option><option value=647>SAS Nagar Mohali</option><option value=58>Sangrur</option><option value=649>Tarn Taran</option>";

 var rajasthan = "<option value=0>Select</option><option value=113>Ajmer</option><option value=98>Alwar</option><option value=120>Banswara</option><option value=123>Baran</option><option value=109>Barmer</option><option value=99>Bharatpur</option><option value=116>Bhilwara</option><option value=95>Bikaner</option><option value=115>Bundi</option><option value=121>Chittaurgarh</option><option value=96>Churu</option><option value=103>Dausa</option><option value=100>Dhaulpur</option><option value=119>Dungarpur</option><option value=93>Ganganagar</option><option value=94>Hanumangarh</option><option value=628>Jaipur-I</option><option value=629>Jaipur-II</option><option value=650>Jaipur-III</option><option value=651>Jaipur-IV</option><option value=108>Jaisalmer</option><option value=110>Jalor</option><option value=124>Jhalawar</option><option value=97>Jhunjhunun</option><option value=107>Jodhpur</option><option value=652>Jodhpur-II</option><option value=101>Karauli</option><option value=122>Kota</option><option value=106>Nagaur</option><option value=112>Pali</option><option value=643>Pratapgarh</option><option value=117>Rajsamand</option><option value=102>Sawai Madhopur</option><option value=105>Sikar</option><option value=111>Sirohi</option><option value=114>Tonk</option><option value=118>Udaipur</option>";

 var sikkim = "<option value=0>Select</option><option value=234>East</option><option value=231>North</option><option value=232>West</option><option value=233>south</option>";

 var tamilnadu = "<option value=0>Select</option><option value=574>Coimbatore</option><option value=580>Cuddalore</option><option value=567>Dharmapuri</option><option value=575>Dindigul</option><option value=572>Erode</option><option value=565>Kancheepuram</option><option value=592>Kanyakumari</option><option value=576>Karur</option><option value=586>Madurai</option><option value=581>Nagapattinam</option><option value=571>Namakkal</option><option value=564>North Chennai</option><option value=578>Perambalur</option><option value=584>Pudukkottai</option><option value=589>Ramanathapuram</option><option value=570>Salem</option><option value=585>Sivaganga</option><option value=630>South Chennai</option><option value=583>Thanjavur</option><option value=573>The Nilgiris</option><option value=587>Theni</option><option value=563>Thiruvallur</option><option value=582>Thiruvarur</option><option value=590>Thoothukkudi</option><option value=577>Tiruchirapplli</option><option value=591>Tirunelveli</option><option value=568>Tiruvannamalai</option><option value=566>Vellore</option><option value=569>Viluppuram</option><option value=588>Virudhunagar</option>";

 var tripura = "<option value=0>Select</option><option value=574>Coimbatore</option><option value=580>Cuddalore</option><option value=567>Dharmapuri</option><option value=575>Dindigul</option><option value=572>Erode</option><option value=565>Kancheepuram</option><option value=592>Kanyakumari</option><option value=576>Karur</option><option value=586>Madurai</option><option value=581>Nagapattinam</option><option value=571>Namakkal</option><option value=564>North Chennai</option><option value=578>Perambalur</option><option value=584>Pudukkottai</option><option value=589>Ramanathapuram</option><option value=570>Salem</option><option value=585>Sivaganga</option><option value=630>South Chennai</option><option value=583>Thanjavur</option><option value=573>The Nilgiris</option><option value=587>Theni</option><option value=563>Thiruvallur</option><option value=582>Thiruvarur</option><option value=590>Thoothukkudi</option><option value=577>Tiruchirapplli</option><option value=591>Tirunelveli</option><option value=568>Tiruvannamalai</option><option value=566>Vellore</option><option value=569>Viluppuram</option><option value=588>Virudhunagar</option>";

 var uttarpradesh = "<option value=0>Select</option><option value=139>Agra-I</option><option value=639>Agra-II</option><option value=136>Aligarh</option><option value=169>Allahabad</option><option value=172>Ambedkar Nagar</option><option value=156>Auraiya</option><option value=185>Azamgarh</option><option value=132>Baghpat</option><option value=174>Bahraich</option><option value=187>Ballia</option><option value=176>Balrampur</option><option value=164>Banda</option><option value=170>Barabanki</option><option value=144>Bareilly-I</option><option value=640>Bareilly-II</option><option value=179>Basti</option><option value=127>Bijnor</option><option value=143>Budaun</option><option value=135>Bulandshahr</option><option value=190>Chanduali</option><option value=165>Chitrakoot</option><option value=184>Deoria</option><option value=141>Etah</option><option value=155>Etawah</option><option value=171>Faizabad</option><option value=153>Farrukhabad</option><option value=166>Fatehpur</option><option value=140>Firozabad</option><option value=134>Gautam Buddha Nagar</option><option value=133>Ghaziabad</option><option value=189>Ghazipur</option><option value=177>Gonda</option><option value=182>Gorakhpur</option><option value=162>Hamirpur</option><option value=149>Hardoi</option><option value=137>Hathras</option><option value=159>Jalaun</option><option value=188>Jaunpur</option><option value=160>Jhansi</option><option value=130>Jyotiba Phule Nagar</option><option value=154>Kannauj</option><option value=157>Kanpur Dehat</option><option value=158>Kanpur Nagar</option><option value=646>Kanshiram Nagar</option><option value=168>Kaushambi</option><option value=183>Kushinagar</option><option value=147>Lakhimpur Khiri</option><option value=161>Lalitpur</option><option value=151>Lucknow-I</option><option value=641>Lucknow-II</option><option value=181>Maharajganj</option><option value=163>Mahoba</option><option value=142>Mainpuri</option><option value=138>Mathura</option><option value=186>Mau</option><option value=131>Meerut</option><option value=193>Mirzapur</option><option value=128>Muradabad-I</option><option value=642>Muradabad-II</option><option value=126>Muzaffarnagar</option><option value=145>Pilibhit</option><option value=167>Pratapgarh</option><option value=152>Rae Bareli</option><option value=129>Rampur</option><option value=125>Saharanpur</option><option value=180>Sant Kabir Nagar</option><option value=192>Sant Ravidas Nagar</option><option value=146>Shahjahanpur</option><option value=175>Shrawasti</option><option value=178>Siddharthnagar</option><option value=148>Sitapur</option><option value=194>Sonbhadra</option><option value=173>Sultanpur</option><option value=150>Unnao</option><option value=191>Varanasi</option>";

 var uttaranchal = "<option value=0>Select</option><option value=69>Almora</option><option value=68>Bageshwar</option><option value=62>Chamoli</option><option value=70>Champawat</option><option value=65>Dehradun</option><option value=66>Garhwal</option><option value=73>Hardwar</option><option value=71>Nainital</option><option value=67>Pithoragarh</option><option value=63>Rudraprayag</option><option value=64>Tehri Garhwal</option><option value=72>Udham Singh Nagar</option><option value=61>Uttarkashi</option>";

 var westbengal = "<option value=0>Select</option><option value=319>Bankura</option><option value=314>Birbhum</option><option value=315>Burdwan</option><option value=309>Cooch Behar</option><option value=311>Dakshin Dinajpur</option><option value=307>Darjiling</option><option value=322>Howrah</option><option value=318>Hugali</option><option value=308>Jalpaiguri</option><option value=622>Jalpaiguri DF (CB), Alipurduar</option><option value=323>Kolkata-I</option><option value=623>Kolkata-II</option><option value=312>Maldah</option><option value=313>Murshidabad</option><option value=316>Nadia</option><option value=317>North 24 Parganas DF, Barasat</option><option value=321>Paschim Midnapore</option><option value=620>Purba Midnapur</option><option value=320>Puruliya</option><option value=621>Siliguri</option><option value=324>South 24 Parganas DF, Alipore</option><option value=310>Uttar Dinajpur</option>";

           
          
//If parent option is changed
$("#national-consumer-disputes-state-with-district").change(function() {
        var parent = $(this).val(); //get option value from parent   
        switch(parent){ //using switch compare selected option and populate child
              case '7':
                list(andaman);
                break;
              case '16':
                list(andhra);
                break;
              case '25':
                list(arunachal);
                break;
              case '5':
                list(assam);
                break;
              case '1':
                list(bihar);
                break;
              case '6':
                list(chandigarh);
                break;
              case '23':
                list(chhattisgarh);
                break;
              case '31':
                list(daman);
                break;
              case '8':
                list(delhi);
                break;
              case '33':
                list(goa);
                break;
              case '20':
                list(gujarat);
                break;
              case '9':
                list(haryana);
                break;
              case '10':
                list(himachal);
                break;
              case '11':
                list(jammu);
                break;
              case '2':
                list(jharkhand);
                break;
              case '18':
                list(karnataka);
                break;
              case '17':
                list(kerala);
                break;
              case '34':
                list(lakshadweep);
                break;
              case '22':
                list(madhyapradesh);
                break;
              case '21':
                list(maharastra);
                break;
              case '28':
                list(manipur);
                break;
              case '30':
                list(meghalaya);
                break;
              case '27':
                list(mizoram);
                break;
              case '26':
                list(nagaland);
                break;
              case '3':
                list(orissa);
                break;
              case '35':
                list(pondicherry);
                break;
              case '12':
                list(punjab);
                break;
              case '13':
                list(rajasthan);
                break;
              case '24':
                list(sikkim);
                break;
              case '19':
                list(tamilnadu);
                break;
              case '29':
                list(tripura);
                break;
              case '14':
                list(uttarpradesh);
                break;
              case '15':
                list(uttaranchal);
                break;
              case '4':
                list(westbengal);
                break;

            default: //default child option is blank
                $("#national-consumer-disputes-district").html('');  
                break;
           }
});

//function to populate child select box
function list(array_list)
{
  $("#national-consumer-disputes-district").html(""); //reset child options
    $("#national-consumer-disputes-district").append(array_list);
}

});

