import React, { useEffect, useState } from "react";
import axios from "axios";

const UserList = () => {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setListOfUsers(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="user-list">
      <h1>User List</h1>
      <ul>
        {listOfUsers.map((user) => (
          <li key={user.id} className="user-item">
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <p>
              {user.address.street}, {user.address.city}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
