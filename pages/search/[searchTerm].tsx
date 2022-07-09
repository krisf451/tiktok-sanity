import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Router, useRouter } from 'next/router';
import { GoVerified } from 'react-icons/go';
import axios from 'axios';

import { VideoCard, NoResults } from '../../components';
import { IUser, Video } from '../../types';
import { BASE_URL } from '../../utils';
import useAuthStore from '../../store/auth';

const Search = ({ videos }: { videos: Video[] }) => {
  const [isAccounts, setIsAccounts] = useState(false);
  const router = useRouter();
  const { searchTerm } = router.query;
  const accounts = isAccounts ? 'border-b-2 border-black' : 'text-gray-400';
  const isVideos = !isAccounts ? 'border-b-2 border-black' : 'text-gray-400';
  return (
    <div className="w-full">
      <div>
        <div className="flex gap-10 my-10 border-b-2 border-gray-200 bg-white w-full">
          <p
            className={`text-xl font-semibold cursor-pointer mt-2 ${accounts}`}
            onClick={() => setIsAccounts(true)}
          >
            Accounts
          </p>
          <p
            className={`text-xl font-semibold cursor-pointer mt-2 ${isVideos}`}
            onClick={() => setIsAccounts(false)}
          >
            Videos
          </p>
        </div>
        {isAccounts ? (
          <div>Accounts</div>
        ) : (
          <div className="md:mt-16 flex flex-wrap gap-6 md:justify-start">
            {videos?.length ? (
              videos.map((video, i) => <VideoCard post={video} key={i} />)
            ) : (
              <NoResults text={`No video results for ${searchTerm}`} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: string };
}) => {
  const response = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);

  return {
    props: { videos: response.data },
  };
};

export default Search;
