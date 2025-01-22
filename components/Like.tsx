'use client';

import{ useState } from 'react';
import { Heart  } from 'lucide-react'; // Import icons;
import { auth } from '@/auth';

const LikeButton = ({id:startupId,authorId}:{id:string,author:string}) => {
  const [isLiked, setIsLiked] = useState(false); // State for like status
  const [Liked, setLiked] = useState(false); // State for like status

  const toggleLike = async() => {
    setIsLiked(!isLiked); // Toggle like status
    const response = await fetch('/api/likes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
        startupId,  // Pass the full startup object
          authorId, 
          action:isLiked 
        }),
      });
      const data = await response.json();
    
      if (response.ok) {
        console.log(data.message);
        setLiked(data.message)

      } else {
        console.error('Failed to update like');
      }
  };
     
  

  return (
    <button
      onClick={toggleLike}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '16px',
      }}
      aria-label={isLiked ? 'Unlike' : 'Like'}
    >
      {isLiked ? (
        <Heart fill="red"  className="text-red-600" size={24} />
      ) : (
        <Heart color="black" size={24} />
      )}
      
    </button>
  );
};

export default LikeButton;
