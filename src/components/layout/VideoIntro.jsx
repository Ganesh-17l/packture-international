import React, { useState, useEffect, useRef } from 'react';

export default function VideoIntro({ onStartExit, onComplete }) {
  const videoRef = useRef(null);
  const exitingRef = useRef(false);
  const completedRef = useRef(false);
  const timersRef = useRef([]);
  const [isExiting, setIsExiting] = useState(false);

  // Clean timer execution
  const clearAllTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  const handleImmediateFinish = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    clearAllTimers();
    if (onStartExit) onStartExit();
    if (onComplete) onComplete();
  };

  const handleEnded = () => {
    if (exitingRef.current) return;
    exitingRef.current = true;

    // 1. Hold the final video frame cleanly
    if (videoRef.current) {
      videoRef.current.pause();
    }

    // 2. Notify parent to prepare and mount the Home page underneath
    if (onStartExit) {
      onStartExit();
    }

    // 3. Brief seamless hold (150ms), then begin the smooth 700ms cinematic fade-out
    const fadeTimer = setTimeout(() => {
      setIsExiting(true);

      const completeTimer = setTimeout(() => {
        if (completedRef.current) return;
        completedRef.current = true;
        if (onComplete) {
          onComplete();
        }
      }, 700);

      timersRef.current.push(completeTimer);
    }, 150);

    timersRef.current.push(fadeTimer);
  };

  // =========================================================================
  // 1. ROBUST BODY & SCROLL LOCK (Desktop Wheel, Mobile Touch, Keys)
  // Active until the intro overlay is completely unmounted.
  // =========================================================================
  useEffect(() => {
    const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevHtmlOverscroll = document.documentElement.style.overscrollBehavior;
    const prevBodyOverflow = document.body.style.overflow;
    const prevBodyOverscroll = document.body.style.overscrollBehavior;
    const prevBodyTouchAction = document.body.style.touchAction;
    const prevBodyPaddingRight = document.body.style.paddingRight;

    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.overscrollBehavior = 'none';
    document.body.style.overflow = 'hidden';
    document.body.style.overscrollBehavior = 'none';
    document.body.style.touchAction = 'none';
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }

    const preventWheel = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const preventTouchMove = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const preventKeyScroll = (e) => {
      const scrollKeys = [
        'Space', ' ', 'PageUp', 'PageDown', 'End', 'Home',
        'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'
      ];
      if (scrollKeys.includes(e.key) || scrollKeys.includes(e.code)) {
        e.preventDefault();
      }
    };

    window.addEventListener('wheel', preventWheel, { passive: false, capture: true });
    window.addEventListener('touchmove', preventTouchMove, { passive: false, capture: true });
    window.addEventListener('keydown', preventKeyScroll, { capture: true });

    return () => {
      clearAllTimers();

      window.removeEventListener('wheel', preventWheel, { capture: true });
      window.removeEventListener('touchmove', preventTouchMove, { capture: true });
      window.removeEventListener('keydown', preventKeyScroll, { capture: true });

      document.documentElement.style.overflow = prevHtmlOverflow;
      document.documentElement.style.overscrollBehavior = prevHtmlOverscroll;
      document.body.style.overflow = prevBodyOverflow;
      document.body.style.overscrollBehavior = prevBodyOverscroll;
      document.body.style.touchAction = prevBodyTouchAction;
      document.body.style.paddingRight = prevBodyPaddingRight;

      window.scrollTo(0, scrollY);
    };
  }, []);

  // =========================================================================
  // 2. VIDEO AUTOPLAY INITIALIZATION
  // Starts from 0 every page load, plays once, muted, playsinline
  // =========================================================================
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;
    video.muted = true;
    video.playsInline = true;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn('Video intro autoplay failed or prevented:', err);
        handleImmediateFinish();
      });
    }
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Packture International Brand Presentation"
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: '100vw',
        height: '100dvh',
        backgroundColor: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999999,
        overscrollBehavior: 'none',
        touchAction: 'none',
        margin: 0,
        padding: 'env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left)',
        overflow: 'hidden',
        opacity: isExiting ? 0 : 1,
        transition: 'opacity 700ms cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: isExiting ? 'none' : 'auto',
      }}
    >
      <style>{`
        .packture-intro-video {
          width: 80%;
          max-width: 80%;
          height: auto;
          max-height: 70dvh;
          aspect-ratio: 16 / 9;
          object-fit: contain;
          display: block;
          margin: auto;
          background-color: #000000;
        }
        @media (min-width: 768px) {
          .packture-intro-video {
            width: min(56vw, 880px);
            max-width: 880px;
          }
        }
      `}</style>
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        loop={false}
        controls={false}
        disablePictureInPicture
        disableRemotePlayback
        preload="auto"
        onEnded={handleEnded}
        onError={(e) => {
          console.error('Video intro playback error:', e);
          handleImmediateFinish();
        }}
        className="packture-intro-video"
      >
        <source src="/assets/intro_video/New Project 14 [5CEB082].mp4" type="video/mp4" />
        <source src="/assets/intro_video/New%20Project%2014%20%5B5CEB082%5D.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
