import React, { useState } from "react";
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
  return (
    <div>
      {name} <Link to={"/cra-ghpage"}>Home</Link>
    </div>
  );
};

const Pet = () => {
  const { name, pet } = useParams();
  return (
    <div>
      {name} has a pet {pet}
      <Link to={`/cra-ghpage/name/${name}`}>Back to person</Link>
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
  {
    path: "/cra-ghpage/name/:name/pet/:pet",
    element: <Pet />,
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
