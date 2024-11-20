import React, { useState, useEffect, useRef, Suspense, act } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { Canvas, events, useFrame } from "@react-three/fiber";
import { useLoader, useThree } from "@react-three/fiber";
import {
  GridHelper,
  Color,
  Raycaster,
  Vector2,
  AmbientLight,
  DirectionalLight,
  PointLight,
  SpotLight,
  AnimationMixer,
} from "three";
import { OrbitControls } from "@react-three/drei";

import LoadingScreen from "../layout/loadingScreen";
import StatsNavMenu from "../layout/statsNavMenu";
import Header from "../layout/header";

const Model = () => {
  const gltf = useLoader(GLTFLoader, "/assets/DRONE.gltf", (loader) => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
    loader.setDRACOLoader(dracoLoader);
  });

  const modelRef = useRef();
  const mixerRef = useRef();

  useEffect(() => {
    if (modelRef.current) {
      mixerRef.current = new AnimationMixer(modelRef.current);
      gltf.animations.forEach((clip) => {
        const action = mixerRef.current.clipAction(clip);
        action.play();
      });

      modelRef.current.traverse((child) => {
        if (child.isMesh) {
          child.userData.name = child.name;
        }
      });
    }
    return () => {
      mixerRef.current?.stopAllAction();
    };
  }, [gltf]);

  useFrame((state, delta) => mixerRef.current?.update(delta));

  return (
    <primitive object={gltf.scene} scale={1} position-y={2} ref={modelRef} />
  );
};

const ClickHandler = ({ setInfo }) => {
  const { camera, scene } = useThree();
  const raycaster = new Raycaster();
  const mouse = new Vector2();

  const onClick = (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects.length > 0) {
      const object = intersects[0].object;
      console.log(`Clicked on: ${object.userData.name}`);
      let set1 = (
        <>
          <tr>
            <th>Weight:</th>
            <td>Approximately 80 g (Propellers and Battery Included)</td>
          </tr>
          <tr>
            <th>Dimensions:</th>
            <td>98×92.5×41 mm</td>
          </tr>
          <tr>
            <th>Port:</th>
            <td>Micro USB Charging Port</td>
          </tr>
          <tr>
            <th>Detachable Battery:</th>
            <td>1.1Ah/3.8V</td>
          </tr>
          <tr>
            <th>Built-in Functions:</th>
            <td>
              Range Finder, Barometer, LED, Vision System, 2.4 GHz 802.11n
              Wi-Fi, 720p Live View
            </td>
          </tr>
        </>
      );

      let set2 = (
        <>
          <tr>
            <th>Propeller:</th>
            <td>3 inches</td>
          </tr>

          <tr>
            <th>Max Flight Distance:</th>
            <td>100m</td>
          </tr>
          <tr>
            <th>Max Speed:</th>
            <td>8m/s</td>
          </tr>
          <tr>
            <th>Max Flight Time:</th>
            <td>13min</td>
          </tr>
          <tr>
            <th>Max Flight Height:</th>
            <td>30m</td>
          </tr>
        </>
      );

      let set3 = (
        <>
          <tr>
            <th>Photo:</th>
            <td>5MP (2592x1936)</td>
          </tr>
          <tr>
            <th>FOV:</th>
            <td>82.6°</td>
          </tr>
          <tr>
            <th>Video:</th>
            <td>HD720P30</td>
          </tr>
          <tr>
            <th>Format:</th>
            <td>JPG (Photo); MP4 (Video)</td>
          </tr>
          <tr>
            <th>EIS:</th>
            <td>Yes</td>
          </tr>
        </>
      );

      if (object.userData.name === "Base" || object.userData.name === "White") {
        setInfo(set1);
      } else if (
        object.userData.name === "Wing" ||
        object.userData.name === "Wing001" ||
        object.userData.name === "Wing007" ||
        object.userData.name === "Wing006" ||
        object.userData.name === "Wing002" ||
        object.userData.name === "Wing003" ||
        object.userData.name === "Wing004" ||
        object.userData.name === "Wing005" ||
        object.userData.name === "propeller" ||
        object.userData.name === "propeller001" ||
        object.userData.name === "propeller002" ||
        object.userData.name === "propeller003" ||
        object.userData.name === "propeller004" ||
        object.userData.name === "propeller005" ||
        object.userData.name === "propeller006" ||
        object.userData.name === "propeller007"
      ) {
        setInfo(set2);
      } else if (
        object.userData.name === "Came" ||
        object.userData.name === "Cam002" ||
        object.userData.name === "Cam001" ||
        object.userData.name === "CamLight"
      ) {
        setInfo(set3);
      } else {
        setInfo(
          "Nothing Clicked yet.\n Options: \n -Drone Base \n -Camera \n -Wings"
        );
      }
    }
  };

  useEffect(() => {
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  return null;
};

const Specs = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [info, setInfo] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Header />
          <section id="mainSpecs">
            <StatsNavMenu />
            <section id="models">
              <div id="box">
                <div id="root">
                  <Canvas id="canvas">
                    <ambientLight intensity={1} />
                    <directionalLight
                      position={[0, 10, 0]}
                      intensity={2}
                      shadow-camera-far={10}
                      shadow-mapSize-width={2048}
                      shadow-mapSize-height={2048}
                      shadow-camera-left={-10}
                      shadow-camera-right={10}
                      shadow-camera-top={10}
                      shadow-camera-bottom={-10}
                    />
                    <pointLight position={[0, 5, 0]} intensity={0.5} />
                    <spotLight
                      position={[10, 10, 10]}
                      angle={9}
                      penumbra={1}
                      intensity={2}
                      castShadow
                      shadow-mapSize-width={1024}
                      shadow-camera-near={10}
                      shadow-camera-far={50}
                    />
                    <Suspense fallback={null}>
                      <Model />
                      <OrbitControls />
                      <gridHelper
                        args={[
                          100,
                          100,
                          new Color(0x888888),
                          new Color(0x888888),
                        ]}
                      />
                      <ClickHandler setInfo={setInfo} />
                    </Suspense>
                  </Canvas>
                  <div id="infoBox">
                    {info && (
                      <table>
                        <tbody>{info}</tbody>
                      </table>
                    )}
                  </div>
                </div>
                {children}
              </div>
            </section>
          </section>
        </>
      )}
    </div>
  );
};

export default Specs;
