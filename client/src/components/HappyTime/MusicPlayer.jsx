import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { FaPlay, FaPause, FaMusic } from "react-icons/fa";

const musicList = [
    {
        title: "Relaxing Melody",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    },
    {
        title: "Peaceful Piano",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    },
    {
        title: "Joyful Tune",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    },
];

const MusicPlayer = () => {
    const [current, setCurrent] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(new Audio());

    const handlePlay = (track) => {
        if (current !== track.url) {
            audioRef.current.src = track.url;
            audioRef.current.play();
            setCurrent(track.url);
            setIsPlaying(true);
        } else {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.play();
                setIsPlaying(true);
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-indigo-700">
                <FaMusic /> Music Playlist
            </h3>

            <div className="space-y-3">
                {musicList.map((track, index) => (
                    <div
                        key={index}
                        className="flex justify-between items-center bg-indigo-50 border border-indigo-200 rounded-lg p-3 shadow-sm"
                    >
                        <p className="text-gray-800 font-medium">{track.title}</p>
                        <button
                            className="bg-indigo-600 text-white px-4 py-1 rounded hover:bg-indigo-700 transition"
                            onClick={() => handlePlay(track)}
                        >
                            {current === track.url && isPlaying ? <FaPause /> : <FaPlay />}
                        </button>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default MusicPlayer;