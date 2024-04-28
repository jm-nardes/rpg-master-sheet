import DungeonMaster from './pages/DungeonMaster';

export default function App() {
  const bgImage = require('./image/background.jpg');

  return (
    <div 
      className="w-screen h-screen flex flex-col items-center justify-center"
      style={{ 
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
      }}
    >
      <DungeonMaster />
    </div>
  );
}