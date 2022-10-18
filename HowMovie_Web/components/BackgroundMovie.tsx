import { MoonIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { NextPage } from 'next';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface Props {
  currID: number;
}

const BackgroundMovie = ({ currID }: Props) => {
  const baseUrl = 'https://image.tmdb.org/t/p/original';
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const [moviePath, setMoviePath] = useState<any>('');
  const [backDrop, setBackDrop] = useState<any>('');

  useEffect(() => {
    const fetchBackgroundPath = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:8000/moviedetail?movie_id=${currID}`
        );
        setBackDrop(res.data.result[0].detail[0].backdrop_path);
        setMoviePath(res.data.result[0].detail[0].video);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err);
        }
      }
      setLoading(false);
    };
    fetchBackgroundPath();
  }, [currID]);

  loading && <div>로딩중</div>;
  error && <div>에러 발생</div>;
  !moviePath && null;

  return (
    <>
      {moviePath !== '' ? (
        <div className="relative w-full max-w-[1000px] pb-[350px] bg-black rounded-xl">
          <iframe
            className="w-full h-full max-h-[350px] absolute rounded-xl"
            src={`https://www.youtube.com/embed/${moviePath}?autoplay=1&fs=0&modestbranding=1&disablekb=1&controls=0`}
            title="YouTube video player"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
      ) : backDrop !== '' ? (
        <div className="relative w-full max-w-[1000px] pb-[350px] bg-black rounded-t-xl">
          <Image
            src={baseUrl + backDrop}
            layout="fill"
            alt="backDrop"
            className="rounded-t-xl"
          />
        </div>
      ) : null}
    </>
  );
};

export default BackgroundMovie;
