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
import Navbar from './Navbar.js';
import LeftDrawer from './LeftDrawer.js';
import { InstantSearch } from './instantsearch';
import timeSince from './timeSince';
import orderBy from 'orderby';
// import optimizedResize from './optimizedResize.js';

const HitComponent = ({ hit }) => (
  <React.Fragment>
    {/* <p className="full-size" onClick={e => window.open(hit.link, '_blank')} style={{backgroundImage: "url('http://via.placeholder.com/350x150')"}}></p> */}
    <p className="full-size" onClick={e => window.open(hit.link, '_blank')} style={{backgroundImage: `url('/static/img/${hit.img}')`}}></p>
    <div className="body">
      {/* <p className="sponsored">Sponsored</p> */}
      <a className="blurb" href={`${hit.link}`} target="_blank">1 month of service <i className="fa fa-external-link"></i></a>
      {/* <p className="link"><a href={`${hit.link}`}>Old Mother Hubbard Classic Crunchy Natural Dog Treats, Extra Tasty Assortment Mini Biscuits, 20-Ounce Bag</a></p> */}
      {/* <p className="hit-type"><Highlight attribute="name" hit={hit} /></p> */}
      <p className="type"><b><i>{hit.type}</i></b>: {hit.category}</p>
      <p className="link"><a href={`${hit.link}`}>{hit.link}</a></p>
      {/* <div className="hit-description">
        <Highlight attribute="desc" hit={hit} />
      </div> */}
      {/* <p>Status: {hit.status}</p> */}
    </div>
    <div className="footer">
      <i className="fa fa-heart-o"></i>
      <i className="fa fa-share"></i>
    </div>
  </React.Fragment>
);

// const HitComponent = ({ hit }) => (
//   <div className="hit">
//     <div>
//       <div className="hit-picture">
//         <a href={`${hit.link}`}>
//           {/* <img src={`/static/img/${hit.img}`} /> */}
//         </a>
//       </div>
//     </div>
//     <div className="hit-content">
//       <div>
//         <Highlight attribute="name" hit={hit} />
//         {/* <span> - ${hit.price}</span> */}
//         {/* <span> - {hit.rating} stars</span> */}
//       </div>
//       <div className="hit-type">
//         <Highlight attribute="type" hit={hit} />
//       </div>
//       <div className="hit-description">
//         <Highlight attribute="desc" hit={hit} />
//       </div>
//       {/* <div className="date-posted">{timeSince(new Date(Date.now()-(24*60*60*1000)))} ago</div> */}
//       <div className="date-posted">{timeSince(hit.added)} ago</div>
//     </div>
//   </div>
// );

HitComponent.propTypes = {
  hit: PropTypes.object,
};

export default class extends React.Component {
  state = {
    LeftDrawerOpen: true,
    scrollstate: ''
  }

  scrollstate = ''

  handleLeftDrawerToggle = e =>
    this.setState(
      state => ({LeftDrawerOpen: (this.state.LeftDrawerOpen ? false : true)})
    )

  onScroll = e => {
     const container = document.getElementById('__next');
     const distanceToTop = container.getBoundingClientRect().top;

     if (distanceToTop > 75) {
       this.scrollstate = '';
     } else {
       this.scrollstate = 'below-fold';
     }
     this.setState(e => ({ scrollstate: this.scrollstate }))
     // console.log(distanceToTop);
     // console.log(this.scrollstate);
  }

  static propTypes = {
    searchState: PropTypes.object,
    resultsState: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onSearchStateChange: PropTypes.func,
    createURL: PropTypes.func,
  };

  componentDidMount() {
    this.onScroll()
    window && window.addEventListener('scroll', e => this.onScroll());

    // ---------
    var optimizedResize = (function() {

        var callbacks = [],
            running = false;

        // fired on resize event
        function resize() {

            if (!running) {
                running = true;

                if (window) {
                  if (window.requestAnimationFrame) {
                      window.requestAnimationFrame(runCallbacks);
                  } else {
                      setTimeout(runCallbacks, 66);
                  }
                }
            }

        }

        // run the actual callbacks
        function runCallbacks() {

            callbacks.forEach(function(callback) {
                callback();
            });

            running = false;
        }

        // adds callback to loop
        function addCallback(callback) {

            if (callback) {
                callbacks.push(callback);
            }

        }

        return {
            // public method to add additional callback
            add: function(callback) {
                if (!callbacks.length) {
                  if (window) {
                    window.addEventListener('resize', resize);
                  }
                }
                addCallback(callback);
            }
        }
    }());

    // Initial check for media query width...
    if (document.getElementById("__next").offsetWidth < 487) {
      this.setState(() => ({LeftDrawerOpen: false}))
    }

    // On resize, check width and close LeftDrawer if too narrow
    optimizedResize.add(() => {
        // console.log('Resource conscious resize callback!');
        // document && console.log(document.getElementById("__next").offsetWidth);
        if (document.getElementById("__next").offsetWidth < 487) {
          this.setState(() => ({LeftDrawerOpen: false}))
        }
    });
  }

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

        <Navbar handleLeftDrawerToggle={this.handleLeftDrawerToggle} scrollstate={this.state.scrollstate} />

        <LeftDrawer LeftDrawerOpen={this.state.LeftDrawerOpen} scrollstate={this.state.scrollstate} />

        <div className={"main-content " + (this.state.LeftDrawerOpen ? 'LeftDrawerOpen' : '')}>
          <div className="blue-backdrop"></div>
          <Hits hitComponent={HitComponent} />
        </div>

        <footer>
          <Pagination />
          <p className="contribute">
            Contribute or report expired offers in our <a href="https://github.com/lolfreebies/lolfreebies.github.io/issues" target="_blank">issue tracker</a> on GitHub. Thank You.
          </p>
        </footer>
      </InstantSearch>
    );
  }
}
