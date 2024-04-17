"use client";

import {
  DeviceSettings,
  VideoPreview,
  useCall,
} from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

const MeetingSetup = ({
  setIsSetUpComplete,
}: {
  setIsSetUpComplete: (value: boolean) => void;
}) => {
  const [isMicCamtoggledOn, setIsMicCamToggledOn] = useState(false);

  const call = useCall();

  if (!call) {
    throw new Error(
      "useStreamCall must be used within a StreamCall component."
    );
  }

  useEffect(() => {
    if (isMicCamtoggledOn) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCamtoggledOn, call?.camera, call?.microphone]);

  return (
    <div className="flex-center">
      <div className="flex h-screen w-[400px] md:w-[700px] flex-col items-center justify-center gap-3 text-white p-8">
        <h1 className="text-2xl font-bold">Setup</h1>
        <VideoPreview />
        <div className="flex items-center h-16 justify-center gap-3">
          <label className="flex items-center justify-center gap-2 font-medium">
            <input
              type="checkbox"
              checked={isMicCamtoggledOn}
              onChange={(e) => setIsMicCamToggledOn(e.target.checked)}
            />
            Join with mic and camera off
          </label>
          <DeviceSettings />
        </div>
        <Button
          className="rounded-md bg-green-500 px-4 py-2.5"
          onClick={() => {
            call.join();
            setIsSetUpComplete(true);
          }}
        >
          Join Meeting
        </Button>
      </div>
    </div>
  );
};

export default MeetingSetup;
