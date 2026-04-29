import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('DATABASE_URL is not set');
  process.exit(1);
}

const connection = await mysql.createConnection(DATABASE_URL);
const db = drizzle(connection);

// Trip data with bilingual content
const tripsData = [
  {
    slug: 'cambodia-business',
    heroImage: '/images/V2aUJWzZ2Z93.jpg',
    accentColor: '#F59E0B',
    dates: '2026.02.23 - 02.27',
    sortOrder: 1,
    translations: {
      zh: {
        title: '柬埔寨商务之旅',
        subtitle: '首相府邀请 & 最高僧王祝福之旅',
        location: '柬埔寨，金边',
        description: '聚焦制造业落地与Web3金融创新。由中柬合作伙伴主办，首相府支持。',
      },
      en: {
        title: 'The Real Cambodia Plan',
        subtitle: "PM Office Invitational & Supreme Patriarch Blessing Tour",
        location: 'Phnom Penh, Cambodia',
        description: "Focusing on Manufacturing Implementation & Web3 Financial Innovation. Hosted by Sino-Cambodia Partners, supported by the Prime Minister's Office.",
      },
    },
    days: [
      {
        dayNumber: 1,
        image: '/images/UQsMwQCkdMwQ.jpg',
        translations: {
          zh: { title: '入境 & 宏观愿景', date: '2月23日', description: '建立VIP身份与安保' },
          en: { title: 'ENTRY & MACRO VISION', date: 'Feb 23', description: 'Establish VIP Status & Security' },
        },
        activities: [
          {
            time: '13:00 - 17:00',
            translations: {
              zh: { title: '抵达：VIP入境与安顿', description: '机场接机，全程VIP流程，酒店入住。目标：建立安保与尊贵形象。' },
              en: { title: 'Arrival: VIP Entry & Settlement', description: 'Airport pickup, full VIP process, check-in at hotel. Goal: Establish security and prestige.' },
            },
          },
          {
            time: '18:00 - 20:00',
            translations: {
              zh: { title: '欢迎晚宴', description: '由当地商界领袖主办。' },
              en: { title: 'Welcome Dinner', description: 'Hosted by local business leaders.' },
            },
          },
        ],
      },
      {
        dayNumber: 2,
        image: '/images/V2aUJWzZ2Z93.jpg',
        translations: {
          zh: { title: '商务与政府', date: '2月24日', description: '与高层官员会面' },
          en: { title: 'BUSINESS & GOVERNMENT', date: 'Feb 24', description: 'High-level meetings with officials' },
        },
        activities: [
          {
            time: '09:00 - 11:00',
            translations: {
              zh: { title: '首相府访问', description: '与关键政策制定者的独家会议。' },
              en: { title: "Prime Minister's Office Visit", description: 'Exclusive meeting with key policy makers.' },
            },
          },
        ],
      },
    ],
  },
  {
    slug: 'basel-art',
    heroImage: '/images/X1mxEauLdwCQ.jpg',
    accentColor: '#E11D2B',
    dates: '2026.06.10 - 06.15',
    sortOrder: 2,
    translations: {
      zh: {
        title: '巴塞尔艺术与建筑',
        subtitle: '设计之都的旅程',
        location: '瑞士，巴塞尔',
        description: '沉浸在世界顶级艺术博览会城市。探索赫尔佐格与德梅隆建筑、莱茵河文化和世界级博物馆。',
      },
      en: {
        title: 'Basel Art & Architecture',
        subtitle: 'A Journey Through Design Capital',
        location: 'Basel, Switzerland',
        description: 'Immerse yourself in the world\'s premier art fair city. Explore Herzog & de Meuron architecture, the Rhine river culture, and world-class museums.',
      },
    },
    days: [
      {
        dayNumber: 1,
        image: '/images/bYivF5CGE6po.jpg',
        translations: {
          zh: { title: '抵达艺术之城', date: '6月10日', description: '入住并漫步莱茵河畔' },
          en: { title: 'Arrival in Art City', date: 'June 10', description: 'Check-in and Rhine Promenade Walk' },
        },
        activities: [
          {
            time: '14:00',
            translations: {
              zh: { title: '入住三王酒店', description: '莱茵河畔的奢华住宿。' },
              en: { title: 'Check-in at Hotel Les Trois Rois', description: 'Luxury accommodation on the Rhine.' },
            },
          },
          {
            time: '17:00',
            translations: {
              zh: { title: '欢迎开胃酒', description: '河畔日落饮品。' },
              en: { title: 'Welcome Aperitif', description: 'Sunset drinks by the river.' },
            },
          },
        ],
      },
      {
        dayNumber: 2,
        image: '/images/M6Ua7KDuNN65.jpg',
        translations: {
          zh: { title: '巴塞尔艺术展VIP预览', date: '6月11日', description: '独家进入展会' },
          en: { title: 'Art Basel VIP Preview', date: 'June 11', description: 'Exclusive access to the fair' },
        },
        activities: [
          {
            time: '11:00',
            translations: {
              zh: { title: '巴塞尔展览中心导览', description: '主展厅的导览参观。' },
              en: { title: 'Messe Basel Tour', description: 'Guided tour of the main exhibition halls.' },
            },
          },
        ],
      },
    ],
  },
  {
    slug: 'fantasy-basel',
    heroImage: '/images/6HnoAnISeKdR.jpg',
    accentColor: '#8B5CF6',
    dates: '2026.05.20 - 05.26',
    sortOrder: 3,
    translations: {
      zh: {
        title: '奇幻巴塞尔体验',
        subtitle: '瑞士动漫展冒险',
        location: '瑞士，巴塞尔',
        description: '加入欧洲最多元的流行文化节。在瑞士心脏地带体验Cosplay、游戏、城市艺术和电影。',
      },
      en: {
        title: 'Fantasy Basel Experience',
        subtitle: 'The Swiss Comic Con Adventure',
        location: 'Basel, Switzerland',
        description: 'Join Europe\'s most diverse pop culture festival. Cosplay, gaming, urban art, and film in the heart of Switzerland.',
      },
    },
    days: [
      {
        dayNumber: 1,
        image: '/images/ui3WZHBWhXCD.jpg',
        translations: {
          zh: { title: '升级：抵达', date: '5月20日', description: '为节日做准备' },
          en: { title: 'Level Up: Arrival', date: 'May 20', description: 'Gear up for the festival' },
        },
        activities: [
          {
            time: '15:00',
            translations: {
              zh: { title: '领取徽章 & 侦察', description: '获取VIP通行证并侦察场地。' },
              en: { title: 'Badge Pickup & Recon', description: 'Get your VIP passes and scout the venue.' },
            },
          },
        ],
      },
      {
        dayNumber: 2,
        image: '/images/6HnoAnISeKdR.jpg',
        translations: {
          zh: { title: 'Cosplay游行', date: '5月21日', description: '主舞台活动和比赛' },
          en: { title: 'Cosplay Parade', date: 'May 21', description: 'Main stage events and contests' },
        },
        activities: [
          {
            time: '10:00',
            translations: {
              zh: { title: '开幕式', description: '特邀嘉宾开场。' },
              en: { title: 'Opening Ceremony', description: 'Kickoff with special guests.' },
            },
          },
        ],
      },
    ],
  },
  {
    slug: 'london-heritage',
    heroImage: '/images/eYUTyLjrm36h.jpg',
    accentColor: '#1D4ED8',
    dates: '2026.07.01 - 07.07',
    sortOrder: 4,
    translations: {
      zh: {
        title: '伦敦：皇家与现代',
        subtitle: '7天英伦精华',
        location: '英国，伦敦',
        description: '从历史悠久的伦敦塔到时尚的肖尔迪奇街区。体验这座全球大都市的双重魅力。',
      },
      en: {
        title: 'London: Royal & Modern',
        subtitle: '7 Days of British Excellence',
        location: 'London, UK',
        description: 'From the historic Tower of London to the trendy streets of Shoreditch. Experience the duality of this global metropolis.',
      },
    },
    days: [
      {
        dayNumber: 1,
        image: '/images/FqH8r7SlHbVE.jpg',
        translations: {
          zh: { title: '皇家欢迎', date: '7月1日', description: '威斯敏斯特和泰晤士河' },
          en: { title: 'The Royal Welcome', date: 'July 01', description: 'Westminster and the Thames' },
        },
        activities: [
          {
            time: '10:00',
            translations: {
              zh: { title: '大本钟 & 议会', description: '政治中心的步行游览。' },
              en: { title: 'Big Ben & Parliament', description: 'Walking tour of the political heart.' },
            },
          },
        ],
      },
    ],
  },
  {
    slug: 'el-nido-paradise',
    heroImage: '/images/5mCCCEDRKT8I.jpeg',
    accentColor: '#06B6D4',
    dates: '2026.11.10 - 11.14',
    sortOrder: 5,
    translations: {
      zh: {
        title: '爱妮岛逃离',
        subtitle: '大自然的杰作',
        location: '菲律宾，巴拉望',
        description: '断开连接以重新连接。在这片热带天堂，水晶般清澈的泻湖、石灰岩悬崖和原始白沙滩等待着您。',
      },
      en: {
        title: 'El Nido Island Escape',
        subtitle: "Nature's Masterpiece",
        location: 'Palawan, Philippines',
        description: 'Disconnect to reconnect. Crystal clear lagoons, limestone cliffs, and pristine white sand beaches await in this tropical haven.',
      },
    },
    days: [
      {
        dayNumber: 1,
        image: '/images/pXdnwt2AW9j2.jpg',
        translations: {
          zh: { title: '岛屿着陆', date: '11月10日', description: '抵达天堂' },
          en: { title: 'Island Landing', date: 'Nov 10', description: 'Arrival in Paradise' },
        },
        activities: [
          {
            time: '14:00',
            translations: {
              zh: { title: '度假村接送', description: '乘船前往米尼洛克岛度假村。' },
              en: { title: 'Resort Transfer', description: 'Boat ride to Miniloc Island Resort.' },
            },
          },
        ],
      },
      {
        dayNumber: 2,
        image: '/images/uQrd6KZvSFVt.jpg',
        translations: {
          zh: { title: '大泻湖之旅', date: '11月11日', description: '在翡翠般的水中划皮划艇' },
          en: { title: 'Big Lagoon Tour', date: 'Nov 11', description: 'Kayaking through emerald waters' },
        },
        activities: [
          {
            time: '09:00',
            translations: {
              zh: { title: '泻湖探险', description: '大泻湖的私人皮划艇之旅。' },
              en: { title: 'Lagoon Exploration', description: 'Private kayak tour of the Big Lagoon.' },
            },
          },
        ],
      },
    ],
  },
  {
    slug: 'kyoto-zen',
    heroImage: '/images/l60qANZf8XX0.jpg',
    accentColor: '#10B981',
    dates: '2026.10.15 - 10.21',
    sortOrder: 6,
    translations: {
      zh: {
        title: '京都：永恒的日本',
        subtitle: '寺庙、茶道与传统',
        location: '日本，京都',
        description: '在日本的古都穿越时光。漫步竹林，在禅宗花园冥想，体验传统茶道。',
      },
      en: {
        title: 'Kyoto: Timeless Japan',
        subtitle: 'Temples, Tea & Tradition',
        location: 'Kyoto, Japan',
        description: 'Step back in time in Japan\'s ancient capital. Walk through bamboo forests, meditate in Zen gardens, and experience a traditional tea ceremony.',
      },
    },
    days: [
      {
        dayNumber: 1,
        image: '/images/MxM4U1zqUOzW.jpg',
        translations: {
          zh: { title: '抵达古都', date: '10月15日', description: '祇园区夜游' },
          en: { title: 'Arrival in the Ancient Capital', date: 'Oct 15', description: 'Gion District Evening Walk' },
        },
        activities: [
          {
            time: '18:00',
            translations: {
              zh: { title: '艺伎区之旅', description: '在祇园寻觅艺伎与舞伎的身影。' },
              en: { title: 'Geisha District Tour', description: 'Spotting Geiko and Maiko in Gion.' },
            },
          },
        ],
      },
    ],
  },
];

