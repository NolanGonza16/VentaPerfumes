export const storeConfig = {
  name: "Essence Luxe",
  country: "Costa Rica",
  whatsappNumber: "50686139525",
  brandLogoUrl: "https://qsslgyidtpxuvysfxycy.supabase.co/storage/v1/object/public/perfume-images/branding/essence-luxe-emblem.png",
} as const;

export const whatsappUrl = (message: string) =>
  `https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
