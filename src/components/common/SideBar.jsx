import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
} from "@material-tailwind/react";

export const SideBar = ({ activeTab, setActiveTab }) => {
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
            علي احمد
          </Typography>

          <Typography className="font-heading text-primary">
            شركة طماطة
          </Typography>
          <Typography className="font-heading">admin@tamata.com </Typography>
          <Typography className="font-heading text-primary">Admin</Typography>
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

        <ListItem
          className={`gap-1 ${activeTab === "operations" ? "bg-gray-200" : ""}`}
          onClick={() => setActiveTab("operations")}
        >
          <ListItemPrefix>
            <i className=""></i>
          </ListItemPrefix>
          <Typography className="font-heading">ادراة العمليات </Typography>
        </ListItem>

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
      </List>
    </Card>
  );
};
