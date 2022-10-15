/*!
 *  @preserve
 *
 * ++++++++++++++++++++++++++++++++++++++
 * Add to Calendar TimeZones iCal Library
 * ++++++++++++++++++++++++++++++++++++++
 *
 * Version: 1.4.0
 * Creator: Jens Kuerschner (https://jenskuerschner.de)
 * Project: https://github.com/add2cal/timezones-ical-library
 * License: Apache-2.0
 *
 */
const tzlibVersion = '1.4.0';
const tzlibZonesDB = {"Africa":{"Abidjan":["",0],"Algiers":["",1],"Bissau":["",0],"Cairo":["",2],"Casablanca":["",3],"Ceuta":["",4],"El_Aaiun":["",3],"Johannesburg":["",5],"Juba":["",6],"Khartoum":["",6],"Lagos":["",7],"Maputo":["",6],"Monrovia":["",0],"Nairobi":["",8],"Ndjamena":["",7],"Sao_Tome":["",0],"Tripoli":["",2],"Tunis":["",1],"Windhoek":["",6]},"America":{"Adak":["",9],"Anchorage":["",10],"Araguaina":["",11],"Argentina":{"Buenos_Aires":["",11],"Catamarca":["",11],"Cordoba":["",11],"Jujuy":["",11],"La_Rioja":["",11],"Mendoza":["",11],"Rio_Gallegos":["",11],"Salta":["",11],"San_Juan":["",11],"San_Luis":["",11],"Tucuman":["",11],"Ushuaia":["",11]},"Asuncion":["",12],"Bahia_Banderas":["",13],"Bahia":["",11],"Barbados":["",14],"Belem":["",11],"Belize":["",15],"Boa_Vista":["",16],"Bogota":["",17],"Boise":["",18],"Cambridge_Bay":["",18],"Campo_Grande":["",16],"Cancun":["",19],"Caracas":["",16],"Cayenne":["",11],"Chicago":["",20],"Chihuahua":["",21],"Costa_Rica":["",15],"Cuiaba":["",16],"Danmarkshavn":["",0],"Dawson_Creek":["",22],"Dawson":["",22],"Denver":["",18],"Detroit":["",23],"Edmonton":["",18],"Eirunepe":["",17],"El_Salvador":["",15],"Fort_Nelson":["",22],"Fortaleza":["",11],"Glace_Bay":["",24],"Goose_Bay":["",25],"Grand_Turk":["",26],"Guatemala":["",15],"Guayaquil":["",17],"Guyana":["",16],"Halifax":["",24],"Havana":["",27],"Hermosillo":["",22],"Indiana":{"Indianapolis":["",23],"Knox":["",20],"Marengo":["",23],"Petersburg":["",23],"Tell_City":["",20],"Vevay":["",23],"Vincennes":["",23],"Winamac":["",26]},"Inuvik":["",18],"Iqaluit":["",23],"Jamaica":["",19],"Juneau":["",10],"Kentucky":{"Louisville":["",23],"Monticello":["",23]},"La_Paz":["",16],"Lima":["",17],"Los_Angeles":["",28],"Maceio":["",11],"Managua":["",15],"Manaus":["",16],"Martinique":["",14],"Matamoros":["",20],"Mazatlan":["",21],"Menominee":["",20],"Merida":["",29],"Metlakatla":["",10],"Mexico_City":["",29],"Miquelon":["",30],"Moncton":["",24],"Monterrey":["",29],"Montevideo":["",11],"New_York":["",23],"Nipigon":["",23],"Nome":["",10],"Noronha":["",31],"North_Dakota":{"Beulah":["",20],"Center":["",20],"New_Salem":["",20]},"Nuuk":["",32],"Ojinaga":["",18],"Panama":["",19],"Pangnirtung":["",23],"Paramaribo":["",11],"Phoenix":["",22],"Port-au-Prince":["",23],"Porto_Velho":["",16],"Puerto_Rico":["",14],"Punta_Arenas":["",11],"Rainy_River":["",20],"Rankin_Inlet":["",20],"Recife":["",11],"Regina":["",15],"Resolute":["",33],"Rio_Branco":["",17],"Santarem":["",11],"Santiago":["",34],"Santo_Domingo":["",14],"Sao_Paulo":["",11],"Scoresbysund":["",35],"Sitka":["",10],"St_Johns":["",36],"Swift_Current":["",15],"Tegucigalpa":["",15],"Thule":["",24],"Thunder_Bay":["",23],"Tijuana":["",28],"Toronto":["",23],"Vancouver":["",28],"Whitehorse":["",22],"Winnipeg":["",20],"Yakutat":["",10],"Yellowknife":["",18]},"Antarctica":{"Casey":["",37],"Davis":["",38],"Macquarie":["",39],"Mawson":["",40],"Palmer":["",11],"Rothera":["",11],"Troll":["",41]},"Asia":{"Almaty":["",42],"Amman":["",43],"Anadyr":["",44],"Aqtau":["",40],"Aqtobe":["",40],"Ashgabat":["",40],"Atyrau":["",40],"Baghdad":["",45],"Baku":["",46],"Bangkok":["",38],"Barnaul":["",38],"Beirut":["",47],"Bishkek":["",42],"Chita":["",48],"Choibalsan":["",49],"Colombo":["",50],"Damascus":["",51],"Dhaka":["",42],"Dili":["",48],"Dubai":["",46],"Dushanbe":["",40],"Famagusta":["",52],"Gaza":["",53],"Hebron":["",53],"Ho_Chi_Minh":["",38],"Hong_Kong":["",54],"Hovd":["",38],"Irkutsk":["",49],"Jakarta":["",55],"Jayapura":["",56],"Jerusalem":["",57],"Kabul":["",58],"Kamchatka":["",44],"Karachi":["",59],"Kathmandu":["",60],"Khandyga":["",48],"Kolkata":["",61],"Krasnoyarsk":["",38],"Kuching":["",49],"Macau":["",62],"Magadan":["",37],"Makassar":["",63],"Manila":["",64],"Nicosia":["",65],"Novokuznetsk":["",38],"Novosibirsk":["",38],"Omsk":["",42],"Oral":["",40],"Pontianak":["",55],"Pyongyang":["",66],"Qatar":["",45],"Qostanay":["",42],"Qyzylorda":["",40],"Riyadh":["",45],"Sakhalin":["",37],"Samarkand":["",40],"Seoul":["",66],"Shanghai":["",62],"Singapore":["",49],"Srednekolymsk":["",37],"Taipei":["",62],"Tashkent":["",40],"Tbilisi":["",46],"Tehran":["",67],"Thimphu":["",42],"Tokyo":["",68],"Tomsk":["",38],"Ulaanbaatar":["",49],"Urumqi":["",42],"Ust-Nera":["",69],"Vladivostok":["",69],"Yakutsk":["",48],"Yangon":["",70],"Yekaterinburg":["",40],"Yerevan":["",46]},"Atlantic":{"Azores":["",35],"Bermuda":["",24],"Canary":["",71],"Cape_Verde":["",72],"Faroe":["",71],"Madeira":["",71],"South_Georgia":["",31],"Stanley":["",11]},"Australia":{"Adelaide":["",73],"Brisbane":["",74],"Broken_Hill":["",73],"Darwin":["",75],"Eucla":["",76],"Hobart":["",77],"Lindeman":["",74],"Lord_Howe":["",78],"Melbourne":["",39],"Perth":["",79],"Sydney":["",39]},"CET":["",4],"CST6CDT":["",20],"EET":["",52],"EST":["",19],"EST5EDT":["",23],"Etc":{"GMT-1":["",3],"GMT-10":["",69],"GMT-11":["",37],"GMT-12":["",44],"GMT-13":["",80],"GMT-14":["",81],"GMT-2":["",82],"GMT-3":["",45],"GMT-4":["",46],"GMT-5":["",40],"GMT-6":["",42],"GMT-7":["",38],"GMT-8":["",49],"GMT-9":["",48],"GMT":["",0],"GMT+1":["",72],"GMT+10":["",83],"GMT+11":["",84],"GMT+12":["",85],"GMT+2":["",31],"GMT+3":["",11],"GMT+4":["",16],"GMT+5":["",17],"GMT+6":["",86],"GMT+7":["",87],"GMT+8":["",88],"GMT+9":["",89],"UTC":["",90]},"Europe":{"Andorra":["",4],"Astrakhan":["",46],"Athens":["",52],"Belgrade":["",4],"Berlin":["",4],"Brussels":["",4],"Bucharest":["",52],"Budapest":["",4],"Chisinau":["",91],"Dublin":["",92],"Gibraltar":["",4],"Helsinki":["",52],"Istanbul":["",45],"Kaliningrad":["",2],"Kirov":["",45],"Kyiv":["",65],"Lisbon":["",93],"London":["",94],"Madrid":["",4],"Malta":["",4],"Minsk":["",45],"Moscow":["",95],"Paris":["",4],"Prague":["",4],"Riga":["",52],"Rome":["",4],"Samara":["",46],"Saratov":["",46],"Simferopol":["",95],"Sofia":["",52],"Tallinn":["",52],"Tirane":["",4],"Ulyanovsk":["",46],"Vienna":["",4],"Vilnius":["",52],"Volgograd":["",45],"Warsaw":["",4],"Zurich":["",4]},"HST":["",96],"Indian":{"Chagos":["",42],"Maldives":["",40],"Mauritius":["",46]},"MET":["",97],"MST":["",22],"MST7MDT":["",18],"Pacific":{"Apia":["",80],"Auckland":["",98],"Bougainville":["",37],"Chatham":["",99],"Easter":["",100],"Efate":["",37],"Fakaofo":["",80],"Fiji":["",101],"Galapagos":["",86],"Gambier":["",89],"Guadalcanal":["",37],"Guam":["",102],"Honolulu":["",96],"Kanton":["",80],"Kiritimati":["",81],"Kosrae":["",37],"Kwajalein":["",44],"Marquesas":["",103],"Nauru":["",44],"Niue":["",84],"Norfolk":["",104],"Noumea":["",37],"Pago_Pago":["",105],"Palau":["",48],"Pitcairn":["",88],"Port_Moresby":["",69],"Rarotonga":["",83],"Tahiti":["",83],"Tarawa":["",44],"Tongatapu":["",80]},"PST8PDT":["",28],"WET":["",71]};
const tzlibZonesDetailsDB = ["20220929T150625Z<n><bs><n><tz>GMT<n><of>+0000<n><ot>+0000<n><s>19700101T000000<n><es><n>","20220929T150625Z<n><bs><n><tz>CET<n><of>+0100<n><ot>+0100<n><s>19700101T000000<n><es><n>","20220929T150625Z<n><bs><n><tz>EET<n><of>+0200<n><ot>+0200<n><s>19700101T000000<n><es><n>","20220929T150625Z<n><bs><n><tz>+01<n><of>+0100<n><ot>+0100<n><s>19700101T000000<n><es><n>","20220929T150625Z<n><bd><n><tz>CEST<n><of>+0100<n><ot>+0200<n><s>19700329T020000<n><r>FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU<n><ed><n><bs><n><tz>CET<n><of>+0200<n><ot>+0100<n><s>19701025T030000<n><r>FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU<n><es><n>","20220929T150625Z<n><bs><n><tz>SAST<n><of>+0200<n><ot>+0200<n><s>19700101T000000<n><es><n>","20220929T150625Z<n><bs><n><tz>CAT<n><of>+0200<n><ot>+0200<n><s>19700101T000000<n><es><n>","20220929T150625Z<n><bs><n><tz>WAT<n><of>+0100<n><ot>+0100<n><s>19700101T000000<n><es><n>","20220929T150625Z<n><bs><n><tz>EAT<n><of>+0300<n><ot>+0300<n><s>19700101T000000<n><es><n>","20220929T150625Z<n><bd><n><tz>HDT<n><of>-1000<n><ot>-0900<n><s>19700308T020000<n><r>FREQ=YEARLY;BYMONTH=3;BYDAY=2SU<n><ed><n><bs><n><tz>HST<n><of>-0900<n><ot>-1000<n><s>19701101T020000<n><r>FREQ=YEARLY;BYMONTH=11;BYDAY=1SU<n><es><n>","20220929T150625Z<n><bd><n><tz>AKDT<n><of>-0900<n><ot>-0800<n><s>19700308T020000<n><r>FREQ=YEARLY;BYMONTH=3;BYDAY=2SU<n><ed><n><bs><n><tz>AKST<n><of>-0800<n><ot>-0900<n><s>19701101T020000<n><r>FREQ=YEARLY;BYMONTH=11;BYDAY=1SU<n><es><n>","20220929T150625Z<n><bs><n><tz>-03<n><of>-0300<n><ot>-0300<n><s>19700101T000000<n><es><n>","20220929T150625Z<n><bd><n><tz>-03<n><of>-0400<n><ot>-0300<n><s>19701004T000000<n><r>FREQ=YEARLY;BYMONTH=10;BYDAY=1SU<n><ed><n><bs><n><tz>-04<n><of>-0300<n><ot>-0400<n><s>19700322T000000<n><r>FREQ=YEARLY;BYMONTH=3;BYDAY=4SU<n><es><n>","20220929T150625Z<n><bs><n><tz>CST<n><of>-0500<n><ot>-0600<n><s>19701025T020000<n><r>FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU<n><es><n><bd><n><tz>CDT<n><of>-0600<n><ot>-0500<n><s>19700405T020000<n><r>FREQ=YEARLY;BYMONTH=4;BYDAY=1SU<n><ed><n>","20220929T150625Z<n><bs><n><tz>AST<n><of>-0400<n><ot>-0400<n><s>19700101T000000<n><es><n>","20220929T150625Z<n><bs><n><tz>CST<n><of>-0600<n><ot>-0600<n><s>19700101T000000<n><es><n>","20220929T150625Z<n><bs><n><tz>-04<n><of>-0400<n><ot>-0400<n><s>19700101T000000<n><es><n>","20220929T150625Z<n><bs><n><tz>-05<n><of>-0500<n><ot>-0500<n><s>19700101T000000<n><es><n>","20220929T150625Z<n><bd><n><tz>MDT<n><of>-0700<n><ot>-0600<n><s>19700308T020000<n><r>FREQ=YEARLY;BYMONTH=3;BYDAY=2SU<n><ed><n><bs><n><tz>MST<n><of>-0600<n><ot>-0700<n><s>19701101T020000<n><r>FREQ=YEARLY;BYMONTH=11;BYDAY=1SU<n><es><n>","20220929T150625Z<n><bs><n><tz>EST<n><of>-0500<n><ot>-0500<n><s>19700101T000000<n><es><n>","20220929T150625Z<n><bd><n><tz>CDT<n><of>-0600<n><ot>-0500<n><s>19700308T020000<n><r>FREQ=YEARLY;BYMONTH=3;BYDAY=2SU<n><ed><n><bs><n><tz>CST<n><of>-0500<n><ot>-0600<n><s>19701101T020000<n><r>FREQ=YEARLY;BYMONTH=11;BYDAY=1SU<n><es><n>","20220929T150625Z<n><bd><n><tz>MDT<n><of>-0700<n><ot>-0600<n><s>19700405T020000<n><r>FREQ=YEARLY;BYMONTH=4;BYDAY=1SU<n><ed><n><bs><n><tz>MST<n><of>-0600<n><ot>-0700<n><s>19701025T020000<n><r>FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU<n><es><n>","20220929T150625Z<n><bs><n><tz>MST<n><of>-0700<n><ot>-0700<n><s>19700101T000000<n><es><n>","20220929T150625Z<n><bd><n><tz>EDT<n><of>-0500<n><ot>-0400<n><s>19700308T020000<n><r>FREQ=YEARLY;BYMONTH=3;BYDAY=2SU<n><ed><n><bs><n><tz>EST<n><of>-0400<n><ot>-0500<n><s>19701101T020000<n><r>FREQ=YEARLY;BYMONTH=11;BYDAY=1SU<n><es><n>","20220929T150625Z<n><bd><n><tz>ADT<n><of>-0400<n><ot>-0300<n><s>19700308T020000<n><r>FREQ=YEARLY;BYMONTH=3;BYDAY=2SU<n><ed><n><bs><n><tz>AST<n><of>-0300<n><ot>-0400<n><s>19701101T020000<n><r>FREQ=YEARLY;BYMONTH=11;BYDAY=1SU<n><es><n>","20220929T150625Z<n><bs><n><tz>AST<n><of>-0300<n><ot>-0400<n><s>19701101T020000<n><r>FREQ=YEARLY;BYMONTH=11;BYDAY=1SU<n><es><n><bd><n><tz>ADT<n><of>-0400<n><ot>-0300<n><s>19700308T020000<n><r>FREQ=YEARLY;BYMONTH=3;BYDAY=2SU<n><ed><n>","20220929T150625Z<n><bs><n><tz>EST<n><of>-0400<n><ot>-0500<n><s>19701101T020000<n><r>FREQ=YEARLY;BYMONTH=11;BYDAY=1SU<n><es><n><bd><n><tz>EDT<n><of>-0500<n><ot>-0400<n><s>19700308T020000<n><r>FREQ=YEARLY;BYMONTH=3;BYDAY=2SU<n><ed><n>","20220929T150625Z<n><bs><n><tz>CST<n><of>-0400<n><ot>-0500<n><s>19701101T010000<n><r>FREQ=YEARLY;BYMONTH=11;BYDAY=1SU<n><es><n><bd><n><tz>CDT<n><of>-0500<n><ot>-0400<n><s>19700308T000000<n><r>FREQ=YEARLY;BYMONTH=3;BYDAY=2SU<n><ed><n>","20220929T150625Z<n><bd><n><tz>PDT<n><of>-0800<n><ot>-0700<n><s>19700308T020000<n><r>FREQ=YEARLY;BYMONTH=3;BYDAY=2SU<n><ed><n><bs><n><tz>PST<n><of>-0700<n><ot>-0800<n><s>19701101T020000<n><r>FREQ=YEARLY;BYMONTH=11;BYDAY=1SU<n><es><n>","20220929T150625Z<n><bd><n><tz>CDT<n><of>-0600<n><ot>-0500<n><s>19700405T020000<n><r>FREQ=YEARLY;BYMONTH=4;BYDAY=1SU<n><ed><n><bs><n><tz>CST<n><of>-0500<n><ot>-0600<n><s>19701025T020000<n><r>FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU<n><es><n>","20220929T150625Z<n><bd><n><tz>-02<n><of>-0300<n><ot>-0200<n><s>19700308T020000<n><r>FREQ=YEARLY;BYMONTH=3;BYDAY=2SU<n><ed><n><bs><n><tz>-03<n><of>-0200<n><ot>-0300<n><s>19701101T020000<n><r>FREQ=YEARLY;BYMONTH=11;BYDAY=1SU<n><es><n>","20220929T150625Z<n><bs><n><tz>-02<n><of>-0200<n><ot>-0200<n><s>19700101T000000<n><es><n>","20220929T150625Z<n><bd><n><tz>-02<n><of>-0300<n><ot>-0200<n><s>19700328T220000<n><r>FREQ=YEARLY;BYMONTH=3;BYDAY=-1SA<n><ed><n><bs><n><tz>-03<n><of>-0200<n><ot>-0300<n><s>19701024T230000<n><r>FREQ=YEARLY;BYMONTH=10;BYDAY=-1SA<n><es><n>","20220929T150625Z<n><bs><n><tz>CST<n><of>-0500<n><ot>-0600<n><s>19701101T020000<n><r>FREQ=YEARLY;BYMONTH=11;BYDAY=1SU<n><es><n><bd><n><tz>CDT<n><of>-0600<n><ot>-0500<n><s>19700308T020000<n><r>FREQ=YEARLY;BYMONTH=3;BYDAY=2SU<n><ed><n>","20220929T150625Z<n><bs><n><tz>-04<n><of>-0300<n><ot>-0400<n><s>19700405T000000<n><r>FREQ=YEARLY;BYMONTH=4;BYDAY=1SU<n><es><n><bd><n><tz>-03<n><of>-0400<n><ot>-0300<n><s>19700906T000000<n><r>FREQ=YEARLY;BYMONTH=9;BYDAY=1SU<n><ed><n>","20220929T150625Z<n><bd><n><tz>+00<n><of>-0100<n><ot>+0000<n><s>19700329T000000<n><r>FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU<n><ed><n><bs><n><tz>-01<n><of>+0000<n><ot>-0100<n><s>19701025T010000<n><r>FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU<n><es><n>","20220929T150625Z<n><bs><n><tz>NST<n><of>-0230<n><ot>-0330<n><s>19701101T020000<n><r>FREQ=YEARLY;BYMONTH=11;BYDAY=1SU<n><es><n><bd><n><tz>NDT<n><of>-0330<n><ot>-0230<n><s>19700308T020000<n><r>FREQ=YEARLY;BYMONTH=3;BYDAY=2SU<n><ed><n>","20220929T150625Z<n><bs><n><tz>+11<n><of>+1100<n><ot>+1100<n><s>19700101T000000<n><es><n>","20220929T150625Z<n><bs><n><tz>+07<n><of>+0700<n><ot>+0700<n><s>19700101T000000<n><es><n>","20220929T150625Z<n><bs><n><tz>AEST<n><of>+1100<n><ot>+1000<n><s>19700405T030000<n><r>FREQ=YEARLY;BYMONTH=4;BYDAY=1SU<n><es><n><bd><n><tz>AEDT<n><of>+1000<n><ot>+1100<n><s>19701004T020000<n><r>FREQ=YEARLY;BYMONTH=10;BYDAY=1SU<n><ed><n>","20220929T150625Z<n><bs><n><tz>+05<n><of>+0500<n><ot>+0500<n><s>19700101T000000<n><es><n>","20220929T150625Z<n><bd><n><tz>+02<n><of>+0000<n><ot>+0200<n><s>19700329T010000<n><r>FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU<n><ed><n><bs><n><tz>+00<n><of>+0200<n><ot>+0000<n><s>19701025T030000<n><r>FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU<n><es><n>","20220929T150625Z<n><bs><n><tz>+06<n><of>+0600<n><ot>+0600<n><s>19700101T000000<n><es><n>","20220929T150625Z<n><bs><n><tz>EET<n><of>+0300<n><ot>+0200<n><s>19701030T010000<n><r>FREQ=YEARLY;BYMONTH=10;BYDAY=-1FR<n><es><n><bd><n><tz>EEST<n><of>+0200<n><ot>+0300<n><s>19700227T000000<n><r>FREQ=YEARLY;BYMONTH=2;BYDAY=-1FR<n><ed><n>","20220929T150625Z<n><bs><n><tz>+12<n><of>+1200<n><ot>+1200<n><s>19700101T000000<n><es><n>","20220929T150625Z<n><bs><n><tz>+03<n><of>+0300<n><ot>+0300<n><s>19700101T000000<n><es><n>","20220929T150625Z<n><bs><n><tz>+04<n><of>+0400<n><ot>+0400<n><s>19700101T000000<n><es><n>","20220929T150625Z<n><bd><n><tz>EEST<n><of>+0200<n><ot>+0300<n><s>19700329T000000<n><r>FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU<n><ed><n><bs><n><tz>EET<n><of>+0300<n><ot>+0200<n><s>19701025T000000<n><r>FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU<n><es><n>","20220929T150625Z<n><bs><n><tz>+09<n><of>+0900<n><ot>+0900<n><s>19700101T000000<n><es><n>","20220929T150625Z<n><bs><n><tz>+08<n><of>+0800<n><ot>+0800<n><s>19700101T000000<n><es><n>","20220929T150625Z<n><bs><n><tz>+0530<n><of>+0530<n><ot>+0530<n><s>19700101T000000<n><es><n>","20220929T150625Z<n><bs><n><tz>EET<n><of>+0300<n><ot>+0200<n><s>19701030T000000<n><r>FREQ=YEARLY;BYMONTH=10;BYDAY=-1FR<n><es><n><bd><n><tz>EEST<n><of>+0200<n><ot>+0300<n><s>19700327T000000<n><r>FREQ=YEARLY;BYMONTH=3;BYDAY=-1FR<n><ed><n>","20220929T150625Z<n><bd><n><tz>EEST<n><of>+0200<n><ot>+0300<n><s>19700329T030000<n><r>FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU<n><ed><n><bs><n><tz>EET<n><of>+0300<n><ot>+0200<n><s>19701025T040000<n><r>FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU<n><es><n>","20220929T150625Z<n><bs><n><tz>EET<n><of>+0300<n><ot>+0200<n><s>19701024T020000<n><r>FREQ=YEARLY;BYMONTH=10;BYDAY=-1SA<n><es><n><bd><n><tz>EEST<n><of>+0200<n><ot>+0300<n><s>19700328T020000<n><r>FREQ=YEARLY;BYMONTH=3;BYDAY=-1SA<n><ed><n>","20220929T150625Z<n><bs><n><tz>HKT<n><of>+0800<n><ot>+0800<n><s>19700101T000000<n><es><n>","20220929T150625Z<n><bs><n><tz>WIB<n><of>+0700<n><ot>+0700<n><s>19700101T000000<n><es><n>","20220929T150625Z<n><bs><n><tz>WIT<n><of>+0900<n><ot>+0900<n><s>19700101T000000<n><es><n>","20220929T150625Z<n><bd><n><tz>IDT<n><of>+0200<n><ot>+0300<n><s>19700327T020000<n><r>FREQ=YEARLY;BYMONTH=3;BYDAY=-1FR<n><ed><n><bs><n><tz>IST<n><of>+0300<n><ot>+0200<n><s>19701025T020000<n><r>FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU<n><es><n>","20220929T150625Z<n><bs><n><tz>+0430<n><of>+0430<n><ot>+0430<n><s>19700101T000000<n><es><n>","20220929T150625Z<n><bs><n><tz>PKT<n><of>+0500<n><ot>+0500<n><s>19700101T000000<n><es><n>","20220929T150625Z<n><bs><n><tz>+0545<n><of>+0545<n><ot>+0545<n><s>19700101T000000<n><es><n>","20220929T150625Z<n><bs><n><tz>IST<n><of>+0530<n><ot>+0530<n><s>19700101T000000<n><es><n>","20220929T150625Z<n><bs><n><tz>CST<n><of>+0800<n><ot>+0800<n><s>19700101T000000<n><es><n>","20220929T150625Z<n><bs><n><tz>WITA<n><of>+0800<n><ot>+0800<n><s>19700101T000000<n><es><n>","20220929T150625Z<n><bs><n><tz>PST<n><of>+0800<n><ot>+0800<n><s>19700101T000000<n><es><n>","20220929T150625Z<n><bs><n><tz>EET<n><of>+0300<n><ot>+0200<n><s>19701025T040000<n><r>FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU<n><es><n><bd><n><tz>EEST<n><of>+0200<n><ot>+0300<n><s>19700329T030000<n><r>FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU<n><ed><n>","20220929T150625Z<n><bs><n><tz>KST<n><of>+0900<n><ot>+0900<n><s>19700101T000000<n><es><n>","20220929T150625Z<n><bs><n><tz>+0330<n><of>+0330<n><ot>+0330<n><s>19700101T000000<n><es><n>","20220929T150625Z<n><bs><n><tz>JST<n><of>+0900<n><ot>+0900<n><s>19700101T000000<n><es><n>","20220929T150625Z<n><bs><n><tz>+10<n><of>+1000<n><ot>+1000<n><s>19700101T000000<n><es><n>","20220929T150625Z<n><bs><n><tz>+0630<n><of>+0630<n><ot>+0630<n><s>19700101T000000<n><es><n>","20220929T150625Z<n><bd><n><tz>WEST<n><of>+0000<n><ot>+0100<n><s>19700329T010000<n><r>FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU<n><ed><n><bs><n><tz>WET<n><of>+0100<n><ot>+0000<n><s>19701025T020000<n><r>FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU<n><es><n>","20220929T150625Z<n><bs><n><tz>-01<n><of>-0100<n><ot>-0100<n><s>19700101T000000<n><es><n>","20220929T150625Z<n><bs><n><tz>ACST<n><of>+1030<n><ot>+0930<n><s>19700405T030000<n><r>FREQ=YEARLY;BYMONTH=4;BYDAY=1SU<n><es><n><bd><n><tz>ACDT<n><of>+0930<n><ot>+1030<n><s>19701004T020000<n><r>FREQ=YEARLY;BYMONTH=10;BYDAY=1SU<n><ed><n>","20220929T150625Z<n><bs><n><tz>AEST<n><of>+1000<n><ot>+1000<n><s>19700101T000000<n><es><n>","20220929T150625Z<n><bs><n><tz>ACST<n><of>+0930<n><ot>+0930<n><s>19700101T000000<n><es><n>","20220929T150625Z<n><bs><n><tz>+0845<n><of>+0845<n><ot>+0845<n><s>19700101T000000<n><es><n>","20220929T150625Z<n><bd><n><tz>AEDT<n><of>+1000<n><ot>+1100<n><s>19701004T020000<n><r>FREQ=YEARLY;BYMONTH=10;BYDAY=1SU<n><ed><n><bs><n><tz>AEST<n><of>+1100<n><ot>+1000<n><s>19700405T030000<n><r>FREQ=YEARLY;BYMONTH=4;BYDAY=1SU<n><es><n>","20220929T150625Z<n><bs><n><tz>+1030<n><of>+1100<n><ot>+1030<n><s>19700405T020000<n><r>FREQ=YEARLY;BYMONTH=4;BYDAY=1SU<n><es><n><bd><n><tz>+11<n><of>+1030<n><ot>+1100<n><s>19701004T020000<n><r>FREQ=YEARLY;BYMONTH=10;BYDAY=1SU<n><ed><n>","20220929T150625Z<n><bs><n><tz>AWST<n><of>+0800<n><ot>+0800<n><s>19700101T000000<n><es><n>","20220929T150625Z<n><bs><n><tz>+13<n><of>+1300<n><ot>+1300<n><s>19700101T000000<n><es><n>","20220929T150625Z<n><bs><n><tz>+14<n><of>+1400<n><ot>+1400<n><s>19700101T000000<n><es><n>","20220929T150625Z<n><bs><n><tz>+02<n><of>+0200<n><ot>+0200<n><s>19700101T000000<n><es><n>","20220929T150625Z<n><bs><n><tz>-10<n><of>-1000<n><ot>-1000<n><s>19700101T000000<n><es><n>","20220929T150625Z<n><bs><n><tz>-11<n><of>-1100<n><ot>-1100<n><s>19700101T000000<n><es><n>","20220929T150625Z<n><bs><n><tz>-12<n><of>-1200<n><ot>-1200<n><s>19700101T000000<n><es><n>","20220929T150625Z<n><bs><n><tz>-06<n><of>-0600<n><ot>-0600<n><s>19700101T000000<n><es><n>","20220929T150625Z<n><bs><n><tz>-07<n><of>-0700<n><ot>-0700<n><s>19700101T000000<n><es><n>","20220929T150625Z<n><bs><n><tz>-08<n><of>-0800<n><ot>-0800<n><s>19700101T000000<n><es><n>","20220929T150625Z<n><bs><n><tz>-09<n><of>-0900<n><ot>-0900<n><s>19700101T000000<n><es><n>","20220929T150625Z<n><bs><n><tz>UTC<n><of>+0000<n><ot>+0000<n><s>19700101T000000<n><es><n>","20220929T150625Z<n><bd><n><tz>EEST<n><of>+0200<n><ot>+0300<n><s>19700329T020000<n><r>FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU<n><ed><n><bs><n><tz>EET<n><of>+0300<n><ot>+0200<n><s>19701025T030000<n><r>FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU<n><es><n>","20220929T150625Z<n><bs><n><tz>IST<n><of>+0000<n><ot>+0100<n><s>19700329T010000<n><r>FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU<n><es><n><bd><n><tz>GMT<n><of>+0100<n><ot>+0000<n><s>19701025T020000<n><r>FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU<n><ed><n>","20220929T150625Z<n><bs><n><tz>WET<n><of>+0100<n><ot>+0000<n><s>19701025T020000<n><r>FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU<n><es><n><bd><n><tz>WEST<n><of>+0000<n><ot>+0100<n><s>19700329T010000<n><r>FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU<n><ed><n>","20220929T150625Z<n><bd><n><tz>BST<n><of>+0000<n><ot>+0100<n><s>19700329T010000<n><r>FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU<n><ed><n><bs><n><tz>GMT<n><of>+0100<n><ot>+0000<n><s>19701025T020000<n><r>FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU<n><es><n>","20220929T150625Z<n><bs><n><tz>MSK<n><of>+0300<n><ot>+0300<n><s>19700101T000000<n><es><n>","20220929T150625Z<n><bs><n><tz>HST<n><of>-1000<n><ot>-1000<n><s>19700101T000000<n><es><n>","20220929T150625Z<n><bd><n><tz>MEST<n><of>+0100<n><ot>+0200<n><s>19700329T020000<n><r>FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU<n><ed><n><bs><n><tz>MET<n><of>+0200<n><ot>+0100<n><s>19701025T030000<n><r>FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU<n><es><n>","20220929T150625Z<n><bd><n><tz>NZDT<n><of>+1200<n><ot>+1300<n><s>19700927T020000<n><r>FREQ=YEARLY;BYMONTH=9;BYDAY=-1SU<n><ed><n><bs><n><tz>NZST<n><of>+1300<n><ot>+1200<n><s>19700405T030000<n><r>FREQ=YEARLY;BYMONTH=4;BYDAY=1SU<n><es><n>","20220929T150625Z<n><bd><n><tz>+1345<n><of>+1245<n><ot>+1345<n><s>19700927T024500<n><r>FREQ=YEARLY;BYMONTH=9;BYDAY=-1SU<n><ed><n><bs><n><tz>+1245<n><of>+1345<n><ot>+1245<n><s>19700405T034500<n><r>FREQ=YEARLY;BYMONTH=4;BYDAY=1SU<n><es><n>","20220929T150625Z<n><bs><n><tz>-06<n><of>-0500<n><ot>-0600<n><s>19700404T220000<n><r>FREQ=YEARLY;BYMONTH=4;BYDAY=1SA<n><es><n><bd><n><tz>-05<n><of>-0600<n><ot>-0500<n><s>19700905T220000<n><r>FREQ=YEARLY;BYMONTH=9;BYDAY=1SA<n><ed><n>","20220929T150625Z<n><bd><n><tz>+13<n><of>+1200<n><ot>+1300<n><s>19701108T020000<n><r>FREQ=YEARLY;BYMONTH=11;BYDAY=2SU<n><ed><n><bs><n><tz>+12<n><of>+1300<n><ot>+1200<n><s>19700118T030000<n><r>FREQ=YEARLY;BYMONTH=1;BYDAY=-2SU<n><es><n>","20220929T150625Z<n><bs><n><tz>ChST<n><of>+1000<n><ot>+1000<n><s>19700101T000000<n><es><n>","20220929T150625Z<n><bs><n><tz>-0930<n><of>-0930<n><ot>-0930<n><s>19700101T000000<n><es><n>","20220929T150625Z<n><bd><n><tz>+12<n><of>+1100<n><ot>+1200<n><s>19701004T020000<n><r>FREQ=YEARLY;BYMONTH=10;BYDAY=1SU<n><ed><n><bs><n><tz>+11<n><of>+1200<n><ot>+1100<n><s>19700405T030000<n><r>FREQ=YEARLY;BYMONTH=4;BYDAY=1SU<n><es><n>","20220929T150625Z<n><bs><n><tz>SST<n><of>-1100<n><ot>-1100<n><s>19700101T000000<n><es><n>"];
function tzlib_get_content(tzName) {
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
