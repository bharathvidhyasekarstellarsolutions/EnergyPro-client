import React, { useState } from "react";
import { Modal, Form, Input, Button, Upload, Select, message } from "antd";
import { PlusOutlined, UploadOutlined, UserOutlined ,EditOutlined} from "@ant-design/icons";
import { Link } from "react-router-dom";
import axios from "axios";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const { Option } = Select;

export default function InstructorDashboard ({user}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [video, setVideo] = useState(null);
  const [image, setImage] = useState(null);
  const [document, setDocument] = useState(null); // Additional file support
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm(); // Form instance

  // Get Token & User Data from Local Storage
  const accessToken = user?.accessToken || "";
  const email = user?.user.email || "";
  const username = user?.user.username || "";

  // Open & Close Modal
  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => {
    setIsModalOpen(false);
    setVideo(null);
    setImage(null);
    setDocument(null);
    form.resetFields();
  };

  // Handle File Selection
  const handleFileChange = (info, type) => {
    const file = info.file;
    console.log("file",file);
    
    if (!file) return;

    if (type === "video") setVideo(file);
    else if (type === "image") setImage(file);
    else if (type === "document") setDocument(file); // Supports PDF, DOC, etc.
  };

  // Handle Form Submit
  const handleSubmit = async (values) => {
    if (!video || !image) {
      message.error("Please upload both a video and an image!");
      return;
    }
  
    setLoading(true);
  
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("category", values.category);
    formData.append("videoFile", video); // Ensure correct file object
    formData.append("imageFile", image);
    formData.append("authorEmail", email);
    formData.append("authorName", username);
    formData.append("resourceFile",document)
  
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
  
    try {
      const response = await axios.post(
        `${SERVER_URL}/v1/api/courses/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
  
      if (response.status === 201) {
        message.success("Course uploaded successfully!");
        handleCancel(); // Reset form
      }
    } catch (error) {
      console.error("Upload failed:", error);
      message.error(error.response?.data?.message || "Failed to upload course.");
    }
  
    setLoading(false);
  };

  return (
    <div className="p-6 h-screen flex flex-row gap-5">
      {/* Upload Course Button */}
      <div
        className="w-40 h-40 bg-white shadow-lg rounded-2xl flex flex-col items-center justify-center cursor-pointer border border-gray-300 hover:shadow-xl transition"
        onClick={showModal}
      >
        <UploadOutlined className="text-4xl text-blue-500" />
        <p className="text-lg text-gray-700 font-semibold mt-2">
          Upload Course
        </p>
      </div>

      {/* My Courses Button */}
      <div
        className="w-40 h-40 bg-white shadow-lg rounded-2xl flex flex-col items-center justify-center cursor-pointer border border-gray-300 hover:shadow-xl transition"
      >
        <Link to="/instructor-course"  className="flex flex-col items-center justify-center">
          <UserOutlined className="text-4xl text-blue-500" />
          <p className="text-lg text-gray-700 font-semibold mt-2">
            My Courses
          </p>
        </Link>
      </div>
      {/* <div
        className="w-40 h-40 bg-white shadow-lg rounded-2xl flex flex-col items-center justify-center cursor-pointer border border-gray-300 hover:shadow-xl transition"
      >
        <Link to="/instructor-course"  className="flex flex-col items-center justify-center">
          <EditOutlined className="text-4xl  text-blue-500" />
          <p className="text-lg text-gray-700 font-semibold mt-2">
            Edit Course
          </p>
        </Link>
      </div> */}

      {/* Upload Modal */}
      <Modal title="Upload Course" height={"300px"} open={isModalOpen} onCancel={handleCancel} footer={null}>
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          {/* Course Title */}
          <Form.Item label="Course Title" name="title" rules={[{ required: true, message: "Enter course title" }]}>
            <Input placeholder="Enter course title" />
          </Form.Item>

          {/* Course Description */}
          <Form.Item label="Course Description" name="description" rules={[{ required: true, message: "Enter course description" }]}>
            <Input.TextArea placeholder="Enter course description" rows={3} />
          </Form.Item>

          {/* Course Price */}
          <Form.Item label="Course Price ($)" name="price" rules={[{ required: true, message: "Enter course price" }]}>
            <Input type="number" placeholder="Enter price" />
          </Form.Item>

          {/* Course Category */}
          <Form.Item label="Category" name="category" rules={[{ required: true, message: "Select a category" }]}>
            <Select placeholder="Select category">
              <Option value="Frontend">Frontend</Option>
              <Option value="Backend">Backend</Option>
              <Option value="Fullstack">Fullstack</Option>
              <Option value="UI/UX">UI/UX</Option>
            </Select>
          </Form.Item>

          {/* Video Upload */}
          <Form.Item label="Upload Video" required>
            <Upload
              beforeUpload={() => false} // Prevent auto upload
              accept="video/*"
              showUploadList={{ showRemoveIcon: true }}
              onChange={(info) => handleFileChange(info, "video")}
            >
              <Button icon={<UploadOutlined />}>Select Video</Button>
            </Upload>
          </Form.Item>

          {/* Image Upload */}
          <Form.Item label="Upload Image" required>
            <Upload
              beforeUpload={() => false} // Prevent auto upload
              accept="image/*"
              showUploadList={{ showRemoveIcon: true }}
              onChange={(info) => handleFileChange(info, "image")}
            >
              <Button icon={<UploadOutlined />}>Select Image</Button>
            </Upload>
          </Form.Item>

          {/* Additional Document Upload (Optional) */}
          <Form.Item label="Upload Additional File (Optional)">
            <Upload
              beforeUpload={() => false} // Prevent auto upload
              accept=".pdf,.doc,.docx"
              showUploadList={{ showRemoveIcon: true }}
              onChange={(info) => handleFileChange(info, "document")}
            >
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload>
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Submit Course
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

