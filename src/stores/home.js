/**
 * Store for managing home data
 */

export const useHomeStore = () => {
  
  const getProfileData = () => {
    return {
      userName: "علي احمد",
      company: "طماطة",
      email: "ali@tamata.com",
      role: "Admin",
    };
  };

  const sidebarItems = [
    {
      id: "dashboard",
      icon: "fa-bolt",
      label: "الرئيسية",
    },
    {
      id: "sponsors",
      icon: "fa-regular fa-building",
      label: "الكفلاء",
    },
    {
      id: "subscribers",
      icon: "fa-solid fa-users",
      label: "المشتركين",
    },
    {
      id: "plans",
      icon: "fa-regular fa-clipboard",
      label: "الخطط",
    },
    {
      id: "recurring",
      icon: "fa-solid fa-circle-dollar-to-slot",
      label: "الدفعات",
    },
    {
      id: "orders",
      icon: "fa-solid fa-truck-fast",
      label: "الطلبات",
    },
    {
      id: "content",
      icon: "fa-solid fa-photo-film",
      label: "المحتوى",
    },
    {
      id: "cards",
      icon: "fa-regular fa-address-card",
      label: "الحسابات",
    },
    {
      id: "notification",
      icon: "fa-regular fa-bell",
      label: "اشعارات",
    },
  ];

  return {
    getProfileData,
    sidebarItems,
  };
};
