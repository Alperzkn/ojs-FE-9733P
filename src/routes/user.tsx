import { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useLoaderData, useParams } from "react-router-dom";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: object;
  phone: string;
  website: string;
  company: object;
}

interface LoaderParams {
  userId: string;
}

export async function loader({ params }: { params: LoaderParams }) {
  const { userId } = params;
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/users/" + userId
  );
  const userData = (await response.json()) as User;
  //console.log(userData);

  const userNotFound = !userData.id;

  if (userNotFound) {
    throw new Response("", {
      status: 404,
      statusText: "User Not Found",
    });
  }

  return { user: userData };
}

async function getPosts() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/");
  const postsData = await response.json();
  return postsData;
}

async function getAlbums() {
  const response = await fetch("https://jsonplaceholder.typicode.com/albums/");
  const albumsData = await response.json();
  console.log(albumsData);
  return albumsData;
}

async function getTodos() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/");
  const todosData = await response.json();
  return todosData;
}

export default function UserPage() {
  const [posts, setPosts] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [todos, setTodos] = useState([]);

  const { user } = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const { userId } = useParams() as unknown as LoaderParams;
  //console.log("user address -->  " + user.address);

  useEffect(() => {
    (async () => {
      const postsData = await getPosts();
      //console.log("postsData --> " + JSON.stringify(postsData));
      const albumsData = await getAlbums();

      const userAlbums = albumsData.filter((el) => el.userId == 1);
      console.log("user albums --> " + userAlbums);
      setAlbums(userAlbums);
      setPosts(postsData);
    })();
  }, []);

  return (
    <>
      <div>
        <div className="container">
          <div className="row">
            <h1 className="mb-3">Users Page</h1>
            <Tabs
              defaultActiveKey="profile"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="home" title="User">
                <p>{userId}</p>
                <p>{user.name}</p>
                <p>{user.username}</p>
                <p>{user.address.city}</p>
                <p>{user.address.street}</p>
                <p>{JSON.stringify(posts[0])}</p>
                {albums.map((n) => n.id)}
              </Tab>
              <Tab eventKey="album" title="Album">
                {albums.map((album, key) => (
                  <>
                    <div className="card my-1">
                      <div className="card-header d-flex justify-content-between">
                        {album.id}
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-success disabled "
                        >
                          Album ID{" "}
                          <span className="badge text-dark">
                            {album.id}
                          </span>
                        </button>
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">{album.title}</h5>
                        <div className="d-flex justify-content-end">
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-success disabled"
                          >
                            User ID{" "}
                            <span className="badge text-dark ">
                              {album.userId}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
              </Tab>
              <Tab eventKey="todos" title="Todos">
                Tab content for Contact
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}
