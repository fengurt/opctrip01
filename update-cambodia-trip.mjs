import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const conn = await mysql.createConnection(process.env.DATABASE_URL);

// Get the trip ID for cambodia-business
const [trips] = await conn.execute('SELECT id FROM trips WHERE slug = ?', ['cambodia-business']);
if (!trips.length) { console.error('Trip not found'); process.exit(1); }
const tripId = trips[0].id;
console.log(`Found trip ID: ${tripId}`);

// Update trip_translations for zh
await conn.execute(
  `UPDATE trip_translations SET 
    title = ?, subtitle = ?, description = ?
  WHERE tripId = ? AND lang = 'zh'`,
  [
    '别人恐惧我贪婪：柬埔寨总理府特邀 · 东南亚掘金考察团',
    '聚焦实体制造业落地与 Web3 金融创新 · 柬中联合体主办 · 柬埔寨总理府全程支持',
    '当全世界都在恐惧东南亚的"不确定性"时，真正的投资者看到的是：美元经济体零汇率风险、东盟最低$200/月劳动力成本、QIP项目最长9年免税期、100%外资控股权、$1.2B Funan运河重塑贸易格局、Web3数字资产监管先行者地位。2025年柬埔寨FDI达$100亿（同比+45%），GDP增速5.2%。这不是冒险，这是在别人看不到的地方，拿到最好的筹码。',
    tripId
  ]
);
console.log('Updated zh trip translation');

// Update trip_translations for en
await conn.execute(
  `UPDATE trip_translations SET 
    title = ?, subtitle = ?, description = ?
  WHERE tripId = ? AND lang = 'en'`,
  [
    'Be Greedy When Others Are Fearful: PM Office Invitational · Southeast Asia Gold Rush Tour',
    'Manufacturing Implementation & Web3 Innovation · Hosted by Sino-Cambodia Partners · PM Office Full Support',
    'While the world fears Southeast Asia\'s "uncertainty", real investors see: a USD economy with zero forex risk, ASEAN\'s lowest labor at $200/month, up to 9-year tax holidays via QIP, 100% foreign ownership, a $1.2B Funan Canal reshaping trade, and first-mover Web3 regulation. Cambodia\'s 2025 FDI hit $10B (+45% YoY), GDP grew 5.2%. This isn\'t risk—it\'s getting the best chips where others can\'t see.',
    tripId
  ]
);
console.log('Updated en trip translation');

// Get all days for this trip
const [days] = await conn.execute(
  'SELECT id, dayNumber FROM days WHERE tripId = ? ORDER BY dayNumber', [tripId]
);
console.log(`Found ${days.length} days`);

