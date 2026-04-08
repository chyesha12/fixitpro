import React, { useState } from 'react';

/* ── 15 Providers Data ─────────────────────────────────── */
const PROVIDERS = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@gmail.com',
    phone: '+91 98765 43210',
    address: '45, Patel Nagar, Navrangpura, Ahmedabad, Gujarat – 380009',
    specialization: 'Senior Plumbing Expert',
    experience_years: 8,
    rating: 4.8,
    total_jobs: 347,
    total_earnings: 172650,
    completed_this_month: 24,
    pending_jobs: 3,
    is_available: true,
    verified: true,
    about: 'Certified senior plumber with 8+ years of experience in residential and commercial plumbing. Specialising in leak detection, pipe installation, drain cleaning and emergency repairs. Committed to delivering quality work on time with full transparency.',
    skills: ['Leak Detection', 'Pipe Repair', 'Drain Cleaning', 'Water Heater', 'Bathroom Fitting', 'Emergency Plumbing', 'CPVC Piping', 'Sewage Systems'],
    services_offered: ['Plumbing Repair', 'Water Purifier Service', 'Bathroom Renovation', 'Gas Stove Repair'],
    certifications: ['ISI Certified Plumber', 'CPVC Installation Expert', 'Government Licensed Contractor', 'First Aid Certified'],
    languages: ['Gujarati', 'Hindi', 'English'],
    service_areas: ['Ahmedabad', 'Gandhinagar', 'Surat', 'Vadodara'],
    category: 'Plumbing',
  },
  {
    id: 2,
    name: 'Priya Mehta',
    email: 'priya.mehta@gmail.com',
    phone: '+91 91234 56789',
    address: '12, Shyamal Cross Road, Satellite, Ahmedabad, Gujarat – 380015',
    specialization: 'Electrician & Home Wiring Expert',
    experience_years: 5,
    rating: 4.6,
    total_jobs: 218,
    total_earnings: 104500,
    completed_this_month: 18,
    pending_jobs: 2,
    is_available: true,
    verified: true,
    about: 'Licensed electrician with 5+ years of experience in residential wiring, switchboard repair, and smart home installations. Known for safe, clean and timely electrical work across Ahmedabad and surrounding areas.',
    skills: ['Wiring', 'Switchboard Repair', 'MCB/Fuse', 'Fan Installation', 'AC Wiring', 'Smart Home', 'CCTV Fitting', 'LED Lighting'],
    services_offered: ['Electrical Repair', 'Fan & Light Installation', 'AC Installation Wiring', 'CCTV & Intercom Setup'],
    certifications: ['Government Licensed Electrician', 'Fire Safety Certified', 'Smart Home Installer Cert', 'First Aid Certified'],
    languages: ['Gujarati', 'Hindi', 'English'],
    service_areas: ['Ahmedabad', 'Gandhinagar', 'Anand'],
    category: 'Electrical',
  },
  {
    id: 3,
    name: 'Suresh Patel',
    email: 'suresh.patel@gmail.com',
    phone: '+91 99870 11234',
    address: '78, Vastrapur Lake Road, Vastrapur, Ahmedabad, Gujarat – 380054',
    specialization: 'AC & Appliance Repair Technician',
    experience_years: 11,
    rating: 4.9,
    total_jobs: 512,
    total_earnings: 289000,
    completed_this_month: 31,
    pending_jobs: 5,
    is_available: false,
    verified: true,
    about: 'Highly experienced AC technician and home appliance repair expert with 11 years of hands-on service. Specialised in split AC servicing, washing machine repair, refrigerator gas refilling and microwave troubleshooting. Trusted by 500+ customers across Gujarat.',
    skills: ['AC Servicing', 'Gas Refilling', 'Washing Machine Repair', 'Refrigerator Repair', 'Microwave Repair', 'Inverter AC', 'Water Cooler', 'Air Purifier'],
    services_offered: ['AC Service & Repair', 'Washing Machine Repair', 'Refrigerator Repair', 'Microwave & Oven Repair'],
    certifications: ['Samsung Authorised Technician', 'LG Certified Service Partner', 'Refrigerant Handling License', 'ISO 9001 Service Cert'],
    languages: ['Gujarati', 'Hindi'],
    service_areas: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot'],
    category: 'AC & Appliances',
  },
  {
    id: 4,
    name: 'Anita Sharma',
    email: 'anita.sharma@gmail.com',
    phone: '+91 97654 32109',
    address: '22, Bodakdev, Ahmedabad, Gujarat – 380054',
    specialization: 'Interior Cleaning Specialist',
    experience_years: 6,
    rating: 4.7,
    total_jobs: 289,
    total_earnings: 98400,
    completed_this_month: 22,
    pending_jobs: 1,
    is_available: true,
    verified: true,
    about: 'Professional deep cleaning specialist with 6 years of experience. Expert in sofa cleaning, carpet shampoo, kitchen degreasing, bathroom sanitisation and post-renovation cleanup. Uses eco-friendly products only.',
    skills: ['Deep Cleaning', 'Sofa Cleaning', 'Carpet Shampooing', 'Kitchen Degreasing', 'Bathroom Sanitisation', 'Post-Renovation Cleanup', 'Eco Products', 'Disinfection'],
    services_offered: ['Home Deep Cleaning', 'Sofa & Carpet Cleaning', 'Kitchen Cleaning', 'Post-Construction Cleanup'],
    certifications: ['Professional Cleaning Certificate', 'Hygiene & Sanitation Cert', 'Eco-Friendly Product Training'],
    languages: ['Gujarati', 'Hindi', 'English'],
    service_areas: ['Ahmedabad', 'Gandhinagar'],
    category: 'Cleaning',
  },
  {
    id: 5,
    name: 'Vikram Singh',
    email: 'vikram.singh@gmail.com',
    phone: '+91 98520 44321',
    address: '5, Thaltej, Ahmedabad, Gujarat – 380059',
    specialization: 'Carpenter & Furniture Repair Expert',
    experience_years: 14,
    rating: 4.8,
    total_jobs: 634,
    total_earnings: 318000,
    completed_this_month: 28,
    pending_jobs: 4,
    is_available: true,
    verified: true,
    about: 'Veteran carpenter with 14 years of expertise in furniture repair, custom woodwork, door fitting, and modular kitchen installation. Known for precision craftsmanship and same-day service for urgent fixes.',
    skills: ['Furniture Repair', 'Custom Woodwork', 'Door Fitting', 'Modular Kitchen', 'Cabinet Making', 'Wood Polish', 'False Ceiling', 'Lock & Hinge'],
    services_offered: ['Furniture Repair', 'Custom Carpentry', 'Door & Window Fitting', 'Modular Kitchen Setup'],
    certifications: ['Master Carpenter Certificate', 'Woodworking Safety Training', 'Interior Carpentry Specialist'],
    languages: ['Hindi', 'Gujarati'],
    service_areas: ['Ahmedabad', 'Gandhinagar', 'Anand', 'Mehsana'],
    category: 'Carpentry',
  },
  {
    id: 6,
    name: 'Neha Joshi',
    email: 'neha.joshi@gmail.com',
    phone: '+91 96321 78540',
    address: '33, Prahlad Nagar, Ahmedabad, Gujarat – 380015',
    specialization: 'Pest Control & Fumigation Expert',
    experience_years: 7,
    rating: 4.5,
    total_jobs: 410,
    total_earnings: 185200,
    completed_this_month: 26,
    pending_jobs: 3,
    is_available: true,
    verified: true,
    about: 'Certified pest control technician with 7 years of experience in residential and commercial fumigation. Expert in termite treatment, cockroach control, bedbug removal, and rodent management using safe, odourless chemicals.',
    skills: ['Termite Treatment', 'Cockroach Control', 'Bedbug Removal', 'Rodent Control', 'Mosquito Fogging', 'Fumigation', 'Gel Treatment', 'Annual AMC'],
    services_offered: ['General Pest Control', 'Termite Treatment', 'Bedbug Treatment', 'Rodent Control'],
    certifications: ['PCAI Licensed Operator', 'Government Pest Control Cert', 'Chemical Safety Training'],
    languages: ['Gujarati', 'Hindi', 'English'],
    service_areas: ['Ahmedabad', 'Surat', 'Vadodara'],
    category: 'Pest Control',
  },
  {
    id: 7,
    name: 'Mahesh Yadav',
    email: 'mahesh.yadav@gmail.com',
    phone: '+91 98104 65432',
    address: '9, Maninagar, Ahmedabad, Gujarat – 380008',
    specialization: 'Painting & Waterproofing Contractor',
    experience_years: 10,
    rating: 4.6,
    total_jobs: 275,
    total_earnings: 412000,
    completed_this_month: 15,
    pending_jobs: 6,
    is_available: false,
    verified: true,
    about: 'Experienced painting contractor with 10+ years in interior, exterior, and waterproofing works. Handles large residential complexes and independent homes. Uses premium Asian Paints and Berger products with clean, zero-drip technique.',
    skills: ['Interior Painting', 'Exterior Painting', 'Waterproofing', 'Texture Coating', 'Wall Putty', 'Wood Polish', 'Anti-Fungal Coat', 'Epoxy Flooring'],
    services_offered: ['Interior Painting', 'Exterior Painting', 'Waterproofing', 'Texture & Design Work'],
    certifications: ['Asian Paints Certified Painter', 'Waterproofing Specialist Cert', 'Height Safety Training'],
    languages: ['Hindi', 'Gujarati'],
    service_areas: ['Ahmedabad', 'Gandhinagar', 'Kalol'],
    category: 'Painting',
  },
  {
    id: 8,
    name: 'Kavita Desai',
    email: 'kavita.desai@gmail.com',
    phone: '+91 91700 23456',
    address: '14, Gurukul, Ahmedabad, Gujarat – 380052',
    specialization: 'Beauty & Salon Home Service Expert',
    experience_years: 4,
    rating: 4.9,
    total_jobs: 198,
    total_earnings: 72000,
    completed_this_month: 32,
    pending_jobs: 7,
    is_available: true,
    verified: true,
    about: 'Professional beautician offering premium doorstep salon services. Specialised in bridal makeup, hair treatments, threading, waxing, facials and nail art. Uses only branded and skin-safe products.',
    skills: ['Bridal Makeup', 'Hair Treatment', 'Threading', 'Waxing', 'Facial', 'Nail Art', 'Hair Colour', 'Mehendi'],
    services_offered: ['Bridal Makeup', 'Hair Spa & Colour', 'Facial & Cleanup', 'Waxing & Threading'],
    certifications: ['VLCC Beauty Certification', 'Lakme Academy Graduate', 'Skin Care Specialist'],
    languages: ['Gujarati', 'Hindi', 'English'],
    service_areas: ['Ahmedabad', 'Gandhinagar'],
    category: 'Beauty & Wellness',
  },
  {
    id: 9,
    name: 'Rajan Trivedi',
    email: 'rajan.trivedi@gmail.com',
    phone: '+91 99234 11098',
    address: '67, Nikol, Ahmedabad, Gujarat – 382350',
    specialization: 'CCTV & Security System Installer',
    experience_years: 9,
    rating: 4.7,
    total_jobs: 321,
    total_earnings: 224100,
    completed_this_month: 20,
    pending_jobs: 2,
    is_available: true,
    verified: true,
    about: 'Certified security systems installer with 9 years experience in CCTV installation, intercom setup, biometric access and home automation. Authorized dealer and installer for Hikvision and CP Plus systems.',
    skills: ['CCTV Installation', 'DVR/NVR Setup', 'Biometric Access', 'Intercom Systems', 'Home Automation', 'Network Cabling', 'Video Door Phone', 'Alarm Systems'],
    services_offered: ['CCTV Installation', 'Intercom & Video Door Phone', 'Biometric Setup', 'Security Alarm Systems'],
    certifications: ['Hikvision Certified Installer', 'CP Plus Authorised Technician', 'Network Security Training'],
    languages: ['Gujarati', 'Hindi', 'English'],
    service_areas: ['Ahmedabad', 'Gandhinagar', 'Anand', 'Nadiad'],
    category: 'Security Systems',
  },
  {
    id: 10,
    name: 'Deepak Chauhan',
    email: 'deepak.chauhan@gmail.com',
    phone: '+91 98765 00987',
    address: '55, Naroda, Ahmedabad, Gujarat – 382330',
    specialization: 'Packers & Movers Coordinator',
    experience_years: 12,
    rating: 4.4,
    total_jobs: 486,
    total_earnings: 560000,
    completed_this_month: 17,
    pending_jobs: 9,
    is_available: true,
    verified: false,
    about: 'Reliable and experienced moving coordinator with 12 years of expertise in household shifting, office relocation, and vehicle transportation. Provides insurance-backed moving with zero-damage guarantee.',
    skills: ['Household Packing', 'Office Relocation', 'Vehicle Transport', 'Fragile Item Handling', 'Storage Solutions', 'Loading/Unloading', 'Insurance Cover', 'Local & Intercity'],
    services_offered: ['Household Shifting', 'Office Relocation', 'Car Transport', 'Storage & Warehousing'],
    certifications: ['IBA Approved Mover', 'GST Registered Business', 'Insurance Coverage Certified'],
    languages: ['Hindi', 'Gujarati', 'English'],
    service_areas: ['Ahmedabad', 'Surat', 'Rajkot', 'Mumbai', 'Pune'],
    category: 'Packers & Movers',
  },
  {
    id: 11,
    name: 'Sunita Verma',
    email: 'sunita.verma@gmail.com',
    phone: '+91 94050 67890',
    address: '8, Naranpura, Ahmedabad, Gujarat – 380013',
    specialization: 'Yoga & Wellness Home Trainer',
    experience_years: 8,
    rating: 5.0,
    total_jobs: 156,
    total_earnings: 62400,
    completed_this_month: 28,
    pending_jobs: 0,
    is_available: true,
    verified: true,
    about: 'Certified yoga instructor and wellness coach with 8 years of experience. Offers personalized yoga sessions, meditation classes, and stress management workshops at your doorstep. Specialises in prenatal yoga and senior wellness.',
    skills: ['Hatha Yoga', 'Meditation', 'Prenatal Yoga', 'Senior Yoga', 'Stress Management', 'Breathing Techniques', 'Power Yoga', 'Flexibility Training'],
    services_offered: ['Personal Yoga Sessions', 'Meditation Classes', 'Prenatal Yoga', 'Corporate Wellness Workshops'],
    certifications: ['Yoga Alliance RYT-500', 'Ayurveda Wellness Cert', 'Prenatal Yoga Specialist'],
    languages: ['Hindi', 'Gujarati', 'English'],
    service_areas: ['Ahmedabad', 'Gandhinagar'],
    category: 'Health & Fitness',
  },
  {
    id: 12,
    name: 'Hardik Shah',
    email: 'hardik.shah@gmail.com',
    phone: '+91 98530 44567',
    address: '3, Vastral, Ahmedabad, Gujarat – 382418',
    specialization: 'Solar Panel Installation Expert',
    experience_years: 6,
    rating: 4.8,
    total_jobs: 143,
    total_earnings: 680000,
    completed_this_month: 9,
    pending_jobs: 4,
    is_available: true,
    verified: true,
    about: 'MNRE-certified solar installation expert with 6 years of experience. Specialises in rooftop solar panel installation, battery storage systems, and net metering setup for both residential and commercial properties across Gujarat.',
    skills: ['Solar Panel Installation', 'Battery Storage', 'Net Metering', 'Inverter Setup', 'Wiring & Earthing', 'AMC Services', 'Energy Audit', 'Government Subsidy'],
    services_offered: ['Rooftop Solar Installation', 'Battery Backup System', 'Solar Maintenance & AMC', 'Energy Audit'],
    certifications: ['MNRE Certified Installer', 'GEDA Empanelled Contractor', 'Electrical Safety Cert'],
    languages: ['Gujarati', 'Hindi', 'English'],
    service_areas: ['Ahmedabad', 'Gandhinagar', 'Anand', 'Surat', 'Rajkot'],
    category: 'Solar Energy',
  },
  {
    id: 13,
    name: 'Pooja Rathod',
    email: 'pooja.rathod@gmail.com',
    phone: '+91 99012 34567',
    address: '17, Bapunagar, Ahmedabad, Gujarat – 380024',
    specialization: 'Home Cook & Catering Specialist',
    experience_years: 9,
    rating: 4.9,
    total_jobs: 507,
    total_earnings: 189000,
    completed_this_month: 38,
    pending_jobs: 6,
    is_available: true,
    verified: true,
    about: 'Experienced home chef and caterer with 9 years of expertise in Gujarati, Rajasthani, and North Indian cuisine. Offers daily tiffin service, party catering, and live cooking stations for weddings and corporate events.',
    skills: ['Gujarati Thali', 'Rajasthani Cuisine', 'North Indian', 'Party Catering', 'Tiffin Service', 'Wedding Catering', 'Live Station', 'Jain Food'],
    services_offered: ['Daily Tiffin Service', 'Party & Event Catering', 'Wedding Catering', 'Live Cooking Station'],
    certifications: ['FSSAI Food License', 'Hygiene & Safety Certified', 'Professional Catering Cert'],
    languages: ['Gujarati', 'Hindi', 'English'],
    service_areas: ['Ahmedabad', 'Gandhinagar', 'Anand'],
    category: 'Home Cooking & Catering',
  },
  {
    id: 14,
    name: 'Amit Thakkar',
    email: 'amit.thakkar@gmail.com',
    phone: '+91 97270 54321',
    address: '29, Chandkheda, Ahmedabad, Gujarat – 382424',
    specialization: 'Computer & Laptop Repair Technician',
    experience_years: 7,
    rating: 4.6,
    total_jobs: 394,
    total_earnings: 148000,
    completed_this_month: 29,
    pending_jobs: 5,
    is_available: false,
    verified: true,
    about: 'Expert computer technician with 7 years of hands-on experience in laptop/desktop hardware repair, software troubleshooting, OS installation, data recovery and networking. Offers both doorstep and workshop services.',
    skills: ['Laptop Hardware', 'OS Installation', 'Data Recovery', 'Virus Removal', 'Networking', 'Screen Replacement', 'RAM/SSD Upgrade', 'CMOS Battery'],
    services_offered: ['Laptop Repair', 'Desktop Repair', 'Data Recovery', 'Network Setup'],
    certifications: ['CompTIA A+ Certified', 'Microsoft Certified Technician', 'Data Recovery Specialist'],
    languages: ['Gujarati', 'Hindi', 'English'],
    service_areas: ['Ahmedabad', 'Gandhinagar', 'Kalol'],
    category: 'Computer Repair',
  },
  {
    id: 15,
    name: 'Farhan Shaikh',
    email: 'farhan.shaikh@gmail.com',
    phone: '+91 93741 89012',
    address: '4, Juhapura, Ahmedabad, Gujarat – 380055',
    specialization: 'AC Installation & Gas Refilling Expert',
    experience_years: 13,
    rating: 4.8,
    total_jobs: 721,
    total_earnings: 395000,
    completed_this_month: 42,
    pending_jobs: 8,
    is_available: true,
    verified: true,
    about: 'Highly skilled AC technician with 13 years of specialized experience in all brands of split, window and cassette ACs. Expert in gas refilling, deep servicing, PCB repair and installation of new units. Fastest response time in Ahmedabad.',
    skills: ['Split AC Service', 'Window AC Repair', 'Gas Refilling', 'PCB Repair', 'AC Installation', 'Deep Servicing', 'Cassette AC', 'Duct AC'],
    services_offered: ['AC Installation', 'AC Gas Refilling', 'AC Deep Servicing', 'PCB & Compressor Repair'],
    certifications: ['Daikin Authorised Technician', 'Voltas Certified Partner', 'Refrigerant Handling License', 'ISO Certified'],
    languages: ['Gujarati', 'Hindi', 'Urdu'],
    service_areas: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Jamnagar'],
    category: 'AC & Appliances',
  },
];

