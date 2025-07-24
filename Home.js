
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

//for carousel
//variables
const track=document.querySelector('.carouselTrack');
const slides=Array.from(track.children);
const nextBtn=document.querySelector('.carouselbtn--right');
const prevBtn=document.querySelector('.carouselbtn--left');
const dotsNav=document.querySelector('.carouselNav');
const dots=Array.from(dotsNav.children);

const slideWidth=slides[0].getBoundingClientRect().width;

//arrange slides next to each other
const setSlidePosition= (slide,index)=>{
    slide.style.left=(slideWidth * index) + 'px';
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
    hideShowArrows(targetIndex,slides,prevBtn,nextBtn);
    
    
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
