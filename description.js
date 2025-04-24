document.addEventListener("DOMContentLoaded", function() {
    const slider = document.querySelector('.slider');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const images = document.querySelectorAll('.slider img');
    const sliderContainer = document.querySelector('.slider-container');
    let counter = 1; 
    let imageWidth;
    let isTransitioning = false; 


    const firstClone = images[0].cloneNode(true);
    const lastClone = images[images.length - 1].cloneNode(true);

    slider.appendChild(firstClone);
    slider.insertBefore(lastClone, images[0]);

    function updateImageWidth() {
        imageWidth = sliderContainer.clientWidth;
        slider.style.width = `${imageWidth * (images.length + 2)}px`;  
        images.forEach(img => img.style.width = `${imageWidth}px`);
    }


    function slide() {
        if (isTransitioning) return;
        isTransitioning = true;
      
        slider.style.transition = 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)'; // Изменено
    slider.style.transform = `translateX(-${counter * imageWidth}px)`;
      
        slider.addEventListener('transitionend', () => {
          isTransitioning = false;
      
          if (counter === images.length + 1) {
            requestAnimationFrame(() => {
              // Небольшая задержка перед отключением transition
              setTimeout(() => {
                slider.style.transition = 'none';
                counter = 1;
                slider.style.transform = `translateX(-${counter * imageWidth}px)`;
      
                requestAnimationFrame(() => {
                  // Небольшая задержка перед включением transition обратно
                  setTimeout(() => {
                    slider.style.transition = 'transform 0.5s ease-in-out';
                  }, 30); // Минимальная задержка
                });
              }, 30); // Минимальная задержка
            });
          }
      
          if (counter === 0) {
            requestAnimationFrame(() => {
              setTimeout(() => {
                slider.style.transition = 'none';
                counter = images.length;
                slider.style.transform = `translateX(-${counter * imageWidth}px)`;
      
                requestAnimationFrame(() => {
                  setTimeout(() => {
                    slider.style.transition = 'transform 0.5s ease-in-out';
                  }, 10); // Минимальная задержка
                });
              }, 5); // Минимальная задержка
            });
          }
        }, { once: true });
      }


    nextButton.addEventListener('click', () => {
        if (isTransitioning) return;
        counter++;
        slide();
    });

    prevButton.addEventListener('click', () => {
        if (isTransitioning) return;
        counter--;
        slide();
    });

    let autoSlideInterval;

    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            counter++;
            slide();
        }, 3500);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }


    sliderContainer.addEventListener('mouseenter', stopAutoSlide);
    sliderContainer.addEventListener('mouseleave', startAutoSlide);

    startAutoSlide();

    window.addEventListener('resize', () => {
        updateImageWidth();
        slider.style.transition = 'none'; 
        slider.style.transform = `translateX(-${counter * imageWidth}px)`; 
        setTimeout(() => {
            slider.style.transition = 'transform 0.5s ease-in-out'; 
        }, 100);
    });

    updateImageWidth(); 
    slider.style.transform = `translateX(-${counter * imageWidth}px)`; 
});