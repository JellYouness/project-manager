"use client";
import * as React from "react";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  MonthView,
  Toolbar,
  DateNavigator,
  TodayButton,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  CurrentTimeIndicator,
} from "@devexpress/dx-react-scheduler-material-ui";
import { Card } from "@/components/ui/card";

const currentDate = "2024-04-28";

const appointments = [
  { title: "Mail New Leads for Follow Up", startDate: "2024-04-29T10:00" },
  {
    title: "Product Meeting",
    startDate: "2024-04-30T10:30",
    endDate: "2024-04-30T11:30",
  },
  {
    title: "Send Territory Sales Breakdown",
    startDate: "2024-05-02T12:35",
    endDate: "2024-05-04T11:30",
  },
];

export default function Home() {
  return (
    <main className="">
      <Card>
        <Scheduler data={appointments}>
          <ViewState defaultCurrentDate={currentDate} />
          <MonthView />
          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <Appointments />
          <AppointmentTooltip showCloseButton showOpenButton />
          <AppointmentForm />
          <CurrentTimeIndicator shadePreviousCells shadePreviousAppointments />
        </Scheduler>
      </Card>
    </main>
  );
}
