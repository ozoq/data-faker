import {
  Group,
  NumberInput,
  Slider,
  SegmentedControl,
  Input,
  Button,
} from "@mantine/core";

export function SeedInput({ seed, setSeed }) {
  function randomize() {
    setSeed(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));
  }
  return (
    <Group align="end">
      <NumberInput
        placeholder="Numeric seed"
        label="Seed"
        value={seed}
        onChange={(value) => setSeed(value)}
      />

      <Button onClick={randomize}>Random Seed</Button>
    </Group>
  );
}

export function ErrorsInput({ errors, setErrors }) {
  return (
    <Group align="end">
      <NumberInput
        placeholder="Amount"
        label="Errors"
        value={errors}
        onChange={(value) => setErrors(value)}
        step={5}
        precision={2}
        max={1000}
        min={0}
      />
      <Input.Wrapper label="Errors (slider)">
        <Slider
          step={0.25}
          min={0}
          max={10}
          value={errors}
          onChange={(value) => setErrors(value)}
        />
      </Input.Wrapper>
    </Group>
  );
}

export function RegionInput({ region, setRegion }) {
  return (
    <Input.Wrapper label="Region">
      <SegmentedControl
        sx={{ width: "100%" }}
        value={region}
        onChange={setRegion}
        data={[
          { label: "Netherlands", value: "nl" },
          { label: "Poland", value: "pl" },
          { label: "Latvia", value: "lv" },
        ]}
      />
    </Input.Wrapper>
  );
}
