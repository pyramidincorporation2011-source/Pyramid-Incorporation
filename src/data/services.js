/**
 * Services shown in the Services section, the contact form dropdown and the footer.
 *
 * image: key from src/assets/images.json ("<folder>/<file name without extension>").
 * To use your own photo: put it in src/assets/originals/stock (or projects),
 * run `npm run images`, then change the `image` key below. See README.md.
 */

export const serviceCategories = [
  { id: 'all', label: 'All' },
  { id: 'waterproofing', label: 'Waterproofing' },
  { id: 'grouting', label: 'Grouting & Injection' },
  { id: 'repair', label: 'Repair & Cutting' },
];

export const services = [
  {
    id: 'bathroom-waterproofing',
    title: 'Toilet / Bathroom Waterproofing',
    category: 'waterproofing',
    short:
      'Most bathroom leaks travel through the floor, wall–floor junctions and pipe penetrations. We seal them with a continuous membrane before tiling.',
    whatWeDo: [
      'Surface preparation and sealing of pipe outlets, floor traps and penetrations',
      'Coving at wall–floor junctions to remove the weakest point',
      'Flexible polymer-modified cementitious or liquid membrane across the floor and up the walls',
      'Pond test to confirm the membrane holds before tiling',
    ],
    signs: [
      'Damp patches or peeling paint on the ceiling of the room below',
      'Dampness or salt marks on walls next to the bathroom',
      'Leaks around floor traps or pipe outlets',
    ],
    image: 'stock/bathroom',
    alt: 'Worker in a hard hat applying a coat to an interior wall with a trowel',
  },
  {
    id: 'sump-tank-waterproofing',
    title: 'Sump / Underground Water Tank Waterproofing',
    category: 'waterproofing',
    short:
      'Underground tanks face water pressure from inside and groundwater from outside. We treat joints, inlets and weak concrete, then waterproof the shell.',
    whatWeDo: [
      'Treatment of construction joints and pipe inlets',
      'Repair of honeycombed and porous concrete',
      'Cementitious or crystalline waterproofing of the tank walls and floor',
      'Materials suitable for potable water storage on drinking-water tanks',
    ],
    signs: [
      'Tank level drops when no water is being drawn',
      'Muddy or discoloured water after rain',
      'Seepage or dampness in nearby walls and floors',
    ],
    image: 'stock/sump-tank',
    alt: 'Worker in a hard hat working inside a below-ground excavation',
  },
  {
    id: 'terrace-treatment',
    title: 'Terrace Insulation & Treatment',
    category: 'waterproofing',
    short:
      'Crack repair, slope and outlet correction, and a waterproofing system suited to the terrace, with heat-reflective coatings or insulation to cut heat gain.',
    whatWeDo: [
      'Repair of cracks and correction of slopes and drainage outlets',
      'Elastomeric coatings or membranes suited to the terrace and its use',
      'Heat-reflective coatings or insulation layers to lower slab temperature',
      'Detailing at parapets, outlets and other junctions',
    ],
    signs: [
      'Ceiling dampness or leaks in the top-floor rooms during rain',
      'Water ponding on the terrace after rain',
      'Top-floor rooms that stay noticeably hot in summer',
    ],
    image: 'stock/terrace',
    alt: 'Worker spreading wet concrete across a slab with a shovel',
  },
  {
    id: 'expansion-joint-treatment',
    title: 'Expansion Joint Treatment',
    category: 'waterproofing',
    short:
      'Failed expansion joints let water straight in. We reseal them so they stay watertight while still letting the structure move.',
    whatWeDo: [
      'Removal of old, failed joint fillers and cleaning of the joint faces',
      'Backer rod to control sealant depth',
      'Elastomeric sealants such as PU or polysulphide',
      'Joint-cover systems where the joint needs mechanical protection',
    ],
    signs: [
      'Leaks along a straight line in the ceiling or wall',
      'Cracked, hardened or missing joint filler',
      'Gaps opening and closing with the seasons',
    ],
    image: 'stock/expansion-joint',
    alt: 'Worker levelling concrete along the edge of a slab at a construction site',
  },
  {
    id: 'crack-treatment',
    title: 'Crack Treatment',
    category: 'repair',
    short:
      'We first assess whether a crack is surface-level or deeper, dormant or still moving, then treat it accordingly.',
    whatWeDo: [
      'Assessment of crack depth and whether it is still moving',
      'V-grooving and filling with polymer-modified mortar or flexible sealant',
      'Injection for deeper cracks',
      'Referral for a structural engineer’s assessment where a crack indicates structural distress',
    ],
    signs: [
      'Cracks in plaster, walls or slabs that let in water',
      'Cracks that widen or reappear after painting',
      'Damp lines following a crack',
    ],
    image: 'stock/crack',
    alt: 'Worker in a hard hat using a trowel on a wall-to-ceiling junction',
  },
  {
    id: 'cement-slurry-grouting',
    title: 'Cement Slurry Grouting',
    category: 'grouting',
    short:
      'Cement-based grout pumped under pressure through injection nozzles fills voids, honeycombing and porous concrete.',
    whatWeDo: [
      'Fixing injection nozzles at planned spacing',
      'Pressure injection of cement-based grout into voids and honeycombing',
      'Consolidation of the concrete member',
      'Closing the paths water uses to seep through',
    ],
    signs: [
      'Honeycombed or porous concrete',
      'Seepage through slabs, walls or columns',
      'Hollow-sounding areas in concrete',
    ],
    image: 'stock/slurry-grouting',
    alt: 'Worker mixing cement by hand on a construction site',
  },
  {
    id: 'pu-grouting',
    title: 'PU Grouting',
    category: 'grouting',
    short:
      'Polyurethane resin injected through packers reacts with water and expands to seal actively leaking cracks and joints, even under wet conditions.',
    whatWeDo: [
      'Drilling and fixing injection packers along the leaking crack or joint',
      'Injection of polyurethane resin that reacts with water and expands',
      'Sealing of active leaks in wet conditions',
      'Suited to basements, tanks, lift pits and other below-ground areas',
    ],
    signs: [
      'Water actively dripping or flowing through a crack',
      'Leaks in basements, lift pits or tanks',
      'Leaks that return after surface patching',
    ],
    image: 'stock/pu-grouting',
    alt: 'Worker in a safety vest inspecting the underside of a concrete slab',
  },
  {
    id: 'core-cutting',
    title: 'Core Cutting',
    category: 'repair',
    short:
      'Diamond core drilling makes clean, precise circular openings in concrete and masonry for pipes, drains and service lines.',
    whatWeDo: [
      'Diamond core drilling in concrete and masonry',
      'Clean circular openings for pipes, drains and service lines',
      'Far less vibration and surrounding damage than breaking with hammers',
    ],
    signs: [
      'New plumbing, drainage or electrical lines through a slab or wall',
      'Openings needed in finished structures without damaging them',
    ],
    image: 'stock/core-cutting',
    alt: 'Construction workers in safety vests and hard hats inside a building under construction',
  },
  {
    id: 'rebaring',
    title: 'Rebaring',
    category: 'repair',
    short:
      'Corroded reinforcement is exposed, cleaned, treated and re-covered, with new bars chemically anchored where needed.',
    whatWeDo: [
      'Exposing and cleaning corroded reinforcement',
      'Anti-corrosion coating on the steel',
      'Re-covering with polymer-modified repair mortar',
      'New bars anchored into drilled holes with chemical anchoring, then waterproofing to stop corrosion returning',
    ],
    signs: [
      'Concrete spalling or falling off slabs and beams',
      'Rust stains or exposed, rusted steel',
      'Cracks running along the line of the reinforcement',
    ],
    image: 'stock/rebaring',
    alt: 'Workers in hard hats tying steel reinforcement bars',
  },
  {
    id: 'basement-treatment',
    title: 'Basement Treatment',
    category: 'waterproofing',
    short:
      'Below-ground walls and floors are under constant water pressure. We combine injection, joint sealing and coatings to control seepage and dampness.',
    whatWeDo: [
      'Injection grouting for active leaks',
      'Sealing of construction and expansion joints',
      'Cementitious or crystalline coatings on walls and floors',
      'Control of seepage, dampness and the damage they cause',
    ],
    signs: [
      'Water seeping through basement walls or floor',
      'Damp smell, mould or efflorescence',
      'Water collecting in parking or storage areas',
    ],
    image: 'stock/basement',
    alt: 'Workers on a construction site with timber formwork and scaffolding',
  },
];