/* ── Palette tokens ── */
const C = {
  cream:       '#F2EAE0',
  creamDark:   '#e8ddd2',
  teal:        '#B4D3D9',
  tealDark:    '#8ab9c1',
  tealDeep:    '#2e7d8a',
  blue:        '#2DA6CE',
  blueDark:    '#1d8aaf',
  blueDeep:    '#0f5f7a',
  purple:      '#9B8EC7',
  purpleDark:  '#7b6daa',
  purpleDeep:  '#4a3a7a',
  text:        '#2c2140',
  textMuted:   '#5e5178',
  textSoft:    '#8a7faa',
  white:       '#ffffff',
  success:     '#2a8a6e',
  successBg:   '#e6f5f0',
  successBdr:  '#9dd5c4',
  warning:     '#b06a20',
  warningBg:   '#fdf0e0',
  warningBdr:  '#f0c080',
  error:       '#b03040',
  errorBg:     '#fbeaec',
  errorBdr:    '#e8a0aa',
  infoBg:      '#e6f4fa',
  infoBdr:     '#90cde0',
};

const CATEGORY_COLORS = {
  'Plumbing':               { bg: C.infoBg,    color: C.blueDeep,   border: C.infoBdr },
  'Electrical':             { bg: '#fdf5e6',   color: '#7a4f10',    border: '#f0cf80' },
  'AC & Appliances':        { bg: C.successBg, color: C.tealDeep,   border: C.successBdr },
  'Cleaning':               { bg: '#f3f0fa',   color: C.purpleDeep, border: '#c8bfea' },
  'Carpentry':              { bg: C.warningBg, color: C.warning,    border: C.warningBdr },
  'Pest Control':           { bg: '#e8f5ee',   color: '#1f6e40',    border: '#88d4a8' },
  'Painting':               { bg: C.errorBg,   color: C.error,      border: C.errorBdr },
  'Beauty & Wellness':      { bg: '#faeef5',   color: '#7a204a',    border: '#e8a0c8' },
  'Security Systems':       { bg: C.cream,     color: C.textMuted,  border: C.teal },
  'Packers & Movers':       { bg: C.warningBg, color: '#7a4a10',    border: '#e8c080' },
  'Health & Fitness':       { bg: '#e8f8f5',   color: C.tealDeep,   border: C.teal },
  'Solar Energy':           { bg: '#fdf5e0',   color: '#7a5010',    border: '#ecc870' },
  'Home Cooking & Catering':{ bg: C.warningBg, color: '#7a3010',    border: '#f0a870' },
  'Computer Repair':        { bg: C.infoBg,    color: C.blueDeep,   border: C.infoBdr },
};

