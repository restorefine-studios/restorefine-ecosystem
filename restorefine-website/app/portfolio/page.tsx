"use client";

import WorkGrid from "@/blocks/work/WorkGrid";
import { Footer } from "@/components/footer";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Portfolio() {
  const [showIntro, setShowIntro] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Hide intro and show content after animation completes
    const timer = setTimeout(() => {
      setShowIntro(false);
      setShowContent(true);
    }, 2000); // Total animation time

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Main content with fade in */}
      <WorkGrid />
      <Footer />
    </>
  );
}

export default Portfolio;
