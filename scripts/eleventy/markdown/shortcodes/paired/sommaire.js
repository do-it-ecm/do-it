export default function (eleventyConfig) {

  eleventyConfig.addPairedShortcode('sommaire', function (content, arg = "<h2>Sommaire</h2>") {
    return `
<style>
/* Only show burger on small screens */
@media (max-width: 1500px) {
  #toc-burger-button {
    display: block;
  }
  #toc-sidebar {
    max-width: 100vw !important; /* Ensure it fits the viewport width */
    transform: translateX(100%); /* Initially hide the sidebar off-screen */
    transition: transform 0.3s ease-in-out; /* Add smooth animation */
  }

  #toc-sidebar.open {
    transform: translateX(0); /* Slide in the sidebar when open */
  }
}

/* Hide burger and ensure sidebar is static on larger screens */
@media (min-width: 1501px) {
  #toc-burger-button {
    display: none;
  }

  #toc-sidebar {
    transform: none; /* Static position for larger screens */
    max-width: none; /* Remove any width restriction */
  }
}
</style>

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
    if (window.innerWidth > 1500) {
        burger.style.display = 'none';
    } else if (currentScroll < 10 || currentScroll < lastScrollYSummary) {
        burger.style.display = 'block';
    } else if (!sidebar || !sidebar.classList.contains('open')) {
        burger.style.display = 'none';
    }

    lastScrollYSummary = currentScroll;
});
</script>

<button id="toc-burger-button" class="fixed z-11 top-[50px] right-2 z-50 p-2 bg-gray-200 rounded-md block lg:hidden hidden" onclick="toggleSummarySidebar()">☰</button>

<aside id="toc-sidebar" class="fixed top-[50px] z-10 right-0 w-full lg:w-1/4 h-[calc(100vh-35px)] bg-white p-4 overflow-y-auto border-l-2 border-gray-200 transform -translate-x-full transition-transform duration-300 lg:transform-none lg:transition-none"
    style="max-width: calc((100vw - 1000px) / 2 - 35px);">
${arg}
${content}
</aside>`;
  });
}
