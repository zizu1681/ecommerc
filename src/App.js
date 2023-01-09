import { Routes,Route} from 'react-router-dom';
import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.component.jsx';
import Contact from './routes/contact/contact.component.jsx';

const Shop = () => {

return(
    <h1>I am at the shop page</h1>
)
}
const App = () => {
    return (
    <Routes>
        <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />  
        <Route path='shop' element={<Shop />} /> 
        <Route path='auth' element={<Authentication />} />
        <Route path='contact' element={<Contact />} />  
      </Route>
    </Routes>
  );
};
export default App;