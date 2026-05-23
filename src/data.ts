export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  tags?: string[];
}

export interface DailySpecial {
  dayName: string;
  soup: string;
  mainCourse: string;
  price: number;
  tag: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
}

export const RESTAURANT_INFO = {
  name: "Twój Bar",
  address: "Jasna 1, Szczecin",
  addressPostal: "70-777 Szczecin",
  phone: "789 203 809",
  phoneRaw: "789203809",
  hours: "12:00 - 17:00",
  deliveryInfo: "Dania też rozwozimy! Zamów gorący obiad prosto do domu lub biura.",
  facebookUrl: "https://www.facebook.com/twojbar.domoweobiady/",
  facebookReviewsUrl: "https://www.facebook.com/twojbar.domoweobiady/reviews/?id=100063525943745&sk=reviews",
  logoUrl: "https://i.ibb.co/TMsDHK4N/302689595-536239205170273-6825910014554430735-n.jpg"
};

export const REVIEWS: Review[] = [
  {
    id: "rev-1",
    author: "Zadowolona Klientka",
    rating: 5,
    text: "Pyszne jedzenie i dobre ceny 😊 a do tego przemiła obsługa. Polecam!!",
    date: "Opinia z Facebooka"
  },
  {
    id: "rev-2",
    author: "Pan Dawid",
    rating: 5,
    text: "bardzo dobre jedzenie naprawdę polecam",
    date: "Opinia z Facebooka"
  },
  {
    id: "rev-3",
    author: "Pani Anna",
    rating: 5,
    text: "Pyszne jedzonko i mila obsługa 🙂",
    date: "Opinia z Facebooka"
  }
];

export const DAILY_SPECIALS: Record<number, DailySpecial> = {
  1: {
    dayName: "Poniedziałek",
    soup: "Staropolska ogórkowa ze świeżym koperkiem",
    mainCourse: "Kotlet siekany po parysku z ziemniakami i świeżą surówką z tartej marchewki",
    price: 32,
    tag: "Tradycyjny początek tygodnia"
  },
  2: {
    dayName: "Wtorek",
    soup: "Tradycyjny krupnik polski na bogato z warzywami",
    mainCourse: "Domowe gołąbki w sosie pomidorowym podawane z ziemniakami purée",
    price: 32,
    tag: "Prawdziwy smak dzieciństwa"
  },
  3: {
    dayName: "Środa",
    soup: "Zupa szczawiowa z jajkiem od kury z wolnego wybiegu",
    mainCourse: "Pieczeń rzymska w sosie własnym, kasza gryczana i ogórek kiszony z beczki",
    price: 32,
    tag: "Środowa uczta obfitości"
  },
  4: {
    dayName: "Czwartek",
    soup: "Grochówka wojskowa z wędzonym boczkiem i majerankiem",
    mainCourse: "Schab w aksamitnym sosie cebulowym, chrupiące frytki, surówka z białej kapusty",
    price: 34,
    tag: "Klasyka czwartkowego obiadu"
  },
  5: {
    dayName: "Piątek",
    soup: "Kremowa zupa jarzynowa ze świeżymi ziołami",
    mainCourse: "Smażony filet z dorsza w złocistej panierce, frytki i tradycyjna kapusta kwaszona",
    price: 35,
    tag: "Rybacki piątek jak nad morzem"
  }
};

export const MENU_CATEGORIES = {
  soups: {
    title: "Zupy domowe",
    description: "Gotowane codziennie na świeżych warzywach i mięsie, według sprawdzonych, rodzinnych przepisów.",
    items: [
      {
        id: "soup-1",
        name: "Domowy Rosół z makaronem",
        description: "Esencjonalny, klarowny rosół z makaronem domowej roboty i marchewką.",
        price: 14,
        tags: ["Bestseller", "Dla dzieci"]
      },
      {
        id: "soup-2",
        name: "Klasyczny Żurek Staropolski",
        description: "Na naturalnym, domowym zakwasie, z białą kiełbasą, jajkiem i majerankiem.",
        price: 16,
        tags: ["Sycący", "Tradycyjny"]
      },
      {
        id: "soup-3",
        name: "Zupa Pomidorowa",
        description: "Ze słodkich pomidorów, zabielana wiejską śmietanką, podawana z lanymi kluseczkami lub ryżem.",
        price: 14,
        tags: ["Ulubieniec gości"]
      }
    ]
  },
  mains: {
    title: "Tradycyjne dania główne",
    description: "Sycące porcje gotowane na bieżąco. Podawane z dodatkami skomponowanymi przez naszego szefa kuchni.",
    items: [
      {
        id: "main-1",
        name: "Kotlet Schabowy Olbrzym",
        description: "Rozbity z pasją, opanierowany w złotej bułce, smażony na smalcu. Podawany z ziemniakami z masłem i koperkiem oraz zasmażaną kapustą.",
        price: 28,
        tags: ["Gwarancja Serce", "Porcja XL"]
      },
      {
        id: "main-2",
        name: "Ręcznie Lepione Pierogi Ruskie",
        description: "Z delikatnego ciasta, nadziewane wiejskim twarogiem i ziemniakami, okraszone chrupiącym boczkiem i zasmażaną cebulką (10 szt.).",
        price: 22,
        tags: ["Kultowe", "Wegetariańskie (opcja z masłem)"]
      },
      {
        id: "main-3",
        name: "Kotlet Mielony jak u Mamy",
        description: "Niezwykle soczysty i delikatny, podawany z puszystym purée ziemniaczanym i chrupiącą domową mizerią.",
        price: 26,
        tags: ["Klasyk"]
      },
      {
        id: "main-4",
        name: "Placek po Zbójnicku",
        description: "Chrupiący, wielki placek ziemniaczany z gęstym, aromatycznym gulaszem wieprzowym, kleksem kwaśnej śmietany i szczypiorkiem.",
        price: 29,
        tags: ["Pikantny", "Mega sycący"]
      },
      {
        id: "main-5",
        name: "Karczek w Sosie Własnym",
        description: "Długo pieczony w niskiej temperaturze, rozpływający się w ustach karczek. Podawany z domowymi kopytkami i buraczkami na ciepło.",
        price: 32,
        tags: ["Premium"]
      }
    ]
  },
  sides: {
    title: "Napoje i Dodatki",
    description: "Świeże uzupełnienie każdego domowego posiłku.",
    items: [
      {
        id: "side-1",
        name: "Domowy Kompot Owocowy",
        description: "Tradycyjnie ugotowany ze świeżych i mrożonych owoców sezonowych (truskawki, porzeczki, jabłka). Idealnie słodki.",
        price: 6,
        tags: ["Witaminy", "Zawsze świeży"]
      },
      {
        id: "side-2",
        name: "Chłodny Maślanka lub Kefir",
        description: "Polskie tradycyjne mleczne napoje fermentowane, podawane prosto z lodówki - wspaniale pasują do młodych ziemniaków.",
        price: 6,
        tags: ["Orzeźwiający"]
      },
      {
        id: "side-3",
        name: "Bukiet Surówek Domowych",
        description: "Zestaw trzech świeżych, chrupiących sezonowych surówek (marchewka, biała i czerwona kapusta).",
        price: 8,
        tags: ["Porcja zdrowia"]
      }
    ]
  }
};
