import { Form, Tabs } from "antd";
import React, { useState } from "react";
import SisvaButton from "../../Button/GlobalButton";
import { SisvaInputPassword } from "../../Input/SisvaInputField";

const PasswordSection = ({ form, loading, handleSubmitSection, setIsEdit }) => {
  const [passwordSection, setPasswordSection] = useState("change-password");

  return (
    <Form
      form={form}
      name="password"
      onFinish={(val) => handleSubmitSection(val, "password", passwordSection)}
      layout="vertical"
      className="w-full"
      disabled={loading}
    >
      <Tabs
        defaultActiveKey={passwordSection}
        onChange={(e) => setPasswordSection(e)}
        items={[
          {
            key: "change-password",
            label: "Change Password",
            children: (
              <>
                <Form.Item name="current_password" label="Password Lama">
                  <SisvaInputPassword
                    customSize="md"
                    shadow
                    placeholder="Password Lama"
                  />
                </Form.Item>
                <Form.Item name="new_password_change" label="Password Baru">
                  <SisvaInputPassword
                    customSize="md"
                    shadow
                    placeholder="Password Baru"
                  />
                </Form.Item>
              </>
            ),
          },
          {
            key: "reset-password",
            label: "Reset Password",
            children: (
              <>
                <Form.Item name="new_password_reset" label="Password Baru">
                  <SisvaInputPassword
                    customSize="md"
                    shadow
                    placeholder="Password Baru"
                  />
                </Form.Item>
                <Form.Item
                  name="confirm_password"
                  label="Konfirmasi Password Baru"
                  dependencies={["password"]}
                  rules={[
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (
                          !value ||
                          getFieldValue("new_password_reset") === value
                        ) {
                          return Promise.resolve();
                        }
                        return Promise.reject("Kedua password tidak cocok!");
                      },
                    }),
                  ]}
                >
                  <SisvaInputPassword
                    customSize="md"
                    shadow
                    placeholder="Konfirmasi Password Baru"
                  />
                </Form.Item>
              </>
            ),
          },
        ]}
      />
      {/* Action buttons */}
      <div className="flex justify-end mt-4 gap-2">
        <SisvaButton
          btn_type="primary"
          loading={loading}
          htmlType="submit"
          btn_size="lg"
        >
          Simpan
        </SisvaButton>
      </div>
    </Form>
  );
};

export default PasswordSection;
