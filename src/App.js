import { ToastContainer } from 'react-toastify'; 
import { AuthProvider } from './Component/context/AuthContext';
import { getToken } from './Helper/Storage'; 
import PublicRouter from './Router/PublicRouter'; 
import "react-toastify/dist/ReactToastify.css";

function App() {
  const token = getToken("@userToken");  
  return (
    <AuthProvider >
       <ToastContainer autoClose={1500} />
       <PublicRouter/> 
    </AuthProvider>
  );
}

export default App;
