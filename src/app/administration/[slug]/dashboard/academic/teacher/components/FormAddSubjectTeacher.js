'use client';

import {
  Checkbox,
  Chip,
  FormControlLabel,
  MenuItem,
  MenuList,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { formAddTeacher } from '@/globalcomponents/FormFields';
import { useEffect, useState } from 'react';

export const FormAddSubjectTeacher = ({
  formik,
  editing,
  teacherList,
  gradeList,
  dataTeacher,
}) => {
  const [subjectData, setSubjectData] = useState([]);
  const [searchTerms, setSearchTerms] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [clicked, setClicked] = useState(false);

  const updatedFields = formAddTeacher.map((field) => {
    if (field.name == 'teacher') {
      field.data = teacherList;
    }

    if (field.name == 'grade') {
      field.data = gradeList;
    }

    return field;
  });

  const fetchSubject = async (grade, id) => {
    const subjects = gradeList.find((sp) => sp.grade == grade).subjects;

    setSelectedSubject([]);
    const selected = dataTeacher.find((dt) => dt.id == id);

    const subjectIds = [];

    if (selected && selected.subjects) {
      selected.subjects.forEach((ss) => {
        if (ss.subject_grade == grade) {
          subjectIds.push(ss.subject_id);
        }
      });
    }

    setSelectedSubject(subjectIds);

    setSubjectData(subjects);
  };

  const filteredSubject = subjectData.filter((tl) =>
    tl.subject_name.toLowerCase().includes(searchTerms.toLowerCase())
  );

  const handleSelected = (opt) => {
    if (selectedSubject.includes(opt)) {
      setSelectedSubject(selectedSubject.filter((o) => o !== opt));
    } else {
      setSelectedSubject([...selectedSubject, opt]);
    }
  };

  const previewSubject = subjectData.filter((tl) =>
    selectedSubject.includes(tl.subject_id)
  );

  useEffect(() => {
    formik.setFieldValue('subjects', selectedSubject);
  }, [selectedSubject]);

  return (
    <>
      {updatedFields.map((field) =>
        field.type === 'text' ? (
          <Stack sx={{ my: 1 }} key={field.name}>
            <Typography variant='body2' fontWeight={600} mb={0.5}>
              {field.label}
            </Typography>
            <TextField
              name={field.name}
              placeholder={field.placeholder}
              fullWidth
              value={formik.values[field.name]}
              onChange={(e) => formik.setFieldValue(field.name, e.target.value)}
            />
          </Stack>
        ) : field.type === 'select' ? (
          field.name === 'teacher' ? (
            <Stack
              sx={{ my: 1 }}
              key={field.name}
              onFocus={() => {
                setClicked(false);
              }}
            >
              <Typography variant='body2' fontWeight={600} mb={0.5}>
                {field.label}
              </Typography>
              <TextField
                select
                value={formik.values[field.name]}
                disabled={editing ? true : false}
                onChange={(e) => {
                  formik.setFieldValue(field.name, e.target.value);
                  formik.setFieldValue('grade', '');
                }}
                sx={{ flex: { xs: 1, lg: 0 } }}
                onClick={() => {
                  setClicked(false);
                }}
              >
                {field.data.map((option, idx) => (
                  <MenuItem key={idx} value={option.id}>
                    <Typography fontSize={14}>{option.name}</Typography>
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
          ) : field.name === 'grade' ? (
            <Stack
              sx={{ my: 1 }}
              key={field.name}
              onFocus={() => {
                setClicked(false);
              }}
            >
              <Typography variant='body2' fontWeight={600} mb={0.5}>
                {field.label}
              </Typography>
              <TextField
                select
                value={formik.values[field.name]}
                onChange={(e) => {
                  formik.setFieldValue(field.name, e.target.value);
                  fetchSubject(e.target.value, formik.values.teacher);
                  // defaultSelected(e.target.value, formik.values.teacher);
                }}
                sx={{ flex: { xs: 1, lg: 0 } }}
              >
                {formik.values.teacher ? (
                  field.data.map((option, idx) => (
                    <MenuItem key={idx} value={option.grade}>
                      <Typography fontSize={14}>{option.grade}</Typography>
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem>
                    <Typography fontSize={14} color='gray'>
                      Pilih Guru Terlebih Dahulu
                    </Typography>
                  </MenuItem>
                )}
              </TextField>
            </Stack>
          ) : null
        ) : (
          <Stack
            sx={{ my: 1 }}
            key={field.name}
            onFocus={() => {
              setClicked(true);
            }}
          >
            <Typography variant='body2' fontWeight={600} mb={0.5}>
              {field.label}
            </Typography>
            <Stack
              sx={{ my: 1, flexDirection: 'row', gap: 1, overflowY: 'auto' }}
            >
              {previewSubject.map((option) => (
                <Chip
                  label={option.subject_name}
                  variant='outlined'
                  color='primary'
                />
              ))}
            </Stack>
            <TextField
              type='text'
              placeholder={field.placeholder}
              value={searchTerms}
              onChange={(e) => setSearchTerms(e.target.value)}
              sx={{ flex: { xs: 1, lg: 0 } }}
            ></TextField>
            {clicked && (
              <MenuList
                sx={
                  filteredSubject.length
                    ? {
                        gap: 1,
                        my: 1,
                        height: '15vh',
                        overflowY: 'auto',
                      }
                    : { my: 1, mx: 1 }
                }
              >
                {filteredSubject.length ? (
                  filteredSubject.map((option, idx) => (
                    <MenuItem
                      key={idx}
                      selected={
                        selectedSubject.includes(option.subject_id)
                          ? true
                          : false
                      }
                      value={option.subject_id}
                      sx={{
                        justifyContent: 'space-between',
                      }}
                    >
                      <FormControlLabel
                        value={option.subject_id}
                        control={<Checkbox />}
                        label={option.subject_name}
                        sx={{ width: 1 }}
                        checked={selectedSubject.includes(option.subject_id)}
                        onChange={() => {
                          handleSelected(option.subject_id);
                        }}
                      />
                    </MenuItem>
                  ))
                ) : (
                  <Typography fontSize={14} color='gray'>
                    Pilih Tingkatan Terlebih Dahulu
                  </Typography>
                )}
              </MenuList>
            )}
          </Stack>
        )
      )}
    </>
  );
};
