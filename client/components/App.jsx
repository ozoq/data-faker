import { AppShell, Group } from "@mantine/core";
import { useState } from "react";
import Table from "./Table";
import { ErrorsInput, RegionInput, SeedInput } from "./inputs";

const AppStyle = (theme) => ({
  main: {
    backgroundColor: theme.colors.gray[0],
    display: "flex",
    flexDirection: "column",
    padding: 50,
  },
});

function App() {
  const [seed, setSeed] = useState(0);
  const [errors, setErrors] = useState(5);
  const [region, setRegion] = useState("pl");

  return (
    <AppShell styles={AppStyle}>
      <Group position="apart">
        <ErrorsInput errors={errors} setErrors={setErrors} />
        <SeedInput seed={seed} setSeed={setSeed} />
        <RegionInput region={region} setRegion={setRegion} />
      </Group>
      <Table seed={seed} errors={errors} locale={region} />
    </AppShell>
  );
}

export default App;