const dayUpdates = [
  {
    dayNumber: 1,
    zh: {
      title: '第一阶段：入境与宏观视野',
      date: '2月23日 · 建立安全感与尊贵感',
      description: '"别人恐惧"的第一课：亲身体验柬埔寨的真实安全与礼遇'
    },
    en: {
      title: 'PHASE 1: ENTRY & MACRO VISION',
      date: 'Feb 23 · Establish VIP Status & Security',
      description: 'First lesson in "contrarian investing": experience Cambodia\'s real safety & hospitality'
    },
    activities: [
      {
        time: '13:00 - 17:00',
        zh: {
          title: '【抵达】贵宾入境与安顿',
          description: '机场接机，全流程 CIP/VIP 礼遇，警务护航，入住五星级酒店。建立安全感与尊贵感。\n\n执行方职责：人员统筹、物资准备、车队调度、酒店安顿\n官方支持：CIP/VIP 通关、警务护航、安保部署'
        },
        en: {
          title: 'Arrival: VIP Entry & Settlement',
          description: 'Airport pickup, full CIP/VIP process, police escort, check-in at 5-star hotel. Establish security and prestige.\n\nSino-Cambodia Partners: Personnel coordination, supplies, fleet, check-in\nGovt Support: CIP/VIP Clearance, Police Escort, Security'
        }
      },
      {
        time: '17:00 - 18:30',
        zh: {
          title: '【开营仪式】2026 宏观经济展望 · "别人恐惧我贪婪"投资哲学',
          description: '深度解读柬埔寨逆向投资逻辑：\n• 2025年GDP增速5.2%，FDI达$100亿（同比+45%）\n• 美元经济体 = 零汇率风险（全球唯一）\n• 最低工资$200/月（越南$400+，泰国$350+）\n• QIP项目最长9年企业所得税全免\n• 100%外资控股（越南/泰国做不到）\n• Funan Techo运河$12亿改写贸易版图'
        },
        en: {
          title: 'Opening: 2026 Macro Outlook · "Be Greedy When Others Are Fearful"',
          description: 'Deep dive into Cambodia\'s contrarian investment thesis:\n• 2025 GDP growth 5.2%, FDI $10B (+45% YoY)\n• USD economy = zero forex risk (globally unique)\n• Min wage $200/mo (Vietnam $400+, Thailand $350+)\n• QIP: up to 9-year CIT exemption\n• 100% foreign ownership (Vietnam/Thailand can\'t)\n• $1.2B Funan Techo Canal reshaping trade routes'
        }
      },
      {
        time: '19:00 - 21:00',
        zh: {
          title: '【欢迎晚宴】"高棉之夜" · 华商领袖圆桌',
          description: '商务冷餐会，消除陌生感，与本地华商领袖建立链接。对接已在柬成功落地的企业家，获取第一手实战经验。'
        },
        en: {
          title: 'Welcome Banquet: "Khmer Night" · Chinese Business Leaders Roundtable',
          description: 'Business cocktail reception. Connect with local Chinese business leaders who have already succeeded in Cambodia. First-hand operational insights.'
        }
      }
    ]
  },
  {
    dayNumber: 2,
    zh: {
      title: '第二阶段：顶层设计与政策合规',
      date: '2月24日 · 产业、税务与法务',
      description: '用政策红利消除"恐惧"'
    },
    en: {
      title: 'PHASE 2: TOP-LEVEL DESIGN & POLICY COMPLIANCE',
      date: 'Feb 24 · Policy, Tax & Legal',
      description: 'Eliminating "fear" with policy dividends'
    },
    activities: [
      {
        time: '09:00 - 11:30',
        zh: {
          title: '【政策研讨】拜访柬埔寨发展理事会 (CDC)',
          description: '解读《新投资法》，明确QIP优惠政策与负面清单。\n\n核心议题：\n• 3-9年企业所得税全免政策详解\n• 进口原材料/机械零关税\n• 增值税豁免\n• 630个项目审批经验（2025年数据）\n\n官方支持：专家指派、权威背书、现场 Q&A 答疑'
        },
        en: {
          title: 'Policy Seminar: Visit Council for Development of Cambodia (CDC)',
          description: '"New Investment Law" interpretation. Clarify QIP incentives & negative list.\n\nKey Topics:\n• 3-9 year CIT exemption policy details\n• Zero duty on raw materials/machinery imports\n• VAT exemption\n• 630 project approvals experience (2025 data)\n\nSupport: Expert assignment, Policy endorsement, Q&A'
        }
      },
      {
        time: '14:30 - 16:30',
        zh: {
          title: '【税务法务】税务总局 (GDT) · 合规架构设计',
          description: '搞懂税务成本与法务风险。律所讲座与官方权威解释。\n\n重点：转让定价、预提税、双重征税协定网络、反洗钱合规框架。'
        },
        en: {
          title: 'Tax & Legal: General Dept of Taxation (GDT) · Compliance Architecture',
          description: 'Understand tax costs and legal risks. Law firm lecture & official interpretation.\n\nFocus: Transfer pricing, withholding tax, DTA network, AML compliance framework.'
        }
      },
      {
        time: '18:00 - 21:00',
        zh: {
          title: '【政企晚宴】经商处 · 友协领导对接',
          description: '邀请经商处、友协领导。打通政企沟通壁垒，建立长期政商关系网络。'
        },
        en: {
          title: 'Govt-Enterprise Banquet: Commercial Counselor & Friendship Association',
          description: 'Bridge official and private sectors. Invite Commercial Counselor\'s Office & Friendship Association leaders. Build long-term govt-business network.'
        }
      }
    ]
  },
  {
    dayNumber: 3,
    zh: {
      title: '第三阶段：数字经济与金融创新',
      date: '2月25日 · Web3、监管沙盒与资金通路',
      description: '"贪婪"的前沿阵地'
    },
    en: {
      title: 'PHASE 3: DIGITAL ECONOMY & FINANCIAL INNOVATION',
      date: 'Feb 25 · Web3, Regulatory Sandbox & Capital Channels',
      description: 'The "greedy" frontier'
    },
    activities: [
      {
        time: '09:00 - 11:30',
        zh: {
          title: '【数字监管】拜访证监局 (SERC) · Web3合规窗口',
          description: '研讨 RWA 资产代币化、数字资产合规牌照及沙盒政策。\n\n柬埔寨Web3先行者优势：\n• 2024年12月NBC出台数字资产监管框架\n• SERC监管沙盒开放申请\n• 东盟首批数字资产合规牌照\n\n特批窗口对话，技术方案背书演示。'
        },
        en: {
          title: 'Digital Regulation: Visit SERC · Web3 Compliance Window',
          description: 'Discussion: RWA tokenization, digital asset compliance licenses & sandbox policy.\n\nCambodia Web3 first-mover advantage:\n• Dec 2024 NBC issued crypto asset regulation\n• SERC regulatory sandbox open for applications\n• Among first ASEAN digital asset compliance licenses\n\nRegulatory dialogue, pilot window, tech endorsement.'
        }
      },
      {
        time: '14:30 - 17:00',
        zh: {
          title: '【金融圆桌】银行资金通路 · 加华银行/ABA',
          description: '对接加华银行/ABA。解决资金出入 (Money In/Out)、反洗钱与外汇合规。\n\n美元经济体优势：直接以USD结算，无需换汇，资金进出透明高效。'
        },
        en: {
          title: 'Financial Roundtable: Banking Channels · Canadia Bank / ABA',
          description: 'Connect with Canadia Bank/ABA. Solve "Money In/Out", AML & Forex compliance.\n\nUSD economy advantage: Direct USD settlement, no forex conversion, transparent capital flow.'
        }
      }
    ]
  },
  {
    dayNumber: 4,
    zh: {
      title: '第四阶段：实体考察与产教融合',
      date: '2月26日 · 成本核算与人才输送',
      description: '用数据击碎"恐惧"'
    },
    en: {
      title: 'PHASE 4: SITE INSPECTION & INDUSTRY-EDUCATION INTEGRATION',
      date: 'Feb 26 · Cost Auditing & Talent Pipeline',
      description: 'Crushing "fear" with data'
    },
    activities: [
      {
        time: '08:30 - 11:30',
        zh: {
          title: '【园区考察】经济特区与标杆工厂 · 成本实地核算',
          description: '实地核算水电、人工、厂房成本。观看真实生产线。\n\n核心数据验证：\n• 工人月薪$200 vs 越南$400+\n• 电费、水费、厂房租金实地对比\n• 产业链配套成熟度评估\n\n支持单位：特区入园协调，数据核实。'
        },
        en: {
          title: 'SEZ Inspection: Economic Zones & Benchmark Factories · On-site Cost Audit',
          description: 'On-site cost auditing: electricity, labor, factory rent. Real production lines.\n\nCore data verification:\n• Worker salary $200/mo vs Vietnam $400+\n• Utility & rent on-site comparison\n• Supply chain maturity assessment\n\nSupport: SEZ entry coordination, data verification.'
        }
      },
      {
        time: '14:00 - 16:00',
        zh: {
          title: '【市场与教育】永旺商场 + 皇家大学 (RUPP) · AI人才计划',
          description: '验证市场消费力，落实 AI 人才输送计划。\n\n柬埔寨人口红利：中位年龄26岁，60%+人口30岁以下，年轻劳动力充沛。'
        },
        en: {
          title: 'Market & Education: AEON Mall + Royal University (RUPP) · AI Talent Pipeline',
          description: 'Verify consumption power; implement AI talent pipeline plan.\n\nCambodia demographic dividend: median age 26, 60%+ under 30, abundant young workforce.'
        }
      }
    ]
  },
  {
    dayNumber: 5,
    zh: {
      title: '第五阶段：文化融合与成果锁定',
      date: '2月27日 · 祈福、签约与返程',
      description: '锁定"贪婪"的成果'
    },
    en: {
      title: 'PHASE 5: CULTURAL INTEGRATION & RESULT LOCKING',
      date: 'Feb 27 · Blessing, Signing & Departure',
      description: 'Locking in the "greedy" gains'
    },
    activities: [
      {
        time: '09:00 - 10:30',
        zh: {
          title: '【皇家祈福】乌那隆寺 (Wat Ounalom) · 僧王祈福仪式',
          description: '预约高僧，尊重当地文化，树立慈善形象。柬埔寨佛教文化是商业信任的基石。'
        },
        en: {
          title: 'Royal Blessing: Wat Ounalom · Supreme Patriarch Blessing Ceremony',
          description: 'High Monk reservation. Respect local culture; build charitable image. Buddhist culture is the cornerstone of business trust in Cambodia.'
        }
      },
      {
        time: '11:30 - 13:00',
        zh: {
          title: '【结业仪式】签署 MOU 与颁证 · 成果锁定',
          description: '签署合作备忘录，颁发官方认证证书。法律文件锁定，官方荣誉认证。\n\n"别人恐惧我贪婪"——当你带着总理府认证的MOU和CDC的QIP批文回国，你已经领先了99%的人。'
        },
        en: {
          title: 'Graduation Ceremony: Sign MOUs & Certificates · Result Locking',
          description: 'Sign MOUs, receive official certification. Legal documents locked, official honors certified.\n\n"Be greedy when others are fearful"—when you return with PM Office-certified MOUs and CDC QIP approvals, you\'re already ahead of 99%.'
        }
      },
      {
        time: '14:00+',
        zh: {
          title: '【返程送机】CIP/VIP 快速通道离境礼遇',
          description: 'CIP/VIP 快速通道离境礼遇。带着成果与信心，开启东南亚掘金之路。'
        },
        en: {
          title: 'Departure: CIP/VIP Fast Track Service',
          description: 'CIP/VIP fast track departure service. Leave with results and confidence to begin your Southeast Asia gold rush.'
        }
      }
    ]
  }
];

