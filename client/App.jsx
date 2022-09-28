import { useEffect, useState } from "react";
import post from "./utils/post";

function App() {
  const [reply, setReply] = useState(null);

  useEffect(() => {
    (async () => {
      const { data } = await post("/api/ping", {
        pingMessage: "Ping successful!",
      });
      console.log(data);
      setReply(data.pingMessage);
    })();
  }, []);

  return reply || "Where is the server?";
}

export default App;
