import { useEffect, useRef, useState } from "react";

export default function StickyControls({ onOpenRSVP }) {
  const [visible, setVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMusicTip, setShowMusicTip] = useState(false);
  const [showRsvpTip, setShowRsvpTip] = useState(false);
  const [showNowPlaying, setShowNowPlaying] = useState(false);
  const [hoverMusicTip, setHoverMusicTip] = useState(false);
  const [hoverRsvpTip, setHoverRsvpTip] = useState(false);
  const tipsShownRef = useRef(false);
  const nowPlayingTimerRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Autoplay on mount — if browser blocks it, retry on first gesture
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let unlocked = false;

    const onSuccess = () => {
      setIsPlaying(true);
      setShowNowPlaying(true);
      clearTimeout(nowPlayingTimerRef.current);
      nowPlayingTimerRef.current = setTimeout(() => setShowNowPlaying(false), 4000);
    };

    const unlock = () => {
      if (unlocked) return;
      unlocked = true;
      removeListeners();
      audio.play().then(onSuccess).catch(() => {});
    };

    const removeListeners = () => {
      document.removeEventListener("touchstart", unlock);
      document.removeEventListener("touchend", unlock);
      document.removeEventListener("click", unlock);
      document.removeEventListener("keydown", unlock);
    };

    // Try autoplay immediately
    audio.play().then(onSuccess).catch(() => {
      // Blocked — wait for any gesture on the document
      document.addEventListener("touchstart", unlock, { passive: true });
      document.addEventListener("touchend", unlock, { passive: true });
      document.addEventListener("click", unlock);
      document.addEventListener("keydown", unlock);
    });

    return removeListeners;
  }, []);

  // Music tip first, then RSVP tip 10s later — each only once
  useEffect(() => {
    if (visible && !tipsShownRef.current) {
      tipsShownRef.current = true;

      // Music tip: show immediately, hide after 3s
      setShowMusicTip(true);
      const t1 = setTimeout(() => setShowMusicTip(false), 5000);

      // RSVP tip: show after 10s, hide 3s later
      const t2 = setTimeout(() => setShowRsvpTip(true), 10000);
      const t3 = setTimeout(() => setShowRsvpTip(false), 15000);

      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }
  }, [visible]);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      setShowNowPlaying(false);
      clearTimeout(nowPlayingTimerRef.current);
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
        setShowNowPlaying(true);
        clearTimeout(nowPlayingTimerRef.current);
        nowPlayingTimerRef.current = setTimeout(() => setShowNowPlaying(false), 4000);
      }).catch(() => {});
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,300;1,400&family=Jost:wght@300;400&display=swap');

        @keyframes rsvp-breathe {
          0%, 100% { transform: scale(1); box-shadow: 0 4px 24px rgba(114,47,55,0.35), 0 0 0 0 rgba(114,47,55,0); }
          50%       { transform: scale(1.04); box-shadow: 0 8px 32px rgba(114,47,55,0.5), 0 0 0 8px rgba(114,47,55,0.12); }
        }
        @keyframes music-pulse {
          0%, 100% { transform: scale(1); }
          50%       { transform: scale(1.35); }
        }
        @keyframes tip-in {
          0%   { opacity: 0; transform: translateX(6px); }
          15%  { opacity: 1; transform: translateX(0); }
          80%  { opacity: 1; transform: translateX(0); }
          100% { opacity: 0; transform: translateX(6px); }
        }
        @keyframes tip-in-left {
          0%   { opacity: 0; transform: translateX(-6px); }
          15%  { opacity: 1; transform: translateX(0); }
          80%  { opacity: 1; transform: translateX(0); }
          100% { opacity: 0; transform: translateX(-6px); }
        }
        @keyframes now-playing-in {
          0%   { opacity: 0; transform: translateX(12px); }
          15%  { opacity: 1; transform: translateX(0); }
          78%  { opacity: 1; transform: translateX(0); }
          100% { opacity: 0; transform: translateX(12px); }
        }
        .now-playing-toast {
          position: absolute;
          right: calc(100% + 12px);
          top: 50%;
          transform: translateY(-50%);
          white-space: nowrap;
          background: rgba(10,7,5,0.88);
          color: #fffdf8;
          border-left: 2px solid #6B7041;
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: 0.68rem;
          letter-spacing: 0.06em;
          padding: 6px 14px;
          border-radius: 3px;
          pointer-events: none;
          backdrop-filter: blur(6px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.3);
          animation: now-playing-in 4s ease forwards;
        }
        .now-playing-toast strong {
          font-weight: 400;
          font-style: italic;
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.82rem;
          color: #c8d4a0;
        }

        .sticky-rsvp {
          animation: rsvp-breathe 2.4s ease-in-out infinite;
        }
        .sticky-rsvp:hover {
          animation: none !important;
          transform: scale(1.07) !important;
          box-shadow: 0 10px 40px rgba(114,47,55,0.55), 0 0 0 4px rgba(114,47,55,0.2) !important;
        }
        .sticky-rsvp:active { transform: scale(0.96) !important; animation: none !important; }
        .sticky-music:hover { transform: translateY(-2px) !important; box-shadow: 0 6px 20px rgba(0,0,0,0.3) !important; }
        .sticky-music:active { transform: scale(0.93) !important; }
        .music-note-pulse { display: inline-block; animation: music-pulse 1.4s ease-in-out infinite; }

        .tip-bubble {
          position: absolute;
          white-space: nowrap;
          background: rgba(20,10,10,0.82);
          color: #fffdf8;
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: 0.7rem;
          letter-spacing: 0.08em;
          padding: 5px 12px;
          border-radius: 999px;
          pointer-events: none;
          backdrop-filter: blur(4px);
        }
        .tip-bubble::after {
          content: '';
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          border: 5px solid transparent;
        }
        .tip-music {
          right: calc(100% + 10px);
          top: 50%;
          transform: translateY(-50%);
          animation: tip-in-left 3s ease forwards;
        }
        .tip-music::after {
          right: -10px;
          border-left-color: rgba(20,10,10,0.82);
        }
        .tip-rsvp {
          left: calc(100% + 10px);
          top: 50%;
          transform: translateY(-50%);
          animation: tip-in 3s ease forwards;
        }
        .tip-rsvp::after {
          left: -10px;
          border-right-color: rgba(20,10,10,0.82);
        }
      `}</style>

      <audio ref={audioRef} src="/music/wishlist.mp3" loop />

      {/* RSVP Now — lower left */}
      <div style={{
        position: "fixed",
        bottom: "1.8rem",
        left: "1.2rem",
        zIndex: 50,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.45s ease, transform 0.45s ease",
        pointerEvents: visible ? "auto" : "none",
      }}>
        <div style={{ position: "relative", display: "inline-flex" }}>
          {(showRsvpTip || hoverRsvpTip) && (
            <span className="tip-bubble tip-rsvp">click to RSVP</span>
          )}
          <button
            onClick={onOpenRSVP}
            className="sticky-rsvp"
            onMouseEnter={() => setHoverRsvpTip(true)}
            onMouseLeave={() => setHoverRsvpTip(false)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "0.75rem 1.8rem 0.75rem 1.5rem",
              borderRadius: "999px",
              border: "1.5px solid rgba(255,253,248,0.4)",
              background: "#722F37",
              color: "#fffdf8",
              fontFamily: "'Jost', sans-serif",
              fontWeight: 400,
              fontSize: "0.78rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
          >
            <span style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "1.2rem",
              lineHeight: 1,
              opacity: 0.9,
            }}>✦</span>
            RSVP Now
          </button>
        </div>
      </div>

      {/* Music — just below nav bar, right side */}
      <div style={{
        position: "fixed",
        top: "96px",
        right: "1.2rem",
        zIndex: 50,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-12px)",
        transition: "opacity 0.45s ease, transform 0.45s ease",
        pointerEvents: visible ? "auto" : "none",
      }}>
        <div style={{ position: "relative", display: "inline-flex" }}>
          {(showMusicTip || hoverMusicTip) && !isPlaying && (
            <span className="tip-bubble tip-music">click to play our music</span>
          )}
          {showNowPlaying && (
            <div className="now-playing-toast">
              ♪ &nbsp;Now playing &nbsp;<strong>"Wish List" by Taylor Swift</strong>
            </div>
          )}
          {hoverMusicTip && isPlaying && !showNowPlaying && (
            <div style={{
              position: "absolute",
              right: "calc(100% + 12px)",
              top: "50%",
              transform: "translateY(-50%)",
              whiteSpace: "nowrap",
              background: "rgba(10,7,5,0.88)",
              color: "#fffdf8",
              borderLeft: "2px solid #6B7041",
              fontFamily: "'Jost', sans-serif",
              fontWeight: 300,
              fontSize: "0.68rem",
              letterSpacing: "0.06em",
              padding: "6px 14px",
              borderRadius: "3px",
              pointerEvents: "none",
              backdropFilter: "blur(6px)",
              boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
            }}>
              ♪ &nbsp;Now playing &nbsp;<strong style={{ fontWeight: 400, fontStyle: "italic", fontFamily: "'Cormorant Garamond', serif", fontSize: "0.82rem", color: "#c8d4a0" }}>"Wish List" by Taylor Swift</strong>
            </div>
          )}
          <button
            onClick={toggleMusic}
            className="sticky-music"
            onMouseEnter={() => setHoverMusicTip(true)}
            onMouseLeave={() => setHoverMusicTip(false)}
            title={isPlaying ? "Pause music" : "Play music"}
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "50%",
              border: "2px solid #6B7041",
              background: "#fffdf8",
              color: "#6B7041",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 4px 20px rgba(0,0,0,0.2), 0 1px 4px rgba(0,0,0,0.12)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
          >
            {isPlaying ? (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="3" y="2" width="4" height="14" rx="1.5" fill="#6B7041" />
                <rect x="11" y="2" width="4" height="14" rx="1.5" fill="#6B7041" />
              </svg>
            ) : (
              <span className="music-note-pulse" style={{ fontSize: "1.6rem", lineHeight: 1 }}>♪</span>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
