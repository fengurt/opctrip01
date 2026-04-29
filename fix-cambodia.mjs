import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('DATABASE_URL is not set');
  process.exit(1);
}

const connection = await mysql.createConnection(DATABASE_URL);

// Exact content from user's uploaded file
const cambodiaTrip = {
  slug: 'cambodia-business',
  translations: {
    zh: {
      title: '真实柬埔寨计划',
      subtitle: '总理府特邀僧王祈福顶层商务考察团',
      location: '金边',
      description: '聚焦实体制造业落地与 Web3 金融创新。由柬中联合体主办，柬埔寨总理府全程支持。',
    },
    en: {
      title: 'The Real Cambodia Plan',
      subtitle: 'PM Office Invitational & Supreme Patriarch Blessing Tour',
      location: 'Phnom Penh',
      description: 'Focusing on Manufacturing Implementation & Web3 Financial Innovation. Hosted by Sino-Cambodia Partners, supported by the Prime Minister\'s Office.',
    },
  },
  days: [
    {
      dayNumber: 1,
      translations: {
        zh: { 
          title: '第一阶段：入境与宏观视野', 
          date: '2月23日', 
          description: '建立安全感与尊贵感' 
        },
        en: { 
          title: 'PHASE 1: ENTRY & MACRO VISION', 
          date: 'Feb 23', 
          description: 'Establish VIP Status & Security' 
        },
      },
      activities: [
        {
          time: '13:00 - 17:00',
          translations: {
            zh: { 
              title: '【抵达】 贵宾入境与安顿', 
              description: '机场接机，全流程 VIP 礼遇，入住五星级酒店。建立安全感与尊贵感。' 
            },
            en: { 
              title: 'Arrival: VIP Entry & Settlement', 
              description: 'Airport pickup, full VIP process, check-in at hotel. Goal: Establish security and prestige.' 
            },
          },
        },
        {
          time: '17:30 - 18:30',
          translations: {
            zh: { 
              title: '【开营仪式】 2026 宏观经济展望', 
              description: '了解宏观机遇与安全底线。' 
            },
            en: { 
              title: 'Opening: 2026 Macroeconomic Outlook', 
              description: 'Understand macro opportunities and safety baselines.' 
            },
          },
        },
        {
          time: '19:00 - 21:00',
          translations: {
            zh: { 
              title: '【欢迎晚宴】 "高棉之夜"', 
              description: '商务冷餐会，消除陌生感，与本地华商领袖建立链接。' 
            },
            en: { 
              title: 'Banquet: "Khmer Night"', 
              description: 'Business Buffet/Cocktail. Link with local Chinese business leaders.' 
            },
          },
        },
      ],
    },
    {
      dayNumber: 2,
      translations: {
        zh: { 
          title: '第二阶段：顶层设计与政策合规', 
          date: '2月24日', 
          description: '产业、税务与法务' 
        },
        en: { 
          title: 'PHASE 2: TOP-LEVEL DESIGN & COMPLIANCE', 
          date: 'Feb 24', 
          description: 'Policy, Tax & Legal' 
        },
      },
      activities: [
        {
          time: '09:00 - 11:30',
          translations: {
            zh: { 
              title: '【政策研讨】 拜访柬埔寨发展理事会 (CDC)', 
              description: '解读《新投资法》，明确优惠(QIP)与负面清单。' 
            },
            en: { 
              title: 'Policy Seminar: Visit CDC', 
              description: '"New Investment Law" interpretation. Clarify Incentives (QIP) & Negative List.' 
            },
          },
        },
        {
          time: '14:30 - 16:30',
          translations: {
            zh: { 
              title: '【税务法务】 税务总局 (GDT)', 
              description: '搞懂税务成本与法务风险。律所讲座与官方权威解释。' 
            },
            en: { 
              title: 'Tax & Legal: Visit GDT', 
              description: 'Understand tax costs and legal risks. Law Firm Lecture.' 
            },
          },
        },
        {
          time: '18:00',
          translations: {
            zh: { 
              title: '【政企晚宴】', 
              description: '邀请经商处、友协领导。打通政企沟通壁垒。' 
            },
            en: { 
              title: 'Govt-Ent Banquet', 
              description: 'Bridge official and private sectors. Invite Counselor\'s Office.' 
            },
          },
        },
      ],
    },
    {
      dayNumber: 3,
      translations: {
        zh: { 
          title: '第三阶段：数字经济与金融创新', 
          date: '2月25日', 
          description: 'Web3、监管与资金通路' 
        },
        en: { 
          title: 'PHASE 3: DIGITAL ECONOMY & INNOVATION', 
          date: 'Feb 25', 
          description: 'Web3, Regulation & Money In/Out' 
        },
      },
      activities: [
        {
          time: '09:00 - 11:30',
          translations: {
            zh: { 
              title: '【数字监管】 拜访证监局 (SERC)', 
              description: '研讨 RWA 资产代币化、数字资产合规牌照及沙盒政策。' 
            },
            en: { 
              title: 'Digital Regulation: Visit SERC', 
              description: 'Discussion: RWA, Digital Assets Compliance, Licenses, Sandbox.' 
            },
          },
        },
        {
          time: '14:30 - 17:00',
          translations: {
            zh: { 
              title: '【金融圆桌】 银行资金通路', 
              description: '对接加华银行/ABA。解决资金出入 (Money In/Out)、反洗钱与外汇合规。' 
            },
            en: { 
              title: 'Financial Roundtable: Banks', 
              description: 'Banks (Canadia/ABA). Solve "Money In/Out", AML & Forex.' 
            },
          },
        },
      ],
    },
    {
      dayNumber: 4,
      translations: {
        zh: { 
          title: '第四阶段：实体考察与产教融合', 
          date: '2月26日', 
          description: '成本核算与人才输送' 
        },
        en: { 
          title: 'PHASE 4: ENTITY INSPECTION & EDUCATION', 
          date: 'Feb 26', 
          description: 'Cost Auditing & Talent Pipeline' 
        },
      },
      activities: [
        {
          time: '08:30 - 11:30',
          translations: {
            zh: { 
              title: '【园区考察】 经济特区与标杆工厂', 
              description: '实地核算水电、人工、厂房成本。观看真实生产线。' 
            },
            en: { 
              title: 'Park Inspection: SEZ & Factories', 
              description: 'Cost Auditing (Electricity, Labor, Rent). Real production lines.' 
            },
          },
        },
        {
          time: '14:00 - 16:00',
          translations: {
            zh: { 
              title: '【市场与教育】 永旺商场 + 皇家大学 (RUPP)', 
              description: '验证市场消费力，落实 AI 人才输送计划。' 
            },
            en: { 
              title: 'Market & Education: AEON Mall + RUPP', 
              description: 'Verify consumption power; AI Talent pipeline.' 
            },
          },
        },
      ],
    },
    {
      dayNumber: 5,
      translations: {
        zh: { 
          title: '第五阶段：文化融合与成果锁定', 
          date: '2月27日', 
          description: '祈福、签约与返程' 
        },
        en: { 
          title: 'PHASE 5: CULTURE & RESULT LOCKING', 
          date: 'Feb 27', 
          description: 'Blessing, Signing & Departure' 
        },
      },
      activities: [
        {
          time: '09:00',
          translations: {
            zh: { 
              title: '【皇家祈福】 乌那隆寺 (Wat Ounalom)', 
              description: '预约高僧，尊重当地文化，树立慈善形象。' 
            },
            en: { 
              title: 'Royal Blessing: Wat Ounalom', 
              description: 'High Monk reservation. Respect culture; charitable image.' 
            },
          },
        },
        {
          time: '11:30',
          translations: {
            zh: { 
              title: '【结业仪式】 签署 MOU 与颁证', 
              description: '签署合作备忘录，颁发官方认证证书。法律文件锁定，官方荣誉认证。' 
            },
            en: { 
              title: 'Graduation: Sign MOUs & Certificates', 
              description: 'Legal documents, Honors. Media coverage and official certification.' 
            },
          },
        },
        {
          time: '14:00+',
          translations: {
            zh: { 
              title: '【返程送机】', 
              description: 'CIP/VIP 快速通道离境礼遇。' 
            },
            en: { 
              title: 'Departure', 
              description: 'CIP/VIP Fast Track service.' 
            },
          },
        },
      ],
    },
  ],
};

