import AvailableSlot from "./components/AvailableSlot";
import SheduledMeetings from "./components/SheduledMeetings";

import SlotDetails from "./components/slotDetails";
import { SlotBookProvider } from "./store/SlotBookContext";

function App() {
  return (
    <SlotBookProvider>
      <SlotDetails />
      <AvailableSlot />
      <SheduledMeetings />
      
    </SlotBookProvider>
  );
}

export default App;
