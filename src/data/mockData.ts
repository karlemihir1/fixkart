import { 
  DeviceCategory, 
  SymptomOption, 
  BrandModel, 
  SparePart, 
  Technician, 
  RepairOrder, 
  RepairPassport, 
  PinCodeServiceability 
} from '../types';

export const CATEGORIES: DeviceCategory[] = [
  {
    id: 'home',
    name: 'Home Appliances',
    tagline: 'Washing Machines • Refrigerators • Inverter ACs • Microwave Ovens',
    iconName: 'WashingMachine',
    accentColor: '#FF5400',
    itemCount: 1420,
    devices: [
      { id: 'wm', categoryId: 'home', name: 'Washing Machine', popularBrands: ['Samsung', 'LG', 'IFB', 'Whirlpool', 'Bosch'], icon: 'WashingMachine', avgRepairTime: '45 mins' },
      { id: 'ac', categoryId: 'home', name: 'Inverter & Split AC', popularBrands: ['LG', 'Daikin', 'Voltas', 'Samsung', 'Panasonic'], icon: 'Wind', avgRepairTime: '60 mins' },
      { id: 'ref', categoryId: 'home', name: 'Refrigerator', popularBrands: ['Samsung', 'LG', 'Whirlpool', 'Godrej', 'Haier'], icon: 'Refrigerator', avgRepairTime: '50 mins' },
      { id: 'mw', categoryId: 'home', name: 'Microwave & OTG', popularBrands: ['LG', 'Samsung', 'IFB', 'Bajaj', 'Morphy Richards'], icon: 'Microwave', avgRepairTime: '35 mins' },
    ]
  },
  {
    id: 'tech',
    name: 'Consumer Tech',
    tagline: 'Smart TVs • Laptops • Smartphones • Audio & Consoles',
    iconName: 'Tv',
    accentColor: '#1E60F2',
    itemCount: 980,
    devices: [
      { id: 'tv', categoryId: 'tech', name: 'Smart 4K / OLED TV', popularBrands: ['Sony', 'Samsung', 'LG', 'OnePlus', 'Mi'], icon: 'Tv', avgRepairTime: '60 mins' },
      { id: 'laptop', categoryId: 'tech', name: 'Laptop & Mac', popularBrands: ['Apple', 'Dell', 'HP', 'Lenovo', 'Asus'], icon: 'Laptop', avgRepairTime: '75 mins' },
      { id: 'phone', categoryId: 'tech', name: 'Smartphone', popularBrands: ['Apple', 'Samsung', 'OnePlus', 'Xiaomi', 'Vivo'], icon: 'Smartphone', avgRepairTime: '40 mins' },
      { id: 'audio', categoryId: 'tech', name: 'Soundbars & Audio', popularBrands: ['Sony', 'JBL', 'Bose', 'Boat', 'Marshall'], icon: 'Speaker', avgRepairTime: '40 mins' },
    ]
  },
  {
    id: 'ride',
    name: 'Two-Wheeler / Ride',
    tagline: 'Scooters & Motorcycles • Braking • Ignition • Electricals',
    iconName: 'Bike',
    accentColor: '#10B981',
    itemCount: 650,
    devices: [
      { id: 'scooter', categoryId: 'ride', name: 'Gearless Scooter', popularBrands: ['Honda', 'TVS', 'Suzuki', 'Ather', 'Ola'], icon: 'Bike', avgRepairTime: '50 mins' },
      { id: 'motorcycle', categoryId: 'ride', name: 'Motorcycle & Commuter', popularBrands: ['Hero', 'Bajaj', 'Honda', 'Yamaha', 'Royal Enfield'], icon: 'Gauge', avgRepairTime: '60 mins' },
      { id: 'ev-bike', categoryId: 'ride', name: 'Electric Two-Wheeler', popularBrands: ['Ather', 'Ola Electric', 'TVS iQube', 'Bajaj Chetak'], icon: 'Zap', avgRepairTime: '45 mins' },
    ]
  }
];

