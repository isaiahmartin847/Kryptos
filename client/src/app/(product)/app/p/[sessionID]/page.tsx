"use client";

import { useParams } from "next/navigation";

const SessionPage = () => {
  const { sessionID } = useParams();

  if (!sessionID) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>This is the UUID of the session: {sessionID}</div>
    </div>
  );
};

export default SessionPage;
