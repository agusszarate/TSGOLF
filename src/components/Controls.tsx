import { useEffect, useState } from 'react';
import { Vector3 } from 'three';

interface ControlsProps {
  onShoot: (direction: Vector3, power: number) => void;
}

export const Controls = ({ onShoot }: ControlsProps) => {
  const [power, setPower] = useState(0);
  const [isCharging, setIsCharging] = useState(false);
  const [aimDirection, setAimDirection] = useState(new Vector3(1, 0, 0));

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isCharging) {
        // Calculate direction based on mouse position relative to center of screen
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const z = (e.clientY / window.innerHeight) * 2 - 1;
        const direction = new Vector3(x, 0, -z).normalize(); // Invert z for intuitive controls
        setAimDirection(direction);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isCharging]);

  const handleMouseDown = () => {
    setIsCharging(true);
    setPower(0);
    const chargeInterval = setInterval(() => {
      setPower((prev) => {
        if (prev >= 1) {
          clearInterval(chargeInterval);
          return 1;
        }
        return prev + 0.05; // Slower power increase for better control
      });
    }, 50);

    const handleMouseUp = () => {
      setIsCharging(false);
      clearInterval(chargeInterval);
      onShoot(aimDirection.clone(), power);
      setPower(0);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className="absolute bottom-4 left-4 p-4 bg-black/50 rounded-lg text-white z-50">
      <div className="mb-2">
        <div>Power: {(power * 100).toFixed(0)}%</div>
        <div className="h-2 w-32 bg-gray-700 rounded overflow-hidden">
          <div 
            className="h-full bg-green-500 transition-all duration-100"
            style={{ width: `${power * 100}%` }}
          />
        </div>
      </div>
      <button
        className="px-4 py-2 bg-green-500 rounded hover:bg-green-600 active:bg-green-700 transition-colors"
        onMouseDown={handleMouseDown}
      >
        Hold to Charge Shot
      </button>
    </div>
  );
};