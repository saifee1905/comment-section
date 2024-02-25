import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faReply, faTrash, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import './comment.css';

function Comment({ comment, onReply, onDelete, onLike, onStar }) {
  const { id, text, likes, user, starred, replies } = comment;

  const handleReply = () => {
    onReply(comment);
  };

  const handleDelete = () => {
    onDelete(id);
  };

  const handleLike = () => {
    onLike(id);
  };

  const handleStar = () => {
    onStar(id);
  };

  return (
    <div className="comment">
      <div>
        <FontAwesomeIcon icon={faStar} className={starred ? "starred" : ""} onClick={handleStar} />
        <p>{text}</p>
      </div>
      <p>User: {user}</p>
      <p>Likes: {likes}</p>
      <button onClick={handleReply}><FontAwesomeIcon icon={faReply} /> Reply</button>
      <button onClick={handleDelete}><FontAwesomeIcon icon={faTrash} /> Delete</button>
      <button onClick={handleLike}><FontAwesomeIcon icon={faThumbsUp} /> Like</button>
      {replies && replies.length > 0 && (
        <div className="replies">
          <h3>Replies:</h3>
          {replies.map(reply => (
            <div key={reply.id} className="reply">
              <p>{reply.text}</p>
              <p>User: {reply.user}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Comment;
