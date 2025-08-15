// utils/deliveryFees.ts
export const DELIVERY_ZONES = {
  'danbury': 5,
  'brookfield': 10,
  'new milford': 15,
  'newtown': 12,
  'bethel': 8,
  'ridgefield': 12,
  'new fairfield': 18,
  'sherman': 20,
  'roxbury': 20,
  'bridgewater': 20,
} as const;

export const calculateDeliveryFee = (city: string, zipCode: string): number => {
  const normalizedCity = city.toLowerCase().trim();
  
  if (normalizedCity in DELIVERY_ZONES) {
    return DELIVERY_ZONES[normalizedCity as keyof typeof DELIVERY_ZONES];
  }
  
  return 20;
};