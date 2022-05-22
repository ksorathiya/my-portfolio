import React, { useState, useEffect, useRef } from "react";
import * as LottieInteractivity from "@lottiefiles/lottie-interactivity";

const LIKES_URL = "https://likes.meet-simplystech.workers.dev";
const ANIMATION_TIMER = 1500;

const LikeCounter: React.FC = () => {
  const [likes, setLikes] = useState(0);
  const [isLikeButtonClicked, setIsLikeButtonClicked] = useState(false);
  const lottieHeartRef = useRef<any>(null);
  const lottieHeartBrokenRef = useRef<any>(null);

  const getLikes = async () => {
    const response = await fetch(LIKES_URL);
    const data = await response.json();
    setLikes(data.likes);
  };

  const setInteractivity = (ref:any) => {
    LottieInteractivity.create({
      player: ref,
      mode: "cursor",
      actions: [
        {
          type: "click",
          forceFlag: false,
        },
      ],
    });
  };

  useEffect(() => {
    getLikes();
  }, []);

  useEffect(() => {
    if (isLikeButtonClicked) {
      setInteractivity(lottieHeartBrokenRef.current);
    } else {
      setInteractivity(lottieHeartRef.current);
    }
  }, [isLikeButtonClicked]);

  const likeButtonClicked = async () => {
    try {
      if (isLikeButtonClicked) {
        await fetch(LIKES_URL, {
          method: "POST",
          body: JSON.stringify({ likes: +likes - 1 }),
        });
        setTimeout(() => {
          setIsLikeButtonClicked(false);
          setLikes((prev) => prev - 1);
        }, ANIMATION_TIMER);
      } else {
        await fetch(LIKES_URL, {
          method: "POST",
          body: JSON.stringify({ likes: +likes + 1 }),
        });
        setTimeout(() => {
          setIsLikeButtonClicked(true);
          setLikes((prev) => prev + 1);
        }, ANIMATION_TIMER);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section id="like-counter">
      <lottie-player
        onClick={likeButtonClicked}
        ref={lottieHeartBrokenRef}
        id="lottiePlayer"
        src="lottie/heart-broken.json"
        background="transparent"
        speed="1"
        style={{
          width: "100px",
          height: "100px",
          display: isLikeButtonClicked ? "block" : "none",
          position: "fixed",
          right: 0,
          bottom: 0,
        }}
        className="fixed right-0 bottom-0"
      >
        {" "}
      </lottie-player>
      <lottie-player
        onClick={likeButtonClicked}
        ref={lottieHeartRef}
        id="lottiePlayer1"
        src="lottie/heart.json"
        background="transparent"
        speed="1"
        style={{
          width: "100px",
          height: "100px",
          display: isLikeButtonClicked ? "none" : "block",
          position: "fixed",
          right: 0,
          bottom: 0,
        }}
      ></lottie-player>
      <div className="fixed right-6 bottom-0 px-4 py-1">{likes}</div>
    </section>
  );
};

export default LikeCounter;
