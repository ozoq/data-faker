import { useEffect, useRef, useState } from "react";
import post from "../utils/post";
import LoadedTable from "./LoadedTable";

function Table({ seed = 0, locale = "pl", errors = 0 }) {
  const [records, setRecords] = useState([]);
  const [fetching, setFetching] = useState(false);
  const loaderRef = useRef();

  async function lazy() {
    setRecords([...records, ...(await loadRecords(10, records.length))]);
  }

  async function swap() {
    if (!loaderRef.current) return;
    const listRef = loaderRef.current._listRef;
    const topSeenIndex = Math.round(
      listRef.state.scrollOffset / listRef.props.itemSize
    );
    const swapSize = records.length - topSeenIndex;
    setRecords([
      ...records.slice(0, -swapSize),
      ...(await loadRecords(swapSize, topSeenIndex)),
    ]);
    listRef.scrollToItem(records.length - swapSize, "start");
  }

  async function loadRecords(amount, fromIndex) {
    return await post("/api/getFakePage", {
      seed,
      locale,
      errors,
      amount: amount,
      from: fromIndex,
    });
  }

  async function update(fn) {
    if (!fetching) {
      setFetching(true);
      await fn();
      setFetching(false);
    }
  }

  useEffect(() => {
    update(swap);
  }, [seed, locale, errors]);

  return (
    <LoadedTable
      records={records}
      fetchMore={() => update(lazy)}
      ref={loaderRef}
    />
  );
}

export default Table;
