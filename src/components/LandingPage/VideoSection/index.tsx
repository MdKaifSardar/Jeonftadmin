import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

const VideoSection = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const scale = useTransform(smoothProgress, [0, 1], [0.8, 1]); 
  const opacity = useTransform(smoothProgress, [0, 0.5, 1], [0, 1, 1]);

  return (
    <div
      ref={containerRef}
      className="py-[6rem] relative h-fit flex items-center justify-center"
    >
      <motion.div
        style={{
          scale,
          opacity,
        }}
        className="w-full flex justify-center"
      >
        <video
          src="https://treasurenft.xyz/userdata/film/cb4c7893-52b1-4a0e-8156-211b62ab21d8.mp4"
          poster="https://treasurenft.xyz/userdata/img/20250102082404_photo_2024-12-31_16-33-22.avif"
          loop
          controls
          playsInline
          preload="none"
          className="index-video w-[90vw] max-w-[90vw] md:w-[60vw] mx-auto rounded-lg shadow-lg"
        />
      </motion.div>
    </div>
  );
};

export default VideoSection;