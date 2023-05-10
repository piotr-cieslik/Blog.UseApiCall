import { useEffect, useState } from "react";
import { GitHubClient, GitHubUser } from "./GitHubClient";

function App() {
  var client = new GitHubClient();

  const [user, setUser] = useState<GitHubUser>();
  const [error, setError] = useState<string>();
  const [loadingUser, setLoadingUser] = useState(false);

  useEffect(() => {
    setLoadingUser(true);
    client.getUser('piotr-cieslik22')
      .then(x => {
        if(x.ok){
          setUser(x.data)
        }
        else{
          setError(x.error)
        }
      })
      .finally(() => setLoadingUser(false))
  }, [])


  return (
    <div>
      {loadingUser &&
        <p>Loading...</p>
      }
      {user &&
        <p>User name is: {user.name}</p>
      }
      {error &&
        <p>Ups, error: {error}</p>
      }
    </div>
  );
}

export default App;
