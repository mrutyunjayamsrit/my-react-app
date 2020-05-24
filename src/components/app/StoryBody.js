/* global URL*/
import React from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../../actions';

export const StoryBody = ({ storyDetails, pageNumber }) => {
  const {
    author,
    created_at,
    num_comments,
    objectID,
    points,
    title,
    url,
    visible
  } = storyDetails;

  const dispatch = useDispatch();

  let hostname = url ? (new URL(url).origin) : '';
  const postedAt = Math.floor((new Date() - new Date(created_at)) / 36e5);
  const increasePoints = (event) => {
    const { id, points} = event.target.dataset;
    localStorage.setItem(`${id}points`, parseInt(points) + 1);
    dispatch(actions.fetchPageData(pageNumber));
  }

  const hideStory = (event) => {
    const { id } = event.target.dataset;
    localStorage.setItem(`${id}hide`, true);
    dispatch(actions.fetchPageData(pageNumber));
  }


  return <tr key={objectID} className={`text-body ${!visible ? 'hidden' : ''}`}>
    <td>{num_comments}</td>
    <td>{points}</td>
    <td><span className="arrow-up" data-id={objectID} data-points={points} onClick={increasePoints}></span></td>
    <td>
      <span className="story-title">{title} </span>
      <span className="story-url"><a href={url}>({hostname})</a></span>
      <span className="story-author text-secondary"> by 
        <span className="text-body"> {author} </span>
      </span>
      <span className="text-secondary">{postedAt} hours ago</span>
      <span className="hide-story" data-id={objectID} onClick={hideStory}> [hide] </span>
    </td>
    </tr>;
};
