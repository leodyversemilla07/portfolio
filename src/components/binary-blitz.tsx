import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter, CardAction } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const BinaryBlitz = () => {
  const [target, setTarget] = useState(0);
  const [bits, setBits] = useState([false, false, false, false]); // 8, 4, 2, 1
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'lost'>('idle');
  const [highScore, setHighScore] = useState(0);

  const generateTarget = useCallback(() => {
    const newTarget = Math.floor(Math.random() * 15) + 1;
    setTarget(newTarget);
    setBits([false, false, false, false]);
    setTimeLeft(Math.max(2, 5 - Math.floor(score / 5))); // Gets faster as score increases
  }, [score]);

  const startGame = () => {
    setScore(0);
    setGameState('playing');
    generateTarget();
  };

  const toggleBit = (index: number) => {
    if (gameState !== 'playing') return;
    const newBits = [...bits];
    newBits[index] = !newBits[index];
    setBits(newBits);
  };

  const currentValue = bits.reduce((acc, bit, idx) => acc + (bit ? Math.pow(2, 3 - idx) : 0), 0);

  useEffect(() => {
    if (gameState === 'playing' && currentValue === target) {
      setScore(s => s + 1);
      generateTarget();
    }
  }, [currentValue, target, gameState, generateTarget]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 0.1) {
            setGameState('lost');
            return 0;
          }
          return t - 0.1;
        });
      }, 100);
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  useEffect(() => {
    if (score > highScore) setHighScore(score);
  }, [score, highScore]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="uppercase tracking-widest text-[10px]">
          Binary Challenge
        </CardTitle>
        <CardDescription>
          Convert decimal to 4-bit binary
        </CardDescription>
        <CardAction>
          <div className="text-right">
            <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Score</div>
            <div className="text-xl font-bold font-mono">{score}</div>
          </div>
        </CardAction>
      </CardHeader>

      <CardContent className="flex flex-col items-center justify-center space-y-12 py-10 min-h-[320px]">
        {gameState === 'idle' ? (
          <div className="text-center space-y-8 animate-in fade-in duration-500">
            <div className="text-6xl font-bold opacity-10 font-mono tracking-tighter select-none">0101</div>
            <div className="space-y-4">
              <Button
                onClick={startGame}
                size="lg"
                variant="default"
              >
                Start Challenge
              </Button>
              {highScore > 0 ? (
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono">High Score: {highScore}</p>
              ) : (
                <p className="text-[10px] text-transparent uppercase tracking-widest font-mono">Hidden</p>
              )}
            </div>
          </div>
        ) : gameState === 'playing' ? (
          <div className="flex flex-col items-center space-y-12 w-full animate-in fade-in duration-500">
            <div className="flex flex-col items-center gap-4">
                <div className="text-6xl font-bold font-mono text-foreground tabular-nums tracking-tighter">
                {target}
                </div>
                <div className="w-48 h-0.5 bg-secondary overflow-hidden">
                    <div 
                        className="h-full bg-primary transition-all duration-100 ease-linear"
                        style={{ width: `${(timeLeft / (5 - Math.floor(score / 5))) * 100}%` }}
                    />
                </div>
            </div>

            <div className="flex gap-1.5 sm:gap-2">
              {[8, 4, 2, 1].map((val, i) => (
                <Button
                  key={val}
                  variant={bits[i] ? "default" : "outline"}
                  onClick={() => toggleBit(i)}
                  className="w-12 h-16 sm:w-14 sm:h-20 flex flex-col items-center justify-center gap-0.5 sm:gap-1 border"
                >
                  <span className="text-lg sm:text-xl font-bold font-mono">{bits[i] ? '1' : '0'}</span>
                  <span className="text-[9px] sm:text-[10px] opacity-60 font-medium">{val}</span>
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center space-y-8 animate-in fade-in zoom-in duration-300">
            <div className="space-y-2">
                <p className="text-[10px] font-bold text-destructive uppercase tracking-widest">Time's Up</p>
                <div className="text-4xl font-bold font-mono">Score: {score}</div>
            </div>
            <Button
              onClick={startGame}
              variant="outline"
              size="lg"
            >
              Try Again
            </Button>
          </div>
        )}
      </CardContent>

      <CardFooter className="justify-between text-[10px] text-muted-foreground uppercase tracking-widest font-mono">
        <span>Register: 2³ 2² 2¹ 2⁰</span>
        <span className="bg-muted px-2 py-0.5 text-foreground">
            {gameState === 'playing' ? bits.map(b => b ? '1' : '0').join('') : '----'}
        </span>
      </CardFooter>
    </Card>
  );
};

export default BinaryBlitz;