export const SYMPTOMS_BY_DEVICE: Record<string, SymptomOption[]> = {
  wm: [
    {
      id: 'wm-drain',
      title: "Doesn't Drain (Water Trapped Inside)",
      description: "Machine hums at drain cycle or displays OE / 5E / 4E error, drum remains full of water.",
      likelyRootCause: "Drain Pump Impeller Seizure / Solenoid Burnout",
      severity: 'high',
      estimatedPartCost: '₹599 - ₹1,499',
      suggestedAction: "Replace drain pump unit & clean lint trap filter."
    },
    {
      id: 'wm-spin',
      title: "Doesn't Spin / Drum Stuck",
      description: "Drum makes buzzing noise but doesn't rotate, or belt slips during spin cycle.",
      likelyRootCause: "Drive Belt Snap or Motor Carbon Brush Wear",
      severity: 'high',
      estimatedPartCost: '₹399 - ₹950',
      suggestedAction: "Inspect drive belt tension and motor starter capacitor."
    },
    {
      id: 'wm-noise',
      title: "Excessive Grinding / Metallic Thumping",
      description: "Very loud banging noise especially during high RPM spin cycles, drum feels loose on axle.",
      likelyRootCause: "Tub Bearing & Spider Arm Corrosion",
      severity: 'high',
      estimatedPartCost: '₹750 - ₹1,800',
      suggestedAction: "Replace rear drum sealed bearing kit and spider bracket."
    },
    {
      id: 'wm-leak',
      title: "Water Leaking from Underneath",
      description: "Puddle under machine during fill cycle or rinse stage.",
      likelyRootCause: "Inlet Solenoid Valve Crack or Bellow Gasket Tear",
      severity: 'medium',
      estimatedPartCost: '₹450 - ₹1,100',
      suggestedAction: "Replace rubber door bellow or dual-head inlet valve."
    },
    {
      id: 'wm-fill',
      title: "Not Filling Water / Slow Inlet",
      description: "Inlet water tap is open but machine shows IE / 4E error code.",
      likelyRootCause: "Inlet Solenoid Valve Coil Failure",
      severity: 'low',
      estimatedPartCost: '₹350 - ₹799',
      suggestedAction: "Replace 220V dual solenoid intake valve."
    },
    {
      id: 'wm-power',
      title: "Won't Turn On / Power Board Dead",
      description: "Display panel completely dark, no response to power button press.",
      likelyRootCause: "SMPS Control PCB Surge Damage / Fuse Blown",
      severity: 'high',
      estimatedPartCost: '₹1,200 - ₹2,800',
      suggestedAction: "Diagnostic bench test on main control PCB board."
    }
  ],
  ac: [
    {
      id: 'ac-cooling',
      title: "Not Cooling / Blows Room Temperature Air",
      description: "Indoor fan runs normally but outdoor compressor fails to start or hums briefly and trips.",
      likelyRootCause: "Compressor Run Capacitor (45/50µF) Degradation",
      severity: 'high',
      estimatedPartCost: '₹450 - ₹1,200',
      suggestedAction: "Replace dual-run metallized polypropylene capacitor."
    },
    {
      id: 'ac-leak',
      title: "Indoor Unit Water Dripping Inside Room",
      description: "Water overflows from indoor plastic casing instead of draining through exterior pipe.",
      likelyRootCause: "Drain Tray Algae Clog / Cracked Condensate Pan",
      severity: 'medium',
      estimatedPartCost: '₹299 - ₹650',
      suggestedAction: "High-pressure drain line flush & condensate tray seal."
    },
    {
      id: 'ac-noise',
      title: "Loud Vibration / Rattling in Outdoor Unit",
      description: "Outdoor unit sounds like a diesel engine or vibrates room wall.",
      likelyRootCause: "Condenser Fan Motor Bush Wear / Loose Mounting Dampers",
      severity: 'medium',
      estimatedPartCost: '₹850 - ₹1,950',
      suggestedAction: "Replace condenser blower motor & anti-vibration rubber mounts."
    },
    {
      id: 'ac-error',
      title: "Displays Error Code (CH05 / E1 / F3 / EC)",
      description: "AC runs for 3 minutes, shuts down, and displays blinking error code.",
      likelyRootCause: "Indoor/Outdoor Thermistor Sensor Drift or Communication PCB",
      severity: 'high',
      estimatedPartCost: '₹380 - ₹1,400',
      suggestedAction: "Replace copper coil temperature sensor probe (10k/15k Ohm)."
    }
  ],
  tv: [
    {
      id: 'tv-backlight',
      title: "Sound Works but Screen is Completely Black",
      description: "When shining a torch close to screen, faint images can be seen; audio is loud and clear.",
      likelyRootCause: "LED Backlight Strip Matrix Burnout",
      severity: 'high',
      estimatedPartCost: '₹1,100 - ₹2,400',
      suggestedAction: "Replace entire array of 6V aluminum LED backlight strips."
    },
    {
      id: 'tv-lines',
      title: "Horizontal / Vertical Colored Lines on Screen",
      description: "Distorted colored vertical bars across panel after slight thermal warmup.",
      likelyRootCause: "T-CON Logic Board Chip Failure or Ribbon Cable Oxidation",
      severity: 'high',
      estimatedPartCost: '₹950 - ₹2,200',
      suggestedAction: "Replace 4K UHD T-CON timing controller board."
    },
    {
      id: 'tv-power',
      title: "Red Standby LED Blinks Continuously (Won't Turn On)",
      description: "TV stays in standby loop, clicking relay sound heard every 5 seconds.",
      likelyRootCause: "Power Supply Unit (PSU) High-Voltage Capacitor Swelling",
      severity: 'high',
      estimatedPartCost: '₹1,250 - ₹2,900',
      suggestedAction: "Replace or re-cap master power supply board."
    }
  ],
  scooter: [
    {
      id: 'scooter-brake',
      title: "Spongy / Squealing Front Brake (Low Bite)",
      description: "Brake lever goes all the way to handlebar; metallic screech when coming to a halt.",
      likelyRootCause: "Disc Brake Pad Friction Material Worn to Backing Plate",
      severity: 'high',
      estimatedPartCost: '₹280 - ₹690',
      suggestedAction: "Replace sintered ceramic brake pads and bleed hydraulic brake fluid."
    },
    {
      id: 'scooter-start',
      title: "Electric Starter Clicks but Engine Won't Crank",
      description: "Horn & headlight work, but pressing starter button only gives a single 'click' sound.",
      likelyRootCause: "Starter Motor Relay Solenoid Contact Oxidation",
      severity: 'medium',
      estimatedPartCost: '₹220 - ₹550',
      suggestedAction: "Replace 12V 4-pin sealed starter relay switch."
    },
    {
      id: 'scooter-belt',
      title: "Loss of Acceleration / Engine Revs but Slow Pickup",
      description: "Engine screams when throttle opened, but scooter crawls sluggishly.",
      likelyRootCause: "CVT Drive V-Belt Glazed & Variator Roller Weight Flat Spots",
      severity: 'high',
      estimatedPartCost: '₹550 - ₹1,350',
      suggestedAction: "Replace Kevlar reinforced CVT drive belt and variator roller set."
    }
  ]
};

