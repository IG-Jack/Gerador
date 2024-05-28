import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Component({
  selector: 'app-model-viewer',
  templateUrl: './model-viewer.component.html',
  styleUrls: ['./model-viewer.component.scss'],
})
export class ModelViewerComponent implements AfterViewInit {
  @ViewChild('rendererContainer') rendererContainer!: ElementRef;
  renderer!: THREE.WebGLRenderer;
  camera!: THREE.PerspectiveCamera;
  controls!: OrbitControls;

  constructor() {}

  ngAfterViewInit() {
    const container = this.rendererContainer.nativeElement;
    const scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(this.renderer.domElement);

    // Set background color to black
    scene.background = new THREE.Color(0x000000); // Negro

    // Adding ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Luz ambiental
    scene.add(ambientLight);

    // Adding directional lights
    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1); // Luz direccional 1
    directionalLight1.position.set(0, 10, 10);
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1); // Luz direccional 2
    directionalLight2.position.set(10, 10, 0);
    scene.add(directionalLight2);

    const directionalLight3 = new THREE.DirectionalLight(0xffffff, 1); // Luz direccional 3
    directionalLight3.position.set(-10, 10, 0);
    scene.add(directionalLight3);

    const directionalLight4 = new THREE.DirectionalLight(0xffffff, 1); // Luz direccional 4
    directionalLight4.position.set(0, -10, -10);
    scene.add(directionalLight4);

    // Adding point lights
    const pointLight1 = new THREE.PointLight(0xffffff, 1, 100); // Luz puntual 1
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 1, 100); // Luz puntual 2
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xffffff, 1, 100); // Luz puntual 3
    pointLight3.position.set(-5, 5, -5);
    scene.add(pointLight3);

    const pointLight4 = new THREE.PointLight(0xffffff, 1, 100); // Luz puntual 4
    pointLight4.position.set(5, -5, -5);
    scene.add(pointLight4);

    const pointLight5 = new THREE.PointLight(0xffffff, 1, 100); // Luz puntual 5
    pointLight5.position.set(5, 5, -5);
    scene.add(pointLight5);

    const pointLight6 = new THREE.PointLight(0xffffff, 1, 100); // Luz puntual 6
    pointLight6.position.set(-5, -5, -5);
    scene.add(pointLight6);

    const pointLight7 = new THREE.PointLight(0xffffff, 1, 100); // Luz puntual 7
    pointLight7.position.set(-5, 5, 5);
    scene.add(pointLight7);

    const pointLight8 = new THREE.PointLight(0xffffff, 1, 100); // Luz puntual 8
    pointLight8.position.set(5, -5, 5);
    scene.add(pointLight8);

    // Adding hemisphere light
    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
    hemisphereLight.position.set(0, 10, 0);
    scene.add(hemisphereLight);

    // Adding orbit controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    const loader = new GLTFLoader();
    loader.load('assets/gojo.glb', (gltf) => {
      scene.add(gltf.scene);
      gltf.scene.position.set(0, 0, 0);
    }, undefined, (error) => {
      console.error('An error happened while loading the model:', error);
    });

    this.camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      this.controls.update();
      this.renderer.render(scene, this.camera);
    };

    animate();

    container.addEventListener('click', () => this.enterFullscreen(container));
  }

  enterFullscreen(container: HTMLElement) {
    if (container.requestFullscreen) {
      container.requestFullscreen();
    } else if ((container as any).webkitRequestFullscreen) {  
      (container as any).webkitRequestFullscreen();
    } else if ((container as any).msRequestFullscreen) {  
      (container as any).msRequestFullscreen();
    }

    const resizeRenderer = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      this.renderer.setSize(width, height);
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', resizeRenderer);
    resizeRenderer();
  }
}
