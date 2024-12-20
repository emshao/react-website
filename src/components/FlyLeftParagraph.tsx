import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const FlyInOutParagraph: React.FC = () => {
  const [animationState, setAnimationState] = useState<"hidden" | "visible">("hidden");
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimationState("visible"); // Enter animation when in view
        } else {
          setAnimationState("hidden"); // Exit animation when out of view
        }
      },
      { threshold: 0.2 } // Trigger when 20% of the element is visible
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const animations = {
    hidden: { opacity: 0, x: "-100%" }, // Fly out to the left
    visible: { opacity: 1, x: 0 }, // Fly in to the center
  };

  return (
    <div style={{ minHeight: "200vh", padding: "50px" }}>
      <motion.div
        ref={ref}
        initial="hidden"
        animate={animationState}
        variants={animations}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{
          padding: "20px",
          background: "#f0f0f0",
          borderRadius: "10px",
        }}
      >
        <p>
          This paragraph flies in when you scroll down to it and flies out when
          you scroll back up.
        </p>
      </motion.div>
    </div>
  );
};

export default FlyInOutParagraph;
