import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const SwipeCards = ({ profiles, onSwipe }) => {
  const [index, setIndex] = useState(0);

  // Always call hooks at the top level
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);

  const swipe = (dir, profile) => {
    if (onSwipe) onSwipe(dir, profile);
    setIndex((prev) => prev + 1);
  };

  const profile = profiles[index];

  // Handle no more profiles case
  if (!profile) {
    return (
      <div className="flex justify-center items-center h-[600px] text-gray-400 text-xl">
        No more profiles
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-[600px]">
      <motion.div
        key={profile._id}
        className="card bg-base-300 w-80 shadow-sm"
        drag="x"
        style={{ x, rotate }}
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={(event, info) => {
          if (info.offset.x > 150) swipe('right', profile);
          else if (info.offset.x < -150) swipe('left', profile);
        }}
      >
        <div className="mx-2 p-4">
          <figure className="flex justify-center mb-4">
            <img
              src={profile.photoUrl}
              alt="User"
              className="rounded-full w-32 h-32 object-cover"
            />
          </figure>
          <h2 className="card-title text-center">
            {profile.lastName
              ? `${profile.firstName} ${profile.lastName}`
              : profile.firstName}
          </h2>
          {profile.age && profile.gender && (
            <p className="text-center">{`${profile.age}, ${profile.gender}`}</p>
          )}
          <p className="text-center mt-2">{profile.about}</p>
          <p className="text-center text-white mt-2">{profile.skills}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default SwipeCards;
