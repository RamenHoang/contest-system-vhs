import { useGoogleLogin } from "@react-oauth/google";
import {
  Button,
  Card,
  Divider,
  Form,
  FormProps,
  Input,
  message,
  Typography,
} from "antd";
import { LockIcon, User2Icon } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthApi } from "~/api/auth-api";
import { loginFailed, loginStart, loginSuccess } from "~/store/slice/AuthSlice";

type AuthType = {
  username: string;
  password: string;
};

type FormType = FormProps<AuthType>;

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm<AuthType>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        dispatch(loginStart());
        const res = await AuthApi.loginGoogle(tokenResponse.access_token);
        if (res?.statusCode === 200) {
          dispatch(loginSuccess(res.data));
          message.success("Đăng nhập thành công");
          const from = location.state?.from?.pathname || '/';
          navigate(from, { replace: true });
        }
      } catch (error) {
        dispatch(loginFailed());
        message.error("Đăng nhập thất bại");
        console.log(error);
      }
    },
  });

  const onFinish: FormType["onFinish"] = async (value) => {
    console.log(1);
    try {
      setIsSubmitting(true);
      dispatch(loginStart());
      const res = await AuthApi.loginAdmin(value.username, value.password);
      if (res?.statusCode === 200) {
        dispatch(loginSuccess(res?.data));
        message.success("Đăng nhập thành công");
        const from = location.state?.from?.pathname || '/';
        navigate(from, { replace: true });
        setIsSubmitting(false);
      }
    } catch (error) {
      console.log(error);
      dispatch(loginFailed());
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="flex h-screen items-center justify-center"
      style={{
        // backgroundImage:
        //   'url("https://pp-blog.paperpal.com/wp-content/uploads/2023/08/pexels-ann-h-11183364-scaled.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Card className="w-96 p-4 shadow-md">
        <div className="flex-center flex-col gap-2 mb-10">
          <img
            alt="nextui logo"
            src="https://png.pngtree.com/png-vector/20221127/ourmid/pngtree-digital-media-play-button-gradient-color-hexagon-marketing-agency-mobile-app-png-image_6482499.png"
            className="w-12 h-12"
          />
          <h4 className="font-bold text-2xl">ĐTN</h4>
          <p className="text-base font-medium">
            Đăng nhập vào tài khoản để tiếp tục
          </p>
        </div>
        <Form
          disabled={isSubmitting}
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          className="space-y-8"
          requiredMark="optional"
        >
          <Form.Item
            label="Tên đăng nhập"
            name="username"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tài khoản",
              },
            ]}
          >
            <Input
              prefix={<User2Icon className="h-4 w-4 text-gray-500" />}
              size="large"
            />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu",
              },
            ]}
          >
            <Input.Password
              prefix={<LockIcon className="h-4 w-4 text-gray-500" />}
              size="large"
            />
          </Form.Item>

          <Button
            size="large"
            htmlType="submit"
            type="primary"
            className="w-full"
          >
            Đăng nhập Admin
          </Button>
        </Form>

        <Divider plain>
          <Typography.Text className="!text-xs !text-gray-400">
            Hoặc
          </Typography.Text>
        </Divider>
        <Button
          size="large"
          className="flex items-center justify-center"
          block
          icon={<GoogleIcon />}
          htmlType="button"
          onClick={() => login()}
        >
          Đăng nhập với Google
        </Button>
      </Card>
    </div>
  );
};

const GoogleIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="20"
      height="20"
      viewBox="0 0 48 48"
    >
      <path
        fill="#fbc02d"
        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
      ></path>
      <path
        fill="#e53935"
        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
      ></path>
      <path
        fill="#4caf50"
        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
      ></path>
      <path
        fill="#1565c0"
        d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
      ></path>
    </svg>
  );
};

export default SignIn;
