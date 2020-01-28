import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import { getData as mockGetData } from '../api';
import StarWarsCharacters from './StarWarsCharacters';

jest.mock('../api');

test('Renders a list of star wars characters provided by an api and has previous/next buttons to fetch new lists', async() => {

    mockGetData.mockResolvedValueOnce({
        results: [
            { name: 'Luke Skywalker', url:'lukesurl'}
        ]
    });

    const characterWrapper = render(<StarWarsCharacters/>);
    const previousBtn = characterWrapper.getByText(/previous/i);
    const nextBtn = characterWrapper.getByText(/next/i);

    fireEvent.click(previousBtn);
    fireEvent.click(nextBtn);

    expect(mockGetData).toHaveBeenCalledTimes(1);
    await wait(() => expect(characterWrapper.getByText(/luke/i)))

})
