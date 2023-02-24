import './App.css';
import 'antd/dist/reset.css'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

import Home from './components/pages/Home';
import People from './components/pages/People';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/people/:id" element={<People />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
