
export interface DayItinerary {
  day: number;
  title: string;
  date: string;
  description: string;
  image: string;
  activities: {
    time: string;
    title: string;
    description: string;
  }[];
}

export interface Trip {
  id: string;
  slug?: string;
  title: string;
  subtitle: string;
  dates: string;
  location: string;
  description: string;
  heroImage: string;
  accentColor: string; // Hex code for the Swiss style accent
  itinerary: DayItinerary[];
}

export const trips: Trip[] = [
  {
    id: "cambodia-business",
    title: "Cambodia PM Office Invitational",
    subtitle: "Southeast Asia Investment Tour",
    dates: "2026.02.23 - 02.27",
    location: "Phnom Penh, Cambodia",
    description: "Focusing on Manufacturing Implementation & Web3 Financial Innovation. Hosted by Sino-Cambodia Partners, supported by the Prime Minister's Office.",
    heroImage: "https://d2xsxph8kpxj0f.cloudfront.net/310419663031722344/F3yU7NnX8QP8zNNpCsJM3K/V2aUJWzZ2Z93_836586ad.jpg",
    accentColor: "#F59E0B", // Amber
    itinerary: [
      {
        day: 1,
        title: "ENTRY & MACRO VISION",
        date: "Feb 23",
        description: "Establish VIP Status & Security",
        image: "/images/UQsMwQCkdMwQ.jpg",
        activities: [
          {
            time: "13:00 - 17:00",
            title: "Arrival: VIP Entry & Settlement",
            description: "Airport pickup, full VIP process, check-in at hotel. Goal: Establish security and prestige."
          },
          {
            time: "18:00 - 20:00",
            title: "Welcome Dinner",
            description: "Hosted by local business leaders."
          }
        ]
      },
      {
        day: 2,
        title: "BUSINESS & GOVERNMENT",
        date: "Feb 24",
        description: "High-level meetings with officials",
        image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663031722344/F3yU7NnX8QP8zNNpCsJM3K/V2aUJWzZ2Z93_836586ad.jpg",
        activities: [
          {
            time: "09:00 - 11:00",
            title: "Prime Minister's Office Visit",
            description: "Exclusive meeting with key policy makers."
          }
        ]
      }
    ]
  },
  {
    id: "basel-art",
    title: "Basel Art & Architecture",
    subtitle: "A Journey Through Design Capital",
    dates: "2026.06.10 - 06.15",
    location: "Basel, Switzerland",
    description: "Immerse yourself in the world's premier art fair city. Explore Herzog & de Meuron architecture, the Rhine river culture, and world-class museums.",
    heroImage: "/images/X1mxEauLdwCQ.jpg",
    accentColor: "#E11D2B", // Swiss Red
    itinerary: [
      {
        day: 1,
        title: "Arrival in Art City",
        date: "June 10",
        description: "Check-in and Rhine Promenade Walk",
        image: "/images/bYivF5CGE6po.jpg",
        activities: [
          {
            time: "14:00",
            title: "Check-in at Hotel Les Trois Rois",
            description: "Luxury accommodation on the Rhine."
          },
          {
            time: "17:00",
            title: "Welcome Aperitif",
            description: "Sunset drinks by the river."
          }
        ]
      },
      {
        day: 2,
        title: "Art Basel VIP Preview",
        date: "June 11",
        description: "Exclusive access to the fair",
        image: "/images/M6Ua7KDuNN65.jpg",
        activities: [
          {
            time: "11:00",
            title: "Messe Basel Tour",
            description: "Guided tour of the main exhibition halls."
          }
        ]
      }
    ]
  },
  {
    id: "fantasy-basel",
    title: "Fantasy Basel Experience",
    subtitle: "The Swiss Comic Con Adventure",
    dates: "2026.05.20 - 05.26",
    location: "Basel, Switzerland",
    description: "Join Europe's most diverse pop culture festival. Cosplay, gaming, urban art, and film in the heart of Switzerland.",
    heroImage: "/images/6HnoAnISeKdR.jpg",
    accentColor: "#8B5CF6", // Electric Purple
    itinerary: [
      {
        day: 1,
        title: "Level Up: Arrival",
        date: "May 20",
        description: "Gear up for the festival",
        image: "/images/ui3WZHBWhXCD.jpg",
        activities: [
          {
            time: "15:00",
            title: "Badge Pickup & Recon",
            description: "Get your VIP passes and scout the venue."
          }
        ]
      },
      {
        day: 2,
        title: "Cosplay Parade",
        date: "May 21",
        description: "Main stage events and contests",
        image: "/images/6HnoAnISeKdR.jpg",
        activities: [
          {
            time: "10:00",
            title: "Opening Ceremony",
            description: "Kickoff with special guests."
          }
        ]
      }
    ]
  },
  {
    id: "london-heritage",
    title: "London: Royal & Modern",
    subtitle: "7 Days of British Excellence",
    dates: "2026.07.01 - 07.07",
    location: "London, UK",
    description: "From the historic Tower of London to the trendy streets of Shoreditch. Experience the duality of this global metropolis.",
    heroImage: "/images/eYUTyLjrm36h.jpg",
    accentColor: "#1D4ED8", // Royal Blue
    itinerary: [
      {
        day: 1,
        title: "The Royal Welcome",
        date: "July 01",
        description: "Westminster and the Thames",
        image: "/images/FqH8r7SlHbVE.jpg",
        activities: [
          {
            time: "10:00",
            title: "Big Ben & Parliament",
            description: "Walking tour of the political heart."
          }
        ]
      }
    ]
  },
  {
    id: "el-nido-paradise",
    title: "El Nido Island Escape",
    subtitle: "Nature's Masterpiece",
    dates: "2026.11.10 - 11.14",
    location: "Palawan, Philippines",
    description: "Disconnect to reconnect. Crystal clear lagoons, limestone cliffs, and pristine white sand beaches await in this tropical haven.",
    heroImage: "/images/5mCCCEDRKT8I.jpeg",
    accentColor: "#06B6D4", // Cyan
    itinerary: [
      {
        day: 1,
        title: "Island Landing",
        date: "Nov 10",
        description: "Arrival in Paradise",
        image: "/images/pXdnwt2AW9j2.jpg",
        activities: [
          {
            time: "14:00",
            title: "Resort Transfer",
            description: "Boat ride to Miniloc Island Resort."
          }
        ]
      },
      {
        day: 2,
        title: "Big Lagoon Tour",
        date: "Nov 11",
        description: "Kayaking through emerald waters",
        image: "/images/uQrd6KZvSFVt.jpg",
        activities: [
          {
            time: "09:00",
            title: "Lagoon Exploration",
            description: "Private kayak tour of the Big Lagoon."
          }
        ]
      }
    ]
  },
  {
    id: "kyoto-zen",
    title: "Kyoto: Timeless Japan",
    subtitle: "Temples, Tea & Tradition",
    dates: "2026.10.15 - 10.21",
    location: "Kyoto, Japan",
    description: "Step back in time in Japan's ancient capital. Walk through bamboo forests, meditate in Zen gardens, and experience a traditional tea ceremony.",
    heroImage: "https://d2xsxph8kpxj0f.cloudfront.net/310419663031722344/F3yU7NnX8QP8zNNpCsJM3K/l60qANZf8XX0_b2c8e9c8.jpg",
    accentColor: "#10B981", // Bamboo Green
    itinerary: [
      {
        day: 1,
        title: "Arrival in the Ancient Capital",
        date: "Oct 15",
        description: "Gion District Evening Walk",
        image: "/images/MxM4U1zqUOzW.jpg",
        activities: [
          {
            time: "18:00",
            title: "Geisha District Tour",
            description: "Spotting Geiko and Maiko in Gion."
          }
        ]
      }
    ]
  }
];