export const BRAND_MODELS: Record<string, BrandModel[]> = {
  wm: [
    {
      brand: 'Samsung',
      models: [
        { id: 'sam-ww80j', modelNumber: 'WW80J4243MW', commercialName: '8.0 kg Fully Automatic EcoBubble Front Load', year: '2022', schematicId: 'SCH-SAM-FL80' },
        { id: 'sam-wa65t', modelNumber: 'WA65T4262GG', commercialName: '6.5 kg Diamond Drum Top Load', year: '2021', schematicId: 'SCH-SAM-TL65' },
        { id: 'sam-ww70t', modelNumber: 'WW70T502DAX', commercialName: '7.0 kg AI Control Hygiene Steam Front Load', year: '2023', schematicId: 'SCH-SAM-FL70' }
      ]
    },
    {
      brand: 'LG',
      models: [
        { id: 'lg-fhm1408', modelNumber: 'FHM1408BDW', commercialName: '8.0 kg Direct Drive Inverter Front Load', year: '2023', schematicId: 'SCH-LG-DD80' },
        { id: 'lg-t70sksf', modelNumber: 'T70SKSF1Z', commercialName: '7.0 kg Smart Inverter TurboDrum Top Load', year: '2022', schematicId: 'SCH-LG-TL70' },
        { id: 'lg-fhp1208', modelNumber: 'FHP1208Z5M', commercialName: '8.5 kg AI DD 6 Motion Front Load', year: '2024', schematicId: 'SCH-LG-AI85' }
      ]
    },
    {
      brand: 'IFB',
      models: [
        { id: 'ifb-senator', modelNumber: 'SENATOR-WSS-8KG', commercialName: 'Senator Smart 8 kg Front Load', year: '2022', schematicId: 'SCH-IFB-SEN8' },
        { id: 'ifb-elena', modelNumber: 'ELENA-ZSS-6.5KG', commercialName: 'Elena Aqua SX 6.5 kg Front Load', year: '2021', schematicId: 'SCH-IFB-ELE6' }
      ]
    },
    {
      brand: 'Bosch',
      models: [
        { id: 'bosch-waj2426', modelNumber: 'WAJ24266IN', commercialName: 'Series 4 7 kg 1200 RPM Front Load', year: '2022', schematicId: 'SCH-BOS-S470' },
        { id: 'bosch-wat2846', modelNumber: 'WAT28461IN', commercialName: 'Series 6 8 kg EcoSilence Drive Front Load', year: '2023', schematicId: 'SCH-BOS-S680' }
      ]
    }
  ],
  ac: [
    {
      brand: 'LG',
      models: [
        { id: 'lg-msq18', modelNumber: 'MS-Q18ENZA', commercialName: '1.5 Ton 5-Star Dual Inverter Split AC', year: '2023', schematicId: 'SCH-LG-AC15' },
        { id: 'lg-psq19', modelNumber: 'PS-Q19CNZE', commercialName: '1.5 Ton AI Convertible 6-in-1 AC', year: '2024', schematicId: 'SCH-LG-AC15AI' }
      ]
    },
    {
      brand: 'Daikin',
      models: [
        { id: 'daikin-ftkf', modelNumber: 'FTKF50TV16U', commercialName: '1.5 Ton 5-Star Neo Swing Inverter AC', year: '2022', schematicId: 'SCH-DAI-FT50' },
        { id: 'daikin-gtl', modelNumber: 'GTL50TV16U', commercialName: '1.5 Ton 3-Star Standard Split AC', year: '2021', schematicId: 'SCH-DAI-GT50' }
      ]
    },
    {
      brand: 'Voltas',
      models: [
        { id: 'voltas-185v', modelNumber: '185V-ADS', commercialName: '1.5 Ton 5-Star Adjustable Inverter AC', year: '2023', schematicId: 'SCH-VOL-185V' }
      ]
    }
  ],
  scooter: [
    {
      brand: 'Honda',
      models: [
        { id: 'honda-act-6g', modelNumber: 'ACTIVA-6G-BS6', commercialName: 'Activa 6G 110cc PGM-FI', year: '2022', schematicId: 'SCH-HON-ACT6G' },
        { id: 'honda-act-125', modelNumber: 'ACTIVA-125-DISC', commercialName: 'Activa 125cc Alloy Disc BS6', year: '2023', schematicId: 'SCH-HON-ACT125' }
      ]
    },
    {
      brand: 'TVS',
      models: [
        { id: 'tvs-jup-125', modelNumber: 'JUPITER-125-BT', commercialName: 'Jupiter 125 Disc Bluetooth Connected', year: '2023', schematicId: 'SCH-TVS-JUP125' },
        { id: 'tvs-ntorq', modelNumber: 'NTORQ-125-RACE', commercialName: 'NTORQ 125 Race Edition RT-Fi', year: '2023', schematicId: 'SCH-TVS-NTORQ' }
      ]
    }
  ]
};

