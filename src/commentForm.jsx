import React, { useState } from 'react';
import './comment.css';

function CommentForm({ addComment, replyTo }) {
  const [text, setText] = useState('');
  const [user, setUser] = useState('Anonymous');
  const [dragStartCoords, setDragStartCoords] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (event) => {
    setIsDragging(true);
    setDragStartCoords({ x: event.clientX, y: event.clientY });
  };

  const handleMouseMove = (event) => {
    if (isDragging) {
      const offsetX = event.clientX - dragStartCoords.x;
      const offsetY = event.clientY - dragStartCoords.y;
      setPosition((prevPosition) => ({
        x: prevPosition.x + offsetX,
        y: prevPosition.y + offsetY,
      }));
      setDragStartCoords({ x: event.clientX, y: event.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!text.trim()) return;
    const newComment = {
      id: Date.now(),
      text,
      likes: 0,
      timestamp: new Date(),
      user,
      starred: false,
      replies: [],
    };
    addComment(newComment);
    setText('');
  };

  return (
    <div
      className="comment-form"
      style={{ top: position.y, left: position.x }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <h3 onMouseDown={handleMouseDown}>Add a Comment</h3>
      <form onSubmit={handleSubmit}>
        {replyTo && <p>Replying to: {replyTo.user}</p>}
        <div>
          <label htmlFor="commentText">Comment:</label>
          <input
            type="text"
            id="commentText"
            name="commentText"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your comment"
            autoComplete="off"
          />
        </div>
        <div>
          <label htmlFor="userName">Name:</label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            placeholder="Enter your name"
            autoComplete="off"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CommentForm;
