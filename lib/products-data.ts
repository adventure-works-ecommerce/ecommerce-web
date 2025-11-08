export interface Product {
  id: string
  name: string
  price: number
  type: "Road" | "Mountain" | "Touring" | "E-Bike" | "Accessories"
  category?: "Llantas" | "Cadenas" | "Pedales" | "Manillares" | "Sillines" | "Luces"
  image: string
  images: string[]
  description: string
  technicalSpecs: string[]
  colors: Array<{ name: string; value: string; color: string }>
  sizes: Array<{ label: string; value: string }>
}

export const products: Product[] = [
  {
    id: "touring-1000",
    name: "Touring-1000",
    price: 2199,
    type: "Touring",
    image: "/images/touring-1000-main.jpg",
    images: [
      "/images/touring-bike-1.jpg",
      "/images/touring-bike-2.jpg",
      "/images/touring-bike-3.jpg",
      "/images/touring-1000-main.jpg",
    ],
    description:
      "Diseñada para largas distancias, con cuadro de aluminio ligero y componentes de alta calidad. Perfecta para recorridos urbanos, turismo en carretera y desplazamientos diarios con estilo y resistencia.",
    technicalSpecs: [
      "Cuadro: Aluminio 6061",
      "Cambios: Shimano 21 velocidades",
      "Frenos: Disco hidráulicos",
      "Ruedas: 700c con llantas anti-pinchazos",
      "Peso: 14.5 kg",
    ],
    colors: [
      { name: "Matte Black", value: "black", color: "#1a1a1a" },
      { name: "Gray", value: "gray", color: "#6b7280" },
      { name: "Yellow", value: "yellow", color: "#fbbf24" },
    ],
    sizes: [
      { label: 'S (15")', value: "S" },
      { label: 'M (17")', value: "M" },
      { label: 'L (19")', value: "L" },
      { label: 'XL (21")', value: "XL" },
    ],
  },
  {
    id: "road-750",
    name: "Road-750",
    price: 1599,
    type: "Road",
    image: "/images/road-category.jpg",
    images: ["/images/road-category.jpg"],
    description:
      "Bicicleta de carretera de alto rendimiento con cuadro de carbono ultraligero. Ideal para ciclistas que buscan velocidad y eficiencia en asfalto.",
    technicalSpecs: [
      "Cuadro: Fibra de carbono",
      "Cambios: Shimano 105, 22 velocidades",
      "Frenos: Caliper de doble pivote",
      "Ruedas: 700c aerodinámicas",
      "Peso: 8.2 kg",
    ],
    colors: [
      { name: "Racing Red", value: "red", color: "#dc2626" },
      { name: "Carbon Black", value: "black", color: "#1a1a1a" },
      { name: "White", value: "white", color: "#f3f4f6" },
    ],
    sizes: [
      { label: "S (50cm)", value: "S" },
      { label: "M (54cm)", value: "M" },
      { label: "L (58cm)", value: "L" },
    ],
  },
  {
    id: "mountain-500",
    name: "Mountain-500",
    price: 1899,
    type: "Mountain",
    image: "/images/mountain-category.jpg",
    images: ["/images/mountain-category.jpg"],
    description:
      "Bicicleta de montaña robusta con suspensión completa. Perfecta para senderos técnicos y terrenos difíciles con máximo control y comodidad.",
    technicalSpecs: [
      "Cuadro: Aluminio 7005 con suspensión trasera",
      "Suspensión delantera: RockShox 120mm",
      "Cambios: SRAM NX Eagle, 12 velocidades",
      "Frenos: Disco hidráulicos 180mm",
      "Ruedas: 29 pulgadas tubeless ready",
      "Peso: 13.8 kg",
    ],
    colors: [
      { name: "Forest Green", value: "green", color: "#059669" },
      { name: "Matte Black", value: "black", color: "#1a1a1a" },
      { name: "Orange", value: "orange", color: "#f97316" },
    ],
    sizes: [
      { label: 'S (15")', value: "S" },
      { label: 'M (17")', value: "M" },
      { label: 'L (19")', value: "L" },
      { label: 'XL (21")', value: "XL" },
    ],
  },
  {
    id: "ebike-2000",
    name: "E-Bike-2000",
    price: 3499,
    type: "E-Bike",
    image: "/images/touring-bike-1.jpg",
    images: ["/images/touring-bike-1.jpg"],
    description:
      "Bicicleta eléctrica de última generación con motor potente y batería de larga duración. Perfecta para desplazamientos urbanos sin esfuerzo y aventuras de fin de semana.",
    technicalSpecs: [
      "Motor: 250W Bosch Performance Line",
      "Batería: 500Wh, autonomía hasta 120km",
      "Cuadro: Aluminio reforzado",
      "Cambios: Shimano Deore, 10 velocidades",
      "Frenos: Disco hidráulicos 180mm",
      "Display: LCD con conectividad Bluetooth",
      "Peso: 22 kg",
    ],
    colors: [
      { name: "Midnight Blue", value: "blue", color: "#1e40af" },
      { name: "Silver", value: "silver", color: "#9ca3af" },
    ],
    sizes: [
      { label: 'M (17")', value: "M" },
      { label: 'L (19")', value: "L" },
    ],
  },
  {
    id: "road-350",
    name: "Road-350",
    price: 899,
    type: "Road",
    image: "/images/road-category.jpg",
    images: ["/images/road-category.jpg"],
    description:
      "Bicicleta de carretera de entrada ideal para principiantes. Ofrece un excelente equilibrio entre rendimiento y precio para iniciarse en el ciclismo de ruta.",
    technicalSpecs: [
      "Cuadro: Aluminio 6061",
      "Cambios: Shimano Claris, 16 velocidades",
      "Frenos: Caliper de aleación",
      "Ruedas: 700c de doble pared",
      "Peso: 10.5 kg",
    ],
    colors: [
      { name: "Blue", value: "blue", color: "#3b82f6" },
      { name: "Black", value: "black", color: "#1a1a1a" },
    ],
    sizes: [
      { label: "S (50cm)", value: "S" },
      { label: "M (54cm)", value: "M" },
      { label: "L (58cm)", value: "L" },
    ],
  },
  {
    id: "mountain-800",
    name: "Mountain-800",
    price: 2599,
    type: "Mountain",
    image: "/images/mountain-category.jpg",
    images: ["/images/mountain-category.jpg"],
    description:
      "Bicicleta de montaña de gama alta con componentes premium. Diseñada para ciclistas exigentes que buscan el máximo rendimiento en descensos y subidas técnicas.",
    technicalSpecs: [
      "Cuadro: Carbono con suspensión trasera 140mm",
      "Suspensión delantera: Fox Float 150mm",
      "Cambios: Shimano XT, 12 velocidades",
      "Frenos: Disco hidráulicos 203mm/180mm",
      "Ruedas: 27.5 pulgadas carbono tubeless",
      "Peso: 12.3 kg",
    ],
    colors: [
      { name: "Stealth Black", value: "black", color: "#1a1a1a" },
      { name: "Neon Yellow", value: "yellow", color: "#facc15" },
      { name: "Red", value: "red", color: "#dc2626" },
    ],
    sizes: [
      { label: 'S (15")', value: "S" },
      { label: 'M (17")', value: "M" },
      { label: 'L (19")', value: "L" },
      { label: 'XL (21")', value: "XL" },
    ],
  },
  {
    id: "touring-600",
    name: "Touring-600",
    price: 1399,
    type: "Touring",
    image: "/images/touring-bike-2.jpg",
    images: ["/images/touring-bike-2.jpg"],
    description:
      "Bicicleta de turismo versátil y confiable. Perfecta para viajes largos con equipaje, con geometría cómoda y capacidad para portaequipajes.",
    technicalSpecs: [
      "Cuadro: Acero cromoly",
      "Cambios: Shimano Deore, 27 velocidades",
      "Frenos: Disco mecánicos",
      "Ruedas: 700c reforzadas",
      "Soportes para portaequipajes y guardabarros",
      "Peso: 15.2 kg",
    ],
    colors: [
      { name: "Olive Green", value: "green", color: "#84cc16" },
      { name: "Brown", value: "brown", color: "#92400e" },
      { name: "Navy", value: "navy", color: "#1e3a8a" },
    ],
    sizes: [
      { label: 'S (15")', value: "S" },
      { label: 'M (17")', value: "M" },
      { label: 'L (19")', value: "L" },
    ],
  },
  {
    id: "ebike-1500",
    name: "E-Bike-1500",
    price: 2799,
    type: "E-Bike",
    image: "/images/touring-bike-3.jpg",
    images: ["/images/touring-bike-3.jpg"],
    description:
      "Bicicleta eléctrica urbana con diseño elegante y funcional. Ideal para desplazamientos diarios con asistencia eléctrica suave y batería integrada.",
    technicalSpecs: [
      "Motor: 250W motor central",
      "Batería: 400Wh integrada, autonomía 80km",
      "Cuadro: Aluminio con diseño step-through",
      "Cambios: Shimano Nexus, 7 velocidades internas",
      "Frenos: Disco hidráulicos",
      "Luces LED integradas",
      "Peso: 20 kg",
    ],
    colors: [
      { name: "Pearl White", value: "white", color: "#f3f4f6" },
      { name: "Graphite", value: "gray", color: "#4b5563" },
    ],
    sizes: [
      { label: 'M (17")', value: "M" },
      { label: 'L (19")', value: "L" },
    ],
  },
  {
    id: "tire-road-700c",
    name: "Llanta Road Pro 700c",
    price: 45.99,
    type: "Accessories",
    category: "Llantas",
    image: "/road-bike-tire-700c-black.jpg",
    images: ["/road-bike-tire-700c-black.jpg"],
    description:
      "Llanta de carretera de alto rendimiento con compuesto de goma optimizado para agarre y durabilidad. Diseño aerodinámico para máxima velocidad.",
    technicalSpecs: [
      "Tamaño: 700c x 25mm",
      "Peso: 220g",
      "TPI: 120",
      "Presión: 95-125 PSI",
      "Compuesto: Dual compound",
      "Protección anti-pinchazos",
    ],
    colors: [{ name: "Black", value: "black", color: "#1a1a1a" }],
    sizes: [
      { label: "700c x 23mm", value: "23" },
      { label: "700c x 25mm", value: "25" },
      { label: "700c x 28mm", value: "28" },
    ],
  },
  {
    id: "tire-mountain-29",
    name: "Llanta Mountain Grip 29",
    price: 52.99,
    type: "Accessories",
    category: "Llantas",
    image: "/mountain-bike-tire-29-inch-aggressive-tread.jpg",
    images: ["/mountain-bike-tire-29-inch-aggressive-tread.jpg"],
    description:
      "Llanta de montaña con diseño de tacos agresivos para máximo agarre en terrenos técnicos. Compatible con tubeless para mayor rendimiento.",
    technicalSpecs: [
      "Tamaño: 29 x 2.35",
      "Peso: 780g",
      "TPI: 60",
      "Presión: 25-50 PSI",
      "Tubeless ready",
      "Compuesto: Triple compound",
    ],
    colors: [{ name: "Black", value: "black", color: "#1a1a1a" }],
    sizes: [
      { label: '29" x 2.25', value: "2.25" },
      { label: '29" x 2.35', value: "2.35" },
      { label: '29" x 2.50', value: "2.50" },
    ],
  },
  {
    id: "tire-touring-700c",
    name: "Llanta Touring Durable 700c",
    price: 38.99,
    type: "Accessories",
    category: "Llantas",
    image: "/touring-bike-tire-700c-puncture-resistant.jpg",
    images: ["/touring-bike-tire-700c-puncture-resistant.jpg"],
    description:
      "Llanta de turismo ultra resistente con capa anti-pinchazos reforzada. Ideal para viajes largos y uso diario con máxima durabilidad.",
    technicalSpecs: [
      "Tamaño: 700c x 32mm",
      "Peso: 420g",
      "TPI: 67",
      "Presión: 50-85 PSI",
      "Protección anti-pinchazos de 5mm",
      "Banda reflectante",
    ],
    colors: [{ name: "Black", value: "black", color: "#1a1a1a" }],
    sizes: [
      { label: "700c x 28mm", value: "28" },
      { label: "700c x 32mm", value: "32" },
      { label: "700c x 35mm", value: "35" },
    ],
  },
  {
    id: "chain-shimano-11sp",
    name: "Cadena Shimano 11 Velocidades",
    price: 34.99,
    type: "Accessories",
    category: "Cadenas",
    image: "/shimano-bike-chain-11-speed-silver.jpg",
    images: ["/shimano-bike-chain-11-speed-silver.jpg"],
    description:
      "Cadena de alta calidad Shimano para sistemas de 11 velocidades. Cambios suaves y precisos con tratamiento anti-corrosión.",
    technicalSpecs: [
      "Velocidades: 11 speed",
      "Eslabones: 116",
      "Compatibilidad: Shimano/SRAM",
      "Tratamiento: Anti-corrosión",
      "Incluye eslabón rápido",
    ],
    colors: [{ name: "Silver", value: "silver", color: "#9ca3af" }],
    sizes: [{ label: "116 eslabones", value: "116" }],
  },
  {
    id: "chain-sram-12sp",
    name: "Cadena SRAM Eagle 12 Velocidades",
    price: 49.99,
    type: "Accessories",
    category: "Cadenas",
    image: "/sram-eagle-chain-12-speed-gold.jpg",
    images: ["/sram-eagle-chain-12-speed-gold.jpg"],
    description:
      "Cadena premium SRAM Eagle para sistemas de 12 velocidades. Diseño robusto para mountain bike con tecnología PowerLock.",
    technicalSpecs: [
      "Velocidades: 12 speed Eagle",
      "Eslabones: 126",
      "Compatibilidad: SRAM Eagle",
      "Acabado: Hard Chrome",
      "PowerLock incluido",
    ],
    colors: [
      { name: "Silver", value: "silver", color: "#9ca3af" },
      { name: "Gold", value: "gold", color: "#fbbf24" },
    ],
    sizes: [{ label: "126 eslabones", value: "126" }],
  },
  {
    id: "chain-kmc-10sp",
    name: "Cadena KMC 10 Velocidades",
    price: 24.99,
    type: "Accessories",
    category: "Cadenas",
    image: "/kmc-bike-chain-10-speed.jpg",
    images: ["/kmc-bike-chain-10-speed.jpg"],
    description:
      "Cadena versátil KMC para sistemas de 10 velocidades. Excelente relación calidad-precio con durabilidad comprobada.",
    technicalSpecs: [
      "Velocidades: 10 speed",
      "Eslabones: 114",
      "Compatibilidad: Universal",
      "Tratamiento: Nickel plated",
      "Missing Link incluido",
    ],
    colors: [{ name: "Silver", value: "silver", color: "#9ca3af" }],
    sizes: [{ label: "114 eslabones", value: "114" }],
  },
  {
    id: "pedals-clipless-road",
    name: "Pedales Clipless Road Pro",
    price: 89.99,
    type: "Accessories",
    category: "Pedales",
    image: "/clipless-road-bike-pedals-black.jpg",
    images: ["/clipless-road-bike-pedals-black.jpg"],
    description:
      "Pedales clipless de carretera con plataforma amplia y ajuste de tensión. Rodamientos sellados para máxima eficiencia y durabilidad.",
    technicalSpecs: [
      "Tipo: Clipless (Look Keo compatible)",
      "Peso: 260g (par)",
      "Material: Aluminio CNC",
      "Rodamientos: Sellados",
      "Ajuste de tensión: 3 posiciones",
      "Incluye calas",
    ],
    colors: [{ name: "Black", value: "black", color: "#1a1a1a" }],
    sizes: [{ label: "Universal", value: "universal" }],
  },
  {
    id: "pedals-platform-mtb",
    name: "Pedales Platform MTB",
    price: 64.99,
    type: "Accessories",
    category: "Pedales",
    image: "/mountain-bike-platform-pedals-with-pins.jpg",
    images: ["/mountain-bike-platform-pedals-with-pins.jpg"],
    description:
      "Pedales de plataforma para mountain bike con pines reemplazables. Superficie amplia y agarre excepcional para descensos técnicos.",
    technicalSpecs: [
      "Tipo: Platform",
      "Peso: 380g (par)",
      "Material: Aluminio forjado",
      "Pines: 10 por lado (reemplazables)",
      "Rodamientos: Sellados industriales",
      "Plataforma: 100mm x 95mm",
    ],
    colors: [
      { name: "Black", value: "black", color: "#1a1a1a" },
      { name: "Red", value: "red", color: "#dc2626" },
      { name: "Blue", value: "blue", color: "#3b82f6" },
    ],
    sizes: [{ label: "Universal", value: "universal" }],
  },
  {
    id: "saddle-road-performance",
    name: "Sillín Road Performance",
    price: 79.99,
    type: "Accessories",
    category: "Sillines",
    image: "/road-bike-saddle-black-performance.jpg",
    images: ["/road-bike-saddle-black-performance.jpg"],
    description:
      "Sillín de carretera ergonómico con canal central para alivio de presión. Diseño ligero y aerodinámico para largas distancias.",
    technicalSpecs: [
      "Peso: 195g",
      "Rieles: Carbono reforzado",
      "Relleno: Espuma de alta densidad",
      "Cubierta: Microfibra",
      "Canal central: Alivio de presión",
      "Dimensiones: 275mm x 143mm",
    ],
    colors: [
      { name: "Black", value: "black", color: "#1a1a1a" },
      { name: "White", value: "white", color: "#f3f4f6" },
    ],
    sizes: [
      { label: "143mm", value: "143" },
      { label: "155mm", value: "155" },
    ],
  },
  {
    id: "saddle-mtb-comfort",
    name: "Sillín MTB Comfort",
    price: 69.99,
    type: "Accessories",
    category: "Sillines",
    image: "/mountain-bike-saddle-comfort-padding.jpg",
    images: ["/mountain-bike-saddle-comfort-padding.jpg"],
    description:
      "Sillín de mountain bike con acolchado extra y diseño robusto. Perfecto para trail riding y enduro con máxima comodidad.",
    technicalSpecs: [
      "Peso: 285g",
      "Rieles: Acero cromoly",
      "Relleno: Gel + espuma",
      "Cubierta: Sintética resistente",
      "Protección lateral reforzada",
      "Dimensiones: 280mm x 155mm",
    ],
    colors: [{ name: "Black", value: "black", color: "#1a1a1a" }],
    sizes: [{ label: "155mm", value: "155" }],
  },
  {
    id: "lights-front-1000lm",
    name: "Luz Delantera 1000 Lúmenes",
    price: 54.99,
    type: "Accessories",
    category: "Luces",
    image: "/bike-front-light-1000-lumens-usb-rechargeable.jpg",
    images: ["/bike-front-light-1000-lumens-usb-rechargeable.jpg"],
    description:
      "Luz delantera potente de 1000 lúmenes con batería recargable USB. Múltiples modos de iluminación para máxima visibilidad y seguridad.",
    technicalSpecs: [
      "Potencia: 1000 lúmenes",
      "Batería: 2600mAh recargable USB-C",
      "Autonomía: 2-10 horas según modo",
      "Modos: Alto, Medio, Bajo, Flash, SOS",
      "Resistencia: IPX6 (resistente al agua)",
      "Montaje: Universal para manillar",
    ],
    colors: [{ name: "Black", value: "black", color: "#1a1a1a" }],
    sizes: [{ label: "Universal", value: "universal" }],
  },
  {
    id: "lights-rear-usb",
    name: "Luz Trasera LED USB",
    price: 24.99,
    type: "Accessories",
    category: "Luces",
    image: "/bike-rear-light-led-usb-rechargeable-red.jpg",
    images: ["/bike-rear-light-led-usb-rechargeable-red.jpg"],
    description:
      "Luz trasera LED compacta y brillante con carga USB. Múltiples patrones de parpadeo para máxima visibilidad desde atrás.",
    technicalSpecs: [
      "LEDs: 5 LEDs ultra brillantes",
      "Batería: 500mAh recargable USB",
      "Autonomía: 3-8 horas según modo",
      "Modos: Constante, Flash rápido, Flash lento",
      "Resistencia: IPX5",
      "Montaje: Tija de sillín o mochila",
    ],
    colors: [{ name: "Red", value: "red", color: "#dc2626" }],
    sizes: [{ label: "Universal", value: "universal" }],
  },
  {
    id: "handlebar-road-carbon",
    name: "Manillar Road Carbono",
    price: 129.99,
    type: "Accessories",
    category: "Manillares",
    image: "/carbon-road-bike-handlebar-drop-bar.jpg",
    images: ["/carbon-road-bike-handlebar-drop-bar.jpg"],
    description:
      "Manillar de carretera en fibra de carbono ultraligero. Diseño ergonómico con drop compacto para máxima comodidad en largas distancias.",
    technicalSpecs: [
      "Material: Fibra de carbono UD",
      "Peso: 210g",
      "Ancho: 40cm, 42cm, 44cm",
      "Drop: 125mm",
      "Reach: 80mm",
      "Diámetro de abrazadera: 31.8mm",
    ],
    colors: [
      { name: "Matte Black", value: "black", color: "#1a1a1a" },
      { name: "Gloss Black", value: "gloss-black", color: "#000000" },
    ],
    sizes: [
      { label: "40cm", value: "40" },
      { label: "42cm", value: "42" },
      { label: "44cm", value: "44" },
    ],
  },
  {
    id: "handlebar-mtb-riser",
    name: "Manillar MTB Riser",
    price: 49.99,
    type: "Accessories",
    category: "Manillares",
    image: "/mountain-bike-riser-handlebar-aluminum.jpg",
    images: ["/mountain-bike-riser-handlebar-aluminum.jpg"],
    description:
      "Manillar riser de aluminio para mountain bike con geometría agresiva. Perfecto para trail y enduro con control superior.",
    technicalSpecs: [
      "Material: Aluminio 7075-T6",
      "Peso: 320g",
      "Ancho: 760mm",
      "Rise: 20mm",
      "Backsweep: 9°",
      "Diámetro de abrazadera: 31.8mm",
    ],
    colors: [
      { name: "Black", value: "black", color: "#1a1a1a" },
      { name: "Red", value: "red", color: "#dc2626" },
      { name: "Blue", value: "blue", color: "#3b82f6" },
    ],
    sizes: [
      { label: "760mm", value: "760" },
      { label: "780mm", value: "780" },
    ],
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}

export function getAllProducts(): Product[] {
  return products
}
