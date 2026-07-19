"use client";

import { useEffect, useRef, useState } from "react";
import {
  FiPause,
  FiPlay,
  FiRotateCcw,
  FiRotateCw,
} from "react-icons/fi";
import type { Book } from "@/types/book";
import "@/styles/audioPlayer.css";

interface AudioPlayerProps {
  book: Book;
}

export default function AudioPlayer({ book }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    const updateCurrentTime = () => {
      setCurrentTime(audio.currentTime);
    };

    const updateDuration = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener("timeupdate", updateCurrentTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateCurrentTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlayback = async () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (audio.paused) {
      await audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const skipAudio = (seconds: number) => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.currentTime = Math.min(
      Math.max(audio.currentTime + seconds, 0),
      audio.duration || 0
    );
  };

  const handleProgressChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const audio = audioRef.current;
    const nextTime = Number(event.target.value);

    if (!audio) {
      return;
    }

    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const formatTime = (seconds: number) => {
    if (!Number.isFinite(seconds)) {
      return "0:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${minutes}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="audio-player">
      <audio ref={audioRef} src={book.audioLink} />

      <div className="audio-player__book">
        <img
          className="audio-player__image"
          src={book.imageLink}
          alt={book.title}
        />

        <div>
          <p className="audio-player__title">{book.title}</p>
          <p className="audio-player__author">{book.author}</p>
        </div>
      </div>

      <div className="audio-player__controls">
        <button
          type="button"
          className="audio-player__skip"
          onClick={() => skipAudio(-10)}
          aria-label="Rewind 10 seconds"
        >
          <FiRotateCcw />
          <span>10</span>
        </button>

        <button
          type="button"
          className="audio-player__play"
          onClick={() => void togglePlayback()}
          aria-label={isPlaying ? "Pause audio" : "Play audio"}
        >
          {isPlaying ? <FiPause /> : <FiPlay />}
        </button>

        <button
          type="button"
          className="audio-player__skip"
          onClick={() => skipAudio(10)}
          aria-label="Forward 10 seconds"
        >
          <FiRotateCw />
          <span>10</span>
        </button>
      </div>

      <div className="audio-player__progress">
        <span>{formatTime(currentTime)}</span>

        <input
          type="range"
          min="0"
          max={duration || 0}
          step="0.1"
          value={currentTime}
          onChange={handleProgressChange}
          aria-label="Audio progress"
        />

        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
}