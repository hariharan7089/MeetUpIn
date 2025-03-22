"use client";

import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useState } from "react";
import { useParams } from "next/navigation"; // ✅ Correct way to access dynamic route params

import { Loader } from "@/components/loader";
import { MeetingRoom } from "@/components/meeting-room";
import { MeetingSetup } from "@/components/meeting-setup";
import { useGetCallById } from "@/hooks/use-get-call-by-id";

const MeetingIdPage = () => {
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const { user, isLoaded } = useUser();
  
  // ✅ Use useParams to get the meeting ID from the URL
  const { id } = useParams<{ id: string }>();

  // ✅ Ensure the hook always runs
  const { call, isCallLoading } = useGetCallById(id || "default-id");

  // ✅ Handle missing ID after hook execution
  if (!id) {
    return <div>Error: Meeting ID is missing.</div>;
  }

  if (!isLoaded || isCallLoading) return <Loader />;

  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default MeetingIdPage;
