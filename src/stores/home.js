

export const useHomeStore = () => {

  const getProfileData = () => {
    return {
      userName: "علي احمد",
      company: "طماطة",
      email: "ali@tamata.com",
      role: "Admin",
    };
  };

  return {
    getProfileData,
  };
};
