import React, { useState } from "react";
// material ui
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
// states and actions
import { shiftFrameTime } from "core/actions";
//types
import { TimeShiftTool } from "types/components/tools";
// hooks
import useControl from "hooks/useControl";
import usePos from "hooks/usePos";

const CONTROL = "control";
const POSITION = "position";

export default function TimeShift({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) {
  const { controlRecord } = useControl();
  const { posRecord } = usePos();
  // type
  const [type, setType] = useState<TimeShiftTool>(CONTROL); // another is POSITION
  const handleChangeType = () => setType(type === CONTROL ? POSITION : CONTROL);

  // frame index
  const [startFrame, setStartFrame] = useState(0);
  const [endFrame, setEndFrame] = useState(0);
  const handleChangeStartFrame = (e: React.ChangeEvent<HTMLInputElement>) =>
    setStartFrame(e.target.valueAsNumber);
  const handleChangeEndFrame = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEndFrame(e.target.valueAsNumber);

  // time
  const [shiftTime, setShiftTime] = useState(0);
  const handleChangeShiftTime = (e: React.ChangeEvent<HTMLInputElement>) =>
    setShiftTime(e.target.valueAsNumber);

  // submit
  const submitTimeShift = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const record = type === CONTROL ? controlRecord : posRecord;
    if (startFrame < 0 || startFrame >= record.length) {
      window.alert("Invalid start frame");
      return;
    }
    if (endFrame < 0 || endFrame >= record.length) {
      window.alert("Invalid end frame");
      return;
    }
    if (startFrame > endFrame) {
      window.alert("Invalid, startFrame should <= endFrame");
      return;
    }
    shiftFrameTime({ payload: { type, startFrame, endFrame, shiftTime } });
    handleClose();
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle> Time Shift Tool</DialogTitle>
      <DialogContent>
        <form onSubmit={submitTimeShift}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Button onClick={handleChangeType} size="small" variant="outlined">
              {type}
            </Button>
            <br />
            <TextField
              type="number"
              label="startFrame"
              onChange={handleChangeStartFrame}
              value={startFrame}
            />
            <br />
            <TextField
              type="number"
              label="endFrame"
              onChange={handleChangeEndFrame}
              value={endFrame}
            />
            <br />
            <TextField
              type="number"
              label="shiftTime (ms)"
              onChange={handleChangeShiftTime}
              value={shiftTime}
            />
            <br />
            <Button type="submit">OK</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
