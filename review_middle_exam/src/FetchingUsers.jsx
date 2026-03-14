import React, { use } from 'react'

const fetchUser = fetch('https://jsonplaceholder.typicode.acom/users')
    .then(res => res.json());

function FetchingUsers() {
    const users = use(fetchUser);
    return (
        <>
            {users.map((user) => {
                return (
                    <div
                        key={user.id}
                        style={{
                            display: "flex"
                        }}
                    >
                        <div>
                            {user.name}
                        </div>
                        -
                        <div>
                            {user.email}
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default FetchingUsers
