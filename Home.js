
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

// carousel
document.querySelectorAll('.carousel').forEach(carousel => {
    //variables
    const track = carousel.querySelector('.carouselTrack');
    const slides = Array.from(track.children);
    const nextBtn = carousel.querySelector('.carouselbtn--right');
    const prevBtn = carousel.querySelector('.carouselbtn--left');
    const dotsNav = carousel.querySelector('.carouselNav');
    const dots = Array.from(dotsNav.children);

    const slideWidth = slides[0].getBoundingClientRect().width;

//arrange slides next to each other
const setSlidePosition= (slide,index)=>{
    slide.style.left=(100 * index) + '%';
}

slides.forEach(setSlidePosition); //loops for each slide

//moving slides
const moveToSlide=(track,currentSlide,targetSlide)=>{

    track.style.transform='translateX(-'+targetSlide.style.left+')';
    currentSlide.classList.remove('currentSlide');
    targetSlide.classList.add('currentSlide');
}
const updateDots=(currentDot,targetDot)=>{
    currentDot.classList.remove('currentSlide');
    targetDot.classList.add('currentSlide');
}
const hideShowArrows=(targetIndex,slides,prevBtn,nextBtn)=>{
     if(targetIndex===0){
        prevBtn.classList.add('isHidden');
        nextBtn.classList.remove('isHidden');
    }
    else if(targetIndex===slides.length-1){
        prevBtn.classList.remove('isHidden');
        nextBtn.classList.add('isHidden');
    }
    else{
        prevBtn.classList.remove('isHidden');
        nextBtn.classList.remove('isHidden');
    }
}

//when click left move slides left
prevBtn.addEventListener('click',e=>{
    const currentSlide=track.querySelector('.currentSlide');
    const prevSlide=currentSlide.previousElementSibling;
    const currentDot=dotsNav.querySelector('.currentSlide');
    const prevDot=currentDot.previousElementSibling;
    const prevIndex= slides.findIndex(slide => slide ===prevSlide);

    moveToSlide(track,currentSlide,prevSlide);
    updateDots(currentDot,prevDot);
    hideShowArrows(prevIndex,slides,prevBtn,nextBtn);
    
    
});

//when click right move to next slide 
nextBtn.addEventListener('click',e=>{
    const currentSlide=track.querySelector('.currentSlide');
    const nextSlide=currentSlide.nextElementSibling;
    const currentDot=dotsNav.querySelector('.currentSlide');
    const nextDot=currentDot.nextElementSibling;
    const nextIndex=slides.findIndex(slide=>slide===nextSlide);

    moveToSlide(track,currentSlide,nextSlide);
    updateDots(currentDot,nextDot);
    hideShowArrows(nextIndex,slides,prevBtn,nextBtn);
});

//when I click nav indicators move to that slide
dotsNav.addEventListener('click',e=>{
    //what indicator was clicked on
    const targetDot=e.target.closest('button');

    if (!targetDot) return;

    const currentSlide=track.querySelector('.currentSlide');
    const currentDot=dotsNav.querySelector('.currentSlide');
    const targetIndex= dots.findIndex(dot => dot ===targetDot); //returns the index of the target dot
    const targetSlide=slides[targetIndex];

    moveToSlide(track,currentSlide,targetSlide);
    updateDots(currentDot,targetDot);
    hideShowArrows(targetIndex,slides,prevBtn,nextBtn);

});
});

//function to set the size of slides
function seMaxSlideSize(){
    const slides= document.querySelectorAll('.carouselTrack li');
    let maxHeight=0;
    let maxwidth=0;
    slides.forEach(slide=>{
        slide.style.height='auto';
        slide.style.width='auto';

        const height=slide.offsetHeight;
        const width= slide.offsetWidth;

        if(height>maxHeight)maxHeight=height;
        if(width>maxWidth)maxWidth=width;
    });
    slides.forEach(slides=>{
        slides.style.height=maxHeight+'px';
        slides.style.width=maxWidth+'px';
    });

    const track=document.querySelector('.carouselTrack');
    const conatiner=document.querySelector('.carouselContainer');
    conatiner.style.height=maxHeight+'px';
    conatiner.style.width=maxWidth+'px'
    track.style.height=maxHeight+'px';
}
//call on load
window.addEventListener('load',setMaxSlideSize);

window.addEventListener("load", () => {
  const slides = document.querySelectorAll(".carousel-slide"); // replace with your actual class
  let maxHeight = 0;

  slides.forEach(slide => {
    slide.style.height = "auto"; // let it expand
    const height = slide.offsetHeight;
    if (height > maxHeight) {
      maxHeight = height;
    }
  });

  // Apply max height to all slides
  slides.forEach(slide => {
    slide.style.height = `${maxHeight}px`;
  });

  // Apply to container too
  const container = document.querySelector(".carouselContainer");
  if (container) container.style.height = `${maxHeight}px`;
});
