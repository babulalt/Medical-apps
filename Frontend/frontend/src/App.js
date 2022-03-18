
import './App.css';
import "bootstrap/dist/css/bootstrap-grid.min.css"
import Header from './header/header';
import Mid from './mid/mid';
import Footer from './footer/footer';
import{BrowserRouter} from "react-router-dom"


function App() {
  return (   
 <>
 
 <BrowserRouter>
<Header>
</Header>
<Mid>

</Mid>



	{/* <!-- Footer --> */}
  <Footer>
    
  </Footer>
  </BrowserRouter>
  </>
  
  );
}

export default App;
