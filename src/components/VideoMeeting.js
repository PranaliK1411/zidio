// src/components/VideoMeeting.js
import React, { useRef, useEffect, useState } from "react";
import { JitsiMeeting } from "@jitsi/react-sdk";
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaUsers, FaComments } from "react-icons/fa";
import "../styles/VideoMeeting.css";

const VideoMeeting = ({ roomName }) => {
    const iframeRef = useRef(null);
    const [micOn, setMicOn] = useState(true);
    const [camOn, setCamOn] = useState(true);
    const [participants, setParticipants] = useState(1);
    const [showChat, setShowChat] = useState(true);

    const domain = "meet.jit.si";

    useEffect(() => {
        const interval = setInterval(() => {
            const iframe = iframeRef.current?.contentWindow;
            if (iframe) {
                iframe.postMessage({ type: "participantCount" }, "*");
            }
        }, 2000);

        window.addEventListener("message", handleMessage);

        return () => {
            clearInterval(interval);
            window.removeEventListener("message", handleMessage);
        };
    }, []);

    const handleMessage = (event) => {
        if (event.data?.type === "participantCount") {
            setParticipants(event.data.count || 1);
        }
    };

    const toggleMic = () => {
        const iframe = iframeRef.current?.contentWindow;
        iframe?.postMessage({ type: micOn ? "toggleAudio" : "toggleAudio" }, "*");
        setMicOn(!micOn);
    };

    const toggleCam = () => {
        const iframe = iframeRef.current?.contentWindow;
        iframe?.postMessage({ type: camOn ? "toggleVideo" : "toggleVideo" }, "*");
        setCamOn(!camOn);
    };

    const toggleChat = () => {
        const iframe = iframeRef.current?.contentWindow;
        iframe?.postMessage({ type: "toggleChat" }, "*");
        setShowChat(!showChat);
    };

    return (
        <div className="video-meeting-container">
            <div className="meeting-toolbar">
                <button onClick={toggleMic}>
                    {micOn ? <FaMicrophone /> : <FaMicrophoneSlash />} Mic
                </button>
                <button onClick={toggleCam}>
                    {camOn ? <FaVideo /> : <FaVideoSlash />} Cam
                </button>
                <button onClick={toggleChat}>
                    <FaComments /> Chat
                </button>
                <span className="participant-count">
                    <FaUsers /> {participants}
                </span>
            </div>

            <JitsiMeeting
                domain={domain}
                roomName={roomName}
                configOverwrite={{
                    startWithAudioMuted: false,
                    startWithVideoMuted: false,
                    disableModeratorIndicator: false,
                    enableEmailInStats: false,
                }}
                interfaceConfigOverwrite={{
                    DISABLE_VIDEO_BACKGROUND: true,
                    SHOW_JITSI_WATERMARK: false,
                    HIDE_INVITE_MORE_HEADER: true,
                }}
                userInfo={{
                    displayName: "Guest User",
                }}
                getIFrameRef={(iframe) => {
                    iframe.style.height = "600px";
                    iframeRef.current = iframe;
                }}
            />
        </div>
    );
};

export default VideoMeeting;