const STATUS_COLORS = {
  pending:   { color: C.warning, bg: C.warningBg, border: C.warningBdr },
  confirmed: { color: C.blueDark, bg: C.infoBg,   border: C.infoBdr },
  completed: { color: C.success, bg: C.successBg, border: C.successBdr },
  cancelled: { color: C.error,   bg: C.errorBg,   border: C.errorBdr },
};

const JOBS = [
  { id:1, booking_code:'BK10023456', service:'Plumbing Repair',     customer:'Ravi Sharma',  date:'2024-12-20', time:'10:00', address:'123 MG Road, Ahmedabad',    status:'completed', amount:499,  rating:5, review:'Excellent work! Very professional.' },
  { id:2, booking_code:'BK10034567', service:'Water Purifier',      customer:'Meena Patel',  date:'2024-12-22', time:'14:00', address:'456 CG Road, Surat',         status:'completed', amount:349,  rating:4, review:'Good service, arrived on time.' },
  { id:3, booking_code:'BK10045678', service:'Plumbing Repair',     customer:'Amit Singh',   date:'2024-12-25', time:'11:00', address:'789 SG Highway, Vadodara',   status:'confirmed', amount:499,  rating:null, review:null },
  { id:4, booking_code:'BK10056789', service:'Bathroom Renovation', customer:'Priya Shah',   date:'2024-12-28', time:'09:00', address:'321 Satellite, Ahmedabad',   status:'pending',   amount:4999, rating:null, review:null },
  { id:5, booking_code:'BK10067890', service:'Gas Stove Repair',    customer:'Sunita Gupta', date:'2024-12-18', time:'16:00', address:'55 Vastrapur, Ahmedabad',    status:'completed', amount:299,  rating:5, review:'Fixed within 30 minutes. Brilliant!' },
];

