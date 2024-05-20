import { render } from '@redwoodjs/testing/web'

import ArrayPage from './ArrayPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ArrayPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ArrayPage />)
    }).not.toThrow()
  })
})
