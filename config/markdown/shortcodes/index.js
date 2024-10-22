import {template} from "./quotes/utils.js";
import quotes from "./quotes/index.js";
import resume from "./resume.js";

export default function setupShortcodes(eleventyConfig) {
    quotes(eleventyConfig);
    // resume(eleventyConfig);
}

