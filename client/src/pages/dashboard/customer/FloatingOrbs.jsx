import { useState, useEffect } from "react";

export const FloatingOrbs = () => {
  const [orbs, setOrbs] = useState([]);

  useEffect(() => {
    const newOrbs = Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 10 + 5,
      speedX: (Math.random() - 0.5) * 0.1,
      speedY: (Math.random() - 0.5) * 0.1,
      color: `hsla(${Math.random() * 60 + 200}, 80%, 60%, 0.2)`,
    }));
    setOrbs(newOrbs);

    const interval = setInterval(() => {
      setOrbs((prev) =>
        prev.map((orb) => ({
          ...orb,
          x: (orb.x + orb.speedX) % 100,
          y: (orb.y + orb.speedY) % 100,
        }))
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {orbs.map((orb) => (
        <div
          key={orb.id}
          className="absolute rounded-full blur-lg"
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            backgroundColor: orb.color,
            transform: `scale(${
              Math.sin(Date.now() / 1000 + orb.id) * 0.5 + 0.8
            })`,
          }}
        />
      ))}
    </div>
  );
};