export const SAMPLE_SPARE_PARTS: SparePart[] = [
  // Washing Machine Drain Pumps (Tiers: OEM, Certified, Economy)
  {
    id: 'part-wm-pump-oem',
    sku: 'FK-SAM-DP-0982',
    name: 'Samsung Genuine OEM Synchronous Drain Pump Motor (30W 220V)',
    category: 'home',
    deviceTypeId: 'wm',
    brand: 'Samsung',
    tier: 'OEM',
    price: 1499,
    originalPrice: 1850,
    compatibilityScore: 100,
    compatibilityType: 'EXACT_MATCH',
    compatibleModelIds: ['sam-ww80j', 'sam-wa65t', 'sam-ww70t'],
    supplier: {
      id: 'supp-apex',
      name: 'Apex Spares & Components Ltd (Samsung Authorized Distributor)',
      location: 'Peenya Industrial Area, Bengaluru',
      verified: true,
      rating: 4.9,
      ratingCount: 3820,
      fulfillmentRate: 99.4
    },
    warrantyDays: 180,
    stockCount: 42,
    batchNumber: 'BATCH-2026-AUG-SAM-9011',
    authenticityHash: 'SHA256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    deliveryDays: 'Delivery in 2 hours with Express Technician',
    installationFee: 349,
    rating: 4.9,
    reviewCount: 428,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    specs: {
      'Voltage': '220-240V AC 50Hz',
      'Power Rating': '30 Watts Copper Winding',
      'Flow Rate': '20 Liters / Minute',
      'Impeller Material': 'Reinforced POM Thermoplastic',
      'Mounting': '3-Hole Bayonet Lock Flange'
    },
    keyFeatures: [
      '100% Samsung Original Spare Part with Laser Hologram',
      'Copper wound stator coil with thermal overload cutoff (130°C)',
      '180-day direct FixKart replacement guarantee',
      'Matches Samsung Part code: DC31-00181A'
    ],
    inStock: true
  },
  {
    id: 'part-wm-pump-cert',
    sku: 'FK-CRT-DP-8821',
    name: 'FixKart Certified Pro Flow Heavy-Duty Universal Drain Pump',
    category: 'home',
    deviceTypeId: 'wm',
    brand: 'Samsung',
    tier: 'CERTIFIED',
    price: 899,
    originalPrice: 1299,
    compatibilityScore: 98,
    compatibilityType: 'VERIFIED_COMPATIBLE',
    compatibleModelIds: ['sam-ww80j', 'sam-wa65t', 'sam-ww70t', 'lg-fhm1408', 'ifb-senator'],
    supplier: {
      id: 'supp-techflow',
      name: 'TechFlow Precision Electro-Mechanics',
      location: 'Okhla Phase II, New Delhi',
      verified: true,
      rating: 4.7,
      ratingCount: 1940,
      fulfillmentRate: 98.1
    },
    warrantyDays: 90,
    stockCount: 85,
    batchNumber: 'BATCH-2026-TF-PRO-441',
    authenticityHash: 'SHA256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069',
    deliveryDays: 'Delivery in 2 hours with Express Technician',
    installationFee: 349,
    rating: 4.7,
    reviewCount: 312,
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    specs: {
      'Voltage': '220-240V AC 50Hz',
      'Power Rating': '35 Watts High-Torque',
      'Flow Rate': '22 Liters / Minute',
      'Impeller Material': 'PA66 Glass-Filled Nylon',
      'Mounting': 'Universal 3-Screw Multi-Bracket'
    },
    keyFeatures: [
      'FixKart Laboratory Tested for 10,000 continuous drain cycles',
      'Double sealed anti-friction ceramic shaft bearing',
      '90-day FixKart standard warranty included',
      '98% compatibility with top load & front load models'
    ],
    inStock: true
  },
  {
    id: 'part-wm-pump-econ',
    sku: 'FK-ECN-DP-1049',
    name: 'ValueLine Standard Economy Drain Pump Assembly',
    category: 'home',
    deviceTypeId: 'wm',
    brand: 'Samsung',
    tier: 'ECONOMY',
    price: 599,
    originalPrice: 850,
    compatibilityScore: 91,
    compatibilityType: 'VERIFIED_COMPATIBLE',
    compatibleModelIds: ['sam-ww80j', 'sam-wa65t'],
    supplier: {
      id: 'supp-national',
      name: 'National Spares Hub',
      location: 'Kukatpally, Hyderabad',
      verified: true,
      rating: 4.4,
      ratingCount: 890,
      fulfillmentRate: 95.8
    },
    warrantyDays: 30,
    stockCount: 110,
    batchNumber: 'BATCH-2026-VL-899',
    authenticityHash: 'SHA256:cb4396014e217d84873138b30ef2c6e6e2fd4ecf97e3f6055d7a6e13352697ef',
    deliveryDays: 'Delivery in 3 hours with Standard Dispatch',
    installationFee: 349,
    rating: 4.3,
    reviewCount: 142,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    specs: {
      'Voltage': '220-240V AC',
      'Power Rating': '28 Watts Aluminium-Copper',
      'Flow Rate': '18 Liters / Minute',
      'Impeller Material': 'Standard ABS Plastic',
      'Mounting': 'Standard 3-Tab Flange'
    },
    keyFeatures: [
      'Budget-friendly functional alternative for older machines',
      'Factory bench-tested for baseline water pressure',
      '30-day FixKart basic warranty',
      'Ideal for rental apartments or secondary appliances'
    ],
    inStock: true
  },

  // Inverter AC Dual Run Capacitors & PCB Boards
  {
    id: 'part-ac-cap-oem',
    sku: 'FK-LG-CAP-50UF',
    name: 'LG Original Dual Run Motor Capacitor (50+5µF 450VAC Metallized Polypropylene)',
    category: 'home',
    deviceTypeId: 'ac',
    brand: 'LG',
    tier: 'OEM',
    price: 850,
    originalPrice: 1150,
    compatibilityScore: 100,
    compatibilityType: 'EXACT_MATCH',
    compatibleModelIds: ['lg-msq18', 'lg-psq19'],
    supplier: {
      id: 'supp-apex',
      name: 'Apex Spares & Components Ltd',
      location: 'Peenya Industrial Area, Bengaluru',
      verified: true,
      rating: 4.9,
      ratingCount: 3820,
      fulfillmentRate: 99.4
    },
    warrantyDays: 180,
    stockCount: 64,
    batchNumber: 'BATCH-2026-CAP-LG-77',
    authenticityHash: 'SHA256:1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
    deliveryDays: 'Delivery in 2 hours',
    installationFee: 399,
    rating: 4.9,
    reviewCount: 289,
    image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=800&q=80',
    specs: {
      'Capacitance': '50µF ±5% (Herm) + 5µF (Fan)',
      'Rated Voltage': '450V AC 50/60Hz',
      'Dielectric': 'Self-healing Metallized Polypropylene Film',
      'Operating Temp': '-40°C to +85°C'
    },
    keyFeatures: [
      '10,000 AFC Anti-Explosion Pressure Sensitive Interrupter',
      'Direct fit for LG Dual Inverter outdoor condenser fan and compressor',
      '180-day guarantee'
    ],
    inStock: true
  },

  // Two-Wheeler Disc Brake Pads
  {
    id: 'part-scooter-brake-oem',
    sku: 'FK-HON-BP-6G',
    name: 'Honda Genuine Sintered Ceramic Disc Brake Pad Set',
    category: 'ride',
    deviceTypeId: 'scooter',
    brand: 'Honda',
    tier: 'OEM',
    price: 490,
    originalPrice: 650,
    compatibilityScore: 100,
    compatibilityType: 'EXACT_MATCH',
    compatibleModelIds: ['honda-act-6g', 'honda-act-125'],
    supplier: {
      id: 'supp-motocare',
      name: 'MotoCare Genuine Two-Wheeler Spares',
      location: 'JC Road Auto Market, Bengaluru',
      verified: true,
      rating: 4.8,
      ratingCount: 1650,
      fulfillmentRate: 98.9
    },
    warrantyDays: 180,
    stockCount: 95,
    batchNumber: 'BATCH-2026-HON-BRK-129',
    authenticityHash: 'SHA256:5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
    deliveryDays: 'Delivery in 90 mins with Mobile Moto Tech',
    installationFee: 199,
    rating: 4.9,
    reviewCount: 390,
    image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80',
    specs: {
      'Friction Material': 'Non-Asbestos High-Density Sintered Ceramic',
      'Rotor Compatibility': 'Stainless Steel Slotted / Solid Disc Rotors',
      'Heat Resistance': 'Up to 450°C fade resistance'
    },
    keyFeatures: [
      'High-bite friction formulation for wet monsoon braking in Indian conditions',
      'Anti-squeal shims and stainless steel retaining clips included',
      '180-day warranty'
    ],
    inStock: true
  },

  // Smart TV LED Backlight Strip Array
  {
    id: 'part-tv-led-oem',
    sku: 'FK-SNY-BL-55X75',
    name: 'Sony Bravia 55" Aluminum Core High-CRI LED Backlight Strip Array (Set of 8)',
    category: 'tech',
    deviceTypeId: 'tv',
    brand: 'Sony',
    tier: 'OEM',
    price: 2199,
    originalPrice: 2890,
    compatibilityScore: 100,
    compatibilityType: 'EXACT_MATCH',
    compatibleModelIds: ['sny-55x75', 'sny-55x80'],
    supplier: {
      id: 'supp-screenpro',
      name: 'ScreenPro Electronics Spares',
      location: 'Lamington Road, Mumbai',
      verified: true,
      rating: 4.9,
      ratingCount: 2200,
      fulfillmentRate: 99.1
    },
    warrantyDays: 180,
    stockCount: 28,
    batchNumber: 'BATCH-2026-SNY-LED-55',
    authenticityHash: 'SHA256:3b612c75a7b5048a435fb6ec81e52ff92d6d795a8b5a9c17070f6a63c97a53b2',
    deliveryDays: 'Delivery in 2 hours with Master Electronics Tech',
    installationFee: 599,
    rating: 4.9,
    reviewCount: 165,
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=800&q=80',
    specs: {
      'LED Count': '8 Strips x 6 Diodes (48 High-Lumen Diodes)',
      'Forward Voltage': '6V per LED bead',
      'Base Substrate': 'Pure Thermally Conductive Aviation Aluminum',
      'Lens Type': 'Optical Concave Micro-Prism Uniform Diffuser'
    },
    keyFeatures: [
      '100% Sony OEM specifications with original connector pinouts',
      'High thermal dissipation aluminum backboard prevents future burnout',
      '180-day warranty'
    ],
    inStock: true
  }
];

