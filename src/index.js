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

        for (let i = pageBegining; i <= pageEnding; i++) {
            shownPages.push(
                <div
                    className={["pagination-box", (currentPage === i) ? "pagination-box-active" : ""].join(" ")}
                    key={String(i)}
                    onClick={this.handlePageChange(i)}>
                    {i}
                </div>);
        }
        return shownPages;
    };

    render() {
        const {pageCount, currentPage, startingPage} = this.state;
        const {range} = this.props;

        return (
            <div className={"pagination-container"}>
                {currentPage === 1 ? null :
                    <span>
                        <span
                            className={"pagination-box"}
                            style={{borderBottomLeftRadius: 4, borderTopLeftRadius: 4}}
                            onClick={this.handlePageChange(1)}
                            disabled={currentPage === 1}>
                            First
                        </span>
                        <span
                            className={"pagination-box"}
                            onClick={this.handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >Prev
                        </span>
                    </span>
                }
                {startingPage > 1 ?
                    <span
                        className={"pagination-box"}
                        onClick={this.handlePageIntervalChange(-range)}
                    >...
                    </span> : null
                }
                {this.renderPages()}
                {pageCount > (startingPage + range) ?
                    <span
                        className={"pagination-box"}
                        onClick={this.handlePageIntervalChange(range)}
                    >...
                    </span> : null
                }
                {currentPage === pageCount ? null :
                    <span>
                        <span
                            className={"pagination-box"}
                            onClick={this.handlePageChange(currentPage + 1)}
                            disabled={currentPage === pageCount}
                        >Next
                        </span>
                        <span
                            className={"pagination-box"}
                            onClick={this.handlePageChange(pageCount)}
                            disabled={currentPage === pageCount}
                        >Last
                        </span>
                    </span>
                }
            </div>);
    }
}


CustomPagination.propTypes = {
    range: PropTypes.number,
    itemCount: PropTypes.number.isRequired,
    itemPerPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

CustomPagination.defaultProps = {
    range: 6,
};
