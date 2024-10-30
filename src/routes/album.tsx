import { useLoaderData, useParams } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
//import { Accordion, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Accordion, Button, Card, Nav, Row, Stack } from "react-bootstrap";

interface Album {
  userId: number;
  id: number;
  title: string;
}

interface LoaderParams {
  albumId: string;
}

export async function loader({ params }: { params: LoaderParams }) {
  const { albumId } = params;
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/albums/" + albumId
  );
  const albumData = (await response.json()) as Album;
  console.log("post data -->  " + JSON.stringify(albumData));

  const albumNotFound = !albumData.id;

  if (albumNotFound) {
    throw new Response("", {
      status: 404,
      statusText: "User Not Found",
    });
  }

  return { album: albumData };
}

async function getAlbums(albumId) {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/albums/" + albumId + "/photos"
  );
  const albumsData = await response.json();
  return albumsData;
}

export default function AlbumPage() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const { album } = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const [error, setError] = useState<any>();
  const { albumId } = useParams() as unknown as LoaderParams;

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        console.log(albumId);
        const albumData = await getAlbums(albumId);

        setPhotos(albumData);
      } catch (e) {
        setError(e);
        console.log(e);
      }
      setLoading(false);
    })();
  }, []);

  if (error) {
    return (
      <>
        <h1>Couldn't get data</h1>
      </>
    );
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div as={Tab}>
            <h3>Album Page</h3>
            {loading && <Spinner animation="grow" />}
            {!loading && (
              <>
                <div className="card my-3">
                  <div className="card-header d-flex justify-content-between">
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-success disabled "
                    >
                      Album ID{" "}
                      <span className="badge text-dark">{album.id}</span>
                    </button>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{album.title}</h5>
                    <p>{album.body}</p>
                    <div className="d-flex justify-content-end">
                      <Nav.Link as={NavLink} to={"/users/" + album.userId}>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-success disabled"
                        >
                          User ID{" "}
                          <span className="badge text-dark ">
                            {album.userId}
                          </span>
                        </button>
                      </Nav.Link>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="mb-3">Album Photos</h2>
                  <Row className="m-3 text-center d-flex justify-content-between">
                    {photos.map((photo, key) => (
                      <Card
                        style={{ width: "18rem" }}
                        key={photo.id}
                        className="m-1 p-1 "
                      >
                        <div className="d-flex justify-content-between">
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-success disabled m-1"
                          >
                            Photo ID{" "}
                            <span className="badge text-dark ">{photo.id}</span>
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-danger m-1"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-heart me-1"
                              viewBox="0 0 16 16"
                            >
                              <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"></path>
                            </svg>
                            Favorite
                          </button>
                        </div>
                        <Card.Img variant="top" src={photo.url} alt={photo.thumbnailUrl}/>
                        <Card.Body>
                          <Card.Title>{photo.title}</Card.Title>
                        </Card.Body>
                      </Card>
                    ))}
                  </Row>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
