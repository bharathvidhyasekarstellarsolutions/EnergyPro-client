import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Modal, Form, Input, Button, Upload, message ,Flex,Spin} from "antd";
import { UploadOutlined } from "@ant-design/icons";


export default function InstructorCourse() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editCourseData, setEditCourseData] = useState(null);
  const [updated, setUpdated] = useState(false);
  const [form] = Form.useForm();
  const [user,setUser]=useState("")
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      const userData = localStorage.getItem("user");
      const parsedUser = userData ? JSON.parse(userData) : null;
      setUser(parsedUser);
  
      if (!parsedUser?.user?.id) return;
  
      try {
        const response = await axios.get(
          `http://localhost:3000/v1/api/courses/instructorCourse/${parsedUser.user.id}`,
          {
            headers: { Authorization: `Bearer ${parsedUser.accessToken}` },
          }
        );
        setCourses(Array.isArray(response.data.data) ? response.data.data : []);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to load courses.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchCourses();
  }, [updated]); // ✅ Remove user from dependencies
  

  useEffect(() => {
    document.body.style.overflow = editModalOpen ? "hidden" : "auto";
  }, [editModalOpen]);

  const handleEditCourse = (course) => {
    setEditCourseData({ ...course });
    form.setFieldsValue({ ...course }); // Populate form fields with existing data
    setEditModalOpen(true);
  };

  const handleFileChange = (file, field) => {
    if (file) {
      setEditCourseData((prev) => ({
        ...prev,
        [field]: file, // Store the File object
      }));
    }
  };

  const handleUpdateCourse = async (values) => {
    if (!editCourseData?.courseId) {
      message.error("Invalid course data.");
      return;
    }

    const isFileUploaded =
      editCourseData.videoFile instanceof File ||
      editCourseData.imageFile instanceof File ||
      editCourseData.resourceFile instanceof File;

    if (!isFileUploaded) {
      // No new files? Send JSON update
      try {
        await axios.put(
          `http://localhost:3000/v1/api/courses/instructorCourse/update/${editCourseData.courseId}`,
          values,
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        message.success("Course updated successfully!");
        setEditModalOpen(false);
        setUpdated((prev) => !prev);
      } catch (error) {
        message.error("Failed to update course.");
      }
      return;
    }

    // If new files are uploaded, use FormData
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("category", values.category);

    if (editCourseData.videoFile instanceof File) {
      formData.append("videoFile", editCourseData.videoFile);
    }
    if (editCourseData.imageFile instanceof File) {
      formData.append("imageFile", editCourseData.imageFile);
    }
    if (editCourseData.resourceFile instanceof File) {
      formData.append("resourceFile", editCourseData.resourceFile);
    }

    try {
      await axios.put(
        `http://localhost:3000/v1/api/courses/instructorCourse/update/${editCourseData.courseId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      message.success("Course updated successfully!");
      setEditModalOpen(false);
      setUpdated((prev) => !prev);
    } catch (error) {
      message.error("Failed to update course.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
    <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
      Instructor Courses
    </h1>
  
    {loading ? (
      <Flex justify="center" align="center" className="h-90 ">
        <Spin tip="" size="large">
        </Spin>
      </Flex>
    ) : error ? (
      <p className="text-red-500 text-center">{error}</p>
    ) : courses.length === 0 ? (
      <p className="text-gray-500 text-center">No courses found.</p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.courseId} className="rounded shadow-lg p-4 bg-gray-100">
            <img
              className="w-full h-48 object-cover"
              src={course.imageFile || "https://via.placeholder.com/150"}
              alt={course.title}
              crossOrigin="anonymous"
            />
            <div className="py-4">
              <h2 className="font-bold text-lg">{course.title}</h2>
              <p className="text-gray-700">{course.description}</p>
              <p className="text-green-500 font-semibold text-lg">₹{course.price}</p>
            </div>
            <div className="flex justify-evenly">
              <Button type="primary" onClick={() => handleEditCourse(course)}>
                Edit
              </Button>
              <Button onClick={() => navigate(`/instructor-player`, { state: { course } })}>
                Watch
              </Button>
            </div>
          </div>
        ))}
      </div>
    )}
  
    {/* Edit Course Modal */}
    <Modal
      title="Edit Course"
      open={editModalOpen}
      onCancel={() => setEditModalOpen(false)}
      footer={null}
    >
      <Form layout="vertical" form={form} onFinish={handleUpdateCourse}>
        <Form.Item label="Title" name="title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
  
        <Form.Item label="Description" name="description" rules={[{ required: true }]}>
          <Input.TextArea rows={3} />
        </Form.Item>
  
        <Form.Item label="Price" name="price" rules={[{ required: true }]}>
          <Input type="number" />
        </Form.Item>
  
        <Form.Item label="Upload Video">
          <Upload beforeUpload={() => false} showUploadList={false} onChange={(info) => handleFileChange(info.file, "videoFile")}>
            <Button icon={<UploadOutlined />}>Upload Video</Button>
          </Upload>
        </Form.Item>
  
        <Form.Item label="Upload Image">
          <Upload beforeUpload={() => false} showUploadList={false} onChange={(info) => handleFileChange(info.file, "imageFile")}>
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
        </Form.Item>
  
        <Form.Item label="Upload Resource File">
          <Upload beforeUpload={() => false} showUploadList={false} onChange={(info) => handleFileChange(info.file, "resourceFile")}>
            <Button icon={<UploadOutlined />}>Upload File</Button>
          </Upload>
        </Form.Item>
  
        <Button type="primary" htmlType="submit">
          Update Course
        </Button>
      </Form>
    </Modal>
  </div>
  );
}
