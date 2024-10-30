import { Button } from "react-bootstrap";
import { favoritePhotos } from "../stores/favorites";

export default function HomePage() {
  const favorites = favoritePhotos((state) => state.favorites);

  const increasePopulation = favoritePhotos((state) => state.increasePopulation);

  return (
    <>
      <div>
        <div className="container">
          <div className="row">
            <h1>Home Page</h1>
            <Button onClick={increasePopulation}>increase count</Button>
            {favorites}
          </div>
        </div>
      </div>
    </>
  );
}
