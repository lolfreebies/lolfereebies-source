import React from 'react';
import PropTypes from 'prop-types';
import {
  RefinementList,
  SearchBox,
  Hits,
  Configure,
  Highlight,
  Pagination,
} from 'react-instantsearch/dom';
import { InstantSearch } from './instantsearch';
import timeSince from './timeSince';
import orderBy from 'orderby';

const HitComponent = ({ hit }) => (
  <div className="hit">
    <div>
      <div className="hit-picture">
        <a href={`${hit.link}`}>
          <img src={`/static/img/${hit.img}`} /></a>
      </div>
    </div>
    <div className="hit-content">
      <div>
        <Highlight attribute="name" hit={hit} />
        {/* <span> - ${hit.price}</span> */}
        {/* <span> - {hit.rating} stars</span> */}
      </div>
      <div className="hit-type">
        <Highlight attribute="type" hit={hit} />
      </div>
      <div className="hit-description">
        <Highlight attribute="desc" hit={hit} />
      </div>
      {/* <div className="date-posted">{timeSince(new Date(Date.now()-(24*60*60*1000)))} ago</div> */}
      <div className="date-posted">{timeSince(hit.added)} ago</div>
    </div>
  </div>
);

HitComponent.propTypes = {
  hit: PropTypes.object,
};

export default class extends React.Component {
  static propTypes = {
    searchState: PropTypes.object,
    resultsState: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onSearchStateChange: PropTypes.func,
    createURL: PropTypes.func,
  };

  render() {
    return (
      <InstantSearch
        appId="F4SF8LW7UN"
        apiKey="eeda3d5c4ce2e90f270eb439bc67e84c"
        indexName="lolfreebies"
        // appId="latency"
        // apiKey="6be0576ff61c053d5f9a3225e2a90f76"
        // indexName="ikea"
        resultsState={this.props.resultsState}
        onSearchStateChange={this.props.onSearchStateChange}
        searchState={this.props.searchState}
        createURL={this.props.createURL}
      >
        <Configure hitsPerPage={12} />
        <header>
          {/* <h1>React InstantSearch + Next.Js</h1> */}
          <a href="/"><img src="/static/lolfreebies-box-logo.png" style={{width: '170px', marginBottom: '10px'}} alt=""/></a>
          <SearchBox />
        </header>
        <content>
          <menu>
            <h5 style={{margin: '10px 0'}}>Offer Type</h5>
            <RefinementList attribute="type" transformItems={items => orderBy(items, ['label', 'count'], ['asc', 'desc'])} />
            <hr/>
            <h5 style={{margin: '10px 0'}}>Category</h5>
            <RefinementList attribute="category" transformItems={items => orderBy(items, ['label', 'count'], ['asc', 'desc'])} />
            <hr/>
            <h5 style={{margin: '10px 0'}}>Status</h5>
            <RefinementList attribute="status" transformItems={items => orderBy(items, ['label', 'count'], ['asc', 'desc'])} />
            <hr/>
            <h5 style={{margin: '10px 0'}}>Region</h5>
            <RefinementList attribute="region" transformItems={items => orderBy(items, ['label', 'count'], ['asc', 'desc'])} />
          </menu>
          <results>
            <Hits hitComponent={HitComponent} />
          </results>
        </content>
        <footer>
          <Pagination />
          <div>
            See{' '}
            <a href="https://github.com/algolia/react-instantsearch/tree/master/examples/next">
              source code
            </a>{' '}
            on github
          </div>
        </footer>
      </InstantSearch>
    );
  }
}