async function fixCambodiaTrip() {
  console.log('Fixing Cambodia trip content...');

  // Get trip ID
  const [trips] = await connection.execute(
    `SELECT id FROM trips WHERE slug = ?`,
    [cambodiaTrip.slug]
  );

  if (trips.length === 0) {
    console.error('Cambodia trip not found!');
    process.exit(1);
  }

  const tripId = trips[0].id;
  console.log(`Found trip ID: ${tripId}`);

  // Update trip translations
  for (const lang of ['zh', 'en']) {
    const t = cambodiaTrip.translations[lang];
    await connection.execute(
      `UPDATE trip_translations SET title = ?, subtitle = ?, location = ?, description = ? WHERE tripId = ? AND lang = ?`,
      [t.title, t.subtitle, t.location, t.description, tripId, lang]
    );
    console.log(`Updated trip translation for ${lang}`);
  }

  // Delete existing days and activities
  const [existingDays] = await connection.execute(
    `SELECT id FROM days WHERE tripId = ?`,
    [tripId]
  );

  for (const day of existingDays) {
    await connection.execute(`DELETE FROM activity_translations WHERE activityId IN (SELECT id FROM activities WHERE dayId = ?)`, [day.id]);
    await connection.execute(`DELETE FROM activities WHERE dayId = ?`, [day.id]);
    await connection.execute(`DELETE FROM day_translations WHERE dayId = ?`, [day.id]);
  }
  await connection.execute(`DELETE FROM days WHERE tripId = ?`, [tripId]);
  console.log('Deleted existing days and activities');

  // Insert new days with correct content
  for (const dayData of cambodiaTrip.days) {
    const [dayResult] = await connection.execute(
      `INSERT INTO days (tripId, dayNumber, image, sortOrder) VALUES (?, ?, ?, ?)`,
      [tripId, dayData.dayNumber, `/images/day${dayData.dayNumber}.jpg`, dayData.dayNumber]
    );
    const dayId = dayResult.insertId;

    // Insert day translations
    for (const lang of ['zh', 'en']) {
      const t = dayData.translations[lang];
      await connection.execute(
        `INSERT INTO day_translations (dayId, lang, title, date, description) VALUES (?, ?, ?, ?, ?)`,
        [dayId, lang, t.title, t.date, t.description]
      );
    }

    // Insert activities
    let activityOrder = 1;
    for (const actData of dayData.activities) {
      const [actResult] = await connection.execute(
        `INSERT INTO activities (dayId, time, sortOrder) VALUES (?, ?, ?)`,
        [dayId, actData.time, activityOrder++]
      );
      const activityId = actResult.insertId;

      // Insert activity translations
      for (const lang of ['zh', 'en']) {
        const t = actData.translations[lang];
        await connection.execute(
          `INSERT INTO activity_translations (activityId, lang, title, description) VALUES (?, ?, ?, ?)`,
          [activityId, lang, t.title, t.description]
        );
      }
    }

    console.log(`Inserted day ${dayData.dayNumber} with ${dayData.activities.length} activities`);
  }

  console.log('Cambodia trip content fixed successfully!');
  await connection.end();
}

fixCambodiaTrip().catch((err) => {
  console.error('Fix failed:', err);
  process.exit(1);
});
