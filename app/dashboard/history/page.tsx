// app/dashboard/history/page.tsx
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { eq } from "drizzle-orm";

import HistoryTable from "./HistoryTable";

export default async function HistoryPage() {
  // Fetch all history entries (you can filter by user if needed)
  const history = await db.select().from(AIOutput).orderBy(AIOutput.createdAt);

  return (
    // Responsive padding and max width container for better mobile view
    <div className="p-4 sm:p-10 max-w-full sm:max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">AI Generation History</h1>
      <HistoryTable history={history} />
    </div>
  );
}
