export const useUsersStore = () => {
  const mockData = Array.from({ length: 5 }, (_, id) => ({
    id: id,
    userName: "محمد حمادي احمد الاحمدي",
    email: `ahaa${id}@tamata.com`,
    phoneNumber: "07801670218",
    code: `#8720864272${id}`,
    workEmail: `ahaa${id}@tamata.com`,
    age: 20,
    salary: "900,000",
    cardNumber: "2333311",
    guild: "حقوق العمال",
    socialStatus: "Married",
    marraigeYears: 4,
    city: "Baghdad",
    area: "Mansour",
    mapLink: "https://maps.app.goo.gl/2Bu6Jx61bGFoU26e9",
    neighborhood: "",
    alley: "",
    house: "",
    documents: [],
  }));
  const getAll = () => {
    return mockData;
  };

  const getByID = (id) => {
    return mockData.find((record) => record.id === id);
  };


  const getGuildList = () => {
    return [
      "نقابة المهندسين",
      "نقابة الأطباء",
      "نقابة المحامين",
      "نقابة المعلمين",
      "نقابة الصحفيين",
      "نقابة الصيادلة",
      "نقابة المهن التمثيلية",
      "نقابة العاملين بالتكنولوجيا",
    ];
  };
  const getMarraigeYearsOptions = () => {
    return ["اقل من سنة", "سنة واحدة", "اكثر من سنة", "اكثر من ٥ سنوات"];
  };
  const getCities = () => {
    return [
      "بغداد",
      "البصرة",
      "نينوى",
      "النجف",
      "أربيل",
      "كربلاء",
      "السليمانية",
      "الموصل",
    ];
  };
  const getBaghdadAreas = () => {
    return [
      "الكرادة",
      "المنصور",
      "الشعب",
      "الزعفرانية",
      "باب المعظم",
      "الدورة",
      "الجادرية",
      "السيدية",
      "الكاظمية",
      "الشيوخ",
    ];
  };

  return {
    getAll,
    getByID,
    getGuildList,
    getMarraigeYearsOptions,
    getCities,
    getBaghdadAreas,
  };
};
