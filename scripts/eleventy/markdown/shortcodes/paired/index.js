/**
 * Eleventy configuration for markdown paired shortcodes (build time)
 */

import setupInfo from "./info.js";
import setupAttention from "./attention.js";
import setupNote from "./note.js";
import setupFaire from "./faire.js";
import setupDetails from "./details.js";
import setupExercice from "./exercice.js";
import setupChemin from "./chemin.js";
import setupPrerequis from "./prerequis.js";
import setupLien from "./lien.js";
import setupSommaire from "./sommaire.js";

export default function (eleventyConfig) {
    setupInfo(eleventyConfig);
    setupAttention(eleventyConfig);
    setupNote(eleventyConfig);
    setupFaire(eleventyConfig);
    setupDetails(eleventyConfig);
    setupExercice(eleventyConfig);
    setupChemin(eleventyConfig);
    setupPrerequis(eleventyConfig);
    setupLien(eleventyConfig);
    setupSommaire(eleventyConfig);
}
