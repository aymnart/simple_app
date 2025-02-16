import { Inter, Manrope, Poppins, Nunito, Pacifico } from "next/font/google";

export const inter = Inter({ subsets: ["latin"], weight: ["400"] });
export const pacifico = Pacifico({ subsets: ["latin"], weight: ["400"] });
export const nunito = Nunito({ subsets: ["latin"], weight: ["400"] });
export const manrope = Manrope({ subsets: ["latin"], weight: ["400"] });
export const poppins = Poppins({ subsets: ["latin"], weight: ["400"] });

export const fontsList = ["Inter", "Manrope", "Poppins", "Nunito", "Pacifico"];

export const fontMap: { [key in (typeof fontsList)[number]]: string } = {
  Inter: inter.className,
  Manrope: manrope.className,
  Poppins: poppins.className,
  Nunito: nunito.className,
  Pacifico: pacifico.className,
};

export const defaultFont = inter;