export const VERIFIED_TECHNICIANS: Technician[] = [
  {
    id: 'tech-raj-kumar',
    name: 'Raj Kumar',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    rating: 4.94,
    reviewCount: 1420,
    repairsCompleted: 2180,
    firstTimeFixRate: 98.4,
    distanceKm: 1.8,
    estimatedArrivalMin: 35,
    baseLaborFee: 349,
    skills: ['Samsung Certified Master Tech', 'Inverter Electronics PCB', 'Front-Load Hydraulics', 'HVAC Dual-Cooling'],
    verifiedBadge: true,
    yearsExperience: 8,
    currentLocationName: 'Koramangala 4th Block, Bengaluru',
    availableToday: true,
    badges: ['Top 1% Fix Rate', 'Samsung Authorized Specialist', 'FixKart Master Badge']
  },
  {
    id: 'tech-vikram-singh',
    name: 'Vikram Singh',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    rating: 4.88,
    reviewCount: 980,
    repairsCompleted: 1540,
    firstTimeFixRate: 97.2,
    distanceKm: 3.2,
    estimatedArrivalMin: 45,
    baseLaborFee: 349,
    skills: ['LG & Whirlpool Specialist', 'Compressor Re-gassing', 'Appliance Electrical Diagnostics'],
    verifiedBadge: true,
    yearsExperience: 6,
    currentLocationName: 'Indiranagar 100ft Road, Bengaluru',
    availableToday: true,
    badges: ['LG Gold Certified', '90-Day Guarantee Hero']
  },
  {
    id: 'tech-priya-sharma',
    name: 'Priya Sharma',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    rating: 4.97,
    reviewCount: 1890,
    repairsCompleted: 2450,
    firstTimeFixRate: 99.1,
    distanceKm: 2.4,
    estimatedArrivalMin: 40,
    baseLaborFee: 499,
    skills: ['4K OLED & MicroLED Panel Surgery', 'BGA SMD Soldering', 'Motherboard Micro-Trace Repair'],
    verifiedBadge: true,
    yearsExperience: 10,
    currentLocationName: 'HSR Layout Sector 2, Bengaluru',
    availableToday: true,
    badges: ['Precision Soldering Pro', 'Sony & Apple Screen Specialist']
  },
  {
    id: 'tech-amit-patel',
    name: 'Amit Patel',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    rating: 4.85,
    reviewCount: 650,
    repairsCompleted: 980,
    firstTimeFixRate: 96.8,
    distanceKm: 4.1,
    estimatedArrivalMin: 55,
    baseLaborFee: 199,
    skills: ['Two-Wheeler Hydraulic Disc Overhauls', 'BS6 PGM-FI Electricals', 'CVT Variator Tuning'],
    verifiedBadge: true,
    yearsExperience: 5,
    currentLocationName: 'BTM Layout 2nd Stage, Bengaluru',
    availableToday: true,
    badges: ['Two-Wheeler Fleet Specialist', 'Fastest Response Award']
  }
];

