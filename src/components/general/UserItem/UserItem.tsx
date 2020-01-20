import React, { FunctionComponent, useEffect, useState, useCallback } from 'react';
import { fetchUserFederalState } from '../../../utils';
import { UserInterface } from '../../../types';

interface UserItemProps {
    data: UserInterface;
};

export const UserItem: FunctionComponent<UserItemProps> = ({
    data: {name, street, postCode, town}
}) => {
    const [loading, setLoading] = useState(false);
    const [federalState, setFederalState] = useState<string>();

    const getUsersList = useCallback(async () => {
        setLoading(true);
        setFederalState(await fetchUserFederalState(town));
        setLoading(false);
    }, [town]);

    useEffect(() => {
        getUsersList();
    }, [getUsersList]);

    return (
        <tr>
            <td>{name}</td>
            <td>{street}</td>
            <td>{postCode}</td>
            <td>{town}</td>
            <td>{loading ? 'loading...' : federalState}</td>
        </tr>
    )
};
