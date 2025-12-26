import { features } from "process";

const medbookusers = [
  {
    fname: "User",
    lname: "Test",
    email: "user@nextmail.com",
    password: "123456",
    role: "developer",
  },
];

const hospitals = [
  {
    id: 1,
    hname: "Hospital 1",
    department: [
      "Cardiology, Oncology, Urology, Orthology, Opthalmology, Sexology, ENT, Dentistry, Dermatology, Pediatrics, Gyneocology, Gastronomics, Image Diagnosis",
    ],
    features: ["24hr Casualty, 24hrs Bloodbank, Insurances, Child Help line"],
    image: "/hospitals/hosp.png",
    phone: "234343434",
    email: "hospital1@email.com",
    address:
      "Hospital 1, #23/3345 St.peterson Street, New Mexico, Alabama-34234",
    Country: "USA",
    State: "Alabama",
    District: "New Mexico",
    local: "St.peterson",
    weblink: "#",
    maplink: "#",
  },
  {
    id: 2,
    hname: "Hospital 2",
    department: [
      "Cardiology, Oncology, Urology, Orthology, Opthalmology, Sexology, ENT, Dentistry, Dermatology, Pediatrics, Gyneocology, Gastronomics, Image Diagnosis",
    ],
    features: ["24hr Casualty, 24hrs Bloodbank, Insurances, Child Help line"],
    image: "/hospitals/hosp.png",
    phone: "234343434",
    email: "hospital1@email.com",
    address: "Hospital 2, #65/142 Yoshimura Circle, Huwansi Shu, Kyoto-4543",
    Country: "Japan",
    State: "Kyoto",
    District: "Huwansi Shu",
    local: "Yoshimura",
    weblink: "#",
    maplink: "#",
  },
];

export { medbookusers, hospitals };
