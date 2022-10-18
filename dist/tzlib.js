/*!
 *  @preserve
 *
 * ++++++++++++++++++++++++++++++++++++++
 * Add to Calendar TimeZones iCal Library
 * ++++++++++++++++++++++++++++++++++++++
 *
 * Version: 1.4.1
 * Creator: Jens Kuerschner (https://jenskuerschner.de)
 * Project: https://github.com/add2cal/timezones-ical-library
 * License: Apache-2.0
 *
 */
const tzlibVersion = '1.4.1';
const tzlibZonesDB = {"Africa":{"Abidjan":["",0],"Accra":["Africa/Abidjan",0],"Addis_Ababa":["Africa/Nairobi",1],"Algiers":["",2],"Asmara":["Africa/Nairobi",1],"Asmera":["Africa/Nairobi",1],"Bamako":["Africa/Abidjan",0],"Bangui":["Africa/Lagos",3],"Banjul":["Africa/Abidjan",0],"Bissau":["",0],"Blantyre":["Africa/Maputo",4],"Brazzaville":["Africa/Lagos",3],"Bujumbura":["Africa/Maputo",4],"Cairo":["",5],"Casablanca":["",6],"Ceuta":["",7],"Conakry":["Africa/Abidjan",0],"Dakar":["Africa/Abidjan",0],"Dar_es_Salaam":["Africa/Nairobi",1],"Djibouti":["Africa/Nairobi",1],"Douala":["Africa/Lagos",3],"El_Aaiun":["",6],"Freetown":["Africa/Abidjan",0],"Gaborone":["Africa/Maputo",4],"Harare":["Africa/Maputo",4],"Johannesburg":["",8],"Juba":["",4],"Kampala":["Africa/Nairobi",1],"Khartoum":["",4],"Kigali":["Africa/Maputo",4],"Kinshasa":["Africa/Lagos",3],"Lagos":["",3],"Libreville":["Africa/Lagos",3],"Lome":["Africa/Abidjan",0],"Luanda":["Africa/Lagos",3],"Lubumbashi":["Africa/Maputo",4],"Lusaka":["Africa/Maputo",4],"Malabo":["Africa/Lagos",3],"Maputo":["",4],"Maseru":["Africa/Johannesburg",8],"Mbabane":["Africa/Johannesburg",8],"Mogadishu":["Africa/Nairobi",1],"Monrovia":["",0],"Nairobi":["",1],"Ndjamena":["",3],"Niamey":["Africa/Lagos",3],"Nouakchott":["Africa/Abidjan",0],"Ouagadougou":["Africa/Abidjan",0],"Porto-Novo":["Africa/Lagos",3],"Sao_Tome":["",0],"Timbuktu":["Africa/Abidjan",0],"Tripoli":["",5],"Tunis":["",2],"Windhoek":["",4]},"America":{"Adak":["",9],"Anchorage":["",10],"Anguilla":["America/Puerto_Rico",11],"Antigua":["America/Puerto_Rico",11],"Araguaina":["",12],"Argentina":{"Buenos_Aires":["",12],"Catamarca":["",12],"ComodRivadavia":["America/Argentina/Catamarca",12],"Cordoba":["",12],"Jujuy":["",12],"La_Rioja":["",12],"Mendoza":["",12],"Rio_Gallegos":["",12],"Salta":["",12],"San_Juan":["",12],"San_Luis":["",12],"Tucuman":["",12],"Ushuaia":["",12]},"Aruba":["America/Puerto_Rico",11],"Asuncion":["",13],"Atikokan":["America/Panama",14],"Atka":["America/Adak",9],"Bahia_Banderas":["",15],"Bahia":["",12],"Barbados":["",11],"Belem":["",12],"Belize":["",16],"Blanc-Sablon":["America/Puerto_Rico",11],"Boa_Vista":["",17],"Bogota":["",18],"Boise":["",19],"Buenos_Aires":["America/Argentina/Buenos_Aires",12],"Cambridge_Bay":["",19],"Campo_Grande":["",17],"Cancun":["",14],"Caracas":["",17],"Catamarca":["America/Argentina/Catamarca",12],"Cayenne":["",12],"Cayman":["America/Panama",14],"Chicago":["",20],"Chihuahua":["",21],"Coral_Harbour":["America/Panama",14],"Cordoba":["America/Argentina/Cordoba",12],"Costa_Rica":["",16],"Creston":["America/Phoenix",22],"Cuiaba":["",17],"Curacao":["America/Puerto_Rico",11],"Danmarkshavn":["",0],"Dawson_Creek":["",22],"Dawson":["",22],"Denver":["",19],"Detroit":["",23],"Dominica":["America/Puerto_Rico",11],"Edmonton":["",19],"Eirunepe":["",18],"El_Salvador":["",16],"Ensenada":["America/Tijuana",24],"Fort_Nelson":["",22],"Fort_Wayne":["America/Indiana/Indianapolis",23],"Fortaleza":["",12],"Glace_Bay":["",25],"Godthab":["America/Nuuk",26],"Goose_Bay":["",27],"Grand_Turk":["",28],"Grenada":["America/Puerto_Rico",11],"Guadeloupe":["America/Puerto_Rico",11],"Guatemala":["",16],"Guayaquil":["",18],"Guyana":["",17],"Halifax":["",25],"Havana":["",29],"Hermosillo":["",22],"Indiana":{"Indianapolis":["",23],"Knox":["",20],"Marengo":["",23],"Petersburg":["",23],"Tell_City":["",20],"Vevay":["",23],"Vincennes":["",23],"Winamac":["",28]},"Indianapolis":["America/Indiana/Indianapolis",23],"Inuvik":["",19],"Iqaluit":["",23],"Jamaica":["",14],"Jujuy":["America/Argentina/Jujuy",12],"Juneau":["",10],"Kentucky":{"Louisville":["",23],"Monticello":["",23]},"Knox_IN":["America/Indiana/Knox",20],"Kralendijk":["America/Puerto_Rico",11],"La_Paz":["",17],"Lima":["",18],"Los_Angeles":["",24],"Louisville":["America/Kentucky/Louisville",23],"Lower_Princes":["America/Puerto_Rico",11],"Maceio":["",12],"Managua":["",16],"Manaus":["",17],"Marigot":["America/Puerto_Rico",11],"Martinique":["",11],"Matamoros":["",20],"Mazatlan":["",21],"Mendoza":["America/Argentina/Mendoza",12],"Menominee":["",20],"Merida":["",30],"Metlakatla":["",10],"Mexico_City":["",30],"Miquelon":["",31],"Moncton":["",25],"Monterrey":["",30],"Montevideo":["",12],"Montreal":["America/Toronto",23],"Montserrat":["America/Puerto_Rico",11],"Nassau":["America/Toronto",23],"New_York":["",23],"Nipigon":["",23],"Nome":["",10],"Noronha":["",32],"North_Dakota":{"Beulah":["",20],"Center":["",20],"New_Salem":["",20]},"Nuuk":["",26],"Ojinaga":["",19],"Panama":["",14],"Pangnirtung":["",23],"Paramaribo":["",12],"Phoenix":["",22],"Port_of_Spain":["America/Puerto_Rico",11],"Port-au-Prince":["",23],"Porto_Acre":["America/Rio_Branco",18],"Porto_Velho":["",17],"Puerto_Rico":["",11],"Punta_Arenas":["",12],"Rainy_River":["",20],"Rankin_Inlet":["",20],"Recife":["",12],"Regina":["",16],"Resolute":["",33],"Rio_Branco":["",18],"Rosario":["America/Argentina/Cordoba",12],"Santa_Isabel":["America/Tijuana",24],"Santarem":["",12],"Santiago":["",34],"Santo_Domingo":["",11],"Sao_Paulo":["",12],"Scoresbysund":["",35],"Shiprock":["America/Denver",19],"Sitka":["",10],"St_Barthelemy":["America/Puerto_Rico",11],"St_Johns":["",36],"St_Kitts":["America/Puerto_Rico",11],"St_Lucia":["America/Puerto_Rico",11],"St_Thomas":["America/Puerto_Rico",11],"St_Vincent":["America/Puerto_Rico",11],"Swift_Current":["",16],"Tegucigalpa":["",16],"Thule":["",25],"Thunder_Bay":["",23],"Tijuana":["",24],"Toronto":["",23],"Tortola":["America/Puerto_Rico",11],"Vancouver":["",24],"Virgin":["America/Puerto_Rico",11],"Whitehorse":["",22],"Winnipeg":["",20],"Yakutat":["",10],"Yellowknife":["",19]},"Antarctica":{"Casey":["",37],"Davis":["",38],"DumontDUrville":["Pacific/Port_Moresby",39],"Macquarie":["",40],"Mawson":["",41],"McMurdo":["Pacific/Auckland",42],"Palmer":["",12],"Rothera":["",12],"South_Pole":["Pacific/Auckland",42],"Syowa":["Asia/Riyadh",43],"Troll":["",44],"Vostok":["Asia/Urumqi",45]},"Arctic":{"Longyearbyen":["Europe/Berlin",7]},"Asia":{"Aden":["Asia/Riyadh",43],"Almaty":["",45],"Amman":["",43],"Anadyr":["",46],"Aqtau":["",41],"Aqtobe":["",41],"Ashgabat":["",41],"Ashkhabad":["Asia/Ashgabat",41],"Atyrau":["",41],"Baghdad":["",43],"Bahrain":["Asia/Qatar",43],"Baku":["",47],"Bangkok":["",38],"Barnaul":["",38],"Beirut":["",48],"Bishkek":["",45],"Brunei":["Asia/Kuching",49],"Calcutta":["Asia/Kolkata",50],"Chita":["",51],"Choibalsan":["",49],"Chongqing":["Asia/Shanghai",52],"Chungking":["Asia/Shanghai",52],"Colombo":["",53],"Dacca":["Asia/Dhaka",45],"Damascus":["",43],"Dhaka":["",45],"Dili":["",51],"Dubai":["",47],"Dushanbe":["",41],"Famagusta":["",54],"Gaza":["",55],"Harbin":["Asia/Shanghai",52],"Hebron":["",55],"Ho_Chi_Minh":["",38],"Hong_Kong":["",56],"Hovd":["",38],"Irkutsk":["",49],"Istanbul":["Europe/Istanbul",43],"Jakarta":["",57],"Jayapura":["",58],"Jerusalem":["",59],"Kabul":["",60],"Kamchatka":["",46],"Karachi":["",61],"Kashgar":["Asia/Urumqi",45],"Kathmandu":["",62],"Katmandu":["Asia/Kathmandu",62],"Khandyga":["",51],"Kolkata":["",50],"Krasnoyarsk":["",38],"Kuala_Lumpur":["Asia/Singapore",49],"Kuching":["",49],"Kuwait":["Asia/Riyadh",43],"Macao":["Asia/Macau",52],"Macau":["",52],"Magadan":["",37],"Makassar":["",63],"Manila":["",64],"Muscat":["Asia/Dubai",47],"Nicosia":["",65],"Novokuznetsk":["",38],"Novosibirsk":["",38],"Omsk":["",45],"Oral":["",41],"Phnom_Penh":["Asia/Bangkok",38],"Pontianak":["",57],"Pyongyang":["",66],"Qatar":["",43],"Qostanay":["",45],"Qyzylorda":["",41],"Rangoon":["Asia/Yangon",67],"Riyadh":["",43],"Saigon":["Asia/Ho_Chi_Minh",38],"Sakhalin":["",37],"Samarkand":["",41],"Seoul":["",66],"Shanghai":["",52],"Singapore":["",49],"Srednekolymsk":["",37],"Taipei":["",52],"Tashkent":["",41],"Tbilisi":["",47],"Tehran":["",68],"Tel_Aviv":["Asia/Jerusalem",59],"Thimbu":["Asia/Thimphu",45],"Thimphu":["",45],"Tokyo":["",69],"Tomsk":["",38],"Ujung_Pandang":["Asia/Makassar",63],"Ulaanbaatar":["",49],"Ulan_Bator":["Asia/Ulaanbaatar",49],"Urumqi":["",45],"Ust-Nera":["",39],"Vientiane":["Asia/Bangkok",38],"Vladivostok":["",39],"Yakutsk":["",51],"Yangon":["",67],"Yekaterinburg":["",41],"Yerevan":["",47]},"Atlantic":{"Azores":["",35],"Bermuda":["",25],"Canary":["",70],"Cape_Verde":["",71],"Faeroe":["Atlantic/Faroe",70],"Faroe":["",70],"Jan_Mayen":["Europe/Berlin",7],"Madeira":["",70],"Reykjavik":["Africa/Abidjan",0],"South_Georgia":["",32],"St_Helena":["Africa/Abidjan",0],"Stanley":["",12]},"Australia":{"ACT":["Australia/Sydney",40],"Adelaide":["",72],"Brisbane":["",73],"Broken_Hill":["",72],"Canberra":["Australia/Sydney",40],"Currie":["Australia/Hobart",74],"Darwin":["",75],"Eucla":["",76],"Hobart":["",74],"LHI":["Australia/Lord_Howe",77],"Lindeman":["",73],"Lord_Howe":["",77],"Melbourne":["",40],"North":["Australia/Darwin",75],"NSW":["Australia/Sydney",40],"Perth":["",78],"Queensland":["Australia/Brisbane",73],"South":["Australia/Adelaide",72],"Sydney":["",40],"Tasmania":["Australia/Hobart",74],"Victoria":["Australia/Melbourne",40],"West":["Australia/Perth",78],"Yancowinna":["Australia/Broken_Hill",72]},"Brazil":{"Acre":["America/Rio_Branco",18],"DeNoronha":["America/Noronha",32],"East":["America/Sao_Paulo",12],"West":["America/Manaus",17]},"Canada":{"Atlantic":["America/Halifax",25],"Central":["America/Winnipeg",20],"Eastern":["America/Toronto",23],"Mountain":["America/Edmonton",19],"Newfoundland":["America/St_Johns",36],"Pacific":["America/Vancouver",24],"Saskatchewan":["America/Regina",16],"Yukon":["America/Whitehorse",22]},"CET":["",7],"Chile":{"Continental":["America/Santiago",34],"EasterIsland":["Pacific/Easter",79]},"CST6CDT":["",20],"Cuba":["America/Havana",29],"EET":["",54],"Egypt":["Africa/Cairo",5],"Eire":["Europe/Dublin",80],"EST":["",14],"EST5EDT":["",23],"Etc":{"GMT-0":["Etc/GMT",0],"GMT-1":["",6],"GMT-10":["",39],"GMT-11":["",37],"GMT-12":["",46],"GMT-13":["",81],"GMT-14":["",82],"GMT-2":["",83],"GMT-3":["",43],"GMT-4":["",47],"GMT-5":["",41],"GMT-6":["",45],"GMT-7":["",38],"GMT-8":["",49],"GMT-9":["",51],"GMT":["",0],"GMT+0":["Etc/GMT",0],"GMT+1":["",71],"GMT+10":["",84],"GMT+11":["",85],"GMT+12":["",86],"GMT+2":["",32],"GMT+3":["",12],"GMT+4":["",17],"GMT+5":["",18],"GMT+6":["",87],"GMT+7":["",88],"GMT+8":["",89],"GMT+9":["",90],"GMT0":["Etc/GMT",0],"Greenwich":["Etc/GMT",0],"UCT":["Etc/UTC",91],"Universal":["Etc/UTC",91],"UTC":["",91],"Zulu":["Etc/UTC",91]},"Europe":{"Amsterdam":["Europe/Brussels",7],"Andorra":["",7],"Astrakhan":["",47],"Athens":["",54],"Belfast":["Europe/London",92],"Belgrade":["",7],"Berlin":["",7],"Bratislava":["Europe/Prague",7],"Brussels":["",7],"Bucharest":["",54],"Budapest":["",7],"Busingen":["Europe/Zurich",7],"Chisinau":["",93],"Copenhagen":["Europe/Berlin",7],"Dublin":["",80],"Gibraltar":["",7],"Guernsey":["Europe/London",92],"Helsinki":["",54],"Isle_of_Man":["Europe/London",92],"Istanbul":["",43],"Jersey":["Europe/London",92],"Kaliningrad":["",5],"Kiev":["Europe/Kyiv",65],"Kirov":["",43],"Kyiv":["",65],"Lisbon":["",94],"Ljubljana":["Europe/Belgrade",7],"London":["",92],"Luxembourg":["Europe/Brussels",7],"Madrid":["",7],"Malta":["",7],"Mariehamn":["Europe/Helsinki",54],"Minsk":["",43],"Monaco":["Europe/Paris",7],"Moscow":["",95],"Nicosia":["Asia/Nicosia",65],"Oslo":["Europe/Berlin",7],"Paris":["",7],"Podgorica":["Europe/Belgrade",7],"Prague":["",7],"Riga":["",54],"Rome":["",7],"Samara":["",47],"San_Marino":["Europe/Rome",7],"Sarajevo":["Europe/Belgrade",7],"Saratov":["",47],"Simferopol":["",95],"Skopje":["Europe/Belgrade",7],"Sofia":["",54],"Stockholm":["Europe/Berlin",7],"Tallinn":["",54],"Tirane":["",7],"Tiraspol":["Europe/Chisinau",93],"Ulyanovsk":["",47],"Uzhgorod":["Europe/Kyiv",65],"Vaduz":["Europe/Zurich",7],"Vatican":["Europe/Rome",7],"Vienna":["",7],"Vilnius":["",54],"Volgograd":["",43],"Warsaw":["",7],"Zagreb":["Europe/Belgrade",7],"Zaporozhye":["Europe/Kyiv",65],"Zurich":["",7]},"GB-Eire":["Europe/London",92],"GB":["Europe/London",92],"GMT-0":["Etc/GMT",0],"GMT":["Etc/GMT",0],"GMT+0":["Etc/GMT",0],"GMT0":["Etc/GMT",0],"Greenwich":["Etc/GMT",0],"Hongkong":["Asia/Hong_Kong",56],"HST":["",96],"Iceland":["Africa/Abidjan",0],"Indian":{"Antananarivo":["Africa/Nairobi",1],"Chagos":["",45],"Christmas":["Asia/Bangkok",38],"Cocos":["Asia/Yangon",67],"Comoro":["Africa/Nairobi",1],"Kerguelen":["Indian/Maldives",41],"Mahe":["Asia/Dubai",47],"Maldives":["",41],"Mauritius":["",47],"Mayotte":["Africa/Nairobi",1],"Reunion":["Asia/Dubai",47]},"Iran":["Asia/Tehran",68],"Israel":["Asia/Jerusalem",59],"Jamaica":["America/Jamaica",14],"Japan":["Asia/Tokyo",69],"Kwajalein":["Pacific/Kwajalein",46],"Libya":["Africa/Tripoli",5],"MET":["",97],"Mexico":{"BajaNorte":["America/Tijuana",24],"BajaSur":["America/Mazatlan",21],"General":["America/Mexico_City",30]},"MST":["",22],"MST7MDT":["",19],"Navajo":["America/Denver",19],"NZ-CHAT":["Pacific/Chatham",98],"NZ":["Pacific/Auckland",42],"Pacific":{"Apia":["",81],"Auckland":["",42],"Bougainville":["",37],"Chatham":["",98],"Chuuk":["Pacific/Port_Moresby",39],"Easter":["",79],"Efate":["",37],"Enderbury":["Pacific/Kanton",81],"Fakaofo":["",81],"Fiji":["",99],"Funafuti":["Pacific/Tarawa",46],"Galapagos":["",87],"Gambier":["",90],"Guadalcanal":["",37],"Guam":["",100],"Honolulu":["",96],"Johnston":["Pacific/Honolulu",96],"Kanton":["",81],"Kiritimati":["",82],"Kosrae":["",37],"Kwajalein":["",46],"Majuro":["Pacific/Tarawa",46],"Marquesas":["",101],"Midway":["Pacific/Pago_Pago",102],"Nauru":["",46],"Niue":["",85],"Norfolk":["",103],"Noumea":["",37],"Pago_Pago":["",102],"Palau":["",51],"Pitcairn":["",89],"Pohnpei":["Pacific/Guadalcanal",37],"Ponape":["Pacific/Guadalcanal",37],"Port_Moresby":["",39],"Rarotonga":["",84],"Saipan":["Pacific/Guam",100],"Samoa":["Pacific/Pago_Pago",102],"Tahiti":["",84],"Tarawa":["",46],"Tongatapu":["",81],"Truk":["Pacific/Port_Moresby",39],"Wake":["Pacific/Tarawa",46],"Wallis":["Pacific/Tarawa",46],"Yap":["Pacific/Port_Moresby",39]},"Poland":["Europe/Warsaw",7],"Portugal":["Europe/Lisbon",94],"PRC":["Asia/Shanghai",52],"PST8PDT":["",24],"ROC":["Asia/Taipei",52],"ROK":["Asia/Seoul",66],"Singapore":["Asia/Singapore",49],"Turkey":["Europe/Istanbul",43],"UCT":["Etc/UTC",91],"Universal":["Etc/UTC",91],"US":{"Alaska":["America/Anchorage",10],"Aleutian":["America/Adak",9],"Arizona":["America/Phoenix",22],"Central":["America/Chicago",20],"East-Indiana":["America/Indiana/Indianapolis",23],"Eastern":["America/New_York",23],"Hawaii":["Pacific/Honolulu",96],"Indiana-Starke":["America/Indiana/Knox",20],"Michigan":["America/Detroit",23],"Mountain":["America/Denver",19],"Pacific":["America/Los_Angeles",24],"Samoa":["Pacific/Pago_Pago",102]},"UTC":["Etc/UTC",91],"W-SU":["Europe/Moscow",95],"WET":["",70],"Zulu":["Etc/UTC",91]};const tzlibZonesDetailsDB = ["20221015T115821Z<n><bs><n><tz>GMT<n><of>+0000<n><ot>+0000<n><s>19700101T000000<n><es><n>","20221015T115821Z<n><bs><n><tz>EAT<n><of>+0300<n><ot>+0300<n><s>19700101T000000<n><es><n>","20221015T115821Z<n><bs><n><tz>CET<n><of>+0100<n><ot>+0100<n><s>19700101T000000<n><es><n>","20221015T115821Z<n><bs><n><tz>WAT<n><of>+0100<n><ot>+0100<n><s>19700101T000000<n><es><n>","20221015T115821Z<n><bs><n><tz>CAT<n><of>+0200<n><ot>+0200<n><s>19700101T000000<n><es><n>","20221015T115821Z<n><bs><n><tz>EET<n><of>+0200<n><ot>+0200<n><s>19700101T000000<n><es><n>","20221015T115821Z<n><bs><n><tz>+01<n><of>+0100<n><ot>+0100<n><s>19700101T000000<n><es><n>","20221015T115821Z<n><bd><n><tz>CEST<n><of>+0100<n><ot>+0200<n><s>19700329T020000<n><r>FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU<n><ed><n><bs><n><tz>CET<n><of>+0200<n><ot>+0100<n><s>19701025T030000<n><r>FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU<n><es><n>","20221015T115821Z<n><bs><n><tz>SAST<n><of>+0200<n><ot>+0200<n><s>19700101T000000<n><es><n>","20221015T115821Z<n><bd><n><tz>HDT<n><of>-1000<n><ot>-0900<n><s>19700308T020000<n><r>FREQ=YEARLY;BYMONTH=3;BYDAY=2SU<n><ed><n><bs><n><tz>HST<n><of>-0900<n><ot>-1000<n><s>19701101T020000<n><r>FREQ=YEARLY;BYMONTH=11;BYDAY=1SU<n><es><n>","20221015T115821Z<n><bd><n><tz>AKDT<n><of>-0900<n><ot>-0800<n><s>19700308T020000<n><r>FREQ=YEARLY;BYMONTH=3;BYDAY=2SU<n><ed><n><bs><n><tz>AKST<n><of>-0800<n><ot>-0900<n><s>19701101T020000<n><r>FREQ=YEARLY;BYMONTH=11;BYDAY=1SU<n><es><n>","20221015T115821Z<n><bs><n><tz>AST<n><of>-0400<n><ot>-0400<n><s>19700101T000000<n><es><n>","20221015T115821Z<n><bs><n><tz>-03<n><of>-0300<n><ot>-0300<n><s>19700101T000000<n><es><n>","20221015T115821Z<n><bd><n><tz>-03<n><of>-0400<n><ot>-0300<n><s>19701004T000000<n><r>FREQ=YEARLY;BYMONTH=10;BYDAY=1SU<n><ed><n><bs><n><tz>-04<n><of>-0300<n><ot>-0400<n><s>19700322T000000<n><r>FREQ=YEARLY;BYMONTH=3;BYDAY=4SU<n><es><n>","20221015T115821Z<n><bs><n><tz>EST<n><of>-0500<n><ot>-0500<n><s>19700101T000000<n><es><n>","20221015T115821Z<n><bs><n><tz>CST<n><of>-0500<n><ot>-0600<n><s>19701025T020000<n><r>FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU<n><es><n><bd><n><tz>CDT<n><of>-0600<n><ot>-0500<n><s>19700405T020000<n><r>FREQ=YEARLY;BYMONTH=4;BYDAY=1SU<n><ed><n>","20221015T115821Z<n><bs><n><tz>CST<n><of>-0600<n><ot>-0600<n><s>19700101T000000<n><es><n>","20221015T115821Z<n><bs><n><tz>-04<n><of>-0400<n><ot>-0400<n><s>19700101T000000<n><es><n>","20221015T115821Z<n><bs><n><tz>-05<n><of>-0500<n><ot>-0500<n><s>19700101T000000<n><es><n>","20221015T115821Z<n><bd><n><tz>MDT<n><of>-0700<n><ot>-0600<n><s>19700308T020000<n><r>FREQ=YEARLY;BYMONTH=3;BYDAY=2SU<n><ed><n><bs><n><tz>MST<n><of>-0600<n><ot>-0700<n><s>19701101T020000<n><r>FREQ=YEARLY;BYMONTH=11;BYDAY=1SU<n><es><n>","20221015T115821Z<n><bd><n><tz>CDT<n><of>-0600<n><ot>-0500<n><s>19700308T020000<n><r>FREQ=YEARLY;BYMONTH=3;BYDAY=2SU<n><ed><n><bs><n><tz>CST<n><of>-0500<n><ot>-0600<n><s>19701101T020000<n><r>FREQ=YEARLY;BYMONTH=11;BYDAY=1SU<n><es><n>","20221015T115821Z<n><bd><n><tz>MDT<n><of>-0700<n><ot>-0600<n><s>19700405T020000<n><r>FREQ=YEARLY;BYMONTH=4;BYDAY=1SU<n><ed><n><bs><n><tz>MST<n><of>-0600<n><ot>-0700<n><s>19701025T020000<n><r>FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU<n><es><n>","20221015T115821Z<n><bs><n><tz>MST<n><of>-0700<n><ot>-0700<n><s>19700101T000000<n><es><n>","20221015T115821Z<n><bd><n><tz>EDT<n><of>-0500<n><ot>-0400<n><s>19700308T020000<n><r>FREQ=YEARLY;BYMONTH=3;BYDAY=2SU<n><ed><n><bs><n><tz>EST<n><of>-0400<n><ot>-0500<n><s>19701101T020000<n><r>FREQ=YEARLY;BYMONTH=11;BYDAY=1SU<n><es><n>","20221015T115821Z<n><bd><n><tz>PDT<n><of>-0800<n><ot>-0700<n><s>19700308T020000<n><r>FREQ=YEARLY;BYMONTH=3;BYDAY=2SU<n><ed><n><bs><n><tz>PST<n><of>-0700<n><ot>-0800<n><s>19701101T020000<n><r>FREQ=YEARLY;BYMONTH=11;BYDAY=1SU<n><es><n>","20221015T115821Z<n><bd><n><tz>ADT<n><of>-0400<n><ot>-0300<n><s>19700308T020000<n><r>FREQ=YEARLY;BYMONTH=3;BYDAY=2SU<n><ed><n><bs><n><tz>AST<n><of>-0300<n><ot>-0400<n><s>19701101T020000<n><r>FREQ=YEARLY;BYMONTH=11;BYDAY=1SU<n><es><n>","20221015T115821Z<n><bd><n><tz>-02<n><of>-0300<n><ot>-0200<n><s>19700328T220000<n><r>FREQ=YEARLY;BYMONTH=3;BYDAY=-1SA<n><ed><n><bs><n><tz>-03<n><of>-0200<n><ot>-0300<n><s>19701024T230000<n><r>FREQ=YEARLY;BYMONTH=10;BYDAY=-1SA<n><es><n>","20221015T115821Z<n><bs><n><tz>AST<n><of>-0300<n><ot>-0400<n><s>19701101T020000<n><r>FREQ=YEARLY;BYMONTH=11;BYDAY=1SU<n><es><n><bd><n><tz>ADT<n><of>-0400<n><ot>-0300<n><s>19700308T020000<n><r>FREQ=YEARLY;BYMONTH=3;BYDAY=2SU<n><ed><n>","20221015T115821Z<n><bs><n><tz>EST<n><of>-0400<n><ot>-0500<n><s>19701101T020000<n><r>FREQ=YEARLY;BYMONTH=11;BYDAY=1SU<n><es><n><bd><n><tz>EDT<n><of>-0500<n><ot>-0400<n><s>19700308T020000<n><r>FREQ=YEARLY;BYMONTH=3;BYDAY=2SU<n><ed><n>","20221015T115821Z<n><bs><n><tz>CST<n><of>-0400<n><ot>-0500<n><s>19701101T010000<n><r>FREQ=YEARLY;BYMONTH=11;BYDAY=1SU<n><es><n><bd><n><tz>CDT<n><of>-0500<n><ot>-0400<n><s>19700308T000000<n><r>FREQ=YEARLY;BYMONTH=3;BYDAY=2SU<n><ed><n>","20221015T115821Z<n><bd><n><tz>CDT<n><of>-0600<n><ot>-0500<n><s>19700405T020000<n><r>FREQ=YEARLY;BYMONTH=4;BYDAY=1SU<n><ed><n><bs><n><tz>CST<n><of>-0500<n><ot>-0600<n><s>19701025T020000<n><r>FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU<n><es><n>","20221015T115821Z<n><bd><n><tz>-02<n><of>-0300<n><ot>-0200<n><s>19700308T020000<n><r>FREQ=YEARLY;BYMONTH=3;BYDAY=2SU<n><ed><n><bs><n><tz>-03<n><of>-0200<n><ot>-0300<n><s>19701101T020000<n><r>FREQ=YEARLY;BYMONTH=11;BYDAY=1SU<n><es><n>","20221015T115821Z<n><bs><n><tz>-02<n><of>-0200<n><ot>-0200<n><s>19700101T000000<n><es><n>","20221015T115821Z<n><bs><n><tz>CST<n><of>-0500<n><ot>-0600<n><s>19701101T020000<n><r>FREQ=YEARLY;BYMONTH=11;BYDAY=1SU<n><es><n><bd><n><tz>CDT<n><of>-0600<n><ot>-0500<n><s>19700308T020000<n><r>FREQ=YEARLY;BYMONTH=3;BYDAY=2SU<n><ed><n>","20221015T115821Z<n><bs><n><tz>-04<n><of>-0300<n><ot>-0400<n><s>19700405T000000<n><r>FREQ=YEARLY;BYMONTH=4;BYDAY=1SU<n><es><n><bd><n><tz>-03<n><of>-0400<n><ot>-0300<n><s>19700906T000000<n><r>FREQ=YEARLY;BYMONTH=9;BYDAY=1SU<n><ed><n>","20221015T115821Z<n><bd><n><tz>+00<n><of>-0100<n><ot>+0000<n><s>19700329T000000<n><r>FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU<n><ed><n><bs><n><tz>-01<n><of>+0000<n><ot>-0100<n><s>19701025T010000<n><r>FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU<n><es><n>","20221015T115821Z<n><bs><n><tz>NST<n><of>-0230<n><ot>-0330<n><s>19701101T020000<n><r>FREQ=YEARLY;BYMONTH=11;BYDAY=1SU<n><es><n><bd><n><tz>NDT<n><of>-0330<n><ot>-0230<n><s>19700308T020000<n><r>FREQ=YEARLY;BYMONTH=3;BYDAY=2SU<n><ed><n>","20221015T115821Z<n><bs><n><tz>+11<n><of>+1100<n><ot>+1100<n><s>19700101T000000<n><es><n>","20221015T115821Z<n><bs><n><tz>+07<n><of>+0700<n><ot>+0700<n><s>19700101T000000<n><es><n>","20221015T115821Z<n><bs><n><tz>+10<n><of>+1000<n><ot>+1000<n><s>19700101T000000<n><es><n>","20221015T115821Z<n><bs><n><tz>AEST<n><of>+1100<n><ot>+1000<n><s>19700405T030000<n><r>FREQ=YEARLY;BYMONTH=4;BYDAY=1SU<n><es><n><bd><n><tz>AEDT<n><of>+1000<n><ot>+1100<n><s>19701004T020000<n><r>FREQ=YEARLY;BYMONTH=10;BYDAY=1SU<n><ed><n>","20221015T115821Z<n><bs><n><tz>+05<n><of>+0500<n><ot>+0500<n><s>19700101T000000<n><es><n>","20221015T115821Z<n><bd><n><tz>NZDT<n><of>+1200<n><ot>+1300<n><s>19700927T020000<n><r>FREQ=YEARLY;BYMONTH=9;BYDAY=-1SU<n><ed><n><bs><n><tz>NZST<n><of>+1300<n><ot>+1200<n><s>19700405T030000<n><r>FREQ=YEARLY;BYMONTH=4;BYDAY=1SU<n><es><n>","20221015T115821Z<n><bs><n><tz>+03<n><of>+0300<n><ot>+0300<n><s>19700101T000000<n><es><n>","20221015T115821Z<n><bd><n><tz>+02<n><of>+0000<n><ot>+0200<n><s>19700329T010000<n><r>FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU<n><ed><n><bs><n><tz>+00<n><of>+0200<n><ot>+0000<n><s>19701025T030000<n><r>FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU<n><es><n>","20221015T115821Z<n><bs><n><tz>+06<n><of>+0600<n><ot>+0600<n><s>19700101T000000<n><es><n>","20221015T115821Z<n><bs><n><tz>+12<n><of>+1200<n><ot>+1200<n><s>19700101T000000<n><es><n>","20221015T115821Z<n><bs><n><tz>+04<n><of>+0400<n><ot>+0400<n><s>19700101T000000<n><es><n>","20221015T115821Z<n><bd><n><tz>EEST<n><of>+0200<n><ot>+0300<n><s>19700329T000000<n><r>FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU<n><ed><n><bs><n><tz>EET<n><of>+0300<n><ot>+0200<n><s>19701025T000000<n><r>FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU<n><es><n>","20221015T115821Z<n><bs><n><tz>+08<n><of>+0800<n><ot>+0800<n><s>19700101T000000<n><es><n>","20221015T115821Z<n><bs><n><tz>IST<n><of>+0530<n><ot>+0530<n><s>19700101T000000<n><es><n>","20221015T115821Z<n><bs><n><tz>+09<n><of>+0900<n><ot>+0900<n><s>19700101T000000<n><es><n>","20221015T115821Z<n><bs><n><tz>CST<n><of>+0800<n><ot>+0800<n><s>19700101T000000<n><es><n>","20221015T115821Z<n><bs><n><tz>+0530<n><of>+0530<n><ot>+0530<n><s>19700101T000000<n><es><n>","20221015T115821Z<n><bd><n><tz>EEST<n><of>+0200<n><ot>+0300<n><s>19700329T030000<n><r>FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU<n><ed><n><bs><n><tz>EET<n><of>+0300<n><ot>+0200<n><s>19701025T040000<n><r>FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU<n><es><n>","20221015T115821Z<n><bs><n><tz>EET<n><of>+0300<n><ot>+0200<n><s>19701024T020000<n><r>FREQ=YEARLY;BYMONTH=10;BYDAY=-1SA<n><es><n><bd><n><tz>EEST<n><of>+0200<n><ot>+0300<n><s>19700328T020000<n><r>FREQ=YEARLY;BYMONTH=3;BYDAY=-1SA<n><ed><n>","20221015T115821Z<n><bs><n><tz>HKT<n><of>+0800<n><ot>+0800<n><s>19700101T000000<n><es><n>","20221015T115821Z<n><bs><n><tz>WIB<n><of>+0700<n><ot>+0700<n><s>19700101T000000<n><es><n>","20221015T115821Z<n><bs><n><tz>WIT<n><of>+0900<n><ot>+0900<n><s>19700101T000000<n><es><n>","20221015T115821Z<n><bd><n><tz>IDT<n><of>+0200<n><ot>+0300<n><s>19700327T020000<n><r>FREQ=YEARLY;BYMONTH=3;BYDAY=-1FR<n><ed><n><bs><n><tz>IST<n><of>+0300<n><ot>+0200<n><s>19701025T020000<n><r>FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU<n><es><n>","20221015T115821Z<n><bs><n><tz>+0430<n><of>+0430<n><ot>+0430<n><s>19700101T000000<n><es><n>","20221015T115821Z<n><bs><n><tz>PKT<n><of>+0500<n><ot>+0500<n><s>19700101T000000<n><es><n>","20221015T115821Z<n><bs><n><tz>+0545<n><of>+0545<n><ot>+0545<n><s>19700101T000000<n><es><n>","20221015T115821Z<n><bs><n><tz>WITA<n><of>+0800<n><ot>+0800<n><s>19700101T000000<n><es><n>","20221015T115821Z<n><bs><n><tz>PST<n><of>+0800<n><ot>+0800<n><s>19700101T000000<n><es><n>","20221015T115821Z<n><bs><n><tz>EET<n><of>+0300<n><ot>+0200<n><s>19701025T040000<n><r>FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU<n><es><n><bd><n><tz>EEST<n><of>+0200<n><ot>+0300<n><s>19700329T030000<n><r>FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU<n><ed><n>","20221015T115821Z<n><bs><n><tz>KST<n><of>+0900<n><ot>+0900<n><s>19700101T000000<n><es><n>","20221015T115821Z<n><bs><n><tz>+0630<n><of>+0630<n><ot>+0630<n><s>19700101T000000<n><es><n>","20221015T115821Z<n><bs><n><tz>+0330<n><of>+0330<n><ot>+0330<n><s>19700101T000000<n><es><n>","20221015T115821Z<n><bs><n><tz>JST<n><of>+0900<n><ot>+0900<n><s>19700101T000000<n><es><n>","20221015T115821Z<n><bd><n><tz>WEST<n><of>+0000<n><ot>+0100<n><s>19700329T010000<n><r>FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU<n><ed><n><bs><n><tz>WET<n><of>+0100<n><ot>+0000<n><s>19701025T020000<n><r>FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU<n><es><n>","20221015T115821Z<n><bs><n><tz>-01<n><of>-0100<n><ot>-0100<n><s>19700101T000000<n><es><n>","20221015T115821Z<n><bs><n><tz>ACST<n><of>+1030<n><ot>+0930<n><s>19700405T030000<n><r>FREQ=YEARLY;BYMONTH=4;BYDAY=1SU<n><es><n><bd><n><tz>ACDT<n><of>+0930<n><ot>+1030<n><s>19701004T020000<n><r>FREQ=YEARLY;BYMONTH=10;BYDAY=1SU<n><ed><n>","20221015T115821Z<n><bs><n><tz>AEST<n><of>+1000<n><ot>+1000<n><s>19700101T000000<n><es><n>","20221015T115821Z<n><bd><n><tz>AEDT<n><of>+1000<n><ot>+1100<n><s>19701004T020000<n><r>FREQ=YEARLY;BYMONTH=10;BYDAY=1SU<n><ed><n><bs><n><tz>AEST<n><of>+1100<n><ot>+1000<n><s>19700405T030000<n><r>FREQ=YEARLY;BYMONTH=4;BYDAY=1SU<n><es><n>","20221015T115821Z<n><bs><n><tz>ACST<n><of>+0930<n><ot>+0930<n><s>19700101T000000<n><es><n>","20221015T115821Z<n><bs><n><tz>+0845<n><of>+0845<n><ot>+0845<n><s>19700101T000000<n><es><n>","20221015T115821Z<n><bs><n><tz>+1030<n><of>+1100<n><ot>+1030<n><s>19700405T020000<n><r>FREQ=YEARLY;BYMONTH=4;BYDAY=1SU<n><es><n><bd><n><tz>+11<n><of>+1030<n><ot>+1100<n><s>19701004T020000<n><r>FREQ=YEARLY;BYMONTH=10;BYDAY=1SU<n><ed><n>","20221015T115821Z<n><bs><n><tz>AWST<n><of>+0800<n><ot>+0800<n><s>19700101T000000<n><es><n>","20221015T115821Z<n><bs><n><tz>-06<n><of>-0500<n><ot>-0600<n><s>19700404T220000<n><r>FREQ=YEARLY;BYMONTH=4;BYDAY=1SA<n><es><n><bd><n><tz>-05<n><of>-0600<n><ot>-0500<n><s>19700905T220000<n><r>FREQ=YEARLY;BYMONTH=9;BYDAY=1SA<n><ed><n>","20221015T115821Z<n><bs><n><tz>IST<n><of>+0000<n><ot>+0100<n><s>19700329T010000<n><r>FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU<n><es><n><bd><n><tz>GMT<n><of>+0100<n><ot>+0000<n><s>19701025T020000<n><r>FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU<n><ed><n>","20221015T115821Z<n><bs><n><tz>+13<n><of>+1300<n><ot>+1300<n><s>19700101T000000<n><es><n>","20221015T115821Z<n><bs><n><tz>+14<n><of>+1400<n><ot>+1400<n><s>19700101T000000<n><es><n>","20221015T115821Z<n><bs><n><tz>+02<n><of>+0200<n><ot>+0200<n><s>19700101T000000<n><es><n>","20221015T115821Z<n><bs><n><tz>-10<n><of>-1000<n><ot>-1000<n><s>19700101T000000<n><es><n>","20221015T115821Z<n><bs><n><tz>-11<n><of>-1100<n><ot>-1100<n><s>19700101T000000<n><es><n>","20221015T115821Z<n><bs><n><tz>-12<n><of>-1200<n><ot>-1200<n><s>19700101T000000<n><es><n>","20221015T115821Z<n><bs><n><tz>-06<n><of>-0600<n><ot>-0600<n><s>19700101T000000<n><es><n>","20221015T115821Z<n><bs><n><tz>-07<n><of>-0700<n><ot>-0700<n><s>19700101T000000<n><es><n>","20221015T115821Z<n><bs><n><tz>-08<n><of>-0800<n><ot>-0800<n><s>19700101T000000<n><es><n>","20221015T115821Z<n><bs><n><tz>-09<n><of>-0900<n><ot>-0900<n><s>19700101T000000<n><es><n>","20221015T115821Z<n><bs><n><tz>UTC<n><of>+0000<n><ot>+0000<n><s>19700101T000000<n><es><n>","20221015T115821Z<n><bd><n><tz>BST<n><of>+0000<n><ot>+0100<n><s>19700329T010000<n><r>FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU<n><ed><n><bs><n><tz>GMT<n><of>+0100<n><ot>+0000<n><s>19701025T020000<n><r>FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU<n><es><n>","20221015T115821Z<n><bd><n><tz>EEST<n><of>+0200<n><ot>+0300<n><s>19700329T020000<n><r>FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU<n><ed><n><bs><n><tz>EET<n><of>+0300<n><ot>+0200<n><s>19701025T030000<n><r>FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU<n><es><n>","20221015T115821Z<n><bs><n><tz>WET<n><of>+0100<n><ot>+0000<n><s>19701025T020000<n><r>FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU<n><es><n><bd><n><tz>WEST<n><of>+0000<n><ot>+0100<n><s>19700329T010000<n><r>FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU<n><ed><n>","20221015T115821Z<n><bs><n><tz>MSK<n><of>+0300<n><ot>+0300<n><s>19700101T000000<n><es><n>","20221015T115821Z<n><bs><n><tz>HST<n><of>-1000<n><ot>-1000<n><s>19700101T000000<n><es><n>","20221015T115821Z<n><bd><n><tz>MEST<n><of>+0100<n><ot>+0200<n><s>19700329T020000<n><r>FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU<n><ed><n><bs><n><tz>MET<n><of>+0200<n><ot>+0100<n><s>19701025T030000<n><r>FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU<n><es><n>","20221015T115821Z<n><bd><n><tz>+1345<n><of>+1245<n><ot>+1345<n><s>19700927T024500<n><r>FREQ=YEARLY;BYMONTH=9;BYDAY=-1SU<n><ed><n><bs><n><tz>+1245<n><of>+1345<n><ot>+1245<n><s>19700405T034500<n><r>FREQ=YEARLY;BYMONTH=4;BYDAY=1SU<n><es><n>","20221015T115821Z<n><bd><n><tz>+13<n><of>+1200<n><ot>+1300<n><s>19701108T020000<n><r>FREQ=YEARLY;BYMONTH=11;BYDAY=2SU<n><ed><n><bs><n><tz>+12<n><of>+1300<n><ot>+1200<n><s>19700118T030000<n><r>FREQ=YEARLY;BYMONTH=1;BYDAY=-2SU<n><es><n>","20221015T115821Z<n><bs><n><tz>ChST<n><of>+1000<n><ot>+1000<n><s>19700101T000000<n><es><n>","20221015T115821Z<n><bs><n><tz>-0930<n><of>-0930<n><ot>-0930<n><s>19700101T000000<n><es><n>","20221015T115821Z<n><bs><n><tz>SST<n><of>-1100<n><ot>-1100<n><s>19700101T000000<n><es><n>","20221015T115821Z<n><bd><n><tz>+12<n><of>+1100<n><ot>+1200<n><s>19701004T020000<n><r>FREQ=YEARLY;BYMONTH=10;BYDAY=1SU<n><ed><n><bs><n><tz>+11<n><of>+1200<n><ot>+1100<n><s>19700405T030000<n><r>FREQ=YEARLY;BYMONTH=4;BYDAY=1SU<n><es><n>"];function tzlib_get_content(tzName) {
  const nameParts = tzName.split('/');
  if (
    (nameParts.length === 3 &&
      (!tzlibZonesDB[`${nameParts[0]}`] ||
        !tzlibZonesDB[`${nameParts[0]}`][`${nameParts[1]}`] ||
        !tzlibZonesDB[`${nameParts[0]}`][`${nameParts[1]}`][`${nameParts[2]}`])) ||
    (nameParts.length === 2 &&
      (!tzlibZonesDB[`${nameParts[0]}`] || !tzlibZonesDB[`${nameParts[0]}`][`${nameParts[1]}`])) ||
    (nameParts.length === 1 && !tzlibZonesDB[`${nameParts[0]}`])
  ) {
    console.error('Given timezone not valid.');
    return '';
  }
  if (nameParts.length === 3) {
    return [
      tzlibZonesDB[`${nameParts[0]}`][`${nameParts[1]}`][`${nameParts[2]}`][0],
      tzlib_enrich_data(tzlibZonesDetailsDB[tzlibZonesDB[`${nameParts[0]}`][`${nameParts[1]}`][`${nameParts[2]}`][1]]),
    ];
  }
  if (nameParts.length === 2) {
    return [
      tzlibZonesDB[`${nameParts[0]}`][`${nameParts[1]}`][0],
      tzlib_enrich_data(tzlibZonesDetailsDB[tzlibZonesDB[`${nameParts[0]}`][`${nameParts[1]}`][1]]),
    ];
  }
  return [tzlibZonesDB[`${nameParts[0]}`][0], tzlib_enrich_data(tzlibZonesDetailsDB[tzlibZonesDB[`${nameParts[0]}`][1]])];
}
function tzlib_enrich_data(string) {
  const shortenerMap = {
    "<br>":"<n>",
    "TZNAME:":"<tz>",
    "TZOFFSETFROM:":"<of>",
    "TZOFFSETTO:":"<ot>",
    "DTSTART:":"<s>",
    "RRULE:":"<r>",
    "BEGIN:DAYLIGHT":"<bd>",
    "END:DAYLIGHT":"<ed>",
    "BEGIN:STANDARD":"<bs>",
    "END:STANDARD":"<es>"
  }
  for (const [key, value] of Object.entries(shortenerMap)) {
    string = string.replaceAll(value, key);
  }
  return string;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function tzlib_get_ical_block(tzName, jsonType = false) {
  const tzBlock = tzlib_get_content(tzName);
  if (tzBlock[1] == null || tzBlock[1] == '') {
    return '';
  }
  const location = (function () {
    if (tzBlock[0] == '') {
      return tzName;
    } else {
      return tzBlock[0];
    }
  })();
  const tzidLine = 'TZID=' + location;
  const output = [
    'BEGIN:VTIMEZONE\r\nTZID:' +
      location +
      '\r\nX-LIC-LOCATION:' +
      location +
      '\r\nLAST-MODIFIED:' +
      tzBlock[1].replace(/[^\w_\-:,;=+/<br>]/g, '').replace(/<br>/g, '\r\n') +
      'END:VTIMEZONE',
    tzidLine,
  ];
  if (jsonType) {
    return JSON.stringify(output);
  }
  return output;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function tzlib_get_offset(tzName, isoDate, isoTime) {
  const tzBlock = tzlib_get_content(tzName);
  if (tzBlock[1] == null || tzBlock[1] == '') {
    return '';
  }
  if (!isoDate.match(/^\d{4}-\d{2}-\d{2}$/)) {
    console.error('offset calculation failed: date misspelled [-> YYYY-MM-DD]');
    return '';
  }
  if (!isoTime.match(/^\d{2}:\d{2}$/)) {
    console.error('offset calculation failed: time misspelled [-> hh:mm]');
    return '';
  }
  if (!tzBlock[1].match(/BEGIN:DAYLIGHT/i)) {
    return tzBlock[1].match(/TZOFFSETTO:([+|-]\d{4})/i)[1];
  }
  const dateString = isoDate + 'T' + isoTime + ':00';
  const date = new Date(dateString);
  const dateYear = date.getFullYear();
  const dateMonth = date.getMonth() + 1;
  const dateDay = date.getDate();
  const dateHour = date.getHours();
  const timezoneData = tzBlock[1].replace(/[^\w_\-:,;=+/<br>]/g, '').split('<br>');
  const tzBreakpoints = { 1: {}, 2: {} };
  let breakpointCount = 0;
  for (let i = 0; i < timezoneData.length; i++) {
    if (timezoneData[`${i}`].startsWith('TZOFFSETTO')) {
      breakpointCount++;
      tzBreakpoints[`${breakpointCount}`].offset = timezoneData[`${i}`].split(':')[1];
    }
    if (timezoneData[`${i}`].startsWith('DTSTART')) {
      tzBreakpoints[`${breakpointCount}`].hour = parseInt(timezoneData[`${i}`].substr(17, 2));
    }
    if (timezoneData[`${i}`].startsWith('RRULE')) {
      let rruleParts = timezoneData[`${i}`].split(';');
      let rruleMonth = parseInt(rruleParts[1].split('=')[1]);
      tzBreakpoints[`${breakpointCount}`].month = parseInt(rruleMonth);
      tzBreakpoints[`${breakpointCount}`].day = rruleParts[2].split('=')[1];
    }
  }
  if (tzBreakpoints[1].month > tzBreakpoints[2].month) {
    [tzBreakpoints[1], tzBreakpoints[2]] = [tzBreakpoints[2], tzBreakpoints[1]];
  }
  if (dateMonth != tzBreakpoints[1].month && dateMonth != tzBreakpoints[2].month) {
    if (dateMonth < tzBreakpoints[1].month || dateMonth > tzBreakpoints[2].month) {
      return tzBreakpoints[2].offset;
    } else {
      return tzBreakpoints[1].offset;
    }
  }
  const theCase = (function () {
    return Object.keys(tzBreakpoints).find((key) => tzBreakpoints[`${key}`].month == dateMonth);
  })();
  const helperArrayWeekdays = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
  const numberDays = new Date(dateYear, dateMonth, 0).getDate();
  let weekdayCount = new Date(dateYear, dateMonth - 1, 1).getDay();
  const weekdays = { SU: {}, MO: {}, TU: {}, WE: {}, TH: {}, FR: {}, SA: {} };
  for (let d = 1; d <= numberDays; d++) {
    const occurence = Object.keys(weekdays[helperArrayWeekdays[`${weekdayCount}`]]).length + 1;
    weekdays[helperArrayWeekdays[`${weekdayCount}`]][`${occurence}`] = d;
    weekdayCount++;
    if (weekdayCount == 7) {
      weekdayCount = 0;
    }
  }
  const actualDay = (function () {
    if (tzBreakpoints[`${theCase}`].day[0] == '-') {
      const breakpointWeekday = tzBreakpoints[`${theCase}`].day.substr(2, 2);
      const dayIndex =
        Object.keys(weekdays[`${breakpointWeekday}`]).length +
        1 -
        parseInt(tzBreakpoints[`${theCase}`].day[1]);
      return weekdays[`${breakpointWeekday}`][`${dayIndex}`];
    } else {
      const breakpointWeekday = tzBreakpoints[`${theCase}`].day.substr(1, 2);
      return weekdays[`${breakpointWeekday}`][tzBreakpoints[`${theCase}`].day[0]];
    }
  })();
  if (dateDay > actualDay || (dateDay == actualDay && dateHour >= tzBreakpoints[`${theCase}`].hour)) {
    return tzBreakpoints[`${theCase}`].offset;
  }
  const fallbackCase = (function () {
    if (theCase == 1) {
      return 2;
    } else {
      return 1;
    }
  })();
  return tzBreakpoints[`${fallbackCase}`].offset;
}
let tzlibZoneNames = [];
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function tzlib_get_timezones(jsonType = false) {
  if (tzlibZoneNames.length == 0) {
    tzlibZoneNames = (function () {
      let namesArr = [];
      for (const [key, value] of Object.entries(tzlibZonesDB)) {
        if (typeof value === 'object' && !Array.isArray(value)) {
          for (const [key2, value2] of Object.entries(value)) {
            if (typeof value2 === 'object' && !Array.isArray(value2)) {
              for (const [key3] of Object.entries(value2)) {
                namesArr.push(key + '/' + key2 + '/' + key3);
              }    
            } else {
              namesArr.push(key + '/' + key2);
            }
          } 
        } else {
          namesArr.push(key);
        }
      }
      return namesArr;
    })();
  }
  if (jsonType) {
    return JSON.stringify(tzlibZoneNames);
  }
  return tzlibZoneNames;
}
