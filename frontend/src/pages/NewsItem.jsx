import { useParams } from 'react-router-dom';
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import PageNewsItem from "../components/PageNewsItem/PageNewsItem";

function NewsItem() {
    const { id } = useParams();
    return ( 
        <>
            <Header />
            <PageNewsItem id={id}/>
            <Footer />
        </>
     );
}

export default NewsItem;