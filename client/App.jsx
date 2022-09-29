import { useEffect, useState } from "react";
import post from "./utils/post";

function App() {
  const [reply, setReply] = useState(null);
  const [errors, setErrors] = useState(0);

  useEffect(() => {
    (async () => {
      const { data } = await post("/api/ping", {
        errors: errors,
        seed: 1,
      });
      console.log(data);
      setReply(data.address + " " + data.name);
    })();
  }, [errors]);

  return (
    <div>
      <p>{reply || "Where is the server?"}</p>
      <input
        type="text"
        value={errors}
        onChange={(event) => setErrors(event.currentTarget.value)}
      />
    </div>
  );
}

export default App;
