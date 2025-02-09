import { Box, Grid, Typography } from "@mui/material";
import ColorSelector from "../ColorSelector";
import IntensityControl from "../IntensityControl";

const OFcontrolsContent = ({
  handleColorChange,
  handleIntensityChange,
  intensity,
  setIntensity,
  currentColorName,
  oneLine = false,
}: {
  handleColorChange: (color: string) => void;
  intensity: number;
  handleIntensityChange?: (intensity: number) => void;
  setIntensity?: (intensity: number) => void;
  currentColorName: string;
  oneLine?: boolean;
}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "1.5vh" }}>
      <Grid
        container
        spacing={2}
        alignItems="center"
        sx={{
          justifyContent: "space-between",
          px: "3em",
        }}
      >
        {oneLine || (
          <Grid item>
            <Typography>color</Typography>
          </Grid>
        )}
        <Grid item>
          <ColorSelector
            placeholder="none"
            onChange={handleColorChange}
            currentColorName={currentColorName}
          />
        </Grid>
        {oneLine && (
          <IntensityControl
            intensity={intensity}
            setIntensity={
              (handleIntensityChange
                ? handleIntensityChange
                : setIntensity) as (intensity: number) => void
            }
          />
        )}
      </Grid>
      {oneLine || (
        <Grid
          container
          spacing={2}
          alignItems="center"
          sx={{
            justifyContent: "space-between",
            px: "3em",
          }}
        >
          <Grid item>
            <Typography>intensity</Typography>
          </Grid>
          <IntensityControl
            intensity={intensity}
            setIntensity={
              (handleIntensityChange
                ? handleIntensityChange
                : setIntensity) as (intensity: number) => void
            }
          />
        </Grid>
      )}
    </Box>
  );
};

export default OFcontrolsContent;
