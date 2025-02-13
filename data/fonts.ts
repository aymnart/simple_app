import { Inter, Manrope, Poppins, Nunito } from "next/font/google";

export const inter = Inter({ subsets: ["latin"], weight: ["400"] });
export const nunito = Nunito({ subsets: ["latin"], weight: ["400"] });
export const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400"],
});
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

export const fontMap: { [key: string]: string } = {
  inter: inter.className,
  manrope: manrope.className,
  poppins: poppins.className,
  nunito: nunito.className,
  // Add more fonts here
};

//the default font will always be the first
export const fontsList = ["Inter", "Manrope", "Poppins", "Nunito"];
export const defaultFont = inter;
