import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "./common/icons.jsx";
import { contentService } from "../dataStore.jsx";
import "./CyberfictionSection.css";

export default function CyberfictionSection() {
  const canvasRef = useRef(null);
  const cardRef = useRef(null);
  const [currentFrame, setCurrentFrame] = useState(1);
  const cyberWorks = contentService.getCyberfictionMedia().slice(0, 3);

  // Mini canvas frame scrubber for the preview card
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let isMounted = true;
    const img = new Image();

    const renderFrame = (idx) => {
      const padded = String(Math.max(1, Math.min(300, idx))).padStart(4, "0");
      img.src = `${import.meta.env.BASE_URL}cyberfiction/male${padded}.png`;
      img.onload = () => {
        if (!isMounted) return;
        canvas.width = canvas.offsetWidth * window.devicePixelRatio || 500;
        canvas.height = canvas.offsetHeight * window.devicePixelRatio || 400;

        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.min(hRatio, vRatio);

        const centerShiftX = (canvas.width - img.width * ratio) / 2;
        const centerShiftY = (canvas.height - img.height * ratio) / 2;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(
          img,
          0,
          0,
          img.width,
          img.height,
          centerShiftX,
          centerShiftY,
          img.width * ratio,
          img.height * ratio
        );
      };
    };

    renderFrame(currentFrame);

    return () => {
      isMounted = false;
    };
  }, [currentFrame]);

  // Scrub frames on mouse move over the preview card
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, x / rect.width));
    const targetFrame = Math.max(1, Math.min(300, Math.round(pct * 299) + 1));
    setCurrentFrame(targetFrame);
  };

  return (
    <section className="cyber-section-root" aria-label="Cyberfiction Genre Section">
      {/* Header */}
      <div className="cyber-section-header">
        <div>
          <div className="cyber-section-badge-wrap">
            <span className="cyber-pulse-dot"></span>
            <span>New Genre Spotlight // Metaverse Protocol</span>
          </div>
          <h2 className="cyber-section-title">
            <b>Cyberfiction</b>: Beyond Novels & Manga
          </h2>
          <p className="cyber-section-subtitle">
            A separate entertainment medium created in virtual worlds. Unlike serialized prose novels or static manhwa panels, Cyberfiction fuses 3D canvas consciousness, collaborative metaverse stories, and decentralized play.
          </p>
        </div>

        <Link to="/cyberfiction" className="cyber-cta-btn">
          <span>Launch 300-Frame 3D Scroll</span>
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* Marquee Ticker Track */}
      <div className="cyber-ticker-bar">
        <div className="cyber-ticker-track">
          <div className="cyber-ticker-item">
            <span>//</span> CYBERFICTION IS THE REAL STORY IN THE METAVERSE
          </div>
          <div className="cyber-ticker-item">
            <span>★</span> HAVE FUN · LET'S PLAY · JUST BE TOGETHER
          </div>
          <div className="cyber-ticker-item">
            <span>//</span> MAKE A STORY · TAKE A CHANCE · BUILD AND OWNED
          </div>
          <div className="cyber-ticker-item">
            <span>★</span> MAINTAIN GOOD HUMANITY IN THE MACHINE AGE
          </div>
          <div className="cyber-ticker-item">
            <span>//</span> CYBERFIELD IS OUR VIRTUAL PLAYGROUND
          </div>
          <div className="cyber-ticker-item">
            <span>//</span> CYBERFICTION IS THE REAL STORY IN THE METAVERSE
          </div>
          <div className="cyber-ticker-item">
            <span>★</span> HAVE FUN · LET'S PLAY · JUST BE TOGETHER
          </div>
          <div className="cyber-ticker-item">
            <span>//</span> MAKE A STORY · TAKE A CHANCE · BUILD AND OWNED
          </div>
        </div>
      </div>

      {/* Showcase Grid: Interactive Canvas Preview + Works List */}
      <div className="cyber-showcase-split">
        {/* Interactive Scrubbable Preview */}
        <div
          ref={cardRef}
          className="cyber-canvas-card"
          onMouseMove={handleMouseMove}
          title="Move your cursor horizontally to scrub 300 animation frames"
        >
          <canvas ref={canvasRef} className="cyber-canvas-el" />
          <div className="cyber-canvas-overlay">
            <div className="cyber-canvas-hud">
              FRAME {String(currentFrame).padStart(3, "0")} / 300 · REAL-TIME SCRUB
            </div>
            <div className="cyber-canvas-tip">
              <Sparkles size={14} style={{ color: "#00f0ff" }} />
              <span>Hover & drag across to rotate avatar · Click to enter</span>
            </div>
          </div>
        </div>

        {/* Curated Cyberfiction Works */}
        <div className="cyber-works-list">
          {cyberWorks.map((work) => (
            <Link
              key={work.id}
              to={`/media/${work.slug}`}
              className="cyber-work-item"
            >
              <img
                src={work.coverImage}
                alt={work.title}
                className="cyber-work-thumb"
                loading="lazy"
              />
              <div className="cyber-work-info">
                <span className="cyber-genre-tag">Cyberfiction</span>
                <h4>{work.title}</h4>
                <p>{work.synopsis}</p>
              </div>
              <ArrowRight size={18} style={{ color: "#00f0ff", flexShrink: 0 }} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
