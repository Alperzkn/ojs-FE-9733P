import { useLoaderData } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import { NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

export async function loader() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const usersData = await response.json();

  return usersData;
}

export default function UsersPage() {
  const usersData = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  //console.log(usersData);

  return (
    <>
      <div>
        <div className="container">
          <div className="row">
            <h1>Users Page</h1>

            <Accordion defaultActiveKey="0" className="mt-2">
              {usersData.map((user, key) => (
                <>
                  <Accordion.Item eventKey={user.id} key={key}>
                    <Accordion.Header>{user.name}</Accordion.Header>
                    <Accordion.Body>
                      <Nav.Link as={NavLink} to={"/users/" + user.id}>
                        <p>Username: {user.username}</p>
                      </Nav.Link>
                      <p>Phone: {user.phone}</p>
                      <p>E-mail: {user.email}</p>
                      <p>Website: {user.website}</p>
                    </Accordion.Body>
                  </Accordion.Item>
                </>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </>
  );
}
