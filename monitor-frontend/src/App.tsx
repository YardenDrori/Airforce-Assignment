import './App.css';
import Header from './components/Header';
import Dashboard from './components/Dashboard';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header/>
        <Dashboard/>
      </header>
    </div>
  );
}

export default App;