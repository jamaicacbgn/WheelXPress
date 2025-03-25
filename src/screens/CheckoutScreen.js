import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
  Alert,
  Modal,
  SectionList,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Picker } from "@react-native-picker/picker";
import styles from "../styles/styles"; 

const CheckoutScreen = ({ route, navigation }) => {
  const { cartItems = [] } = route.params;
  const citiesByProvince = {
    Abra: [
      "Bangued",
      "Boliney",
      "Bucay",
      "Bucloc",
      "Daguioman",
      "Danglas",
      "Dolores",
      "La Paz",
      "Lacub",
      "Lagangilang",
      "Lagayan",
      "Langiden",
      "Licuan-Baay",
      "Luba",
      "Malibcong",
      "Manabo",
      "Peñarrubia",
      "Pidigan",
      "Pilar",
      "Sallapadan",
      "San Isidro",
      "San Juan",
      "San Quintin",
      "Tayum",
      "Tineg",
      "Tubo",
      "Villaviciosa"
    ],
    AgusandelNorte: [
      "Buenavista",
      "Butuan City",
      "Cabadbaran City",
      "Carmen",
      "Jabonga",
      "Kitcharao",
      "Las Nievas",
      "Magallanes",
      "Nasipit",
      "Remedios T. Romualdez",
      "Santiago",
      "Tubay"
    ],
    AgusandelSur: [
      "Bayugan City",
      "Bunawan",
      "Esperanza",
      "La Paz",
      "Loreto",
      "Prosperidad",
      "Rosario",
      "San Francisco",
      "San Luis",
      "Santa Josefa",
      "Sibagat",
      "Talacogon",
      "Trento",
      "Veruela"
    ],
    Aklan: [
      "Altavas",
      "Balete",
      "Banga",
      "Batan",
      "Buruanga",
      "Ibajay",
      "Kalibo",
      "Lezo",
      "Libacao",
      "Madalag",
      "Makato",
      "Malay",
      "Maliano",
      "Nabas",
      "New Washington",
      "Numancia",
      "Tangalan"
    ],
    Albay: [
      "Bacacay",
      "Camalig",
      "Daraga",
      "Guinobatan",
      "Jovellar",
      "Legazpi City",
      "Libon",
      "Liago City",
      "Malilipot",
      "Malinao",
      "Manito",
      "Oas",
      "Pio Duran",
      "Polangui",
      "Rapu-Rapu",
      "Santo Domingo",
      "Tabaco City",
      "Tiwi"
    ],
    Antique: [
      "Anini-Y",
      "Barbaza",
      "Belison",
      "Bugasong",
      "Caluya",
      "Culasi",
      "Hamtic",
      "Laua-An",
      "Libertad",
      "Pandan",
      "Patnongon",
      "San Jose",
      "San Remigio",
      "Sebaste",
      "Sibalom",
      "Tibiao",
      "Tobias Fornier",
      "Valderrama"  
    ],
    Apayao: [
      "Calanasan",
      "Conner",
      "Flora",
      "Kabugao",
      "Luna",
      "Pudtol",
      "Santa Marcela"
    ],
    Aurora: [
      "Baler",
      "Casiguran",
      "Dilasag",
      "Dinalungan",
      "Dingalan",
      "Dipaculao",
      "Maria Aurora",
      "San Luis",
    ],
    Basilan: [
      "Akbar",
      "Al-Barka",
      "Hadji Mohammad Ajul",
      "Hadji Muhtamad",
      "Isabela City",
      "Lamitan City",
      "Lantawan",
      "Maluso",
      "Sumisip",
      "Tabuan-Lasa",
      "Tipo-Tipo",
      "Tuburan",
      "Ungkaya-Pukan"
    ],
    Bataan: [
      "Abucay",
      "Bagac",
      "Balanga City",
      "Dinalupihan",
      "Hermosa",
      "Limay",
      "Martiveles",
      "Morong",
      "Orani",
      "Orion",
      "Pilar",
      "Samal"
    ],
    Batanes: [
      "Basco",
      "Itbayat",
      "Ivana",
      "Mahatao",
      "Sabtang",
      "Uyugan"
    ],
    Batangas: [
      "Agoncillo",
      "ALitagtag",
      "Balayan",
      "Balete",
      "Batangas City",
      "Bauan",
      "Calaca City",
      "Calatagan",
      "Cuenca",
      "Ibaan",
      "Laurel",
      "Lemery",
      "Lian",
      "Lipa City",
      "Lobo",
      "Mabini",
      "Malbar",
      "Mataasnakahoy",
      "Nasugbu",
      "Padre Garcia",
      "Rosario",
      "San Jose",
      "San Juan",
      "San Luis",
      "San Nicolas",
      "San Pascual",
      "Santa Teresita",
      "Sto. Tomas City",
      "Taal",
      "Talisay",
      "Tanauan City",
      "Taysan",
      "Tingloy",
      "Tuy"
    ],
    Benguet: [
      "Atok",
      "Baguio",
      "Bakun",
      "Bokod",
      "Buguias",
      "Itogon",
      "Kabayan",
      "Kapangan",
      "Kibungan",
      "La Trinidad",
      "Mankayan",
      "Sablan",
      "Tuba",
      "Tublay"
    ],
    Biliran: [
      "Almeria",
      "Biliran",
      "Cabucgayan",
      "Caibiran",
      "Culaba",
      "Kawayan",
      "Maripipi",
      "Naval"
    ],
    Bohol: [
      "Alburquerque",
      "Alicia",
      "Anda",
      "Antequera",
      "Baclayon",
      "Balilihan",
      "Batuan",
      "Bien Unido",
      "Bilar",
      "Buenavista",
      "Calape",
      "Candijay",
      "Carmen",
      "Catigbian",
      "Clarin",
      "Corella",
      "Cortes",
      "Dagohoy",
      "Danao",
      "Dauis",
      "Dimiao",
      "Duero",
      "Garcia Hernandez",
      "Getafe",
      "Guindulman",
      "Inabanga",
      "Jagna",
      "Lila",
      "Loay",
      "Loboc",
      "Loon",
      "Mabini",
      "Maribojoc",
      "Panglao",
      "Pilar",
      "President Carlos P. Garcia",
      "Sagbayan",
      "San Isidro",
      "San Miguel",
      "Sevilla",
      "Sierra Bullones",
      "Sikatuna",
      "Tagbilaran",
      "Talibon",
      "Trinidad",
      "Tubigon",
      "Ubay",
      "Valencia"
    ],
    Bukidnon: [
      "Baungon",
      "Cabanglasan",
      "Damulog",
      "Dangcagan",
      "Don Carlos",
      "Impasugong",
      "Kadingilan",
      "Kalilangan",
      "Kibawe",
      "Kitaotao",
      "Lantapan",
      "Libona",
      "Malaybalay",
      "Malitbog",
      "Manolo Fortich",
      "Maramag",
      "Pangantucan",
      "Quezon",
      "San Fernando",
      "Sumilao",
      "Talakag",
      "Valencia"
    ],
    Bulacan: [
      "Angat",
      "Balagtas",
      "Baliwag",
      "Bocaue",
      "Bulakan",
      "Bustos",
      "Calumpit",
      "Doña Remedios Trinidad",
      "Guiguinto",
      "Hagonoy",
      "Malolos",
      "Marilao",
      "Meycauayan",
      "Norzagaray",
      "Obando",
      "Pandi",
      "Paombong",
      "Plaridel",
      "Pulilan",
      "San Ildefonso",
      "San Jose del Monte",
      "San Miguel",
      "San Rafael",
      "Santa Maria"
    ],
     Cagayan: [
      "Abulug",
      "Alcala",
      "Allacapan",
      "Amulung",
      "Aparri",
      "Baggao",
      "Ballesteros",
      "Buguey",
      "Calayan",
      "Camalaniugan",
      "Claveria",
      "Enrile",
      "Gattaran",
      "Gonzaga",
      "Iguig",
      "Lal-lo",
      "Lasam",
      "Pamplona",
      "Peñablanca",
      "Piat",
      "Rizal",
      "Sanchez-Mira",
      "Santa Ana",
      "Santa Praxedes",
      "Santa Teresita",
      "Santo Niño",
      "Solana",
      "Tuao",
      "Tuguegarao*"
    ],
    CamarinesNorte: [
      "Basud",
      "Capalonga",
      "Daet",
      "Jose Panganiban",
      "Labo",
      "Mercedes",
      "Paracale",
      "San Lorenzo Ruiz",
      "San Vicente",
      "Santa Elena",
      "Talisay",
      "Vinzons"
    ],
    CamarinesSur: [
    "Baao",
    "Balatan",
    "Bato",
    "Bombon",
    "Buhi",
    "Bula",
    "Cabusao",
    "Calabanga",
    "Camaligan",
    "Canaman",
    "Caramoan",
    "Del Gallego",
    "Gainza",
    "Garchitorena",
    "Goa",
    "Iriga",
    "Lagonoy",
    "Libmanan",
    "Lupi",
    "Magarao",
    "Milaor",
    "Minalabac",
    "Nabua",
    "Naga",
    "Ocampo",
    "Pamplona",
    "Pasacao",
    "Pili",
    "Presentacion",
    "Ragay",
    "Sagñay",
    "San Fernando",
    "San Jose",
    "Sipocot",
    "Siruma",
    "Tigaon",
    "Tinambac"
  ],  
  Camiguin: [
    "Catarman",
    "Guinsiliban",
    "Mahinog",
    "Mambajao",
    "Sagay"
  ],
  Capiz: [
    "Cuartero",
    "Dao",
    "Dumalag",
    "Dumarao",
    "Ivisan",
    "Jamindan",
    "Ma-ayon",
    "Mambusao",
    "Panay",
    "Panitan",
    "Pilar",
    "Pontevedra",
    "President Roxas",
    "Roxas",
    "Sapian",
    "Sigma",
    "Tapaz"
  ],
  Catanduanes: [
    "Bagamanoc",
    "Baras",
    "Bato",
    "Caramoran",
    "Gigmoto",
    "Pandan",
    "Panganiban",
    "San Andres",
    "San Miguel",
    "Viga",
    "Virac"
  ],
  Cavite: [
    "Alfonso",
    "Amadeo",
    "Bacoor",
    "Carmona",
    "Cavite City",
    "Dasmariñas",
    "General Emilio Aguinaldo",
    "General Mariano Alvarez",
    "General Trias",
    "Imus",
    "Indang",
    "Kawit",
    "Magallanes",
    "Maragondon",
    "Mendez",
    "Naic",
    "Noveleta",
    "Rosario",
    "Silang",
    "Tagaytay",
    "Tanza",
    "Ternate",
    "Trece Martires"
  ],
  Cebu: [
    "Alcantara",
    "Alcoy",
    "Alegria",
    "Aloguinsan",
    "Argao",
    "Asturias",
    "Badian",
    "Balamban",
    "Bantayan",
    "Barili",
    "Bogo",
    "Boljoon",
    "Borbon",
    "Carcar",
    "Carmen",
    "Catmon",
    "Cebu City",
    "Compostela",
    "Consolacion",
    "Cordova",
    "Daanbantayan",
    "Dalaguete",
    "Danao",
    "Dumanjug",
    "Ginatilan",
    "Lapu-Lapu",
    "Liloan",
    "Madridejos",
    "Malabuyoc",
    "Mandaue",
    "Medellin",
    "Minglanilla",
    "Moalboal",
    "Naga",
    "Oslob",
    "Pilar",
    "Pinamungajan",
    "Poro",
    "Ronda",
    "Samboan",
    "San Fernando",
    "San Francisco",
    "San Remigio",
    "Santa Fe",
    "Santander",
    "Sibonga",
    "Sogod",
    "Tabogon",
    "Tabuelan",
    "Talisay",
    "Toledo",
    "Tuburan",
    "Tudela"
  ],
  Cotabato: [
    "Alamada",
    "Aleosan",
    "Antipas",
    "Arakan",
    "Banisilan",
    "Carmen",
    "Kabacan",
    "Kadayangan",
    "Kapalawan",
    "Kidapawan",
    "Libungan",
    "Ligawasan",
    "M'lang",
    "Magpet",
    "Makilala",
    "Malidegao",
    "Matalam",
    "Midsayap",
    "Nabalawag",
    "Old Kaabakan",
    "Pahamuddin",
    "Pigcawayan",
    "Pikit",
    "President Roxas",
    "Tugunan",
    "Tulunan"
  ],
  DavaoOccidental: [
    "Don Marcelino",
    "Jose Abad Santos",
    "Malita",
    "Santa Maria",
    "Sarangani"
  ],
  DavaoOriental: [
    "Baganga",
    "Banaybanay",
    "Boston",
    "Caraga",
    "Cateel",
    "Governor Generoso",
    "Lupon",
    "Manay",
    "Mati",
    "San Isidro",
    "Tarragona"
  ],
  DavaodeOro: [
    "Compostela",
    "Laak",
    "Mabini",
    "Maco",
    "Maragusan",
    "Mawab",
    "Monkayo",
    "Montevista",
    "Nabunturan",
    "New Bataan",
    "Pantukan"
  ],
  DavaodelNorte: [
    "Asuncion",
    "Braulio E. Dujali",
    "Carmen",
    "Kapalong",
    "New Corella",
    "Panabo",
    "Samal",
    "San Isidro",
    "Santo Tomas",
    "Tagum",
    "Talaingod"
  ],
  DavaodelSur: [
    "Bansalan",
    "Davao City",
    "Digos",
    "Hagonoy",
    "Kiblawan",
    "Magsaysay",
    "Malalag",
    "Matanao",
    "Padada",
    "Santa Cruz",
    "Sulop"
  ],
  DinagatIslands: [
    "Basilisa",
    "Cagdianao",
    "Dinagat",
    "Libjo",
    "Loreto",
    "San Jose",
    "Tubajon"
  ],
  EasternSamar: [
    "Arteche",
    "Balangiga",
    "Balangkayan",
    "Borongan",
    "Can-avid",
    "Dolores",
    "General MacArthur",
    "Giporlos",
    "Guiuan",
    "Hernani",
    "Jipapad",
    "Lawaan",
    "Llorente",
    "Maslog",
    "Maydolong",
    "Mercedes",
    "Oras",
    "Quinapondan",
    "Salcedo",
    "San Julian",
    "San Policarpo",
    "Sulat",
    "Taft"
  ],
  Guimaras: [
    "Buenavista",
    "Jordan",
    "Nueva Valencia",
    "San Lorenzo",
    "Sibunag"
  ],
  Ifugao: [
    "Aguinaldo",
    "Alfonso Lista",
    "Asipulo",
    "Banaue",
    "Hingyon",
    "Hungduan",
    "Kiangan",
    "Lagawe",
    "Lamut",
    "Mayoyao",
    "Tinoc"
  ],
  IlocosNorte: [
    "Adams",
    "Bacarra",
    "Badoc",
    "Bangui",
    "Banna",
    "Batac",
    "Burgos",
    "Carasi",
    "Currimao",
    "Dingras",
    "Dumalneg",
    "Laoag",
    "Marcos",
    "Nueva Era",
    "Pagudpud",
    "Paoay",
    "Pasuquin",
    "Piddig",
    "Pinili",
    "San Nicolas",
    "Sarrat",
    "Solsona",
    "Vintar"
  ],
  IlocosSur: [
    "Alilem",
    "Banayoyo",
    "Bantay",
    "Burgos",
    "Cabugao",
    "Candon",
    "Caoayan",
    "Cervantes",
    "Galimuyod",
    "Gregorio del Pilar",
    "Lidlidda",
    "Magsingal",
    "Nagbukel",
    "Narvacan",
    "Quirino",
    "Salcedo",
    "San Emilio",
    "San Esteban",
    "San Ildefonso",
    "San Juan",
    "San Vicente",
    "Santa Catalina",
    "Santa Cruz",
    "Santa Lucia",
    "Santa Maria",
    "Santa",
    "Santiago",
    "Santo Domingo",
    "Sigay",
    "Sinait",
    "Sugpon",
    "Suyo",
    "Tagudin",
    "Vigan"
  ],
  Iloilo: [
    "Ajuy",
    "Alimodian",
    "Anilao",
    "Badiangan",
    "Balasan",
    "Banate",
    "Barotac Nuevo",
    "Barotac Viejo",
    "Batad",
    "Bingawan",
    "Cabatuan",
    "Calinog",
    "Carles",
    "Concepcion",
    "Dingle",
    "Dueñas",
    "Dumangas",
    "Estancia",
    "Guimbal",
    "Igbaras",
    "Iloilo City*",
    "Janiuay",
    "Lambunao",
    "Leganes",
    "Lemery",
    "Leon",
    "Maasin",
    "Miagao",
    "Mina",
    "New Lucena",
    "Oton",
    "Passi",
    "Pavia",
    "Pototan",
    "San Dionisio",
    "San Enrique",
    "San Joaquin",
    "San Miguel",
    "San Rafael",
    "Santa Barbara",
    "Sara",
    "Tigbauan",
    "Tubungan",
    "Zarraga"
  ],
  Isabela: [
    "Alicia",
    "Angadanan",
    "Aurora",
    "Benito Soliven",
    "Burgos",
    "Cabagan",
    "Cabatuan",
    "Cauayan",
    "Cordon",
    "Delfin Albano",
    "Dinapigue",
    "Divilacan",
    "Echague",
    "Gamu",
    "Ilagan*",
    "Jones",
    "Luna",
    "Maconacon",
    "Mallig",
    "Naguilian",
    "Palanan",
    "Quezon",
    "Quirino",
    "Ramon",
    "Reina Mercedes",
    "Roxas",
    "San Agustin",
    "San Guillermo",
    "San Isidro",
    "San Manuel",
    "San Mariano",
    "San Mateo",
    "San Pablo",
    "Santa Maria",
    "Santiago",
    "Santo Tomas",
    "Tumauini"
  ],
  Kalinga: [
    "Balbalan",
    "Lubuagan",
    "Pasil",
    "Pinukpuk",
    "Rizal",
    "Tabuk",
    "Tanudan",
    "Tinglayan"
  ],
  LaUnion: [
    "Agoo",
    "Aringay",
    "Bacnotan",
    "Bagulin",
    "Balaoan",
    "Bangar",
    "Bauang",
    "Burgos",
    "Caba",
    "Luna",
    "Naguilian",
    "Pugo",
    "Rosario",
    "San Fernando",
    "San Gabriel",
    "San Juan",
    "Santo Tomas",
    "Santol",
    "Sudipen",
    "Tubao"
  ],
  Laguna: [
    "Alaminos",
    "Bay",
    "Biñan",
    "Cabuyao",
    "Calamba",
    "Calauan",
    "Cavinti",
    "Famy",
    "Kalayaan",
    "Liliw",
    "Los Baños",
    "Luisiana",
    "Lumban",
    "Mabitac",
    "Magdalena",
    "Majayjay",
    "Nagcarlan",
    "Paete",
    "Pagsanjan",
    "Pakil",
    "Pangil",
    "Pila",
    "Rizal",
    "San Pablo",
    "San Pedro",
    "Santa Cruz",
    "Santa Maria",
    "Santa Rosa",
    "Siniloan",
    "Victoria"
  ],
  LanaodelNorte: [
    "Bacolod",
    "Balo-i",
    "Baroy",
    "Iligan",
    "Kapatagan",
    "Kauswagan",
    "Kolambugan",
    "Lala",
    "Linamon",
    "Magsaysay",
    "Maigo",
    "Matungao",
    "Munai",
    "Nunungan",
    "Pantao Ragat",
    "Pantar",
    "Poona Piagapo",
    "Salvador",
    "Sapad",
    "Sultan Naga Dimaporo",
    "Tagoloan",
    "Tangcal",
    "Tubod"
  ],
  LanaodelSur: [
    "Amai Manabilang",
    "Bacolod-Kalawi",
    "Balabagan",
    "Balindong",
    "Bayang",
    "Binidayan",
    "Buadiposo-Buntong",
    "Bubong",
    "Butig",
    "Calanogas",
    "Ditsaan-Ramain",
    "Ganassi",
    "Kapai",
    "Kapatagan",
    "Lumba-Bayabao",
    "Lumbaca-Unayan",
    "Lumbatan",
    "Lumbayanague",
    "Madalum",
    "Madamba",
    "Maguing",
    "Malabang",
    "Marantao",
    "Marawi",
    "Marogong",
    "Masiu",
    "Mulondo",
    "Pagayawan",
    "Piagapo",
    "Picong",
    "Poona Bayabao",
    "Pualas",
    "Saguiaran",
    "Sultan Dumalondong",
    "Tagoloan II",
    "Tamparan",
    "Taraka",
    "Tubaran",
    "Tugaya",
    "Wao"
  ],
  Leyte: [
    "Abuyog",
    "Alangalang",
    "Albuera",
    "Babatngon",
    "Barugo",
    "Bato",
    "Baybay",
    "Burauen",
    "Calubian",
    "Capoocan",
    "Carigara",
    "Dagami",
    "Dulag",
    "Hilongos",
    "Hindang",
    "Inopacan",
    "Isabel",
    "Jaro",
    "Javier",
    "Julita",
    "Kananga",
    "La Paz",
    "Leyte",
    "MacArthur",
    "Mahaplag",
    "Matag-ob",
    "Matalom",
    "Mayorga",
    "Merida",
    "Ormoc",
    "Palo",
    "Palompon",
    "Pastrana",
    "San Isidro",
    "San Miguel",
    "Santa Fe",
    "Tabango",
    "Tabontabon",
    "Tacloban",
    "Tanauan",
    "Tolosa",
    "Tunga",
    "Villaba"
  ],
  Maguindanao: [
    "Ampatuan",
    "Barira",
    "Buldon",
    "Buluan",
    "Cotabato City",
    "Datu Abdullah Sangki",
    "Datu Anggal Midtimbang",
    "Datu Blah T. Sinsuat",
    "Datu Hoffer Ampatuan",
    "Datu Montawal",
    "Datu Odin Sinsuat",
    "Datu Paglas",
    "Datu Piang",
    "Datu Salibo",
    "Datu Saudi-Ampatuan",
    "Datu Unsay",
    "General Salipada K. Pendatun",
    "Guindulungan",
    "Kabuntalan",
    "Mamasapano",
    "Mangudadatu",
    "Matanog",
    "Northern Kabuntalan",
    "Pagalungan",
    "Paglat",
    "Pandag",
    "Parang",
    "Rajah Buayan",
    "Shariff Aguak",
    "Shariff Saydona Mustapha",
    "South Upi",
    "Sultan Kudarat",
    "Sultan Mastura",
    "Sultan sa Barongis",
    "Talayan",
    "Talitay",
    "Upi"
  ],
    Manila: [
      "Binondo",
      "Caloocan City",
      "Ermita",
      "Intramuros",
      "Las Piñas City",
      "Makati City",
      "Malabon City",
      "Malate",
      "Mandaluyong City",
      "Marikina City",
      "Muntinlupa City",
      "Navotas City",
      "Paco",
      "Pandacan",
      "Parañaque City",
      "Pasay City",
      "Pasig City",
      "Pateros",
      "Port Area",
      "Quezon City",
      "Quiapo",
      "Sampaloc",
      "San Juan City",
      "San Miguel",
      "San Nicolas",
      "Santa Ana",
      "Santa Cruz",
      "Taguig City",
      "Tondo I/II",
      "Valenzuela City",
    ],
    Marinduque: [
      "Boac",
      "Buenavista",
      "Gasan",
      "Mogpog",
      "Santa Cruz",
      "Torrijos",
    ],
    Masbate: [
      "Aroroy",
      "Baleno",
      "Balud",
      "Batuan",
      "Cataingan",
      "Cawayan",
      "Claveria",
      "Dimasalang",
      "Esperanza",
      "Mandaon",
      "Masbate City",
      "Milagros",
      "Mobo",
      "Monreal",
      "Palanas",
      "Pio V. Corpus",
      "Placer",
      "San Fernando",
      "San Jacinto",
      "San Pascual",
      "Uson"
    ],
    MisamisOccidental: [
    "Aloran",
    "Baliangao",
    "Bonifacio",
    "Calamba",
    "Clarin",
    "Concepcion",
    "Don Victoriano Chiongbian",
    "Jimenez",
    "Lopez Jaena",
    "Oroquieta",
    "Ozamiz",
    "Panaon",
    "Plaridel",
    "Sapang Dalaga",
    "Sinacaban",
    "Tangub",
    "Tudela"
  ],
  MisamisOriental: [
    "Alubijid",
    "Balingasag",
    "Balingoan",
    "Binuangan",
    "Cagayan de Oro",
    "Claveria",
    "El Salvador",
    "Gingoog",
    "Gitagum",
    "Initao",
    "Jasaan",
    "Kinoguitan",
    "Lagonglong",
    "Laguindingan",
    "Libertad",
    "Lugait",
    "Magsaysay",
    "Manticao",
    "Medina",
    "Naawan",
    "Opol",
    "Salay",
    "Sugbongcogon",
    "Tagoloan",
    "Talisayan",
    "Villanueva"
  ],
  MountainProvince: [
    "Barlig",
    "Bauko",
    "Besao",
    "Bontoc",
    "Natonin",
    "Paracelis",
    "Sabangan",
    "Sadanga",
    "Sagada",
    "Tadian"
  ],
  NegrosOccidental: [
    "Bacolod",
    "Bago",
    "Binalbagan",
    "Cadiz",
    "Calatrava",
    "Candoni",
    "Cauayan",
    "Don Salvador Benedicto",
    "Enrique B. Magalona",
    "Escalante",
    "Himamaylan",
    "Hinigaran",
    "Hinoba-an",
    "Ilog",
    "Isabela",
    "Kabankalan",
    "La Carlota",
    "La Castellana",
    "Manapla",
    "Moises Padilla",
    "Murcia",
    "Pontevedra",
    "Pulupandan",
    "Sagay",
    "San Carlos",
    "San Enrique",
    "Silay",
    "Sipalay",
    "Talisay",
    "Toboso",
    "Valladolid",
    "Victorias"
  ],
  NegrosOriental: [
    "Amlan",
    "Ayungon",
    "Bacong",
    "Bais",
    "Basay",
    "Bayawan",
    "Bindoy",
    "Canlaon",
    "Dauin",
    "Dumaguete",
    "Guihulngan",
    "Jimalalud",
    "La Libertad",
    "Mabinay",
    "Manjuyod",
    "Pamplona",
    "San Jose",
    "Santa Catalina",
    "Siaton",
    "Sibulan",
    "Tanjay",
    "Tayasan",
    "Valencia",
    "Vallehermoso",
    "Zamboanguita"
  ],
  NorthernSamar: [
    "Allen",
    "Biri",
    "Bobon",
    "Capul",
    "Catarman",
    "Catubig",
    "Gamay",
    "Laoang",
    "Lapinig",
    "Las Navas",
    "Lavezares",
    "Lope de Vega",
    "Mapanas",
    "Mondragon",
    "Palapag",
    "Pambujan",
    "Rosario",
    "San Antonio",
    "San Isidro",
    "San Jose",
    "San Roque",
    "San Vicente",
    "Silvino Lobos",
    "Victoria"
  ],
  NuevaEcija: [
    "Aliaga",
    "Bongabon",
    "Cabanatuan",
    "Cabiao",
    "Carranglan",
    "Cuyapo",
    "Gabaldon",
    "Gapan",
    "General Mamerto Natividad",
    "General Tinio",
    "Guimba",
    "Jaen",
    "Laur",
    "Licab",
    "Llanera",
    "Lupao",
    "Muñoz",
    "Nampicuan",
    "Palayan",
    "Pantabangan",
    "Peñaranda",
    "Quezon",
    "Rizal",
    "San Antonio",
    "San Isidro",
    "San Jose",
    "San Leonardo",
    "Santa Rosa",
    "Santo Domingo",
    "Talavera",
    "Talugtug",
    "Zaragoza"
  ],
  NuevaVizcaya: [
    "Alfonso Castañeda",
    "Ambaguio",
    "Aritao",
    "Bagabag",
    "Bambang",
    "Bayombong",
    "Diadi",
    "Dupax del Norte",
    "Dupax del Sur",
    "Kasibu",
    "Kayapa",
    "Quezon",
    "Santa Fe",
    "Solano",
    "Villaverde"
  ],
  OccidentalMindoro: [
    "Abra de Ilog",
    "Calintaan",
    "Looc",
    "Lubang",
    "Magsaysay",
    "Mamburao",
    "Paluan",
    "Rizal",
    "Sablayan",
    "San Jose",
    "Santa Cruz"
  ],
  OrientalMindoro: [
    "Baco",
    "Bansud",
    "Bongabong",
    "Bulalacao",
    "Calapan",
    "Gloria",
    "Mansalay",
    "Naujan",
    "Pinamalayan",
    "Pola",
    "Puerto Galera",
    "Roxas",
    "San Teodoro",
    "Socorro",
    "Victoria"
  ],
  Palawan: [
    "Aborlan",
    "Agutaya",
    "Araceli",
    "Balabac",
    "Bataraza",
    "Brooke's Point",
    "Busuanga",
    "Cagayancillo",
    "Coron",
    "Culion",
    "Cuyo",
    "Dumaran",
    "El Nido",
    "Kalayaan",
    "Linapacan",
    "Magsaysay",
    "Narra",
    "Puerto Princesa",
    "Quezon",
    "Rizal",
    "Roxas",
    "San Vicente",
    "Sofronio Española",
    "Taytay"
  ],
  Pampanga: [
    "Angeles",
    "Apalit",
    "Arayat",
    "Bacolor",
    "Candaba",
    "Floridablanca",
    "Guagua",
    "Lubao",
    "Mabalacat",
    "Macabebe",
    "Magalang",
    "Masantol",
    "Mexico",
    "Minalin",
    "Porac",
    "San Fernando",
    "San Luis",
    "San Simon",
    "Santa Ana",
    "Santa Rita",
    "Santo Tomas",
    "Sasmuan"
  ],
  Pangasinan: [
    "Agno",
    "Aguilar",
    "Alaminos",
    "Alcala",
    "Anda",
    "Asingan",
    "Balungao",
    "Bani",
    "Basista",
    "Bautista",
    "Bayambang",
    "Binalonan",
    "Binmaley",
    "Bolinao",
    "Bugallon",
    "Burgos",
    "Calasiao",
    "Dagupan",
    "Dasol",
    "Infanta",
    "Labrador",
    "Laoac",
    "Lingayen",
    "Mabini",
    "Malasiqui",
    "Manaoag",
    "Mangaldan",
    "Mangatarem",
    "Mapandan",
    "Natividad",
    "Pozorrubio",
    "Rosales",
    "San Carlos",
    "San Fabian",
    "San Jacinto",
    "San Manuel",
    "San Nicolas",
    "San Quintin",
    "Santa Barbara",
    "Santa Maria",
    "Santo Tomas",
    "Sison",
    "Sual",
    "Tayug",
    "Umingan",
    "Urbiztondo",
    "Urdaneta",
    "Villasis"
  ],
  Quezon: [
    "Agdangan",
    "Alabat",
    "Atimonan",
    "Buenavista",
    "Burdeos",
    "Calauag",
    "Candelaria",
    "Catanauan",
    "Dolores",
    "General Luna",
    "General Nakar",
    "Guinayangan",
    "Gumaca",
    "Infanta",
    "Jomalig",
    "Lopez",
    "Lucban",
    "Lucena",
    "Macalelon",
    "Mauban",
    "Mulanay",
    "Padre Burgos",
    "Pagbilao",
    "Panukulan",
    "Patnanungan",
    "Perez",
    "Pitogo",
    "Plaridel",
    "Polillo",
    "Quezon",
    "Real",
    "Sampaloc",
    "San Andres",
    "San Antonio",
    "San Francisco",
    "San Narciso",
    "Sariaya",
    "Tagkawayan",
    "Tayabas",
    "Tiaong",
    "Unisan"
  ],
  Quirino: [
    "Aglipay",
    "Cabarroguis",
    "Diffun",
    "Maddela",
    "Nagtipunan",
    "Saguday"
  ],
  Rizal: [
    "Angono",
    "Antipolo",
    "Baras",
    "Binangonan",
    "Cainta",
    "Cardona",
    "Jalajala",
    "Morong",
    "Pililla",
    "Rodriguez",
    "San Mateo",
    "Tanay",
    "Taytay",
    "Teresa"
  ],
  Romblon: [
    "Alcantara",
    "Banton",
    "Cajidiocan",
    "Calatrava",
    "Concepcion",
    "Corcuera",
    "Ferrol",
    "Looc",
    "Magdiwang",
    "Odiongan",
    "Romblon",
    "San Agustin",
    "San Andres",
    "San Fernando",
    "San Jose",
    "Santa Fe",
    "Santa Maria"
  ],
  Samar: [
    "Almagro",
    "Basey",
    "Calbayog",
    "Calbiga",
    "Catbalogan",
    "Daram",
    "Gandara",
    "Hinabangan",
    "Jiabong",
    "Marabut",
    "Matuguinao",
    "Motiong",
    "Pagsanghan",
    "Paranas",
    "Pinabacdao",
    "San Jorge",
    "San Jose de Buan",
    "San Sebastian",
    "Santa Margarita",
    "Santa Rita",
    "Santo Niño",
    "Tagapul-an",
    "Talalora",
    "Tarangnan",
    "Villareal",
    "Zumarraga"
  ],
  Sarangani: [
    "Alabel",
    "Glan",
    "Kiamba",
    "Maasim",
    "Maitum",
    "Malapatan",
    "Malungon"
  ],
  Siquijor: [
    "Enrique Villanueva",
    "Larena",
    "Lazi",
    "Maria",
    "San Juan",
    "Siquijor"
  ],
  Sorsogon: [
    "Barcelona",
    "Bulan",
    "Bulusan",
    "Casiguran",
    "Castilla",
    "Donsol",
    "Gubat",
    "Irosin",
    "Juban",
    "Magallanes",
    "Matnog",
    "Pilar",
    "Prieto Diaz",
    "Santa Magdalena",
    "Sorsogon City"
  ],
  SouthCotabato: [
    "Banga",
    "General Santos",
    "Koronadal",
    "Lake Sebu",
    "Norala",
    "Polomolok",
    "Santo Niño",
    "Surallah",
    "T'Boli",
    "Tampakan",
    "Tantangan",
    "Tupi"
  ],
  SouthernLeyte: [
    "Anahawan",
    "Bontoc",
    "Hinunangan",
    "Hinundayan",
    "Libagon",
    "Liloan",
    "Limasawa",
    "Maasin",
    "Macrohon",
    "Malitbog",
    "Padre Burgos",
    "Pintuyan",
    "Saint Bernard",
    "San Francisco",
    "San Juan",
    "San Ricardo",
    "Silago",
    "Sogod",
    "Tomas Oppus"
  ],
  SultanKudarat: [
    "Bagumbayan",
    "Columbio",
    "Esperanza",
    "Isulan",
    "Kalamansig",
    "Lambayong",
    "Lebak",
    "Lutayan",
    "Palimbang",
    "President Quirino",
    "Senator Ninoy Aquino",
    "Tacurong"
  ],
  Sulu: [
    "Banguingui",
    "Hadji Panglima Tahil",
    "Indanan",
    "Jolo",
    "Kalingalan Caluang",
    "Lugus",
    "Luuk",
    "Maimbung",
    "Omar",
    "Panamao",
    "Pandami",
    "Panglima Estino",
    "Pangutaran",
    "Parang",
    "Pata",
    "Patikul",
    "Siasi",
    "Talipao",
    "Tapul"
  ],
  SurigaodelNorte: [
    "Alegria",
    "Bacuag",
    "Burgos",
    "Claver",
    "Dapa",
    "Del Carmen",
    "General Luna",
    "Gigaquit",
    "Mainit",
    "Malimono",
    "Pilar",
    "Placer",
    "San Benito",
    "San Francisco",
    "San Isidro",
    "Santa Monica",
    "Sison",
    "Socorro",
    "Surigao City",
    "Tagana-an",
    "Tubod"
  ],
  SurigaodelSur: [
    "Barobo",
    "Bayabas",
    "Bislig",
    "Cagwait",
    "Cantilan",
    "Carmen",
    "Carrascal",
    "Cortes",
    "Hinatuan",
    "Lanuza",
    "Lianga",
    "Lingig",
    "Madrid",
    "Marihatag",
    "San Agustin",
    "San Miguel",
    "Tagbina",
    "Tago",
    "Tandag"
  ],
  Tarlac: [
    "Anao",
    "Bamban",
    "Camiling",
    "Capas",
    "Concepcion",
    "Gerona",
    "La Paz",
    "Mayantoc",
    "Moncada",
    "Paniqui",
    "Pura",
    "Ramos",
    "San Clemente",
    "San Jose",
    "San Manuel",
    "Santa Ignacia",
    "Tarlac City",
    "Victoria"
  ],
  TawiTawi: [
    "Bongao",
    "Languyan",
    "Mapun",
    "Panglima Sugala",
    "Sapa-Sapa",
    "Sibutu",
    "Simunul",
    "Sitangkai",
    "South Ubian",
    "Tandubas",
    "Turtle Islands"
  ],
  Zambales: [
    "Botolan",
    "Cabangan",
    "Candelaria",
    "Castillejos",
    "Iba",
    "Masinloc",
    "Olongapo",
    "Palauig",
    "San Antonio",
    "San Felipe",
    "San Marcelino",
    "San Narciso",
    "Santa Cruz",
    "Subic"
  ],
  ZamboangaSibugay: [
    "Alicia",
    "Buug",
    "Diplahan",
    "Imelda",
    "Ipil",
    "Kabasalan",
    "Mabuhay",
    "Malangas",
    "Naga",
    "Olutanga",
    "Payao",
    "Roseller Lim",
    "Siay",
    "Talusan",
    "Titay",
    "Tungawan"
  ],
  ZamboangadelNorte: [
    "Baliguian",
    "Dapitan",
    "Dipolog",
    "Godod",
    "Gutalac",
    "Jose Dalman",
    "Kalawit",
    "Katipunan",
    "La Libertad",
    "Labason",
    "Leon B. Postigo",
    "Liloy",
    "Manukan",
    "Mutia",
    "Piñan",
    "Polanco",
    "Rizal",
    "Roxas",
    "Salug",
    "Sergio Osmeña",
    "Siayan",
    "Sibuco",
    "Sibutad",
    "Sindangan",
    "Siocon",
    "Sirawai",
    "Tampilisan"
  ],
  ZamboangadelSur: [
    "Aurora",
    "Bayog",
    "Dimataling",
    "Dinas",
    "Dumalinao",
    "Dumingag",
    "Guipos",
    "Josefina",
    "Kumalarang",
    "Labangan",
    "Lakewood",
    "Lapuyan",
    "Mahayag",
    "Margosatubig",
    "Midsalip",
    "Molave",
    "Pagadian",
    "Pitogo",
    "Ramon Magsaysay",
    "San Miguel",
    "San Pablo",
    "Sominot",
    "Tabina",
    "Tambulig",
    "Tigbao",
    "Tukuran",
    "Vincenzo A. Sagun",
    "Zamboanga City"
  ]
  };

  const [shippingFullName, setShippingFullName] = useState("");
  const [shippingStreet, setShippingStreet] = useState("");

  const defaultCities = ["Manila", "Quezon City", "Caloocan", "Makati"];
  const [shippingCity, setShippingCity] = useState("");
  
  const provinces = [
    "Abra",
    "Agusan del Norte",
    "Agusan del Sur",
    "Aklan",
    "Albay",
    "Antique",
    "Apayao",
    "Aurora",
    "Basilan",
    "Bataan",
    "Batanes",
    "Batangas",
    "Benguet",
    "Biliran",
    "Bohol",
    "Bukidnon",
    "Bulacan",
    "Cagayan",
    "Camarines Norte",
    "Camarines Sur",
    "Camiguin",
    "Capiz",
    "Catanduanes",
    "Cavite",
    "Cebu",
    "Cotabato",
    "Davao Occidental",
    "Davao Oriental",
    "Davao de Oro",
    "Davao del Norte",
    "Davao del Sur",
    "Dinagat Islands",
    "Eastern Samar",
    "Guimaras",
    "Ifugao",
    "Ilocos Norte",
    "Iloco Sur",
    "Iloilo",
    "Isabela",
    "Kalinga",
    "La Union",
    "Laguna",
    "Lanao del Norte",
    "Lanao del Sur",
    "Leyte",
    "Maguindanao",
    "Manila",
    "Marinduque",
    "Masbate",
    "Misamis OCcidental",
    "Misamis Oriental",
    "Mountain Province",
    "Negros Occidental",
    "Negros Oriental",
    "Northern Samar",
    "Nueva Ecija",
    "Nueva Vizcaya",
    "Occidental Mindoro",
    "Oriental Mindoro",
    "Palawan",
    "Pampanga",
    "Pangasinan",
    "Quezon",
    "Quirino",
    "Rizal",
    "Romblon",
    "Samar",
    "Sarangani",
    "Siquijor",
    "Sorsogon",
    "South Cotabato",
    "Southern LEytre",
    "Sultan Kudarat",
    "Sulu",
    "Surigao del Norte",
    "Surigao del Sur",
    "Tarlac",
    "Tawi-tawi",
    "Zambales",
    "Zamboanga Sibugay",
    "Zamboanga del Norte",
    "Zamboanga del Sur",
  ];
  const [shippingProvince, setShippingProvince] = useState("");
  const [shippingPostalCode, setShippingPostalCode] = useState("");
  const [shippingPhone, setShippingPhone] = useState("");

  const [isProvinceModalVisible, setProvinceModalVisible] = useState(false);


  const [paymentMethod, setPaymentMethod] = useState("");
  const [customerNote, setCustomerNote] = useState("");


  const [isPaymentModalVisible, setPaymentModalVisible] = useState(false);
  const [isShippingModalVisible, setShippingModalVisible] = useState(false);


  const shippingFee = 600;
  const totalItemsPrice = cartItems.reduce((sum, item) => {
    const price = item.chosenSize ? item.chosenSize.price : item.price || 0;
    return sum + price * (item.quantity || 1);
  }, 0);
  const total = totalItemsPrice + shippingFee;

  const paymentMethods = [
    { label: "Cash", icon: "money" },
    { label: "Cash on Delivery", icon: "truck" },
    { label: "GCash", icon: "mobile-phone" },
    { label: "PayPal", icon: "paypal" },
    { label: "Maya", icon: "credit-card" },
    { label: "Credit Card", icon: "credit-card-alt" },
  ];

  const cityOptions = citiesByProvince[shippingProvince] || defaultCities;

  const sortedProvinces = [...provinces].sort((a, b) => a.localeCompare(b));
  const groupedProvinces = sortedProvinces.reduce((sections, province) => {
    const firstLetter = province[0].toUpperCase();
    const section = sections.find((s) => s.title === firstLetter);
    if (section) {
      section.data.push(province);
    } else {
      sections.push({ title: firstLetter, data: [province] });
    }
    return sections;
  }, []);

  const validateShippingInfo = () => {
    if (!shippingFullName.trim()) {
      Alert.alert("Invalid Input", "Full Name is required.");
      return false;
    }
    const phoneRegex = /^[0-9]{11}$/;
    if (!phoneRegex.test(shippingPhone)) {
      Alert.alert("Invalid Input", "Please enter a valid 11-digit phone number.");
      return false;
    }
    if (!shippingStreet.trim() || !shippingPostalCode.trim()) {
      Alert.alert(
        "Invalid Input",
        "Please complete all address fields (House No./Street Address and Postal Code)."
      );
      return false;
    }
    if (!shippingProvince) {
      Alert.alert("Invalid Input", "Please select a province.");
      return false;
    }
    return true;
  };

  const renderCartItem = ({ item }) => {
    const price = item.chosenSize ? item.chosenSize.price : item.price || 0;
    return (
      <View style={styles.checkoutItemContainer}>
        <Image
          source={
            item.image
              ? { uri: item.image }
              : require("../assets/diabloproduct1.jpg")
          }
          style={styles.checkoutItemImage}
        />
        <View style={{ flex: 1 }}>
          {item.brand && (
            <Text style={styles.checkoutItemBrand}>{item.brand}</Text>
          )}
          <Text style={styles.checkoutItemName}>
            {item.name || "Product name"}
          </Text>
          <Text style={styles.checkoutItemDescription}>
            {item.description || "Description"}
          </Text>
          <Text style={styles.checkoutItemQuantity}>
            Quantity: {item.quantity || 1}
          </Text>
        </View>
        <View style={{ justifyContent: "center" }}>
          <Text style={styles.checkoutItemPrice}>
            ₱{price * (item.quantity || 1)}
          </Text>
        </View>
      </View>
    );
  };

  const handleMakeAppointment = () => {
    Alert.alert("Appointment", "Make an appointment function here.");
  };

  const handlePlaceOrder = () => {
    if (
      !shippingFullName.trim() ||
      !shippingStreet.trim() ||
      !shippingPostalCode.trim() ||
      !shippingPhone.trim()
    ) {
      Alert.alert("Missing Information", "Please fill out all shipping fields.");
      return;
    }
    if (!paymentMethod.trim()) {
      Alert.alert("Missing Information", "Please select a payment method.");
      return;
    }
    Alert.alert("Order Placed", "Your order has been placed successfully!");
  };

  const handleEditPayment = () => {
    setPaymentModalVisible(true);
  };
  const selectPaymentMethod = (method) => {
    setPaymentMethod(method);
    setPaymentModalVisible(false);
  };

  const handleEditShipping = () => {
    setShippingModalVisible(true);
  };
  const saveShippingInfo = () => {
    if (!validateShippingInfo()) return;
    setShippingModalVisible(false);
  };

  const renderListHeader = () => {
    const hasShippingInfo = shippingFullName && shippingPhone;
    const shippingSummary = hasShippingInfo
      ? `${shippingFullName} (${shippingPhone})`
      : "Add shipping information";

    return (
      <View>
        <TouchableOpacity style={styles.checkoutRow} onPress={handleEditShipping}>
          <Text style={styles.checkoutRowTitle}>Shipping</Text>
          <Text
            style={[
              styles.checkoutRowValue,
              { textAlign: "right", color: hasShippingInfo ? "#000" : "#aaa" },
            ]}
          >
            {shippingSummary}
          </Text>
        </TouchableOpacity>
        <View style={styles.checkoutDivider} />
        <TouchableOpacity style={styles.checkoutRow} onPress={handleEditPayment}>
          <Text style={styles.checkoutRowTitle}>Payment</Text>
          <Text
            style={[
              styles.checkoutRowValue,
              { textAlign: "right", color: paymentMethod ? "#000" : "#aaa" },
            ]}
          >
            {paymentMethod || "Select payment method"}
          </Text>
        </TouchableOpacity>
        <View style={styles.checkoutDivider} />
        <Text style={styles.checkoutNoteTitle}>Requests</Text>
        <TextInput
          style={styles.checkoutNoteInput}
          placeholder="Add any special requests here"
          placeholderTextColor="#aaa"
          value={customerNote}
          onChangeText={setCustomerNote}
        />
      </View>
    );
  };

  const renderListFooter = () => (
    <View>
      <View style={styles.checkoutSummaryRow}>
        <Text style={styles.checkoutSummaryLabel}>Shipping Fee</Text>
        <Text style={styles.checkoutSummaryValue}>₱{shippingFee}</Text>
      </View>
      <View style={styles.checkoutSummaryRow}>
        <Text style={[styles.checkoutSummaryLabel, { fontWeight: "bold" }]}>
          Total
        </Text>
        <Text style={[styles.checkoutSummaryValue, { fontWeight: "bold" }]}>
          ₱{total.toLocaleString()}
        </Text>
      </View>
      <TouchableOpacity onPress={handleMakeAppointment}>
        <Text style={styles.checkoutAppointmentLink}>Make an appointment</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.checkoutHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.checkoutHeaderTitle}>Checkout</Text>
        <View style={{ width: 24 }} />
      </View>
      <FlatList
        data={cartItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderCartItem}
        ListHeaderComponent={renderListHeader}
        ListFooterComponent={renderListFooter}
        contentContainerStyle={styles.checkoutScrollContainer}
      />
      <View style={styles.checkoutFooter}>
        <TouchableOpacity
          style={styles.checkoutPlaceOrderButton}
          onPress={handlePlaceOrder}
        >
          <Text style={styles.checkoutPlaceOrderButtonText}>Place order</Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={isPaymentModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setPaymentModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { paddingBottom: 30 }]}>
            <TouchableOpacity
              style={{ position: "absolute", top: 10, right: 10 }}
              onPress={() => setPaymentModalVisible(false)}
            >
              <Icon name="close" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Select Payment Method</Text>
            {paymentMethods.map((methodItem) => (
              <TouchableOpacity
                key={methodItem.label}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 8,
                }}
                onPress={() => selectPaymentMethod(methodItem.label)}
              >
                <Icon
                  name={methodItem.icon}
                  size={20}
                  color="#000"
                  style={{ marginRight: 10 }}
                />
                <Text style={styles.modalOption}>{methodItem.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
      <Modal
        visible={isShippingModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setShippingModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={{ position: "absolute", top: 10, right: 10 }}
              onPress={() => setShippingModalVisible(false)}
            >
              <Icon name="close" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Shipping Address</Text>
            <Text style={{ fontWeight: "600", marginBottom: 5 }}>Full Name</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter your full name"
              placeholderTextColor="#aaa"
              value={shippingFullName}
              onChangeText={setShippingFullName}
            />
            <Text style={{ fontWeight: "600", marginBottom: 5 }}>Phone Number</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter your phone number"
              placeholderTextColor="#aaa"
              keyboardType="phone-pad"
              value={shippingPhone}
              onChangeText={setShippingPhone}
            />
            <Text style={{ fontWeight: "600", marginBottom: 5 }}>Country</Text>
            <TextInput
              style={[styles.modalInput, { backgroundColor: "#eee" }]}
              value="Philippines"
              editable={false}
            />
            <Text style={{ fontSize: 12, color: "#888", marginBottom: 15 }}>
              ⓘ Deliveries are limited to the Philippines.
            </Text>
            <Text style={{ fontWeight: "600", marginBottom: 5 }}>Province</Text>
            <TouchableOpacity
              style={[styles.modalInput, { paddingVertical: 10 }]}
              onPress={() => setProvinceModalVisible(true)}
            >
              <Text>{shippingProvince || "Select Province"}</Text>
            </TouchableOpacity>
            <Text style={{ fontWeight: "600", marginBottom: 5 }}>City</Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 8,
                marginBottom: 15,
              }}
            >
              <Picker
                selectedValue={shippingCity}
                onValueChange={(itemValue) => setShippingCity(itemValue)}
              >
                <Picker.Item label="Select municipality" value="" />
                {cityOptions.map((city) => (
                  <Picker.Item key={city} label={city} value={city} />
                ))}
              </Picker>
            </View>
            <Text style={{ fontWeight: "600", marginBottom: 5 }}>Postal Code</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter postal code"
              placeholderTextColor="#aaa"
              value={shippingPostalCode}
              onChangeText={setShippingPostalCode}
            />
            <Text style={{ fontWeight: "600", marginBottom: 5 }}>
              House No. / Street Address
            </Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter house number and street address"
              placeholderTextColor="#aaa"
              value={shippingStreet}
              onChangeText={setShippingStreet}
            />
            <TouchableOpacity
              style={[styles.button, { marginTop: 20 }]}
              onPress={saveShippingInfo}
            >
              <Text style={styles.buttonText}>Save Address</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        visible={isProvinceModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setProvinceModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              height: 600, 
              width: "80%",
              backgroundColor: "#fff",
              borderRadius: 10,
            }}
          >
            <TouchableOpacity
              style={{ position: "absolute", top: 10, right: 10, zIndex: 1 }}
              onPress={() => setProvinceModalVisible(false)}
            >
              <Icon name="close" size={24} color="#000" />
            </TouchableOpacity>
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
              {groupedProvinces.map((section) => (
                <View key={section.title}>
                  <Text style={{ padding: 10, fontWeight: "bold", backgroundColor: "#eee" }}>
                    {section.title}
                  </Text>
                  {section.data.map((province) => (
                    <TouchableOpacity
                      key={province}
                      onPress={() => {
                        setShippingProvince(province);
                        const newCityOptions = citiesByProvince[province] || defaultCities;
                        setShippingCity(newCityOptions[0] || "");
                        setProvinceModalVisible(false);
                      }}
                    >
                      <Text style={{ padding: 10 }}>{province}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CheckoutScreen;