for (const dayUpdate of dayUpdates) {
  const day = days.find(d => d.dayNumber === dayUpdate.dayNumber);
  if (!day) { console.log(`Day ${dayUpdate.dayNumber} not found, skipping`); continue; }
  
  // Update day_translations for zh
  await conn.execute(
    `UPDATE day_translations SET title = ?, date = ?, description = ? WHERE dayId = ? AND lang = 'zh'`,
    [dayUpdate.zh.title, dayUpdate.zh.date, dayUpdate.zh.description, day.id]
  );
  
  // Update day_translations for en
  await conn.execute(
    `UPDATE day_translations SET title = ?, date = ?, description = ? WHERE dayId = ? AND lang = 'en'`,
    [dayUpdate.en.title, dayUpdate.en.date, dayUpdate.en.description, day.id]
  );
  
  // Delete existing activities and their translations for this day
  const [existingActivities] = await conn.execute(
    'SELECT id FROM activities WHERE dayId = ?', [day.id]
  );
  for (const act of existingActivities) {
    await conn.execute('DELETE FROM activity_translations WHERE activityId = ?', [act.id]);
    await conn.execute('DELETE FROM activities WHERE id = ?', [act.id]);
  }
  
  // Insert new activities
  for (let i = 0; i < dayUpdate.activities.length; i++) {
    const act = dayUpdate.activities[i];
    const [result] = await conn.execute(
      'INSERT INTO activities (dayId, time, sortOrder) VALUES (?, ?, ?)',
      [day.id, act.time, i]
    );
    const actId = result.insertId;
    
    // zh translation
    await conn.execute(
      'INSERT INTO activity_translations (activityId, lang, title, description) VALUES (?, ?, ?, ?)',
      [actId, 'zh', act.zh.title, act.zh.description]
    );
    
    // en translation
    await conn.execute(
      'INSERT INTO activity_translations (activityId, lang, title, description) VALUES (?, ?, ?, ?)',
      [actId, 'en', act.en.title, act.en.description]
    );
  }
  
  console.log(`Updated Day ${dayUpdate.dayNumber}: ${dayUpdate.zh.title}`);
}

console.log('\nCambodia trip updated with contrarian investment angle!');
await conn.end();
