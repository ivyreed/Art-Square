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
import { useQuery } from "@apollo/client";
import { GET_ART_COUNT_FOR_USER } from "./utils/queries";
import { QUERY_ME } from "./utils/queries";
import { useState, useEffect } from "react";
// import { UserProvider, useUser } from './UserContext';

// import UploadWidget from './components/uploadWidget';
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

function MainApp() {
  const isLoggedIn = AuthService.loggedIn();

  const [user, setUser] = useState(null);

  const { loading, error, data } = useQuery(QUERY_ME, {
    skip: !isLoggedIn,
    fetchPolicy: 'no-cache'
  });

  const { data: artCountData } = useQuery(GET_ART_COUNT_FOR_USER, {
    variables: { username: user?.username },
    skip: !user?.username,
    fetchPolicy: 'no-cache'
});

  useEffect(() => {
    if (data && data.me) {
      setUser(data.me);
    }
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (error) {
    console.error("Error:", error);
    return <p>Error: {error.message}</p>;
  }


const numberOfImages = artCountData?.getAllArtCountForUser || 0;
console.log("Number of Images:", numberOfImages);

  return (
    <>
      <Navbar />
      {isLoggedIn && (
        <ProfileBar
        username={user?.username || 'default_username'}
          avatarUrl="https://via.placeholder.com/150"
          firstName="John"
          lastName="Doe"
          numberOfImages={numberOfImages}
        />
      )}
      <div className='widgetContainer'>
        <ArtGallery isLoggedIn={isLoggedIn} />
      </div>
      <Outlet />
    </>
  );
}

function App() {
  return (
    <ApolloProvider client={client}>
                <MainApp />
    </ApolloProvider>
  );
}
export default App;