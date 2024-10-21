import Hero from '../components/Hero/Hero';
import HelpCenter from '../components/helpCenter/HelpCenter';
import About from '../components/About/About';
import Projects from '../components/Projects/Projects';
import HelpPayment from '../components/HelpPayment/HelpPayment';
import News from '../components/News/News';
import Specialists from '../components/Specialists/Specialists.jsx';
import PartnersSection from '../components/Partners/PartnersSection.jsx';
import Footer from '../components/Footer/Footer.jsx';
import DocumentsList from '../components/Documents/DocumentsList.jsx';

function Home() {
	return (
		<>
			<Hero />
			<About />
			<Projects />
			<HelpCenter />
			<HelpPayment />
			<News />
			<Specialists />
			<PartnersSection />
			<DocumentsList />
			<Footer />
		</>
	);
}

export default Home;
