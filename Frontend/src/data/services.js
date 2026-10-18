
import canteenImage from "../assets/canteen.png";
import printoutImage from "../assets/printout-shop.png";
import studentServicesImage from "../assets/student-services.png";
import healthCenterImage from "../assets/health-center.png";

export const services = [
  {
    id: "canteen",
    name: "Canteen",
    category: "Food & Dining",
    waiting: 8,
    estimatedWait: 12,
    tokenPrefix: "CAN",
    image: canteenImage,
    icon: "coffee",
    color: "orange",
  },
  {
    id: "printout",
    name: "Printout Shop",
    category: "Printing Services",
    waiting: 4,
    estimatedWait: 8,
    tokenPrefix: "PRT",
    image: printoutImage,
    icon: "printer",
    color: "purple",
  },
  {
    id: "student-services",
    name: "Student Services",
    category: "Academic Support",
    waiting: 2,
    estimatedWait: 5,
    tokenPrefix: "STD",
    image: studentServicesImage,
    icon: "graduation-cap",
    color: "green",
  },
  {
    id: "health-center",
    name: "Health Center",
    category: "Healthcare",
    waiting: 6,
    estimatedWait: 10,
    tokenPrefix: "HLT",
    image: healthCenterImage,
    icon: "heart-pulse",
    color: "pink",
  },
];

export const dashboardStats = {
  activeCounters: 5,
  serviceUptime: 98,
  averageWait: 15,
};
