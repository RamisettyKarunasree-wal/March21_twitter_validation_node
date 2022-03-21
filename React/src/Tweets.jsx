import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Tweets() {
  const [tweetErrors, setErrors] = useState(['klajdkahs']);
  const [tweets, setTweets] = useState([
    {
      title: 'Mobile',
      body: '300',
      date: 'good camera',
      author: 'available',
      category: 'toys',
    },
  ]);
  const getTweets = () => {
    axios
      .get('/tweets')
      .then((res) => {
        setTweets(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getTweets();
  }, []);
  const addTweet = (event) => {
    event.preventDefault();
    const tweetsObj = {
      title: event.target.title.value,
      body: event.target.body.value,
      date: event.target.date.value,
      author: event.target.author.value,
      category: event.target.category.value,
    };
    axios
      .post('/tweets', tweetsObj)
      .then((res) => {
        console.log(res.data);
        if (res.data.status === 0) {
          console.log(res.data.debug_errors.errors);
          setErrors(res.data.debug_errors.errors);
        } else {
          setErrors([]);
        }
        getTweets();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteItem = (index) => {
    axios
      .delete(`/tweets/${index}`)
      .then((res) => {
        console.log(res.data);
        getTweets();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteAll = () => {
    axios
      .delete('/tweets')
      .then((res) => {
        getTweets();
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="tweets-container">
      <div className="tweets-form">
        <h1>Add Tweet</h1>
        <form onSubmit={addTweet}>
          <p>
            <input type="text" name="title" placeholder="Enter Tweet Title" />
          </p>
          <p>
            <input type="date" name="date" placeholder="Choose Date" />
          </p>
          <p>
            <textarea placeholder="Enter body" name="body" />
          </p>
          <p>
            <input type="text" name="author" placeholder="Enter author" />
          </p>
          <p>
            <b>Select Category:</b>
            <select name="category">
              <option value="entertainment">Entertainment</option>
              <option value="study">Study</option>
              <option value="politics">Politics</option>
              <option value="sports">Sports</option>
            </select>
          </p>
          <button type="submit">Add Tweet</button>
        </form>
        <button type="button" onClick={deleteAll}>
          Delete All tweets
        </button>
        {tweetErrors.map((val) => (
          <div className="error">{val.msg}</div>
        ))}
      </div>
      <div className="tweets-list">
        <h1>tweets List</h1>
        <div className="tweets-list-box">
          {tweets.map((val, ind) => (
            <div className="tweets-item">
              <div className="author">{val.author}</div>
              <div className="title">
                {val.title}({val.category})
              </div>
              <div className="body">{val.body}</div>
              <div className="date">posted on {val.date}</div>
              <div>
                <button
                  type="button"
                  onClick={() => {
                    deleteItem(ind);
                  }}
                >
                  delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Tweets;
