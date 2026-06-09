import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import App from './App.tsx';
import Error from './routes/Error/index.tsx';
import './styles/global.css';
import Home from './routes/Home/index.tsx';
import Integrantes from './routes/Integrantes/index.tsx';
import Sobre from './routes/Sobre/index.tsx';
import Faq from './routes/Faq/index.tsx';
import Login from './routes/Login/index.tsx';
import CadastroUsuario from './routes/CadastroUsuario/index.tsx';
import Dashboard from './routes/Dashboard/index.tsx';
import FocoDetalhes from './routes/Dashboard/Foco/FocoDetalhes.tsx';
import Foco from './routes/Dashboard/Foco/Foco.tsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/integrantes", element: <Integrantes /> },
      { path: "/sobre", element: <Sobre /> },
      { path: "/faq", element: <Faq /> },
      { path: "/cadastro", element: <CadastroUsuario /> },
      { path: "/login", element: <Login /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/focos/:id", element: <FocoDetalhes /> },
      { path: "/focos", element: <Foco /> },
      ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
);
