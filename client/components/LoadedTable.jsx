import { FixedSizeList } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import AutoSizer from "react-virtualized-auto-sizer";
import { Grid, Paper, Text } from "@mantine/core";
import React from "react";
import { Cell, HeadCell, Row } from "./TableElements";

function Head() {
  return (
    <Grid columns={8} sx={{ margin: 0 }} mb="10px">
      <HeadCell span={1}>Index</HeadCell>
      <HeadCell span={1}>Id</HeadCell>
      <HeadCell span={2}>Name</HeadCell>
      <HeadCell span={2}>Address</HeadCell>
      <HeadCell span={2}>Phone</HeadCell>
    </Grid>
  );
}

function Record({ record, style }) {
  return (
    <Row style={style}>
      <Cell span={1}>{record.index}</Cell>
      <Cell span={1}>{record.id}</Cell>
      <Cell span={2}>{record.name}</Cell>
      <Cell span={2}>{record.address}</Cell>
      <Cell span={2}>{record.phone}</Cell>
    </Row>
  );
}

function LoadingRecord({ style }) {
  <Row style={style}>
    <Cell span={8}>Loading..</Cell>
  </Row>;
}

function Wrapper({ children }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        marginTop: "20px",
      }}
    >
      {children}
    </div>
  );
}

const Body = React.forwardRef(
  ({ isItemLoaded, itemCount, fetchMore, Item }, ref) => {
    return (
      <Paper sx={{ flex: 1 }} withBorder>
        <AutoSizer>
          {({ height, width }) => (
            <InfiniteLoader
              isItemLoaded={isItemLoaded}
              itemCount={itemCount}
              loadMoreItems={fetchMore}
              threshold={10}
              ref={ref}
            >
              {({ onItemsRendered, ref }) => (
                <FixedSizeList
                  itemCount={itemCount}
                  onItemsRendered={onItemsRendered}
                  ref={ref}
                  height={height}
                  width={width}
                  itemSize={100 * (1000 / width)}
                >
                  {Item}
                </FixedSizeList>
              )}
            </InfiniteLoader>
          )}
        </AutoSizer>
      </Paper>
    );
  }
);

const LoadedTable = React.forwardRef(({ records, fetchMore }, ref) => {
  const isItemLoaded = (index) => index < records.length;
  const itemCount = records.length + 1;
  const Item = ({ index, style }) => {
    return !isItemLoaded(index) ? (
      <LoadingRecord style={style} />
    ) : (
      <Record record={records[index]} style={style} />
    );
  };

  return (
    <Wrapper>
      <Head />
      <Body {...{ isItemLoaded, itemCount, fetchMore, Item, ref }} />
    </Wrapper>
  );
});

export default LoadedTable;
