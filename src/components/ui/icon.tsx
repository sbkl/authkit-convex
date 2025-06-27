"use client";

import * as RadixIcons from "@radix-ui/react-icons";
import { type IconProps } from "@radix-ui/react-icons/dist/types";

import { CreditCardIcon } from "./icons/credit-card-icon";
import { FolderIcon } from "./icons/folder-icon";
import { WhatsappIcon } from "./icons/whatsapp-icon";
import { PhoneIcon } from "./icons/phone-icon";
import { ShoppingCartIcon } from "./icons/shopping-cart";
import { SnowCapIcon } from "./icons/snowcap";
import { ExcelIcon } from "./icons/excel-icon";
import { GoogleLogoIcon } from "./icons/google-logo-icon";
// Extend IconName to include our custom icons
export type IconName =
  | keyof typeof RadixIcons
  | "FolderIcon"
  | "WhatsappIcon"
  | "CreditCardIcon"
  | "PhoneIcon"
  | "ShoppingCartIcon"
  | "SnowCapIcon"
  | "ExcelIcon"
  | "GoogleLogoIcon";

// Combine Radix icons with our custom icons
const iconMap: Record<IconName, React.ComponentType<IconProps>> = {
  ...RadixIcons,
  FolderIcon,
  WhatsappIcon,
  CreditCardIcon,
  PhoneIcon,
  ShoppingCartIcon,
  SnowCapIcon,
  ExcelIcon,
  GoogleLogoIcon,
} as Record<IconName, React.ComponentType<IconProps>>;

export function Icon({ name, ...props }: { name: IconName } & IconProps) {
  const IconComponent = iconMap[name];
  return IconComponent ? <IconComponent {...props} /> : null;
}
