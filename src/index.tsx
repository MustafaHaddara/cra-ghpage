import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Link,
  RouterProvider,
  useNavigate,
  useParams,
} from "react-router-dom";
import { initSDK } from "@embrace-io/web-sdk";

const App = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to the Embrace SDK Demo</h1>
      <input
        type="text"
        placeholder="Type something..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        onClick={() => {
          navigate(`/cra-ghpage/name/${name}`);
        }}
      >
        Go to page
      </button>
    </div>
  );
};

const Name = () => {
  const { name } = useParams();
  const [predictedAge, setPredictedAge] = useState<number | null>(null);

  useEffect(() => {
    fetch(`https://api.agify.io?name=${name}`)
      .then((response) => response.json())
      .then((data) => {
        setPredictedAge(data.age);
      });
  }, [name]);

  return (
    <div>
      {predictedAge === null ? (
        <p>Loading...</p>
      ) : (
        <p>
          {name} is probably {predictedAge} years old.
        </p>
      )}
      <Link to={`/cra-ghpage/`}>Back to home</Link>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/cra-ghpage",
    element: <App />,
  },
  {
    path: "/cra-ghpage/name/:name",
    element: <Name />,
  },
]);

try {
  initSDK({
    appID: "zbetj",
    appVersion: "0.0",
  });

  console.log("Successfully initialized the Embrace SDK");
} catch (err) {
  console.error(err);
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
