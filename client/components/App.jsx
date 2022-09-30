import { AppShell, Button, Group } from "@mantine/core";
import { useState } from "react";
import Table from "./Table";
import { ErrorsInput, RegionInput, SeedInput } from "./inputs";
import { CSVLink } from "react-csv";

const AppStyle = (theme) => ({
  main: {
    backgroundColor: theme.colors.gray[0],
    display: "flex",
    flexDirection: "column",
    padding: 50,
  },
});

function App() {
  const [records, setRecords] = useState([]);
  const [seed, setSeed] = useState(0);
  const [errors, setErrors] = useState(0);
  const [region, setRegion] = useState("pl");

  return (
    <AppShell styles={AppStyle}>
      <Group position="apart">
        <ErrorsInput errors={errors} setErrors={setErrors} />
        <SeedInput seed={seed} setSeed={setSeed} />
        <RegionInput region={region} setRegion={setRegion} />

        <CSVLink data={records} target="_blank" filename="fakedata.csv">
          <Button>Download CSV</Button>
        </CSVLink>
      </Group>
      <Table
        seed={seed}
        errors={errors}
        locale={region}
        records={records}
        setRecords={setRecords}
      />
    </AppShell>
  );
}

export default App;
