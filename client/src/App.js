import React, { useState, useEffect } from "react";
import axios from "axios";

const PORT = 5001;

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
      axios
      .get(`http://localhost:${PORT}/api/users`)
        .then((response) => {
          setUsers(response.data);
        })
        .catch((error) => {
          console.error("There was an error fetching the users!", error);
        });
  };

  const addUser = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:${PORT}/api/users`, { name, email })
      .then((response) => {
        setUsers([...users, response.data]);
        setName("");
        setEmail("");
      })
      .catch((error) => {
        console.error("There was an error adding the user!", error);
      });
  };

  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:${PORT}/api/users/${id}`)
      .then(() => {
        setUsers(users.filter((user) => user.id !== id));
      })
      .catch((error) => {
        console.error("There was an error deleting the user!", error);
      });
  };

  return (
    <div className="App" style={{ padding: "20px" }}>
      <h1>User Management</h1>

      {/* Form to add a new user */}
      <form onSubmit={addUser} style={{ marginBottom: "20px" }}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required style={{ marginRight: "10px", padding: "5px" }} />
        <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ marginRight: "10px", padding: "5px" }} />
        <button type="submit" style={{ padding: "5px 10px" }}>
          Add User
        </button>
      </form>

      {/* Display the list of users in a table */}
      <table border="1" cellPadding="10" cellSpacing="0" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => deleteUser(user.id)} style={{ padding: "5px 10px" }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}>
                No users available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
