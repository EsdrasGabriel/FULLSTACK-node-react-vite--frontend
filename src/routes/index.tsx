import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Button } from "@mui/material";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Button variant="contained" color="primary">Teste</Button>,
  },
  {
    path: "*",
    element: <Navigate to="/"/>
  },
]);
