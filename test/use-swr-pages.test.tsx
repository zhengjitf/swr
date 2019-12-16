import React from 'react'
import { cleanup, render } from '@testing-library/react'

import { useSWRPages, mutate } from '../src'

describe('useSWRPages', () => {
  afterEach(cleanup)

  it('should render the first page componet', async () => {
    mutate('page-1-content', 'foo')
    function Page() {
      const { pages, pageSWRs } = useSWRPages('page-1', () => 'page-1-content')

      console.log(pageSWRs)

      return <>{pages}</>
    }
    const { container } = render(<Page />)
    expect(container.textContent).toMatchInlineSnapshot(`"page 0"`)
  })

  // it('should render the multiple pages', async () => {
  //   function Page() {
  //     const { pages, pageCount, isLoadingMore, loadMore } = useSWRPages<
  //       number,
  //       string,
  //       any
  //     >(
  //       'page-2',
  //       ({ offset, withSWR }) => {
  //         const { data } = withSWR(useSWR(String(offset || 0), v => v))
  //         return 'page ' + data + ', '
  //       },
  //       (_, index) => index + 1
  //     )

  //     useEffect(() => {
  //       // load next page if the current one is ready
  //       if (pageCount <= 2 && !isLoadingMore) loadMore()
  //     }, [pageCount, isLoadingMore])

  //     return pages
  //   }
  //   const { container } = render(<Page />)
  //   await waitForDomChange({ container }) // mount
  //   // should have 3 pages
  //   expect(container.textContent).toMatchInlineSnapshot(
  //     `"page 0, page 1, page 2, "`
  //   )
  // })
})