async function seed() {
  console.log('Starting seed...');

  for (const tripData of tripsData) {
    console.log(`Seeding trip: ${tripData.slug}`);

    // Insert trip
    const [tripResult] = await connection.execute(
      `INSERT INTO trips (slug, heroImage, accentColor, dates, sortOrder, isPublished) VALUES (?, ?, ?, ?, ?, 1)`,
      [tripData.slug, tripData.heroImage, tripData.accentColor, tripData.dates, tripData.sortOrder]
    );
    const tripId = tripResult.insertId;

    // Insert trip translations
    await connection.execute(
      `INSERT INTO trip_translations (tripId, lang, title, subtitle, location, description) VALUES (?, 'zh', ?, ?, ?, ?)`,
      [tripId, tripData.translations.zh.title, tripData.translations.zh.subtitle, tripData.translations.zh.location, tripData.translations.zh.description]
    );
    await connection.execute(
      `INSERT INTO trip_translations (tripId, lang, title, subtitle, location, description) VALUES (?, 'en', ?, ?, ?, ?)`,
      [tripId, tripData.translations.en.title, tripData.translations.en.subtitle, tripData.translations.en.location, tripData.translations.en.description]
    );

    // Insert days
    for (const dayData of tripData.days) {
      const [dayResult] = await connection.execute(
        `INSERT INTO days (tripId, dayNumber, image, sortOrder) VALUES (?, ?, ?, ?)`,
        [tripId, dayData.dayNumber, dayData.image, dayData.dayNumber]
      );
      const dayId = dayResult.insertId;

      // Insert day translations
      await connection.execute(
        `INSERT INTO day_translations (dayId, lang, title, date, description) VALUES (?, 'zh', ?, ?, ?)`,
        [dayId, dayData.translations.zh.title, dayData.translations.zh.date, dayData.translations.zh.description]
      );
      await connection.execute(
        `INSERT INTO day_translations (dayId, lang, title, date, description) VALUES (?, 'en', ?, ?, ?)`,
        [dayId, dayData.translations.en.title, dayData.translations.en.date, dayData.translations.en.description]
      );

      // Insert activities
      let activityOrder = 1;
      for (const actData of dayData.activities) {
        const [actResult] = await connection.execute(
          `INSERT INTO activities (dayId, time, sortOrder) VALUES (?, ?, ?)`,
          [dayId, actData.time, activityOrder++]
        );
        const activityId = actResult.insertId;

        // Insert activity translations
        await connection.execute(
          `INSERT INTO activity_translations (activityId, lang, title, description) VALUES (?, 'zh', ?, ?)`,
          [activityId, actData.translations.zh.title, actData.translations.zh.description]
        );
        await connection.execute(
          `INSERT INTO activity_translations (activityId, lang, title, description) VALUES (?, 'en', ?, ?)`,
          [activityId, actData.translations.en.title, actData.translations.en.description]
        );
      }
    }
  }

  console.log('Seed completed successfully!');
  await connection.end();
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
