import { ConfigProvider, Tabs as AntdTabs } from "antd";

const Tabs = ({
  defaultActiveKey,
  tabList,
  centered = true,
  tabPosition,
  ...props
}) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#F96756",
        },
        components: {
          Tabs: {
            colorText: "#98A2B3",
            fontFamily: "--var(--font-kumbh)",
          },
        },
      }}
    >
      <AntdTabs
        className="font-bold tracking-wide"
        defaultActiveKey={defaultActiveKey}
        centered={centered}
        tabPosition={tabPosition}
        items={tabList}
        {...props}
      />
    </ConfigProvider>
  );
};

export default Tabs;
