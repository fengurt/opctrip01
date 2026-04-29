import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import { ArrowRight, LogIn, LogOut, Loader2 } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { Link } from "wouter";
import { getLoginUrl } from "@/const";
import { trips as fallbackTrips } from "@/lib/data";

export default function Home() {
  const { user, logout } = useAuth();
  const { lang, t } = useLanguage();
  const isAdmin = user?.role === 'admin';

  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Fetch trips from database
  const { data: dbTrips, isLoading } = trpc.trips.list.useQuery({ lang });
  
  const trips = dbTrips && dbTrips.length > 0 ? dbTrips : fallbackTrips;

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex(index);
    setTimeout(() => setIsTransitioning(false), 800);
  }, [isTransitioning]);

  useEffect(() => {
    if (!isAutoPlaying || trips.length === 0) return;
    const interval = setInterval(() => {
      goToSlide((activeIndex + 1) % trips.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, trips.length, activeIndex, goToSlide]);

  useEffect(() => {
    setActiveIndex(0);
  }, [lang]);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[#0A1626]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-[#A88B52] border-t-transparent rounded-full animate-spin" />
          <span className="text-[#A88B52] text-sm tracking-[0.3em] uppercase">Loading</span>
        </div>
      </div>
    );
  }

  const activeTrip = trips[activeIndex];

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#0A1626] text-white relative">
      {/* Background Images */}
      {trips.map((trip, index) => (
        <div
          key={trip.slug || trip.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === activeIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{ zIndex: index === activeIndex ? 1 : 0 }}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[8000ms] ease-linear"
            style={{ 
              backgroundImage: `url(${trip.heroImage})`,
              transform: index === activeIndex ? 'scale(1.08)' : 'scale(1.0)'
            }}
          />
          {/* Elegant gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1626]/70 via-[#0A1626]/30 to-[#0A1626]/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1626]/60 via-transparent to-transparent" />
        </div>
      ))}

      {/* Top Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-full border-2 border-[#A88B52] flex items-center justify-center">
            <span className="text-[#A88B52] font-serif text-xl font-bold">O</span>
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-[#A88B52] text-xs tracking-[0.35em] uppercase font-medium">OPC Trip</span>
            <span className="text-white/50 text-[10px] tracking-[0.25em] uppercase">Collection</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <LanguageToggle className="text-white/60 hover:text-[#A88B52] hover:bg-white/5 border-0" />
          
          {user ? (
            <div className="flex items-center gap-3">
              {isAdmin && (
                <span className="text-[10px] text-[#A88B52] font-medium tracking-[0.2em] uppercase border border-[#A88B52]/30 px-2 py-1 rounded-full">
                  {t('管理员', 'Admin')}
                </span>
              )}
              <span className="text-xs text-white/50 hidden sm:inline">{user.name}</span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => logout()}
                className="text-white/50 hover:text-white hover:bg-white/10 h-8 px-2"
              >
                <LogOut className="w-3.5 h-3.5" />
              </Button>
            </div>
          ) : (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => window.location.href = getLoginUrl()}
              className="text-white/60 hover:text-[#A88B52] hover:bg-white/5 h-8 gap-1.5"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span className="text-xs tracking-wider">{t('登录', 'Login')}</span>
            </Button>
          )}
        </div>
      </nav>

      {/* Center Content */}
      <div className="absolute inset-0 z-10 flex items-center justify-center px-6 md:px-16 pointer-events-none">
        <div className="w-full max-w-5xl pointer-events-auto">
          {trips.map((trip, index) => (
            <div
              key={trip.slug || trip.id}
              className={`absolute left-6 md:left-16 right-6 md:right-16 top-1/2 -translate-y-1/2 transition-all duration-700 ${
                index === activeIndex 
                  ? "opacity-100 translate-y-[-50%]" 
                  : "opacity-0 translate-y-[-45%] pointer-events-none"
              }`}
            >
              {/* Trip counter */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-8 h-[1px] bg-[#A88B52]" />
                <span className="text-[#A88B52] text-xs tracking-[0.3em] uppercase font-medium">
                  {trip.location}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6 text-white">
                {trip.title}
              </h1>

              {/* Description */}
              <p className="text-base md:text-lg text-white/70 max-w-lg leading-relaxed mb-10 font-light">
                {trip.description}
              </p>

              {/* CTA Button */}
              <Button 
                className="h-12 px-8 bg-[#A88B52] hover:bg-[#C4A76C] text-[#0A1626] font-semibold tracking-wider text-sm rounded-none transition-all duration-300 group"
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
                asChild
              >
                <Link href={`/trip/${trip.slug || trip.id}`}>
                  <span>{t('探索行程', 'EXPLORE ITINERARY')}</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Trip Selector */}
      <div className="absolute bottom-0 left-0 right-0 z-40 pointer-events-none">
        <div className="px-6 md:px-12 pb-8 md:pb-10">
          {/* Progress bar */}
          <div className="flex gap-2 mb-6 max-w-md pointer-events-auto">
            {trips.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  goToSlide(index);
                  setIsAutoPlaying(false);
                }}
                className="flex-1 h-[2px] rounded-full overflow-hidden bg-white/20 relative"
              >
                <div 
                  className={`absolute inset-y-0 left-0 bg-[#A88B52] transition-all ${
                    index === activeIndex ? 'duration-[6000ms] ease-linear w-full' : 'duration-300 w-0'
                  } ${index < activeIndex ? 'w-full' : ''}`}
                />
              </button>
            ))}
          </div>

          {/* Trip thumbnails */}
          <div className="flex gap-3 overflow-x-auto no-scrollbar pointer-events-auto">
            {trips.map((trip, index) => (
              <button
                key={trip.slug || trip.id}
                onClick={() => {
                  goToSlide(index);
                  setIsAutoPlaying(false);
                }}
                className={`relative flex-shrink-0 w-36 md:w-44 h-20 md:h-24 overflow-hidden transition-all duration-500 group ${
                  index === activeIndex 
                    ? "ring-1 ring-[#A88B52] opacity-100" 
                    : "opacity-40 hover:opacity-70"
                }`}
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${trip.heroImage})` }}
                />
                <div className="absolute inset-0 bg-[#0A1626]/50 group-hover:bg-[#0A1626]/30 transition-colors" />
                <div className="absolute inset-0 p-3 flex flex-col justify-end">
                  <span className="text-[10px] text-[#A88B52] tracking-wider uppercase font-medium">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-xs text-white font-medium leading-tight truncate">
                    {trip.location}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* OPC Global Footer */}
        <div className="text-center pb-4">
          <a 
            href="https://opcglobal.ai/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white/25 hover:text-[#A88B52]/60 text-[10px] tracking-[0.2em] uppercase transition-colors pointer-events-auto"
          >
            Supported by OPC Global
          </a>
        </div>
      </div>

      {/* Admin Indicator */}
      {isAdmin && (
        <div className="fixed bottom-4 right-4 z-50 bg-[#A88B52] text-[#0A1626] px-4 py-2 rounded-full text-xs font-bold shadow-lg pointer-events-auto">
          {t('管理员模式 - 双击文字可编辑', 'Admin Mode - Double-click to edit')}
        </div>
      )}
    </div>
  );
}
