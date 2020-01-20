import React from 'react';
import { render } from '@testing-library/react';
import { UserList } from './UserList';

describe('<UserList />', () => {
  it('renders without crashing', () => {
    render(<UserList/>);
  });
});
