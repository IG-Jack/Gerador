import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import Swiper from 'swiper';
import { gsap } from 'gsap';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {

  @ViewChild('timelineContainer', { static: true }) timelineContainer: ElementRef | null = null;
  @ViewChild('swiper') swiperRef: ElementRef | undefined;
  swiper?: Swiper;

  private imageSources = [
    'assets/descarga.png',
    'assets/descarga (1).png',
    'assets/descarga (2).png',
  ]; // Lista de fuentes de imagen

  currentImageIndex = 0;
  currentImage = this.imageSources[this.currentImageIndex]; // Comenzar con la primera imagen

  constructor(private router: Router) {}

  segmentChanged(event: CustomEvent) {
    const selectedPage = event.detail.value;  // Obtener el valor de la página seleccionada
    this.router.navigate([selectedPage]);  // Usar el enrutador para navegar a la página seleccionada
  }

  swiperReady() {
    this.swiper = this.swiperRef?.nativeElement.swiper;
  }

  goNext() {
    this.swiper?.slideNext();
  }

  goPrev() {
    this.swiper?.slidePrev();
  }

  swiperSlideChanged(e: any) {
    console.log("changed", e);
  }

  ngAfterViewInit() {
    this.startGSAPAnimations();
    this.startImageLoop();
    this.initializeSwiper();
  }

  private startGSAPAnimations() {
    if (this.timelineContainer) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.fromTo('.timeline-event-horizontal',
              { opacity: 0, x: -100, scale: 0.8 }, // Estado inicial
              {
                opacity: 1, x: 0, scale: 1, duration: 1, stagger: 0.3, ease: 'power3.out',
                onComplete: () => {
                  gsap.to('.timeline-event-horizontal', {
                    opacity: 0, x: -100, scale: 0.8, duration: 1, stagger: 0.3, ease: 'power3.in',
                  });
                }
              });

            observer.disconnect(); // Para evitar reanimaciones innecesarias
          }
        });
      });

      observer.observe(this.timelineContainer.nativeElement);
    }

    // Animaciones adicionales para el texto y los slides
    gsap.fromTo('.header-text p',
      { opacity: 0, y: -50 }, // Estado inicial
      {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        onComplete: () => {
          gsap.to('.header-text p', {
            opacity: 0, y: -50, duration: 1, ease: 'power3.in',
          });
        }
      });

    gsap.fromTo('.swiper-slide',
      { opacity: 0, y: 50 }, // Estado inicial
      {
        opacity: 1, y: 0, duration: 1, stagger: 0.3, ease: 'power3.out',
        onComplete: () => {
          gsap.to('.swiper-slide', {
            opacity: 0, y: 50, duration: 1, stagger: 0.3, ease: 'power3.in',
          });
        }
      });
  }

  private startImageLoop() {
    const updateImage = () => {
      const oldImageIndex = this.currentImageIndex;
      this.currentImageIndex = (this.currentImageIndex + 1) % this.imageSources.length;
      const newImage = this.imageSources[this.currentImageIndex];

      const oldImageElement = document.querySelector('.transition-img') as HTMLElement;

      gsap.to(oldImageElement, {
        opacity: 0,
        scale: 0.8,
        duration: 1,
        ease: 'power3.in',
        onComplete: () => {
          this.currentImage = newImage;
          gsap.fromTo(
            oldImageElement,
            { opacity: 0, scale: 1.2 },
            {
              opacity: 1,
              scale: 1,
              duration: 1,
              ease: 'power3.out'
            }
          );
        }
      });
    };

    setInterval(updateImage, 3000); // Cambiar la imagen cada 3 segundos
  }

  private initializeSwiper() {
    new Swiper('.swiper-container', {
      direction: 'horizontal',
      loop: true,
      autoplay: {
        delay: 5000,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }
}
