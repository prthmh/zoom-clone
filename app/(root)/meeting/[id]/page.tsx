"use client";
import Loader from "@/components/Loader";
import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import { useUser } from "@clerk/nextjs";
import {
  Call,
  StreamCall,
  StreamTheme,
  useStreamVideoClient,
} from "@stream-io/video-react-sdk";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Meeting = () => {
  const { id } = useParams();
  const { user, isLoaded } = useUser();
  const [isSetUpComplete, setIsSetUpComplete] = useState(false);

  const client = useStreamVideoClient();
  const [call, setCall] = useState<Call>();
  const [isCallLoading, setIsCallLaoding] = useState(true);

  async function loadCall() {
    const data = await client?.queryCalls({ filter_conditions: { id } });

    setCall(data?.calls[0]);
    setIsCallLaoding(false);
  }

  useEffect(() => {
    if (client) {
      loadCall();
    } else return;
  }, [id, client]);

  if (!isLoaded || isCallLoading) return <Loader />;

  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetUpComplete ? (
            <MeetingSetup setIsSetUpComplete={setIsSetUpComplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default Meeting;
