import logo from './logo.svg';
import './App.css';


// Assuming your Node.js server is hosted on Heroku
const apiUrl = 'https://intense-depths-20444-c1e4653348f9.herokuapp.com'; // Replace with your actual Heroku app name

fetch(`${apiUrl}/api/data`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        // Handle the data received from the server
    })
    .catch((error) => {
        console.error('Error fetching data', error);
    });


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload. Et ouais.
        </p>
        <anpm
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </anpm>
      </header>
    </div>
  );
}

export default App;