const EARNINGS_DATA = [
  {month:'Jul',amount:12400},{month:'Aug',amount:15600},{month:'Sep',amount:18200},
  {month:'Oct',amount:14800},{month:'Nov',amount:21300},{month:'Dec',amount:9500},
];

function Stars({ rating }) {
  return (
    <span style={{ color: '#c97d2a', fontSize: '0.85rem' }}>
      {'★'.repeat(Math.floor(rating))}{'☆'.repeat(5 - Math.floor(rating))}
    </span>
  );
}

/* ── Provider Card ── */
function ProviderCard({ provider, onView }) {
  const catStyle = CATEGORY_COLORS[provider.category] || { bg: C.cream, color: C.textMuted, border: C.teal };
  const initials = provider.name.split(' ').map(n => n[0]).join('');

  return (
    <div className="pcard" onClick={() => onView(provider.id)}>
      <div className="pcard-top">
        <div className="pcard-avatar-wrap">
          <div className="pcard-avatar">{initials}</div>
          <span className={`pcard-dot ${provider.is_available ? 'online' : 'offline'}`}></span>
        </div>
        <div className="pcard-header-info">
          <div className="pcard-name-row">
            <span className="pcard-name">{provider.name}</span>
            {provider.verified && <span className="pcard-verified">✓ Verified</span>}
          </div>
          <div className="pcard-spec">{provider.specialization}</div>
          <span className="pcard-cat" style={{ background: catStyle.bg, color: catStyle.color, border: `1px solid ${catStyle.border}` }}>
            {provider.category}
          </span>
        </div>
      </div>

      <div className="pcard-stats">
        <div className="pcs">
          <strong><Stars rating={provider.rating} /> {provider.rating}</strong>
          <span>Rating</span>
        </div>
        <div className="pcs-divider"></div>
        <div className="pcs">
          <strong>{provider.total_jobs}</strong>
          <span>Jobs</span>
        </div>
        <div className="pcs-divider"></div>
        <div className="pcs">
          <strong>{provider.experience_years}y</strong>
          <span>Exp</span>
        </div>
        <div className="pcs-divider"></div>
        <div className="pcs">
          <strong style={{ color: provider.is_available ? C.success : C.error, fontSize: '0.72rem' }}>
            {provider.is_available ? '🟢 Online' : '🔴 Offline'}
          </strong>
          <span>Status</span>
        </div>
      </div>

      <div className="pcard-areas">
        {provider.service_areas.slice(0, 3).map(a => (
          <span key={a} className="pcard-area">📍 {a}</span>
        ))}
        {provider.service_areas.length > 3 && (
          <span className="pcard-area-more">+{provider.service_areas.length - 3}</span>
        )}
      </div>

      <button className="pcard-btn" onClick={(e) => { e.stopPropagation(); onView(provider.id); }}>
        View Details →
      </button>
    </div>
  );
}

