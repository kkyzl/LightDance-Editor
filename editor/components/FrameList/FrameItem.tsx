import { useRef, useEffect } from "react";
// mui
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";

export default function FrameItem({
  idx,
  start,
  selected,
  handleSelectItem,
}: {
  idx: number;
  start: number;
  selected: boolean;
  handleSelectItem: (idx: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selected) {
      ref?.current?.scrollIntoView({
        // behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }
  }, [selected]);

  return (
    <div ref={ref}>
      <ListItem
        // eslint-disable-next-line react/no-array-index-key
        selected={selected}
        button
        onClick={() => handleSelectItem(idx)}
      >
        <Typography variant="body1" color="initial">
          [{idx}] time: {start}
        </Typography>
      </ListItem>
    </div>
  );
}
