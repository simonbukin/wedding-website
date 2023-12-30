"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type Container, type ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

export const Confetti = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  const nicePurples = ["#9251DB", "#A946CD", "#652EA0", "#5729B3", "#A675DD"];
  const niceBlues = ["#22577A", "#35B2FF", "#4C83EB", "#3A8CFF", "#67F2FF"];

  const options: ISourceOptions = {
    particles: {
      number: {
        value: 200,
      },
      color: {
        value: nicePurples.concat(niceBlues),
      },
      shape: {
        type: ["square", "rectangle"],
      },
      opacity: {
        value: {
          min: 0.25,
          max: 1,
        },
        animation: {
          enable: true,
          speed: 2,
          startValue: "max",
          destroy: "min",
        },
      },
      size: {
        value: {
          min: 2,
          max: 10,
        },
      },
      life: {
        duration: {
          sync: true,
          value: 10,
        },
        count: 1,
      },
      move: {
        enable: true,
        gravity: {
          enable: true,
        },
        drift: {
          min: -5,
          max: 5,
        },
        speed: {
          min: 20,
          max: 40,
        },
        decay: 0.05,
        direction: "none",
        random: true,
        straight: false,
        outModes: {
          default: "destroy",
          top: "none",
        },
      },
      rotate: {
        value: {
          min: 0,
          max: 360,
        },
        direction: "random",
        move: true,
        animation: {
          enable: true,
          speed: 60,
        },
      },
      tilt: {
        direction: "random",
        enable: true,
        move: true,
        value: {
          min: 0,
          max: 360,
        },
        animation: {
          enable: true,
          speed: 60,
        },
      },
    },
    retina_detect: true,
  };

  if (init) {
    console.log("init");
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
      />
    );
  }

  return <></>;
};

export default Confetti;
