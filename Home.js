
// smooth scroll to footer instead of jumping down
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default jump behavior
        const targetId = this.getAttribute('href').substring(1); // Get the id (e.g., "footer")
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth', // Smooth scrolling
                block: 'start' // Align the top of the element with the top of the viewport
            });
        }
    });
});

