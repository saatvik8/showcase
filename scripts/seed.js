const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')
const prisma = new PrismaClient()

async function main() {
  console.log('Cleaning existing data...')

  // Clean in correct order (respect foreign keys)
  await prisma.lead.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  await prisma.admin.deleteMany()
  await prisma.company.deleteMany()

  console.log('Creating BPE company...')
  const company = await prisma.company.create({
    data: {
      name: 'Best Power Equipments India Pvt. Ltd.',
      slug: 'bpe',
      primaryColor: '#1a56db',
      logoUrl: null,
      whatsappNumber: '+919311995859',
      websiteUrl: 'https://www.bpee.com',
    }
  })

  console.log('Creating admin...')
  const hashed = await bcrypt.hash('password123', 10)
  await prisma.admin.create({
    data: {
      name: 'Admin',
      email: 'admin@bpe.com',
      password: hashed,
      companyId: company.id
    }
  })

  console.log('Creating categories...')

  // ─── TOP LEVEL CATEGORIES ───────────────────────────────────────────
  const catLineInteractive = await prisma.category.create({
    data: { name: 'Line Interactive UPS', companyId: company.id, sortOrder: 1 }
  })

  const catOnlineUPS = await prisma.category.create({
    data: { name: 'Online UPS', companyId: company.id, sortOrder: 2 }
  })

  const catModularUPS = await prisma.category.create({
    data: { name: 'Modular UPS', companyId: company.id, sortOrder: 3 }
  })

  const catRackMount = await prisma.category.create({
    data: { name: 'Rack Mount UPS', companyId: company.id, sortOrder: 4 }
  })

  const catBESS = await prisma.category.create({
    data: { name: 'Battery Energy Storage System (BESS)', companyId: company.id, sortOrder: 5 }
  })

  const catDataCenter = await prisma.category.create({
    data: { name: 'Data Center Solutions', companyId: company.id, sortOrder: 6 }
  })

  const catAccessories = await prisma.category.create({
    data: { name: 'Accessories & Components', companyId: company.id, sortOrder: 7 }
  })

  // ─── ONLINE UPS SUBCATEGORIES ────────────────────────────────────────
  const cat1Ph1Ph = await prisma.category.create({
    data: { name: '1 Phase In – 1 Phase Out', companyId: company.id, parentId: catOnlineUPS.id, sortOrder: 1 }
  })

  const cat3Ph1Ph = await prisma.category.create({
    data: { name: '3 Phase In – 1 Phase Out', companyId: company.id, parentId: catOnlineUPS.id, sortOrder: 2 }
  })

  const cat3Ph3Ph = await prisma.category.create({
    data: { name: '3 Phase In – 3 Phase Out', companyId: company.id, parentId: catOnlineUPS.id, sortOrder: 3 }
  })

  // ─── BESS SUBCATEGORIES ───────────────────────────────────────────────
  const catBESSSingle = await prisma.category.create({
    data: { name: 'Single Phase BESS', companyId: company.id, parentId: catBESS.id, sortOrder: 1 }
  })

  const catBESSThree = await prisma.category.create({
    data: { name: 'Three Phase BESS', companyId: company.id, parentId: catBESS.id, sortOrder: 2 }
  })

  const catBESSContainer = await prisma.category.create({
    data: { name: 'Containerized BESS', companyId: company.id, parentId: catBESS.id, sortOrder: 3 }
  })

  console.log('Creating products...')

  // ══════════════════════════════════════════════════════════════════════
  // LINE INTERACTIVE UPS
  // ══════════════════════════════════════════════════════════════════════

  await prisma.product.create({
    data: {
      name: 'BP/BPI Series',
      description: 'Line Interactive UPS for home and small office use. Available in 650VA, 1000VA, 1200VA, 1500VA, and 2200VA variants with inbuilt AVR and wide input voltage range.',
      specs: {
        'Models': 'BP 650 / BP 1000 / BP 1200 / BP 1500 / BP 2200',
        'Type': 'Line Interactive',
        'Topology': 'AVR (Automatic Voltage Regulation)',
        'Features': 'Inbuilt AVR, Overload Protection, EMI/RFI/Surge and Spike Protection, USB Connectivity Port (Optional), RS 232 Port, LED Status Indicator, Wide Input Voltage Range',
        'Protection': 'EMI, RFI, Surge and Spike',
        'Connectivity': 'USB (Optional), RS232',
      },
      images: [],
      isVisible: true,
      categoryId: catLineInteractive.id,
      companyId: company.id
    }
  })

  // ══════════════════════════════════════════════════════════════════════
  // ONLINE UPS — 1 PHASE IN / 1 PHASE OUT
  // ══════════════════════════════════════════════════════════════════════

  await prisma.product.create({
    data: {
      name: 'MF Series',
      description: 'True Online Double Conversion VFI Technology UPS. 1 Phase In / 1 Phase Out, 1–3kVA range. Configurable batteries, high efficiency of 94.5% on Dual Conversion mode.',
      specs: {
        'Capacity': '1 – 3 kVA',
        'Phase': '1 Phase In / 1 Phase Out',
        'Technology': 'True Online Double Conversion VFI',
        'Efficiency': '94.5% on Dual Conversion mode',
        'Battery': '6 & 10kVA configurable: 16–20 Nos',
        'Paralleling': 'Built-in paralleling kit with 6 & 10kVA',
        'Battery Bank': 'Supports common battery bank',
        'Communication': 'RS232 (standard), SNMP / RS485 / Dry Contact (Optional)',
        'Compatibility': 'Li-ion Battery Compatible, Isolation Transformer Compatible',
      },
      images: [],
      isVisible: true,
      categoryId: cat1Ph1Ph.id,
      companyId: company.id
    }
  })

  await prisma.product.create({
    data: {
      name: 'MSI Series',
      description: 'True Online Double Conversion VFI Technology UPS. 1 Phase In / 1 Phase Out, 1–3kVA. Built-in paralleling kit and common battery bank support.',
      specs: {
        'Capacity': '1 – 3 kVA',
        'Phase': '1 Phase In / 1 Phase Out',
        'Technology': 'True Online Double Conversion VFI',
        'Battery Configuration': '16–20 Nos',
        'Communication': 'RS232 (standard), SNMP / RS485 / Dry Contact (Optional)',
        'Compatibility': 'Li-ion Battery Compatible, Isolation Transformer Compatible',
      },
      images: [],
      isVisible: true,
      categoryId: cat1Ph1Ph.id,
      companyId: company.id
    }
  })

  await prisma.product.create({
    data: {
      name: 'MF II Series',
      description: 'True Online Double Conversion VFI Technology UPS. 1 Phase In / 1 Phase Out, 6–10kVA. High efficiency and Li-ion battery compatible.',
      specs: {
        'Capacity': '6 – 10 kVA',
        'Phase': '1 Phase In / 1 Phase Out',
        'Technology': 'True Online Double Conversion VFI',
        'Compatibility': 'Li-ion Battery Compatible, Isolation Transformer Compatible',
        'Communication': 'RS232 (standard), SNMP / RS485 / Dry Contact (Optional)',
      },
      images: [],
      isVisible: true,
      categoryId: cat1Ph1Ph.id,
      companyId: company.id
    }
  })

  await prisma.product.create({
    data: {
      name: 'MPP Series',
      description: 'True Online Double Conversion VFI UPS with Unity output power factor (kVA=kW). 1–20kVA range. Rack-Tower 2-in-1 design with hot-swappable battery.',
      specs: {
        'Capacity': '1 – 20 kVA',
        'Phase': '1 Phase In / 1 Phase Out, 3 Phase In / 1 Phase Out, 3 Phase In / 3 Phase Out',
        'Technology': 'True Online Double Conversion VFI',
        'Power Factor': '1.0 (kVA = kW)',
        'Form Factor': 'Rack-Tower 2-in-1',
        'Battery': 'Hot-swappable',
        'Display': 'User friendly LCD',
        'Configuration': 'Can be configured as 3/3, 3/1, 1/1 (for 10 & 20kVA)',
        'Features': 'ECO mode for energy saving, Generator & Li-ion battery compatible',
      },
      images: [],
      isVisible: true,
      categoryId: cat1Ph1Ph.id,
      companyId: company.id
    }
  })

  // ══════════════════════════════════════════════════════════════════════
  // ONLINE UPS — 3 PHASE IN / 1 PHASE OUT
  // ══════════════════════════════════════════════════════════════════════

  await prisma.product.create({
    data: {
      name: 'HPX Series',
      description: 'Industrial grade 3 Phase In / 1 Phase Out True Online Double Conversion UPS. 200–600kVA. 12-pulse rectifier for rugged operation, suitable for Oil & Gas, Marine, and Industrial applications.',
      specs: {
        'Capacity': '200 kVA – 600 kVA',
        'Phase': '3 Phase In / 1 Phase Out',
        'Technology': 'True Online Double Conversion VFI',
        'Rectifier': '12-Pulse for Rugged Operation',
        'DC Voltage': 'Wide DC V from 220V DC to 600V DC',
        'Isolation': 'True Inbuilt Galvanic Isolation Transformer',
        'Protection': 'IP55 Rating (Customized)',
        'Output': 'Single phase output available up to 200kVA, Customized Output Configuration 3 Phase / 1 Phase',
        'Applications': 'Oil & Natural Gas, Marine, and other industrial applications',
        'Battery Management': 'Intelligent Battery Management to Prolong Battery Life Cycle',
      },
      images: [],
      isVisible: true,
      categoryId: cat3Ph1Ph.id,
      companyId: company.id
    }
  })

  // ══════════════════════════════════════════════════════════════════════
  // ONLINE UPS — 3 PHASE IN / 3 PHASE OUT
  // ══════════════════════════════════════════════════════════════════════

  await prisma.product.create({
    data: {
      name: 'GTP Series',
      description: 'True Online Double Conversion VFI UPS, 3 Phase In / 3 Phase Out. 10–250kVA. DSP Technology with 3-Level IGBT based Rectifier and Inverter topology. High input power factor ≥0.99.',
      specs: {
        'Capacity': '10 kVA – 250 kVA',
        'Phase': '3 Phase In / 3 Phase Out',
        'Technology': 'True Online Double Conversion VFI',
        'Topology': '3-Level IGBT based Rectifier and Inverter',
        'Input Power Factor': '≥ 0.99',
        'Display': '7-inch Colour Touch Screen',
        'Features': 'DSP Technology, Wide Input Voltage Range, Built-in Phase Sequence Correction, Support Common Battery Bank',
      },
      images: [],
      isVisible: true,
      categoryId: cat3Ph3Ph.id,
      companyId: company.id
    }
  })

  await prisma.product.create({
    data: {
      name: 'GTPIX Series',
      description: 'Advanced Online UPS, 3 Phase In / 3 Phase Out. 60–300kVA. Features advanced backfeed detection, dual mains inputs, parallel operation up to 4 units, and Lithium-ion battery support.',
      specs: {
        'Capacity': '60 kVA – 300 kVA',
        'Models': 'GTPIX360L32 (60kW), GTPIX3380L32 (80kW), GTPIX33100L32 (100kW), GTPIX33120L32 (120kW), GTPIX33160L32 (160kW), GTPIX33200L32 (200kW), GTPIX33250L32 (250kW), GTPIX33300L32 (300kW)',
        'Phase': '3 Phase In / 3 Phase Out',
        'Input Voltage': '380/400/415 VAC (3Ph+N+PE)',
        'Input Voltage Range': '320–480 VAC',
        'Input Frequency': '50/60Hz Auto Sensing, 40Hz–70Hz range',
        'Input Power Factor': '≥ 0.99',
        'Input THDi': '≤ 5%',
        'Output Voltage': '380/400/415 VAC (3Ph+N+PE)',
        'Voltage Regulation': '± 1%',
        'Output THDv': '≤ 2% (Linear Load), ≤ 4% (Non-linear Load)',
        'AC Mode Efficiency': 'Up to 96.8%',
        'ECO Mode Efficiency': 'Up to 99.0%',
        'Parallel Capability': 'Up to 4 units',
        'Battery': 'SMF VRLA / Li-ion',
        'Max Battery Voltage': '+/- 240V (12V x 40 Pcs)',
        'Communication Standard': 'RS-232',
        'Communication Optional': 'SNMP / ModBus / Dry Contact / USB / RS-485',
        'IP Class': 'IP20',
        'Operating Temperature': '0–50°C',
        'Humidity': '0 to 95% Non-condensing',
        'Noise Level': '< 65dB',
        'Certifications': 'ISO 9001, ISO 14001, ISO 27001, ISO 45001, ISO 50001, RoHS, CE',
        'Applications': 'All kinds of ADP Machines',
        'Features': 'Advanced built-in backfeed detection, Parallel operation up to 4 units with common battery bank, Smooth power ramp-up with walk-in feature, Dual mains inputs, Flexible battery configurations with adjustable charging current, Inbuilt EPO, DG compatible, 50Hz/60Hz frequency conversion, Lithium-ion battery support',
      },
      images: [],
      isVisible: true,
      categoryId: cat3Ph3Ph.id,
      companyId: company.id
    }
  })

  await prisma.product.create({
    data: {
      name: 'EPX+ Series',
      description: 'True Online Double Conversion UPS with Inbuilt Galvanic Isolation Transformer. 10–400kVA. Designed to withstand all kinds of loads with dual mains input and 10-inch colour touch screen.',
      specs: {
        'Capacity': '10 kVA – 400 kVA',
        'Phase': '3 Phase In / 3 Phase Out',
        'Technology': 'True Online Double Conversion VFI',
        'Isolation': 'Inbuilt Galvanic Isolation Transformer',
        'DC Voltage': 'Configurable 384V to 408V DC',
        'Input': 'Accept Dual-Mains Input',
        'Paralleling': 'Up to 6 units',
        'Display': '10-inch Colour Touch Screen LCD',
        'Battery': '12V x 29/30/31/32 Nos',
      },
      images: [],
      isVisible: true,
      categoryId: cat3Ph3Ph.id,
      companyId: company.id
    }
  })

  await prisma.product.create({
    data: {
      name: 'UGX Series',
      description: 'True Online Double Conversion UPS with Inbuilt Isolation Transformer (Output & Input Optional). 10–250kVA. Low harmonic distortion <3% and parallel up to 8 units.',
      specs: {
        'Capacity': '10 kVA – 250 kVA',
        'Phase': '3 Phase In / 3 Phase Out',
        'Technology': 'True Online Double Conversion VFI',
        'Isolation': 'Inbuilt Isolation Transformer (Output & Input Optional)',
        'Topology': '3-Level IGBT Based Rectifier & Inverter',
        'Input Power Factor': '≥ 0.99',
        'Output Power Factor': '1.0',
        'Harmonic Distortion': '< 3%',
        'Paralleling': 'Up to 8 units',
        'Features': 'Static Bypass and Cold Start, Wide Input Voltage Range, Wide Input Frequency Range',
      },
      images: [],
      isVisible: true,
      categoryId: cat3Ph3Ph.id,
      companyId: company.id
    }
  })

  await prisma.product.create({
    data: {
      name: 'GTP-InfiniteX Series',
      description: 'Ultra high efficiency industrial UPS for large-scale applications. 300–1200kVA. Ultra High Energy Efficiency ≥97.0% with parallel expansion up to 9.6 MW and 100% Regenerative Load Heading Capability.',
      specs: {
        'Capacity': '300 kVA – 1200 kVA',
        'Phase': '3 Phase In / 3 Phase Out',
        'Technology': 'True Online Double Conversion VFI — Industrial Application',
        'Topology': '3-Level Rectifier and Inverter with IGBT',
        'Efficiency': '≥ 97.0%',
        'Power Factor': 'kVA = kW (Full Rated)',
        'Parallel Expansion': 'Up to 9.6 MW',
        'Redundancy': 'N+N, N+1 configurable',
        'Features': 'Automatic input phase reversal protection, 100% Regenerative Load Heading Capability',
      },
      images: [],
      isVisible: true,
      categoryId: cat3Ph3Ph.id,
      companyId: company.id
    }
  })

  // ══════════════════════════════════════════════════════════════════════
  // RACK MOUNT UPS
  // ══════════════════════════════════════════════════════════════════════

  await prisma.product.create({
    data: {
      name: 'GTRT Series',
      description: 'True Online Double Conversion Rack Mount UPS. 3 Phase In / 3 Phase Out, 10–60kVA. LCD display, DSP technology, output power factor unity, and configurable DC voltage 384V to 480VDC.',
      specs: {
        'Capacity': '10 kVA – 60 kVA',
        'Phase': '3 Phase In / 3 Phase Out',
        'Technology': 'True Online Double Conversion VFI',
        'Form Factor': 'Rack Mount',
        'Display': 'LCD for comprehensive UPS information',
        'DC Voltage': 'Configurable 384V to 480VDC',
        'Output Power Factor': '1.0 (kVA = kW)',
        'Features': 'DSP technology, ECO mode for energy saving, Emergency Power Off (EPO), Generator compatible, Li-ion battery compatible',
      },
      images: [],
      isVisible: true,
      categoryId: catRackMount.id,
      companyId: company.id
    }
  })

  // ══════════════════════════════════════════════════════════════════════
  // MODULAR UPS
  // ══════════════════════════════════════════════════════════════════════

  await prisma.product.create({
    data: {
      name: 'PS Series (PS12 / PS15 / PS32 / PS50 / PS75 / PS100)',
      description: 'Modular UPS platform with flexible power module rating from 4kVA to 100kVA per module. Total capacity 4kVA to 1000kVA. Hot swappable modules, Li-ion battery compatible.',
      specs: {
        'Capacity': '4 kVA – 1000 kVA',
        'Models': 'PS12, PS15, PS32, PS50, PS75, PS100',
        'Module Rating': '4 kVA to 100 kVA per module',
        'Phase': '3 Phase In / 3 Phase Out',
        'Efficiency EHS Mode': '≥ 98.6%',
        'Efficiency ECO Mode': '≥ 99.0%',
        'Features': 'Flexible battery configuration, Isolation Transformer Compatible, Inbuilt Phase Sequence Correction, Sleep mode to enhance efficiency, Paralleling in ECO mode, Hot Swappable power modules, Common battery bank compatibility, Li-ion Battery Compatible',
      },
      images: [],
      isVisible: true,
      categoryId: catModularUPS.id,
      companyId: company.id
    }
  })

  // ══════════════════════════════════════════════════════════════════════
  // BESS — SINGLE PHASE
  // ══════════════════════════════════════════════════════════════════════

  await prisma.product.create({
    data: {
      name: 'NrgX Series',
      description: 'Single Phase BESS solution, 1kVA–10kVA. Smart & Sleek screw-less finish design with integrated Lithium-Ion Battery and fast charging capability up to 2 hours. Solar compatible.',
      specs: {
        'Capacity': '1 kVA – 10 kVA',
        'Phase': 'Single Phase',
        'Design Life': '10 Years',
        'Output': 'Pure Sine Wave',
        'Battery': 'Integrated Lithium-Ion with Fast Charging (up to 2 hours)',
        'Load Compatibility': 'IT / Motor / Industrial / AC',
        'Solar': 'Future Ready with Solar input compatibility',
        'Priority Selection': 'PV / Grid / Battery (configurable)',
        'Remote Monitoring': 'SNMP / IoT / WiFi or Bluetooth / Modbus',
        'Design': 'Plug & Play, Screw-less finish',
        'Backup': '1–8 hr',
      },
      images: [],
      isVisible: true,
      categoryId: catBESSSingle.id,
      companyId: company.id
    }
  })

  // ══════════════════════════════════════════════════════════════════════
  // BESS — THREE PHASE
  // ══════════════════════════════════════════════════════════════════════

  await prisma.product.create({
    data: {
      name: 'ESS15 Series',
      description: 'Three Phase BESS solution, 15kVA–60kVA. High Energy Density compact design with 7-inch touch screen. Supports peak shaving, load shifting, On-grid/Off-grid operation.',
      specs: {
        'Capacity': '15 kVA – 60 kVA',
        'Phase': 'Three Phase',
        'Design Life': '10 Years',
        'Display': '7-inch Touch Screen for Monitoring & Control',
        'Battery': 'Integrated Lithium-Ion with Fast Charging (up to 2 hours)',
        'Features': 'Inbuilt Cold Start & EPO Feature, High Energy Density (compact size)',
        'Solar': 'Future Ready with Solar input compatibility',
        'Operation Modes': 'Peak shaving / Load shifting / On-grid / Off-grid',
        'Priority Selection': 'PV / Grid / Battery (configurable)',
        'Remote Monitoring': 'SNMP / IoT / WiFi or Bluetooth / Modbus',
      },
      images: [],
      isVisible: true,
      categoryId: catBESSThree.id,
      companyId: company.id
    }
  })

  await prisma.product.create({
    data: {
      name: 'ESS50 Series',
      description: 'Three Phase BESS solution, 50kVA–200kVA. High Energy Density compact design, 7-inch touch screen, solar compatible with On-grid/Off-grid operation.',
      specs: {
        'Capacity': '50 kVA – 200 kVA',
        'Phase': 'Three Phase',
        'Design Life': '10 Years',
        'Display': '7-inch Touch Screen for Monitoring & Control',
        'Battery': 'Integrated Lithium-Ion with Fast Charging (up to 2 hours)',
        'Features': 'Inbuilt Cold Start & EPO Feature, High Energy Density (Compact size)',
        'Solar': 'Future Ready with Solar input compatibility',
        'Operation Modes': 'Peak shaving / Load shifting / On-grid / Off-grid',
        'Priority Selection': 'PV / Grid / Battery (configurable)',
        'Remote Monitoring': 'SNMP / IoT / WiFi or Bluetooth / Modbus',
      },
      images: [],
      isVisible: true,
      categoryId: catBESSThree.id,
      companyId: company.id
    }
  })

  await prisma.product.create({
    data: {
      name: 'NRGX Series (Large Scale)',
      description: 'Large scale BESS solution, 5kVA–500kVA. Inbuilt Li-ion battery with 10–15 year design life. Smart monitoring, load shifting, micro-grid application, and containerized outdoor solution.',
      specs: {
        'Capacity': '5 kVA – 500 kVA',
        'Design Life': '10–15 Years',
        'Battery': 'Inbuilt Li-ion Battery Solution',
        'Design': 'Smart, Sleek & Compact with less footprint',
        'Backup': '1–8 hr',
        'Features': 'Smart Monitoring for parameter monitoring on PC, Load shifting & Micro-grid application, Customized Output, Containerized solution for outdoor application, Very Low installation cost',
        'Solar Compatible': 'Yes',
      },
      images: [],
      isVisible: true,
      categoryId: catBESSThree.id,
      companyId: company.id
    }
  })

  // ══════════════════════════════════════════════════════════════════════
  // BESS — CONTAINERIZED
  // ══════════════════════════════════════════════════════════════════════

  await prisma.product.create({
    data: {
      name: 'Containerized BESS (Outdoor)',
      description: 'Outdoor containerized BESS solution, 125kW to 8MW. Modular lithium-ion battery packs in IP54 container with integrated power conversion, thermal management, and fire safety systems.',
      specs: {
        'Capacity': '125 kW – 8 MW',
        'Enclosure': 'IP54 Container',
        'Battery': 'Modular Lithium-Ion Battery Packs',
        'Features': 'Integrated Power Conversion Systems, Thermal Management, Fire Safety, Enhanced Safety with Integrated Monitoring',
        'Benefits': 'Easy transportation and installation, Scalability for future expansion, Cost efficiency through reduced civil works and rapid deployment',
        'Applications': 'Outdoor, Remote Sites, Industrial, Grid-Scale Storage',
      },
      images: [],
      isVisible: true,
      categoryId: catBESSContainer.id,
      companyId: company.id
    }
  })

  // ══════════════════════════════════════════════════════════════════════
  // DATA CENTER SOLUTIONS
  // ══════════════════════════════════════════════════════════════════════

  await prisma.product.create({
    data: {
      name: 'IDU (Integrated Data Unit) — Smart Rack',
      description: 'All-in-One Rack Cooling System with Integrated Air Conditioner, UPS, Battery, PDU, and Real Time Monitoring Software. Plug and Play deployment with sealed cabinet design.',
      specs: {
        'Components': 'Integrated Air Conditioner, UPS, Battery, PDU, Real Time Monitoring Software',
        'Cooling': 'Inrow Air Conditioner with Inverter Technology',
        'Features': 'Plug and Play, Easy swift and Smooth Deployment, Sealed Cabinet Design for Sustainable Cooling and Noise Reduction, Automatic Controlled Auto-Adjust for Maximum Energy Efficiency',
        'Includes': 'Monitor host, Power Distribution Unit, 10" Touch Screen Display, UPS Rack-mount/Module, Air Flow Management Module, Rack Mount Battery Pack, Ventilation Fan, Server Cabinet',
      },
      images: [],
      isVisible: true,
      categoryId: catDataCenter.id,
      companyId: company.id
    }
  })

  // ══════════════════════════════════════════════════════════════════════
  // ACCESSORIES & COMPONENTS
  // ══════════════════════════════════════════════════════════════════════

  const accessories = [
    {
      name: 'Static Transfer Switch (STS)',
      description: 'High-speed static transfer switch for critical load protection. Seamless transfer between two independent power sources.',
      specs: { 'Type': 'Static Transfer Switch', 'Application': 'Critical Load Protection, Data Centers' }
    },
    {
      name: 'Isolation Transformer (K-13)',
      description: 'K-13 rated isolation transformer for harmonic-rich environments. Provides galvanic isolation and reduces harmonic distortion.',
      specs: { 'Type': 'Isolation Transformer', 'Rating': 'K-13', 'Application': 'Harmonic-rich environments, Data Centers' }
    },
    {
      name: 'APFC Panel',
      description: 'Automatic Power Factor Correction panel to improve power factor and reduce energy costs.',
      specs: { 'Type': 'APFC Panel', 'Function': 'Automatic Power Factor Correction' }
    },
    {
      name: 'PDU (Power Distribution Unit)',
      description: 'Rack-mount Power Distribution Unit for efficient power distribution in data centers and server rooms.',
      specs: { 'Type': 'Power Distribution Unit', 'Form Factor': 'Rack Mount', 'Application': 'Data Centers, Server Rooms' }
    },
    {
      name: 'Li-ion Battery Pack',
      description: 'Modular Lithium-Ion battery pack compatible with BPE UPS systems. High energy density, long life cycle.',
      specs: { 'Type': 'Lithium-Ion Battery', 'Form Factor': 'Modular', 'Compatibility': 'BPE UPS Systems' }
    },
    {
      name: 'BHMS (Battery Health Monitoring System)',
      description: 'Intelligent battery health monitoring system for real-time parameter tracking and predictive maintenance.',
      specs: { 'Type': 'Battery Health Monitoring System', 'Monitoring': 'Real-time parameter tracking', 'Feature': 'Predictive Maintenance' }
    },
    {
      name: 'IoT Module',
      description: 'IoT connectivity module for remote monitoring and management of BPE power systems.',
      specs: { 'Type': 'IoT Module', 'Connectivity': 'WiFi, Bluetooth, SNMP, Modbus', 'Application': 'Remote Monitoring & Management' }
    },
    {
      name: 'Bus Bar / Ducts',
      description: 'High-capacity bus bar and duct systems for efficient power distribution in large installations.',
      specs: { 'Type': 'Bus Bar / Ducts', 'Application': 'Large scale power distribution' }
    },
  ]

  for (const acc of accessories) {
    await prisma.product.create({
      data: {
        ...acc,
        images: [],
        isVisible: true,
        categoryId: catAccessories.id,
        companyId: company.id
      }
    })
  }

  // ══════════════════════════════════════════════════════════════════════
  // SAMPLE LEADS
  // ══════════════════════════════════════════════════════════════════════

  await prisma.lead.createMany({
    data: [
      {
        name: 'Rajesh Kumar',
        email: 'rajesh@techcorp.in',
        phone: '+919876543210',
        message: 'Need pricing for 100kVA UPS for our data center. Urgently required.',
        wishlistSnapshot: [{ name: 'GTPIX Series', capacity: '100kVA' }],
        status: 'new',
        companyId: company.id
      },
      {
        name: 'Priya Sharma',
        email: 'priya@manufacturer.com',
        phone: '+918765432109',
        message: 'Looking for BESS solution for our 200kW solar installation.',
        wishlistSnapshot: [{ name: 'ESS50 Series' }, { name: 'Containerized BESS' }],
        status: 'reviewed',
        companyId: company.id
      },
      {
        name: 'Ahmed Al-Rashid',
        email: 'ahmed@infra.ae',
        phone: '+971501234567',
        message: 'Require 500kVA UPS for airport infrastructure project in UAE.',
        wishlistSnapshot: [{ name: 'GTP-InfiniteX Series' }, { name: 'IDU Smart Rack' }],
        status: 'contacted',
        companyId: company.id
      },
    ]
  })

  console.log('✅ Seed complete!')
  console.log(`Company ID: ${company.id}`)
  console.log('Admin login: admin@bpe.com / password123')
  console.log('Categories created: 10')
  console.log('Products created: 18')
  console.log('Sample leads created: 3')
}

main().catch(console.error).finally(() => prisma.$disconnect())