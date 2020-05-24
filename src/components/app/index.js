import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoryBody } from '../app/StoryBody';
import { StoryHeader } from '../app/StoryHeader';
import { Link } from '../app/Link';
import { LineChart } from './Linechart';
import { actions } from '../../actions';

export const App = () => {
  const response = useSelector(state => state.app.response);
  const dispatch = useDispatch();
  const [pageNumber, setPage] = useState(((document && document.location.hash) ? document.location.hash.split('#pageId=')[1] : 1) || 1);
  const storyHeader = ['Comments', 'Vote Count','Up Vote', 'News Details'];
  const checkData = (response && response.data.hits) ? true : false;

  useEffect(() => {
    dispatch(actions.fetchPageData(pageNumber));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goPrevious = (event) => {
    event.preventDefault();
    if(pageNumber <= 1) {
      return false;
    } else {
      setPage(parseInt(pageNumber) - 1);
      dispatch(actions.fetchPageData(parseInt(pageNumber) - 1));
      document.location.hash = `#pageId=${parseInt(pageNumber) - 1}`;
    }
  };

  const goNext = (event) => {
    event.preventDefault();
    if(pageNumber >= 1) {
      setPage(parseInt(pageNumber) + 1);
      dispatch(actions.fetchPageData(parseInt(pageNumber) + 1));
      document.location.hash = `#pageId=${parseInt(pageNumber) + 1}`;
    } else {
      return false;
    }
  };

 return (
  <div className='story-container'>
    <table className='hackernews-table table table-striped'>
      <thead className="table-header">
        <tr>
        {storyHeader && storyHeader.map(title => (
          <StoryHeader title={title} key={title}/>
        ))}
        </tr>
      </thead>
      <tbody className="table-body">
      {checkData ? response.data.hits.map((item) => <StoryBody pageNumber={pageNumber} key={item.objectID}  storyDetails={item} />) : null}
      </tbody>
    </table>
    <div className='link-wrapper'>
      <Link label={'Previous'} onClick={goPrevious}/>
      <Link label={'Next'} onClick={goNext}/>
    </div>
    <div className="chart-container" style={{position:'relative', height:'100%', width: '100%'}}>
      <canvas id="myChart"></canvas>
    </div>
    {checkData ? <LineChart chartData={response.chartData}/> : ''}
  </div>
 )
};

