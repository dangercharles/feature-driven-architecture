import React from 'react'
import PropTypes from 'prop-types'

const LoadMoreButton = ({ status, onClick }) => (
  <button
    style={{ fontSize: '150%' }}
    onClick={onClick}
    disabled={status === 'loading'}
  >
    {status === 'loading' ? 'Loading...' : 'Load More'}
  </button>
)

const Loading = ({ label }) => (
  <h2>
    <i>{label}</i>
  </h2>
)

const Empty = () => (
  <h1>
    <i>Nothing here!</i>
  </h1>
)

const List = props => {
  const {
    status,
    nextPageUrl,
    lastPageUrl,
    items,
    renderItem,
    loadingLabel,
    onLoadMore,
  } = props

  const isEmpty = items.length === 0
  const isLastPage = !nextPageUrl
  const isSinglePage = nextPageUrl === lastPageUrl

  if (isEmpty && status === 'loading') {
    return <Loading label={loadingLabel} />
  }

  if (isEmpty && isLastPage) {
    return <Empty />
  }

  return (
    <div>
      {items.map(renderItem)}
      {!isSinglePage &&
        !isLastPage && <LoadMoreButton status={status} onClick={onLoadMore} />}
    </div>
  )
}

List.propTypes = {
  loadingLabel: PropTypes.string.isRequired,
  renderItem: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  status: PropTypes.oneOf(['loading', 'loaded']).isRequired,
  onLoadMore: PropTypes.func.isRequired,
  pageCount: PropTypes.number,
  nextPageUrl: PropTypes.string,
}

List.defaultProps = {
  status: 'loaded',
  loadingLabel: 'Loading...',
  items: [],
}

export default List