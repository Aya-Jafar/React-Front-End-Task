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
  const { getProfileData, sidebarItems } = store;

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

        <div className="flex flex-col">
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
        {/* Render Sidebar Items */}
        {sidebarItems.map((item, index) => (
          <ListItem
            key={item.id}
            className={`gap-1 ${activeTab === item.id ? "bg-gray-200" : ""}`}
            onClick={() => setActiveTab(item.id)}
          >
            <ListItemPrefix>
              <i className={`fa ${item.icon} fa-lg`}></i>
            </ListItemPrefix>

            <Typography color="blue-gray" className="font-heading">
              {item.label}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};
