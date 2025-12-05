export interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuel: string;
  gearbox: string;
  bodyType: string;
  engine: string;
  location: string;
  verified: boolean;
  image: string;
  features: string[];
  description: string;
}

export const mockCars: Car[] = [
  {
    id: 1,
    brand: "BMW",
    model: "5 Series",
    year: 2021,
    price: 42500,
    mileage: 28000,
    fuel: "Diesel",
    gearbox: "Automatic",
    bodyType: "Sedan",
    engine: "2.0L Turbocharged",
    location: "Los Angeles, CA",
    verified: true,
    image: "https://images.unsplash.com/photo-1764089859664-30aa6919ef0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzZWRhbiUyMGNhcnxlbnwxfHx8fDE3NjQzNzA2ODV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    features: ["Heated seats", "LED lights", "Parking sensors", "Navigation system", "Leather interior", "Sunroof"],
    description: "Well-maintained BMW 5 Series with full service history. One owner, garage kept."
  },
  {
    id: 2,
    brand: "Toyota",
    model: "RAV4",
    year: 2022,
    price: 35900,
    mileage: 15000,
    fuel: "Hybrid",
    gearbox: "Automatic",
    bodyType: "SUV",
    engine: "2.5L Hybrid",
    location: "Seattle, WA",
    verified: true,
    image: "https://images.unsplash.com/photo-1639280791656-5f8506ff21d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXYlMjBjYXJ8ZW58MXx8fHwxNzY0NDU0ODYyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    features: ["Apple CarPlay", "Adaptive cruise control", "Lane departure warning", "Blind spot monitoring", "AWD"],
    description: "Almost new Toyota RAV4 Hybrid with excellent fuel economy and advanced safety features."
  },
  {
    id: 3,
    brand: "Porsche",
    model: "911 Carrera",
    year: 2020,
    price: 89900,
    mileage: 12000,
    fuel: "Petrol",
    gearbox: "Automatic",
    bodyType: "Sports",
    engine: "3.0L Twin-Turbo",
    location: "Miami, FL",
    verified: true,
    image: "https://images.unsplash.com/photo-1541348263662-e068662d82af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBjYXJ8ZW58MXx8fHwxNzY0NDE1NDc5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    features: ["Sport exhaust", "Ceramic brakes", "Sport Chrono package", "BOSE sound system", "Alcantara interior"],
    description: "Iconic Porsche 911 in pristine condition. Low mileage, meticulously maintained."
  },
  {
    id: 4,
    brand: "Tesla",
    model: "Model 3",
    year: 2023,
    price: 38500,
    mileage: 8000,
    fuel: "Electric",
    gearbox: "Automatic",
    bodyType: "Sedan",
    engine: "Electric Motor",
    location: "San Francisco, CA",
    verified: true,
    image: "https://images.unsplash.com/photo-1593941707874-ef25b8b4a92b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpYyUyMGNhcnxlbnwxfHx8fDE3NjQzNzA2ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    features: ["Autopilot", "Premium sound system", "Glass roof", "Wireless charging", "Sentry mode"],
    description: "Latest Tesla Model 3 with enhanced autopilot. Perfect for eco-conscious drivers."
  },
  {
    id: 5,
    brand: "Honda",
    model: "Civic",
    year: 2022,
    price: 24900,
    mileage: 18000,
    fuel: "Petrol",
    gearbox: "Manual",
    bodyType: "Hatchback",
    engine: "1.5L Turbocharged",
    location: "Austin, TX",
    verified: false,
    image: "https://images.unsplash.com/photo-1701314860844-cd2152fa9071?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wYWN0JTIwY2l0eSUyMGNhcnxlbnwxfHx8fDE3NjQzNTI3MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    features: ["Android Auto", "Honda Sensing", "Keyless entry", "Rear camera", "Alloy wheels"],
    description: "Fuel-efficient Honda Civic with sporty design. Great for daily commuting."
  },
  {
    id: 6,
    brand: "Mercedes-Benz",
    model: "GLE 450",
    year: 2021,
    price: 58900,
    mileage: 22000,
    fuel: "Petrol",
    gearbox: "Automatic",
    bodyType: "SUV",
    engine: "3.0L Inline-6",
    location: "New York, NY",
    verified: true,
    image: "https://images.unsplash.com/photo-1639280791656-5f8506ff21d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXYlMjBjYXJ8ZW58MXx8fHwxNzY0NDU0ODYyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    features: ["Panoramic sunroof", "4MATIC AWD", "Burmester audio", "360 camera", "Air suspension", "Ambient lighting"],
    description: "Luxurious Mercedes GLE with premium features and exceptional comfort."
  },
  {
    id: 7,
    brand: "Audi",
    model: "A4",
    year: 2021,
    price: 36900,
    mileage: 25000,
    fuel: "Petrol",
    gearbox: "Automatic",
    bodyType: "Sedan",
    engine: "2.0L TFSI",
    location: "Chicago, IL",
    verified: true,
    image: "https://images.unsplash.com/photo-1764089859664-30aa6919ef0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzZWRhbiUyMGNhcnxlbnwxfHx8fDE3NjQzNzA2ODV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    features: ["Virtual cockpit", "Matrix LED headlights", "Quattro AWD", "Bang & Olufsen sound", "Wireless charging"],
    description: "Elegant Audi A4 with cutting-edge technology and refined styling."
  },
  {
    id: 8,
    brand: "Ford",
    model: "Mustang GT",
    year: 2020,
    price: 44900,
    mileage: 19000,
    fuel: "Petrol",
    gearbox: "Manual",
    bodyType: "Coupe",
    engine: "5.0L V8",
    location: "Dallas, TX",
    verified: false,
    image: "https://images.unsplash.com/photo-1541348263662-e068662d82af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBjYXJ8ZW58MXx8fHwxNzY0NDE1NDc5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    features: ["Performance pack", "Recaro seats", "Active exhaust", "Track apps", "Launch control"],
    description: "Powerful Ford Mustang GT with exhilarating performance and iconic styling."
  }
];

export const brands = ["All Brands", "BMW", "Toyota", "Porsche", "Tesla", "Honda", "Mercedes-Benz", "Audi", "Ford"];
export const bodyTypes = ["Sedan", "SUV", "Sports", "Hatchback", "Coupe"];
export const fuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid"];
export const gearboxTypes = ["Automatic", "Manual"];
