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
import { FormAddStudent } from './components/FormAddStudent';

import AcademicAPI from '@/api/academic';
import UsersAPI from '@/api/users';
import { useFormik } from 'formik';
import ClassElectiveTable from './components/ClassElectiveTable';
import ClassTable from './components/ClassTable';
import { FormAddStudentGroup } from './components/FormAddStudentGroup';
import StudentTable from './components/StudentTable';
export default function StaffProfileContent() {
  const [emptyData, setEmptyData] = useState({});

  const formik = useFormik({
    initialValues: { emptyData },

    onSubmit: async (values) => {
      try {
        if (activeTab == 0) {
          if (!values.id) {
            const payload = {
              name: values.name,
              type: 'homeroom',
              period_id: values.period_id,
              study_program_id: values.study_program_id,
              grade: values.grade,
              detail: {
                homeroom_teacher_id: values.homeroom_teacher_id,
              },
            };

            await AcademicAPI.createStudentGroup(payload);
          } else {
            const id = values.id;

            const payload = {
              name: values.name,
              study_program_id: values.study_program_id,
              grade: values.grade,
              detail: {
                homeroom_teacher_id: values.homeroom_teacher_id,
              },
            };

            await AcademicAPI.updateStudentGroup(id, payload);
          }
        } else if (activeTab == 2) {
          const id = values.class;

          const payload = {
            student_id: values.student,
          };

          await AcademicAPI.insertStudentToStudentGroup(id, payload);
        }

        getClassesData();
        getAllCreateGroupData();
      } catch (error) {
        console.log(error);
      } finally {
        formik.setValues(emptyData);
      }
    },
  });

  const removeStudent = async (class_id, student_id) => {
    try {
      const payload = {
        student_id: student_id,
      };

      await AcademicAPI.removeStudentFromGroup(class_id, payload);

      getClassesData();
      getAllCreateGroupData();
    } catch (error) {
      console.log(error);
    }
  };

  const editStudent = async (class_id, new_class_id, student_id) => {
    try {
      const id = new_class_id;

      const payload = {
        student_id: student_id,
      };

      await AcademicAPI.insertStudentToStudentGroup(id, payload);

      await removeStudent(class_id, student_id);
    } catch (error) {
      console.log(error);
    }
  };

  const removeStudentGroup = async (class_id) => {
    try {
      await AcademicAPI.removeStudentGroup(class_id);

      getClassesData();
      getAllCreateGroupData();
    } catch (error) {
      console.log(error);
    }
  };

  const [studentData, setStudentData] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const [studentList, setStudentList] = useState([]);
  const [teacherList, setTeacherList] = useState([]);
  const [periodList, setPeriodList] = useState([]);
  const [studyProgramList, setStudyProgramList] = useState([]);

  const [gradeOpt, setGradeOpt] = useState();
  const [classOpt, setClassOpt] = useState();
  const [homeroomOpt, setHomeroomOpt] = useState();
  const [studentClassOpt, setStudentClassOpt] = useState();
  const [studentGradeOpt, setStudentGradeOpt] = useState();

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
  const [sortBy, setSortBy] = useState('');
  const [sortType, setSortType] = useState('ascending');
  const [sortSettings, setSortSettings] = useState('');
  const [openSortModal, setOpenSortModal] = useState(false);

  const [openInsertStudentModal, setOpenInsertStudentModal] = useState(false);
  const [openCreateClassModal, setOpenCreateClassModal] = useState(false);
  const [openCreateStudentGroupModal, setOpenCreateStudentGroupModal] =
    useState(false);

  const [classFilter, setClassFilter] = useState('');
  const [gradeFilter, setGradeFilter] = useState('');
  const [homeroomFilter, setHomeroomFilter] = useState('');

  const [activeTab, setActiveTab] = useState(0);
  let tabs = [
    {
      title: 'Kelas Wajib',
      component: (
        <ClassTable
          formik={formik}
          data={filteredData}
          removeStudentGroup={removeStudentGroup}
          teacherList={teacherList}
          periodList={periodList}
          studyProgramList={studyProgramList}
        />
      ),
    },
    {
      title: 'Kelas Pilihan',
      component: <ClassElectiveTable formik={formik} data={filteredData} />,
    },
    {
      title: 'Murid',
      component: (
        <StudentTable
          formik={formik}
          data={filteredData}
          removeStudent={removeStudent}
          groupList={groupList}
          teacherList={teacherList}
          studentList={studentList}
          editStudent={editStudent}
        />
      ),
    },
  ];

  const [studentGroupData, setStudentGroupData] = useState([]);

  const getClassesData = async () => {
    try {
      const fetchTeachers = await UsersAPI.getAllUsers('teacher');
      const fetchGroup = await AcademicAPI.getAllStudentGroup();
      const fetchStudent = await AcademicAPI.getAllStudentInGroup();
      const fetchAllStudent = await UsersAPI.getAllUsers('student');

      const groupData = fetchGroup.data.data;
      const studentData = fetchStudent.data.data;
      const allStudentData = fetchAllStudent.data.data;

      const resTeachers = fetchTeachers.data.data;

      const filterStudent = allStudentData.reduce((a, b) => {
        const exist = studentData.find((sd) => sd.student_id == b.id);

        if (b.status == 'active' && !exist) {
          return [...a, b];
        }

        return a;
      }, []);

      setStudentList(filterStudent);
      setGroupList(groupData);
      setTeacherList(resTeachers);

      const groupRes = groupData
        .map((gd) => {
          const students = studentData.filter(
            (sd) => sd.student_group_id == gd.id
          );

          return {
            id: gd.id,
            type: gd.type,
            period: gd.period_name,
            period_id: gd.period_id,
            study_program: gd.study_program_name,
            study_program_id: gd.study_program_id,
            guardian: gd.detail.homeroom_teacher_name,
            guardian_id: gd.detail.homeroom_teacher_id,
            grade: gd.grade,
            class: gd.name,
            students: students.length,
          };
        })
        .sort((a, b) => (a.grade == b.grade ? 0 : a.grade < b.grade ? -1 : 1));

      const studentRes = studentData.map((sd) => {
        const group = groupData.find((gd) => gd.id == sd.student_group_id);

        return {
          id: sd.student_group_id,
          class: sd.student_group_name,
          student: sd.student_name,
          student_id: sd.student_id,
          grade: group.grade,
        };
      });

      setStudentData(studentRes);
      setStudentGroupData(groupRes);

      const guardianList = [...new Set(groupRes.map((gr) => gr.guardian))].sort(
        (a, b) => a.localeCompare(b)
      );

      const classList = [...new Set(groupRes.map((gr) => gr.class))].sort(
        (a, b) => a.localeCompare(b)
      );

      const gradeList = [...new Set(groupRes.map((gr) => gr.grade))].sort(
        (a, b) => a.localeCompare(b)
      );

      const gradeStudentList = [
        ...new Set(studentRes.map((gr) => gr.grade)),
      ].sort((a, b) => a.localeCompare(b));

      const classStudentList = [
        ...new Set(studentRes.map((gr) => gr.class)),
      ].sort((a, b) => a.localeCompare(b));

      setHomeroomOpt(guardianList);
      setClassOpt(classList);
      setGradeOpt(gradeList);

      setStudentGradeOpt(gradeStudentList);
      setStudentClassOpt(classStudentList);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllCreateGroupData = async () => {
    const fetchPeriod = await AcademicAPI.getAllPeriod();
    const fetchStudyProgram = await AcademicAPI.getAllProdi();

    const resPeriod = fetchPeriod.data.data;
    const resProgram = fetchStudyProgram.data.data.filter(
      (fsp) => fsp.status == 'active'
    );

    setPeriodList(resPeriod);
    setStudyProgramList(resProgram);
  };

  useEffect(() => {
    getClassesData();
    getAllCreateGroupData();
  }, []);

  useEffect(() => {
    let temp = [];
    activeTab === 0
      ? (temp = studentGroupData.filter((item) => {
          return (
            item.class.toLowerCase().includes(search.toLowerCase()) &&
            (gradeFilter == ''
              ? item
              : item.grade.toLowerCase() == gradeFilter.toLowerCase()) &&
            item.class.toLowerCase().includes(classFilter.toLowerCase()) &&
            item.guardian
              .toLowerCase()
              .includes(homeroomFilter.toLowerCase()) &&
            item.type === 'homeroom'
          );
        }))
      : activeTab === 1
      ? (temp = studentGroupData.filter((item) => {
          return (
            item.class.toLowerCase().includes(search.toLowerCase()) &&
            item.type === 'elective'
          );
        }))
      : (temp = studentData.filter((item) => {
          return (
            item.student.toLowerCase().includes(search.toLowerCase()) &&
            (gradeFilter == ''
              ? item
              : item.grade.toLowerCase() == gradeFilter.toLowerCase()) &&
            item.class.toLowerCase().includes(classFilter.toLowerCase())
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
    search,
    sortSettings,
    activeTab,
    studentGroupData,
    classFilter,
    homeroomFilter,
    gradeFilter,
    studentData,
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
            label='Tingkatan'
            value={gradeFilter}
            onChange={(e) => setGradeFilter(e.target.value)}
            sx={{
              flex: { xs: 1, lg: 0 },
              minWidth: 'fit-content',
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
            {activeTab == 0
              ? gradeOpt &&
                gradeOpt.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    <Typography fontSize={14}>{option}</Typography>
                  </MenuItem>
                ))
              : studentGradeOpt &&
                studentGradeOpt.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    <Typography fontSize={14}>{option}</Typography>
                  </MenuItem>
                ))}
          </TextField>
          <TextField
            select
            size='small'
            label='Kelas'
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
            sx={{
              flex: { xs: 1, lg: 0 },
              minWidth: 'fit-content',
              ml: 1,
            }}
            InputProps={{
              sx: { minWidth: 140, width: { xs: '100%', lg: 'fit-content' } },
              startAdornment: classFilter && (
                <Cancel
                  onClick={() => {
                    setClassFilter('');
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
            {activeTab == 1
              ? classOpt &&
                classOpt.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    <Typography fontSize={14}>{option}</Typography>
                  </MenuItem>
                ))
              : studentClassOpt &&
                studentClassOpt.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    <Typography fontSize={14}>{option}</Typography>
                  </MenuItem>
                ))}
          </TextField>
          <TextField
            select
            size='small'
            label='Wali Kelas'
            value={homeroomFilter}
            onChange={(e) => setHomeroomFilter(e.target.value)}
            sx={{
              flex: { xs: 1, lg: 0 },
              minWidth: 'fit-content',
              ml: 1,
              display: activeTab === 0 ? 'flex' : 'none',
            }}
            InputProps={{
              sx: { minWidth: 140, width: { xs: '100%', lg: 'fit-content' } },
              startAdornment: homeroomFilter && (
                <Cancel
                  onClick={() => {
                    setHomeroomFilter('');
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
            {homeroomOpt &&
              homeroomOpt.map((option, index) => (
                <MenuItem key={index} value={option}>
                  <Typography fontSize={14}>{option}</Typography>
                </MenuItem>
              ))}
          </TextField>
          {/* <TextField
            select
            size='small'
            label='Kelas'
            value={studyProgramFilter}
            onChange={(e) => setStudyProgramFilter(e.target.value)}
            sx={{
              flex: { xs: 1, lg: 0 },
              minWidth: 'fit-content',
              ml: 1,
              display: activeTab === 2 ? 'flex' : 'none',
            }}
            InputProps={{
              sx: { minWidth: 140, width: { xs: '100%', lg: 'fit-content' } },
              startAdornment: studyProgramFilter && (
                <Cancel
                  onClick={() => {
                    setStudyProgramFilter('');
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
            {['X IPA 1', 'X IPA 2', 'X IPA 3', 'X IPA 4', 'X IPA 5'].map(
              (option, index) => (
                <MenuItem key={index} value={option}>
                  <Typography fontSize={14}>{option}</Typography>
                </MenuItem>
              )
            )}
          </TextField> */}
        </Stack>
      </Stack>
    );
  }

  return (
    <Stack sx={{ height: '100%', width: '100%', p: { xs: 0, lg: 4 } }}>
      <Modal
        open={openCreateStudentGroupModal}
        onClose={() => {
          setOpenCreateStudentGroupModal(false);
          formik.setValues({});
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
              Tambah Kelas Wajib
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ maxHeight: '70vh', overflowY: 'auto', px: 2 }}>
            <FormAddStudentGroup
              formik={formik}
              teacherList={teacherList}
              periodList={periodList}
              studyProgramList={studyProgramList}
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
                setOpenCreateStudentGroupModal(false);
                formik.setValues({});
              }}
            >
              Batal
            </Button>
            <Button
              variant='contained'
              sx={{ flex: 1 }}
              onClick={() => {
                setOpenCreateStudentGroupModal(false);
                formik.handleSubmit();
              }}
            >
              Simpan
            </Button>
          </Stack>
        </Stack>
      </Modal>
      <Modal
        open={openInsertStudentModal}
        onClose={() => {
          setOpenInsertStudentModal(false);
          formik.setValues({});
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
              Tambah Murid
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ maxHeight: '70vh', overflowY: 'auto', px: 2 }}>
            <FormAddStudent
              formik={formik}
              studentList={studentList}
              groupList={groupList}
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
                setOpenInsertStudentModal(false);
                formik.setValues(emptyData);
              }}
            >
              Batal
            </Button>
            <Button
              variant='contained'
              sx={{ flex: 1 }}
              onClick={() => {
                setOpenInsertStudentModal(false);
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
                  { title: 'Program Studi', slug: 'study_program' },
                  { title: 'Tingkatan', slug: 'grade' },
                  { title: 'Kurikulum', slug: 'curriculum' },
                ]
              : [
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
        <Typography sx={{ fontSize: 20, fontWeight: 600 }}>Kelas</Typography>
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
                  setSearch('');
                  setSortBy('');
                  setGradeFilter('');
                  setClassFilter('');
                  setHomeroomFilter('');
                  setSortSettings('');
                  formik.setValues(emptyData);
                  index === 0 ? setFilteredData(studentGroupData) : null;
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
                  ? setOpenCreateStudentGroupModal(true)
                  : activeTab === 1
                  ? setOpenCreateClassModal(true)
                  : setOpenInsertStudentModal(true)
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
