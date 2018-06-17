import React from 'react';
import {
  RefinementList,
  ClearRefinements,
  // Panel,
  // MenuSelect
} from 'react-instantsearch/dom';
import orderBy from 'orderby';

export default ({LeftDrawerOpen, scrollstate}) =>
  <div id="LeftDrawer" className={`${(LeftDrawerOpen ? 'LeftDrawerOpen' : '')} ${scrollstate}`}>
    <div className="LeftDrawer-container">
      <ClearRefinements translations={{reset: "Clear All"}} />
      <div className="facet-group">
        <h5>Offer Type</h5>
        <RefinementList attribute="type" transformItems={items => orderBy(items, ['label', 'count'], ['asc', 'desc'])} />
      </div>

      <div className="facet-group">
        <h5>Category</h5>
        <RefinementList attribute="category" transformItems={items => orderBy(items, ['label', 'count'], ['asc', 'desc'])} />
      </div>

      <div className="facet-group">
        <h5>Status</h5>
        <RefinementList attribute="status" transformItems={items => orderBy(items, ['label', 'count'], ['asc', 'desc'])} />
      </div>
    </div>
  </div>
