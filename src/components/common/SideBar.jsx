import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
} from "@material-tailwind/react";
import { useHomeStore } from "../../stores/home";

export const SideBar = ({ activeTab, setActiveTab }) => {
  const store = useHomeStore();
  const { getProfileData } = store;

  return (
    <Card
      className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5"
      dir="rtl"
    >
      {/* Profile image and username */}
      <div className="mb-2 p-4 flex items-start gap-3">
        <Avatar
          src="https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8="
          alt="avatar"
        />

        <div className="flex flex-col ">
          <Typography variant="h6" color="blue-gray" className="font-heading">
            {getProfileData().userName}
          </Typography>

          <Typography className="font-heading text-primary">
            شركة {getProfileData().company}
          </Typography>
          <Typography className="font-heading">
            {getProfileData().email}
          </Typography>
          <Typography className="font-heading text-primary">
            {getProfileData().role}
          </Typography>
        </div>
      </div>

      <List className="font-heading">
        <ListItem
          className={`gap-1 ${activeTab === "dashboard" ? "bg-gray-200" : ""}`}
          onClick={() => setActiveTab("dashboard")}
        >
          <ListItemPrefix>
            <i className="fa fa-bolt fa-lg"></i>
          </ListItemPrefix>

          <Typography color="blue-gray" className="font-heading">
            الرئيسية
          </Typography>
        </ListItem>

        <div className="mr-7">
          <Typography className="font-heading">ادراة العمليات </Typography>
        </div>

        <ListItem
          className={`gap-1 ${activeTab === "sponsors" ? "bg-gray-200" : ""}`}
          onClick={() => setActiveTab("sponsors")}
        >
          <ListItemPrefix>
            <i className="fa-regular fa-building fa-lg"></i>
          </ListItemPrefix>

          <Typography color="blue-gray" className="font-heading">
            الكفلاء
          </Typography>
        </ListItem>

        <ListItem
          className={`gap-1 ${
            activeTab === "subscribers" ? "bg-gray-200" : ""
          }`}
          onClick={() => setActiveTab("subscribers")}
        >
          <ListItemPrefix>
            <i className="fa-solid fa-users fa-lg"></i>
          </ListItemPrefix>

          <Typography color="blue-gray" className="font-heading">
            المشتركين
          </Typography>
        </ListItem>

        <ListItem
          className={`gap-1 ${activeTab === "plans" ? "bg-gray-200" : ""}`}
          onClick={() => setActiveTab("plans")}
        >
          <ListItemPrefix>
            <i class="fa-regular fa-clipboard"></i>
          </ListItemPrefix>

          <Typography color="blue-gray" className="font-heading">
            الخطط
          </Typography>
        </ListItem>

        <ListItem
          className={`gap-1 ${activeTab === "recurring" ? "bg-gray-200" : ""}`}
          onClick={() => setActiveTab("recurring")}
        >
          <ListItemPrefix>
            <i class="fa-solid fa-circle-dollar-to-slot"></i>
          </ListItemPrefix>

          <Typography color="blue-gray" className="font-heading">
            الدفعات
          </Typography>
        </ListItem>

        <ListItem
          className={`gap-1 ${activeTab === "orders" ? "bg-gray-200" : ""}`}
          onClick={() => setActiveTab("orders")}
        >
          <ListItemPrefix>
            <i class="fa-solid fa-truck-fast"></i>
          </ListItemPrefix>

          <Typography color="blue-gray" className="font-heading">
            الطلبات
          </Typography>
        </ListItem>

        <div className="mr-7">
          <Typography className="font-heading">ادراة المنصة </Typography>
        </div>

        <ListItem
          className={`gap-1 ${activeTab === "content" ? "bg-gray-200" : ""}`}
          onClick={() => setActiveTab("content")}
        >
          <ListItemPrefix>
            <i class="fa-solid fa-photo-film"></i>
          </ListItemPrefix>

          <Typography color="blue-gray" className="font-heading">
            المحتوى
          </Typography>
        </ListItem>

        <ListItem
          className={`gap-1 ${activeTab === "cards" ? "bg-gray-200" : ""}`}
          onClick={() => setActiveTab("cards")}
        >
          <ListItemPrefix>
            <i class="fa-regular fa-address-card"></i>
          </ListItemPrefix>

          <Typography color="blue-gray" className="font-heading">
            الحسابات
          </Typography>
        </ListItem>

        <ListItem
          className={`gap-1 ${
            activeTab === "notification" ? "bg-gray-200" : ""
          }`}
          onClick={() => setActiveTab("notification")}
        >
          <ListItemPrefix>
            <i class="fa-regular fa-bell"></i>
          </ListItemPrefix>

          <Typography color="blue-gray" className="font-heading">
            اشعارات
          </Typography>
        </ListItem>
      </List>
    </Card>
  );
};
