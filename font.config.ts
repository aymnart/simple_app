import {
  Inter,
  Manrope,
  Poppins,
  Nunito,
  Pacifico,
  IBM_Plex_Sans,
  Merriweather,
  Space_Grotesk,
  Atkinson_Hyperlegible,
  Fira_Code,
  Playfair_Display,
} from "next/font/google";

export const inter = Inter({ subsets: ["latin"], weight: ["400"] });
export const pacifico = Pacifico({ subsets: ["latin"], weight: ["400"] });
export const nunito = Nunito({ subsets: ["latin"], weight: ["400"] });
export const manrope = Manrope({ subsets: ["latin"], weight: ["400"] });
export const poppins = Poppins({ subsets: ["latin"], weight: ["400"] });
export const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400"],
});
export const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400"],
});
export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400"],
});
export const atkinsonHyperlegible = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400"],
});
export const firaCode = Fira_Code({ subsets: ["latin"], weight: ["400"] });
export const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400"],
});

export const fontsList = [
  "Inter",
  "Manrope",
  "Poppins",
  "Nunito",
  "Pacifico",
  "IBMPlexSans",
  "Merriweather",
  "SpaceGrotesk",
  "AtkinsonHyperlegible",
  "FiraCode",
  "PlayfairDisplay",
];

export const fontMap: { [key in (typeof fontsList)[number]]: string } = {
  Inter: inter.className,
  Manrope: manrope.className,
  Poppins: poppins.className,
  Nunito: nunito.className,
  Pacifico: pacifico.className,
  IBMPlexSans: ibmPlexSans.className,
  Merriweather: merriweather.className,
  SpaceGrotesk: spaceGrotesk.className,
  AtkinsonHyperlegible: atkinsonHyperlegible.className,
  FiraCode: firaCode.className,
  PlayfairDisplay: playfairDisplay.className,
};

export const defaultFont = inter;
