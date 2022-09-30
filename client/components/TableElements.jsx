import { Grid, Text } from "@mantine/core";
import React from "react";

export function HeadCell({ span, children }) {
  return (
    <Cell span={span}>
      <Text transform="uppercase" weight={700}>
        {children}
      </Text>
    </Cell>
  );
}

export function Cell({ children, span }) {
  return (
    <Grid.Col
      span={span}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
      }}
    >
      <Text
        size="sm"
        align="center"
        sx={{ overflowWrap: "break-word", maxWidth: "100%" }}
      >
        {children}
      </Text>
    </Grid.Col>
  );
}

export function Row({ children, style = {} }) {
  return (
    <div
      style={{
        ...style,
        borderBottom: "solid 1px rgba(0,0,0,0.1)",
        overflow: "hidden",
      }}
    >
      <Grid columns={8} sx={{ height: "100%", margin: 0 }}>
        {children}
      </Grid>
    </div>
  );
}
