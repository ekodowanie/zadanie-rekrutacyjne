import React from 'react';
import { render } from '@testing-library/react';
import { UserItem } from './UserItem';
import { UserInterface } from '../../../types';

describe('<UserItem />', () => {
  it('renders without crashing', () => {
    const userMock: UserInterface = {
        name: 'test',
        street: 'test',
        town: 'test',
        postCode: '123123',
        state: 'test'
    };
    render(<UserItem data={userMock}/>);
  });
});
