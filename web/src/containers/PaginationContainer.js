import React from 'react';
import Pagination from '../components/layouts/Pagination';

class PaginationContainer extends React.Component {
  constructor(props) {
    super(props);
    let pages = Math.ceil((this.props.data.length / this.props.itemsPerPage));
    this.state = {
      pages: pages,
      currentPage: 1,
      searchQuery: ''
    };

    this.updateCurrentPage = this.updateCurrentPage.bind(this);
    this.goToPage = this.goToPage.bind(this);
  }

  updateCurrentPage(i) {
    let pageToGo = this.state.currentPage + i;
    let currentPage = ((pageToGo <= 0) || (pageToGo > this.state.pages)) ? this.state.currentPage : pageToGo;
    this.setState({
      currentPage: currentPage
    });
  }

  goToPage(page) {
    this.setState({
      currentPage: page
    });
  }

  render() {
    let startIdx = (this.state.currentPage - 1) * this.props.itemsPerPage;
    let data = this.props.data.slice(startIdx, startIdx + this.props.itemsPerPage);
    const { children } = this.props;
    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, { data: data })
    );

    return(
      <div>
        {childrenWithProps}
        <Pagination 
          currentPage = {this.state.currentPage}
          pages = {this.state.pages}
          updateCurrentPage = {this.updateCurrentPage}
          goToPage = {this.goToPage}
        />
      </div>
    );
  }
};

export default PaginationContainer;