export const PIN_CODES_DATABASE: Record<string, PinCodeServiceability> = {
  '560034': {
    pin: '560034',
    city: 'Bengaluru',
    state: 'Karnataka',
    isServiceable: true,
    partsDeliveryTime: '2 hours (Peenya Hub)',
    expressTechnicianETA: '35 mins',
    techniciansAvailable: 14
  },
  '560001': {
    pin: '560001',
    city: 'Bengaluru',
    state: 'Karnataka',
    isServiceable: true,
    partsDeliveryTime: '2 hours (Peenya Hub)',
    expressTechnicianETA: '40 mins',
    techniciansAvailable: 18
  },
  '400050': {
    pin: '400050',
    city: 'Mumbai',
    state: 'Maharashtra',
    isServiceable: true,
    partsDeliveryTime: '2 hours (Bandra Hub)',
    expressTechnicianETA: '45 mins',
    techniciansAvailable: 22
  },
  '110001': {
    pin: '110001',
    city: 'New Delhi',
    state: 'Delhi NCR',
    isServiceable: true,
    partsDeliveryTime: '2 hours (Okhla Hub)',
    expressTechnicianETA: '30 mins',
    techniciansAvailable: 26
  },
  '500081': {
    pin: '500081',
    city: 'Hyderabad',
    state: 'Telangana',
    isServiceable: true,
    partsDeliveryTime: '3 hours (HITEC Hub)',
    expressTechnicianETA: '50 mins',
    techniciansAvailable: 12
  },
  '600028': {
    pin: '600028',
    city: 'Chennai',
    state: 'Tamil Nadu',
    isServiceable: true,
    partsDeliveryTime: '3 hours (Guindy Hub)',
    expressTechnicianETA: '45 mins',
    techniciansAvailable: 11
  },
  '799001': {
    pin: '799001',
    city: 'Agartala',
    state: 'Tripura',
    isServiceable: false,
    partsDeliveryTime: 'Not serviceable yet',
    expressTechnicianETA: 'No technicians',
    techniciansAvailable: 0
  }
};

