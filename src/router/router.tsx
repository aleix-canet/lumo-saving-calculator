import { createBrowserRouter } from "react-router";
import SavingsCalculator from "../pages/SavingsCalculator";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SavingsCalculator />,
  },
]);
