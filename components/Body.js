import blogsJson from '../libs/blogs.json';
import Interaction from '../components/interaction';
import styles from '../styles/Body.module.css';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const Body = () => {
  const [blogs, setBlogs] = useState(blogsJson.slice(0, 5));
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (blogs.length !== blogsJson.length) {
        const target = document.getElementById(blogs.at(-1).id);
        if (target && target.getBoundingClientRect().bottom - window.innerHeight < 0) {
          setisLoading(true);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [blogs]);

  useEffect(() => {
    if (!isLoading) return;
    setTimeout(() => {
      setBlogs(blogsJson.slice(0, blogs.length + 2));
      setisLoading(false);
    }, 2000);
  }, [isLoading, blogs]);
  return (
    <div className="flex flex-col items-center">
      <div className="max-w-4xl my-8 rounded bg-slate-700 bg-opacity-25">
        <ul>
          {blogs.map(blog => (
            <li key={blog.id} id={blog.id}>
              <div className="flex flex-col p-2 m-14 shadow-md rounded bg-white">
                <div className="flex flex-row border-b border-gray-300">
                  <div className="w-1/2 flex justify-start align-middle text-2xl ">{blog.title}</div>
                  <div className="w-1/2 flex justify-end align-middle">
                    {blog.categories.slice(0, 3).map(category => (
                      <div className="m-1 bg-slate-700 text-white p-1 rounded" key={`${blog.id}-${category}`}>
                        {category}
                      </div>
                    ))}
                  </div>
                </div>
                <div className={styles.text}>{blog.text}</div>
                <div className="text-right p-2 italic border-b border-gray-300"> - {blog.author}</div>
                <Interaction blogId={blog.id} />
              </div>
            </li>
          ))}
        </ul>
        <div className="w-full flex justify-center p-3">
          {isLoading ? <Image src={'/puff.svg'} width="80px" height={'80px'} alt="Loading" /> : ''}
        </div>
      </div>
    </div>
  );
};

export default Body;
