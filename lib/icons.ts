import {
  Headphones,
  Watch,
  Footprints,
  Lamp,
  Glasses,
  Speaker,
  Camera,
  Wallet,
  ShoppingBag,
  Sparkles,
} from "lucide-react";

export const iconMap = {
  Headphones,
  Watch,
  Footprints,
  Lamp,
  Glasses,
  Speaker,
  Camera,
  Wallet,
  ShoppingBag,
  Sparkles,
} as const;

export type IconName = keyof typeof iconMap;
