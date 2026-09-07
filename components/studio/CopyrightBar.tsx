import { CONTACT } from "./constants";

export function CopyrightBar() {
  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-row items-center justify-between px-6 py-4">
      <span className="text-sm text-[#051A24]">
        © {new Date().getFullYear()} Ganesh Kumar Nandhipati
      </span>
      <span className="text-sm text-[#051A24]">{CONTACT.location}</span>
    </div>
  );
}
