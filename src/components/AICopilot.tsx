import { useState } from "react";

export const AICopilot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);

  const handleQuery = (query: string) => {
    let response = "";

    if (query.includes("overspending")) {
      response =
        "You spend 2.3x more on weekends and food contributes to 62% of that.";
    } else if (query.includes("save")) {
      response =
        "Your savings improved this month. Try reducing weekend spending to save more.";
    } else {
      response = "You're doing well. Monitor discretionary expenses.";
    }

    setMessages((prev) => [...prev, "🧑 " + query, "🤖 " + response]);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-teal-500 text-white px-4 py-3 rounded-full shadow-lg hover:scale-105 transition"
      >
        AI
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-20 right-6 w-80 bg-slate-900 border border-slate-700 rounded-xl p-4 shadow-xl">
          <h3 className="text-white font-semibold mb-3">AI Copilot</h3>

          <div className="space-y-2 mb-3">
            {messages.map((msg, i) => (
              <div key={i} className="text-sm text-gray-300">
                {msg}
              </div>
            ))}
          </div>

          {/* Quick buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleQuery("overspending")}
              className="text-xs bg-slate-700 px-2 py-1 rounded"
            >
              Overspending?
            </button>
            <button
              onClick={() => handleQuery("save")}
              className="text-xs bg-slate-700 px-2 py-1 rounded"
            >
              Save more?
            </button>
          </div>
        </div>
      )}
    </>
  );
};