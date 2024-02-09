"use client";

import Image from "next/image";
import {
  Avatar,
  Badge,
  Box,
  Button,
  ButtonBase,
  IconButton,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import SchoolCodeIllustration from "@/assets/SVGs";
import useTheme from "@mui/material/styles/useTheme";

import styles from "./Dashboard.module.css";

import Link from "next/link";
import { AccessTimeFilled, NotificationsNone } from "@mui/icons-material";
import Schedule from "@/assets/classroom/Schedule";
import Task from "@/assets/classroom/Task";
import Material from "@/assets/classroom/Material";
import AgendaDay from "./components/AgendaDay";

export default function Home() {
  const theme = useTheme();
  return (
    <Stack
      sx={{
        flexDirection: "column",
        p: { xs: 0, lg: 4 },
        maxWidth: "900px",
        width: "100%",
      }}
    >
      <Box
        sx={{
          position: { xs: "fixed", sm: "relative" },
          top: 0,
          width: "100%",
          height: "120px",
          display: "flex",
          alignItems: "center",
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          borderRadius: { xs: null, lg: 3 },
          backgroundColor: theme.palette.primary.main,
          zIndex: { xs: 10, sm: 1 },

          // boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            p: 3,
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ textAlign: "left", width: "100%" }}>
            <Typography
              sx={{
                fontSize: 12,
                color: "white",
                mb: 1,
                display: { xs: "flex", lg: "none" },
              }}
            >
              Sekolah Sisva
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography
                  sx={{
                    fontWeight: 600,
                    color: "white",
                    fontSize: 20,
                    lineHeight: "24px",
                  }}
                >
                  Agung Prabowo
                </Typography>
                <Typography
                  sx={{ fontSize: 14, fontWeight: 600, color: "white" }}
                >
                  Guru
                </Typography>
              </Box>
              <Avatar
                sx={{
                  width: "50px",
                  height: "50px",
                  position: "relative",
                  // ml: 1,
                }}
              >
                <Image
                  alt="Web Image"
                  fill
                  sizes="100%"
                  style={{ objectFit: "cover" }}
                  src={
                    "https://images.unsplash.com/flagged/photo-1595514191830-3e96a518989b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                  }
                />
                {/* A */}
              </Avatar>
            </Box>
          </Box>
          {/* <IconButton
          sx={{
            color: "base.base60",
            width: 35,
            height: 35,
            borderRadius: "50%",
            backgroundColor: "#fafafa",
            "&:hover": { backgroundColor: "#dadada" },
          }}
        >
          <Badge badgeContent={3} color="secondary">
            <NotificationsNone sx={{ fontSize: 24 }} />
          </Badge>
        </IconButton> */}
        </Box>
      </Box>
      <Box
        sx={{
          mt: "16px",
          width: "100%",
          p: "0 16px",
          mb: 1,
        }}
      >
        {/* <Typography
              sx={{ fontWeight: 600, fontSize: 16, textAlign: "left" }}
            >
              Fitur
            </Typography> */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            width: "100%",
          }}
        >
          <ButtonBase
            sx={{
              flex: 1,
              flexDirection: "column",
              p: 2,
              borderRadius: 1,
              "&:hover": {
                background: { lg: "rgb(0,0,0,0.05)" },
              },
            }}
          >
            <Schedule
              color={theme.palette.primary.main}
              style={{ height: 45, width: 45 }}
            />
            <Typography sx={{ fontSize: 12, fontWeight: 500, mt: "4px" }}>
              Jadwal Pelajaran
            </Typography>
          </ButtonBase>
          <ButtonBase
            sx={{
              flex: 1,
              flexDirection: "column",
              p: 2,
              borderRadius: 1,
              "&:hover": {
                background: { lg: "rgb(0,0,0,0.05)" },
              },
            }}
          >
            <Task
              color={theme.palette.primary.main}
              style={{ height: 45, width: 45 }}
            />
            <Typography sx={{ fontSize: 12, fontWeight: 500, mt: "4px" }}>
              Tugas
            </Typography>
          </ButtonBase>
          <ButtonBase
            sx={{
              flex: 1,
              flexDirection: "column",
              p: 2,
              borderRadius: 1,
              "&:hover": {
                background: { lg: "rgb(0,0,0,0.05)" },
              },
            }}
          >
            <Material
              color={theme.palette.primary.main}
              style={{ height: 45, width: 45 }}
            />

            <Typography sx={{ fontSize: 12, fontWeight: 500, mt: "4px" }}>
              Perangkat Ajar
            </Typography>
          </ButtonBase>
        </Box>
      </Box>
      <Box
        sx={{
          mb: 2,
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: "0 16px",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: 16,
              textAlign: "left",
            }}
          >
            Tugas Terdekat
          </Typography>
          <Box
            component={Link}
            href="/task"
            fontWeight="500"
            fontSize={13}
            color={theme.palette.primary.main}
          >
            Lihat Selengkapnya
          </Box>
        </Box>
        <Box
          sx={{
            textAlign: "left",
            width: "100%",
            display: "flex",
            overflowY: "auto",
            pb: 1,
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Button
            variant="contained"
              sx={{
                padding: "10px",
                background: theme.palette.primary.main,
                width: 220,
                borderRadius: 2,
                ml: 2,
                mr: 1,
                flexDirection:"column",
                textAlign:"left",
                alignItems:"flex-start"
              }}
            >
              <Typography
                sx={{ fontWeight: 600, color: "white", fontSize: 12 }}
              >
                Laporan Termodinamika
              </Typography>
              <Typography sx={{ color: "white", fontSize: 11 }}>
                Fisika
              </Typography>
              <Typography sx={{ color: "white", fontSize: 11 }}>
               X MIPA 1
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 1,
                }}
              >
                <Typography sx={{ color: "white", fontSize: 10 }}>
                  Deadline
                </Typography>
                <Typography sx={{ color: "white", fontSize: 10 }}>
                  16/01/2023 23:59
                </Typography>
              </Box>
            </Button>
            <Button
            variant="contained"
              sx={{
                padding: "10px",
                background: theme.palette.primary.main,
                width: 220,
                borderRadius: 2,
                mr: 1,
                flexDirection:"column",
                textAlign:"left",
                alignItems:"flex-start"
              }}
            >
              <Typography
                sx={{ fontWeight: 600, color: "white", fontSize: 12 }}
              >
                Laporan Termodinamika
              </Typography>
              <Typography sx={{ color: "white", fontSize: 11 }}>
                Fisika
              </Typography>
              <Typography sx={{ color: "white", fontSize: 11 }}>
               X MIPA 2
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 1,
                }}
              >
                <Typography sx={{ color: "white", fontSize: 10 }}>
                  Deadline
                </Typography>
                <Typography sx={{ color: "white", fontSize: 10 }}>
                  16/01/2023 23:59
                </Typography>
              </Box>
            </Button><Button
            variant="contained"
              sx={{
                padding: "10px",
                background: theme.palette.primary.main,
                width: 220,
                borderRadius: 2,
                mr: 1,
                flexDirection:"column",
                textAlign:"left",
                alignItems:"flex-start"
              }}
            >
              <Typography
                sx={{ fontWeight: 600, color: "white", fontSize: 12 }}
              >
                Laporan Termodinamika
              </Typography>
              <Typography sx={{ color: "white", fontSize: 11 }}>
                Fisika
              </Typography>
              <Typography sx={{ color: "white", fontSize: 11 }}>
               X MIPA 3
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 1,
                }}
              >
                <Typography sx={{ color: "white", fontSize: 10 }}>
                  Deadline
                </Typography>
                <Typography sx={{ color: "white", fontSize: 10 }}>
                  16/01/2023 23:59
                </Typography>
              </Box>
            </Button>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          mb: 2,
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: "0 16px",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: 16,
              textAlign: "left",
            }}
          >
            Jadwal Hari Ini
          </Typography>
          <Box
            component={Link}
            href="/task"
            fontWeight="500"
            fontSize={13}
            color={theme.palette.primary.main}
          >
            Lihat Selengkapnya
          </Box>
        </Box>
        <Box
          sx={{
            textAlign: "left",
            width: "100%",
            display: "flex",
            overflowY: "auto",
            pb: 1,
          }}
        >
          <Box
            sx={{
              overflowY: "auto",
              height: 160,
              width: "100%",
              background: "#F1F1F1",
              borderRadius: 3,
              padding: 1,
              margin: "0 16px",
            }}
          >
            <AgendaDay />
          </Box>
        </Box>
      </Box>
      <Box
          sx={{
            mb: 2,
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              p: "0 16px",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: 16,
                textAlign: "left",
              }}
            >
              Pengumuman
            </Typography>
          </Box>
          <Box
            sx={{
              textAlign: "left",
              width: "100%",
              display: "flex",
              overflowY: "auto",
              pb: 1,
            }}
          >
            <Box sx={{ display: "flex" }}>
              <Box
                sx={{
                  width: 250,
                  borderRadius: 2,
                  ml: "16px",
                  mr: 1,
                  border: "1px solid rgba(0, 0, 0, 0.1)",
                  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    height: 130,
                    background: "#DADADA",
                    position: "relative",
                  }}
                >
                  <Image
                    src={"https://source.unsplash.com/user/erondu/300x300"}
                    fill
                  />
                </Box>
                <Box sx={{ overflow: "hidden", padding: "10px 10px 0px" }}>
                  <Typography
                    sx={{
                      fontSize: 12,
                      fontWeight: 600,
                      textAlign: "left",
                      mb: "4px",
                    }}
                  >
                    Teacher’s Best-Practice Session
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 12,
                      fontWeight: 400,
                      textAlign: "left",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      display: "-webkit-box",
                      lineClamp: 1,
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 3 /* number of lines to show */,
                    }}
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptatem sapiente, quae tempora dignissimos earum sequi
                    maxime illum quia itaque aperiam!
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: "10px",
                  }}
                >
                  <AccessTimeFilled
                    sx={{ fontSize: 13, color: "rgb(0,0,0,0.5)" }}
                  />
                  <Typography
                    sx={{
                      color: "rgb(0,0,0,0.5)",
                      fontSize: 11,
                      ml: "3px",
                    }}
                  >
                    1 hour ago
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  width: 250,
                  borderRadius: 2,
                  mr: 1,
                  border: "1px solid rgba(0, 0, 0, 0.1)",
                  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    height: 130,
                    background: "#DADADA",
                    position: "relative",
                  }}
                >
                  <Image
                    src={"https://source.unsplash.com/user/erondu/300x200"}
                    fill
                  />
                </Box>
                <Box sx={{ overflow: "hidden", padding: "10px 10px 0px" }}>
                  <Typography
                    sx={{
                      fontSize: 12,
                      fontWeight: 600,
                      textAlign: "left",
                      mb: "4px",
                    }}
                  >
                    Teacher’s Best-Practice Session
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 12,
                      fontWeight: 400,
                      textAlign: "left",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      display: "-webkit-box",
                      lineClamp: 1,
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 3 /* number of lines to show */,
                    }}
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptatem sapiente, quae tempora dignissimos earum sequi
                    maxime illum quia itaque aperiam!
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: "10px",
                  }}
                >
                  <AccessTimeFilled
                    sx={{ fontSize: 13, color: "rgb(0,0,0,0.5)" }}
                  />
                  <Typography
                    sx={{
                      color: "rgb(0,0,0,0.5)",
                      fontSize: 11,
                      ml: "3px",
                    }}
                  >
                    1 hour ago
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  width: 250,
                  borderRadius: 2,
                  mr: "24px",
                  border: "1px solid rgba(0, 0, 0, 0.1)",
                  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    height: 130,
                    background: "#DADADA",
                    position: "relative",
                  }}
                >
                  <Image
                    src={"https://source.unsplash.com/user/erondu/200x300"}
                    fill
                  />
                </Box>
                <Box sx={{ overflow: "hidden", padding: "10px 10px 0px" }}>
                  <Typography
                    sx={{
                      fontSize: 12,
                      fontWeight: 600,
                      textAlign: "left",
                      mb: "4px",
                    }}
                  >
                    Teacher’s Best-Practice Session
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 12,
                      fontWeight: 400,
                      textAlign: "left",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      display: "-webkit-box",
                      lineClamp: 1,
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 3 /* number of lines to show */,
                    }}
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptatem sapiente, quae tempora dignissimos earum sequi
                    maxime illum quia itaque aperiam!
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: "10px",
                  }}
                >
                  <AccessTimeFilled
                    sx={{ fontSize: 13, color: "rgb(0,0,0,0.5)" }}
                  />
                  <Typography
                    sx={{
                      color: "rgb(0,0,0,0.5)",
                      fontSize: 11,
                      ml: "3px",
                    }}
                  >
                    1 hour ago
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            mb: 2,
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              p: "0 16px",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: 16,
                textAlign: "left",
              }}
            >
              Agenda Sekolah
            </Typography>
          </Box>
          <Box
            sx={{
              textAlign: "left",
              width: "100%",
              display: "flex",
              overflowY: "auto",
              pb: 1,
            }}
          >
            <Box sx={{ display: "flex" }}>
              <Box
                sx={{
                  width: 210,
                  height: 80,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  borderRadius: 2,
                  position: "relative",
                  ml: "16px",
                  mr: 1,
                  p: "10px",
                  pl: "16px",
                  border: "1px solid rgba(0, 0, 0, 0.1)",
                  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    width: 10,
                    borderRadius: 1,
                    height: "70%",
                    backgroundColor:theme.palette.primary.main,
                    position: "absolute",
                    left: "-5px",
                  }}
                />
                <Box sx={{ overflow: "hidden" }}>
                  <Typography
                    sx={{
                      fontSize: 12,
                      fontWeight: 400,
                      textAlign: "left",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      display: "-webkit-box",
                      lineClamp: 1,
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                      mb: "4px",
                    }}
                  >
                    After School Program with Headmaster
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <AccessTimeFilled
                    sx={{ fontSize: 13, color: "rgb(0,0,0,0.5)" }}
                  />
                  <Typography
                    sx={{
                      color: "rgb(0,0,0,0.5)",
                      fontSize: 11,
                      ml: "3px",
                    }}
                  >
                    Rabu, 14:00-15:00
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  width: 210,
                  height: 80,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  borderRadius: 2,
                  position: "relative",
                  mr: 1,
                  p: "10px",
                  pl: "16px",
                  border: "1px solid rgba(0, 0, 0, 0.1)",
                  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    width: 10,
                    borderRadius: 1,
                    height: "70%",
                    backgroundColor:theme.palette.primary.main,
                    position: "absolute",
                    left: "-5px",
                  }}
                />
                <Box sx={{ overflow: "hidden" }}>
                  <Typography
                    sx={{
                      fontSize: 12,
                      fontWeight: 400,
                      textAlign: "left",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      display: "-webkit-box",
                      lineClamp: 1,
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                      mb: "4px",
                    }}
                  >
                    After School Program with Headmaster
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <AccessTimeFilled
                    sx={{ fontSize: 13, color: "rgb(0,0,0,0.5)" }}
                  />
                  <Typography
                    sx={{
                      color: "rgb(0,0,0,0.5)",
                      fontSize: 11,
                      ml: "3px",
                    }}
                  >
                    Rabu, 14:00-15:00
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  width: 210,
                  height: 80,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  borderRadius: 2,
                  position: "relative",
                  mr: "24px",
                  p: "10px",
                  pl: "16px",
                  border: "1px solid rgba(0, 0, 0, 0.1)",
                  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    width: 10,
                    borderRadius: 1,
                    height: "70%",
                    backgroundColor:theme.palette.primary.main,
                    position: "absolute",
                    left: "-5px",
                  }}
                />
                <Box sx={{ overflow: "hidden" }}>
                  <Typography
                    sx={{
                      fontSize: 12,
                      fontWeight: 400,
                      textAlign: "left",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      display: "-webkit-box",
                      lineClamp: 1,
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                      mb: "4px",
                    }}
                  >
                    After School Program with Headmaster
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <AccessTimeFilled
                    sx={{ fontSize: 13, color: "rgb(0,0,0,0.5)" }}
                  />
                  <Typography
                    sx={{
                      color: "rgb(0,0,0,0.5)",
                      fontSize: 11,
                      ml: "3px",
                    }}
                  >
                    Rabu, 14:00-15:00
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
    </Stack>
  );
}
