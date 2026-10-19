import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { TerminalWindowIcon, PlayIcon, ArrowClockwiseIcon, TrophyIcon, CpuIcon } from "@phosphor-icons/react";

const STORAGE_KEY = "binary-blitz:high-score";

/** Seconds allowed for a round, given the current score. Tightens as the score climbs. */
const timeLimitFor = (score: number) => Math.max(2, 5 - Math.floor(score / 5));

const BinaryBlitz = () => {
  const [target, setTarget] = useState(0);
  const [bits, setBits] = useState([false, false, false, false]); // 8, 4, 2, 1
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [gameState, setGameState] = useState<"idle" | "playing" | "lost">("idle");
  const [highScore, setHighScore] = useState(0);
  const [round, setRound] = useState(0);

  // Track the best score of the *previous* run so a tie is not announced as a record.
  const previousBest = useRef(0);

  // Duration of the current round in seconds, kept in a ref so the timer effect
  // never has to depend on the ticking `timeLeft` value.
  const roundDuration = useRef(0);

  // Restore the persisted high score on mount.
  useEffect(() => {
    try {
      const stored = Number(window.localStorage.getItem(STORAGE_KEY) ?? 0);
      if (Number.isFinite(stored) && stored > 0) setHighScore(stored);
    } catch {
      // localStorage may be unavailable (private mode / blocked cookies) — ignore.
    }
  }, []);

  const generateTarget = useCallback((nextScore: number) => {
    const duration = timeLimitFor(nextScore);
    roundDuration.current = duration;
    setTarget(Math.floor(Math.random() * 15) + 1);
    setBits([false, false, false, false]);
    setTimeLeft(duration);
    // A monotonic round counter guarantees the timer restarts even when the
    // randomly generated target happens to repeat the previous value.
    setRound((r) => r + 1);
  }, []);

  const startGame = () => {
    previousBest.current = highScore;
    setScore(0);
    setGameState("playing");
    generateTarget(0);
  };

  const toggleBit = (index: number) => {
    if (gameState !== "playing") return;
    setBits((prev) => prev.map((bit, i) => (i === index ? !bit : bit)));
  };

  const currentValue = bits.reduce((acc, bit, idx) => acc + (bit ? Math.pow(2, 3 - idx) : 0), 0);

  // Award a point when the register state matches the target.
  useEffect(() => {
    if (gameState !== "playing" || currentValue !== target) return;

    const nextScore = score + 1;
    setScore(nextScore);
    generateTarget(nextScore);
  }, [currentValue, target, gameState, score, generateTarget]);

  // Deadline-driven timer. The deadline is computed once per round from a ref,
  // so the interval is created once instead of being torn down on every tick.
  const deadlineRef = useRef<number | null>(null);

  useEffect(() => {
    if (gameState !== "playing") return;

    deadlineRef.current = performance.now() + roundDuration.current * 1000;
    setTimeLeft(roundDuration.current);

    const timer = window.setInterval(() => {
      if (deadlineRef.current === null) return;
      const remaining = (deadlineRef.current - performance.now()) / 1000;

      if (remaining <= 0) {
        deadlineRef.current = null;
        setTimeLeft(0);
        setGameState("lost");
        return;
      }

      setTimeLeft(remaining);
    }, 50);

    return () => {
      window.clearInterval(timer);
      deadlineRef.current = null;
    };
  }, [gameState, round]);

  // Persist the best score whenever it is beaten.
  useEffect(() => {
    if (score <= highScore) return;
    setHighScore(score);
    try {
      window.localStorage.setItem(STORAGE_KEY, String(score));
    } catch {
      // Ignore storage failures — the score still works for the current session.
    }
  }, [score, highScore]);

  const maxTime = timeLimitFor(score);
  const timeProgress = maxTime > 0 ? (timeLeft / maxTime) * 100 : 0;
  const isNewRecord = score > previousBest.current && score > 0;

  return (
    <div className="border border-border bg-card/80 overflow-hidden transition-colors hover:border-foreground/30">
      {/* Terminal Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-muted/40 border-b border-border text-xs font-mono">
        <div className="flex items-center gap-2 text-foreground/80">
          <TerminalWindowIcon className="size-4" />
          <span className="font-semibold">lab/binary-blitz.exe</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-muted-foreground text-[11px]">
            <TrophyIcon className="size-3.5" />
            <span>High: <strong className="text-foreground">{highScore}</strong></span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground text-[11px]">
            <CpuIcon className="size-3.5" />
            <span>Score: <strong className="text-foreground">{score}</strong></span>
          </div>
        </div>
      </div>

      {/* Main Game Screen */}
      <div className="p-6 sm:p-8 flex flex-col items-center justify-center min-h-[300px]">
        {gameState === "idle" ? (
          <div className="text-center space-y-6 max-w-sm">
            <div className="font-mono text-5xl font-black tracking-widest text-foreground/15 select-none">
              0101
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                Decimal to 4-Bit Converter
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Flip the 4-bit registers (8, 4, 2, 1) to match the decimal target before time runs out.
              </p>
            </div>
            <Button
              onClick={startGame}
              size="lg"
              className="font-mono text-xs uppercase tracking-wider px-6 py-2 rounded-none bg-primary text-primary-foreground hover:bg-primary/90 active:translate-y-px transition-all"
            >
              <PlayIcon className="size-3.5 mr-1.5" />
              Initialize Challenge
            </Button>
          </div>
        ) : gameState === "playing" ? (
          <div className="flex flex-col items-center space-y-8 w-full max-w-md">
            {/* Target Display & Timer */}
            <div className="flex flex-col items-center gap-3 w-full">
              <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
                Target Value
              </span>
              <div className="text-6xl font-extrabold font-mono text-foreground tabular-nums tracking-tight">
                {target}
              </div>
              <div className="w-full max-w-xs h-1 bg-secondary overflow-hidden">
                <div
                  className="h-full bg-foreground transition-all duration-100 ease-linear"
                  style={{ width: `${Math.min(100, Math.max(0, timeProgress))}%` }}
                />
              </div>
            </div>

            {/* Bit Registers */}
            <div className="grid grid-cols-4 gap-2 sm:gap-3 w-full max-w-xs">
              {[8, 4, 2, 1].map((val, i) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => toggleBit(i)}
                  aria-pressed={bits[i]}
                  aria-label={`Toggle ${val} bit (current sum ${currentValue})`}
                  className={`flex flex-col items-center justify-center h-20 sm:h-24 border transition-all cursor-pointer select-none rounded-none font-mono active:translate-y-px ${
                    bits[i]
                      ? "bg-foreground text-background border-foreground font-bold shadow-sm"
                      : "bg-background text-foreground border-border hover:border-foreground/50 hover:bg-muted/40"
                  }`}
                >
                  <span className="text-2xl sm:text-3xl font-mono">{bits[i] ? "1" : "0"}</span>
                  <span className="text-[10px] opacity-70 tracking-widest mt-1">+{val}</span>
                </button>
              ))}
            </div>

            <div className="text-center text-xs font-mono text-muted-foreground">
              Current Sum: <strong className="text-foreground">{currentValue}</strong>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-5 max-w-xs">
            <div className="inline-flex px-2.5 py-1 text-[11px] font-mono font-semibold bg-destructive/10 text-destructive uppercase tracking-widest">
              Execution Timeout
            </div>
            <div className="space-y-1">
              <div className="text-4xl font-extrabold font-mono text-foreground">
                {score} <span className="text-xs font-normal text-muted-foreground uppercase">pts</span>
              </div>
              <p className="text-xs text-muted-foreground">
                {isNewRecord ? "★ New Personal Record!" : "Good run. Try again to beat your record."}
              </p>
            </div>
            <Button
              onClick={startGame}
              size="lg"
              variant="outline"
              className="font-mono text-xs uppercase tracking-wider rounded-none border-border hover:bg-muted active:translate-y-px transition-all"
            >
              <ArrowClockwiseIcon className="size-3.5 mr-1.5" />
              Rerun Challenge
            </Button>
          </div>
        )}
      </div>

      {/* Terminal Footer Info */}
      <div className="flex items-center justify-between px-4 py-2 bg-muted/20 border-t border-border text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
        <span>Registers: 2³ 2² 2¹ 2⁰</span>
        <span className="bg-muted px-2 py-0.5 text-foreground font-semibold">
          {gameState === "playing" ? bits.map((b) => (b ? "1" : "0")).join("") : "0000"}
        </span>
      </div>
    </div>
  );
};

export default BinaryBlitz;
