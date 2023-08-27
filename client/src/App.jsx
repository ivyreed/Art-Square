import './App.css';
import { Outlet } from 'react-router-dom';
import AuthService from './utils/auth'; 

import { 
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import UploadWidget from './components/uploadWidget';
import ArtGallery from './pages/ArtGallery';
import Navbar from './components/Navbar';
import ProfileBar from './components/profilebar';





const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const isLoggedIn = AuthService.loggedIn();
  return (

        <ApolloProvider client={client}>
      <Navbar />
      <ProfileBar
        username="test_user"
        avatarUrl="https://via.placeholder.com/150"
        firstName="John"
        lastName="Doe"
        numberOfImages={10} // Replace with the actual number of images
      />
      <div className='widgetContainer'>
        {isLoggedIn && (
          <div className='widgetContainer'>
            <UploadWidget />
          </div>
        )}
        <ArtGallery isLoggedIn={isLoggedIn} />
      </div>
      <Outlet />
    </ApolloProvider>
  );
}

export default App;