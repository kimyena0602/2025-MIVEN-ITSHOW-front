import Rect from "react";
import '../styles/BookGallery.css';
import Nav from '../components/Nav';
import gallery1 from "../assets/images/Gallery-1.png";
import gallery2 from "../assets/images/Gallery.png";

function BookGallery() {
    return(
        <div>
            <Nav />
            <div className="galleryContainer">
                <img src={gallery1} alt="gallery1" className="GalleryMark-1" />
                <img src={gallery2} alt="gallery2" className="GalleryMark-2" />
            </div>
        </div>
    );
}

export default BookGallery;