/* ── Detail View ── */
function ProviderDetail({ provider, onBack }) {
  const [tab, setTab] = useState('overview');
  const [jobFilter, setJobFilter] = useState('all');
  const [availability, setAvailability] = useState(provider.is_available);

  const initials = provider.name.split(' ').map(n => n[0]).join('');
  const completedJobs = JOBS.filter(j => j.status === 'completed');
  const avgRating = (completedJobs.filter(j => j.rating).reduce((a, b) => a + (b.rating || 0), 0) / (completedJobs.filter(j => j.rating).length || 1)).toFixed(1);
  const maxEarning = Math.max(...EARNINGS_DATA.map(e => e.amount));
  const filteredJobs = jobFilter === 'all' ? JOBS : JOBS.filter(j => j.status === jobFilter);

  const TABS = [
    { id: 'overview', label: 'Overview', icon: '👤' },
    { id: 'jobs',     label: 'My Jobs',  icon: '📋' },
    { id: 'earnings', label: 'Earnings', icon: '💰' },
  ];

  return (
    <div className="detail-page">
      <div className="detail-back-bar">
        <div className="container">
          <button className="back-btn" onClick={onBack}>← Back to Providers</button>
        </div>
      </div>

      {/* Hero */}
      <div className="pp-hero">
        <div className="container">
          <div className="pp-hero-inner">
            <div className="pp-avatar-wrap">
              <div className="pp-avatar">{initials}</div>
              <span className={`pp-dot ${availability ? 'online' : 'offline'}`}></span>
            </div>
            <div className="pp-hero-info">
              <div className="pp-name-row">
                <h1>{provider.name}</h1>
                {provider.verified && (
                  <span className="verified-tag">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                    Verified Pro
                  </span>
                )}
              </div>
              <p className="pp-spec">{provider.specialization} &nbsp;·&nbsp; {provider.experience_years} years experience</p>
              <div className="pp-stats-row">
                {[
                  { val: `⭐ ${provider.rating}`, label: 'Rating' },
                  { val: provider.total_jobs,      label: 'Jobs Done' },
                  { val: `₹${(provider.total_earnings / 1000).toFixed(0)}K`, label: 'Total Earned' },
                  { val: provider.completed_this_month, label: 'This Month' },
                ].map(s => (
                  <div className="pp-stat" key={s.label}>
                    <strong>{s.val}</strong>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="pp-hero-right">
              <button
                className={`avail-btn ${availability ? 'go-offline' : 'go-online'}`}
                onClick={() => setAvailability(!availability)}>
                <span className={`avail-dot-sm ${availability ? 'on' : 'off'}`}></span>
                {availability ? 'Go Offline' : 'Go Online'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="pp-body">
        <div className="container">
          <div className="pp-tabs">
            {TABS.map(t => (
              <button key={t.id} className={`pp-tab ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>
                <span>{t.icon}</span> {t.label}
              </button>
            ))}
          </div>

          {/* OVERVIEW */}
          {tab === 'overview' && (
            <div className="pp-grid">
              <div className="pp-col-main">
                <div className="pp-card">
                  <h3>About Me</h3>
                  <p>{provider.about}</p>
                </div>
                <div className="pp-card">
                  <h3>Skills & Expertise</h3>
                  <div className="skills-wrap">
                    {provider.skills.map(s => <span className="skill-tag" key={s}>{s}</span>)}
                  </div>
                </div>
                <div className="pp-card">
                  <h3>Services Offered</h3>
                  <div className="services-wrap">
                    {provider.services_offered.map(s => (
                      <div className="service-tag" key={s}>
                        <span className="st-icon">🔧</span>{s}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pp-col-side">
                <div className="pp-card">
                  <h3>Contact Information</h3>
                  <div className="info-list">
                    {[
                      { icon: '📧', label: 'Email',   val: provider.email },
                      { icon: '📞', label: 'Phone',   val: provider.phone },
                      { icon: '📍', label: 'Address', val: provider.address },
                    ].map(r => (
                      <div className="info-item" key={r.label}>
                        <div className="ii-icon">{r.icon}</div>
                        <div><div className="ii-label">{r.label}</div><div className="ii-val">{r.val}</div></div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pp-card">
                  <h3>Certifications</h3>
                  <div className="cert-list">
                    {provider.certifications.map(c => (
                      <div className="cert-item" key={c}>
                        <span className="cert-check">✓</span><span>{c}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pp-card">
                  <h3>Languages & Service Areas</h3>
                  <div className="pp-label-row">
                    <span className="pp-sub-label">Languages</span>
                    <div className="tag-row">{provider.languages.map(l => <span className="lang-tag" key={l}>{l}</span>)}</div>
                  </div>
                  <div className="pp-label-row" style={{ marginTop: 12 }}>
                    <span className="pp-sub-label">Service Areas</span>
                    <div className="tag-row">{provider.service_areas.map(a => <span className="area-tag" key={a}>📍 {a}</span>)}</div>
                  </div>
                </div>
                <div className="pp-card">
                  <h3>Performance Metrics</h3>
                  <div className="perf-grid">
                    {[
                      { label: 'Completion Rate', val: '94%', color: C.success },
                      { label: 'On-Time Rate',     val: '97%', color: C.blue },
                      { label: 'Repeat Customers', val: '68%', color: C.purpleDark },
                      { label: 'Avg Response',     val: '12m', color: C.warning },
                    ].map(p => (
                      <div className="perf-item" key={p.label}>
                        <strong style={{ color: p.color }}>{p.val}</strong>
                        <span>{p.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* JOBS */}
          {tab === 'jobs' && (
            <div>
              <div className="jobs-cards">
                {[
                  { icon: '📋', val: JOBS.length,           label: 'Total Jobs', color: C.blue },
                  { icon: '✅', val: completedJobs.length,  label: 'Completed',  color: C.success },
                  { icon: '📅', val: JOBS.filter(j => j.status === 'confirmed' || j.status === 'pending').length, label: 'Upcoming', color: C.purpleDark },
                  { icon: '⭐', val: `${avgRating}/5`,       label: 'Avg Rating', color: C.warning },
                ].map(c => (
                  <div className="jc-card" key={c.label} style={{ '--c': c.color }}>
                    <div className="jcc-icon">{c.icon}</div>
                    <strong>{c.val}</strong>
                    <span>{c.label}</span>
                  </div>
                ))}
              </div>
              <div className="jobs-filter">
                {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map(f => (
                  <button key={f} className={`pill ${jobFilter === f ? 'active' : ''}`} onClick={() => setJobFilter(f)}>
                    {f === 'all' ? 'All Jobs' : f.replace('_', ' ')}
                  </button>
                ))}
              </div>
              <div className="jobs-list">
                {filteredJobs.map(j => {
                  const st = STATUS_COLORS[j.status] || STATUS_COLORS.pending;
                  return (
                    <div className="job-row" key={j.id}>
                      <div className="jr-left">
                        <div className="jr-code">{j.booking_code}</div>
                        <div className="jr-service">{j.service}</div>
                        <div className="jr-customer">👤 {j.customer}</div>
                      </div>
                      <div className="jr-mid">
                        <div className="jr-detail">📅 {j.date} · {j.time}</div>
                        <div className="jr-detail">📍 {j.address}</div>
                        {j.review && <div className="jr-review">{'⭐'.repeat(j.rating)} <em>"{j.review}"</em></div>}
                      </div>
                      <div className="jr-right">
                        <span className="status-pill" style={{ color: st.color, background: st.bg, border: `1px solid ${st.border}` }}>
                          {j.status.replace('_', ' ')}
                        </span>
                        <strong className="jr-amount">₹{j.amount}</strong>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* EARNINGS */}
          {tab === 'earnings' && (
            <div>
              <div className="earn-cards">
                {[
                  { icon: '💰', label: 'Total Earned',   val: '₹' + provider.total_earnings.toLocaleString(), color: C.success },
                  { icon: '📅', label: 'This Month',     val: '₹9,500',  color: C.blue },
                  { icon: '📊', label: 'Avg Per Job',    val: '₹' + (provider.total_earnings / provider.total_jobs).toFixed(0), color: C.purpleDark },
                  { icon: '⏳', label: 'Pending Payout', val: '₹1,248',  color: C.warning },
                ].map(c => (
                  <div className="earn-card" key={c.label}>
                    <div className="ec-top"><span className="ec-icon">{c.icon}</span><span className="ec-label">{c.label}</span></div>
                    <strong className="ec-val" style={{ color: c.color }}>{c.val}</strong>
                  </div>
                ))}
              </div>
              <div className="pp-card" style={{ marginTop: 24 }}>
                <h3>Monthly Earnings — Last 6 Months</h3>
                <div className="bar-chart">
                  {EARNINGS_DATA.map(e => (
                    <div className="bar-col" key={e.month}>
                      <div className="bar-val">₹{(e.amount / 1000).toFixed(1)}K</div>
                      <div className="bar-track">
                        <div className="bar-fill" style={{ height: `${Math.round((e.amount / maxEarning) * 140)}px` }}></div>
                      </div>
                      <div className="bar-label">{e.month}</div>
                    </div>
                  ))}
                </div>
                <div className="chart-total">6-month total: <strong>₹{EARNINGS_DATA.reduce((a, b) => a + b.amount, 0).toLocaleString()}</strong></div>
              </div>
              <div className="pp-card" style={{ marginTop: 20 }}>
                <h3>Payment History</h3>
                <div className="pay-list">
                  {JOBS.filter(j => j.status === 'completed').map(j => (
                    <div className="pay-row" key={j.id}>
                      <span className="pay-code">{j.booking_code}</span>
                      <span className="pay-service">{j.service}</span>
                      <span className="pay-date">{j.date}</span>
                      <span className="pay-amount">₹{j.amount}</span>
                      <span className="pay-status">Paid</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Main Export ── */
export default function ProviderProfile() {
  const [selectedId, setSelectedId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(PROVIDERS.map(p => p.category)))];
  const filteredProviders = PROVIDERS.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        p.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = filterCategory === 'All' || p.category === filterCategory;
    return matchSearch && matchCat;
  });

  if (selectedId !== null) {
    const provider = PROVIDERS.find(p => p.id === selectedId);
    return <><ProviderDetail provider={provider} onBack={() => setSelectedId(null)} /><Styles /></>;
  }

  return (
    <div className="listing-page">
      <div className="listing-hero">
        <div className="container">
          <h1 className="listing-title">Our Service Providers</h1>
          <p className="listing-subtitle">Find trusted professionals for every home service need</p>
          <div className="listing-search-wrap">
            <span className="ls-icon">🔍</span>
            <input
              className="listing-search"
              placeholder="Search by name, skill, or category..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="listing-body">
        <div className="container">
          <div className="cat-filter">
            {categories.map(c => (
              <button key={c} className={`cat-pill ${filterCategory === c ? 'active' : ''}`} onClick={() => setFilterCategory(c)}>
                {c}
              </button>
            ))}
          </div>
          <div className="listing-meta">
            <span className="lm-count">Showing <strong>{filteredProviders.length}</strong> providers</span>
            <span className="lm-online">
              <span className="lm-dot"></span>
              {filteredProviders.filter(p => p.is_available).length} available now
            </span>
          </div>
          <div className="providers-grid">
            {filteredProviders.map(p => (
              <ProviderCard key={p.id} provider={p} onView={setSelectedId} />
            ))}
          </div>
          {filteredProviders.length === 0 && (
            <div className="empty-state">
              <div style={{ fontSize: '3rem', marginBottom: 12 }}>🔍</div>
              <p>No providers found. Try a different search or filter.</p>
            </div>
          )}
        </div>
      </div>
      <Styles />
    </div>
  );
}

/* ── Styles ── */
function Styles() {
  return (
    <style>{`
      * { box-sizing: border-box; }
     .container { 
  max-width: 1800px; 
  width: 100%;
  margin: 0 auto; 
  padding: 0 10px; 
}
  .listing-page {
  width: 100%;
  padding: 0;
}

.listing-body {
  width: 100%;
  padding: 20px 5px;
}

.providers-grid {
  gap: 14px;
}
      /* ── Listing Page ── */
      .listing-page { min-height: 100vh; background: #F2EAE0; }
      .listing-hero {
        background: linear-gradient(135deg, #2DA6CE 0%, #1d8aaf 45%, #9B8EC7 100%);
        padding: 48px 0 40px;
      }
      .listing-title { font-size: 2.2rem; font-weight: 800; color: #fff; margin: 0 0 8px; font-family: 'Poppins', sans-serif; }
      .listing-subtitle { color: rgba(255,255,255,0.82); margin: 0 0 28px; font-size: 1rem; }
      .listing-search-wrap { position: relative; max-width: 540px; }
      .ls-icon { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); font-size: 1rem; }
      .listing-search { width: 100%; padding: 14px 18px 14px 44px; border-radius: 50px; border: none; font-size: 0.95rem; outline: none; background: rgba(255,255,255,0.96); color: #2c2140; box-shadow: 0 4px 20px rgba(0,0,0,0.12); font-family: inherit; }
      .listing-search::placeholder { color: #8a7faa; }

      .listing-body { padding: 32px 0 80px; }

      /* Category Filter */
      .cat-filter { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px; }
      .cat-pill { padding: 7px 16px; border-radius: 50px; border: 1.5px solid #e2d8ce; background: #fff; color: #5e5178; font-size: 0.8rem; font-weight: 500; cursor: pointer; transition: all .2s; font-family: inherit; }
      .cat-pill:hover { border-color: #2DA6CE; color: #1d8aaf; background: #e6f4fa; }
      .cat-pill.active { background: linear-gradient(135deg, #2DA6CE, #9B8EC7); border-color: transparent; color: #fff; box-shadow: 0 2px 10px rgba(45,166,206,0.35); }

      .listing-meta { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
      .lm-count { color: #5e5178; font-size: 0.875rem; }
      .lm-count strong { color: #2c2140; }
      .lm-online { display: flex; align-items: center; gap: 7px; color: #2a8a6e; font-size: 0.82rem; font-weight: 500; }
      .lm-dot { width: 8px; height: 8px; border-radius: 50%; background: #2a8a6e; animation: pulse 2s infinite; }
      @keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.5} }

      /* Provider Card Grid */
      .providers-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; }

      .pcard { background: #fff; border: 1.5px solid #e2d8ce; border-radius: 16px; padding: 22px; cursor: pointer; transition: all .25s; box-shadow: 0 1px 4px rgba(44,33,64,0.07); display: flex; flex-direction: column; gap: 14px; }
      .pcard:hover { border-color: #2DA6CE; box-shadow: 0 8px 28px rgba(45,166,206,0.18); transform: translateY(-3px); }

      .pcard-top { display: flex; gap: 14px; align-items: flex-start; }
      .pcard-avatar-wrap { position: relative; flex-shrink: 0; }
      .pcard-avatar { width: 58px; height: 58px; background: linear-gradient(135deg, #2DA6CE, #9B8EC7); border-radius: 14px; display: flex; align-items: center; justify-content: center; font-family: 'Poppins', sans-serif; font-size: 1.2rem; font-weight: 700; color: #fff; }
      .pcard-dot { position: absolute; bottom: -2px; right: -2px; width: 14px; height: 14px; border-radius: 50%; border: 2.5px solid #fff; }
      .pcard-dot.online { background: #2a8a6e; }
      .pcard-dot.offline { background: #b03040; }
      .pcard-header-info { flex: 1; min-width: 0; }
      .pcard-name-row { display: flex; align-items: center; gap: 7px; flex-wrap: wrap; margin-bottom: 4px; }
      .pcard-name { font-weight: 700; font-size: 1rem; color: #2c2140; font-family: 'Poppins', sans-serif; }
      .pcard-verified { font-size: 0.68rem; font-weight: 600; padding: 2px 8px; background: #e6f5f0; color: #2a8a6e; border: 1px solid #9dd5c4; border-radius: 50px; flex-shrink: 0; }
      .pcard-spec { color: #5e5178; font-size: 0.8rem; margin-bottom: 8px; line-height: 1.4; }
      .pcard-cat { font-size: 0.72rem; font-weight: 600; padding: 3px 10px; border-radius: 50px; display: inline-block; }

      .pcard-stats { display: flex; align-items: center; background: #F2EAE0; border-radius: 10px; padding: 10px 4px; }
      .pcs { flex: 1; text-align: center; display: flex; flex-direction: column; gap: 2px; }
      .pcs strong { font-family: 'Poppins', sans-serif; font-size: 0.88rem; font-weight: 700; color: #2c2140; }
      .pcs span { font-size: 0.65rem; color: #8a7faa; }
      .pcs-divider { width: 1px; height: 28px; background: #e2d8ce; flex-shrink: 0; }

      .pcard-areas { display: flex; flex-wrap: wrap; gap: 5px; }
      .pcard-area { font-size: 0.72rem; padding: 3px 8px; background: #e6f4fa; color: #1d8aaf; border: 1px solid #90cde0; border-radius: 50px; }
      .pcard-area-more { font-size: 0.72rem; padding: 3px 8px; background: #F2EAE0; color: #5e5178; border: 1px solid #e2d8ce; border-radius: 50px; }

      .pcard-btn { width: 100%; padding: 10px; border-radius: 10px; border: 2px solid #2DA6CE; background: transparent; color: #1d8aaf; font-weight: 600; font-size: 0.875rem; cursor: pointer; transition: all .2s; font-family: inherit; margin-top: auto; }
      .pcard-btn:hover { background: linear-gradient(135deg, #2DA6CE, #9B8EC7); border-color: transparent; color: #fff; }

      /* ── Detail Page ── */
      .detail-page { min-height: 100vh; background: #F2EAE0; }
      .detail-back-bar { background: #fff; border-bottom: 1px solid #e2d8ce; padding: 12px 0; }
      .back-btn { display: inline-flex; align-items: center; gap: 6px; padding: 8px 18px; border-radius: 50px; border: 1.5px solid #e2d8ce; background: #fff; color: #5e5178; font-size: 0.875rem; font-weight: 600; cursor: pointer; transition: all .2s; font-family: inherit; }
      .back-btn:hover { border-color: #2DA6CE; color: #1d8aaf; background: #e6f4fa; }

      /* Hero */
      .pp-hero { background: linear-gradient(135deg, #1d8aaf 0%, #2DA6CE 50%, #9B8EC7 100%); padding: 32px 0 36px; }
      .pp-hero-inner { display: flex; align-items: center; gap: 24px; flex-wrap: wrap; }
      .pp-avatar-wrap { position: relative; flex-shrink: 0; }
      .pp-avatar { width: 88px; height: 88px; background: rgba(255,255,255,0.18); border: 3px solid rgba(255,255,255,0.5); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: 'Poppins', sans-serif; font-size: 1.8rem; font-weight: 700; color: #fff; }
      .pp-dot { position: absolute; bottom: 4px; right: 4px; width: 18px; height: 18px; border-radius: 50%; border: 3px solid #fff; }
      .pp-dot.online { background: #2a8a6e; }
      .pp-dot.offline { background: #b03040; }
      .pp-hero-info { flex: 1; min-width: 240px; }
      .pp-name-row { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; margin-bottom: 6px; }
      .pp-name-row h1 { font-size: 1.8rem; color: #fff; margin: 0; font-family: 'Poppins', sans-serif; }
      .verified-tag { display: inline-flex; align-items: center; gap: 5px; background: rgba(255,255,255,0.18); color: #fff; padding: 4px 12px; border-radius: 50px; font-size: 0.72rem; font-weight: 600; }
      .pp-spec { color: rgba(255,255,255,0.90); font-size: 0.9rem; margin-bottom: 16px; font-weight: 500; }
      .pp-stats-row { display: flex; gap: 24px; flex-wrap: wrap; }
      .pp-stat { display: flex; flex-direction: column; gap: 2px; }
      .pp-stat strong { font-family: 'Poppins', sans-serif; font-size: 1.15rem; font-weight: 700; color: #fff; }
      .pp-stat span { color: rgba(255,255,255,0.78); font-size: 0.68rem; }
      .pp-hero-right { display: flex; flex-direction: column; gap: 10px; align-items: flex-end; flex-shrink: 0; }
      .avail-btn { display: inline-flex; align-items: center; gap: 8px; padding: 10px 22px; border-radius: 50px; font-weight: 600; font-size: 0.875rem; cursor: pointer; border: 2px solid rgba(255,255,255,0.5); background: rgba(255,255,255,0.14); color: #fff; transition: all .2s; font-family: inherit; }
      .avail-btn:hover { background: rgba(255,255,255,0.24); }
      .avail-dot-sm { width: 10px; height: 10px; border-radius: 50%; }
      .avail-dot-sm.on { background: #2a8a6e; }
      .avail-dot-sm.off { background: #b03040; }

      /* Body tabs & cards */
      .pp-body { padding: 28px 0 80px; }
      .pp-tabs { display: flex; gap: 8px; margin-bottom: 24px; flex-wrap: wrap; }
      .pp-tab { display: flex; align-items: center; gap: 7px; padding: 10px 22px; border-radius: 50px; border: 1.5px solid #e2d8ce; background: #fff; color: #5e5178; font-size: 0.875rem; font-weight: 500; cursor: pointer; transition: all .2s; font-family: inherit; }
      .pp-tab:hover { border-color: #2DA6CE; color: #1d8aaf; background: #e6f4fa; }
      .pp-tab.active { background: linear-gradient(135deg, #2DA6CE, #9B8EC7); border-color: transparent; color: #fff; }

      .pp-grid { display: grid; grid-template-columns: 1.35fr 1fr; gap: 24px; align-items: start; }
      .pp-col-main, .pp-col-side { display: flex; flex-direction: column; gap: 20px; }
      .pp-card { background: #fff; border: 1.5px solid #e2d8ce; border-radius: 14px; padding: 22px; box-shadow: 0 1px 4px rgba(44,33,64,0.06); }
      .pp-card h3 { font-size: 0.95rem; font-weight: 700; color: #2c2140; margin-bottom: 14px; padding-bottom: 10px; border-bottom: 1px solid #F2EAE0; }
      .pp-card p { color: #5e5178; font-size: 0.88rem; line-height: 1.8; }

      .skills-wrap { display: flex; flex-wrap: wrap; gap: 8px; }
      .skill-tag { padding: 5px 14px; background: #e6f4fa; color: #1d8aaf; border: 1px solid #90cde0; border-radius: 50px; font-size: 0.75rem; font-weight: 500; }
      .services-wrap { display: flex; flex-direction: column; gap: 10px; }
      .service-tag { display: flex; align-items: center; gap: 10px; padding: 10px 14px; background: #F2EAE0; border: 1px solid #e2d8ce; border-radius: 10px; font-size: 0.85rem; font-weight: 500; color: #2c2140; }

      .info-list { display: flex; flex-direction: column; gap: 14px; }
      .info-item { display: flex; align-items: flex-start; gap: 12px; }
      .ii-icon { font-size: 1.1rem; width: 30px; height: 30px; background: #e6f4fa; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
      .ii-label { color: #8a7faa; font-size: 0.68rem; font-weight: 600; margin-bottom: 2px; text-transform: uppercase; letter-spacing: .04em; }
      .ii-val { font-size: 0.845rem; color: #2c2140; font-weight: 500; }

      .cert-list { display: flex; flex-direction: column; gap: 10px; }
      .cert-item { display: flex; align-items: center; gap: 10px; font-size: 0.845rem; color: #2c2140; }
      .cert-check { width: 20px; height: 20px; background: #e6f5f0; color: #2a8a6e; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.65rem; font-weight: 700; flex-shrink: 0; }

      .pp-sub-label { font-size: 0.72rem; color: #8a7faa; font-weight: 600; text-transform: uppercase; letter-spacing: .04em; display: block; margin-bottom: 8px; }
      .tag-row { display: flex; flex-wrap: wrap; gap: 7px; }
      .lang-tag { padding: 4px 12px; background: #f0eef9; color: #7b6daa; border: 1px solid #c8bfea; border-radius: 50px; font-size: 0.75rem; font-weight: 500; }
      .area-tag { padding: 4px 12px; background: #e6f4fa; color: #1d8aaf; border: 1px solid #90cde0; border-radius: 50px; font-size: 0.75rem; font-weight: 500; }

      .perf-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
      .perf-item { background: #F2EAE0; border: 1px solid #e2d8ce; border-radius: 10px; padding: 12px; text-align: center; }
      .perf-item strong { display: block; font-family: 'Poppins', sans-serif; font-size: 1.3rem; margin-bottom: 3px; }
      .perf-item span { color: #5e5178; font-size: 0.68rem; }

      /* Jobs */
      .jobs-cards { display: grid; grid-template-columns: repeat(4,1fr); gap: 14px; margin-bottom: 20px; }
      .jc-card { background: #fff; border: 1.5px solid #e2d8ce; border-radius: 14px; padding: 18px; text-align: center; border-top: 3px solid var(--c); }
      .jcc-icon { font-size: 1.4rem; margin-bottom: 6px; }
      .jc-card strong { display: block; font-family: 'Poppins', sans-serif; font-size: 1.4rem; color: #2c2140; margin-bottom: 3px; }
      .jc-card span { color: #5e5178; font-size: 0.75rem; }
      .jobs-filter { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 18px; }
      .pill { padding: 6px 16px; border-radius: 50px; border: 1.5px solid #e2d8ce; background: #fff; color: #5e5178; font-size: 0.8rem; font-weight: 500; cursor: pointer; transition: all .2s; font-family: inherit; }
      .pill.active { background: linear-gradient(135deg, #2DA6CE, #9B8EC7); border-color: transparent; color: #fff; }
      .jobs-list { display: flex; flex-direction: column; gap: 12px; }
      .job-row { background: #fff; border: 1.5px solid #e2d8ce; border-radius: 14px; padding: 18px; display: flex; gap: 18px; align-items: flex-start; flex-wrap: wrap; }
      .jr-left { min-width: 150px; }
      .jr-code { font-family: monospace; font-size: 0.75rem; color: #1d8aaf; background: #e6f4fa; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-bottom: 5px; }
      .jr-service { font-weight: 600; font-size: 0.88rem; color: #2c2140; margin-bottom: 4px; }
      .jr-customer { color: #5e5178; font-size: 0.8rem; }
      .jr-mid { flex: 1; display: flex; flex-direction: column; gap: 5px; }
      .jr-detail { color: #5e5178; font-size: 0.82rem; }
      .jr-review { font-size: 0.78rem; color: #5e5178; font-style: italic; margin-top: 4px; }
      .jr-right { display: flex; flex-direction: column; align-items: flex-end; gap: 8px; flex-shrink: 0; }
      .status-pill { padding: 4px 12px; border-radius: 50px; font-size: 0.72rem; font-weight: 600; text-transform: capitalize; }
      .jr-amount { font-family: 'Poppins', sans-serif; font-size: 1.1rem; font-weight: 700; color: #2c2140; }

      /* Earnings */
      .earn-cards { display: grid; grid-template-columns: repeat(4,1fr); gap: 14px; }
      .earn-card { background: #fff; border: 1.5px solid #e2d8ce; border-radius: 14px; padding: 18px; }
      .ec-top { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
      .ec-icon { font-size: 1.3rem; }
      .ec-label { color: #5e5178; font-size: 0.8rem; font-weight: 500; }
      .ec-val { font-family: 'Poppins', sans-serif; font-size: 1.5rem; font-weight: 700; }
      .bar-chart { display: flex; align-items: flex-end; gap: 12px; padding: 16px 0 6px; }
      .bar-col { display: flex; flex-direction: column; align-items: center; gap: 5px; flex: 1; }
      .bar-val { font-size: 0.68rem; color: #5e5178; font-weight: 600; }
      .bar-track { display: flex; align-items: flex-end; height: 140px; width: 100%; justify-content: center; }
      .bar-fill { width: 70%; max-width: 44px; background: linear-gradient(135deg, #2DA6CE, #9B8EC7); border-radius: 6px 6px 0 0; min-height: 6px; }
      .bar-label { font-size: 0.75rem; color: #5e5178; font-weight: 600; }
      .chart-total { text-align: center; margin-top: 12px; color: #5e5178; font-size: 0.845rem; }
      .chart-total strong { color: #1d8aaf; font-family: 'Poppins', sans-serif; }
      .pay-list { display: flex; flex-direction: column; }
      .pay-row { display: flex; align-items: center; gap: 14px; padding: 11px 0; border-bottom: 1px solid #F2EAE0; flex-wrap: wrap; font-size: 0.845rem; }
      .pay-row:last-child { border-bottom: none; }
      .pay-code { font-family: monospace; font-size: 0.75rem; color: #1d8aaf; background: #e6f4fa; padding: 2px 8px; border-radius: 4px; flex-shrink: 0; }
      .pay-service { flex: 1; min-width: 130px; color: #2c2140; font-weight: 500; }
      .pay-date { color: #5e5178; font-size: 0.8rem; flex-shrink: 0; }
      .pay-amount { font-weight: 700; color: #2c2140; font-family: 'Poppins', sans-serif; flex-shrink: 0; }
      .pay-status { padding: 2px 10px; background: #e6f5f0; color: #2a8a6e; border-radius: 50px; font-size: 0.68rem; font-weight: 600; flex-shrink: 0; }

      .empty-state { text-align: center; padding: 60px; color: #5e5178; }

      @media(max-width:900px){ .pp-grid{grid-template-columns:1fr;} .jobs-cards,.earn-cards{grid-template-columns:1fr 1fr;} }
      @media(max-width:640px){
        .providers-grid{grid-template-columns:1fr;}
        .pp-hero-inner{flex-direction:column;text-align:center;}
        .pp-stats-row{justify-content:center;}
        .pp-hero-right{align-items:center;}
        .jobs-cards,.earn-cards{grid-template-columns:1fr 1fr;}
        .job-row{flex-direction:column;}
        .jr-right{align-items:flex-start;}
      }
    `}</style>
  );
}
