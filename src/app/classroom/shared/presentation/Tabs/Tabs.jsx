import { ConfigProvider, Tabs as AntdTabs } from "antd";

const Tabs = ({ defaultActiveKey, tabList, centered = true, tabPosition }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#F96756",
        },
      }}
    >
      <AntdTabs
        defaultActiveKey={defaultActiveKey}
        centered={centered}
        tabPosition={tabPosition}
        items={tabList}
      />
    </ConfigProvider>
  );
};

export default Tabs;
