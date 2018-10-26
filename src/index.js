import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './styles.css';


export default class CustomPagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            startingPage: 1,
            pageCount: Math.ceil(props.itemCount / props.itemPerPage),
            range: props.range,
        };
    }

    componentWillReceiveProps(nextProps, nextState) {
        const {itemCount, itemPerPage} = this.state;
        if (nextProps.itemCount !== itemCount || nextProps.itemPerPage !== itemPerPage) {
            this.setState({pageCount: Math.ceil(nextProps.itemCount / nextProps.itemPerPage)});
        }
    }

    handlePageChange = (pageNumber) => () => {
        this.setState(({startingPage}, {range}) => ({
            startingPage: Math.max(1, pageNumber - (range / 2)),
            currentPage: pageNumber,
        }));
        if (this.state.currentPage !== pageNumber)
            this.props.onPageChange(pageNumber);
    };

    handlePageIntervalChange = (startingPageChange) => () => {
        this.setState(({startingPage}) => ({
            startingPage: Math.max(startingPage + startingPageChange, 1),
        }));
    };

    renderPages = () => {
        const {range} = this.props;
        const {currentPage, startingPage, pageCount} = this.state;
        const shownPages = [];
        const pageEnding = Math.min(pageCount, startingPage + range);
        const pageBegining = Math.max(Math.min(currentPage - (range / 2), 1), pageEnding - range);
        const {PaginationItem} = this;

        for (let i = Math.max(1, pageBegining); i <= pageEnding; i++) {
            shownPages.push(
                <PaginationItem
                    className={["pagination-box", (currentPage === i) ? "pagination-box-active" : ""].join(" ")}
                    key={String(i)}
                    name={i}
                    onClick={this.handlePageChange(i)}>
                </PaginationItem>);
        }
        return shownPages;
    };

    PaginationItem = ({visible = true, name, onClick, className = "pagination-box"}) => {
        if (visible)
            return (
                <button
                    className={className}
                    onClick={onClick}>
                    {name}
                </button>
            );
        else {
            return null;
        }
    };

    render() {
        const {pageCount, currentPage, startingPage} = this.state;
        const {range} = this.props;
        const {PaginationItem} = this;

        return (
            <div className={"pagination-container"}>
                <PaginationItem
                    onClick={this.handlePageChange(1)}
                    name={"First"}
                    visible={currentPage > 1}/>
                <PaginationItem
                    onClick={this.handlePageChange(currentPage - 1)}
                    name={"Prev"}
                    visible={currentPage > 1}/>

                <PaginationItem
                    onClick={this.handlePageIntervalChange(-range)}
                    name={"..."}
                    visible={startingPage > 1}/>
                {this.renderPages()}
                <PaginationItem
                    onClick={this.handlePageIntervalChange(range)}
                    name={"..."}
                    visible={pageCount > (startingPage + range)}/>
                <PaginationItem
                    onClick={this.handlePageChange(currentPage + 1)}
                    name={"Next"} visible={currentPage !== pageCount}/>
                <PaginationItem
                    onClick={this.handlePageChange(pageCount)}
                    name={"Last"} visible={currentPage !== pageCount}/>
            </div>);
    }
}


CustomPagination.propTypes = {
    range: function (props, propName, componentName) {
        if (!(props[propName] % 2 === 0)) {
            return new Error('range must be even!');
        }
    },
    itemCount: PropTypes.number.isRequired,
    itemPerPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

CustomPagination.defaultProps = {
    range: 6,
};
