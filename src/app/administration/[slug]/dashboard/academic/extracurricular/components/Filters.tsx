import { Cancel } from "@mui/icons-material";
import { MenuItem, Stack, TextField, Typography } from "@mui/material";
import { memo } from "react";

function Filters({ activeTab, dataExtra, extraFilter, setExtraFilter }) {
  return (
    <Stack
      sx={{
        flexDirection: "row",
        flex: 1,
        overflowX: "auto",
        height: 54,
        px: { xs: 0, lg: 1 },
        display: activeTab === 0 ? "none" : "flex",
      }}
    >
      <Stack
        sx={{
          flexDirection: "row",
          flex: 1,
          py: 1,
        }}
      >
        <TextField
          select
          size="small"
          label="Ekstrakurikuler"
          value={extraFilter}
          onChange={(e) => setExtraFilter(e.target.value)}
          sx={{
            flex: { xs: 1, lg: 0 },
            minWidth: "fit-content",
          }}
          InputProps={{
            sx: { minWidth: 140, width: { xs: "100%", lg: "fit-content" } },
            startAdornment: extraFilter && (
              <Cancel
                onClick={() => {
                  setExtraFilter("");
                }}
                sx={{
                  fontSize: 14,
                  color: "base.base50",
                  cursor: "pointer",
                  transform: "translateX(-4px)",
                  "&:hover": {
                    color: "base.base60",
                  },
                }}
              />
            ),
          }}
        >
          {dataExtra &&
            dataExtra.map((option, index) => (
              <MenuItem key={index} value={option.extracurricular}>
                <Typography fontSize={14}>{option.extracurricular}</Typography>
              </MenuItem>
            ))}
        </TextField>
      </Stack>
    </Stack>
  );
}

export default memo(Filters);
