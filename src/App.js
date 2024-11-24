import './App.css';
import Weather from './Weather.js';
import DenseAppBar from './Bar';
import EarthScene from './EarthScene';

export default function App() {
  return (
    <div className="bg">
      <div className="App">
        <DenseAppBar />
        <Weather />
          <EarthScene />
  
        
      </div>
    </div>
  );
}
