import { useLanguage } from "@/contexts/LanguageContext";

interface Activity {
  id: number;
  time: string | null;
  title: string | null;
  description: string | null;
}

interface Day {
  id: number;
  dayNumber: number;
  title: string | null;
  date: string | null;
  description: string | null;
  image?: string | null;
  activities: Activity[];
}

interface TripData {
  title: string;
  subtitle: string;
  description: string;
  location: string;
  dates: string;
  heroImage: string;
  accentColor: string;
  days: Day[];
}

interface PrintViewProps {
  tripData: TripData;
}

export function PrintView({ tripData }: PrintViewProps) {
  const { t } = useLanguage();

  return (
    <div className="print-view hidden print:block bg-white" style={{ color: '#0A1626' }}>
      {/* Cover Page */}
      <div className="print-cover page-break-after" style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '3rem', background: '#0A1626' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', border: '2px solid #A88B52', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#A88B52', fontFamily: 'Playfair Display, serif', fontSize: '1.25rem', fontWeight: 'bold' }}>O</span>
            </div>
            <div>
              <div style={{ color: '#A88B52', fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase' }}>OPC Trip Collection</div>
            </div>
          </div>
          <div style={{ textAlign: 'right', color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem' }}>
            <div>{tripData.dates}</div>
            <div>{tripData.location}</div>
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: '4rem', paddingBottom: '4rem' }}>
          <div style={{ width: '3rem', height: '2px', background: '#A88B52', marginBottom: '2rem' }} />
          <h1 style={{ fontFamily: 'Playfair Display, Noto Serif SC, serif', fontSize: '3rem', fontWeight: 'bold', lineHeight: 1.1, color: 'white', marginBottom: '1.5rem', maxWidth: '80%' }}>
            {tripData.title}
          </h1>
          <p style={{ fontSize: '1.1rem', fontWeight: 300, color: 'rgba(255,255,255,0.6)', maxWidth: '70%', lineHeight: 1.6 }}>
            {tripData.subtitle}
          </p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.65rem', letterSpacing: '0.15em' }}>
            {t('精品旅行计划', 'CURATED TRAVEL ITINERARY')}
          </div>
          <div style={{ color: '#A88B52', fontSize: '0.7rem' }}>
            {tripData.days.length} {t('天行程', 'Days')}
          </div>
        </div>
      </div>

      {/* Overview Page */}
      <div className="print-overview page-break-after" style={{ minHeight: '100vh', padding: '3rem', background: 'white' }}>
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div style={{ width: '2rem', height: '1px', background: '#A88B52' }} />
            <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '0.7rem', color: '#A88B52', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              {t('行程概览', 'Trip Overview')}
            </span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem', marginBottom: '3rem' }}>
          <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#0A1626', opacity: 0.7 }}>
            {tripData.description}
          </p>
          <div style={{ borderLeft: '1px solid #E8E4DD', paddingLeft: '1.5rem' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.6rem', color: '#A88B52', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                {t('目的地', 'Destination')}
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 600 }}>{tripData.location}</div>
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.6rem', color: '#A88B52', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                {t('日期', 'Dates')}
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 600 }}>{tripData.dates}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.6rem', color: '#A88B52', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                {t('行程天数', 'Duration')}
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 600 }}>{tripData.days.length} {t('天', 'Days')}</div>
            </div>
          </div>
        </div>

        {/* Day overview grid */}
        <div style={{ borderTop: '1px solid #E8E4DD', paddingTop: '2rem' }}>
          <div style={{ fontSize: '0.6rem', color: '#A88B52', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            {t('日程速览', 'Daily Highlights')}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
            {tripData.days.map((day) => (
              <div key={day.dayNumber} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '0.75rem', background: '#FAFAF8', borderLeft: '2px solid #A88B52' }}>
                <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', fontWeight: 'bold', color: '#A88B52', opacity: 0.4, lineHeight: 1 }}>
                  {String(day.dayNumber).padStart(2, '0')}
                </span>
                <div>
                  <div style={{ fontSize: '0.6rem', color: '#0A1626', opacity: 0.3, marginBottom: '0.15rem' }}>{day.date}</div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#0A1626' }}>{day.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Day Pages */}
      {tripData.days.map((day, index) => (
        <div key={day.dayNumber} className={index < tripData.days.length - 1 ? 'page-break-after' : ''} style={{ minHeight: '100vh', padding: '3rem', background: 'white' }}>
          {/* Day Header */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid #E8E4DD' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem' }}>
              <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '4rem', fontWeight: 'bold', color: '#A88B52', opacity: 0.25, lineHeight: 1 }}>
                {String(day.dayNumber).padStart(2, '0')}
              </span>
              <div>
                <div style={{ fontSize: '0.6rem', color: '#0A1626', opacity: 0.3, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                  {day.date}
                </div>
                <h2 style={{ fontFamily: 'Playfair Display, Noto Serif SC, serif', fontSize: '1.5rem', fontWeight: 600, color: '#0A1626' }}>{day.title}</h2>
              </div>
            </div>
            <div style={{ fontSize: '0.6rem', color: '#A88B52', letterSpacing: '0.1em' }}>
              {day.dayNumber} / {tripData.days.length}
            </div>
          </div>

          {/* Day Content */}
          <div style={{ display: 'grid', gridTemplateColumns: day.image && (day.image.startsWith('/images/') || day.image.startsWith('http')) ? '1fr 2fr' : '1fr', gap: '2rem' }}>
            {/* Left: Image and Description */}
            {day.image && (day.image.startsWith('/images/') || day.image.startsWith('http')) && (
              <div>
                <img 
                  src={day.image} 
                  alt={day.title || ''} 
                  style={{ width: '100%', height: '12rem', objectFit: 'cover', marginBottom: '1rem' }}
                />
                {day.description && (
                  <p style={{ fontSize: '0.75rem', color: '#0A1626', opacity: 0.4, fontStyle: 'italic', lineHeight: 1.6, borderLeft: '2px solid #A88B52', paddingLeft: '0.75rem' }}>
                    {day.description}
                  </p>
                )}
              </div>
            )}

            {/* Right: Activities */}
            <div>
              <div style={{ fontSize: '0.6rem', color: '#A88B52', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' }}>
                {t('当日活动', 'Activities')}
              </div>
              <div>
                {day.activities.map((activity, actIndex) => (
                  <div key={activity.id || actIndex} style={{ display: 'flex', gap: '1rem', paddingBottom: '1rem', marginBottom: '1rem', borderBottom: actIndex < day.activities.length - 1 ? '1px solid #F0EDE8' : 'none' }}>
                    <div style={{ flexShrink: 0, width: '3.5rem' }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#A88B52' }}>
                        {activity.time}
                      </span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0A1626', marginBottom: '0.25rem' }}>{activity.title}</h4>
                      <p style={{ fontSize: '0.75rem', color: '#0A1626', opacity: 0.5, lineHeight: 1.6 }}>
                        {activity.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Back Cover */}
      <div className="page-break-before" style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '3rem', background: '#0A1626' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '4rem', height: '4rem', borderRadius: '50%', border: '2px solid #A88B52', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
            <span style={{ color: '#A88B52', fontFamily: 'Playfair Display, serif', fontSize: '1.75rem', fontWeight: 'bold' }}>O</span>
          </div>
          <div style={{ color: '#A88B52', fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>OPC Trip Collection</div>
          <div style={{ width: '2rem', height: '1px', background: '#A88B52', margin: '1.5rem auto', opacity: 0.4 }} />
          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', maxWidth: '20rem', margin: '0 auto', lineHeight: 1.8 }}>
            {t(
              '感谢您选择我们的行程。期待与您一起探索世界。',
              'Thank you for choosing our itinerary. We look forward to exploring the world with you.'
            )}
          </p>
          <div style={{ marginTop: '2rem' }}>
            <a style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.15em' }}>
              opcglobal.ai
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
