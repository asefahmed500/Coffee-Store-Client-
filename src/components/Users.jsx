import { useState } from "react";
import { useLoaderData } from "react-router-dom";

const Users = () => {
    const loadedUsers = useLoaderData();
    const [users,setUsers] = useState(loadedUsers);
    const handledelete = id => {
     
        fetch(`http://localhost:5000/user/${id}`,{
            method : 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            if(data.deletedCount> 0){
               const remainingUsers = users.filter(user => user._id !== id)
               setUsers(remainingUsers)

            }
        })

    }

    return (
        <div>
            <h2 className="text-center font-bold" >Users : {loadedUsers.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            
                            <th>Email</th>
                            <th>CreatedAt</th>
                            <th>ID</th>
                            <th>Last loggedIn </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                       {
                        users.map(user =>
                          <tr key={user._id}>
                            <th>{user.email}</th>
                            <td>{user.createdAt}</td>
                            <td>{user._id}</td>
                            <th>{user.lastLoggedAt}</th>
                            <td>
                                <button  onClick={ () => {handledelete(user._id)}}
                                className="btn">X</button>
                            </td>
                           
                        </tr>
                        )
                       }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;