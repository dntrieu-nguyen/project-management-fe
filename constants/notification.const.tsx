import ListNotifications from "@/components/mocules/ListNotifications";
import ConditionRender from "@/hoc/ConditionRender";
import { INotificationCenterProps } from "@/types/components";
import { formatDate } from "@/utils/utils";
import { LoadingOutlined } from "@ant-design/icons";
import { Avatar, Button, List, Spin } from "antd";

export const getNotificationItems = (
  props: INotificationCenterProps,
  onAcceptInvite: (key) => void,
  onDeclineInvite: (key) => void,
  acceptLoading: boolean,
  declineLoading: boolean,
) => {
  const {
    normalNotifications,
    inviteNotifications,
    countNormal,
    countInvite,
    loadingNormal,
    loadingInvite,
    loadNormal,
    loadInvite,
  } = props;
  return [
    {
      key: "normal",
      label: `Thông báo (${countNormal})`,
      children: (
        <>
          <div className="max-h-main overflow-y-auto">
            <ListNotifications data={normalNotifications} />
            <ConditionRender condition={Boolean(normalNotifications) && normalNotifications.length > 0}>
              <Button className="w-full" type="text" onClick={loadNormal} disabled={loadingNormal}>
                {loadingNormal ? <Spin indicator={<LoadingOutlined spin />} /> : "Tải thêm"}
              </Button>
            </ConditionRender>
            <ConditionRender condition={Boolean(normalNotifications) && normalNotifications.length === 0}>
              <p className="text-center text-gray-500">Không có thông báo nào</p>
            </ConditionRender>
          </div>
        </>
      ),
    },
    {
      key: "invite",
      label: `Lời mời (${countInvite})`,
      children: (
        <>
          <div className="max-h-main overflow-y-auto">
            <List
              dataSource={inviteNotifications}
              className="w-96"
              renderItem={(item) => (
                <List.Item className="w-full relative hover:bg-slate-100/90 hover:cursor-pointer hover:rounded-md">
                  <List.Item.Meta
                    avatar={<Avatar src="#" />}
                    title={<>{item.message}</>}
                    description={
                      <div className="flex justify-between gap-2">
                        {formatDate(item.created_at, "string")}
                        <div className="flex justify-end gap-2 p-2">
                          <Button
                            loading={acceptLoading}
                            type="dashed"
                            onClick={() => onAcceptInvite(item)}
                            size="small"
                            color="primary"
                          >
                            Accept
                          </Button>

                          <Button
                            loading={declineLoading}
                            size="small"
                            type="dashed"
                            danger
                            // icon={<CloseOutlined />}
                            onClick={() => onDeclineInvite(item)}
                          >
                            Decline
                          </Button>
                        </div>
                      </div>
                    }
                  />
                </List.Item>
              )}
            ></List>
            <ConditionRender condition={inviteNotifications && inviteNotifications.length > 0}>
              <Button className="w-full" type="text" onClick={loadInvite} disabled={loadingInvite}>
                {loadingInvite ? <Spin indicator={<LoadingOutlined spin />} /> : "Tải thêm"}
              </Button>
            </ConditionRender>
            <ConditionRender condition={inviteNotifications && inviteNotifications.length === 0}>
              <p className="text-center text-gray-500">Không có lời mời nào</p>
            </ConditionRender>
          </div>
        </>
      ),
    },
  ];
};
