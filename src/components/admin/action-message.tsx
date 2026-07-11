import type { ActionState } from "@/lib/action-state";

export function ActionMessage({ state }: { state: ActionState }) {
  if (state.status === "idle") return null;

  return (
    <p
      role="status"
      className={`mt-4 rounded-xl px-3 py-2 text-sm ${
        state.status === "success" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"
      }`}
    >
      {state.message}
    </p>
  );
}