export const INITIAL_ORDERS: RepairOrder[] = [
  {
    id: 'ord-8842',
    trackingNumber: 'FK-BLR-2026-8842',
    customerName: 'Ananya Deshmukh',
    customerPhone: '+91 98450 12890',
    customerAddress: 'Flat 402, Oakwood Enclave, 17th Main, Koramangala 4th Block',
    pinCode: '560034',
    productName: 'Samsung EcoBubble 8.0 kg Front Load Washing Machine',
    brand: 'Samsung',
    modelNumber: 'WW80J4243MW',
    problemDiagnosed: 'Drain Pump Motor Impeller Seizure (Doesn’t drain error 5E)',
    status: 'TECHNICIAN_ON_THE_WAY',
    createdAt: '31 Aug 2026, 08:30 AM',
    scheduledTime: 'Today, 10:00 AM - 11:00 AM',
    part: SAMPLE_SPARE_PARTS[0],
    technician: VERIFIED_TECHNICIANS[0],
    totalAmount: 1848,
    paymentMethod: 'UPI',
    paymentStatus: 'PAID',
    otpCode: '4892',
    passportId: 'FK-PASSPORT-2026-8842',
    guaranteeExpiresAt: '29 Nov 2026',
    timelineLogs: [
      { time: '08:30 AM', title: 'Problem Diagnosed & Order Placed', description: 'AI Scan verified 92% confidence drain pump fault; OEM Part selected with Technician combo.', completed: true },
      { time: '08:42 AM', title: 'Part Verified & Dispatched from Hub', description: 'Apex Spares scanned batch BATCH-2026-AUG-SAM-9011. Genuine hologram verified.', completed: true },
      { time: '09:05 AM', title: 'Technician Assigned', description: 'Raj Kumar (4.9★, 98.4% FTF rate) accepted job and verified toolset.', completed: true },
      { time: '09:18 AM', title: 'Technician En Route (1.8 km away)', description: 'Raj Kumar is traveling to customer address via Koramangala 17th Main.', completed: true },
      { time: 'Estimated 10:00 AM', title: 'Repair & Live Diagnostics', description: 'Technician will install part, execute 3-step pressure drain cycle test.', completed: false },
      { time: 'Estimated 10:45 AM', title: 'FixKart 90-Day Digital Guarantee Activated', description: 'Minting Digital Repair Passport with before/after photos and QR code.', completed: false }
    ]
  }
];

