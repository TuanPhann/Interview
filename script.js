//This ensures that the JavaScript code won't run until the HTML structure is ready.
document.addEventListener("DOMContentLoaded", function () {
  //Selects all elements with class lazy-load
  const images = document.querySelectorAll(".lazy-load");

  // Define config intersectionObserver
  const config = {
    rootMargin: "50px 0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver(function (entries, self) {
    entries.forEach((entry) => {
      // If an element is intersecting, we call the preloadImage function and then unobserve the target element to stop further observation.
      if (entry.isIntersecting) {
        preloadImage(entry.target);
        self.unobserve(entry.target);
      }
    });
  }, config);

  images.forEach((image) => {
    observer.observe(image);
  });
});

//The onload event handler is used to set the opacity of the image to '1' once it has successfully loaded. This creates a smooth fade-in effect as specified in the CSS.
function preloadImage(img) {
  const src = img.getAttribute("data-src");
  if (!src) {
    return;
  }
  img.src = src;
  img.onload = () => (img.style.opacity = "1");
}
