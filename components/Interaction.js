import Image from 'next/image';
import { useEffect, useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';

const fetcher = url => fetch(url).then(res => res.json());

const Interaction = ({ blogId }) => {
  const { mutate } = useSWRConfig();
  const [userid, setuserid] = useState();
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const { data: interactionData } = useSWR(userid ? `/api/interactions/${userid}-${blogId}` : null, fetcher, {
    refreshInterval: 5000
  });
  const { data: blogData } = useSWR(userid ? `/api/blogs/${blogId}` : null, fetcher, { refreshInterval: 5000 });

  useEffect(() => {
    setLiked(interactionData && interactionData.interaction === 1);
    setDisliked(interactionData && interactionData.interaction === -1);
  }, [interactionData]);

  const updateInteraction = interaction => {
    fetch('/api/interactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userBlog: `${userid}-${blogId}`,
        interaction
      })
    })
      .then(res => res.json())
      .then(() => {
        mutate(`/api/blogs/${blogId}`);
      });
  };

  useEffect(() => {
    setuserid(localStorage.getItem('userid'));
  }, []);

  return (
    <div className="w-full flex flex-row p-3 items-center">
      <div className="p-1">
        <Image
          className="hover:cursor-pointer"
          src={liked ? '/like_active.svg' : '/like.svg'}
          height="30px"
          width={'30px'}
          alt="like"
          onClick={() => {
            liked ? updateInteraction(0) : updateInteraction(1);
            liked ? setLiked(false) : setLiked(true);
            setDisliked(false);
          }}
        ></Image>
      </div>
      <div className="p-1">{blogData ? blogData.likes : 0}</div>
      <div className="p-1 pl-7">
        <Image
          className="hover:cursor-pointer"
          src={disliked ? '/dislike_active.svg' : '/dislike.svg'}
          height="30px"
          width={'30px'}
          alt="dislike"
          onClick={() => {
            disliked ? updateInteraction(0) : updateInteraction(-1);
            disliked ? setDisliked(false) : setDisliked(true);
            setLiked(false);
          }}
        ></Image>
      </div>
      <div className="p-1">{blogData ? blogData.dislikes : 0}</div>
    </div>
  );
};

export default Interaction;
