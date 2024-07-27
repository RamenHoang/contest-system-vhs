import { X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import AntStep from "~/components/ui/step";
import { FormContest, FormSetup } from "~/features/home/components/index";
import { FormPublish } from "~/features/home/components/form-publish";

const CreateContest = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const step = searchParams.get("step");

  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const renderForm = () => {
    switch (step) {
      case "1":
        return <FormContest />;
      case "2":
        return <FormSetup />;
      case "3":
        return null;
      case "4":
        return null;
      case "5":
        return <FormPublish />;
      default:
        return <FormContest />;
    }
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <>
      <div
        className={`transition-[padding] duration-300 ${
          isSidebarVisible ? "xl:pr-[333px]" : "xl:pr-0"
        } min-h-[calc(100vh - 70px)]`}
      >
        <div className="p-4 h-full max-w-6xl mx-auto border-r-gray-200 border-2">
          <div className="px-10">
            <AntStep />
          </div>
        </div>
      </div>
      <div
        className={`fixed z-[2] h-[calc(100vh-70px)] bg-white transition-transform duration-300 right-0 top-[70px] border-gray-200 border-solid w-[333px] ${
          isSidebarVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div
          className="fixed border border-gray-500 hover:border-gray-500 text-gray-300 hover:text-gray-500 rounded-full -left-[11px] hover:scale-110 hover:cursor-pointer transition-all duration-300 top-20 right-full w-5 h-5 flex items-center justify-center bg-gray-300"
          onClick={toggleSidebar}
        >
          <X className="w-4 h-4" color="gray" />
        </div>
        <div className="h-[calc(100vh-70px)] p-4 min-h-full overflow-auto">
          <div className="pt-10">{renderForm()}</div>
        </div>
      </div>
    </>
  );
};

export default CreateContest;
