import React, { useEffect, useCallback, useState } from "react";
import * as THREE from "three";
import './Earth.css';

let camera;
let scene;
let renderer;
let earth;
let cloud;
let pointLight;
let ambientLight;

let mouseDown = false;
let mouseX = 0;
let mouseY = 0;

const EarthScene = () => {
  const [height, setHeight] = useState("40vh"); // Default height for larger screens

  // Update height for mobile responsiveness
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setHeight("0vh"); // Set height to 10vh for mobile screens
      } else {
        setHeight("20vh"); // Set height to 40vh for larger screens
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call once to initialize

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const init = useCallback(() => {
    scene = new THREE.Scene();

    // Set up the camera
    const aspectRatio = window.innerWidth / window.innerHeight;
    camera = new THREE.PerspectiveCamera(45, aspectRatio, 1, 1000);
    camera.position.z = 160;

    // Dynamically adjust Earth and cloud size
    const isMobile = window.innerWidth <= 768;
    const earthRadius = isMobile ? 7 : 15.8; // Smaller size for mobile
    const cloudRadius = isMobile ? 8 : 17;

    // Earth texture (use a more detailed texture for better appearance)
    const earthTexture = new THREE.TextureLoader().load("https://i.postimg.cc/ry0pcyyZ/earth.jpg");
    const earthBump = new THREE.TextureLoader().load("https://i.postimg.cc/mgrJfkBt/bump.jpg");
    const earthSpecular = new THREE.TextureLoader().load("https://i.postimg.cc/R06YhY3m/spec.jpg");

    // Define geometry for the Earth sphere
    const earthGeometry = new THREE.SphereGeometry(earthRadius, 32, 32);
    const earthMaterial = new THREE.MeshPhongMaterial({
      shininess: 40,
      bumpScale: 1,
      map: earthTexture,
      bumpMap: earthBump,
      specularMap: earthSpecular,
    });
    earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);

    // Earth cloud texture
    const cloudTexture = new THREE.TextureLoader().load("https://i.postimg.cc/k4WhFtFh/cloud.png");
    const cloudGeometry = new THREE.SphereGeometry(cloudRadius, 32, 32);
    const cloudMaterial = new THREE.MeshBasicMaterial({
      map: cloudTexture,
      transparent: true,
      opacity: 0.8,
    });
    cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
    scene.add(cloud);

    // Adjust position based on screen size
    const positionX = isMobile ? 0 : -50;
    earth.position.x = positionX;
    cloud.position.x = positionX;

    // Add point light for better illumination of the Earth
    pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(-400, 100, 150);
    scene.add(pointLight);

    // Add ambient light for subtle lighting
    ambientLight = new THREE.AmbientLight(0x222222);
    scene.add(ambientLight);

    // Set up the WebGLRenderer
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setClearColor(0xffffff, 0); // Transparent background
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Add renderer to a specific div instead of the whole body
    document.getElementById('earth-container').appendChild(renderer.domElement);

    // Event handlers for mouse interactions
    const earthContainer = document.getElementById('earth-container');
    earthContainer.addEventListener("mousemove", onMouseMove, false);
    earthContainer.addEventListener("mousedown", onMouseDown, false);
    earthContainer.addEventListener("mouseup", onMouseUp, false);

    // Resize handling
    window.addEventListener("resize", onWindowResize, false);
  }, []);

  const animate = useCallback(() => {
    requestAnimationFrame(animate);
    earth.rotation.y += 0.002;
    cloud.rotation.y += 0.002;
    renderer.render(scene, camera);
  }, []);

  const onWindowResize = useCallback(() => {
    const aspectRatio = window.innerWidth / window.innerHeight;
    camera.aspect = aspectRatio;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }, []);

  const onMouseMove = useCallback((evt) => {
    if (!mouseDown) return;
    evt.preventDefault();
    evt.stopPropagation();  // Prevent propagation to other elements
    const deltaX = evt.clientX - mouseX;
    const deltaY = evt.clientY - mouseY;
    mouseX = evt.clientX;
    mouseY = evt.clientY;
    rotateScene(deltaX, deltaY);
  }, []);

  const onMouseDown = useCallback((evt) => {
    evt.preventDefault();
    evt.stopPropagation();  // Prevent propagation to other elements
    mouseDown = true;
    mouseX = evt.clientX;
    mouseY = evt.clientY;
  }, []);

  const onMouseUp = useCallback((evt) => {
    evt.preventDefault();
    evt.stopPropagation();  // Prevent propagation to other elements
    mouseDown = false;
  }, []);

  const rotateScene = useCallback((deltaX, deltaY) => {
    earth.rotation.y += deltaX / 300;
    earth.rotation.x += deltaY / 300;
    cloud.rotation.y += deltaX / 300;
    cloud.rotation.x += deltaY / 300;
  }, []);

  useEffect(() => {
    init();
    animate();

    return () => {
      scene.clear();
      document.getElementById('earth-container').removeChild(renderer.domElement);
      window.removeEventListener("resize", onWindowResize);
      const earthContainer = document.getElementById('earth-container');
      if (earthContainer) {
        earthContainer.removeEventListener("mousemove", onMouseMove);
        earthContainer.removeEventListener("mousedown", onMouseDown);
        earthContainer.removeEventListener("mouseup", onMouseUp);
      }
    };
  }, [init, animate, onWindowResize, onMouseMove, onMouseDown, onMouseUp]);

  return <div id="earth-container" style={{ position: "relative", height }} />; // Dynamically set height
};

export default EarthScene;
