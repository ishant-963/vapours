import React, { useState } from "react";
import { Box, Image as ImageIcon } from "../common/icons.jsx";
import "./CharacterHeroShowcase.css";

export default function CharacterHeroShowcase({ character }) {
  const localModel = character?.localModel || null;
  const pictureSlides = character?.slides || [];

  // Default to 3D if local model exists, otherwise gallery
  const [activeMode, setActiveMode] = useState(localModel ? "3d" : "gallery");
  const [autoRotate, setAutoRotate] = useState(true);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  if (!character) return null;
  if (!localModel && pictureSlides.length === 0) return null;

  const currentSlide = pictureSlides[activeSlideIndex] || pictureSlides[0];

  const handleNext = () => {
    if (pictureSlides.length > 0) {
      setActiveSlideIndex((prev) => (prev + 1) % pictureSlides.length);
    }
  };

  const handlePrev = () => {
    if (pictureSlides.length > 0) {
      setActiveSlideIndex((prev) => (prev - 1 + pictureSlides.length) % pictureSlides.length);
    }
  };

  return (
    <div className="showcase-clean-root">
      {/* Universal Floating Toggle Bar */}
      <div className="showcase-universal-toggle-bar">
        <div className="showcase-mode-pill">
          {localModel && (
            <button
              type="button"
              className={`showcase-mode-btn ${activeMode === "3d" ? "active" : ""}`}
              onClick={() => setActiveMode("3d")}
              aria-label="Switch to 3D Interactive Model"
            >
              <Box size={14} />
              <span>3D Model</span>
            </button>
          )}

          {pictureSlides.length > 0 && (
            <button
              type="button"
              className={`showcase-mode-btn ${activeMode === "gallery" ? "active" : ""}`}
              onClick={() => setActiveMode("gallery")}
              aria-label="Switch to Picture Lore Slides"
            >
              <ImageIcon size={14} />
              <span>Lore Gallery ({pictureSlides.length})</span>
            </button>
          )}
        </div>

        {/* 3D Secondary Controls (Auto-Spin toggle) */}
        {activeMode === "3d" && localModel && (
          <button
            type="button"
            className="showcase-spin-toggle-btn"
            onClick={() => setAutoRotate((prev) => !prev)}
            title="Toggle Auto-Rotation"
          >
            <span className={`spin-indicator-dot ${autoRotate ? "active" : ""}`} />
            <span>Auto-Spin: {autoRotate ? "ON" : "OFF"}</span>
          </button>
        )}
      </div>

      {/* Main Content Area: Zero borders, fully borderless */}
      <div className="showcase-viewport">
        {activeMode === "3d" && localModel ? (
          <div className="showcase-standalone-3d">
            {/* eslint-disable-next-line react/no-unknown-property */}
            <model-viewer
              src={localModel}
              alt={`${character.name} 3D model`}
              auto-rotate={autoRotate ? "" : undefined}
              rotation-per-second="25deg"
              camera-controls
              disable-zoom
              touch-action="pan-y"
              shadow-intensity="1.5"
              exposure="1.05"
              bounds="tight"
              loading="eager"
              style={{
                width: "100%",
                height: "650px",
                display: "block",
                background: "radial-gradient(circle at center, rgba(30, 32, 40, 0.6) 0%, transparent 75%)",
                outline: "none",
                border: "none",
              }}
            />
            <div className="showcase-standalone-hint">
              <Box size={14} className="text-amber-400" />
              <span className="font-semibold">{character.name}</span>
              <span className="text-stone-400 text-xs">· Interactive 3D Model · Drag to rotate · Smooth Page Scrolling</span>
            </div>
          </div>
        ) : (
          <div className="showcase-picture-container">
            {currentSlide && (
              <>
                <img
                  src={currentSlide.image}
                  alt={currentSlide.title}
                  className="showcase-picture-img"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="showcase-picture-overlay">
                  {currentSlide.tag && (
                    <div className="showcase-picture-tag">{currentSlide.tag}</div>
                  )}
                  <h3 className="showcase-picture-title">{currentSlide.title}</h3>
                  <p className="showcase-picture-caption">{currentSlide.caption}</p>
                </div>
              </>
            )}

            {/* Gallery Slide Navigation */}
            {pictureSlides.length > 1 && (
              <>
                <button
                  type="button"
                  className="showcase-arrow left"
                  onClick={handlePrev}
                  aria-label="Previous slide"
                >
                  &#10094;
                </button>
                <button
                  type="button"
                  className="showcase-arrow right"
                  onClick={handleNext}
                  aria-label="Next slide"
                >
                  &#10095;
                </button>
                <div className="showcase-dots">
                  {pictureSlides.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`showcase-dot ${activeSlideIndex === idx ? "active" : ""}`}
                      onClick={() => setActiveSlideIndex(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
