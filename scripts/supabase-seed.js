// Direct Supabase seeding via service role
const SUPABASE_URL = 'https://yhckddqjjikcjffklhcb.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InloY2tkZHFqamlrY2pmZmtsaGNiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MzYyMTE1MSwiZXhwIjoyMDc5MTk3MTUxfQ.HR-JbrKC6Q3vrQp29ctDSaMEUfyZvdcGk5dcnuybpeE';

async function insertData(table, data) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
    method: 'POST',
    headers: {
      'apikey': SERVICE_ROLE_KEY,
      'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'resolution=ignore-duplicates'
    },
    body: JSON.stringify(data)
  });
  
  if (!response.ok) {
    const error = await response.text();
    console.error(`❌ Failed to insert into ${table}:`, error);
    return false;
  }
  return true;
}

async function main() {
  console.log('🌱 Starting Supabase seed via REST API...\n');

  // Insert categories
  console.log('📁 Inserting categories...');
  await insertData('categories', [
    { id: 'cat-1', name: 'Truck Scale', slug: 'truck-scale', description: 'Heavy-duty weighing systems', icon: '🚛', priority: 100 },
    { id: 'cat-2', name: 'Digital Scale', slug: 'digital-scale', description: 'Precision scales', icon: '⚖️', priority: 90 },
    { id: 'cat-3', name: 'Racking System', slug: 'racking-system', description: 'Storage solutions', icon: '📦', priority: 80 },
    { id: 'cat-4', name: 'Lifting Equipment', slug: 'lifting-equipment', description: 'Forklifts and stackers', icon: '🏗️', priority: 70 },
    { id: 'cat-5', name: 'Plastic Solutions', slug: 'plastic-solutions', description: 'Pallets and baskets', icon: '🧺', priority: 60 }
  ]);
  console.log('✅ Categories inserted\n');

  // Insert products
  console.log('📦 Inserting products...');
  await insertData('products', [
    {
      id: 'prod-1',
      name: 'Heavy Duty Truck Scale 100T',
      slug: 'heavy-duty-truck-scale-100t',
      sku: 'TS-HD-100',
      summary: 'Industrial truck scale for heavy vehicles up to 100 tons',
      description: 'Professional-grade weighbridge designed for high-traffic logistics operations.',
      category_id: 'cat-1',
      price: 45000.00,
      status: 'PUBLISHED',
      highlights: ['100-ton capacity', '16m x 3m platform', 'IP67 load cells', 'Remote diagnostics', '3-year warranty'],
      hero_image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
      specs: { capacity: '100,000 kg', platform: '16m x 3m', accuracy: '±20kg' }
    },
    {
      id: 'prod-2',
      name: 'Digital Scale Indicator X7',
      slug: 'digital-scale-indicator-x7',
      sku: 'IND-X7-001',
      summary: 'Advanced digital indicator with MODBUS support',
      category_id: 'cat-2',
      price: 850.00,
      status: 'PUBLISHED',
      highlights: ['IP67 enclosure', 'MODBUS TCP/RTU', 'Dual range support'],
      hero_image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80'
    },
    {
      id: 'prod-3',
      name: 'Adjustable Pallet Rack System',
      slug: 'adjustable-pallet-rack-system',
      sku: 'RACK-ADJ-001',
      summary: 'Heavy-duty warehouse racking',
      category_id: 'cat-3',
      price: 2500.00,
      status: 'PUBLISHED',
      highlights: ['Custom bay widths', 'Powder-coated finish', 'Load capacity 2T/level'],
      hero_image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80'
    },
    {
      id: 'prod-4',
      name: 'Electric Reach Stacker 1.6T',
      slug: 'electric-reach-stacker-16t',
      sku: 'LIFT-RS-16',
      summary: 'Lithium battery powered reach stacker',
      category_id: 'cat-4',
      price: 18500.00,
      status: 'PUBLISHED',
      highlights: ['Li-ion battery', '1.6T capacity', '5m lift height'],
      hero_image: 'https://images.unsplash.com/photo-1565288999155-38a6b8e25e5d?w=800&q=80'
    },
    {
      id: 'prod-5',
      name: 'Heavy Duty Plastic Pallet',
      slug: 'heavy-duty-plastic-pallet',
      sku: 'PAL-HD-1210',
      summary: 'Industrial plastic pallet 1200x1000mm',
      category_id: 'cat-5',
      price: 45.00,
      status: 'PUBLISHED',
      highlights: ['1200x1000mm', '2-ton capacity', '4-way entry'],
      hero_image: 'https://images.unsplash.com/photo-1605883705077-8d3d3d02fcf5?w=800&q=80'
    }
  ]);
  console.log('✅ Products inserted\n');

  // Insert team members
  console.log('👥 Inserting team members...');
  await insertData('team_members', [
    {
      id: 'team-1',
      name: 'Var Socheat',
      title: 'Managing Director',
      bio: 'With over 17 years of experience in metrology and industrial equipment.',
      email: 'socheat@s3vtgroup.com.kh',
      phone: '+855 11 777 889',
      priority: 100,
      status: 'ACTIVE',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80'
    },
    {
      id: 'team-2',
      name: 'Sok Pisey',
      title: 'Technical Director',
      bio: 'Oversees all technical installations and calibrations.',
      email: 'pisey@s3vtgroup.com.kh',
      phone: '+855 67 777 988',
      priority: 90,
      status: 'ACTIVE',
      photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80'
    },
    {
      id: 'team-3',
      name: 'Chea Sokha',
      title: 'Sales Manager',
      bio: 'Leading sales and customer relations.',
      email: 'sokha@s3vtgroup.com.kh',
      priority: 80,
      status: 'ACTIVE',
      photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80'
    }
  ]);
  console.log('✅ Team members inserted\n');

  // Insert portfolio projects
  console.log('💼 Inserting portfolio projects...');
  await insertData('portfolio_projects', [
    {
      id: 'port-1',
      title: 'Angkor Rice Mill Automation',
      slug: 'angkor-rice-mill-automation',
      industry: 'Agriculture',
      client: 'Angkor Rice Processing Co., Ltd',
      description: 'Complete weighing and logistics automation for rice mill.',
      challenge: 'Manual processes causing inconsistent batch weights.',
      solution: 'Implemented 60-ton truck scale with automation.',
      results: 'Processing time reduced by 40%, achieved ISO certification.',
      hero_image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80',
      images: ['https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&q=80'],
      completion_date: '2024-03-15',
      status: 'PUBLISHED',
      priority: 100
    },
    {
      id: 'port-2',
      title: 'Phnom Penh Logistics Center',
      slug: 'phnom-penh-logistics-center',
      industry: 'Logistics',
      client: 'CamLog Distribution',
      description: 'Modern 3PL facility with automated equipment.',
      challenge: 'Modernize warehouse for e-commerce volumes.',
      solution: 'Twin truck scales, 2,500 pallet positions.',
      results: 'Throughput increased from 200 to 450 containers/month.',
      hero_image: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=800&q=80',
      images: [],
      completion_date: '2024-06-30',
      status: 'FEATURED',
      priority: 95
    },
    {
      id: 'port-3',
      title: 'Garment Factory Material Flow',
      slug: 'garment-factory-upgrade',
      industry: 'Manufacturing',
      client: 'Confidential',
      description: 'Material handling upgrade for apparel facility.',
      challenge: 'Required efficient fabric storage.',
      solution: 'Mezzanine racking and mobile cutting tables.',
      results: 'Reduced handling time by 50%.',
      hero_image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
      images: [],
      completion_date: '2024-01-20',
      status: 'PUBLISHED',
      priority: 85
    }
  ]);
  console.log('✅ Portfolio inserted\n');

  // Insert quotes
  console.log('📝 Inserting quotes...');
  await insertData('quote_requests', [
    {
      id: 'quote-1',
      company_name: 'Mekong Agro Export Ltd',
      contact_name: 'Sok Vannith',
      email: 'vannith@mekongagro.com',
      phone: '+855 12 345 678',
      message: 'Need 60-ton truck scale for cassava processing facility.',
      status: 'NEW',
      source: 'Website'
    },
    {
      id: 'quote-2',
      company_name: 'Royal Logistics Park',
      contact_name: 'Chann Dara',
      email: 'dara@royallogistics.com.kh',
      phone: '+855 23 456 789',
      message: 'Require pallet racking for 8,000 sqm warehouse.',
      status: 'IN_PROGRESS',
      source: 'Website'
    },
    {
      id: 'quote-3',
      company_name: 'Cambodia Textile Manufacturing',
      contact_name: 'Lim Sophal',
      email: 'sophal@ctm.com.kh',
      phone: '+855 89 123 456',
      message: 'Looking for 3 electric reach stackers.',
      status: 'NEW',
      source: 'Website'
    }
  ]);
  console.log('✅ Quotes inserted\n');

  console.log('🎉 All data seeded successfully!');
}

main().catch(console.error);