export const INITIAL_REPAIR_PASSPORTS: RepairPassport[] = [
  {
    id: 'pass-8840',
    passportNumber: 'FK-PASSPORT-2026-8840',
    orderId: 'ord-8840',
    productName: 'LG 1.5 Ton 5-Star Dual Inverter Split AC',
    brand: 'LG',
    modelNumber: 'MS-Q18ENZA',
    serialNumber: 'LG-AC-2023-991823-BLR',
    repairDate: '18 Aug 2026',
    problemFixed: 'Compressor Trip & Outdoor Condenser Fan Stalling',
    partInstalledName: 'LG Original Dual Run Motor Capacitor (50+5µF 450VAC)',
    partTier: 'OEM',
    partBatchNumber: 'BATCH-2026-CAP-LG-77',
    technicianName: 'Raj Kumar',
    technicianCertId: 'CERT-FK-TECH-9014',
    totalCost: 1249,
    warrantyExpiryDate: '16 Nov 2026',
    daysRemaining: 77,
    status: 'ACTIVE',
    beforePhoto: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
    afterPhoto: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80',
    digitalCertificateHash: 'FK-CERT-8840-A91B82C7-VERIFIED-GENUINE',
    qrPayload: 'https://fixkart.in/passport/FK-PASSPORT-2026-8840'
  },
  {
    id: 'pass-8835',
    passportNumber: 'FK-PASSPORT-2026-8835',
    orderId: 'ord-8835',
    productName: 'Honda Activa 6G 110cc PGM-FI',
    brand: 'Honda',
    modelNumber: 'ACTIVA-6G-BS6',
    serialNumber: 'ME4JF913NL801923',
    repairDate: '04 Jul 2026',
    problemFixed: 'Front Disc Brake Squeal & Fluid Oxidation',
    partInstalledName: 'Honda Genuine Sintered Ceramic Disc Brake Pad Set',
    partTier: 'OEM',
    partBatchNumber: 'BATCH-2026-HON-BRK-129',
    technicianName: 'Amit Patel',
    technicianCertId: 'CERT-FK-TECH-4112',
    totalCost: 689,
    warrantyExpiryDate: '02 Oct 2026',
    daysRemaining: 32,
    status: 'ACTIVE',
    beforePhoto: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80',
    afterPhoto: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=600&q=80',
    digitalCertificateHash: 'FK-CERT-8835-9F01B34E-VERIFIED-GENUINE',
    qrPayload: 'https://fixkart.in/passport/FK-PASSPORT-2026-8835'
  }
];

export const SAMPLE_SCAN_IMAGES = [
  {
    id: 'scan-wm-pump',
    title: 'Washing Machine Drain Pump (Impeller Jammed)',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    confidence: 94,
    detectedIssue: 'Drain Pump Impeller Seizure & Debris Blockage',
    deviceTypeId: 'wm',
    symptomId: 'wm-drain',
    tierMatches: ['part-wm-pump-oem', 'part-wm-pump-cert', 'part-wm-pump-econ']
  },
  {
    id: 'scan-ac-cap',
    title: 'Inverter AC Outdoor Capacitor (Bulged Top)',
    imageUrl: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=800&q=80',
    confidence: 96,
    detectedIssue: 'Compressor Dual Run Capacitor Thermal Breakdown',
    deviceTypeId: 'ac',
    symptomId: 'ac-cooling',
    tierMatches: ['part-ac-cap-oem']
  },
  {
    id: 'scan-scooter-brake',
    title: 'Two-Wheeler Worn Disc Brake Pad',
    imageUrl: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80',
    confidence: 92,
    detectedIssue: 'Brake Pad Friction Material Worn Beyond Safety Limit (<1.5mm)',
    deviceTypeId: 'scooter',
    symptomId: 'scooter-brake',
    tierMatches: ['part-scooter-brake-oem']
  },
  {
    id: 'scan-blurry',
    title: 'Blurry / Unclear Photo (Tests Low Confidence Fallback)',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
    confidence: 34,
    detectedIssue: 'Image too blurry or lighting insufficient to confirm SKU compatibility.',
    deviceTypeId: 'wm',
    symptomId: null,
    tierMatches: []
  }
];
