export default function (eleventyConfig) {

  eleventyConfig.addPairedShortcode('sommaire', function (content, arg = "<h2>Sommaire</h2>") {
    return `
<script>
let lastScrollYSummary = window.scrollY;

function toggleSummarySidebar() {
    document.getElementById('toc-sidebar').classList.toggle('open');
}

window.addEventListener('scroll', () => {
    const burger = document.getElementById('toc-burger-button');
    const sidebar = document.getElementById('toc-sidebar');
    const currentScroll = window.scrollY;
    // Hide the burger button if max width is reached
    if (window.innerWidth > 1536) {
        burger.style.display = 'none';
    } else if (currentScroll < 10 || currentScroll < lastScrollYSummary) {
        burger.style.display = 'block';
    } else if (!sidebar || !sidebar.classList.contains('open')) {
        burger.style.display = 'none';
    }

    lastScrollYSummary = currentScroll;
});
</script>

<button id="toc-burger-button" class="sidebar-burger-button right-2" onclick="toggleSummarySidebar()">☰</button>

<nav id="toc-sidebar" class="sidebar right-0 border-l-2 translate-x-full 2xl:translate-x-0">
${arg}
${content}
</nav>`;
  });
}
