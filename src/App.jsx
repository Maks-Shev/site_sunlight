import Home from "./pages/Home";
import Partners from './pages/Partners';
import NotFound from "./pages/NotFound";
import "./style/App.scss";
import { Route, Routes } from "react-router-dom";
import Contacts from "./pages/Contacts";
import Specialists from "./pages/Specialists";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Garden from "./pages/Garden";
import Workshops from "./pages/Workshops";
import News from './pages/News';
import NewsItem from './pages/NewsItem';
import AboutSpecialist from "./pages/AboutSpecialist"
import SRV from "./pages/Srv";
import School from "./pages/School";
import OpenProject from './pages/OpenProject';
import Reports from './pages/Reports';
import TestPage from './pages/TestPage';
import ScrollTop from './components/ScrollTop';
import Volunteer from './pages/Volunteer';
import ServiceUnavailable from './pages/ServiceUnavailable';
import TerritoryOfSuccess from './pages/TerritoryOfSuccess';
import Authorization from './pages/Authorization';
import Register from './pages/Register';
import ConfirmEmail from './pages/ConfirmEmail';
import MetricsComponent from './components/MetricsComponent';
import Profile from  './pages/Profile';


function App() {
	return (
		<>
			<ScrollTop />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/about' element={<About />} />
				<Route path='/partners' element={<Partners />} />
				<Route path='/contacts' element={<Contacts />} />
				<Route path='*' element={<NotFound />} />
				<Route path='/specialists' element={<Specialists />} />
				<Route path='/projects' element={<Projects />} />
				<Route
					path='/aboutSpecialist/:surname/:name/:patronymic'
					element={<AboutSpecialist />}
				/>
				<Route path='/SRV' element={<SRV />} />
				<Route path='/School' element={<School />} />
				<Route path='/garden' element={<Garden />} />
				<Route path='/workshops' element={<Workshops />} />
				<Route path='/openProject/:id' element={<OpenProject />} />
				<Route path='/reports' element={<Reports />} />
				<Route path='/news' element={<News />} />
				<Route path='/news/:id' element={<NewsItem />} />
				<Route path='/volunteer' element={<Volunteer />} />
				<Route path='/serviceUnavailable' element={<ServiceUnavailable />} />
				<Route path='/test' element={<TestPage />} />
				<Route path='/territoryOfSuccess' element={<TerritoryOfSuccess />} />
                <Route path='/authorization' element={<Authorization/>} />
                <Route path='/register' element={<Register/>} />
				<Route path='/confirm-email' element={<ConfirmEmail/>} />
				<Route path='/metrics' element={<MetricsComponent />} />
				<Route path='/profile' element={<Profile />} />
			</Routes>
		</>
	);
}

export default App;
