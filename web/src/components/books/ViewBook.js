import React from 'react'
import { connect } from 'react-redux'
import { Document, Page } from 'react-pdf'

import Header from '../../components/layouts/Header'
import Footer from '../../components/layouts/Footer'
import Loading from '../../components/Loading'

class ViewBook extends React.Component {
  state = {
    numPages: null,
    pageNumber: 1,
    loading: true,
    hasError: false
  }
  
  onDocumentLoadSuccess = ({ numPages, loading = false, hasError = false }) => {
    this.setState({ numPages, loading, hasError })
  }

  onLoadError = ({ hasError = true, loading = false }) => {
    this.setState({ loading, hasError })
  }

  prev = () => {
    this.setState({pageNumber: this.state.pageNumber - 1})
  }

  next = () => {
    this.setState({pageNumber: this.state.pageNumber + 1})
  }

  render() {
    const { numPages, pageNumber, loading, hasError } = this.state

    const nextButton = (pageNumber === numPages || hasError) ? "" : <button className="btn" onClick={this.next}>下一页</button>
    const prevButton = (pageNumber === 1 || hasError) ? "" : <button className="btn white black-text" onClick={this.prev}>上一页</button>
    const _pageNumber = (hasError || loading) ? "" : <p>第{pageNumber}页 / {numPages}页</p>

    const _width = [1, numPages].includes(pageNumber) ? 500 : 1100
    const pages = Array.from(
                    new Array(numPages),
                    (el, index) => (
                      <Page
                        key={`page_${index + 1}`}
                        pageNumber={index + 1}
                        width={_width} 
                        renderMode="svg"
                      />
                    ),
                  )
    const _loading =  <div>
                        <Loading />
                        <p className="center">正在加载绘本...</p>
                      </div>
    const _error = <div>
                    <p className="center red-text">无法加载绘本, 绘本文件不存在, 请联系管理员</p>
                  </div>

    return(
      <div>
        <Header />
        <br/>
        <div className="container center">
          <h4 className="airbnb-font">{this.props.book.name}</h4>
          {prevButton}
          {nextButton}
          {_pageNumber}
        </div>
        <Document
          file={`/books/${this.props.match.params._id}/view`}
          className="pdf-render"
          onLoadSuccess={this.onDocumentLoadSuccess}
          onLoadError={this.onLoadError}
          loading={_loading}
          error={_error}
        >
          {pages[pageNumber - 1]}
        </Document>
        <div className="container center">
          {_pageNumber}
          {prevButton}
          {nextButton}
        </div>
        <br/>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    book: state.booksData.currentBook
  };
}

export default connect(mapStateToProps, null)(ViewBook)