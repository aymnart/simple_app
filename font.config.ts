import {
  Inter,
  Poppins,
  IBM_Plex_Sans,
  Merriweather,
  Space_Grotesk,
  Atkinson_Hyperlegible,
  Fira_Code,
} from "next/font/google";

export const inter = Inter({ subsets: ["latin"], weight: ["400"] });
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

export const fontMap: Record<string, string> = {
  Inter: inter.className,
  Poppins: poppins.className,
  IBMPlexSans: ibmPlexSans.className,
  Merriweather: merriweather.className,
  SpaceGrotesk: spaceGrotesk.className,
  AtkinsonHyperlegible: atkinsonHyperlegible.className,
  FiraCode: firaCode.className,
};

export const fontsList = Object.keys(fontMap);

export const defaultFont = inter;
