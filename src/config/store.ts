export const storeConfig = {
  name: "Essence Luxe",
  country: "Costa Rica",
  whatsappNumber: "50600000000",
} as const;

export const whatsappUrl = (message: string) =>
  `https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
