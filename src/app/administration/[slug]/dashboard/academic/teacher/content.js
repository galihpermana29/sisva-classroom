'use client';

import { ExcelIcon, SortIcon } from '@/assets/SVGs';
import {
  Add,
  Cancel,
  DownloadRounded,
  Search,
  UploadFileRounded,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Divider,
  Hidden,
  InputAdornment,
  Menu,
  MenuItem,
  Modal,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { FormAddTeacher } from './components/FormAddTeacher';
import TeacherTable from './components/TeacherTable';

import AcademicAPI from '@/api/academic';
import UsersAPI from '@/api/users';
import { useFormik } from 'formik';
import { FormAddSubjectTeacher } from './components/FormAddSubjectTeacher';
import SubjectTable from './components/SubjectTable';
export default function StaffProfileContent() {
  const [emptyData, setEmptyData] = useState({});

  const formik = useFormik({
    initialValues: { emptyData },

    onSubmit: async (values) => {
      if (activeTab == 0) {
        const payload = {
          parent_type: 'subject',
          parent_id: values.subject,
          grade: values.grade,
          childs: values.teachers,
        };

        try {
          await AcademicAPI.replaceSubjectTeacher(payload);
        } catch (error) {
          console.log(error);
        }
      } else {
        const payload = {
          parent_type: 'teacher',
          parent_id: values.teacher,
          grade: values.grade,
          childs: values.subjects,
        };

        try {
          await AcademicAPI.replaceSubjectTeacher(payload);
        } catch (error) {
          console.log(error);
        }
      }

      getAllTeachersData();
      getAllSubjectData();
      getAllTeacher();
    },
  });

  const [dataTeacher, setDataTeacher] = useState([]);
  const [teacherList, setTeacherList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [gradeList, setGradeList] = useState([]);
  const [subjectData, setSubjectData] = useState([]);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  let [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('');
  const [gradeFilter, setGradeFilter] = useState('');
  const [teacherFilter, setTeacherFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortType, setSortType] = useState('ascending');
  const [sortSettings, setSortSettings] = useState('');
  const [openSortModal, setOpenSortModal] = useState(false);

  const [studyProgramOptions, setStudyProgramOptions] = useState('');
  const [gradeOptions, setGradeOptions] = useState('');

  const [openCreateSubjectModal, setOpenCreateSubjectModal] = useState(false);
  const [openCreateTeacherModal, setOpenCreateTeacherModal] = useState(false);

  const [activeTab, setActiveTab] = useState(0);
  let tabs = [
    {
      title: 'Mata Pelajaran',
      component: (
        <SubjectTable
          formik={formik}
          subjectList={subjectList}
          teacherList={teacherList}
          data={filteredData}
          subjectData={subjectData}
        />
      ),
    },
    {
      title: 'Guru',
      component: (
        <TeacherTable
          formik={formik}
          data={filteredData}
          teacherList={teacherList}
          gradeList={gradeList}
          dataTeacher={dataTeacher}
        />
      ),
    },
  ];

  // get all teachers data
  const getAllTeachersData = async () => {
    const {
      data: { data },
    } = await UsersAPI.getAllUsers('teacher');

    const activeTeacher = data
      .filter((at) => at.status == 'active')
      .map((at) => {
        return { id: at.id, name: at.name };
      });

    setTeacherList(activeTeacher);
  };

  const getAllSubjectData = async () => {
    const resTeacher = await AcademicAPI.getAllSubjectTeacher();
    const resSubject = await AcademicAPI.getAllSubject();
    const resProgram = await AcademicAPI.getAllProdi();

    const dataTeacher = resTeacher.data.data;
    const dataSubject = resSubject.data.data;
    const dataProgram = resProgram.data.data;

    let mappedData = [];

    dataProgram.forEach((dp) => {
      dataSubject.forEach((ds) => {
        if (dp.id == ds.study_program_id)
          dp.grades.forEach((dpg) => {
            mappedData.push({ ...ds, grade: dpg });
          });
      });
    });

    const data = mappedData.map((md) => {
      let teachers = [];
      dataTeacher.forEach((dt) => {
        if (md.grade == dt.grade && md.id == dt.subject_detail.id)
          teachers.push({
            teacher_id: dt.teacher_id,
            teacher_name: dt.teacher_name,
          });
      });

      return { ...md, teachers };
    });

    setSubjectData(data);

    const gradeOpt = [];

    dataSubject.forEach((subject) => {
      dataProgram.forEach((program) => {
        if (program.id == subject.study_program_id) {
          gradeOpt.push({
            id: subject.id,
            name: subject.name,
            grades: program.grades,
          });
        }
      });
    });

    setSubjectList(gradeOpt);

    const subjectOpt = [];

    mappedData.forEach((md, idx, arr) => {
      const filter = arr.filter((ar) => ar.grade == md.grade);

      if (filter.length == 1)
        subjectOpt.push({
          grade: md.grade,
          subjects: [{ subject_id: md.id, subject_name: md.name }],
        });
      else if (filter.length > 1) {
        let subj = [];

        filter.forEach((fl) => {
          subj.push({ subject_id: fl.id, subject_name: fl.name });
        });

        subjectOpt.push({ grade: md.grade, subjects: subj });

        mappedData.splice(idx, filter.length - 1);
      }
    });

    const grades = [...new Set(subjectOpt.map((so) => so.grade))].sort((a, b) =>
      a.localeCompare(b)
    );

    setGradeOptions(grades);
    setGradeList(subjectOpt);
  };

  const getAllTeacher = async () => {
    try {
      const {
        data: { data },
      } = await AcademicAPI.getAllSubjectTeacher();

      const teacherData = await UsersAPI.getAllUsers('teacher');
      const teachProfile = teacherData.data.data.filter(
        (td) => td.status == 'active'
      );

      const mappedData = [];

      teachProfile.forEach((tp) => {
        let subjects = [];
        let grades = [];

        data.forEach((dt) => {
          if (tp.id == dt.teacher_id) {
            if (!subjects.find((sb) => sb.subject_id == dt.subject_id))
              subjects.push({
                subject_id: dt.subject_id,
                subject_name: dt.subject_name,
                subject_grade: dt.grade,
              });
            if (!grades.includes(dt.grade)) grades.push(dt.grade);
          }
        });

        mappedData.push({ id: tp.id, name: tp.name, subjects, grades });
      });

      setDataTeacher(mappedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTeachersData();
    getAllSubjectData();
    getAllTeacher();
  }, []);

  useEffect(() => {
    let temp = [];
    activeTab === 0
      ? (temp = subjectData.filter((item) => {
          return (
            item.name.toLowerCase().includes(search.toLowerCase()) &&
            (gradeFilter == ''
              ? item
              : item.grade.toLowerCase() == gradeFilter.toLowerCase()) &&
            item.name.toLowerCase().includes(subjectFilter.toLowerCase())
          );
        }))
      : (temp = dataTeacher.filter((item) => {
          return (
            item.name.toLowerCase().includes(search.toLowerCase()) &&
            item.name.toLowerCase().includes(teacherFilter.toLowerCase())
          );
        }));
    // if (sortSettings && sortSettings.sortBy) {
    //   temp = temp.sort(function (a, b) {
    //     let x, y;
    //     if (activeTab === 0) {
    //       if (sortSettings.sortBy === "period_name") {
    //         x = a.period_name.toLowerCase();
    //         y = b.period_name.toLowerCase();
    //       }
    //       if (sortSettings.sortBy === "study_program") {
    //         x = a.study_program.toLowerCase();
    //         y = b.study_program.toLowerCase();
    //       }
    //       if (sortSettings.sortBy === "start_time") {
    //         x = a.start_time.toLowerCase();
    //         y = b.start_time.toLowerCase();
    //       }
    //       if (sortSettings.sortBy === "status") {
    //         x = a.status.toLowerCase();
    //         y = b.status.toLowerCase();
    //       }
    //     }

    //     if (activeTab === 1) {
    //       if (sortSettings.sortBy === "period_name") {
    //         x = a.period_name.toLowerCase();
    //         y = b.period_name.toLowerCase();
    //       }
    //       if (sortSettings.sortBy === "study_program") {
    //         x = a.study_program.toLowerCase();
    //         y = b.study_program.toLowerCase();
    //       }
    //       if (sortSettings.sortBy === "grade") {
    //         x = a.grade.toLowerCase();
    //         y = b.grade.toLowerCase();
    //       }
    //       if (sortSettings.sortBy === "curriculum") {
    //         x = a.curriculum.toLowerCase();
    //         y = b.curriculum.toLowerCase();
    //       }
    //     }

    //     if (sortSettings.sortType === "ascending") {
    //       if (x < y) {
    //         return -1;
    //       }
    //       if (x > y) {
    //         return 1;
    //       }
    //       return 0;
    //     } else if (sortSettings.sortType === "descending") {
    //       if (x > y) {
    //         return -1;
    //       }
    //       if (x < y) {
    //         return 1;
    //       }
    //       return 0;
    //     }
    //   });
    // }

    setFilteredData(temp);
    formik.setValues(emptyData);
  }, [
    subjectData,
    search,
    subjectFilter,
    sortSettings,
    activeTab,
    gradeFilter,
    teacherFilter,
    dataTeacher,
  ]);

  function Filters() {
    return (
      <Stack
        sx={{
          flexDirection: 'row',
          flex: 1,
          overflowX: 'auto',
          height: 54,
          px: { xs: 0, lg: 1 },
        }}
      >
        <Stack
          sx={{
            flexDirection: 'row',
            flex: 1,
            py: 1,
          }}
        >
          <TextField
            select
            size='small'
            label='Mata Pelajaran'
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
            sx={{
              flex: { xs: 1, lg: 0 },
              minWidth: 'fit-content',
              ml: 1,
              display: activeTab === 1 ? 'none' : 'flex',
            }}
            InputProps={{
              sx: { minWidth: 140, width: { xs: '100%', lg: 'fit-content' } },
              startAdornment: subjectFilter && (
                <Cancel
                  onClick={() => {
                    setSubjectFilter('');
                  }}
                  sx={{
                    fontSize: 14,
                    color: 'base.base50',
                    cursor: 'pointer',
                    transform: 'translateX(-4px)',
                    '&:hover': {
                      color: 'base.base60',
                    },
                  }}
                />
              ),
            }}
          >
            {subjectList &&
              subjectList.map((option, index) => (
                <MenuItem key={index} value={option.name}>
                  <Typography fontSize={14}>{option.name}</Typography>
                </MenuItem>
              ))}
          </TextField>
          <TextField
            select
            size='small'
            label='Tingkatan'
            value={gradeFilter}
            onChange={(e) => setGradeFilter(e.target.value)}
            sx={{
              flex: { xs: 1, lg: 0 },
              minWidth: 'fit-content',
              ml: 1,
              display: activeTab === 1 ? 'none' : 'flex',
            }}
            InputProps={{
              sx: { minWidth: 140, width: { xs: '100%', lg: 'fit-content' } },
              startAdornment: gradeFilter && (
                <Cancel
                  onClick={() => {
                    setGradeFilter('');
                  }}
                  sx={{
                    fontSize: 14,
                    color: 'base.base50',
                    cursor: 'pointer',
                    transform: 'translateX(-4px)',
                    '&:hover': {
                      color: 'base.base60',
                    },
                  }}
                />
              ),
            }}
          >
            {gradeOptions &&
              gradeOptions.map((option, index) => (
                <MenuItem key={index} value={option}>
                  <Typography fontSize={14}>{option}</Typography>
                </MenuItem>
              ))}
          </TextField>
          <TextField
            select
            size='small'
            label='Guru'
            value={teacherFilter}
            onChange={(e) => setTeacherFilter(e.target.value)}
            sx={{
              flex: { xs: 1, lg: 0 },
              minWidth: 'fit-content',
              ml: 1,
              display: activeTab === 0 ? 'none' : 'flex',
            }}
            InputProps={{
              sx: { minWidth: 140, width: { xs: '100%', lg: 'fit-content' } },
              startAdornment: teacherFilter && (
                <Cancel
                  onClick={() => {
                    setTeacherFilter('');
                  }}
                  sx={{
                    fontSize: 14,
                    color: 'base.base50',
                    cursor: 'pointer',
                    transform: 'translateX(-4px)',
                    '&:hover': {
                      color: 'base.base60',
                    },
                  }}
                />
              ),
            }}
          >
            {dataTeacher &&
              dataTeacher.map((option, index) => (
                <MenuItem key={index} value={option.name}>
                  <Typography fontSize={14}>{option.name}</Typography>
                </MenuItem>
              ))}
          </TextField>
        </Stack>
      </Stack>
    );
  }

  return (
    <Stack sx={{ height: '100%', width: '100%', p: { xs: 0, lg: 4 } }}>
      <Modal
        open={openCreateTeacherModal}
        onClose={() => {
          setOpenCreateTeacherModal(false);
          formik.setValues({ subject: '', grade: '', teachers: '' });
        }}
      >
        <Stack
          component={Paper}
          elevation={2}
          sx={{
            borderRadius: 2,
            zIndex: 20,
            margin: 'auto',
            position: 'fixed',
            height: 'fit-content',
            width: '360px',
            maxWidth: '80%',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
          }}
        >
          <Box
            sx={{
              padding: 2,
            }}
          >
            <Typography fontWeight={600} fontSize={16}>
              Tambah Guru
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ maxHeight: '70vh', overflowY: 'auto', px: 2 }}>
            <FormAddSubjectTeacher
              formik={formik}
              teacherList={teacherList}
              gradeList={gradeList}
              dataTeacher={dataTeacher}
            />
          </Box>
          <Divider />
          <Stack
            sx={{
              flexDirection: 'row',
              p: 2,
            }}
          >
            <Button
              variant='outlined'
              sx={{ flex: 1, mr: 1 }}
              onClick={() => {
                setOpenCreateTeacherModal(false);
                formik.setValues({ subject: '', grade: '', teachers: '' });
              }}
            >
              Batal
            </Button>
            <Button
              variant='contained'
              sx={{ flex: 1 }}
              onClick={() => {
                setOpenCreateTeacherModal(false);
                formik.handleSubmit();
              }}
            >
              Simpan
            </Button>
          </Stack>
        </Stack>
      </Modal>
      <Modal
        open={openCreateSubjectModal}
        onClose={() => {
          setOpenCreateSubjectModal(false);
          formik.setValues({ subject: '', grade: '', teachers: '' });
        }}
      >
        <Stack
          component={Paper}
          elevation={2}
          sx={{
            borderRadius: 2,
            zIndex: 20,
            margin: 'auto',
            position: 'fixed',
            height: 'fit-content',
            width: '360px',
            maxWidth: '80%',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
          }}
        >
          <Box
            sx={{
              padding: 2,
            }}
          >
            <Typography fontWeight={600} fontSize={16}>
              Tambah Mata Pelajaran
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ maxHeight: '70vh', overflowY: 'auto', px: 2 }}>
            <FormAddTeacher
              formik={formik}
              subjectList={subjectList}
              teacherList={teacherList}
              subjectData={subjectData}
            />
          </Box>
          <Divider />
          <Stack
            sx={{
              flexDirection: 'row',
              p: 2,
            }}
          >
            <Button
              variant='outlined'
              sx={{ flex: 1, mr: 1 }}
              onClick={() => {
                setOpenCreateSubjectModal(false);
                formik.setValues({ subject: '', grade: '', teachers: '' });
              }}
            >
              Batal
            </Button>
            <Button
              variant='contained'
              sx={{ flex: 1 }}
              onClick={() => {
                setOpenCreateSubjectModal(false);
                formik.handleSubmit();
              }}
            >
              Simpan
            </Button>
          </Stack>
        </Stack>
      </Modal>
      <Modal open={openSortModal} onClose={() => setOpenSortModal(false)}>
        <Stack
          component={Paper}
          elevation={2}
          sx={{
            padding: 2,
            borderRadius: 2,
            zIndex: 20,
            margin: 'auto',
            position: 'fixed',
            height: 'fit-content',
            width: '240px',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
          }}
        >
          <Typography fontWeight={600} fontSize={16}>
            Urutkan
          </Typography>
          <TextField
            select
            size='small'
            label='Data'
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            sx={{ flex: 1, mt: 2 }}
            InputProps={{
              startAdornment: sortBy && (
                <Cancel
                  onClick={() => {
                    setSortBy('');
                  }}
                  sx={{
                    fontSize: 14,
                    color: 'base.base50',
                    cursor: 'pointer',
                    transform: 'translateX(-4px)',
                    '&:hover': {
                      color: 'base.base60',
                    },
                  }}
                />
              ),
            }}
          >
            {(activeTab === 1
              ? [
                  { title: 'Tingkatan', slug: 'grade' },
                  { title: 'Periode', slug: 'period_name' },
                  { title: 'Program Studi', slug: 'study_program' },
                ]
              : [
                  { title: 'Periode', slug: 'period_name' },
                  { title: 'Rentang Waktu', slug: 'start_time' },
                  { title: 'Status', slug: 'status' },
                ]
            ).map((option) => (
              <MenuItem key={option.slug} value={option.slug}>
                <Typography fontSize={14}>{option.title}</Typography>
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            size='small'
            label='Jenis Urutan'
            value={sortType}
            disabled={!sortBy}
            onChange={(e) => setSortType(e.target.value)}
            sx={{ flex: 1, mt: 2, mb: 2 }}
          >
            {[
              { title: 'A-Z', slug: 'ascending' },
              { title: 'Z-A', slug: 'descending' },
            ].map((option) => (
              <MenuItem key={option.slug} value={option.slug}>
                <Typography fontSize={14}>{option.title}</Typography>
              </MenuItem>
            ))}
          </TextField>
          <Stack
            sx={{
              flexDirection: 'row',
            }}
          >
            <Button
              variant='outlined'
              sx={{ flex: 1, mr: 1 }}
              onClick={() => {
                setOpenSortModal(false);
                setSortBy(sortSettings.sortBy);
                setSortType(sortSettings.sortType);
              }}
            >
              Batal
            </Button>
            <Button
              variant='contained'
              sx={{ flex: 1 }}
              onClick={() => {
                setOpenSortModal(false);
                setSortSettings({ sortBy: sortBy, sortType: sortType });
              }}
            >
              Simpan
            </Button>
          </Stack>
        </Stack>
      </Modal>
      <Stack
        sx={{
          flexDirection: 'row',
          display: { xs: 'none', lg: 'flex' },
          mb: 2,
          alignItems: 'center',
        }}
      >
        <Typography sx={{ fontSize: 20, fontWeight: 600 }}>Guru</Typography>
      </Stack>

      <Stack
        component={Paper}
        variant='outlined'
        sx={{
          borderRadius: { xs: 0, lg: 2 },
          flex: 1,
          overflowY: 'hidden',
          maxHeight: '100%',
        }}
      >
        <Stack
          sx={{
            flexDirection: 'row',
            borderBottom: '1px solid rgb(0,0,0,0.12)',
            // height: 54,
            overflowX: 'auto',
          }}
        >
          {tabs.map((item, index) => {
            return (
              <Button
                key={index}
                sx={{
                  p: { xs: '16px 8px', lg: 2 },
                  minWidth: 140,
                  flex: { xs: 1, lg: 0 },
                  // height: 54,
                  borderBottom: '2px solid',
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                  borderColor:
                    activeTab === index ? 'primary.main' : 'transparent',
                }}
                onClick={() => {
                  setActiveTab(index);
                  setSubjectFilter('');
                  setSearch('');
                  setSortBy('');
                  setSortSettings('');
                  formik.setValues(emptyData);
                  index === 0 ? setFilteredData(subjectData) : null;
                }}
              >
                <Typography sx={{ fontWeight: 600, fontSize: 14 }}>
                  {item.title}
                </Typography>
              </Button>
            );
          })}
        </Stack>
        <Stack
          sx={{
            flexDirection: 'row',
            height: { xs: 'fit-content', lg: 70 },
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2,
            pt: 1,
            pb: { lg: 1, xs: 0 },
            mt: { xs: 1, lg: 0 },
          }}
        >
          <Stack
            sx={{
              flexDirection: 'row',
              flex: 1,
              alignItems: 'center',
            }}
          >
            <TextField
              // id="outlined-search"
              placeholder={`Cari ${tabs[activeTab].title}`}
              size='small'
              type='text'
              sx={{
                maxWidth: { xs: '100%', lg: '200px' },
                flex: 1,
                width: '100%',
                height: '100%',
                pr: 1,
              }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: search && (
                  <Cancel
                    onClick={() => {
                      setSearch('');
                    }}
                    sx={{
                      fontSize: 14,
                      color: 'base.base50',
                      cursor: 'pointer',
                      transform: 'translateX(-4px)',
                      '&:hover': {
                        color: 'base.base60',
                      },
                    }}
                  />
                ),
                endAdornment: (
                  <InputAdornment position='end'>
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
            <Hidden lgDown>
              <Box
                sx={{
                  display: {
                    lg: 'flex',
                    xs: 'none',
                  },
                  borderRight: { xs: 'none', lg: '1px solid rgb(0,0,0,0.12)' },

                  my: 1,
                  height: 36,
                }}
              />

              <Filters />
              <Box
                sx={{
                  display: {
                    lg: activeTab !== 0 ? 'flex' : 'none',
                    xs: 'none',
                  },
                  borderRight: { xs: 'none', lg: '1px solid rgb(0,0,0,0.12)' },
                  // ml: 1,
                  my: 1,
                  height: 36,
                }}
              />
            </Hidden>
          </Stack>

          <Stack
            sx={{
              flexDirection: 'row',
              pl: { xs: 0, lg: 1 },
            }}
          >
            <Button
              variant='outlined'
              color='primary'
              startIcon={<ExcelIcon />}
              sx={{
                display: { xs: 'none', lg: 'flex' },
                width: 'fit-content',
                height: '100%',
                width: 100,
                mr: 1,
                borderColor: 'green',
                backgroundColor: 'white',
                '&:hover': {
                  borderColor: 'green',
                  backgroundColor: 'base:base20',
                },
              }}
              id='profile-button'
              aria-controls={open ? 'profile-menu' : undefined}
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <Typography sx={{ color: 'green', fontSize: 14 }}>
                Excel
              </Typography>
            </Button>
            <Menu
              elevation={2}
              id='profile-menu'
              aria-labelledby='profile-button'
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <MenuItem onClick={handleClose} sx={{ padding: 1, width: 98 }}>
                <Stack flexDirection={'row'} alignItems={'center'}>
                  <DownloadRounded sx={{ fontSize: 18, mr: 1 }} />
                  <Typography sx={{ fontSize: 14 }}>Export</Typography>
                </Stack>
              </MenuItem>
              <MenuItem onClick={handleClose} sx={{ padding: 1 }}>
                <label htmlFor='import-csv'>
                  <Stack flexDirection={'row'} alignItems={'center'}>
                    <UploadFileRounded sx={{ fontSize: 18, mr: 1 }} />
                    <Typography sx={{ fontSize: 14 }}>Import</Typography>
                    <input
                      name={'import_csv'}
                      accept='csv'
                      id='import-csv'
                      type='file'
                      style={{
                        position: 'absolute',
                        opacity: '0',
                        border: '1px solid red',
                      }}
                      // onChange={handleImageChange}
                    />
                  </Stack>
                </label>
              </MenuItem>
            </Menu>

            <Button
              variant='contained'
              color='primary'
              startIcon={<Add />}
              sx={{
                width: 100,
                height: '100%',
              }}
              onClick={() =>
                activeTab === 0
                  ? setOpenCreateSubjectModal(true)
                  : activeTab === 1
                  ? setOpenCreateTeacherModal(true)
                  : null
              }
            >
              <Typography sx={{ fontSize: 14 }}>Tambah</Typography>
            </Button>
          </Stack>
        </Stack>

        <Stack
          sx={{
            flexDirection: 'row',
            px: 2,
            mb: 1,
            display: { xs: 'flex', lg: 'none' },
          }}
        >
          <Filters />
          <Stack sx={{ flexDirection: 'row', py: 1 }}>
            <Divider orientation='vertical' sx={{ mx: 1, display: 'flex' }} />
            <Button
              sx={{
                backgroundColor: 'base.base30',
                color: 'base.base50',
                fontSize: 18,
                height: 38,
                width: 'fit-content',
                '&:hover': {
                  backgroundColor: 'base.base40',
                },
              }}
              onClick={() => {
                setOpenSortModal(true);
              }}
            >
              <SortIcon />
            </Button>
          </Stack>
        </Stack>
        <Divider />
        <Box sx={{ flex: 1, overflowY: 'hidden' }}>
          {tabs[activeTab].component}
        </Box>
      </Stack>
    </Stack>
  );
}
