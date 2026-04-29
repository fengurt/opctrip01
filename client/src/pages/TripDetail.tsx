import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { EditableText } from "@/components/EditableText";
import { PrintView } from "@/components/PrintView";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { trips as fallbackTrips } from "@/lib/data";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, Calendar, MapPin, Printer, Clock, LogIn, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useRoute } from "wouter";
import { getLoginUrl } from "@/const";

export default function TripDetail() {
  const [, params] = useRoute("/trip/:id");
  const tripSlug = params?.id;
  const { user, logout } = useAuth();
  const { lang, t } = useLanguage();
  const isAdmin = user?.role === 'admin';
  
  const [expandedDay, setExpandedDay] = useState<number | null>(1);
  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrint = () => {
    setIsPrinting(true);
    setTimeout(() => {
      window.print();
      setTimeout(() => setIsPrinting(false), 500);
    }, 100);
  };

  // Fetch trip from database
  const { data: dbTrip, isLoading, refetch } = trpc.trips.getBySlug.useQuery(
    { slug: tripSlug || '', lang },
    { enabled: !!tripSlug }
  );

  const staticTrip = fallbackTrips.find((t) => t.id === tripSlug);
  const trip = dbTrip || staticTrip;

  // Mutations for inline editing
  const updateTripTranslation = trpc.trips.updateTranslation.useMutation({
    onSuccess: () => refetch(),
  });
  const updateDayTranslation = trpc.days.updateTranslation.useMutation({
    onSuccess: () => refetch(),
  });
  const updateActivityTranslation = trpc.activities.updateTranslation.useMutation({
    onSuccess: () => refetch(),
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tripSlug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAF8]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-[#A88B52] border-t-transparent rounded-full animate-spin" />
          <span className="text-[#A88B52] text-xs tracking-[0.3em] uppercase">Loading</span>
        </div>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAF8]">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-[#0A1626] mb-4">{t('行程未找到', 'Trip Not Found')}</h1>
          <Button variant="outline" className="border-[#0A1626] text-[#0A1626] hover:bg-[#0A1626] hover:text-white rounded-none" asChild>
            <Link href="/">
              {t('返回首页', 'Return Home')}
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const tripData = {
    id: dbTrip?.id || 0,
    title: trip.title || '',
    subtitle: dbTrip?.subtitle || staticTrip?.subtitle || '',
    description: trip.description || '',
    location: trip.location || '',
    dates: trip.dates || '',
    heroImage: trip.heroImage || '',
    accentColor: trip.accentColor || '#A88B52',
    days: dbTrip?.days || staticTrip?.itinerary?.map((day, idx) => ({
      id: idx + 1,
      dayNumber: day.day,
      title: day.title,
      date: day.date,
      description: day.description,
      image: day.image,
      activities: day.activities.map((act, actIdx) => ({
        id: actIdx + 1,
        time: act.time,
        title: act.title,
        description: act.description,
      })),
    })) || [],
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#0A1626]">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E8E4DD] h-14 flex items-center justify-between px-4 md:px-10 print:hidden">
        <Link href="/" className="flex items-center gap-2 text-sm text-[#0A1626]/60 hover:text-[#A88B52] transition-colors tracking-wider">
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline text-xs uppercase tracking-[0.15em]">{t('返回', 'Back')}</span>
        </Link>
        
        <div className="flex items-center gap-1">
          <div className="w-8 h-8 rounded-full border border-[#A88B52]/40 flex items-center justify-center mr-2">
            <span className="text-[#A88B52] font-serif text-sm font-bold">O</span>
          </div>
          <span className="text-[#A88B52] text-[10px] tracking-[0.3em] uppercase font-medium hidden sm:inline">OPC Trip Collection</span>
        </div>

        <div className="flex items-center gap-2">
          <LanguageToggle className="h-8 w-8 text-[#0A1626]/40 hover:text-[#A88B52] hover:bg-[#A88B52]/5" />
          <Button variant="ghost" size="icon" className="h-8 w-8 text-[#0A1626]/40 hover:text-[#A88B52] hover:bg-[#A88B52]/5" onClick={handlePrint}>
            <Printer className="w-3.5 h-3.5" />
          </Button>
          {user ? (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => logout()}
              className="text-[#0A1626]/40 hover:text-[#A88B52] h-8 px-2"
            >
              <LogOut className="w-3.5 h-3.5" />
            </Button>
          ) : (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => window.location.href = getLoginUrl()}
              className="text-[#0A1626]/40 hover:text-[#A88B52] h-8 gap-1"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span className="text-xs hidden sm:inline">{t('登录', 'Login')}</span>
            </Button>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${tripData.heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1626]/40 via-[#0A1626]/20 to-[#0A1626]/70" />
        
        <div className="absolute inset-0 flex items-end">
          <div className="w-full px-6 md:px-16 pb-12 md:pb-16">
            <div className="max-w-4xl">
              {/* Location tag */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-6 h-[1px] bg-[#A88B52]" />
                <span className="text-[#A88B52] text-xs tracking-[0.3em] uppercase font-medium">
                  {dbTrip ? (
                    <EditableText
                      value={tripData.location}
                      onSave={async (value) => {
                        await updateTripTranslation.mutateAsync({ tripId: tripData.id, lang, field: 'location', value });
                      }}
                    />
                  ) : tripData.location}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] text-white mb-4">
                {dbTrip ? (
                  <EditableText
                    value={tripData.title}
                    onSave={async (value) => {
                      await updateTripTranslation.mutateAsync({ tripId: tripData.id, lang, field: 'title', value });
                    }}
                    className="block"
                  />
                ) : tripData.title}
              </h1>

              {/* Subtitle */}
              <p className="text-white/80 text-base md:text-lg max-w-2xl font-light leading-relaxed mb-6">
                {dbTrip ? (
                  <EditableText
                    value={tripData.subtitle}
                    onSave={async (value) => {
                      await updateTripTranslation.mutateAsync({ tripId: tripData.id, lang, field: 'subtitle', value });
                    }}
                    as="span"
                  />
                ) : tripData.subtitle}
              </p>

              {/* Meta info */}
              <div className="flex flex-wrap gap-6 text-sm text-white/60">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#A88B52]" />
                  <span>{tripData.dates}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#A88B52]" />
                  <span>{tripData.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#A88B52]" />
                  <span>{tripData.days.length} {t('天行程', 'Days')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-16 md:py-20">
        {/* Trip Overview */}
        <div className="mb-16 md:mb-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-8 h-[1px] bg-[#A88B52]" />
            <h2 className="font-serif text-sm text-[#A88B52] tracking-[0.2em] uppercase">
              {t('行程概览', 'Trip Overview')}
            </h2>
          </div>
          <div className="text-lg md:text-xl text-[#0A1626]/70 leading-relaxed max-w-3xl font-light">
            {dbTrip ? (
              <EditableText
                value={tripData.description}
                onSave={async (value) => {
                  await updateTripTranslation.mutateAsync({ tripId: tripData.id, lang, field: 'description', value });
                }}
                as="p"
                multiline
              />
            ) : <p>{tripData.description}</p>}
          </div>
        </div>

        {/* Itinerary */}
        <div>
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-4">
              <div className="w-8 h-[1px] bg-[#A88B52]" />
              <h2 className="font-serif text-sm text-[#A88B52] tracking-[0.2em] uppercase">
                {t('行程安排', 'Itinerary')}
              </h2>
            </div>
            <span className="text-xs text-[#0A1626]/30 tracking-wider uppercase">
              {tripData.days.length} {t('天', 'Days')}
            </span>
          </div>

          <div className="space-y-0">
            {tripData.days.map((day) => {
              const isExpanded = isPrinting || expandedDay === day.dayNumber;
              return (
                <div 
                  key={day.id || day.dayNumber} 
                  className="border-b border-[#E8E4DD] last:border-b-0"
                >
                  {/* Day Header - clickable */}
                  <button
                    onClick={() => setExpandedDay(isExpanded ? null : day.dayNumber)}
                    className="w-full text-left py-6 md:py-8 flex items-center gap-6 group hover:bg-[#A88B52]/3 transition-colors px-2"
                  >
                    <span className={`font-serif text-4xl md:text-5xl font-bold transition-colors duration-300 ${
                      isExpanded ? 'text-[#A88B52]' : 'text-[#0A1626]/10 group-hover:text-[#A88B52]/40'
                    }`}>
                      {String(day.dayNumber).padStart(2, '0')}
                    </span>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] text-[#0A1626]/30 tracking-[0.2em] uppercase block mb-1">
                        {day.date}
                      </span>
                      <h3 className={`font-serif text-lg md:text-xl font-semibold transition-colors duration-300 truncate ${
                        isExpanded ? 'text-[#0A1626]' : 'text-[#0A1626]/50 group-hover:text-[#0A1626]/80'
                      }`}>
                        {dbTrip ? (
                          <EditableText
                            value={day.title || ''}
                            onSave={async (value) => {
                              await updateDayTranslation.mutateAsync({ dayId: day.id, lang, field: 'title', value });
                            }}
                          />
                        ) : day.title}
                      </h3>
                    </div>
                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      isExpanded ? 'border-[#A88B52] bg-[#A88B52] text-white rotate-45' : 'border-[#E8E4DD] text-[#0A1626]/20 group-hover:border-[#A88B52]/40'
                    }`}>
                      <span className="text-lg leading-none">+</span>
                    </div>
                  </button>

                  {/* Day Content - expandable */}
                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isExpanded ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="pb-8 md:pb-10 px-2">
                      {/* Day image */}
                      {day.image && (day.image.startsWith('/images/') || day.image.startsWith('http')) && (
                        <div className="mb-8 overflow-hidden rounded-sm">
                          <img 
                            src={day.image} 
                            alt={day.title || ''} 
                            className="w-full h-48 md:h-64 object-cover"
                          />
                        </div>
                      )}
                      
                      {/* Day description */}
                      {day.description && (
                        <div className="text-[#0A1626]/60 mb-8 text-sm leading-relaxed italic border-l-2 border-[#A88B52]/30 pl-4">
                          {dbTrip ? (
                            <EditableText
                              value={day.description || ''}
                              onSave={async (value) => {
                                await updateDayTranslation.mutateAsync({ dayId: day.id, lang, field: 'description', value });
                              }}
                              as="p"
                            />
                          ) : <p>{day.description}</p>}
                        </div>
                      )}
                      
                      {/* Activities */}
                      <div className="space-y-4">
                        {day.activities?.map((activity) => (
                          <div key={activity.id} className="flex gap-4 group/act">
                            {/* Time */}
                            <div className="flex-shrink-0 w-16 pt-1">
                              <span className="text-xs font-medium text-[#A88B52] tracking-wider">
                                {activity.time}
                              </span>
                            </div>
                            {/* Content */}
                            <div className="flex-1 pb-4 border-b border-[#E8E4DD]/50 last:border-b-0">
                              <h4 className="font-medium text-[#0A1626] text-sm mb-1">
                                {dbTrip ? (
                                  <EditableText
                                    value={activity.title || ''}
                                    onSave={async (value) => {
                                      await updateActivityTranslation.mutateAsync({ activityId: activity.id, lang, field: 'title', value });
                                    }}
                                  />
                                ) : activity.title}
                              </h4>
                              <div className="text-xs text-[#0A1626]/50 leading-relaxed">
                                {dbTrip ? (
                                  <EditableText
                                    value={activity.description || ''}
                                    onSave={async (value) => {
                                      await updateActivityTranslation.mutateAsync({ activityId: activity.id, lang, field: 'description', value });
                                    }}
                                    as="p"
                                    multiline
                                  />
                                ) : <p>{activity.description}</p>}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#0A1626] text-white/40 py-12 text-center print:hidden">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full border border-[#A88B52]/40 flex items-center justify-center">
            <span className="text-[#A88B52] font-serif text-sm font-bold">O</span>
          </div>
          <span className="text-[#A88B52]/60 text-xs tracking-[0.3em] uppercase">OPC Trip Collection</span>
        </div>
        <a 
          href="https://opcglobal.ai/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-white/20 hover:text-[#A88B52]/50 text-[10px] tracking-[0.2em] uppercase transition-colors"
        >
          Supported by OPC Global
        </a>
      </footer>

      {/* Admin Indicator */}
      {isAdmin && (
        <div className="fixed bottom-4 right-4 z-50 bg-[#A88B52] text-[#0A1626] px-4 py-2 rounded-full text-xs font-bold shadow-lg print:hidden">
          {t('管理员模式 - 双击文字可编辑', 'Admin Mode - Double-click to edit')}
        </div>
      )}

      {/* Print View */}
      <PrintView tripData={tripData} />
    </div>
  );
}
