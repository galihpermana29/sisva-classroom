import { Box, Divider, Paper, Stack } from "@mui/material";
import { Suspense } from "react";
import { TabLayoutTitle } from "./components/layouts/TabLayoutTitle";
import { TabActions } from "./components/layouts/TabActions";
import { InvoiceTabs } from "./components/layouts/InvoiceTabs";
import { TabSearch } from "./components/layouts/TabSearch";
import { TabFilters } from "./components/layouts/TabFilters";

export default function InvoiceLayout({ children }) {
  return (
    <Stack
      className="min-h-[calc(100dvh-70px)]"
      display={{ xs: "flex", lg: "contents" }}
      gap={0}
    >
      <Stack
        padding={{ xs: 0, lg: "2rem" }}
        gap={3}
      >
        <Stack
          gap={4}
          display={{ xs: "none", lg: "flex" }}
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Suspense>
            <TabLayoutTitle key="tab-title" />
          </Suspense>
          <Suspense>
            <TabActions key="tab-actions" />
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
            <InvoiceTabs key="invoice-tabs" />
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
                <TabSearch key="tab-search" />
              </Suspense>
              <Suspense>
                <TabFilters key="tab-filters" />
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
                  <TabSearch key="tab-search" />
                </Suspense>
                <Suspense>
                  <TabActions key="tab-actions" />
                </Suspense>
              </Stack>
              <Suspense>
                <TabFilters key="tab-filters" />
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
