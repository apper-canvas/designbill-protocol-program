// Default items for each room type
const roomItems = {
  'master-bedroom': [
    {
      id: 'mb-bed',
      name: 'King Size Bed',
      defaultMeasurement: 'per unit',
      defaultRate: 1500,
      pricingOptions: ['per unit', 'custom quote']
    },
    {
      id: 'mb-wardrobe',
      name: 'Custom Walk-in Wardrobe',
      defaultMeasurement: 'per sq ft',
      defaultRate: 85,
      pricingOptions: ['per sq ft', 'custom quote']
    },
    {
      id: 'mb-side-table',
      name: 'Bedside Tables (Pair)',
      defaultMeasurement: 'per unit',
      defaultRate: 250,
      pricingOptions: ['per unit', 'custom quote']
    },
    {
      id: 'mb-dresser',
      name: 'Dresser with Vanity Mirror',
      defaultMeasurement: 'per unit',
      defaultRate: 650,
      pricingOptions: ['per unit', 'custom quote']
    },
    {
      id: 'mb-accent-chair',
      name: 'Accent Chair',
      defaultMeasurement: 'per unit',
      defaultRate: 450,
      pricingOptions: ['per unit', 'custom quote']
    },
    {
      id: 'mb-chandelier',
      name: 'Bedroom Chandelier/Lighting',
      defaultMeasurement: 'per unit',
      defaultRate: 350,
      pricingOptions: ['per unit', 'custom quote']
    },
    {
      id: 'mb-area-rug',
      name: 'Area Rug',
      defaultMeasurement: 'per unit',
      defaultRate: 800,
      pricingOptions: ['per unit', 'per sq ft', 'custom quote']
    },
    {
      id: 'mb-window-treatment',
      name: 'Window Treatments',
      defaultMeasurement: 'per window',
      defaultRate: 275,
      pricingOptions: ['per window', 'per sq ft', 'custom quote']
    },
    {
      id: 'mb-wallpaper',
      name: 'Accent Wall/Wallpaper',
      defaultMeasurement: 'per sq ft',
      defaultRate: 12,
      pricingOptions: ['per sq ft', 'custom quote']
    },
    {
      id: 'mb-flooring',
      name: 'Premium Flooring',
      defaultMeasurement: 'per sq ft',
      defaultRate: 18,
      pricingOptions: ['per sq ft', 'custom quote']
    }
  ],
  'bedroom': [
    {
      id: 'b-bed',
      name: 'Queen Size Bed',
      defaultMeasurement: 'per unit',
      defaultRate: 1200,
      pricingOptions: ['per unit', 'custom quote']
    },
    {
      id: 'b-wardrobe',
      name: 'Built-in Closet System',
      defaultMeasurement: 'per sq ft',
      defaultRate: 65,
      pricingOptions: ['per sq ft', 'custom quote']
    },
    {
      id: 'b-side-table',
      name: 'Side Table',
      defaultMeasurement: 'per unit',
      name: 'Bedside Table',
      defaultRate: 180,
    }
    },
    {
      id: 'b-dresser',
      name: 'Dresser',
      defaultMeasurement: 'per unit',
      defaultRate: 550,
      pricingOptions: ['per unit', 'custom quote']
    },
    {
      id: 'b-desk',
      name: 'Study Desk & Chair',
      defaultMeasurement: 'per unit',
      defaultRate: 450,
      pricingOptions: ['per unit', 'custom quote']
    },
    {
      id: 'b-lighting',
      name: 'Bedroom Lighting',
      defaultMeasurement: 'per unit',
      defaultRate: 220,
      pricingOptions: ['per unit', 'custom quote']
    },
    {
      id: 'b-window-treatment',
      name: 'Window Treatments',
      defaultMeasurement: 'per window',
      defaultRate: 225,
      pricingOptions: ['per window', 'per sq ft', 'custom quote']
  ],
  'kitchen': [
    {
      id: 'k-cabinets',
      name: 'Kitchen Cabinets',
      defaultMeasurement: 'per running ft',
      defaultRate: 350,
      pricingOptions: ['per running ft', 'per sq ft', 'custom quote']
    },
    {
      id: 'k-countertops',
      name: 'Countertops',
      defaultMeasurement: 'per sq ft',
      defaultRate: 120,
      pricingOptions: ['per sq ft', 'custom quote']
    },
    {
      id: 'k-island',
      name: 'Kitchen Island',
      defaultMeasurement: 'per unit',
      defaultRate: 2500,
      pricingOptions: ['per unit', 'custom quote']
    },
    {
      id: 'k-backsplash',
      name: 'Backsplash',
      defaultMeasurement: 'per sq ft',
      defaultRate: 45,
      pricingOptions: ['per sq ft', 'custom quote']
    },
    {
      id: 'k-sink',
      name: 'Kitchen Sink & Faucet',
      defaultMeasurement: 'per unit',
      defaultRate: 650,
      pricingOptions: ['per unit', 'custom quote']
    },
    {
      id: 'k-appliances',
      name: 'Appliance Selection & Installation',
      defaultMeasurement: 'custom quote',
      defaultRate: 5000,
      pricingOptions: ['custom quote', 'per unit']
    },
    {
      id: 'k-pantry',
      name: 'Pantry Organization System',
      defaultMeasurement: 'per sq ft',
      defaultRate: 75,
      pricingOptions: ['per sq ft', 'custom quote']
    },
    {
      id: 'k-lighting',
      name: 'Kitchen Lighting Package',
      defaultMeasurement: 'per unit',
      defaultRate: 1200,
      pricingOptions: ['per unit', 'custom quote']
    },
    {
      id: 'k-hardware',
      name: 'Cabinet Hardware',
      defaultMeasurement: 'per piece',
      defaultRate: 15,
      pricingOptions: ['per piece', 'custom quote']
    },
    {
      id: 'k-flooring',
      name: 'Kitchen Flooring',
      defaultMeasurement: 'per sq ft',
      defaultRate: 22,
      pricingOptions: ['per sq ft', 'custom quote']
    }
  ],
  
  'living-room': [
    {
      id: 'lr-sofa',
      name: 'Sofa Set',
      defaultMeasurement: 'per unit',
      defaultRate: 3200,
      pricingOptions: ['per unit', 'custom quote']
    },
    {
      id: 'lr-tv-unit',
      name: 'TV Unit',
      defaultMeasurement: 'per unit',
      defaultRate: 950,
      pricingOptions: ['per unit', 'custom quote']
    },
    {
      id: 'lr-coffee-table',
      name: 'Coffee Table',
      defaultMeasurement: 'per unit',
      defaultRate: 450,
      pricingOptions: ['per unit', 'custom quote']
    },
    {
      id: 'lr-wall-treatment',
      name: 'Wall Treatment',
      defaultMeasurement: 'per sq ft',
      defaultRate: 35,
      pricingOptions: ['per sq ft', 'custom quote']
    },
    {
      id: 'lr-accent-chairs',
      name: 'Accent Chairs',
      defaultMeasurement: 'per unit',
      defaultRate: 750,
      pricingOptions: ['per unit', 'custom quote']
    },
    {
      id: 'lr-area-rug',
      name: 'Area Rug',
      defaultMeasurement: 'per unit',
      defaultRate: 1200,
      pricingOptions: ['per unit', 'per sq ft', 'custom quote']
    },
    {
      id: 'lr-lighting',
      name: 'Living Room Lighting Package',
      defaultMeasurement: 'per unit',
      defaultRate: 1500,
      pricingOptions: ['per unit', 'custom quote']
    },
    {
      id: 'lr-curtains',
      name: 'Premium Curtains & Drapes',
      defaultMeasurement: 'per window',
      defaultRate: 450,
      pricingOptions: ['per window', 'per sq ft', 'custom quote']
    },
    {
      id: 'lr-shelving',
      name: 'Decorative Shelving',
      defaultMeasurement: 'per running ft',
      defaultRate: 120,
      pricingOptions: ['per running ft', 'per unit', 'custom quote']
    },
    {
      id: 'lr-flooring',
      name: 'Living Room Flooring',
      defaultMeasurement: 'per sq ft',
      defaultRate: 16,
      pricingOptions: ['per sq ft', 'custom quote']
    }
  ],
  'bathroom': [
    {
      id: 'br-vanity',
      name: 'Bathroom Vanity',
      defaultMeasurement: 'per unit',
      defaultRate: 1200,
      pricingOptions: ['per unit', 'custom quote']
    },
    {
      id: 'br-shower',
      name: 'Shower Enclosure',
      defaultMeasurement: 'per unit',
      defaultRate: 1800,
      pricingOptions: ['per unit', 'custom quote']
    },
    {
      id: 'br-tiles',
      name: 'Tiles Work',
      defaultMeasurement: 'per sq ft',
      defaultRate: 25,
      pricingOptions: ['per sq ft', 'custom quote']
    },
    {
      id: 'br-toilet',
      name: 'Toilet Installation',
      defaultMeasurement: 'per unit',
      defaultRate: 650,
      pricingOptions: ['per unit', 'custom quote']
    },
    {
      id: 'br-mirror',
      name: 'Bathroom Mirror',
      defaultMeasurement: 'per unit',
      defaultRate: 350,
      pricingOptions: ['per unit', 'custom quote']
    },
    {
      id: 'br-accessories',
      name: 'Bathroom Accessories Set',
      defaultMeasurement: 'per set',
      defaultRate: 250,
      pricingOptions: ['per set', 'custom quote']
    },
    {
      id: 'br-lighting',
      name: 'Bathroom Lighting',
      defaultMeasurement: 'per unit',
      defaultRate: 280,
      pricingOptions: ['per unit', 'custom quote']
    },
    {
      id: 'br-bathtub',
      name: 'Bathtub Installation',
      defaultMeasurement: 'per unit',
      defaultRate: 2200,
      pricingOptions: ['per unit', 'custom quote']
    }
  ],
  
  'dining-room': [
    {
      id: 'dr-table',
      name: 'Dining Table',
      defaultMeasurement: 'per unit',
      defaultRate: 1800,
      pricingOptions: ['per unit', 'custom quote']
    },
    {
      id: 'dr-chairs',
      name: 'Dining Chairs',
      defaultMeasurement: 'per unit',
      defaultRate: 350,
      pricingOptions: ['per unit', 'custom quote']
    },
    {
      id: 'dr-buffet',
      name: 'Buffet Cabinet',
      defaultMeasurement: 'per unit',
      defaultRate: 1200,
      pricingOptions: ['per unit', 'custom quote']
    },
    {
      id: 'dr-chandelier',
      name: 'Dining Room Chandelier',
      defaultMeasurement: 'per unit',
      defaultRate: 850,
      pricingOptions: ['per unit', 'custom quote']
    },
    {
      id: 'dr-rug',
      name: 'Dining Area Rug',
      defaultMeasurement: 'per unit',
      defaultRate: 950,
      pricingOptions: ['per unit', 'per sq ft', 'custom quote']
    },
    {
      id: 'dr-curtains',
      name: 'Dining Room Window Treatments',
      defaultMeasurement: 'per window',
      defaultRate: 380,
      pricingOptions: ['per window', 'custom quote']
    },
    {
      id: 'dr-wallpaper',
      name: 'Accent Wall/Wallpaper',
      defaultMeasurement: 'per sq ft',
      defaultRate: 14,
      pricingOptions: ['per sq ft', 'custom quote']
    }
  ],
  
  'office': [
    {
      id: 'o-desk',
      name: 'Office Desk',
      defaultMeasurement: 'per unit',
      defaultRate: 1100,
      pricingOptions: ['per unit', 'custom quote']
    },
    {
      id: 'o-chair',
      name: 'Office Chair',
      defaultMeasurement: 'per unit',
      defaultRate: 550,
      pricingOptions: ['per unit', 'custom quote']
    },
    {
      id: 'o-bookshelf',
      name: 'Bookshelf/Storage',
      defaultMeasurement: 'per sq ft',
      defaultRate: 85,
      pricingOptions: ['per sq ft', 'per unit', 'custom quote']
    },
    {
      id: 'o-filing',
      name: 'Filing Cabinet/Storage',
      defaultMeasurement: 'per unit',
      defaultRate: 420,
      pricingOptions: ['per unit', 'custom quote']
    },
    {
      id: 'o-lighting',
      name: 'Office Lighting',
      defaultMeasurement: 'per unit',
      defaultRate: 280,
      pricingOptions: ['per unit', 'custom quote']
    },
    {
      id: 'o-flooring',
      name: 'Office Flooring',
      defaultMeasurement: 'per sq ft',
      defaultRate: 14,
      pricingOptions: ['per sq ft', 'custom quote']
    },
    {
      id: 'o-wall-system',
      name: 'Custom Wall Organization System',
      defaultMeasurement: 'per sq ft',
      defaultRate: 65,
      pricingOptions: ['per sq ft', 'custom quote']
    }
  ]
};

export default roomItems;