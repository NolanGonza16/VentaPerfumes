export const storeConfig = {
  name: "Essence Luxe",
  country: "Costa Rica",
  whatsappNumber: "50686139525",
} as const;

export const whatsappUrl = (message: string) =>
  `https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
