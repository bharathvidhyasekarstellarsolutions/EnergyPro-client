import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  MenuFoldOutlined, MenuUnfoldOutlined, AppstoreTwoTone,
  ShopTwoTone, EditTwoTone, CopyTwoTone, ProfileTwoTone,
  EyeFilled, EditOutlined, DeleteOutlined, SaveOutlined
} from "@ant-design/icons";
import { Button, Layout, Menu, Table, Input } from "antd";

const { Sider, Header, Content } = Layout;
import instructors  from "../../Services/InstructorLogin";

const InstructorList = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const [instructor, setInstructor] = useState(instructors);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  // Handle edit button click
  const handleEdit = (id, record) => {
    setEditingId(id);
    setEditData(record);
  };

  // Handle input changes
  const handleInputChange = (e, field) => {
    setEditData({ ...editData, [field]: e.target.value });
  };

  // Handle save action
  const handleSave = () => {
    setInstructor((prev) =>
      prev.map((instructor) =>
        instructor.id === editingId ? { ...editData } : instructor
      )
    );
    setEditingId(null);
  };

  const instructorColumns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      render: (text, record) =>
        editingId === record.id ? (
          <Input value={editData.id} onChange={(e) => handleInputChange(e, "id")} />
        ) : (
          text
        ),
    },
    {
      title: "Username",
      dataIndex: "userName",
      key: "userName",
      render: (text, record) =>
        editingId === record.id ? (
          <Input value={editData.userName} onChange={(e) => handleInputChange(e, "userName")} />
        ) : (
          text
        ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text, record) =>
        editingId === record.id ? (
          <Input value={editData.email} onChange={(e) => handleInputChange(e, "email")} />
        ) : (
          text
        ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) =>
        editingId === record.id ? (
          <Button icon={<SaveOutlined />} type="primary" onClick={handleSave} />
        ) : (
          <div className="flex space-x-2">
            <Button icon={<EditOutlined />} onClick={() => handleEdit(record.id, record)} />
            <Button icon={<DeleteOutlined />} danger />
            <Button icon={<EyeFilled />} />
          </div>
        ),
    },
  ];

  return (
    <Layout className="h-screen overflow-hidden">
      <Sider className="h-screen" trigger={null} collapsible collapsed={collapsed}>
        <Menu className="h-full overflow-auto" theme="light" mode="inline" defaultSelectedKeys={[location.pathname]}>
          <Menu.Item key="/admin" icon={<AppstoreTwoTone />}>
            <Link to="/admin">Dashboard</Link>
          </Menu.Item>
          <Menu.SubMenu key="sub1" icon={<ShopTwoTone />} title="Instructor">
            <Menu.Item key="/admin/instructor" icon={<CopyTwoTone />}>
              <Link to="/admin/instructor">Instructor List</Link>
            </Menu.Item>
            <Menu.Item key="/admin/instructor-register" icon={<EditTwoTone />}>
              <Link to="/admin/instructor-register">Create Instructor</Link>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu key="sub2" icon={<ProfileTwoTone />} title="Student">
            <Menu.Item key="/admin/student" icon={<CopyTwoTone />}>
              <Link to="/admin/student">Student List</Link>
            </Menu.Item>
            <Menu.Item key="/admin/student-register" icon={<EditTwoTone />}>
              <Link to="/admin/student-register">Create Student</Link>
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Sider>

      <Layout>
        <Header style={{ padding: 0, background: "white" }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: "16px", width: 64, height: 64 }}
          />
        </Header>
        <Content className="overflow-y-auto" style={{ margin: "24px 16px", padding: 24, background: "white", height: "100vh" }}>
          <h2 className="text-lg font-bold mt-6 mb-4">Instructor List</h2>
          <Table columns={instructorColumns} dataSource={instructors} rowKey="id" />
        </Content>
      </Layout>
    </Layout>
  );
};

export default InstructorList;
