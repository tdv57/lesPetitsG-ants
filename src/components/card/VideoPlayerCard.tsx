import {useState, useEffect, type RefObject, useRef, useCallback } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, Volume1, VolumeX } from "lucide-react";

interface VideoPlayerCardProps {
    videoRef: RefObject<HTMLVideoElement | null>;
    size: {width: number, height: number};
}

export function VideoPlayerCard({videoRef} : VideoPlayerCardProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTimeState, setCurrentTimeState] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(true);
    const [showVolumeSlider, setShowVolumeSlider] = useState(false);
    const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [showVideoPlayer, setShowVideoPlayer] = useState(false);
    const videoPlayerTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const TIMEOUT = 2000;
    
    const clearVideoPlayerTimeout = useCallback(() => 
        {
        if (videoPlayerTimeoutRef.current) {
            clearTimeout(videoPlayerTimeoutRef.current);
            videoPlayerTimeoutRef.current = null;
        }
        } , []);

    useEffect(() => {
        return () => {
        if (videoPlayerTimeoutRef.current) {
            clearTimeout(videoPlayerTimeoutRef.current);
        }
        };
    }, [clearVideoPlayerTimeout]);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);
        const handleTimeUpdate = () => {
            if(!isDragging) {
                setCurrentTimeState(video.currentTime);
            }
        };
        const handleDuration = () => setDuration(video.duration);
        const handleVolumeChange = () => {
                    setVolume(video.volume);
                    setIsMuted(video.muted);
                };

        video.addEventListener("play", handlePlay);
        video.addEventListener("pause", handlePause);
        video.addEventListener("timeupdate", handleTimeUpdate);
        video.addEventListener("loadedmetadata", handleDuration);
        video.addEventListener("volumechange", handleVolumeChange);


        return () => {
            video.removeEventListener("play", handlePlay);
            video.removeEventListener("pause", handlePause);
            video.removeEventListener("timeupdate", handleTimeUpdate);
            video.removeEventListener("loadedmetadata", handleDuration);
            video.removeEventListener("volumechange", handleVolumeChange);
            if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
        };
    }, [videoRef]);

    function handleVolumeAreaEnter() {
        if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current);
            hideTimeoutRef.current = null;
        }
        setShowVolumeSlider(true);
    }

    function handleVolumeAreaLeave() {
        hideTimeoutRef.current = setTimeout(() => {
            setShowVolumeSlider(false);
        }, 300);
    }


    function handlePlayPause() {
        const video = videoRef.current;
        if (!video) return;

        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    }

    function handleSeek(seconds: number) {
        const video = videoRef.current;
        if (!video) return;

        video.currentTime = Math.max(0, Math.min(video.duration, video.currentTime + seconds));
    }

    function printTime(seconds: number) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }

    function handleVolumeChange(e: React.ChangeEvent<HTMLInputElement>) {
        const video = videoRef.current;
        if (!video) return;
        
        const newVolume = parseFloat(e.target.value);
        video.volume = newVolume;
        video.muted = newVolume === 0;
    }

    function toggleMute() {
        const video = videoRef.current;
        if (!video) return;
        const newMuted = !isMuted;  // ← utiliser le state React, pas video.muted
        video.muted = newMuted;
        setIsMuted(newMuted);
    }

     function VolumeIcon() {
        if (isMuted || volume === 0) return <VolumeX size={14} className="pointer-events-none"/>;
        if (volume < 0.5) return <Volume1 size={14} className="pointer-events-none" />;
        return <Volume2 size={14} className="pointer-events-none"/>;
    }

    const handleOnVideoPlayerLeave = () => {
        clearVideoPlayerTimeout();
        videoPlayerTimeoutRef.current = setTimeout(() => {
        setShowVideoPlayer(false);
        }, TIMEOUT);
    };

    const handleOnVideoPlayerEnter = () => {
        clearVideoPlayerTimeout();
        setShowVideoPlayer(true);
    };

    const handleOnVideoCardLeave = () => {
        clearVideoPlayerTimeout();
        setShowVideoPlayer(false);
    };

    const handleOnVideoCardEnter = () => {
        clearVideoPlayerTimeout();
        setShowVideoPlayer(true);
        videoPlayerTimeoutRef.current = setTimeout(() => {
        setShowVideoPlayer(false);
        }, TIMEOUT);
    };  

    return (
        <>
        <div 
            className="absolute inset-0 flex flex-col items-center" 
            onMouseEnter={handleOnVideoCardEnter}
            onMouseLeave={handleOnVideoCardLeave}
            onMouseMove={handleOnVideoCardEnter}
            onClick={handlePlayPause}
        >
        {
        showVideoPlayer &&
        <div 
            className="absolute bottom-0  bg-black/70 px-2 py-2 rounded-lg h-7 w-9/10 "
            onMouseEnter={handleOnVideoPlayerEnter}
            onMouseLeave={handleOnVideoPlayerLeave}
            onClick={(e) => e.stopPropagation()}  // Empêche la propagation du clic pour ne pas déclencher le play/pause
        >
            <div className="flex items-center gap-2 -mt-1 ">
                <div className="flex items-center gap-1 shrink-0">
                    <button onClick={() => handleSeek(-5)} className="text-white hover:text-blue-400 cursor-pointer">
                        <SkipBack size={14} />
                    </button>
                    <button onClick={handlePlayPause} className="text-white hover:text-blue-400 cursor-pointer">
                        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                    </button>
                    <button onClick={() => handleSeek(5)} className="text-white hover:text-blue-400 cursor-pointer">
                        <SkipForward size={14} />
                    </button>
                </div>
                <div className="flex items-center gap-2 min-w-0 flex-1">
                    <span className="text-white text-xs shrink-0">
                        {printTime(currentTimeState)}
                    </span>
                    <input
                        type="range"
                        min={0}
                        max={duration}
                        value={currentTimeState}
                        step={0.01}
                        onChange={(e) => {
                            const video = videoRef.current;
                            if (!video) return;
                            video.currentTime = Number(e.target.value);
                        }}
                        onMouseDown={() => setIsDragging(true)}
                        onMouseUp={() => setIsDragging(false)}
                        className="w-full h-1"
                    />
                </div>
                <div
                    className="relative shrink-0"
                    onMouseEnter={handleVolumeAreaEnter}
                    onMouseLeave={handleVolumeAreaLeave}
                >
                    <button onClick={toggleMute} className="text-white hover:text-blue-400 cursor-pointer">
                        <VolumeIcon />
                    </button>
                    {showVolumeSlider && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 rounded-lg transition-opacity">
                            <div className="h-24 flex items-center justify-center">
                                <input
                                    type="range"
                                    min={0}
                                    max={1}
                                    step={0.1}
                                    value={isMuted ? 0 : volume}
                                    onChange={handleVolumeChange}
                                    className="accent-blue-500 cursor-pointer"
                                    style={{
                                        transform: 'rotate(-90deg)',
                                        width: '96px',
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
        }
        </div>

        </>

        
    );
}