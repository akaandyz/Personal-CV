'use client';
import { useState, useRef, useCallback, useEffect } from 'react';

interface FloatingPaw { id: number; x: number; y: number; }
interface CocoaGateProps { onComplete: () => void; }

const TOTAL_PETS = 5;

export default function CocoaGate({ onComplete }: CocoaGateProps) {
  const [petCount, setPetCount]     = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isExiting, setIsExiting]   = useState(false);
  const [paws, setPaws]             = useState<FloatingPaw[]>([]);
  const [isWiggling, setIsWiggling] = useState(false);
  const pawId   = useRef(0);
  const timers  = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => { timers.current.forEach(clearTimeout); }, []);

  const handlePet = useCallback(
    (e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>) => {
      if (isComplete) return;
      let x: number, y: number;
      if ('touches' in e) {
        e.preventDefault(); // suppress delayed synthetic click on touch
        const t = e.touches[0] ?? e.changedTouches[0];
        x = t.clientX; y = t.clientY;
      } else {
        x = e.clientX; y = e.clientY;
      }

      // Spawn floating paw at cursor position
      const id = ++pawId.current;
      setPaws(p => [...p, { id, x, y }]);
      const t1 = setTimeout(() => setPaws(p => p.filter(p => p.id !== id)), 900);
      timers.current.push(t1);

      // Wiggle: double-RAF to force CSS animation restart
      setIsWiggling(false);
      requestAnimationFrame(() => requestAnimationFrame(() => {
        setIsWiggling(true);
        const t2 = setTimeout(() => setIsWiggling(false), 500);
        timers.current.push(t2);
      }));

      setPetCount(prev => {
        const next = prev + 1;
        if (next >= TOTAL_PETS) {
          setIsComplete(true);
          const t3 = setTimeout(() => {
            setIsExiting(true);
            const t4 = setTimeout(onComplete, 600); // wait for fade-out
            timers.current.push(t4);
          }, 700);
          timers.current.push(t3);
        }
        return next;
      });
    },
    [isComplete, onComplete],
  );

  return (
    <div
      className={`gate-overlay${isExiting ? ' gate-overlay--exiting' : ''}`}
      role="dialog" aria-modal="true" aria-label="Pet Cocoa to enter"
    >
      <div className="gate-card">
        <p className="gate-heading">
          {isComplete ? 'Cocoa approves! 🐶' : 'Cocoa is my recaptcha guardian. Pet him 5 times to see the website'}
        </p>

        <div className="gate-paw-track" aria-label={`${petCount} of ${TOTAL_PETS} pets`}>
          {Array.from({ length: TOTAL_PETS }).map((_, i) => (
            <span key={i} className={`gate-paw-pip${i < petCount ? ' gate-paw-pip--filled' : ''}`} aria-hidden="true">🐾</span>
          ))}
        </div>

        <button
          className={`gate-dog-btn${isComplete ? ' gate-dog-btn--happy' : ''}`}
          onClick={handlePet}
          onTouchStart={handlePet}
          aria-label={isComplete ? 'Cocoa is happy!' : `Pet Cocoa (${petCount} of ${TOTAL_PETS})`}
          disabled={isComplete}
        >
          <div className={`gate-dog-img-wrap${isWiggling ? ' gate-dog-img-wrap--wiggle' : ''}`}>
            {/* basePath (/Personal-CV) must be explicit for static <img> tags */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/Personal-CV/cocoa.jpg" alt="Cocoa the dog"
              className="gate-dog-img" draggable={false} />
          </div>
        </button>

        <p className="gate-sub">
          {isComplete ? 'Loading portfolio…' : `Click Cocoa ${TOTAL_PETS - petCount}× more`}
        </p>
      </div>

      {paws.map(paw => (
        <span key={paw.id} className="gate-floating-paw" aria-hidden="true"
          style={{ left: paw.x, top: paw.y }}>🐾</span>
      ))}
    </div>
  );
}
