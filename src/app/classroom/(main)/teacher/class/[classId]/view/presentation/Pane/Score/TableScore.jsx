"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Avatar, Form, InputNumber, Popconfirm, Table, Typography } from "antd";
import { ConfigProvider } from "antd";
import { Kumbh_Sans } from "next/font/google";
import { Edit03 } from "@untitled-ui/icons-react";
import placeholderImage from "@/assets/placeholder.jpg";
import Image from "next/image";
import AverageImage from "@/assets/average-score.png";
import { useGetScores } from "../../../../usecase/hooks/use-scores";
import { useUpdateScore } from "../../../../usecase/hooks/use-update-score";
import { dateTimeFormatter } from "../../../../usecase/dateFormatter";

const kumbh = Kumbh_Sans({ subsets: ["latin"] });

const processData = (apiData) => {
  const studentsMap = {};
  apiData.forEach(
    ({ student_name, student_image, task_id, task_name, task_score }) => {
      if (!studentsMap[student_name]) {
        studentsMap[student_name] = {
          key: student_name,
          siswa: student_name,
          student_image,
          tasks: {},
        };
      }
      studentsMap[student_name].tasks[task_id] = {
        task_name,
        task_score,
      };
    }
  );
  return Object.values(studentsMap);
};

const calculateAverages = (data, taskIds) => {
  const averages = taskIds.reduce((acc, taskId) => {
    const total = data.reduce(
      (sum, student) => sum + (student.tasks[taskId]?.task_score || 0),
      0
    );
    acc[taskId] = {
      task_name: data[0].tasks[taskId]?.task_name,
      task_score: Math.round(total / data.length),
    };
    return acc;
  }, {});

  return {
    key: "0",
    siswa: "Rata-rata kelas",
    tasks: averages,
  };
};

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = <InputNumber max={100} min={0} />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[{ required: true, message: `Please Input ${title}!` }]}
          initialValue={record.tasks[dataIndex]?.task_score}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default function TableScore() {
  const { scores, loading } = useGetScores();
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [taskIds, setTaskIds] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const { updateScoreStudent, loading: loadingUpdate } = useUpdateScore();

  useEffect(() => {
    if (!loading && scores.length > 0) {
      const processedData = processData(scores);
      const uniqueTaskIds = [...new Set(scores.map((item) => item.task_id))];
      setTaskIds(uniqueTaskIds);

      const averageRow = calculateAverages(processedData, uniqueTaskIds);
      setData([averageRow, ...processedData]);
    }
  }, [scores, loading]);

  const isEditing = (record) => record.key === editingKey && record.key !== "0";

  const edit = (record) => {
    const formValues = {
      siswa: record.siswa,
    };
    taskIds.forEach((taskId) => {
      formValues[taskId] = record.tasks[taskId]?.task_score;
    });
    form.setFieldsValue(formValues);
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const record = data.find((item) => item.key === key);
      if (record) {
        for (const taskId of taskIds) {
          if (row[taskId] !== record.tasks[taskId]?.task_score) {
            await updateScoreStudent(taskId, {
              value: row[taskId],
              student_id: scores.find((s) => s.student_name === record.siswa)
                .student_id,
            });
            record.tasks[taskId].task_score = row[taskId];
          }
        }
        const updatedData = [...data];
        const processedData = updatedData.slice(1);
        const newAverageRow = calculateAverages(processedData, taskIds);

        setData([newAverageRow, ...processedData]);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = useMemo(
    () => [
      {
        title: <div>Siswa</div>,
        dataIndex: "siswa",
        editable: false,
        align: "center",
        width: 160,
        fixed: "left",
        className: `${kumbh.className}`,
        render: (text, record) => {
          if (record.key === "0") {
            return (
              <div
                className={`inline-flex items-center justify-center gap-0.5 text-sm font-normal text-[#333333] ${kumbh.className}`}
              >
                <Image
                  src={AverageImage}
                  alt="average score icon"
                  className="size-6 max-sm:hidden"
                />
                {text}
              </div>
            );
          }
          return (
            <div
              className={`${kumbh.className} flex items-center justify-center gap-2 font-normal text-base90`}
            >
              <div>
                <Avatar
                  src={record.student_image || placeholderImage.src}
                  size={30}
                  className="max-sm:hidden"
                />
              </div>
              {text}
            </div>
          );
        },
      },
      ...taskIds.map((taskId) => ({
        title: (
          <div className="flex flex-col items-center justify-start text-base90 bg-white p-4 -m-4">
            <span>Nilai {data[0].tasks[taskId]?.task_name}</span>
            <span className="text-base90 font-normal text-xs mt-2 text-left">
              {dateTimeFormatter(
                scores.find((s) => s.task_id === taskId)?.task_date
              )}
            </span>
          </div>
        ),
        dataIndex: taskId,
        editable: true,
        align: "center",
        width: 170,
        className: `${kumbh.className} bg-[#F9F9F9] font-normal text-base90`,
        render: (_, record) => record.tasks[taskId]?.task_score,
      })),
      {
        title: "Aksi",
        dataIndex: "operation",
        align: "center",
        fixed: "right",
        width: 100,
        className: `${kumbh.className}`,
        render: (_, record) => {
          const editable = isEditing(record);
          if (record.key === "0") return null;
          return editable ? (
            <span>
              <Typography.Link
                onClick={() => save(record.key)}
                style={{ marginInlineEnd: 8 }}
              >
                Save
              </Typography.Link>
              <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                <a>Cancel</a>
              </Popconfirm>
            </span>
          ) : (
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
              className="inline-flex gap-1 font-normal items-center"
            >
              Edit
              <Edit03 width={16} height={16} />
            </Typography.Link>
          );
        },
      },
    ],
    [data, editingKey, taskIds, scores]
  );

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: "number",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              borderColor: "#D0D5DD",
              headerBg: "#fffff",
              headerColor: "#1D2939",
              rowHoverBg: "#f8f9fa",
            },
          },
        }}
      >
        <Table
          components={{ body: { cell: EditableCell } }}
          dataSource={data}
          columns={mergedColumns}
          pagination={false}
          className={`${kumbh.className} shadow-table  rounded-xl`}
          loading={loading || loadingUpdate || scores.length <= 0}
          tableLayout="auto"
          bordered
          scroll={{
            x: "max-content",
          }}
        />
      </ConfigProvider>
    </Form>
  );
}
