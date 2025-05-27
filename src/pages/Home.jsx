import React from 'react';
import Nav from '../components/Nav';
import '../styles/Home.css';
import { images } from '../../public/assets/images';
import SearchBar from '../components/SearchBar';

function Home() {
    const img_list = Object.entries(images);

    return (
        <div>
            <Nav />
            <SearchBar />
            <div className="image-container">
                {img_list.map(([name, src], index) => (
                    <img key={name} src={src} alt={name} className={`img-${index}`} />
                ))}

            </div>
        </div>
    );
}


export default Home;