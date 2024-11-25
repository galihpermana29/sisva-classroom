import { Box, Divider, Paper, Stack } from "@mui/material";
import { Suspense } from "react";

import { InvoiceTabs } from "./components/layouts/InvoiceTabs";
import { TabActions } from "./components/layouts/TabActions";
import { TabFilters } from "./components/layouts/TabFilters";
import { TabLayoutTitle } from "./components/layouts/TabLayoutTitle";
import { TabSearch } from "./components/layouts/TabSearch";

export default function InvoiceLayout({ children }) {
  return (
    <Stack
      className="min-h-[calc(100dvh-70px)]"
      display={{ xs: "flex", lg: "contents" }}
      gap={0}
    >
      <Stack padding={{ xs: 0, lg: "2rem" }} gap={3}>
        <Stack
          gap={4}
          display={{ xs: "none", lg: "flex" }}
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Suspense>
            <TabLayoutTitle />
          </Suspense>
          <Suspense>
            <TabActions />
          </Suspense>
        </Stack>
        <Stack
          component={Paper}
          variant="outlined"
          sx={{
            borderRadius: { xs: 0, lg: 2 },
            flex: 1,
            overflowY: "hidden",
            maxHeight: "100%",
          }}
        >
          <Suspense>
            <InvoiceTabs />
          </Suspense>

          <Divider sx={{ display: { xs: "none", lg: "block" } }} />

          <Box padding={2}>
            <Stack
              gap={4}
              display={{ xs: "none", lg: "flex" }}
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Suspense>
                <TabSearch />
              </Suspense>
              <Suspense>
                <TabFilters />
              </Suspense>
            </Stack>

            <Stack
              display={{ xs: "flex", lg: "none" }}
              flexDirection="column"
              gap={1.5}
            >
              <Stack
                gap={1.5}
                flexDirection="row"
                justifyContent="space-between"
              >
                <Suspense>
                  <TabSearch />
                </Suspense>
                <Suspense>
                  <TabActions />
                </Suspense>
              </Stack>
              <Suspense>
                <TabFilters />
              </Suspense>
            </Stack>
          </Box>
          <Box display={{ xs: "none", lg: "contents" }}>
            <Suspense>{children}</Suspense>
          </Box>
        </Stack>
      </Stack>
      <Box
        flexDirection="column"
        flexGrow={1}
        display={{ xs: "flex", lg: "none" }}
      >
        <Suspense>{children}</Suspense>
      </Box>
    </Stack>
  );
}
