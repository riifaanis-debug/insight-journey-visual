import { loadFont as loadArabic } from "@remotion/google-fonts/IBMPlexSansArabic";
import { loadFont as loadLatin } from "@remotion/google-fonts/Inter";

const ar = loadArabic("normal", {
  weights: ["400", "500", "600", "700"],
  subsets: ["arabic", "latin"],
});
const latin = loadLatin("normal", {
  weights: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const FAR = ar.fontFamily;
export const FEN = latin.fontFamily;
export const FSTACK = `${ar.fontFamily}, ${latin.fontFamily}, sans-serif`;
