import { useState, useEffect } from "react";
import { 
  Facebook, 
  Plus, 
  Minus 
} from "lucide-react";
import { 
  RESTAURANT_INFO, 
  REVIEWS, 
  DAILY_SPECIALS, 
  MENU_CATEGORIES, 
  MenuItem, 
  DailySpecial 
} from "./data";

export default function App() {
  const [selectedDay, setSelectedDay] = useState<number>(() => {
    const currentDay = new Date().getDay();
    if (currentDay >= 1 && currentDay <= 5) {
      return currentDay;
    }
    return 1; // Default to Monday
  });

  const [activeCategory, setActiveCategory] = useState<"soups" | "mains" | "sides">("mains");
  const [cart, setCart] = useState<{ item: MenuItem; quantity: number }[]>([]);
  const [isOpenNow, setIsOpenNow] = useState<boolean>(false);
  const [currentTimeStr, setCurrentTimeStr] = useState<string>("");

  useEffect(() => {
    const checkOpenStatus = () => {
      const now = new Date();
      const optionsTime: Intl.DateTimeFormatOptions = { 
        timeZone: 'Europe/Warsaw', 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: false 
      };

      try {
        const timeStr = now.toLocaleTimeString('pl-PL', optionsTime);
        setCurrentTimeStr(timeStr);
        const [hour, min] = timeStr.split(':').map(Number);
        const dayOfWeek = now.getDay();
        const isWeekday = dayOfWeek >= 1 && dayOfWeek <= 5;
        const isWorkingHours = hour >= 12 && hour < 17;
        setIsOpenNow(isWeekday && isWorkingHours);
      } catch (err) {
        const localHour = now.getHours();
        const localDay = now.getDay();
        const isWeekday = localDay >= 1 && localDay <= 5;
        const isWorkingHours = localHour >= 12 && localHour < 17;
        setIsOpenNow(isWeekday && isWorkingHours);
      }
    };

    checkOpenStatus();
    const interval = setInterval(checkOpenStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(entry => entry.item.id === item.id);
      if (existing) {
        return prev.map(entry => 
          entry.item.id === item.id ? { ...entry, quantity: entry.quantity + 1 } : entry
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => {
      const existing = prev.find(entry => entry.item.id === itemId);
      if (existing && existing.quantity > 1) {
        return prev.map(entry => 
          entry.item.id === itemId ? { ...entry, quantity: entry.quantity - 1 } : entry
        );
      }
      return prev.filter(entry => entry.item.id !== itemId);
    });
  };

  const clearCart = () => setCart([]);

  const getSpecialAsMenuItem = (special: DailySpecial): MenuItem => {
    return {
      id: `special-${selectedDay}`,
      name: `Zestaw Dnia (${special.dayName}) - ${special.soup} + ${special.mainCourse}`,
      description: "Codzienny obiad dwudaniowy.",
      price: special.price
    };
  };

  const cartSubtotal = cart.reduce((acc, entry) => acc + (entry.item.price * entry.quantity), 0);
  const totalItemsCount = cart.reduce((acc, entry) => acc + entry.quantity, 0);

  return (
    <div className="min-h-screen bg-[#fcfbfa] text-[#111d15] font-sans antialiased selection:bg-[#f4f0e6] selection:text-[#bd6944] scroll-smooth">
      
      {/* Dynamic Status Strip */}
      <div id="status-bar" className="w-full bg-[#111d15] text-[#fcfbfa] text-xs tracking-wider py-3 px-6 border-b border-[#f4f0e6]/10">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2 font-light">
            <span className={`h-2 w-2 rounded-full ${isOpenNow ? 'bg-[#bd6944]' : 'bg-[#bd6944]/40'}`}></span>
            <span>
              {isOpenNow ? (
                <span className="text-[#fcfbfa] font-medium">Teraz otwarte</span>
              ) : (
                <span className="opacity-60">Obecnie zamknięte</span>
              )}
              {" • Zapraszamy od 12:00 do 17:00 (Poniedziałek – Piątek)"}
            </span>
          </div>
          <div className="flex items-center gap-4 text-[10px] font-semibold tracking-[0.2em] opacity-85">
            <span>DOWÓZ NA TERENIE SZCZECINA</span>
          </div>
        </div>
      </div>

      {/* Navigation Header */}
      <header id="navbar" className="sticky top-0 z-40 bg-[#fcfbfa]/80 backdrop-blur-md border-b border-[#f1efe8]">
        <div className="max-w-[1200px] mx-auto px-6 py-5 flex justify-between items-center">
          <a href="#hero" className="flex items-center gap-4 group">
            <img 
              src={RESTAURANT_INFO.logoUrl} 
              alt={RESTAURANT_INFO.name} 
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-full object-cover filter brightness-95 contrast-105" 
            />
            <div>
              <span className="block text-lg font-bold font-serif tracking-tight text-[#111d15]">
                {RESTAURANT_INFO.name}
              </span>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-10 font-medium text-[11px] tracking-[0.2em] uppercase">
            <a href="#dania-dnia" className="text-[#111d15]/80 hover:text-[#bd6944] duration-150">Danie dnia</a>
            <a href="#karta-dan" className="text-[#111d15]/80 hover:text-[#bd6944] duration-150">Karta dań</a>
            <a href="#opinie" className="text-[#111d15]/80 hover:text-[#bd6944] duration-150">Opinie</a>
            <a href="#kontakt" className="text-[#111d15]/80 hover:text-[#bd6944] duration-150">Kontakt</a>
          </div>

          <div className="flex items-center gap-5">
            <a 
              href={RESTAURANT_INFO.facebookUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#111d15] hover:text-[#bd6944] duration-150"
              title="Odwiedź nas na Facebooku"
              id="fb-nav-btn"
            >
              <Facebook className="w-4 h-4" />
            </a>

            <a 
              href={`tel:${RESTAURANT_INFO.phoneRaw}`} 
              className="text-[10px] font-bold tracking-[0.15em] uppercase py-3 px-6 bg-[#111d15] text-[#fcfbfa] hover:bg-[#bd6944] transition-colors duration-200"
              id="contact-nav-btn"
            >
              Telefon: {RESTAURANT_INFO.phone}
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section: FULL DARK, ASYMMETRIC CONTENT AT BOTTOM-LEFT */}
      <section id="hero" className="relative bg-[#111d15] text-[#fcfbfa] pt-32 pb-44 overflow-hidden min-h-[85vh] flex items-end">
        {/* Absolute Subtle Graphic Frame */}
        <div className="absolute top-10 right-10 md:right-32 w-[350px] md:w-[480px] h-[350px] md:h-[480px] opacity-25 mix-blend-soft-light pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=900" 
            alt="Nasza kuchnia" 
            className="w-full h-full object-cover filter grayscale contrast-125"
          />
        </div>

        <div className="max-w-[1200px] mx-auto px-6 w-full relative z-10">
          <div className="max-w-[750px] space-y-8">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#bd6944] font-medium block">
              Zajrzyj na Jasną 1 w Szczecinie
            </span>
            
            <h1 className="text-[9vw] sm:text-[7vw] md:text-[6.5vw] font-serif font-light italic leading-[0.95] tracking-tight">
              Czysty smak <br />
              <span className="font-bold not-italic">tradycyjnego polskiego domu.</span>
            </h1>

            <p className="text-[16px] md:text-[18px] font-light text-[#fcfbfa]/75 leading-[1.75] max-w-[600px] pt-2">
              Szukasz rzetelnych, sycących posiłków przyrządzanych z naturalnych i sprawdzonych składników? Codziennie od 12:00 do 17:00 serwujemy świeże dania dnia. Pakujemy na wynos i szybko dowozimy pod Twoje drzwi.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 pt-6">
              <a 
                href={`tel:${RESTAURANT_INFO.phoneRaw}`} 
                className="inline-flex justify-center items-center py-4 px-8 bg-[#bd6944] hover:bg-[#bd6944]/90 text-[#fcfbfa] text-xs font-bold uppercase tracking-widest transition-colors duration-200"
                id="hero-call-btn"
              >
                Zamów bezpośrednio: {RESTAURANT_INFO.phone}
              </a>
              <a 
                href="#karta-dan" 
                className="inline-flex justify-center items-center py-4 px-8 border border-[#fcfbfa]/25 hover:border-[#fcfbfa] text-[#fcfbfa] text-xs font-bold uppercase tracking-widest transition-all duration-200"
                id="hero-menu-btn"
              >
                Karta Obiadów
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Statement Section: ONE SENTENCE, LARGE FONT */}
      <section className="bg-[#fcfbfa] py-36 border-b border-[#f1efe8]">
        <div className="max-w-[950px] mx-auto px-6 text-center">
          <blockquote className="text-3xl md:text-[3.5rem] font-serif font-light italic leading-[1.3] text-[#111d15] tracking-tight">
            "Wierzymy, że ciepły, świeży posiłek potrafi odmienić cały dzień. U nas nie ma drogi na skróty."
          </blockquote>
        </div>
      </section>

      {/* About Section: ASYMMETRIC, 55% text left, 45% empty right */}
      <section id="o-nas" className="bg-[#fcfbfa] py-36">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            <div className="lg:col-span-7 space-y-10">
              <h2 className="text-4xl md:text-[2.8rem] font-serif font-light text-[#111d15] leading-[1.1] tracking-tight">
                Prawobrzeże Szczecina. <br />
                <span className="font-bold">Tradycja na talerzu.</span>
              </h2>
              
              <div className="text-[#111d15]/80 space-y-6 text-[16px] md:text-[17px] leading-[1.8] font-sans font-light">
                <p>
                  Sercem baru <span className="font-normal text-[#111d15]">Twój Bar Domowe Obiady</span> jest chęć dostarczania posiłków o identycznym smaku, jaki gości w naszych domach od pokoleń. Mięsa od sprawdzonych lokalnych rzeźników, świeże warzywa z porannych dostaw i codzienna praca od świtu nad głębokim smakiem rosołów oraz zup.
                </p>
                <p>
                  Codziennie w godzinach od <span className="font-normal text-[#111d15]">12:00 do 17:00</span> czeka na Ciebie zbilansowane menu. Nie korzystamy z półproduktów i ulepszaczy smaku — lepiąc i piekąc własnoręcznie dbamy o zaufanie naszych stałych klientów w Szczecinie.
                </p>
              </div>

              {/* Dynamic Information Banner with subtle border */}
              <div className="pt-8 border-t border-[#f1efe8] flex flex-col sm:flex-row gap-8 text-[11px] font-light tracking-widest uppercase">
                <div>
                  <span className="block text-[#bd6944] font-medium mb-1">Miejsce</span>
                  <span className="block text-[#111d15]/60">Jasna 1, Szczecin</span>
                </div>
              </div>
            </div>

            {/* Asymmetry: Content takes less than 60% of width - remaining is luxurious negative space */}
            <div className="lg:col-span-5 hidden lg:block pr-12">
              <div className="border-l border-[#f1efe8] h-full pl-12 flex flex-col justify-center">
                <span className="text-[#111d15]/40 text-[10px] tracking-[0.2em] uppercase block mb-3 font-sans font-semibold">DZIŚ W SZCZECINIE</span>
                <p className="text-2xl font-serif text-[#111d15]/50 leading-relaxed italic">
                  Zapach smażonego kotleta i świeżego koperku unosi się na Jasnej każdego przedpołudnia.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Weekly Specials (Dania Dnia) section: RESTYLED, NO CARD BOXES */}
      <section id="dania-dnia" className="bg-[#f4f0e6] py-36 border-y border-[#f1efe8]">
        <div className="max-w-[1200px] mx-auto px-6">
          
          <div className="max-w-[800px] mb-16 space-y-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#bd6944] block">
              Zestaw dnia od poniedziałku do piątku
            </span>
            <h2 className="text-4xl md:text-6xl font-serif font-light tracking-tight text-[#111d15]">
              Co dzisiaj ugotowaliśmy?
            </h2>
            <p className="text-[#111d15]/75 text-[16px] md:text-[17px] leading-[1.8] font-sans font-light">
              Zestawy dwudaniowe podajemy zawsze wyjątkowo gorące. Codziennie inna tradycyjna propozycja dopasowana do smaków prawdziwej polskiej kuchni.
            </p>
          </div>

          {/* Elegant Weekday Select Tab list */}
          <div className="flex flex-wrap gap-2 md:gap-4 pb-12 border-b border-[#e5dfce]">
            {Object.entries(DAILY_SPECIALS).map(([dayKey, special]) => {
              const dayNum = Number(dayKey);
              const isToday = new Date().getDay() === dayNum;
              const isSelected = selectedDay === dayNum;
              
              return (
                <button
                  key={dayKey}
                  onClick={() => setSelectedDay(dayNum)}
                  className={`px-5 py-3 text-xs font-semibold tracking-widest uppercase transition-all duration-150 cursor-pointer border-b-2 outline-none ${
                    isSelected 
                      ? "border-[#bd6944] text-[#111d15]" 
                      : "border-transparent text-[#111d15]/40 hover:text-[#111d15]"
                  }`}
                  id={`day-btn-${dayKey}`}
                >
                  <span className="block text-[9px] font-sans font-light tracking-widest opacity-60 mb-0.5">
                    {isToday ? "Dziś" : `DZIEŃ 0${dayKey}`}
                  </span>
                  <span>{special.dayName}</span>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12 items-start">
            
            {/* The Special Description Area */}
            <div className="lg:col-span-8 space-y-10">
              <div className="space-y-2">
                <span className="text-[10px] font-sans font-normal uppercase tracking-widest text-[#bd6944]">
                  {DAILY_SPECIALS[selectedDay].tag}
                </span>
                <h3 className="text-3xl md:text-4xl font-serif font-light italic text-[#111d15]">
                  Obiad dwudaniowy na {DAILY_SPECIALS[selectedDay].dayName}
                </h3>
              </div>

              {/* Typographic Split of Soup + Main - absolutely no boxes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4 border-l border-[#111d15]/20 pl-6 py-2">
                  <span className="text-[11px] font-sans font-light text-[#111d15]/50 tracking-wider block">I Danie (Zupa)</span>
                  <h4 className="text-xl font-serif font-bold text-[#111d15]">{DAILY_SPECIALS[selectedDay].soup}</h4>
                  <p className="text-[#111d15]/75 text-[15px] leading-[1.7] font-sans font-light">
                    Gotowana na świeżych warzywach i pełnym aromacie ziół. Bez sztucznych dodatków i barwników.
                  </p>
                </div>

                <div className="space-y-4 border-l border-[#111d15]/20 pl-6 py-2">
                  <span className="text-[11px] font-sans font-light text-[#111d15]/50 tracking-wider block">II Danie (Danie główne)</span>
                  <h4 className="text-xl font-serif font-bold text-[#111d15]">{DAILY_SPECIALS[selectedDay].mainCourse}</h4>
                  <p className="text-[#111d15]/75 text-[15px] leading-[1.7] font-sans font-light">
                    Tradycyjna, duża porcja podawana z wybranymi opcjami ziemniaków lub kaszy, uzupełniona domowymi surówkami.
                  </p>
                </div>
              </div>

              {/* Singular Gold Rule Indicator - thin unique line under the weekly specials */}
              <div className="pt-4">
                <div className="w-16 h-[2px] bg-[#bd6944] mb-3"></div>
                <p className="text-xs italic text-[#bd6944] tracking-wide font-sans font-light">
                  *Wszystkie potrawy pakujemy hermetycznie przed puszczeniem dostawy, by pozostały gorące.
                </p>
              </div>
            </div>

            {/* Order Action for Special right inside the warm neutral zone */}
            <div className="lg:col-span-4 bg-[#fcfbfa] p-8 border border-[#e5dfce] space-y-6">
              <span className="text-[10px] uppercase tracking-widest text-[#bd6944] font-medium block">Cena specjalna</span>
              <div className="text-4xl font-bold tracking-tight text-[#111d15] font-mono">
                {DAILY_SPECIALS[selectedDay].price} <span className="text-lg font-mono font-light text-[#bd6944]">PLN</span>
              </div>
              <p className="text-xs text-[#111d15]/60 leading-relaxed font-sans font-light">
                Zamów ten dwudaniowy obiad. Chętnie zapakujemy zestaw na wynos lub dowieziemy do domu lub biura.
              </p>
              <button 
                onClick={() => {
                  const itemSpecial = getSpecialAsMenuItem(DAILY_SPECIALS[selectedDay]);
                  addToCart(itemSpecial);
                }}
                className="w-full text-center py-4 px-6 bg-[#111d15] text-[#fcfbfa] hover:bg-[#bd6944] transition-colors duration-200 text-xs uppercase font-bold tracking-widest cursor-pointer outline-none block"
                id="add-special-btn"
              >
                Wybierz ten zestaw
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* Main Full Menu Segment (Karta Dań) TYPOGRAPHIC LIST, TWO COLUMNS, NO CARDS */}
      <section id="karta-dan" className="py-36 bg-[#fcfbfa]">
        <div className="max-w-[1200px] mx-auto px-6">
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16 pb-6 border-b border-[#f1efe8]">
            <div className="space-y-3">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#bd6944] block">A la carte</span>
              <h2 className="text-4xl md:text-5xl font-serif font-light text-[#111d15]">
                Nasz stały jadłospis
              </h2>
            </div>
            
            {/* Minimal Filter Tabs */}
            <div className="flex items-center gap-6 text-[11px] font-semibold tracking-widest uppercase text-[#111d15]/40">
              <button
                onClick={() => setActiveCategory("mains")}
                className={`pb-2 border-b-2 transition-all outline-none cursor-pointer ${
                  activeCategory === "mains" 
                    ? "border-[#111d15] text-[#111d15]" 
                    : "border-transparent text-[#111d15]/40 hover:text-[#111d15]"
                }`}
                id="filter-mains"
              >
                Dania Główne
              </button>
              <button
                onClick={() => setActiveCategory("soups")}
                className={`pb-2 border-b-2 transition-all outline-none cursor-pointer ${
                  activeCategory === "soups" 
                    ? "border-[#111d15] text-[#111d15]" 
                    : "border-transparent text-[#111d15]/40 hover:text-[#111d15]"
                }`}
                id="filter-soups"
              >
                Zupy
              </button>
              <button
                onClick={() => setActiveCategory("sides")}
                className={`pb-2 border-b-2 transition-all outline-none cursor-pointer ${
                  activeCategory === "sides" 
                    ? "border-[#111d15] text-[#111d15]" 
                    : "border-transparent text-[#111d15]/40 hover:text-[#111d15]"
                }`}
                id="filter-sides"
              >
                Dodatki i Napoje
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Column: Typographic list of food items */}
            <div className="lg:col-span-8 space-y-12">
              <p className="text-[14px] font-sans font-light text-[#111d15]/70 italic">
                {MENU_CATEGORIES[activeCategory].title} — {MENU_CATEGORIES[activeCategory].description}
              </p>

              <div className="divide-y divide-[#f1efe8] pt-2">
                {MENU_CATEGORIES[activeCategory].items.map((item) => {
                  const countInCart = cart.find(entry => entry.item.id === item.id)?.quantity || 0;
                  
                  return (
                    <div 
                      key={item.id} 
                      className="py-8 first:pt-0 last:pb-0 flex flex-col sm:flex-row justify-between items-start gap-4"
                      id={`menu-item-${item.id}`}
                    >
                      <div className="flex-1 space-y-1.5">
                        <div className="flex flex-wrap items-baseline gap-2">
                          <h4 className="text-[1.1rem] font-serif font-normal text-[#111d15]">
                            {item.name}
                          </h4>
                          {item.tags?.slice(0, 1).map((tag) => (
                            <span key={tag} className="text-[9px] font-sans font-normal uppercase tracking-widest text-[#bd6944] bg-[#bd6944]/10 px-2 py-0.5 rounded-sm">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <p className="text-[#111d15]/75 text-[15px] leading-[1.75] font-sans font-light max-w-[550px]">
                          {item.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-6 justify-between sm:justify-end w-full sm:w-auto pt-3 sm:pt-0">
                        <span className="text-lg font-mono font-medium text-[#111d15] whitespace-nowrap">
                          {item.price} PLN
                        </span>

                        <div className="flex items-center gap-2">
                          {countInCart > 0 ? (
                            <div className="flex items-center gap-2 bg-[#f4f0e6] p-1.5">
                              <button 
                                onClick={() => removeFromCart(item.id)}
                                className="h-8 w-8 hover:bg-[#e5dfce] text-[#111d15] font-bold flex items-center justify-center transition-colors cursor-pointer outline-none"
                                title="Odejmij jedną porcję"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-6 text-center text-xs font-sans font-bold text-[#111d15]">
                                {countInCart}
                              </span>
                              <button 
                                onClick={() => addToCart(item)}
                                className="h-8 w-8 hover:bg-[#e5dfce] text-[#111d15] font-bold flex items-center justify-center transition-colors cursor-pointer outline-none"
                                title="Dodaj kolejną porcję"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          ) : (
                            <button 
                              onClick={() => addToCart(item)}
                              className="px-4 py-2 bg-transparent border border-[#111d15]/20 hover:border-[#111d15] text-[#111d15] text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer outline-none"
                              id={`add-btn-${item.id}`}
                            >
                              Dodaj
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Elegant Simple Calculator box, no card shadow patterns */}
            <div className="lg:col-span-4 lg:sticky lg:top-32 bg-[#f4f0e6] p-8 border border-[#e5dfce]">
              
              <div className="flex justify-between items-center pb-6 border-b border-[#e5dfce]">
                <h3 className="font-serif text-[1.1rem] font-normal text-[#111d15]">Twoje Zamówienie</h3>
                {totalItemsCount > 0 && (
                  <button 
                    onClick={clearCart}
                    className="text-[#111d15]/50 hover:text-[#bd6944] text-xs font-sans font-normal tracking-wide cursor-pointer transition-colors"
                  >
                    WYCZYŚĆ
                  </button>
                )}
              </div>

              {totalItemsCount === 0 ? (
                <div className="py-12 text-center text-[#111d15]/50 space-y-4">
                  <p className="text-sm font-light leading-relaxed max-w-[200px] mx-auto font-sans">
                    Kalkulator jest pusty. Wybierz pozycje z jadłospisu, by skomponować obiad.
                  </p>
                </div>
              ) : (
                <div className="space-y-6 pt-6">
                  <div className="max-h-[220px] overflow-y-auto space-y-4 divide-y divide-[#e5dfce]/60 pr-1">
                    {cart.map((entry) => (
                      <div key={entry.item.id} className="flex justify-between items-start text-xs pt-4 first:pt-0">
                        <div className="space-y-1 max-w-[160px] font-sans font-light">
                          <span className="font-bold text-[#111d15] block leading-tight">{entry.item.name}</span>
                          <span className="text-[#111d15]/40 font-serif text-[10px]">{entry.item.price} PLN / szt.</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-sans text-[#111d15]/60">x{entry.quantity}</span>
                          <span className="font-mono font-bold text-[#111d15]">
                            {entry.item.price * entry.quantity} PLN
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6 space-y-3 border-t border-[#e5dfce]">
                    <div className="flex justify-between text-xs text-[#111d15]/60 font-sans font-light">
                      <span>Liczba dań</span>
                      <span className="text-[#111d15]">{totalItemsCount} szt.</span>
                    </div>
                    <div className="flex justify-between text-base items-baseline">
                      <span className="font-bold font-serif text-[#111d15]">Razem</span>
                      <span className="text-2xl font-mono font-bold text-[#bd6944]">
                        {cartSubtotal} PLN
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <a 
                      href={`tel:${RESTAURANT_INFO.phoneRaw}`}
                      className="w-full text-center py-4 bg-[#111d15] hover:bg-[#bd6944] text-[#fcfbfa] text-xs font-bold uppercase tracking-widest transition-colors duration-200 block"
                      id="calc-order-call-btn"
                    >
                      Zadzwoń i zamów: {RESTAURANT_INFO.phone}
                    </a>
                    <span className="block text-[10px] text-center text-[#111d15]/50 font-light leading-relaxed pt-1 font-sans">
                      Telefon bezpośredni na Jasną. Płatność gotówką lub kartą przy odbiorze u kierowcy.
                    </span>
                  </div>
                </div>
              )}

              <div className="pt-6 border-t border-[#e5dfce] mt-6 text-[11px] text-[#111d15]/55 leading-relaxed font-light font-sans">
                Minimalna kwota zamówienia do dowozu różni się w zależności od dzielnicy Szczecina. Dowiedz się więcej podczas rozmowy telefonicznej!
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Dark Feature Section with 1 massive Centered Typographic Quote */}
      <section id="opinie" className="bg-[#111d15] text-[#fcfbfa] py-40 border-b border-[#f4f0e6]/10">
        <div className="max-w-[1000px] mx-auto px-6 text-center space-y-12">
          <span className="inline-block border border-[#bd6944]/40 text-[#bd6944] text-[10px] uppercase px-4 py-1.5 font-bold tracking-[0.2em] font-sans">
            Opinia naszych gości z Facebooka
          </span>
          
          <div className="space-y-10">
            <blockquote className="text-3xl md:text-[3rem] font-serif font-light italic leading-[1.25] text-[#fcfbfa] tracking-tight max-w-[850px] mx-auto">
              "{REVIEWS[0].text}"
            </blockquote>
            <div className="flex justify-center items-center gap-3">
              <span className="h-[1px] w-6 bg-[#fcfbfa]/20"></span>
              <span className="text-[11px] uppercase tracking-widest text-[#fcfbfa]/60 font-medium font-sans">
                {REVIEWS[0].author}
              </span>
              <span className="h-[1px] w-6 bg-[#fcfbfa]/20"></span>
            </div>
          </div>

          <div className="pt-8">
            <a 
              href={RESTAURANT_INFO.facebookReviewsUrl}
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-[#fcfbfa]/20 hover:border-[#fcfbfa] text-[#fcfbfa] px-8 py-4 text-xs font-bold uppercase tracking-widest transition-all duration-200"
              id="fb-reviews-direct-btn"
            >
              Zobacz profil recenzji na Facebooku
            </a>
          </div>

        </div>
      </section>

      {/* Hours, Map and Contact: TWO COLUMNS, MAX-WIDTH 700PX, CENTERED, MINIMAL */}
      <section id="kontakt" className="py-36 bg-[#fcfbfa]">
        <div className="max-w-[700px] mx-auto px-6 space-y-16">
          
          <div className="text-center space-y-4">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#bd6944] block">Kiedy i gdzie</span>
            <h2 className="text-3xl md:text-4xl font-serif font-light text-[#111d15] tracking-tight">
              Kontakt & Lokalizacja
            </h2>
            <p className="text-[#111d15]/60 text-sm font-light font-sans">
              Znajdziesz nas w Szczecinie. Dania przygotowujemy wyłącznie na świeżo.
            </p>
          </div>

          {/* Clean minimal lists details instead of card layouts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 font-light text-[#111d15]/80 border-t border-[#f1efe8] pt-10 font-sans">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-[0.1em] text-[#111d15] block">Adres lokalu</span>
              <p className="text-sm leading-relaxed text-[#111d15]/80">
                Jasna 1, Prawobrzeże<br />
                70-777 Szczecin, Polska
              </p>
              <a 
                href={`tel:${RESTAURANT_INFO.phoneRaw}`} 
                className="text-xs text-[#bd6944] hover:underline font-bold block pt-2"
              >
                Telefon: {RESTAURANT_INFO.phone}
              </a>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-[0.1em] text-[#111d15] block">Godziny i dostawa</span>
              <p className="text-sm leading-relaxed text-[#111d15]/80">
                Poniedziałek – Piątek <br />
                Od <span className="font-semibold text-[#111d15]">12:00</span> do <span className="font-semibold text-[#111d15]">17:00</span>
              </p>
              <p className="text-xs text-[#111d15]/40 pt-2 leading-relaxed">
                Sobota – Niedziela: Zamknięte
              </p>
            </div>
          </div>

          {/* Iframe maps embed styled elegantly with minimal frame */}
          <div className="border border-[#f1efe8] p-2 bg-[#fcfbfa] shadow-sm relative overflow-hidden h-[300px] w-full">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2379.8166401634503!2d14.651181277144488!3d53.38233017202994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4700a7bec8d02153%3A0x894fd4e65c5e8e5d!2sJasna%201%2C%2070-777%20Szczecin!5e0!3m2!1spl!2spl!4v1779535630165!5m2!1spl!2spl" 
              className="absolute inset-0 w-full h-full filter saturate-90 brightness-95"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              id="gmaps-embed-iframe"
            ></iframe>
          </div>

        </div>
      </section>

      {/* Footer: RESTRAINED, THREE COLUMNS */}
      <footer className="bg-[#111d15] text-[#fcfbfa]/80 py-16 border-t border-[#f4f0e6]/5 text-xs">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-[#f4f0e6]/5">
            
            <div className="space-y-4">
              <span className="font-serif font-black text-lg text-[#fcfbfa] block">
                {RESTAURANT_INFO.name}
              </span>
              <p className="leading-relaxed font-light text-[#fcfbfa]/60 max-w-sm font-sans">
                Domowe jedzenie z pasją, z dostawą w Szczecinie. Bez ulepszaczy smaku — gotujemy tak, jak uczono nas w polskich domach.
              </p>
              <div className="pt-2">
                <a 
                  href={RESTAURANT_INFO.facebookUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-1.5 text-xs hover:text-[#bd6944] transition-colors font-sans font-light"
                  id="fb-footer-btn"
                >
                  Facebook fanpage
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <span className="block uppercase font-bold font-sans tracking-widest text-[10px] text-[#bd6944]">Nawigacja</span>
              <ul className="space-y-2 font-light font-sans">
                <li><a href="#dania-dnia" className="hover:text-white transition-colors">Dania dnia</a></li>
                <li><a href="#karta-dan" className="hover:text-white transition-colors">Nasza stała karta</a></li>
                <li><a href="#opinie" className="hover:text-white transition-colors">Opinie z Facebooka</a></li>
                <li><a href="#kontakt" className="hover:text-white transition-colors">Kontakt & Lokalizacja</a></li>
              </ul>
            </div>

            <div className="space-y-4">
              <span className="block uppercase font-bold font-sans tracking-widest text-[10px] text-[#bd6944]">Siedziba lokalu</span>
              <p className="leading-relaxed font-light font-sans text-[#fcfbfa]/70">
                Jasna 1, 70-777 Szczecin<br />
                Telefon: <a href={`tel:${RESTAURANT_INFO.phoneRaw}`} className="text-[#bd6944] hover:underline font-bold">{RESTAURANT_INFO.phone}</a>
              </p>
              <p className="text-[10px] text-[#fcfbfa]/40 font-light leading-relaxed font-sans">
                Zamówienia z dowozem pod dany adres przyjmujemy każdego dnia roboczego od godziny 12:00 do 17:00.
              </p>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-12 text-[#fcfbfa]/40 font-light font-sans">
            <span>© {new Date().getFullYear()} {RESTAURANT_INFO.name}. Wszystkie prawa zastrzeżone.</span>
          </div>

        </div>
      </footer>

    </div>
  );
}

