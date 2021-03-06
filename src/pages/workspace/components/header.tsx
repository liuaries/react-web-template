import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Layout, Tag, Dropdown, Menu, Avatar } from 'antd'
import { UserOutlined, SettingOutlined, LogoutOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import groupBy from 'lodash/groupBy'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { MenuInfo } from 'rc-menu/lib/interface'
import { AppDispatch, RootState } from '@store'
import { NoticeIcon } from '@comps'
import { bachSetState } from '../slice'
import { tempData, getColor } from '../util'
import './header.less'

const { Header } = Layout

const WorkSpaceHeader = () => {
  const dispatch: AppDispatch = useDispatch()
  const { collapsed } = useSelector((state: RootState) => state.workspace)

  dayjs.extend(relativeTime)
  dayjs.locale('zh-cn')

  function getNoticeData(notices: any) {
    if (notices.length === 0) {
      return {}
    }
    const newNotices = notices.map((notice: any) => {
      const newNotice = { ...notice }
      if (newNotice.datetime) {
        newNotice.datetime = dayjs(notice.datetime).fromNow()
      }
      if (newNotice.id) {
        newNotice.key = newNotice.id
      }
      if (newNotice.extra && newNotice.status) {
        let color = getColor(newNotice.status)
        newNotice.extra = (
          <Tag color={color} style={{ marginRight: 0 }}>
            {newNotice.extra}
          </Tag>
        )
      }
      return newNotice
    })
    return groupBy(newNotices, 'type')
  }

  const noticeData = getNoticeData(tempData)
  return (
    <Header className="notice-header">
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: ()=> {
          dispatch(bachSetState({ collapsed: collapsed ? false : true }))
        },
      })}
      <div className="header-right">
        <NoticeIcon
          className="notice-action notice-icon"
          count={12}
          onItemClick={(item: any, tabProps: any) => {
            console.log(item, tabProps)
          }}
          loading={false}
          clearText="??????"
          viewMoreText="????????????"
          onPopupVisibleChange={() => {}}
          onClear={() => {}}
        >
          <NoticeIcon.Tab
            tabKey="notification"
            list={noticeData['??????']}
            title="??????"
            emptyText="????????????????????????"
            showViewMore
          />
          <NoticeIcon.Tab
            tabKey="message"
            list={noticeData['??????']}
            title="??????"
            emptyText="????????????????????????"
            showViewMore
          />
          <NoticeIcon.Tab
            tabKey="event"
            list={noticeData['??????']}
            title="??????"
            emptyText="????????????????????????"
            showViewMore
          />
        </NoticeIcon>
        <Dropdown overlay={
          <Menu className="menu" selectedKeys={[]} onClick={(info: MenuInfo) => {
            console.log('======info:', info)
          }}>
            <Menu.Item key="center" icon={<UserOutlined />}>
              ????????????
            </Menu.Item>
            <Menu.Item key="setting" icon={<SettingOutlined />}>
              ??????
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="logout" icon={<LogoutOutlined />}>
              ????????????
            </Menu.Item>
          </Menu>
        }>
          <span className="action account">
            <Avatar
              size="small"
              className={'avatar'}
              src={'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'}
            />
            {'199******06'}
          </span>
        </Dropdown>
      </div>
    </Header>
  )
}

export default WorkSpaceHeader
