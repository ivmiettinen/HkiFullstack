import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders blogs title and author', () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Frankie',
    }

    const component = render(<Blog blog={blog} />)

    expect(component.container).toHaveTextContent(
        'Component testing is done with react-testing-library'
    )
    expect(component.container).toHaveTextContent('Frankie')
})

test('clicking the like-button calls event handler once', async () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Frankie',
    }

    const mockHandler = jest.fn()

    const component = render(<Blog blog={blog} addNewLike={mockHandler} />)

    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
})
