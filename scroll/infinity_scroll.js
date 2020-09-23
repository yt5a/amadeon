document.querySelectorAll(".slide").forEach(e => {
  let endOfSliderPosition = null;

  e.addEventListener("scroll", function() {
    const slider = this;

    if (slider.scrollLeft !== (slider.scrollWidth - slider.clientWidth)) return;

    if (endOfSliderPosition === null) {
      endOfSliderPosition = slider.scrollLeft;
      slider.append(...slider.cloneNode(true).childNodes);
      /*apped*/
      slide_set()
    }
    slider.scrollLeft = endOfSliderPosition;
  });
});
