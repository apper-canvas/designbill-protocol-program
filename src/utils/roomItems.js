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
      name: 'Walk-in Wardrobe',
      defaultMeasurement: 'per sq ft',
      defaultRate: 85,
      pricingOptions: ['per sq ft', 'custom quote']
    },
    {
      id: 'mb-side-table',
      name: 'Side Tables',
      defaultMeasurement: 'per unit',
      defaultRate: 250,
      pricingOptions: ['per unit', 'custom quote']
    },
    {
      id: 'mb-dresser',
      name: 'Dresser with Mirror',
      defaultMeasurement: 'per unit',
      defaultRate: 650,
      pricingOptions: ['per unit', 'custom quote']
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
      name: 'Standard Wardrobe',
      defaultMeasurement: 'per sq ft',
      defaultRate: 65,
      pricingOptions: ['per sq ft', 'custom quote']
    },
    {
      id: 'b-side-table',
      name: 'Side Table',
      defaultMeasurement: 'per unit',
      defaultRate: 180,
      pricingOptions: ['per unit', 'custom quote']
    }
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
    }
  ],
  'living-room': [
    {
      id: 'lr-sofa',
      name: 'Sofa Set',
      defaultMeasurement: 'per unit',
      defaultRate: 2800,
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
    }
  ]
};

export default roomItems;