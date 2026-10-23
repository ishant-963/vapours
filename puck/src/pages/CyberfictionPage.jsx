import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import { contentService } from "../dataStore.jsx";
import { MediaCard } from "../components/Cards.jsx";
import "./CyberfictionPage.css";

// Register GSAP plugin once
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CyberfictionPage() {
  const mainRef = useRef(null);
  const canvasRef = useRef(null);
  const [imagesLoadedCount, setImagesLoadedCount] = useState(0);

  const cyberMedia = contentService.getCyberfictionMedia();

  useEffect(() => {
    const main = mainRef.current;
    const canvas = canvasRef.current;
    if (!main || !canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    // ==========================================
    // 1. LOCOMOTIVE SCROLL INITIALIZATION
    // ==========================================
    let locoScroll = null;
    try {
      locoScroll = new LocomotiveScroll({
        el: main,
        smooth: true,
      });

      locoScroll.on("scroll", ScrollTrigger.update);

      ScrollTrigger.scrollerProxy(main, {
        scrollTop(value) {
          if (arguments.length && locoScroll) {
            locoScroll.scrollTo(value, {
              duration: 0,
              disableLerp: true,
            });
          }
          return locoScroll ? locoScroll.scroll.instance.scroll.y : 0;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
        pinType: main.style.transform ? "transform" : "fixed",
      });
    } catch (err) {
      console.warn("LocomotiveScroll initialization fallback:", err);
    }

    // ==========================================
    // 2. CANVAS SETUP
    // ==========================================
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const frameCount = 300;
    const images = [];
    const imageSeq = { frame: 0 };

    const getFileUrl = (index) => {
      return `${import.meta.env.BASE_URL}cyberfiction/male${String(index + 1).padStart(4, "0")}.png`;
    };

    // ==========================================
    // 3. LOAD ALL 300 IMAGES
    // ==========================================
    let loaded = 0;
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = getFileUrl(i);
      img.onload = () => {
        loaded++;
        if (i === 0) render();
        if (loaded % 25 === 0 || loaded === frameCount) {
          setImagesLoadedCount(loaded);
        }
      };
      images.push(img);
    }

    // ==========================================
    // 4. DRAW IMAGE ON CANVAS
    // ==========================================
    const render = () => {
      const frame = Math.round(imageSeq.frame);
      const img = images[frame];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      const hRatio = canvasWidth / img.width;
      const vRatio = canvasHeight / img.height;
      const ratio = Math.min(hRatio, vRatio);

      const centerShiftX = (canvasWidth - img.width * ratio) / 2;
      const centerShiftY = (canvasHeight - img.height * ratio) / 2;

      context.clearRect(0, 0, canvasWidth, canvasHeight);
      context.drawImage(
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

    if (images[0] && images[0].complete) {
      render();
    }

    // ==========================================
    // 5. RESIZE HANDLER
    // ==========================================
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render();
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    // ==========================================
    // 6. CANVAS FRAME ANIMATION (GSAP SCRUB)
    // ==========================================
    const scrollerTarget = locoScroll ? main : window;

    const frameTween = gsap.to(imageSeq, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: canvas,
        start: "top top",
        end: "600% top",
        scrub: 0.15,
        scroller: scrollerTarget,
      },
      onUpdate: render,
    });

    // Pin Canvas
    const pinCanvas = ScrollTrigger.create({
      trigger: canvas,
      start: "top top",
      end: "600% top",
      pin: true,
      scroller: scrollerTarget,
    });

    // Pin Page 1
    const pinPage1 = ScrollTrigger.create({
      trigger: "#page1",
      start: "top top",
      end: "bottom top",
      pin: true,
      scroller: scrollerTarget,
    });

    // Pin Page 2
    const pinPage2 = ScrollTrigger.create({
      trigger: "#page2",
      start: "top top",
      end: "bottom top",
      pin: true,
      scroller: scrollerTarget,
    });

    // Pin Page 3
    const pinPage3 = ScrollTrigger.create({
      trigger: "#page3",
      start: "top top",
      end: "bottom top",
      pin: true,
      scroller: scrollerTarget,
    });

    // ==========================================
    // 7. LOCOMOTIVE REFRESH
    // ==========================================
    const updateLoco = () => {
      if (locoScroll) locoScroll.update();
    };

    ScrollTrigger.addEventListener("refresh", updateLoco);
    ScrollTrigger.refresh();

    // ==========================================
    // 8. CLEANUP
    // ==========================================
    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.removeEventListener("refresh", updateLoco);
      [frameTween, pinCanvas, pinPage1, pinPage2, pinPage3].forEach((t) => {
        if (t && t.scrollTrigger) t.scrollTrigger.kill();
        if (t && t.kill) t.kill();
      });
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      if (locoScroll) locoScroll.destroy();
    };
  }, []);

  return (
    <div className="cyberfiction-page">
      {/* Top Floating Cyber Navbar */}
      <header className="cyber-top-nav">
        <Link to="/" className="cyber-top-nav-brand">
          <b>CYBER</b>FICTION*
        </Link>

        <div className="cyber-top-nav-actions">
          <Link to="/" className="cyber-nav-btn">
            ← Loreverse Main
          </Link>
          <a href="#cyber-codex" className="cyber-nav-btn primary">
            Explore Lore & Works
          </a>
        </div>
      </header>

      {/* Main Experience Container */}
      <div className="cyberfiction-experience">
        <div id="main" ref={mainRef}>
          {/* ================= PAGE ================= */}
          <div id="page">
            <div id="loop">
              <h1>
                <b>CYBER</b>FICTION IS THE{" "}
                <b>
                  <i>REAL</i>
                </b>{" "}
                <span>STORY</span> IN THE{" "}
                <span>
                  <i>METAVERSE.</i>
                </span>
              </h1>
              <h1>
                <b>CYBER</b>FICTION IS THE{" "}
                <b>
                  <i>REAL</i>
                </b>{" "}
                <span>STORY</span> IN THE{" "}
                <span>
                  <i>METAVERSE.</i>
                </span>
              </h1>
              <h1>
                <b>CYBER</b>FICTION IS THE{" "}
                <b>
                  <i>REAL</i>
                </b>{" "}
                <span>STORY</span> IN THE{" "}
                <span>
                  <i>METAVERSE.</i>
                </span>
              </h1>
            </div>

            <h3>
              CYBERFICTION AIMS TO BE A DECENTRALIZED COMMUNITY THAT CAN
              <br />
              CREATE NEW VALUES AND PROFITS THROUGH PLAY IN THE VIRTUAL
              <br />
              WORLD.
            </h3>

            <h4>
              <span>↓</span> SCROLL TO READ · 300 FRAMES
            </h4>

            <canvas ref={canvasRef}></canvas>
          </div>

          {/* ================= PAGE 1 ================= */}
          <div id="page1">
            <div id="right-text">
              <h3>CYBERFICTION / KEY WORD</h3>
              <h1>
                HAVE FUN
                <br />
                LET'S PLAY
                <br />
                JUST BE TOGETHER
              </h1>
            </div>

            <div id="left-text">
              <h1>
                MAKE A STORY
                <br />
                TAKE A CHANCE
                <br />
                BUILD AND OWNED
              </h1>
              <h3>..AND MAINTAIN GOOD HUMANITY</h3>
            </div>
          </div>

          {/* ================= PAGE 2 ================= */}
          <div id="page2">
            <div id="text1">
              <h3>CYBERFICTION / HAVE FUN</h3>
              <h1>
                LET'S
                <br />
                HAVE FUN
                <br />
                TOGETHER
              </h1>
            </div>

            <div id="text2">
              <p>
                LET'S HAVE A BLAST! LET'S JUST THROW AWAY AGE, GENDER, REGION,
                <br />
                STATUS, ETC., DON'T COMPETE, DON'T FIGHT, COOPERATE AND SHARE
                <br />
                WITH EACH OTHER AND ENJOY IT TOGETHER! SO THAT YOU CAN STAND
                <br />
                THERE IN THE NOT-TOO-DISTANT FUTURE AND DREAM OF ANOTHER NEW
                <br />
                FUTURE
              </p>
            </div>
          </div>

          {/* ================= PAGE 3 ================= */}
          <div id="page3">
            <div id="text3">
              <h3>CYBERFICTION / PLAYGROUND</h3>
              <h1>
                CYBERFIELD
                <br />
                IS OUR
                <br />
                PLAYGROUND
              </h1>
            </div>
          </div>

          {/* ================= SECTION 2: CODEX & CATALOG ================= */}
          <div id="cyber-codex" className="cyber-codex-section">
            <div className="cyber-codex-container">
              <div className="cyber-codex-badge">
                ★ Dedicated Genre Hub // Web3 & Virtual Lore
              </div>
              <h2 className="cyber-codex-title">
                Cyberfiction <span>Media Archive</span>
              </h2>
              <p className="cyber-codex-desc">
                A new vanguard of storytelling distinct from serialized prose novels, Japanese manga, and Korean webtoons. Explore immersive virtual worlds, cybernetic consciousness, and decentralized metaverse narratives.
              </p>

              <div className="cyber-works-grid">
                {cyberMedia.map((media) => (
                  <div key={media.id} className="cyber-work-card">
                    <div className="cyber-work-image-wrap">
                      <img
                        src={media.coverImage}
                        alt={media.title}
                        className="cyber-work-image"
                        loading="lazy"
                      />
                      <span className="cyber-work-tag">Cyberfiction</span>
                    </div>

                    <div className="cyber-work-content">
                      <h3 className="cyber-work-title">{media.title}</h3>
                      <div className="cyber-work-meta">
                        {media.releaseYear} · {media.universeName}
                      </div>
                      <p className="cyber-work-synopsis">{media.synopsis}</p>

                      <div className="cyber-work-badges">
                        {media.genres?.map((g) => (
                          <span key={g} className="cyber-tag-chip">
                            #{g}
                          </span>
                        ))}
                      </div>

                      <Link
                        to={`/media/${media.slug}`}
                        className="cyber-nav-btn primary"
                        style={{ textAlign: "center", marginTop: "auto" }}
                      >
                        Inspect Lore Entry →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* Call to Action Box */}
              <div className="cyber-cta-box">
                <h3 className="cyber-cta-title">
                  Step Beyond The Boundaries of Fiction
                </h3>
                <p className="cyber-cta-text">
                  Cyberfiction breaks open the static medium into live, collaborative realities. Bookmark your favorite cyber-chronicles, contribute to the open codex, or return to explore traditional lore across all dimensions.
                </p>
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
                  <Link to="/" className="cyber-nav-btn primary">
                    Return to Loreverse Main Hub
                  </Link>
                  <Link to="/explore" className="cyber-nav-btn">
                    Explore All Media Genres
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
