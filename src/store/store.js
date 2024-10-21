import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from '../features/API/projects/projectsSlice';
import AboutCentreReducer from '../features/API/aboutCentre/aboutCentreSlice';
import expertsReducer from '../features/API/experts/expertsSlice';
import newsReducer from '../features/API/news/newsSlice';
import contactsReducer from '../features/API/contacts/contactsSlice';
import partnersReducer from '../features/API/partners/partnersSlice';
import reportsReducer from '../features/API/reports/reportsSlice';
import kindergartenReducer from '../features/API/kindergarten/kindergartenSlice';
import schoolReducer from '../features/API/school/schoolSlice';
import srvReducer from '../features/API/srv/srvSlice';
import workshopReducer from '../features/API/workshop/workshopSlice';
import gardenReducer from '../features/API/garden/gardenSlice';
import metricsReducer from '../features/API/metrika/metricsSlice';
import registerReducer from '../features/API/register/registerSlice';
import loginReducer from '../features/API/auth/loginSlice'

export const store = configureStore({
	reducer: {
		projects: projectsReducer,
		aboutCentre: AboutCentreReducer,
		experts: expertsReducer,
		news: newsReducer,
		contacts: contactsReducer,
		partners: partnersReducer,
		reports: reportsReducer,
		kindergarten: kindergartenReducer,
		school: schoolReducer,
		srv: srvReducer,
		workshop: workshopReducer,
		garden: gardenReducer,
		metrika: metricsReducer,
		register: registerReducer,
		auth: loginReducer,
	}
});
