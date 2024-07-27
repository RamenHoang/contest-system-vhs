import { Image, Modal } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
// import AntDropdown from '~/components/ui/dropdown';
import { IStartRequired } from "~/types";
import { hexToRGBA } from "~/utils/helpers";

export const Header = ({ data }: { data: IStartRequired }) => {
  const [isModalVisible, setIsModalVisible] = useState(false); // Step 2

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  return (
    <header style={{ backgroundColor: hexToRGBA(data?.themeColor, 0.6) }}>
      <nav className="px-4 lg:px-6 py-2.5 text-white">
        <div className="flex items-center justify-between gap-8 mx-auto max-w-screen-xl">
          <Link to="/">
            <img src='/logo.png' alt='logo' width={100}/>
          </Link>
          <div
            className={` flex items-center justify-end lg:grow px-5 py-1 lg:py-2 lg:px-7 rounded-full`}
            style={{ backgroundColor: hexToRGBA(data?.themeColor, 0.9) }}
          >
            <div className="justify-between items-center w-full lg:flex lg:w-auto lg:order-1 grow">
              <ul className="flex items-center gap-x-10 text-lg">
                <Link to="/" className="hover:text-white/70">
                  Trang chủ
                  {/* <div className="absolute bottom-0 left-1/2 -translate-x-1/2 border-t-2 border-solid w-14"></div> */}
                </Link>
                <div
                  className="hover:text-white/70"
                  onClick={showModal}
                  style={{ cursor: "pointer" }}
                >
                  Thể lệ
                </div>
                <Modal
                  title="THỂ LỆ"
                  open={isModalVisible}
                  onOk={handleOk}
                  okText="Đã hiểu"
                  onCancel={handleOk}
                  cancelText="Đóng"
                >
                  <span className="text-lg">{data?.rules}</span>
                </Modal>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <div className='px-4 lg-px-6'>
        <div className="max-w-screen-xl mx-auto mt-4 lg:mt-8" style={{display: 'table'}}>
          <Image
            loading="lazy"
            crossOrigin="anonymous"
            preview={false}
            src={
              data?.bannerUrl !== null && data?.bannerUrl !== ""
                ? `${import.meta.env.VITE_DOMAIN_URL}${data?.bannerUrl}`
                : `${import.meta.env.VITE_DOMAIN_URL}/default_banner.jpg`
            }
            alt="banner"
            className="max-w-full h-auto mx-auto rounded-xl object-cover"
          />
        </div>
      </div>
      <div
        className={`px-4 lg:px-6 py-2 lg:py-6 uppercase text-lg lg:text-4xl text-center text-white bg-[${data?.themeColor}] mt-4 lg:mt-12`}
      >
        {data?.name}
      </div>
    </header>
  );
};
