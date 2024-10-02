import { ConfigProvider, Tabs as AntdTabs } from "antd";

const Tabs = ({ defaultActiveKey, tabList, centered = true, tabPosition }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#F96756",
          colorText: "#98A2B3",
          fontFamily: "--var(--font-kumbh)",
        },
      }}
    >
      <AntdTabs
        className="font-bold tracking-wide"
        defaultActiveKey={defaultActiveKey}
        centered={centered}
        tabPosition={tabPosition}
        items={tabList}
      />
    </ConfigProvider>
  );
};

export default Tabs;
