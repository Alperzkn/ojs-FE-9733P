import { useLoaderData, useParams } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { Accordion, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface LoaderParams {
  postId: string;
}

export async function loader({ params }: { params: LoaderParams }) {
  const { postId } = params;
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts/" + postId
  );
  const postData = (await response.json()) as Post;
  console.log("post data -->  " + JSON.stringify(postData));

  const postNotFound = !postData.id;

  if (postNotFound) {
    throw new Response("", {
      status: 404,
      statusText: "User Not Found",
    });
  }

  return { post: postData };
}

async function getComments(postId) {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts/" + postId + "/comments"
  );
  const commentsData = await response.json();
  return commentsData;
}

export default function PostPage() {
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState<any>();
  const { post } = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const { postId } = useParams() as unknown as LoaderParams;

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        console.log(postId);
        const postsData = await getComments(postId);

        setComments(postsData);
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
            <h3>Post Page</h3>
            {loading && <Spinner animation="grow" />}
            {!loading && (
              <>
                <div className="card my-3">
                  <div className="card-header d-flex justify-content-between">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-success disabled "
                      >
                        Post ID{" "}
                        <span className="badge text-dark">{post.id}</span>
                      </button>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <p>{post.body}</p>
                    <div className="d-flex justify-content-end">
                      <Nav.Link as={NavLink} to={"/users/" + post.userId}>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-success disabled"
                        >
                          User ID{" "}
                          <span className="badge text-dark ">
                            {post.userId}
                          </span>
                        </button>
                      </Nav.Link>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="mb-3">Comments</h2>
                  <Accordion defaultActiveKey="0" className="mt-2">
                    {comments.map((comment, key) => (
                      <Accordion.Item eventKey={comment.id} key={key}>
                        <Accordion.Header>{comment.name}</Accordion.Header>
                        <Accordion.Body>
                          <p>Email: {comment.email}</p>
                          <p>Phone: {comment.body}</p>
                        </Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
