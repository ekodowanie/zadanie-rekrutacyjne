import React, { FunctionComponent, useEffect, useState, useCallback } from 'react';
import { Wrapper } from './UserList.styles';
import { fetchUsers } from '../../services/User';
import { Table } from 'react-bootstrap';
import { UserItem } from '../general/UserItem';
import { UserInterface } from '../../types';

export const UserList: FunctionComponent = () => {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState();

    const getUsersList = useCallback(async () => {
        setLoading(true);
        setUsers(await fetchUsers());
        setLoading(false);
    }, []);

    useEffect(() => {
        getUsersList();
    }, [getUsersList]);

    return (
        <Wrapper>
            {loading ? (
                'Loading...'
            ) :
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Street</th>
                        <th>Postcode</th>
                        <th>Town</th>
                        <th>Federal state</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map( (user: UserInterface, index: number) => (
                        <UserItem data={user} key={index}/>
                    ))}
                </tbody>
            </Table>
            }
        </Wrapper>
    )
};