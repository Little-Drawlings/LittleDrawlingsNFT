import React from 'react';
import UserLayout from "../../layout/UserLayout";

const UserRoutes = ({element: Component, page}) => {
    return (
        <UserLayout>
            <Component page={page}/>
        </UserLayout>
    );
};

export default UserRoutes;